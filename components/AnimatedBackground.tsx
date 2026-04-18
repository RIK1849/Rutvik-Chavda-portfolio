"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hudRef    = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const hud    = hudRef.current;
    if (!canvas || !hud) return;

    const ctx  = canvas.getContext("2d");
    const hctx = hud.getContext("2d");
    if (!ctx || !hctx) return;

    const CTX  = ctx;
    const HCTX = hctx;
    const PI2 = Math.PI * 2;
    const DEG = Math.PI / 180;
    let W = 0, H = 0, rafId = 0;
    const startTime = performance.now();
    const FONT_MONO = "'Share Tech Mono', 'Courier New', monospace";

    type Node   = { x: number; y: number; z: number; phase: number; tier: number; label: string };
    type Edge   = { a: number; b: number; phase: number };
    type Packet = { edge: number; t: number; speed: number };
    type Star   = { x: number; y: number; size: number; alpha: number; tw: number };
    type Hex    = { ring: number; idx: number; angle: number };

    let nodes:   Node[]   = [];
    let edges:   Edge[]   = [];
    let packets: Packet[] = [];
    let stars:   Star[]   = [];
    let hexes:   Hex[]    = [];

    let mouseX = 0, mouseY = 0;
    let rotY = 0, tiltX = 0;

    const TIER_LABELS = [
      "XDR", "EDR", "IR", "MITRE", "SIEM", "SQL", "PS", "BASH",
      "SOC", "RCA", "AWS", "LINUX", "SYSMON", "SPLUNK", "DNS", "TLS",
      "IDS", "IOC", "MALW", "RANS", "FORENSIC", "HUNT",
    ];

    function colForTier(tier: number, a: number) {
      if (tier === 0) return `rgba(0,255,100,${a})`;
      if (tier === 1) return `rgba(0,229,255,${a})`;
      return `rgba(255,34,68,${a})`;
    }

    function buildScene() {
      // Neural nodes — orbit around center in 3D space
      nodes = Array.from({ length: 22 }, (_, i) => {
        const theta = (i / 22) * PI2 + Math.random() * 0.3;
        const phi   = Math.acos(2 * Math.random() - 1);
        return {
          x: Math.sin(phi) * Math.cos(theta),
          y: Math.cos(phi),
          z: Math.sin(phi) * Math.sin(theta),
          phase: Math.random() * PI2,
          tier: i < 4 ? 2 : i < 10 ? 0 : 1,
          label: TIER_LABELS[i % TIER_LABELS.length],
        };
      });

      // Edges between nearby nodes
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y, nodes[i].z - nodes[j].z);
          if (d < 1.0) edges.push({ a: i, b: j, phase: Math.random() * PI2 });
        }
      }

      // Data packets on random edges
      packets = Array.from({ length: 14 }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
      }));

      // Stars
      stars = Array.from({ length: 260 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.2 + 0.15,
        alpha: Math.random() * 0.5 + 0.1,
        tw: Math.random() * PI2,
      }));

      // Hex fractal ring structure
      hexes = [];
      for (let ring = 1; ring <= 5; ring++) {
        const count = ring * 6;
        for (let i = 0; i < count; i++) {
          hexes.push({ ring, idx: i, angle: (i / count) * PI2 });
        }
      }
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W; canvas.height  = H;
      hud.width     = W; hud.height     = H;
      buildScene();
    }

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / W - 0.5) * 2;
      mouseY = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener("resize",    resize);
    window.addEventListener("mousemove", onMouse);

    // Terminal boot lines
    const BOOT_LINES = [
      { t: 0.0, txt: "> SSH rutvik@sophos-xdr-cluster.prod --port 443", col: "rgba(0,255,100,0.95)" },
      { t: 0.9, txt: "  Authenticating RSA-4096 ...  [ OK ]", col: "rgba(0,255,100,0.85)" },
      { t: 1.7, txt: "  XDR ENGINE: ONLINE   |   INTERCEPT X: ACTIVE", col: "rgba(0,229,255,0.9)" },
      { t: 2.5, txt: "  MITRE ATT&CK: ARMED  |  LIVE DISCOVER: READY", col: "rgba(0,229,255,0.85)" },
      { t: 3.3, txt: "  LOADING: Data Lake · Sysmon · Event Logs", col: "rgba(0,255,100,0.8)" },
      { t: 4.1, txt: "  INCIDENTS RESOLVED: 500+   RANK: TOP 10 FY25", col: "rgba(255,34,68,0.9)" },
      { t: 4.9, txt: "  CY25 AWARDS: 5x COMMUNITY + TOP SUPPORT", col: "rgba(0,255,100,0.85)" },
      { t: 5.7, txt: "> Identity: RUTVIK CHAVDA — L2/L3 Security Eng", col: "rgba(0,229,255,0.95)" },
      { t: 6.5, txt: "> Session established. Portfolio online.", col: "rgba(0,255,100,0.95)" },
    ];

    // 3D → 2D with rotation
    function project(x: number, y: number, z: number, cx: number, cy: number, radius: number): [number, number, number] {
      // rotate around Y
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      // rotate around X
      const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      return [cx + x1 * radius, cy - y2 * radius, z2];
    }

    function drawHexagon(x: number, y: number, r: number, strokeStyle: string, lineWidth: number) {
      CTX.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = i * 60 * DEG;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        i === 0 ? CTX.moveTo(px, py) : CTX.lineTo(px, py);
      }
      CTX.closePath();
      CTX.strokeStyle = strokeStyle;
      CTX.lineWidth = lineWidth;
      CTX.stroke();
    }

    function render(now: number) {
      rafId = requestAnimationFrame(render);
      const elapsed = (now - startTime) / 1000;
      const cx = W * 0.5;
      const cy = H * 0.5;
      const radius = Math.min(W, H) * 0.26;

      rotY  += 0.0024;
      tiltX += (mouseY * 0.18 - tiltX) * 0.035;

      // ── Background ──────────────────────────────────────────────────────
      CTX.clearRect(0, 0, W, H);
      const bg = CTX.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.75);
      bg.addColorStop(0,   "#021a0d");
      bg.addColorStop(0.5, "#000d04");
      bg.addColorStop(1,   "#000000");
      CTX.fillStyle = bg;
      CTX.fillRect(0, 0, W, H);

      // ── Stars ──────────────────────────────────────────────────────────
      stars.forEach((s) => {
        s.tw += 0.012;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.tw));
        CTX.beginPath();
        CTX.arc(s.x, s.y, s.size, 0, PI2);
        CTX.fillStyle = `rgba(255,255,255,${a})`;
        CTX.fill();
      });

      // ── Fractal hex layers around center ────────────────────────────────
      const hexPulse = 0.5 + 0.5 * Math.sin(elapsed * 0.6);
      hexes.forEach((h) => {
        const count = h.ring * 6;
        const rotAng = h.angle + elapsed * 0.08 * (h.ring % 2 === 0 ? 1 : -1);
        const dist = h.ring * 38 * (1 + hexPulse * 0.05);
        const hx = cx + Math.cos(rotAng) * dist;
        const hy = cy + Math.sin(rotAng) * dist;
        const hr = 11 + h.ring * 3;
        const a = (0.22 - h.ring * 0.03) * (0.4 + 0.5 * Math.sin(elapsed * 0.6 + h.ring + h.idx));
        drawHexagon(hx, hy, hr, `rgba(0,255,100,${a})`, 0.7);
      });

      // ── Radar rings ─────────────────────────────────────────────────────
      for (let r = 1; r <= 4; r++) {
        CTX.beginPath();
        CTX.arc(cx, cy, radius * r / 4 + radius * 0.3, 0, PI2);
        CTX.strokeStyle = `rgba(0,255,100,${0.05 + 0.03 * Math.sin(elapsed + r)})`;
        CTX.lineWidth = 0.6;
        CTX.stroke();
      }

      // ── Radar cross-hairs ───────────────────────────────────────────────
      for (let a = 0; a < 8; a++) {
        CTX.beginPath();
        const ang = a * Math.PI / 4;
        const maxR = radius * 1.3;
        CTX.moveTo(cx, cy);
        CTX.lineTo(cx + Math.cos(ang) * maxR, cy + Math.sin(ang) * maxR);
        CTX.strokeStyle = "rgba(0,255,100,0.04)";
        CTX.lineWidth = 0.5;
        CTX.stroke();
      }

      // ── Radar sweep ─────────────────────────────────────────────────────
      const sweep = (elapsed * 0.7) % PI2;
      const sweepR = radius * 1.3;
      for (let a = 0; a < 50; a++) {
        const ang = sweep - a * 0.016;
        CTX.beginPath();
        CTX.moveTo(cx, cy);
        CTX.arc(cx, cy, sweepR, ang, ang + 0.016);
        CTX.fillStyle = `rgba(0,255,100,${(0.4 - a / 50) * 0.09})`;
        CTX.fill();
      }
      CTX.beginPath();
      CTX.moveTo(cx, cy);
      CTX.lineTo(cx + Math.cos(sweep) * sweepR, cy + Math.sin(sweep) * sweepR);
      CTX.strokeStyle = "rgba(0,255,100,0.5)";
      CTX.lineWidth = 1.2;
      CTX.stroke();

      // ── Central globe core ──────────────────────────────────────────────
      CTX.beginPath();
      CTX.arc(cx, cy, radius, 0, PI2);
      const core = CTX.createRadialGradient(cx - radius * 0.3, cy - radius * 0.25, 0, cx, cy, radius);
      core.addColorStop(0, "#012510");
      core.addColorStop(1, "#00150a");
      CTX.fillStyle = core;
      CTX.fill();

      // Globe edge
      CTX.beginPath();
      CTX.arc(cx, cy, radius, 0, PI2);
      CTX.strokeStyle = `rgba(0,255,100,${0.25 + 0.1 * Math.sin(elapsed * 1.3)})`;
      CTX.lineWidth = 1.3;
      CTX.stroke();

      // Inner ring detail
      CTX.beginPath();
      CTX.arc(cx, cy, radius * 0.82, 0, PI2);
      CTX.strokeStyle = "rgba(0,255,100,0.08)";
      CTX.lineWidth = 0.6;
      CTX.stroke();

      // ── Neural edges (with depth) ───────────────────────────────────────
      edges.forEach((e) => {
        const A = nodes[e.a], B = nodes[e.b];
        const [ax, ay, az] = project(A.x, A.y, A.z, cx, cy, radius * 0.7);
        const [bx, by, bz] = project(B.x, B.y, B.z, cx, cy, radius * 0.7);
        const avgZ = (az + bz) / 2;
        const zFactor = (avgZ + 1) / 2; // 0..1
        const pulse = 0.04 + 0.14 * Math.abs(Math.sin(elapsed * 0.9 + e.phase));
        const alpha = pulse * (0.4 + 0.6 * zFactor);
        CTX.beginPath();
        CTX.moveTo(ax, ay);
        CTX.lineTo(bx, by);
        CTX.strokeStyle = `rgba(0,255,100,${alpha})`;
        CTX.lineWidth = 0.6;
        CTX.stroke();
      });

      // ── Data packets on edges ───────────────────────────────────────────
      packets.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t -= 1;
        const e = edges[p.edge];
        if (!e) return;
        const A = nodes[e.a], B = nodes[e.b];
        const [ax, ay, az] = project(A.x, A.y, A.z, cx, cy, radius * 0.7);
        const [bx, by, bz] = project(B.x, B.y, B.z, cx, cy, radius * 0.7);
        const px = ax + (bx - ax) * p.t;
        const py = ay + (by - ay) * p.t;
        const pz = az + (bz - az) * p.t;
        if (pz < -0.7) return;
        const zAlpha = Math.max(0.2, (pz + 1) / 2);
        CTX.beginPath();
        CTX.arc(px, py, 2.2, 0, PI2);
        CTX.fillStyle = `rgba(255,255,255,${zAlpha * 0.95})`;
        CTX.fill();
        CTX.beginPath();
        CTX.arc(px, py, 4.5, 0, PI2);
        CTX.fillStyle = `rgba(0,255,100,${zAlpha * 0.25})`;
        CTX.fill();
      });

      // ── Neural nodes ────────────────────────────────────────────────────
      const sortedNodes = nodes
        .map((n, i) => {
          const [x, y, z] = project(n.x, n.y, n.z, cx, cy, radius * 0.7);
          return { n, i, x, y, z };
        })
        .sort((a, b) => a.z - b.z);

      sortedNodes.forEach(({ n, x, y, z }) => {
        n.phase += 0.035;
        const pulse = Math.abs(Math.sin(n.phase));
        const zScale = 0.4 + 0.6 * ((z + 1) / 2);
        const baseSize = (3.2 + pulse * 1.8) * zScale;
        const ringSize = (8 + 5 * pulse) * zScale;

        // Halo ring
        CTX.beginPath();
        CTX.arc(x, y, ringSize, 0, PI2);
        CTX.strokeStyle = colForTier(n.tier, (0.5 - 0.35 * pulse) * zScale);
        CTX.lineWidth = 1;
        CTX.stroke();

        // Core dot
        CTX.beginPath();
        CTX.arc(x, y, baseSize, 0, PI2);
        CTX.fillStyle = colForTier(n.tier, 0.95 * zScale);
        CTX.fill();

        // Lit by radar
        const angleFromCenter = Math.atan2(y - cy, x - cx);
        const sweepDiff = ((sweep - angleFromCenter + PI2 * 3) % PI2);
        const lit = sweepDiff < 0.35;
        if (lit && zScale > 0.5) {
          CTX.font = `bold ${10}px ${FONT_MONO}`;
          CTX.fillStyle = colForTier(n.tier, 0.9);
          CTX.fillText(n.label, x + ringSize + 3, y + 3);
        }
      });

      // ── DNA helix side panels (left and right edges) ─────────────────────
      const helixChars = "ATCG01XDR";
      for (let side = 0; side < 2; side++) {
        const baseX = side === 0 ? W * 0.08 : W * 0.92;
        const spread = 26;
        const steps = Math.floor(H / 16);
        for (let i = 0; i < steps; i++) {
          const prog = i / steps;
          const y = prog * H;
          const angle = prog * PI2 * 4 + elapsed * 1.2 * (side === 0 ? 1 : -1);
          const x1 = baseX + Math.cos(angle) * spread;
          const x2 = baseX + Math.cos(angle + Math.PI) * spread;
          const z1 = Math.sin(angle);
          const z2 = Math.sin(angle + Math.PI);
          const a1 = 0.12 + 0.35 * ((z1 + 1) / 2);
          const a2 = 0.12 + 0.35 * ((z2 + 1) / 2);
          CTX.font = `9px ${FONT_MONO}`;
          CTX.fillStyle = `rgba(0,255,100,${a1})`;
          CTX.fillText(helixChars[i % helixChars.length], x1 - 3, y + 3);
          CTX.fillStyle = `rgba(0,229,255,${a2})`;
          CTX.fillText(helixChars[(i + 4) % helixChars.length], x2 - 3, y + 3);
          if (i % 3 === 0) {
            CTX.beginPath();
            CTX.moveTo(x1, y);
            CTX.lineTo(x2, y);
            CTX.strokeStyle = `rgba(255,255,255,${Math.min(a1, a2) * 0.15})`;
            CTX.lineWidth = 0.5;
            CTX.stroke();
          }
        }
      }

      // ── Horizontal sweep line ───────────────────────────────────────────
      const scanY = ((elapsed * 55) % (H + 60)) - 30;
      const sg = CTX.createLinearGradient(0, scanY - 14, 0, scanY + 14);
      sg.addColorStop(0,   "rgba(0,255,100,0)");
      sg.addColorStop(0.5, "rgba(0,255,100,0.04)");
      sg.addColorStop(1,   "rgba(0,255,100,0)");
      CTX.fillStyle = sg;
      CTX.fillRect(0, scanY - 14, W, 28);

      // ── Vignette ────────────────────────────────────────────────────────
      const vig = CTX.createRadialGradient(cx, cy, H * 0.14, cx, cy, Math.max(W, H) * 0.78);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.65)");
      CTX.fillStyle = vig;
      CTX.fillRect(0, 0, W, H);

      // ═══ HUD LAYER ═══════════════════════════════════════════════════════
      HCTX.clearRect(0, 0, W, H);
      const BP = 24;
      const BS = 22;

      // Corner brackets
      HCTX.strokeStyle = "rgba(0,255,100,0.5)";
      HCTX.lineWidth = 1.2;
      const corners: [number, number, number, number][] = [
        [BP, BP, 1, 1], [W - BP, BP, -1, 1],
        [BP, H - BP, 1, -1], [W - BP, H - BP, -1, -1],
      ];
      corners.forEach(([x, y, dx, dy]) => {
        HCTX.beginPath();
        HCTX.moveTo(x, y + dy * BS);
        HCTX.lineTo(x, y);
        HCTX.lineTo(x + dx * BS, y);
        HCTX.stroke();
      });

      // Terminal boot text (top area, fades after 8s)
      const bootOpacity = elapsed < 8 ? 1 : Math.max(0, 1 - (elapsed - 8) * 0.5);
      if (bootOpacity > 0.01) {
        HCTX.save();
        HCTX.globalAlpha = bootOpacity;
        HCTX.textAlign = "left";
        const bootX = 70;
        BOOT_LINES.forEach((line, i) => {
          if (elapsed < line.t) return;
          const progress = Math.min(1, (elapsed - line.t) / 0.5);
          const shown = line.txt.slice(0, Math.floor(line.txt.length * progress));
          HCTX.font = `10px ${FONT_MONO}`;
          HCTX.fillStyle = line.col;
          HCTX.fillText(shown, bootX, 80 + i * 18);
        });
        HCTX.restore();
      }

      // Top-left monitor panel (always on after boot fades)
      const panelOpacity = elapsed < 6 ? 0 : Math.min(1, (elapsed - 6) * 0.5);
      if (panelOpacity > 0.01) {
        HCTX.save();
        HCTX.globalAlpha = panelOpacity;
        HCTX.textAlign = "left";
        HCTX.font = `bold 10px ${FONT_MONO}`;
        HCTX.fillStyle = "rgba(0,255,100,0.85)";
        HCTX.fillText("◈  ENDPOINT THREAT MONITOR", BP + 6, BP + 26);
        HCTX.font = `9px ${FONT_MONO}`;
        HCTX.fillStyle = "rgba(0,255,100,0.4)";
        HCTX.fillText("SOPHOS XDR · INTERCEPT X · LIVE DISCOVER", BP + 6, BP + 40);

        const stats: [string, string, string][] = [
          ["NODES",   "22/22",                                         "rgba(0,255,100,0.85)"],
          ["BLOCKED", String(847 + Math.floor(Math.sin(elapsed*0.4)*3)),"rgba(255,50,50,0.9)"],
          ["PACKETS", String(9412 + Math.floor(elapsed * 2.3)),         "rgba(0,229,255,0.85)"],
          ["SWEEP",   "ACTIVE",                                         "rgba(0,255,100,0.75)"],
        ];
        stats.forEach(([label, val, col], i) => {
          HCTX.font = `8px ${FONT_MONO}`;
          HCTX.fillStyle = "rgba(0,255,100,0.3)";
          HCTX.fillText(label, BP + 6, BP + 58 + i * 15);
          HCTX.font = `bold 8px ${FONT_MONO}`;
          HCTX.fillStyle = col;
          HCTX.fillText(val, BP + 86, BP + 58 + i * 15);
        });
        HCTX.restore();
      }

      // Top-right uptime panel
      if (panelOpacity > 0.01) {
        HCTX.save();
        HCTX.globalAlpha = panelOpacity;
        const mm  = Math.floor(Math.floor(elapsed) / 60).toString().padStart(2, "0");
        const ss2 = (Math.floor(elapsed) % 60).toString().padStart(2, "0");
        HCTX.textAlign = "right";
        HCTX.font = `bold 10px ${FONT_MONO}`;
        HCTX.fillStyle = "rgba(0,255,100,0.85)";
        HCTX.fillText("SYSTEM STATUS  ◈", W - BP - 6, BP + 26);
        HCTX.font = `9px ${FONT_MONO}`;
        HCTX.fillStyle = "rgba(0,255,100,0.4)";
        HCTX.fillText(`UPTIME ${mm}:${ss2}`, W - BP - 6, BP + 40);

        const sys: [string, string, string][] = [
          ["EDR ENGINE",  "ONLINE", "rgba(0,255,100,0.9)"],
          ["MITRE ATT&CK","ACTIVE", "rgba(0,255,100,0.9)"],
          ["ROOT CAUSE",  "ARMED",  "rgba(255,150,0,0.9)"],
          ["POLICY SYNC", "OK",     "rgba(0,255,100,0.9)"],
        ];
        sys.forEach(([label, val, col], i) => {
          HCTX.font = `8px ${FONT_MONO}`;
          HCTX.fillStyle = "rgba(0,255,100,0.3)";
          HCTX.fillText(label, W - BP - 6, BP + 58 + i * 15);
          HCTX.font = `bold 8px ${FONT_MONO}`;
          HCTX.fillStyle = col;
          HCTX.fillText(val, W - BP - 98, BP + 58 + i * 15);
        });
        HCTX.restore();
      }

      // Bottom-left legend
      if (panelOpacity > 0.01) {
        HCTX.save();
        HCTX.globalAlpha = panelOpacity;
        HCTX.textAlign = "left";
        const legend: [string, string][] = [
          ["CRITICAL",  "rgba(255,34,68,0.9)"],
          ["WARNING",   "rgba(0,229,255,0.9)"],
          ["MONITORED", "rgba(0,255,100,0.9)"],
        ];
        legend.forEach(([label, col], i) => {
          HCTX.beginPath();
          HCTX.arc(BP + 10, H - BP - 38 + i * 15, 3.5, 0, PI2);
          HCTX.fillStyle = col;
          HCTX.fill();
          HCTX.font = `8px ${FONT_MONO}`;
          HCTX.fillStyle = "rgba(255,255,255,0.42)";
          HCTX.fillText(label, BP + 22, H - BP - 34 + i * 15);
        });
        HCTX.restore();
      }

      // Bottom-right telemetry
      if (panelOpacity > 0.01) {
        HCTX.save();
        HCTX.globalAlpha = panelOpacity;
        const LOGS = [
          "BLOCK   91.215.4.17   RU-11  XDR",
          "ALERT   RANSOMWARE    CONTAINED",
          "BLOCK   178.93.12.4   UK-04  EDR",
          "DETECT  LATERAL-MOV   SG-02  XDR",
          "SYNC    POLICY-V9     OK",
          "SCAN    LIVE-DISCOVER OK",
          "CLEAN   QUARANTINE    OK",
        ];
        HCTX.textAlign = "right";
        const li = Math.floor(elapsed * 0.5) % LOGS.length;
        for (let i = 0; i < 4; i++) {
          const idx = (li + i) % LOGS.length;
          HCTX.font = `8px ${FONT_MONO}`;
          HCTX.fillStyle = `rgba(0,255,100,${0.14 + (i / 4) * 0.48})`;
          HCTX.fillText(LOGS[idx], W - BP - 6, H - BP - 38 + i * 13);
        }
        HCTX.textAlign = "left";
        HCTX.restore();
      }
    }

    resize();
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position:"fixed", inset:0, width:"100vw", height:"100vh", zIndex:0, pointerEvents:"none" }}
      />
      <canvas
        ref={hudRef}
        aria-hidden="true"
        style={{ position:"fixed", inset:0, width:"100vw", height:"100vh", zIndex:1, pointerEvents:"none" }}
      />
    </>
  );
}