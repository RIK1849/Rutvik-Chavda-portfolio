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

    const PI2 = Math.PI * 2;
    const DEG = Math.PI / 180;
    let W = 0, H = 0, rafId = 0;
    const startTime = performance.now();
    const FONT = "'Share Tech Mono', 'Courier New', monospace";

    // ── Scene objects ──────────────────────────────────────────────────────
    type Star    = { x: number; y: number; size: number; alpha: number; twinkle: number };
    type Packet  = { arcIdx: number; t: number; speed: number; col: string };
    type HexRing = { angle: number; speed: number; radius: number; alpha: number };

    let stars:    Star[]    = [];
    let packets:  Packet[]  = [];
    let hexRings: HexRing[] = [];
    let nodePhases: number[] = [];
    let mouseX = 0, mouseY = 0;
    let rotY = 0, tiltX = 0;

    // ── Geo nodes [lat, lon, severity 0=crit 1=warn 2=ok] ─────────────────
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
      const x3 = r * Math.sin(phi) * Math.cos(theta) * radius;
      const y3r = r * Math.cos(phi) * radius;
      const z3 = r * Math.sin(phi) * Math.sin(theta) * radius;
      const y3 = y3r * Math.cos(tiltX) - z3 * Math.sin(tiltX);
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

    // ── Hex grid drawing ───────────────────────────────────────────────────
    function drawHexGrid(
      cx: number, cy: number, size: number, alpha: number
    ) {
      const cols = Math.ceil(W / (size * 1.5)) + 2;
      const rows = Math.ceil(H / (size * Math.sqrt(3))) + 2;
      ctx.save();
      ctx.strokeStyle = `rgba(0,255,100,${alpha})`;
      ctx.lineWidth = 0.5;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * size * 1.5;
          const y = row * size * Math.sqrt(3) + (col % 2 === 0 ? 0 : size * Math.sqrt(3) / 2);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * 60) * DEG;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    function buildScene() {
      stars = Array.from({ length: 320 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        size: Math.random() * 1.2 + 0.15,
        alpha: Math.random() * 0.5 + 0.1,
        twinkle: Math.random() * PI2,
      }));
      nodePhases = NODES.map(() => Math.random() * PI2);
      packets = ARC_PAIRS.slice(0, 10).map((_, i) => ({
        arcIdx: i, t: Math.random(),
        speed: 0.0016 + Math.random() * 0.003,
        col: i % 3 === 0 ? "rgba(255,50,50,0.9)" : i % 3 === 1 ? "rgba(255,136,0,0.9)" : "rgba(0,255,100,0.9)",
      }));
      hexRings = Array.from({ length: 3 }, (_, i) => ({
        angle: (i / 3) * PI2,
        speed: 0.004 + i * 0.002,
        radius: 0.95 + i * 0.06,
        alpha: 0.25 - i * 0.06,
      }));
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W; canvas!.height = H;
      hud!.width    = W; hud!.height    = H;
      buildScene();
    }

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / W - 0.5) * 2;
      mouseY = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    // ── Main render ────────────────────────────────────────────────────────
    function render(now: number) {
      rafId = requestAnimationFrame(render);
      const t = (now - startTime) / 1000;
      const cx = W * 0.5, cy = H * 0.5;
      const radius = Math.min(W, H) * 0.265;

      rotY += 0.0019;
      tiltX += (mouseY * 0.16 - tiltX) * 0.035;

      // Background
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createRadialGradient(W*0.55, H*0.4, 0, W*0.5, H*0.5, Math.max(W,H)*0.8);
      bg.addColorStop(0,   "#011508");
      bg.addColorStop(0.4, "#000d04");
      bg.addColorStop(1,   "#000000");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Hex grid (very subtle, full bg)
      drawHexGrid(cx, cy, 38, 0.025 + 0.008 * Math.sin(t * 0.3));

      // Stars with twinkle
      stars.forEach((s) => {
        s.twinkle += 0.012;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, PI2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });

      // Globe core
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, PI2);
      const core = ctx.createRadialGradient(cx - radius*0.3, cy - radius*0.25, 0, cx, cy, radius);
      core.addColorStop(0, "#011f0a");
      core.addColorStop(1, "#000a04");
      ctx.fillStyle = core;
      ctx.fill();

      // Lat/lon grid lines
      ctx.save();
      ctx.strokeStyle = "rgba(0,255,100,0.085)";
      ctx.lineWidth = 0.6;
      for (let lat = -75; lat <= 75; lat += 15) {
        ctx.beginPath(); let first = true;
        for (let lon = 0; lon <= 360; lon += 3) {
          const [px, py, pz] = ll3d(lat, lon, 1, cx, cy, radius);
          if (pz < 0) { first = true; continue; }
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          first = false;
        }
        ctx.stroke();
      }
      for (let lon = 0; lon < 360; lon += 15) {
        ctx.beginPath(); let first = true;
        for (let lat2 = -90; lat2 <= 90; lat2 += 3) {
          const [px, py, pz] = ll3d(lat2, lon, 1, cx, cy, radius);
          if (pz < 0) { first = true; continue; }
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          first = false;
        }
        ctx.stroke();
      }
      ctx.restore();

      // Globe edge + atmosphere
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, PI2);
      ctx.strokeStyle = `rgba(0,255,100,${0.16 + 0.06*Math.sin(t*1.2)})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      const atmos = ctx.createRadialGradient(cx, cy, radius*0.92, cx, cy, radius*1.14);
      atmos.addColorStop(0, `rgba(0,255,100,${0.06+0.02*Math.sin(t)})` );
      atmos.addColorStop(1, "rgba(0,255,100,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius*1.14, 0, PI2);
      ctx.fillStyle = atmos;
      ctx.fill();

      // Rotating hex rings around globe
      hexRings.forEach((hr) => {
        hr.angle += hr.speed * 0.022;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(hr.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, radius*hr.radius, radius*hr.radius*0.22, 0, 0, PI2);
        ctx.strokeStyle = `rgba(0,255,100,${hr.alpha * (0.7 + 0.3*Math.sin(t*1.5))})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });

      // Second tilted ring (cyan)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.28 + 1.1);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius*1.04, radius*0.28, 0.5, 0, PI2);
      ctx.strokeStyle = `rgba(0,229,255,${0.1+0.07*Math.cos(t*1.8)})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();

      // Arcs
      ARC_PAIRS.forEach(([a, b], i) => {
        const [ax, ay, az] = ll3d(NODES[a][0], NODES[a][1], 1.01, cx, cy, radius);
        const [bx, by, bz] = ll3d(NODES[b][0], NODES[b][1], 1.01, cx, cy, radius);
        if (az < 0 && bz < 0) return;
        const dist = Math.hypot(bx-ax, by-ay);
        const mpx = (ax+bx)/2;
        const mpy = Math.min(ay, by) - dist*0.44;
        const pulse = 0.06 + 0.22 * Math.abs(Math.sin(t*(0.5+i*0.07)+i));
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(mpx, mpy, bx, by);
        ctx.strokeStyle = `rgba(0,255,100,${pulse})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });

      // Data packets
      packets.forEach((pkt) => {
        pkt.t += pkt.speed;
        if (pkt.t > 1) pkt.t -= 1;
        const [a, b] = ARC_PAIRS[pkt.arcIdx];
        const [ax, ay, az] = ll3d(NODES[a][0], NODES[a][1], 1.01, cx, cy, radius);
        const [bx, by, bz] = ll3d(NODES[b][0], NODES[b][1], 1.01, cx, cy, radius);
        if (az < 0 && bz < 0) return;
        const dist = Math.hypot(bx-ax, by-ay);
        const mpx = (ax+bx)/2, mpy = Math.min(ay,by) - dist*0.44;
        const [px, py] = bezierPt(pkt.t, ax, ay, mpx, mpy, bx, by);
        ctx.beginPath(); ctx.arc(px, py, 2.8, 0, PI2);
        ctx.fillStyle = pkt.col; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, 5.5, 0, PI2);
        ctx.fillStyle = pkt.col.replace(/[\d.]+\)$/, "0.14)"); ctx.fill();
      });

      // Threat nodes
      NODES.forEach(([lat, lon, sev], i) => {
        nodePhases[i] += 0.036;
        const [px, py, pz] = ll3d(lat, lon, 1.013, cx, cy, radius);
        if (pz < 0) return;
        const pulse = Math.abs(Math.sin(nodePhases[i]));
        // outer ring
        ctx.beginPath();
        ctx.arc(px, py, 8 + 6*pulse, 0, PI2);
        ctx.strokeStyle = nodeColor(sev, 0.45 - 0.32*pulse);
        ctx.lineWidth = 1; ctx.stroke();
        // mid ring
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, PI2);
        ctx.strokeStyle = nodeColor(sev, 0.6);
        ctx.lineWidth = 0.8; ctx.stroke();
        // core
        ctx.beginPath();
        ctx.arc(px, py, 2.8 + pulse*1.2, 0, PI2);
        ctx.fillStyle = nodeColor(sev, 0.95); ctx.fill();
      });

      // Horizontal sweep line
      const scanY = ((t * 52) % (H + 60)) - 30;
      const sg = ctx.createLinearGradient(0, scanY-16, 0, scanY+16);
      sg.addColorStop(0, "rgba(0,255,100,0)");
      sg.addColorStop(0.5, "rgba(0,255,100,0.042)");
      sg.addColorStop(1, "rgba(0,255,100,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY-16, W, 32);

      // Vignette
      const vig = ctx.createRadialGradient(cx, cy, H*0.16, cx, cy, Math.max(W,H)*0.82);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);

      // ── HUD ──────────────────────────────────────────────────────────────
      hctx.clearRect(0, 0, W, H);
      const BP = 26;

      // Corner brackets
      hctx.strokeStyle = "rgba(0,255,100,0.48)";
      hctx.lineWidth = 1.2;
      const BS = 24;
      [[BP,BP,1,1],[W-BP,BP,-1,1],[BP,H-BP,1,-1],[W-BP,H-BP,-1,-1]].forEach(([x,y,dx,dy]) => {
        hctx.beginPath();
        hctx.moveTo(x, y+dy*BS); hctx.lineTo(x,y); hctx.lineTo(x+dx*BS,y);
        hctx.stroke();
      });

      // Top-left
      hctx.textAlign = "left";
      hctx.font = `bold 11px ${FONT}`;
      hctx.fillStyle = "rgba(0,255,100,0.88)";
      hctx.fillText("◈  ENDPOINT THREAT MONITOR", BP+4, BP+28);
      hctx.font = `10px ${FONT}`;
      hctx.fillStyle = "rgba(0,255,100,0.4)";
      hctx.fillText("SOPHOS XDR  ·  INTERCEPT X  ·  LIVE DISCOVER", BP+4, BP+44);

      const stats: [string,string,string][] = [
        ["ACTIVE SENSORS","20 / 20","rgba(0,255,100,0.88)"],
        ["THREATS BLOCKED",String(847+Math.floor(Math.sin(t*0.4)*3)),"rgba(255,50,50,0.9)"],
        ["ARCS TRACKED","16","rgba(0,255,100,0.75)"],
        ["DATA PACKETS",String(9412+Math.floor(t*2.3)),"rgba(0,229,255,0.85)"],
      ];
      stats.forEach(([label, val, col], i) => {
        hctx.font = `9px ${FONT}`;
        hctx.fillStyle = "rgba(0,255,100,0.28)";
        hctx.fillText(label, BP+4, BP+62+i*17);
        hctx.font = `bold 9px ${FONT}`;
        hctx.fillStyle = col;
        hctx.fillText(val, BP+164, BP+62+i*17);
      });

      // Top-right
      const mm = Math.floor(Math.floor(t)/60).toString().padStart(2,"0");
      const ss2 = (Math.floor(t)%60).toString().padStart(2,"0");
      hctx.textAlign = "right";
      hctx.font = `bold 11px ${FONT}`;
      hctx.fillStyle = "rgba(0,255,100,0.88)";
      hctx.fillText("SYSTEM STATUS  ◈", W-BP-4, BP+28);
      hctx.font = `10px ${FONT}`;
      hctx.fillStyle = "rgba(0,255,100,0.4)";
      hctx.fillText(`UPTIME  ${mm}:${ss2}`, W-BP-4, BP+44);

      const sys: [string,string,string][] = [
        ["EDR ENGINE","ONLINE","rgba(0,255,100,0.9)"],
        ["MITRE ATT&CK","ACTIVE","rgba(0,255,100,0.9)"],
        ["ROOT CAUSE","ARMED","rgba(255,150,0,0.9)"],
        ["POLICY SYNC","OK","rgba(0,255,100,0.9)"],
      ];
      sys.forEach(([label, val, col], i) => {
        hctx.font = `9px ${FONT}`;
        hctx.fillStyle = "rgba(0,255,100,0.28)";
        hctx.fillText(label, W-BP-4, BP+62+i*17);
        hctx.font = `bold 9px ${FONT}`;
        hctx.fillStyle = col;
        hctx.fillText(val, W-BP-158, BP+62+i*17);
      });

      // Bottom-left legend
      hctx.textAlign = "left";
      ([["CRITICAL","rgba(255,34,34,0.9)"],["WARNING","rgba(255,136,0,0.9)"],["MONITORED","rgba(0,255,100,0.9)"]] as [string,string][]).forEach(([label,col],i) => {
        hctx.beginPath(); hctx.arc(BP+8, H-BP-38+i*16, 4, 0, PI2);
        hctx.fillStyle = col; hctx.fill();
        hctx.font = `9px ${FONT}`;
        hctx.fillStyle = "rgba(255,255,255,0.38)";
        hctx.fillText(label, BP+20, H-BP-34+i*16);
      });

      // Bottom-right telemetry
      hctx.textAlign = "right";
      const li = Math.floor(t*0.5) % LOGS.length;
      for (let i = 0; i < 5; i++) {
        const idx = (li+i) % LOGS.length;
        hctx.font = `9px ${FONT}`;
        hctx.fillStyle = `rgba(0,255,100,${0.12+(i/5)*0.52})`;
        hctx.fillText(LOGS[idx], W-BP-4, H-BP-38+i*14);
      }
      hctx.textAlign = "left";
    }

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
      <canvas ref={canvasRef} aria-hidden="true" style={{ position:"fixed",inset:0,width:"100vw",height:"100vh",zIndex:0,pointerEvents:"none" }} />
      <canvas ref={hudRef}    aria-hidden="true" style={{ position:"fixed",inset:0,width:"100vw",height:"100vh",zIndex:1,pointerEvents:"none" }} />
    </>
  );
}