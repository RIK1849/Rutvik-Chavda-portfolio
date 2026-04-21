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
    const PI2  = Math.PI * 2;
    const DEG  = Math.PI / 180;
    let W = 0, H = 0, rafId = 0;
    const startTime = performance.now();
    const FONT_MONO = "'Share Tech Mono', 'Courier New', monospace";

    type Node   = { x: number; y: number; z: number; phase: number; tier: number; label: string };
    type Edge   = { a: number; b: number; phase: number };
    type Packet = { edge: number; t: number; speed: number };
    type Star   = { x: number; y: number; size: number; alpha: number; tw: number };
    type Hex    = { ring: number; idx: number; angle: number };

    let nodes: Node[]   = [];
    let edges: Edge[]   = [];
    let packets: Packet[] = [];
    let stars: Star[]   = [];
    let hexes: Hex[]    = [];

    let mouseX = 0, mouseY = 0;
    let rotY = 0, tiltX = 0;

    const TIER_LABELS = [
      "XDR","EDR","IR","MITRE","SIEM","SQL","PS","BASH",
      "SOC","RCA","AWS","LINUX","SYSMON","SPLUNK","DNS","TLS",
      "IDS","IOC","MALW","RANS","FORENSIC","HUNT",
    ];

    function colForTier(tier: number, a: number) {
      if (tier === 0) return `rgba(0,255,100,${a})`;
      if (tier === 1) return `rgba(0,229,255,${a})`;
      return `rgba(255,34,68,${a})`;
    }

    function buildScene() {
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

      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y, nodes[i].z - nodes[j].z);
          if (d < 1.0) edges.push({ a: i, b: j, phase: Math.random() * PI2 });
        }
      }

      packets = Array.from({ length: 18 }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.002 + Math.random() * 0.005,
      }));

      stars = Array.from({ length: 320 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.3 + 0.1,
        alpha: Math.random() * 0.5 + 0.08,
        tw: Math.random() * PI2,
      }));

      hexes = [];
      for (let ring = 1; ring <= 6; ring++) {
        const count = ring * 6;
        for (let i = 0; i < count; i++) {
          hexes.push({ ring, idx: i, angle: (i / count) * PI2 });
        }
      }
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      hud.width    = W; hud.height    = H;
      buildScene();
    }

    // FIX: Explictly mapped to globalThis.MouseEvent to avoid React typing conflicts
    const onMouse = (e: globalThis.MouseEvent) => {
      mouseX = (e.clientX / W - 0.5) * 2;
      mouseY = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener("resize",    resize);
    window.addEventListener("mousemove", onMouse);

    const BOOT_LINES = [
      { t: 0.0, txt: "> SSH rutvik@sophos-xdr-cluster.prod --port 443",   col: "rgba(0,255,100,0.95)"  },
      { t: 0.9, txt: "  Authenticating RSA-4096 ...  [ OK ]",             col: "rgba(0,255,100,0.85)"  },
      { t: 1.7, txt: "  XDR ENGINE: ONLINE   |   INTERCEPT X: ACTIVE",    col: "rgba(0,229,255,0.9)"   },
      { t: 2.5, txt: "  MITRE ATT&CK: ARMED  |  LIVE DISCOVER: READY",    col: "rgba(0,229,255,0.85)"  },
      { t: 3.3, txt: "  LOADING: Data Lake · Sysmon · Event Logs",        col: "rgba(0,255,100,0.8)"   },
      { t: 4.1, txt: "  INCIDENTS RESOLVED: 500+   RANK: TOP 10 FY25",    col: "rgba(255,34,68,0.9)"   },
      { t: 4.9, txt: "  CY25 AWARDS: 5x COMMUNITY + GLOBAL EXCELLENCE",   col: "rgba(0,255,100,0.85)"  },
      { t: 5.7, txt: "> Identity: RUTVIK CHAVDA — L2/L3 Security Eng",    col: "rgba(0,229,255,0.95)"  },
      { t: 6.5, txt: "> Session established. Portfolio online.",          col: "rgba(0,255,100,0.95)"  },
    ];

    function project(x: number, y: number, z: number, cx: number, cy: number, radius: number): [number, number, number] {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      return [cx + x1 * radius, cy - y2 * radius, z2];
    }

    function drawHexagon(x: number, y: number, r: number, strokeStyle: string, lineWidth: number) {
      CTX.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = i * 60 * DEG;
        // FIX: Replaced ternary with if/else to satisfy ESLint's no-unused-expressions
        if (i === 0) {
          CTX.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
        } else {
          CTX.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
        }
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
      const radius = Math.min(W, H) * 0.25;

      rotY  += 0.0022;
      tiltX += (mouseY * 0.16 - tiltX) * 0.03;

      CTX.clearRect(0, 0, W, H);
      const bg = CTX.createRadialGradient(cx, cy * 0.8, 0, cx, cy, Math.max(W, H) * 0.8);
      bg.addColorStop(0,   "#021a0d");
      bg.addColorStop(0.4, "#010d06");
      bg.addColorStop(1,   "#000000");
      CTX.fillStyle = bg;
      CTX.fillRect(0, 0, W, H);

      // Stars
      stars.forEach((s) => {
        s.tw += 0.01;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.tw));
        CTX.beginPath();
        CTX.arc(s.x, s.y, s.size, 0, PI2);
        CTX.fillStyle = `rgba(255,255,255,${a})`;
        CTX.fill();
      });

      // Hex rings
      const hexPulse = 0.5 + 0.5 * Math.sin(elapsed * 0.55);
      hexes.forEach((h) => {
        const rotAng = h.angle + elapsed * 0.07 * (h.ring % 2 === 0 ? 1 : -1);
        const dist = h.ring * 36 * (1 + hexPulse * 0.04);
        const hx = cx + Math.cos(rotAng) * dist;
        const hy = cy + Math.sin(rotAng) * dist;
        const hr = 10 + h.ring * 2.5;
        const a  = (0.2 - h.ring * 0.025) * (0.4 + 0.5 * Math.sin(elapsed * 0.6 + h.ring + h.idx));
        drawHexagon(hx, hy, hr, `rgba(0,255,100,${a})`, 0.6);
      });

      // Radar rings
      for (let r = 1; r <= 5; r++) {
        CTX.beginPath();
        CTX.arc(cx, cy, radius * r / 4 + radius * 0.2, 0, PI2);
        CTX.strokeStyle = `rgba(0,255,100,${0.04 + 0.025 * Math.sin(elapsed + r)})`;
        CTX.lineWidth = 0.5;
        CTX.stroke();
      }
      for (let a = 0; a < 12; a++) {
        CTX.beginPath();
        const ang = a * Math.PI / 6;
        CTX.moveTo(cx, cy);
        CTX.lineTo(cx + Math.cos(ang) * radius * 1.4, cy + Math.sin(ang) * radius * 1.4);
        CTX.strokeStyle = "rgba(0,255,100,0.03)";
        CTX.lineWidth = 0.4;
        CTX.stroke();
      }

      // Radar sweep
      const sweep = (elapsed * 0.65) % PI2;
      const sweepR = radius * 1.35;
      for (let a = 0; a < 60; a++) {
        const ang = sweep - a * 0.014;
        CTX.beginPath();
        CTX.moveTo(cx, cy);
        CTX.arc(cx, cy, sweepR, ang, ang + 0.014);
        CTX.fillStyle = `rgba(0,255,100,${(0.4 - a / 60) * 0.085})`;
        CTX.fill();
      }
      CTX.beginPath();
      CTX.moveTo(cx, cy);
      CTX.lineTo(cx + Math.cos(sweep) * sweepR, cy + Math.sin(sweep) * sweepR);
      CTX.strokeStyle = "rgba(0,255,100,0.55)";
      CTX.lineWidth = 1.1;
      CTX.stroke();

      // Globe core
      CTX.beginPath();
      CTX.arc(cx, cy, radius, 0, PI2);
      const core = CTX.createRadialGradient(cx - radius * 0.3, cy - radius * 0.25, 0, cx, cy, radius);
      core.addColorStop(0, "#012812");
      core.addColorStop(1, "#001208");
      CTX.fillStyle = core;
      CTX.fill();
      CTX.beginPath();
      CTX.arc(cx, cy, radius, 0, PI2);
      CTX.strokeStyle = `rgba(0,255,100,${0.28 + 0.1 * Math.sin(elapsed * 1.2)})`;
      CTX.lineWidth = 1.2;
      CTX.stroke();
      CTX.beginPath();
      CTX.arc(cx, cy, radius * 0.82, 0, PI2);
      CTX.strokeStyle = "rgba(0,255,100,0.06)";
      CTX.lineWidth = 0.5;
      CTX.stroke();

      // Neural edges
      edges.forEach((e) => {
        const A = nodes[e.a], B = nodes[e.b];
        const [ax, ay, az] = project(A.x, A.y, A.z, cx, cy, radius * 0.7);
        const [bx, by, bz] = project(B.x, B.y, B.z, cx, cy, radius * 0.7);
        const avgZ = (az + bz) / 2;
        const zFactor = (avgZ + 1) / 2;
        const pulse = 0.03 + 0.12 * Math.abs(Math.sin(elapsed * 0.9 + e.phase));
        CTX.beginPath();
        CTX.moveTo(ax, ay);
        CTX.lineTo(bx, by);
        CTX.strokeStyle = `rgba(0,255,100,${pulse * (0.4 + 0.6 * zFactor)})`;
        CTX.lineWidth = 0.5;
        CTX.stroke();
      });

      // Packets
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
        const zA = Math.max(0.2, (pz + 1) / 2);
        CTX.beginPath();
        CTX.arc(px, py, 2, 0, PI2);
        CTX.fillStyle = `rgba(255,255,255,${zA * 0.9})`;
        CTX.fill();
        CTX.beginPath();
        CTX.arc(px, py, 4, 0, PI2);
        CTX.fillStyle = `rgba(0,255,100,${zA * 0.2})`;
        CTX.fill();
      });

      // Nodes
      // FIX: Removed unused 'i' variable here to satisfy ESLint
      const sortedNodes = nodes
        .map((n) => { const [x, y, z] = project(n.x, n.y, n.z, cx, cy, radius * 0.7); return { n, x, y, z }; })
        .sort((a, b) => a.z - b.z);

      sortedNodes.forEach(({ n, x, y, z }) => {
        n.phase += 0.032;
        const pulse = Math.abs(Math.sin(n.phase));
        const zScale = 0.4 + 0.6 * ((z + 1) / 2);
        const baseSize = (3 + pulse * 1.8) * zScale;
        const ringSize = (7 + 5 * pulse) * zScale;
        CTX.beginPath();
        CTX.arc(x, y, ringSize, 0, PI2);
        CTX.strokeStyle = colForTier(n.tier, (0.5 - 0.35 * pulse) * zScale);
        CTX.lineWidth = 0.8;
        CTX.stroke();
        CTX.beginPath();
        CTX.arc(x, y, baseSize, 0, PI2);
        CTX.fillStyle = colForTier(n.tier, 0.9 * zScale);
        CTX.fill();
        const angleFromCenter = Math.atan2(y - cy, x - cx);
        const sweepDiff = ((sweep - angleFromCenter + PI2 * 3) % PI2);
        if (sweepDiff < 0.3 && zScale > 0.5) {
          CTX.font = `bold 9px ${FONT_MONO}`;
          CTX.fillStyle = colForTier(n.tier, 0.85);
          CTX.fillText(n.label, x + ringSize + 3, y + 3);
        }
      });

      // DNA helix
      const helixChars = "ATCG01XDR";
      for (let side = 0; side < 2; side++) {
        const baseX = side === 0 ? W * 0.075 : W * 0.925;
        const spread = 24;
        const steps = Math.floor(H / 14);
        for (let i = 0; i < steps; i++) {
          const prog = i / steps;
          const y = prog * H;
          const angle = prog * PI2 * 4 + elapsed * 1.1 * (side === 0 ? 1 : -1);
          const x1 = baseX + Math.cos(angle) * spread;
          const x2 = baseX + Math.cos(angle + Math.PI) * spread;
          const z1 = Math.sin(angle), z2 = Math.sin(angle + Math.PI);
          const a1 = 0.1 + 0.3 * ((z1 + 1) / 2);
          const a2 = 0.1 + 0.3 * ((z2 + 1) / 2);
          CTX.font = `8px ${FONT_MONO}`;
          CTX.fillStyle = `rgba(0,255,100,${a1})`;
          CTX.fillText(helixChars[i % helixChars.length], x1 - 3, y + 3);
          CTX.fillStyle = `rgba(0,229,255,${a2})`;
          CTX.fillText(helixChars[(i + 4) % helixChars.length], x2 - 3, y + 3);
          if (i % 3 === 0) {
            CTX.beginPath();
            CTX.moveTo(x1, y); CTX.lineTo(x2, y);
            CTX.strokeStyle = `rgba(255,255,255,${Math.min(a1, a2) * 0.12})`;
            CTX.lineWidth = 0.4;
            CTX.stroke();
          }
        }
      }

      // Scan line
      const scanY = ((elapsed * 50) % (H + 60)) - 30;
      const sg = CTX.createLinearGradient(0, scanY - 12, 0, scanY + 12);
      sg.addColorStop(0, "rgba(0,255,100,0)");
      sg.addColorStop(0.5, "rgba(0,255,100,0.035)");
      sg.addColorStop(1, "rgba(0,255,100,0)");
      CTX.fillStyle = sg;
      CTX.fillRect(0, scanY - 12, W, 24);

      // Vignette
      const vig = CTX.createRadialGradient(cx, cy, H * 0.1, cx, cy, Math.max(W, H) * 0.82);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.7)");
      CTX.fillStyle = vig;
      CTX.fillRect(0, 0, W, H);

      // ═══ HUD ═══
      HCTX.clearRect(0, 0, W, H);
      const BP = 22;
      const BS = 20;

      HCTX.strokeStyle = "rgba(0,255,100,0.5)";
      HCTX.lineWidth = 1;
      const corners: [number, number, number, number][] = [
        [BP, BP, 1, 1], [W - BP, BP, -1, 1],
        [BP, H - BP, 1, -1], [W - BP, H - BP, -1, -1],
      ];
      corners.forEach(([x, y, dx, dy]) => {
        HCTX.beginPath();
        HCTX.moveTo(x, y + dy * BS); HCTX.lineTo(x, y); HCTX.lineTo(x + dx * BS, y);
        HCTX.stroke();
      });

      const bootOpacity = elapsed < 8 ? 1 : Math.max(0, 1 - (elapsed - 8) * 0.5);
      if (bootOpacity > 0.01) {
        HCTX.save();
        HCTX.globalAlpha = bootOpacity;
        HCTX.textAlign = "left";
        BOOT_LINES.forEach((line) => {
          if (elapsed < line.t) return;
          const progress = Math.min(1, (elapsed - line.t) / 0.45);
          const shown = line.txt.slice(0, Math.floor(line.txt.length * progress));
          HCTX.font = `9px ${FONT_MONO}`;
          HCTX.fillStyle = line.col;
          const yOff = BOOT_LINES.indexOf(line);
          HCTX.fillText(shown, 68, 72 + yOff * 17);
        });
        HCTX.restore();
      }

      const panelOpacity = elapsed < 6 ? 0 : Math.min(1, (elapsed - 6) * 0.45);
      if (panelOpacity > 0.01) {
        HCTX.save();
        HCTX.globalAlpha = panelOpacity;
        HCTX.textAlign = "left";
        HCTX.font = `bold 9px ${FONT_MONO}`;
        HCTX.fillStyle = "rgba(0,255,100,0.85)";
        HCTX.fillText("◈  ENDPOINT THREAT MONITOR", BP + 6, BP + 24);
        HCTX.font = `8px ${FONT_MONO}`;
        HCTX.fillStyle = "rgba(0,255,100,0.38)";
        HCTX.fillText("SOPHOS XDR · INTERCEPT X · LIVE DISCOVER", BP + 6, BP + 37);
        const stats: [string, string, string][] = [
          ["NODES",   "22/22",                                               "rgba(0,255,100,0.85)"],
          ["BLOCKED", String(847 + Math.floor(Math.sin(elapsed*0.4)*3)),"rgba(255,50,50,0.9)"],
          ["PACKETS", String(9412 + Math.floor(elapsed * 2.3)),         "rgba(0,229,255,0.85)"],
          ["SWEEP",   "ACTIVE",                                         "rgba(0,255,100,0.75)"],
        ];
        stats.forEach(([label, val, col], i) => {
          HCTX.font = `7px ${FONT_MONO}`;
          HCTX.fillStyle = "rgba(0,255,100,0.28)";
          HCTX.fillText(label, BP + 6, BP + 53 + i * 14);
          HCTX.font = `bold 7px ${FONT_MONO}`;
          HCTX.fillStyle = col;
          HCTX.fillText(val, BP + 80, BP + 53 + i * 14);
        });

        // Right panel
        const mm  = Math.floor(Math.floor(elapsed) / 60).toString().padStart(2, "0");
        const ss2 = (Math.floor(elapsed) % 60).toString().padStart(2, "0");
        HCTX.textAlign = "right";
        HCTX.font = `bold 9px ${FONT_MONO}`;
        HCTX.fillStyle = "rgba(0,255,100,0.85)";
        HCTX.fillText("SYSTEM STATUS  ◈", W - BP - 6, BP + 24);
        HCTX.font = `8px ${FONT_MONO}`;
        HCTX.fillStyle = "rgba(0,255,100,0.38)";
        HCTX.fillText(`UPTIME  ${mm}:${ss2}`, W - BP - 6, BP + 37);
        const sys: [string, string, string][] = [
          ["EDR ENGINE",   "ONLINE", "rgba(0,255,100,0.9)"],
          ["MITRE ATT&CK", "ACTIVE", "rgba(0,255,100,0.9)"],
          ["ROOT CAUSE",   "ARMED",  "rgba(255,150,0,0.9)"],
          ["POLICY SYNC",  "OK",     "rgba(0,255,100,0.9)"],
        ];
        sys.forEach(([label, val, col], i) => {
          HCTX.font = `7px ${FONT_MONO}`;
          HCTX.fillStyle = "rgba(0,255,100,0.28)";
          HCTX.fillText(label, W - BP - 6, BP + 53 + i * 14);
          HCTX.font = `bold 7px ${FONT_MONO}`;
          HCTX.fillStyle = col;
          HCTX.fillText(val, W - BP - 96, BP + 53 + i * 14);
        });

        // Bottom telemetry
        const LOGS = [
          "BLOCK   91.215.4.17   RU-11  XDR",
          "ALERT   RANSOMWARE    CONTAINED",
          "BLOCK   178.93.12.4   UK-04  EDR",
          "DETECT  LATERAL-MOV   SG-02  XDR",
          "SYNC    POLICY-V9     OK",
          "SCAN    LIVE-DISCOVER OK",
          "CLEAN   QUARANTINE    OK",
        ];
        const li = Math.floor(elapsed * 0.45) % LOGS.length;
        for (let i = 0; i < 4; i++) {
          const idx = (li + i) % LOGS.length;
          HCTX.font = `7px ${FONT_MONO}`;
          HCTX.fillStyle = `rgba(0,255,100,${0.12 + (i / 4) * 0.45})`;
          HCTX.fillText(LOGS[idx], W - BP - 6, H - BP - 36 + i * 12);
        }
        HCTX.textAlign = "left";

        // Legend
        const legend: [string, string][] = [
          ["CRITICAL",  "rgba(255,34,68,0.9)"],
          ["WARNING",   "rgba(0,229,255,0.9)"],
          ["MONITORED", "rgba(0,255,100,0.9)"],
        ];
        legend.forEach(([label, col], i) => {
          HCTX.beginPath();
          HCTX.arc(BP + 9, H - BP - 36 + i * 14, 3, 0, PI2);
          HCTX.fillStyle = col;
          HCTX.fill();
          HCTX.font = `7px ${FONT_MONO}`;
          HCTX.fillStyle = "rgba(255,255,255,0.38)";
          HCTX.fillText(label, BP + 20, H - BP - 32 + i * 14);
        });

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
      <canvas ref={canvasRef} aria-hidden="true"
        style={{ position:"fixed", top: 0, left: 0, width:"100vw", height:"100vh", zIndex:0, pointerEvents:"none" }}/>
      <canvas ref={hudRef} aria-hidden="true"
        style={{ position:"fixed", top: 0, left: 0, width:"100vw", height:"100vh", zIndex:1, pointerEvents:"none" }}/>
    </>
  );
}