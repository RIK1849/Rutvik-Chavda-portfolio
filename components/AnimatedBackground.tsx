"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hudRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const hud = hudRef.current;
    if (!canvas || !hud) return;

    const ctx = canvas.getContext("2d");
    const hctx = hud.getContext("2d");
    if (!ctx || !hctx) return;

    // ── Sizing ────────────────────────────────────────────────────────────────
    let W = window.innerWidth;
    let H = window.innerHeight;

    // ── Math helpers ──────────────────────────────────────────────────────────
    const PI2 = Math.PI * 2;
    const DEG = Math.PI / 180;

    function ll3d(
      lat: number,
      lon: number,
      r: number,
      cx: number,
      cy: number,
      radius: number,
      rotY: number,
      tiltX: number
    ): [number, number, number] {
      const phi = (90 - lat) * DEG;
      const theta = lon * DEG + rotY;
      const x3 = r * Math.sin(phi) * Math.cos(theta) * radius;
      const y3raw = r * Math.cos(phi) * radius;
      const z3 = r * Math.sin(phi) * Math.sin(theta) * radius;
      const y3 = y3raw * Math.cos(tiltX) - z3 * Math.sin(tiltX);
      const z3t = y3raw * Math.sin(tiltX) + z3 * Math.cos(tiltX);
      return [cx + x3, cy - y3, z3t];
    }

    // ── Scene data ────────────────────────────────────────────────────────────
    // [lat, lon, severity]  0=critical 1=warning 2=clean
    const NODES: [number, number, number][] = [
      [51.5, -0.1, 2],
      [40.7, -74.0, 0],
      [35.7, 139.7, 2],
      [48.9, 2.3, 1],
      [55.7, 37.6, 0],
      [39.9, 116.4, 0],
      [28.6, 77.2, 2],
      [-33.9, 151.2, 2],
      [37.8, -122.4, 2],
      [1.3, 103.8, 1],
      [19.4, -99.1, 1],
      [52.5, 13.4, 2],
      [25.2, 55.3, 1],
      [43.7, -79.4, 2],
      [59.9, 30.3, 0],
      [31.2, 121.5, 1],
      [6.5, 3.4, 1],
      [-23.5, -46.6, 2],
      [30.0, 31.2, 1],
      [34.0, -118.2, 2],
    ];

    const ARC_PAIRS: [number, number][] = [
      [1, 4], [4, 5], [5, 14], [1, 0], [0, 3],
      [9, 5], [8, 1], [11, 0], [6, 9], [2, 9],
      [15, 5], [16, 3], [17, 1], [18, 3], [10, 8],
      [12, 0],
    ];

    const LOGS = [
      ">> BLOCK  178.93.12.4   ENDPOINT-UK-04",
      ">> ALLOW  10.0.8.22    SOPHOS-CENTRAL",
      ">> BLOCK  91.215.4.17  ENDPOINT-RU-11",
      ">> SCAN   XDR-QUERY    LIVE-DISCOVER OK",
      ">> ALERT  RANSOMWARE   CONTAINED #3821",
      ">> SYNC   POLICY-V9    PUSH COMPLETE",
      ">> BLOCK  45.142.12.8  ENDPOINT-CN-03",
      ">> DETECT LATERAL-MOV  ENDPOINT-SG-02",
      ">> BLOCK  103.21.5.9   ENDPOINT-IN-07",
      ">> CLEAN  QUARANTINE   FILE REMOVED",
    ];

    // ── Scene objects ─────────────────────────────────────────────────────────
    type Star = { x: number; y: number; size: number; opacity: number };
    type Packet = { arcIdx: number; t: number; speed: number };

    let stars: Star[] = [];
    let nodePhases: number[] = [];
    let packets: Packet[] = [];

    function buildScene() {
      stars = Array.from({ length: 280 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.1 + 0.2,
        opacity: Math.random() * 0.5 + 0.1,
      }));
      nodePhases = NODES.map(() => Math.random() * PI2);
      packets = ARC_PAIRS.slice(0, 10).map((_, i) => ({
        arcIdx: i,
        t: Math.random(),
        speed: 0.0018 + Math.random() * 0.0025,
      }));
    }

    // ── Bezier point ──────────────────────────────────────────────────────────
    function bezierPt(
      t: number,
      ax: number, ay: number,
      mx: number, my: number,
      bx: number, by: number
    ): [number, number] {
      const mt = 1 - t;
      return [
        mt * mt * ax + 2 * mt * t * mx + t * t * bx,
        mt * mt * ay + 2 * mt * t * my + t * t * by,
      ];
    }

    // ── Node colour helper ────────────────────────────────────────────────────
    function nodeRGBA(sev: number, alpha: number): string {
      if (sev === 0) return `rgba(255,34,34,${alpha})`;
      if (sev === 1) return `rgba(255,136,0,${alpha})`;
      return `rgba(0,255,100,${alpha})`;
    }

    // ── Mouse parallax ────────────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / W - 0.5) * 2;
      mouseY = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // ── Resize ────────────────────────────────────────────────────────────────
    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W;
      canvas!.height = H;
      hud!.width = W;
      hud!.height = H;
      buildScene();
    }
    window.addEventListener("resize", resize);

    // ── Animation state ───────────────────────────────────────────────────────
    let rotY = 0;
    let tiltX = 0;
    let rafId = 0;
    const startTime = performance.now();
    const FONT = "'Courier New', monospace";
    const BP = 24; // border padding

    // ── Render ────────────────────────────────────────────────────────────────
    function render(now: number) {
      rafId = requestAnimationFrame(render);

      const elapsed = (now - startTime) / 1000;
      const cx = W * 0.5;
      const cy = H * 0.5;
      const radius = Math.min(W, H) * 0.29;

      rotY += 0.0022;
      tiltX += (mouseY * 0.18 - tiltX) * 0.04;

      // ── Background ──────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createRadialGradient(W * 0.6, H * 0.35, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
      bg.addColorStop(0, "#011a0c");
      bg.addColorStop(0.5, "#000d05");
      bg.addColorStop(1, "#000000");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Stars ────────────────────────────────────────────────────────────────
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, PI2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
      });

      // ── Globe core ───────────────────────────────────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, PI2);
      const coreFill = ctx.createRadialGradient(
        cx - radius * 0.28, cy - radius * 0.22, 0,
        cx, cy, radius
      );
      coreFill.addColorStop(0, "#011f0a");
      coreFill.addColorStop(1, "#000a04");
      ctx.fillStyle = coreFill;
      ctx.fill();

      // ── Grid lines ───────────────────────────────────────────────────────────
      ctx.save();
      ctx.strokeStyle = "rgba(0,255,100,0.09)";
      ctx.lineWidth = 0.7;

      for (let lat = -75; lat <= 75; lat += 15) {
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon <= 360; lon += 4) {
          const [px, py, pz] = ll3d(lat, lon, 1, cx, cy, radius, rotY, tiltX);
          if (pz < 0) { first = true; continue; }
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          first = false;
        }
        ctx.stroke();
      }

      for (let lon = 0; lon < 360; lon += 15) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 3) {
          const [px, py, pz] = ll3d(lat, lon, 1, cx, cy, radius, rotY, tiltX);
          if (pz < 0) { first = true; continue; }
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          first = false;
        }
        ctx.stroke();
      }
      ctx.restore();

      // ── Globe edge ───────────────────────────────────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, PI2);
      ctx.strokeStyle = "rgba(0,255,100,0.18)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // ── Atmosphere halo ──────────────────────────────────────────────────────
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.12);
      halo.addColorStop(0, "rgba(0,255,100,0.07)");
      halo.addColorStop(1, "rgba(0,255,100,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.12, 0, PI2);
      ctx.fillStyle = halo;
      ctx.fill();

      // ── Arcs ─────────────────────────────────────────────────────────────────
      ARC_PAIRS.forEach(([a, b], i) => {
        const [ax, ay, az] = ll3d(NODES[a][0], NODES[a][1], 1.01, cx, cy, radius, rotY, tiltX);
        const [bx, by, bz] = ll3d(NODES[b][0], NODES[b][1], 1.01, cx, cy, radius, rotY, tiltX);
        if (az < 0 && bz < 0) return;

        const dist = Math.hypot(bx - ax, by - ay);
        const mpx = (ax + bx) / 2;
        const mpy = Math.min(ay, by) - dist * 0.42;
        const pulse = 0.07 + 0.22 * Math.abs(Math.sin(elapsed * (0.55 + i * 0.07) + i));

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(mpx, mpy, bx, by);
        ctx.strokeStyle = `rgba(0,255,100,${pulse})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      });

      // ── Packets ───────────────────────────────────────────────────────────────
      packets.forEach((pkt) => {
        pkt.t += pkt.speed;
        if (pkt.t > 1) pkt.t -= 1;
        const [a, b] = ARC_PAIRS[pkt.arcIdx];
        const [ax, ay, az] = ll3d(NODES[a][0], NODES[a][1], 1.01, cx, cy, radius, rotY, tiltX);
        const [bx, by, bz] = ll3d(NODES[b][0], NODES[b][1], 1.01, cx, cy, radius, rotY, tiltX);
        if (az < 0 && bz < 0) return;
        const dist = Math.hypot(bx - ax, by - ay);
        const mpx = (ax + bx) / 2;
        const mpy = Math.min(ay, by) - dist * 0.42;
        const [px, py] = bezierPt(pkt.t, ax, ay, mpx, mpy, bx, by);

        ctx.beginPath();
        ctx.arc(px, py, 2.6, 0, PI2);
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, PI2);
        ctx.fillStyle = "rgba(255,255,255,0.16)";
        ctx.fill();
      });

      // ── Threat nodes ──────────────────────────────────────────────────────────
      NODES.forEach(([lat, lon, sev], i) => {
        nodePhases[i] += 0.038;
        const [px, py, pz] = ll3d(lat, lon, 1.012, cx, cy, radius, rotY, tiltX);
        if (pz < 0) return;

        const pulse = Math.abs(Math.sin(nodePhases[i]));

        ctx.beginPath();
        ctx.arc(px, py, 7 + 6 * pulse, 0, PI2);
        ctx.strokeStyle = nodeRGBA(sev, 0.5 - 0.38 * pulse);
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(px, py, 3.5 + 1.4 * pulse, 0, PI2);
        ctx.fillStyle = nodeRGBA(sev, 0.95);
        ctx.fill();
      });

      // ── Scan rings ────────────────────────────────────────────────────────────
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(elapsed * 0.55);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.002, radius * 0.18, 0, 0, PI2);
      ctx.strokeStyle = `rgba(0,255,100,${0.28 + 0.2 * Math.sin(elapsed * 2.1)})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(elapsed * 0.34 + 1.05);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.998, radius * 0.24, 0.4, 0, PI2);
      ctx.strokeStyle = `rgba(0,200,255,${0.13 + 0.1 * Math.cos(elapsed * 1.7)})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();

      // ── Horizontal sweep ──────────────────────────────────────────────────────
      const scanY = ((elapsed * 55) % (H + 60)) - 30;
      const scanG = ctx.createLinearGradient(0, scanY - 14, 0, scanY + 14);
      scanG.addColorStop(0, "rgba(0,255,100,0)");
      scanG.addColorStop(0.5, "rgba(0,255,100,0.046)");
      scanG.addColorStop(1, "rgba(0,255,100,0)");
      ctx.fillStyle = scanG;
      ctx.fillRect(0, scanY - 14, W, 28);

      // ── Vignette ──────────────────────────────────────────────────────────────
      const vig = ctx.createRadialGradient(cx, cy, H * 0.18, cx, cy, Math.max(W, H) * 0.78);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.62)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ── HUD ───────────────────────────────────────────────────────────────────
      hctx.clearRect(0, 0, W, H);

      // Corner brackets
      hctx.strokeStyle = "rgba(0,255,100,0.5)";
      hctx.lineWidth = 1.2;
      const BS = 22;
      [[BP, BP, 1, 1], [W - BP, BP, -1, 1], [BP, H - BP, 1, -1], [W - BP, H - BP, -1, -1]].forEach(
        ([x, y, dx, dy]) => {
          hctx.beginPath();
          hctx.moveTo(x, y + dy * BS);
          hctx.lineTo(x, y);
          hctx.lineTo(x + dx * BS, y);
          hctx.stroke();
        }
      );

      // Top-left panel
      hctx.textAlign = "left";
      hctx.font = `bold 11px ${FONT}`;
      hctx.fillStyle = "rgba(0,255,100,0.9)";
      hctx.fillText("◈  ENDPOINT THREAT MONITOR", BP + 4, BP + 28);
      hctx.font = `10px ${FONT}`;
      hctx.fillStyle = "rgba(0,255,100,0.42)";
      hctx.fillText("SOPHOS XDR  ·  INTERCEPT X  ·  LIVE DISCOVER", BP + 4, BP + 44);

      const stats: [string, string, string][] = [
        ["ACTIVE SENSORS", "20 / 20", "rgba(0,255,100,0.85)"],
        ["THREATS BLOCKED", String(847 + Math.floor(Math.sin(elapsed * 0.4) * 3)), "rgba(255,50,50,0.9)"],
        ["ARCS TRACKED", "16", "rgba(0,255,100,0.75)"],
        ["DATA PACKETS", String(9412 + Math.floor(elapsed * 2.3)), "rgba(0,200,255,0.85)"],
      ];
      stats.forEach(([label, val, col], i) => {
        hctx.font = `9px ${FONT}`;
        hctx.fillStyle = "rgba(0,255,100,0.28)";
        hctx.fillText(label, BP + 4, BP + 64 + i * 17);
        hctx.font = `bold 9px ${FONT}`;
        hctx.fillStyle = col;
        hctx.fillText(val, BP + 160, BP + 64 + i * 17);
      });

      // Top-right panel
      const mm = Math.floor(Math.floor(elapsed) / 60).toString().padStart(2, "0");
      const ss = (Math.floor(elapsed) % 60).toString().padStart(2, "0");
      hctx.textAlign = "right";
      hctx.font = `bold 11px ${FONT}`;
      hctx.fillStyle = "rgba(0,255,100,0.9)";
      hctx.fillText("SYSTEM STATUS  ◈", W - BP - 4, BP + 28);
      hctx.font = `10px ${FONT}`;
      hctx.fillStyle = "rgba(0,255,100,0.42)";
      hctx.fillText(`UPTIME  ${mm}:${ss}`, W - BP - 4, BP + 44);

      const sys: [string, string, string][] = [
        ["EDR ENGINE", "ONLINE", "rgba(0,255,100,0.9)"],
        ["MITRE ATT&CK", "ACTIVE", "rgba(0,255,100,0.9)"],
        ["ROOT CAUSE", "ARMED", "rgba(255,150,0,0.9)"],
        ["POLICY SYNC", "OK", "rgba(0,255,100,0.9)"],
      ];
      sys.forEach(([label, val, col], i) => {
        hctx.font = `9px ${FONT}`;
        hctx.fillStyle = "rgba(0,255,100,0.28)";
        hctx.fillText(label, W - BP - 4, BP + 64 + i * 17);
        hctx.font = `bold 9px ${FONT}`;
        hctx.fillStyle = col;
        hctx.fillText(val, W - BP - 152, BP + 64 + i * 17);
      });

      // Bottom-left legend
      hctx.textAlign = "left";
      ([
        ["CRITICAL", "rgba(255,34,34,0.9)"],
        ["WARNING", "rgba(255,136,0,0.9)"],
        ["MONITORED", "rgba(0,255,100,0.9)"],
      ] as [string, string][]).forEach(([label, col], i) => {
        hctx.beginPath();
        hctx.arc(BP + 8, H - BP - 38 + i * 16, 4, 0, PI2);
        hctx.fillStyle = col;
        hctx.fill();
        hctx.font = `9px ${FONT}`;
        hctx.fillStyle = "rgba(255,255,255,0.4)";
        hctx.fillText(label, BP + 20, H - BP - 34 + i * 16);
      });

      // Bottom-right telemetry scroll
      hctx.textAlign = "right";
      const logIdx = Math.floor(elapsed * 0.55) % LOGS.length;
      for (let i = 0; i < 5; i++) {
        const idx = (logIdx + i) % LOGS.length;
        hctx.font = `9px ${FONT}`;
        hctx.fillStyle = `rgba(0,255,100,${0.13 + (i / 5) * 0.55})`;
        hctx.fillText(LOGS[idx], W - BP - 4, H - BP - 38 + i * 14);
      }
      hctx.textAlign = "left";
    }

    // ── Start ─────────────────────────────────────────────────────────────────
    resize();
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <canvas
        ref={hudRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </>
  );
}