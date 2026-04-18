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

    // ── Capture non-null refs for use inside closures ──────────────────────
    const CTX  = ctx;
    const HCTX = hctx;

    const PI2  = Math.PI * 2;
    const DEG  = Math.PI / 180;
    let W = 0, H = 0, rafId = 0;
    const startTime = performance.now();
    const FONT = "'Share Tech Mono', 'Courier New', monospace";

    // ── Types ──────────────────────────────────────────────────────────────
    type Star    = { x: number; y: number; size: number; alpha: number; twinkle: number };
    type Packet  = { arcIdx: number; t: number; speed: number; col: string };
    type HexRing = { angle: number; speed: number; radiusFactor: number; alpha: number };

    let stars:      Star[]    = [];
    let packets:    Packet[]  = [];
    let hexRings:   HexRing[] = [];
    let nodePhases: number[]  = [];
    let mouseX = 0, mouseY = 0;
    let rotY = 0, tiltX = 0;

    // ── Geo data ───────────────────────────────────────────────────────────
    const NODES: [number, number, number][] = [
      [51.5,-0.1,2],[40.7,-74,0],[35.7,139.7,2],[48.9,2.3,1],
      [55.7,37.6,0],[39.9,116.4,0],[28.6,77.2,2],[-33.9,151.2,2],
      [37.8,-122.4,2],[1.3,103.8,1],[19.4,-99.1,1],[52.5,13.4,2],
      [25.2,55.3,1],[43.7,-79.4,2],[59.9,30.3,0],[31.2,121.5,1],
      [6.5,3.4,1],[-23.5,-46.6,2],[30,31.2,1],[34,-118.2,2],
    ];

    const ARC_PAIRS: [number, number][] = [
      [1,4],[4,5],[5,14],[1,0],[0,3],[9,5],[8,1],[11,0],
      [6,9],[2,9],[15,5],[16,3],[17,1],[18,3],[10,8],[12,0],
    ];

    const LOGS = [
      "BLOCK   91.215.4.17   ENDPOINT-RU-11   XDR",
      "ALERT   RANSOMWARE    CONTAINED #3821  IR",
      "BLOCK   178.93.12.4   ENDPOINT-UK-04   EDR",
      "DETECT  LATERAL-MOV   ENDPOINT-SG-02  XDR",
      "SYNC    POLICY-V9     PUSH COMPLETE    OK",
      "BLOCK   45.142.12.8   ENDPOINT-CN-03   EDR",
      "SCAN    LIVE-DISCOVER QUERY EXEC       OK",
      "BLOCK   103.21.5.9    ENDPOINT-IN-07   XDR",
      "CLEAN   QUARANTINE    FILE REMOVED     OK",
      "ALLOW   10.0.8.22     SOPHOS-CENTRAL   OK",
    ];

    // ── Helpers ────────────────────────────────────────────────────────────
    function nodeColor(sev: number, a: number): string {
      if (sev === 0) return `rgba(255,34,34,${a})`;
      if (sev === 1) return `rgba(255,136,0,${a})`;
      return `rgba(0,255,100,${a})`;
    }

    function ll3d(
      lat: number, lon: number, r: number,
      cx: number, cy: number, radius: number
    ): [number, number, number] {
      const phi   = (90 - lat) * DEG;
      const theta = lon * DEG + rotY;
      const x3  = r * Math.sin(phi) * Math.cos(theta) * radius;
      const y3r = r * Math.cos(phi) * radius;
      const z3  = r * Math.sin(phi) * Math.sin(theta) * radius;
      const y3  = y3r * Math.cos(tiltX) - z3 * Math.sin(tiltX);
      const z3t = y3r * Math.sin(tiltX) + z3 * Math.cos(tiltX);
      return [cx + x3, cy - y3, z3t];
    }

    function bezierPt(
      t: number,
      ax: number, ay: number,
      mx: number, my: number,
      bx: number, by: number
    ): [number, number] {
      const mt = 1 - t;
      return [
        mt*mt*ax + 2*mt*t*mx + t*t*bx,
        mt*mt*ay + 2*mt*t*my + t*t*by,
      ];
    }

    // ── Hex grid (uses CTX directly — never null here) ─────────────────────
    function drawHexGrid(size: number, alpha: number) {
      const cols = Math.ceil(W / (size * 1.5)) + 2;
      const rows = Math.ceil(H / (size * Math.sqrt(3))) + 2;
      CTX.save();
      CTX.strokeStyle = `rgba(0,255,100,${alpha})`;
      CTX.lineWidth = 0.5;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * size * 1.5;
          const y = row * size * Math.sqrt(3) + (col % 2 === 0 ? 0 : size * Math.sqrt(3) / 2);
          CTX.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = i * 60 * DEG;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            i === 0 ? CTX.moveTo(px, py) : CTX.lineTo(px, py);
          }
          CTX.closePath();
          CTX.stroke();
        }
      }
      CTX.restore();
    }

    // ── Scene build ────────────────────────────────────────────────────────
    function buildScene() {
      stars = Array.from({ length: 320 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.2 + 0.15,
        alpha: Math.random() * 0.5 + 0.1,
        twinkle: Math.random() * PI2,
      }));
      nodePhases = NODES.map(() => Math.random() * PI2);
      packets = ARC_PAIRS.slice(0, 10).map((_, i) => ({
        arcIdx: i,
        t: Math.random(),
        speed: 0.0016 + Math.random() * 0.003,
        col: i % 3 === 0
          ? "rgba(255,50,50,0.9)"
          : i % 3 === 1
          ? "rgba(255,136,0,0.9)"
          : "rgba(0,255,100,0.9)",
      }));
      hexRings = Array.from({ length: 3 }, (_, i) => ({
        angle: (i / 3) * PI2,
        speed: 0.004 + i * 0.002,
        radiusFactor: 0.95 + i * 0.06,
        alpha: 0.25 - i * 0.06,
      }));
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

    // ── Render loop ────────────────────────────────────────────────────────
    function render(now: number) {
      rafId = requestAnimationFrame(render);
      const elapsed = (now - startTime) / 1000;
      const cx = W * 0.5;
      const cy = H * 0.5;
      const radius = Math.min(W, H) * 0.265;

      rotY  += 0.0019;
      tiltX += (mouseY * 0.16 - tiltX) * 0.035;

      // ── Background ──────────────────────────────────────────────────────
      CTX.clearRect(0, 0, W, H);
      const bg = CTX.createRadialGradient(W*0.55, H*0.4, 0, W*0.5, H*0.5, Math.max(W,H)*0.8);
      bg.addColorStop(0,   "#011508");
      bg.addColorStop(0.4, "#000d04");
      bg.addColorStop(1,   "#000000");
      CTX.fillStyle = bg;
      CTX.fillRect(0, 0, W, H);

      // ── Hex grid ────────────────────────────────────────────────────────
      drawHexGrid(38, 0.025 + 0.008 * Math.sin(elapsed * 0.3));

      // ── Stars ───────────────────────────────────────────────────────────
      stars.forEach((s) => {
        s.twinkle += 0.012;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
        CTX.beginPath();
        CTX.arc(s.x, s.y, s.size, 0, PI2);
        CTX.fillStyle = `rgba(255,255,255,${a})`;
        CTX.fill();
      });

      // ── Globe core ──────────────────────────────────────────────────────
      CTX.beginPath();
      CTX.arc(cx, cy, radius, 0, PI2);
      const core = CTX.createRadialGradient(cx - radius*0.3, cy - radius*0.25, 0, cx, cy, radius);
      core.addColorStop(0, "#011f0a");
      core.addColorStop(1, "#000a04");
      CTX.fillStyle = core;
      CTX.fill();

      // ── Lat/lon grid ─────────────────────────────────────────────────────
      CTX.save();
      CTX.strokeStyle = "rgba(0,255,100,0.085)";
      CTX.lineWidth   = 0.6;

      for (let lat = -75; lat <= 75; lat += 15) {
        CTX.beginPath();
        let first = true;
        for (let lon = 0; lon <= 360; lon += 3) {
          const [px, py, pz] = ll3d(lat, lon, 1, cx, cy, radius);
          if (pz < 0) { first = true; continue; }
          first ? CTX.moveTo(px, py) : CTX.lineTo(px, py);
          first = false;
        }
        CTX.stroke();
      }

      for (let lon = 0; lon < 360; lon += 15) {
        CTX.beginPath();
        let first = true;
        for (let lat2 = -90; lat2 <= 90; lat2 += 3) {
          const [px, py, pz] = ll3d(lat2, lon, 1, cx, cy, radius);
          if (pz < 0) { first = true; continue; }
          first ? CTX.moveTo(px, py) : CTX.lineTo(px, py);
          first = false;
        }
        CTX.stroke();
      }
      CTX.restore();

      // ── Globe edge + atmosphere ──────────────────────────────────────────
      CTX.beginPath();
      CTX.arc(cx, cy, radius, 0, PI2);
      CTX.strokeStyle = `rgba(0,255,100,${0.16 + 0.06 * Math.sin(elapsed * 1.2)})`;
      CTX.lineWidth   = 1.4;
      CTX.stroke();

      const atmos = CTX.createRadialGradient(cx, cy, radius*0.92, cx, cy, radius*1.14);
      atmos.addColorStop(0, `rgba(0,255,100,${0.06 + 0.02 * Math.sin(elapsed)})`);
      atmos.addColorStop(1, "rgba(0,255,100,0)");
      CTX.beginPath();
      CTX.arc(cx, cy, radius*1.14, 0, PI2);
      CTX.fillStyle = atmos;
      CTX.fill();

      // ── Rotating orbital rings ───────────────────────────────────────────
      hexRings.forEach((hr) => {
        hr.angle += hr.speed * 0.022;
        CTX.save();
        CTX.translate(cx, cy);
        CTX.rotate(hr.angle);
        CTX.beginPath();
        CTX.ellipse(0, 0, radius*hr.radiusFactor, radius*hr.radiusFactor*0.22, 0, 0, PI2);
        CTX.strokeStyle = `rgba(0,255,100,${hr.alpha * (0.7 + 0.3 * Math.sin(elapsed * 1.5))})`;
        CTX.lineWidth   = 1;
        CTX.stroke();
        CTX.restore();
      });

      // ── Second tilted ring (cyan) ────────────────────────────────────────
      CTX.save();
      CTX.translate(cx, cy);
      CTX.rotate(elapsed * 0.28 + 1.1);
      CTX.beginPath();
      CTX.ellipse(0, 0, radius*1.04, radius*0.28, 0.5, 0, PI2);
      CTX.strokeStyle = `rgba(0,229,255,${0.1 + 0.07 * Math.cos(elapsed * 1.8)})`;
      CTX.lineWidth   = 0.8;
      CTX.stroke();
      CTX.restore();

      // ── Attack arcs ─────────────────────────────────────────────────────
      ARC_PAIRS.forEach(([a, b], i) => {
        const [ax, ay, az] = ll3d(NODES[a][0], NODES[a][1], 1.01, cx, cy, radius);
        const [bx, by, bz] = ll3d(NODES[b][0], NODES[b][1], 1.01, cx, cy, radius);
        if (az < 0 && bz < 0) return;
        const dist  = Math.hypot(bx - ax, by - ay);
        const mpx   = (ax + bx) / 2;
        const mpy   = Math.min(ay, by) - dist * 0.44;
        const pulse = 0.06 + 0.22 * Math.abs(Math.sin(elapsed * (0.5 + i * 0.07) + i));
        CTX.beginPath();
        CTX.moveTo(ax, ay);
        CTX.quadraticCurveTo(mpx, mpy, bx, by);
        CTX.strokeStyle = `rgba(0,255,100,${pulse})`;
        CTX.lineWidth   = 0.9;
        CTX.stroke();
      });

      // ── Data packets ─────────────────────────────────────────────────────
      packets.forEach((pkt) => {
        pkt.t += pkt.speed;
        if (pkt.t > 1) pkt.t -= 1;
        const [a, b] = ARC_PAIRS[pkt.arcIdx];
        const [ax, ay, az] = ll3d(NODES[a][0], NODES[a][1], 1.01, cx, cy, radius);
        const [bx, by, bz] = ll3d(NODES[b][0], NODES[b][1], 1.01, cx, cy, radius);
        if (az < 0 && bz < 0) return;
        const dist = Math.hypot(bx - ax, by - ay);
        const mpx  = (ax + bx) / 2;
        const mpy  = Math.min(ay, by) - dist * 0.44;
        const [px, py] = bezierPt(pkt.t, ax, ay, mpx, mpy, bx, by);
        CTX.beginPath(); CTX.arc(px, py, 2.8, 0, PI2);
        CTX.fillStyle = pkt.col; CTX.fill();
        CTX.beginPath(); CTX.arc(px, py, 5.5, 0, PI2);
        CTX.fillStyle = pkt.col.replace(/[\d.]+\)$/, "0.14)"); CTX.fill();
      });

      // ── Threat nodes ─────────────────────────────────────────────────────
      NODES.forEach(([lat, lon, sev], i) => {
        nodePhases[i] += 0.036;
        const [px, py, pz] = ll3d(lat, lon, 1.013, cx, cy, radius);
        if (pz < 0) return;
        const pulse = Math.abs(Math.sin(nodePhases[i]));
        CTX.beginPath();
        CTX.arc(px, py, 8 + 6 * pulse, 0, PI2);
        CTX.strokeStyle = nodeColor(sev, 0.45 - 0.32 * pulse);
        CTX.lineWidth   = 1;
        CTX.stroke();
        CTX.beginPath();
        CTX.arc(px, py, 4.5, 0, PI2);
        CTX.strokeStyle = nodeColor(sev, 0.6);
        CTX.lineWidth   = 0.8;
        CTX.stroke();
        CTX.beginPath();
        CTX.arc(px, py, 2.8 + pulse * 1.2, 0, PI2);
        CTX.fillStyle = nodeColor(sev, 0.95);
        CTX.fill();
      });

      // ── Horizontal sweep ─────────────────────────────────────────────────
      const scanY = ((elapsed * 52) % (H + 60)) - 30;
      const sg    = CTX.createLinearGradient(0, scanY - 16, 0, scanY + 16);
      sg.addColorStop(0,   "rgba(0,255,100,0)");
      sg.addColorStop(0.5, "rgba(0,255,100,0.042)");
      sg.addColorStop(1,   "rgba(0,255,100,0)");
      CTX.fillStyle = sg;
      CTX.fillRect(0, scanY - 16, W, 32);

      // ── Vignette ─────────────────────────────────────────────────────────
      const vig = CTX.createRadialGradient(cx, cy, H*0.16, cx, cy, Math.max(W,H)*0.82);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.65)");
      CTX.fillStyle = vig;
      CTX.fillRect(0, 0, W, H);

      // ── HUD ──────────────────────────────────────────────────────────────
      HCTX.clearRect(0, 0, W, H);
      const BP = 26;
      const BS = 24;

      // Corner brackets
      HCTX.strokeStyle = "rgba(0,255,100,0.48)";
      HCTX.lineWidth   = 1.2;
      const corners: [number, number, number, number][] = [
        [BP, BP, 1, 1], [W-BP, BP, -1, 1],
        [BP, H-BP, 1, -1], [W-BP, H-BP, -1, -1],
      ];
      corners.forEach(([x, y, dx, dy]) => {
        HCTX.beginPath();
        HCTX.moveTo(x, y + dy * BS);
        HCTX.lineTo(x, y);
        HCTX.lineTo(x + dx * BS, y);
        HCTX.stroke();
      });

      // Top-left panel
      HCTX.textAlign  = "left";
      HCTX.font       = `bold 11px ${FONT}`;
      HCTX.fillStyle  = "rgba(0,255,100,0.88)";
      HCTX.fillText("◈  ENDPOINT THREAT MONITOR", BP + 4, BP + 28);
      HCTX.font       = `10px ${FONT}`;
      HCTX.fillStyle  = "rgba(0,255,100,0.4)";
      HCTX.fillText("SOPHOS XDR  ·  INTERCEPT X  ·  LIVE DISCOVER", BP + 4, BP + 44);

      const stats: [string, string, string][] = [
        ["ACTIVE SENSORS",  "20 / 20",                                     "rgba(0,255,100,0.88)"],
        ["THREATS BLOCKED", String(847 + Math.floor(Math.sin(elapsed*0.4)*3)), "rgba(255,50,50,0.9)"],
        ["ARCS TRACKED",    "16",                                           "rgba(0,255,100,0.75)"],
        ["DATA PACKETS",    String(9412 + Math.floor(elapsed * 2.3)),       "rgba(0,229,255,0.85)"],
      ];
      stats.forEach(([label, val, col], i) => {
        HCTX.font      = `9px ${FONT}`;
        HCTX.fillStyle = "rgba(0,255,100,0.28)";
        HCTX.fillText(label, BP + 4, BP + 62 + i * 17);
        HCTX.font      = `bold 9px ${FONT}`;
        HCTX.fillStyle = col;
        HCTX.fillText(val, BP + 164, BP + 62 + i * 17);
      });

      // Top-right panel
      const mm  = Math.floor(Math.floor(elapsed) / 60).toString().padStart(2, "0");
      const ss2 = (Math.floor(elapsed) % 60).toString().padStart(2, "0");
      HCTX.textAlign  = "right";
      HCTX.font       = `bold 11px ${FONT}`;
      HCTX.fillStyle  = "rgba(0,255,100,0.88)";
      HCTX.fillText("SYSTEM STATUS  ◈", W - BP - 4, BP + 28);
      HCTX.font       = `10px ${FONT}`;
      HCTX.fillStyle  = "rgba(0,255,100,0.4)";
      HCTX.fillText(`UPTIME  ${mm}:${ss2}`, W - BP - 4, BP + 44);

      const sys: [string, string, string][] = [
        ["EDR ENGINE",  "ONLINE", "rgba(0,255,100,0.9)"],
        ["MITRE ATT&CK","ACTIVE", "rgba(0,255,100,0.9)"],
        ["ROOT CAUSE",  "ARMED",  "rgba(255,150,0,0.9)"],
        ["POLICY SYNC", "OK",     "rgba(0,255,100,0.9)"],
      ];
      sys.forEach(([label, val, col], i) => {
        HCTX.font      = `9px ${FONT}`;
        HCTX.fillStyle = "rgba(0,255,100,0.28)";
        HCTX.fillText(label, W - BP - 4, BP + 62 + i * 17);
        HCTX.font      = `bold 9px ${FONT}`;
        HCTX.fillStyle = col;
        HCTX.fillText(val, W - BP - 158, BP + 62 + i * 17);
      });

      // Bottom-left legend
      HCTX.textAlign = "left";
      const legend: [string, string][] = [
        ["CRITICAL",  "rgba(255,34,34,0.9)"],
        ["WARNING",   "rgba(255,136,0,0.9)"],
        ["MONITORED", "rgba(0,255,100,0.9)"],
      ];
      legend.forEach(([label, col], i) => {
        HCTX.beginPath();
        HCTX.arc(BP + 8, H - BP - 38 + i * 16, 4, 0, PI2);
        HCTX.fillStyle = col;
        HCTX.fill();
        HCTX.font      = `9px ${FONT}`;
        HCTX.fillStyle = "rgba(255,255,255,0.38)";
        HCTX.fillText(label, BP + 20, H - BP - 34 + i * 16);
      });

      // Bottom-right telemetry scroll
      HCTX.textAlign = "right";
      const li = Math.floor(elapsed * 0.5) % LOGS.length;
      for (let i = 0; i < 5; i++) {
        const idx = (li + i) % LOGS.length;
        HCTX.font      = `9px ${FONT}`;
        HCTX.fillStyle = `rgba(0,255,100,${0.12 + (i / 5) * 0.52})`;
        HCTX.fillText(LOGS[idx], W - BP - 4, H - BP - 38 + i * 14);
      }
      HCTX.textAlign = "left";
    }

    // ── Start ──────────────────────────────────────────────────────────────
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
        style={{
          position: "fixed", inset: 0,
          width: "100vw", height: "100vh",
          zIndex: 0, pointerEvents: "none",
        }}
      />
      <canvas
        ref={hudRef}
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0,
          width: "100vw", height: "100vh",
          zIndex: 1, pointerEvents: "none",
        }}
      />
    </>
  );
}