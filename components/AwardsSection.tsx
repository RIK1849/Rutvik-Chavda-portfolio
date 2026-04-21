"use client";
import { useEffect, useRef, useState } from "react";

const FEATURED_AWARDS = [
  {
    title: "Global Support Services Excellence Award (2024)",
    badge: "◈ GLOBAL EXCELLENCE — SOPHOS SUPPORT",
    period: "May 2025",
    color: "#fbbf24",
    description:
      "Recognised with the Global Support Services Excellence Award 2024 at Sophos for outstanding performance in Endpoint Security and Technical Support. Resolved complex L2/L3 issues across Windows environments, including EDR (Sophos Intercept X) and malware incidents. Improved resolution times, performed root cause analysis, and delivered high customer satisfaction through effective incident response and log analysis.",
  },
  {
    title: "Sophos Support Team Top 10 — FY25",
    badge: "◈ GLOBAL RANKING — TOP 10 WORLDWIDE",
    period: "Nov 2023",
    color: "#00ff64",
    description:
      "Ranked among the top 10 support engineers globally at Sophos for FY25 — recognised for outstanding case quality, consistent SLA adherence, customer satisfaction scores, and internal knowledge contribution across the endpoint security portfolio.",
  },
];

const COMMUNITY_AWARDS = [
  {
    title: "Top Sophos Staff Community Contributor — CY25 Q2",
    period: "CY25 Q2",
    color: "#38bdf8",
    description:
      "Recognised as a top community staff contributor for Q2 CY25 — acknowledged for detailed, technically precise, and consistently valuable engagement supporting enterprise customers.",
  },
  {
    title: "Top Sophos Staff Community Contributor — CY25 Q3",
    period: "CY25 Q3",
    color: "#38bdf8",
    description:
      "Recognised as a top community staff contributor for Q3 CY25 — maintaining exceptional contribution quality and strong technical presence in the global Sophos community.",
  },
  {
    title: "Top Sophos Staff Community Contributor — CY25 Q4",
    period: "CY25 Q4",
    color: "#38bdf8",
    description:
      "Recognised as a top community staff contributor for Q4 CY25 — sustaining high-quality technical output and consistent community engagement through the close of the calendar year.",
  },
  {
    title: "Top Sophos Staff Community Contributor — CY25 Overall",
    period: "CY25 Full Year",
    color: "#a78bfa",
    description:
      "Ranked as the top community staff contributor globally for the entire CY25 calendar year — recognised for the highest sustained volume of technically accurate, deeply detailed support content across the Sophos partner and customer community.",
  },
];

const TOTAL_AWARDS = FEATURED_AWARDS.length + COMMUNITY_AWARDS.length;

const MEDAL_DATA = [
  { color: "#fbbf24", label: "GLOBAL\nEXCELLENCE", sub: "2024",  sizeMul: 1.0,  featured: true  },
  { color: "#00ff64", label: "TOP 10\nWORLDWIDE",  sub: "FY25",  sizeMul: 0.9,  featured: true  },
  { color: "#38bdf8", label: "COMMUNITY\nCONTRIBUTOR", sub: "Q2", sizeMul: 0.72, featured: false },
  { color: "#38bdf8", label: "COMMUNITY\nCONTRIBUTOR", sub: "Q3", sizeMul: 0.72, featured: false },
  { color: "#38bdf8", label: "COMMUNITY\nCONTRIBUTOR", sub: "Q4", sizeMul: 0.72, featured: false },
  { color: "#a78bfa", label: "TOP\nCONTRIBUTOR",   sub: "CY25", sizeMul: 0.78, featured: false },
];

function AwardsCanvas3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });
  const rafRef    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const PI2 = Math.PI * 2;
    const DEG = Math.PI / 180;

    type Vec3 = { x: number; y: number; z: number };

    type Medal = {
      pos: Vec3;
      rot: Vec3;
      rotVel: Vec3;
      orbitR: number;
      orbitSpeed: number;
      orbitAngle: number;
      orbitTilt: number;
      floatPhase: number;
      floatAmp: number;
      size: number;
      color: string;
      label: string;
      sub: string;
      featured: boolean;
      hoverScale: number;
      hovered: boolean;
    };

    let medals: Medal[] = [];
    let sceneRotX = 0, sceneRotY = 0;
    let targetRotX = 0, targetRotY = 0;
    let manualRotX = 0, manualRotY = 0;
    let isDragging = false;
    let lastMouse = { x: 0, y: 0 };
    let time = 0;

    function buildMedals() {
      const base = Math.min(W, H) * 0.13;
      medals = MEDAL_DATA.map((m, i) => {
        const angle = (i / MEDAL_DATA.length) * PI2;
        return {
          pos: { x: 0, y: 0, z: 0 },
          rot: { x: Math.random() * PI2, y: Math.random() * PI2, z: 0 },
          rotVel: {
            x: (Math.random() - 0.5) * 0.007,
            y: (Math.random() - 0.5) * 0.011,
            z: 0,
          },
          orbitR: i < 2 ? Math.min(W, H) * 0.19 : Math.min(W, H) * 0.28,
          orbitSpeed: (i < 2 ? 0.0035 : 0.006) * (i % 2 === 0 ? 1 : -1),
          orbitAngle: angle,
          orbitTilt: (i * 28 * DEG) % (Math.PI * 0.55),
          floatPhase: Math.random() * PI2,
          floatAmp: Math.min(W, H) * 0.022,
          size: base * m.sizeMul,
          color: m.color,
          label: m.label,
          sub: m.sub,
          featured: m.featured,
          hoverScale: 1,
          hovered: false,
        };
      });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      ctx!.scale(dpr, dpr);
      buildMedals();
    }

    function rotatePoint(p: Vec3, rx: number, ry: number): Vec3 {
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const x1 =  p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const y2 =  p.y * cosX - z1 * sinX;
      const z2 =  p.y * sinX + z1 * cosX;
      return { x: x1, y: y2, z: z2 };
    }

    function project(p: Vec3, fov: number) {
      const cx = W / 2, cy = H / 2;
      const z = p.z + fov;
      const scale = fov / Math.max(z, 1);
      return { sx: cx + p.x * scale, sy: cy + p.y * scale, scale };
    }

    function hexPath(cx: number, cy: number, r: number, rot = 0) {
      ctx!.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = rot + i * 60 * DEG;
        i === 0
          ? ctx!.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
          : ctx!.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      }
      ctx!.closePath();
    }

    function drawMedal(
      mx: number, my: number,
      radius: number,
      color: string,
      label: string,
      sub: string,
      featured: boolean,
      depth: number,
      rotX: number,
      rotY: number,
      hoverScale: number,
    ) {
      ctx!.save();
      ctx!.translate(mx, my);
      ctx!.scale(hoverScale, hoverScale);

      const alpha = Math.max(0.25, Math.min(1, 0.25 + depth * 0.75));
      const r = radius;

      // Outer glow halo
      const glowR = r * 2.5;
      const glow = ctx!.createRadialGradient(0, 0, r * 0.2, 0, 0, glowR);
      glow.addColorStop(0,   color + (featured ? "60" : "35"));
      glow.addColorStop(0.4, color + "15");
      glow.addColorStop(1,   "transparent");
      ctx!.globalAlpha = alpha * 0.9;
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(0, 0, glowR, 0, PI2);
      ctx!.fill();

      // 3D perspective skew
      ctx!.save();
      const skX = Math.sin(rotY) * 0.4;
      const skY = Math.sin(rotX) * 0.22;
      ctx!.transform(
        1 - Math.abs(skX) * 0.18, skY,
        skX, 1 - Math.abs(skY) * 0.12,
        0, 0,
      );

      ctx!.globalAlpha = alpha;

      // Drop shadow
      ctx!.save();
      ctx!.globalAlpha = alpha * 0.45;
      ctx!.translate(r * 0.14, r * 0.2);
      hexPath(0, 0, r, 30 * DEG);
      ctx!.fillStyle = "rgba(0,0,0,0.85)";
      ctx!.fill();
      ctx!.restore();

      ctx!.globalAlpha = alpha;

      // Hex face
      hexPath(0, 0, r, 30 * DEG);
      const face = ctx!.createRadialGradient(-r * 0.22, -r * 0.26, 0, r * 0.08, r * 0.08, r * 1.15);
      face.addColorStop(0,   "#0d2018");
      face.addColorStop(0.55,"#040f08");
      face.addColorStop(1,   "#000");
      ctx!.fillStyle = face;
      ctx!.fill();

      // Border
      hexPath(0, 0, r, 30 * DEG);
      ctx!.strokeStyle = color + (featured ? "dd" : "90");
      ctx!.lineWidth = featured ? 2.5 : 1.8;
      ctx!.stroke();

      // Inner rings
      hexPath(0, 0, r * 0.84, 30 * DEG);
      ctx!.strokeStyle = color + "35";
      ctx!.lineWidth = 0.9;
      ctx!.stroke();

      hexPath(0, 0, r * 0.62, 30 * DEG);
      ctx!.strokeStyle = color + "22";
      ctx!.lineWidth = 0.6;
      ctx!.stroke();

      // Catch light top-left
      const hl = ctx!.createRadialGradient(-r * 0.32, -r * 0.32, 0, -r * 0.1, -r * 0.1, r * 0.9);
      hl.addColorStop(0,   "rgba(255,255,255,0.15)");
      hl.addColorStop(0.5, "rgba(255,255,255,0.04)");
      hl.addColorStop(1,   "transparent");
      hexPath(0, 0, r, 30 * DEG);
      ctx!.fillStyle = hl;
      ctx!.fill();

      // Color tint
      const tint = ctx!.createRadialGradient(0, 0, 0, 0, 0, r);
      tint.addColorStop(0,   color + "22");
      tint.addColorStop(0.7, color + "0a");
      tint.addColorStop(1,   "transparent");
      hexPath(0, 0, r, 30 * DEG);
      ctx!.fillStyle = tint;
      ctx!.fill();

      // Edge rim light (bottom right)
      hexPath(0, 0, r, 30 * DEG);
      const rim = ctx!.createLinearGradient(-r, -r, r, r);
      rim.addColorStop(0,   "transparent");
      rim.addColorStop(0.7, "transparent");
      rim.addColorStop(1,   color + "30");
      ctx!.strokeStyle = rim;
      ctx!.lineWidth = 3;
      ctx!.stroke();

      ctx!.restore(); // end skew

      // Center orb
      ctx!.globalAlpha = alpha;
      const orbR = r * 0.2;
      const orbG = ctx!.createRadialGradient(-orbR * 0.35, -orbR * 0.35, 0, 0, 0, orbR * 1.3);
      orbG.addColorStop(0,   "#ffffff");
      orbG.addColorStop(0.25, color);
      orbG.addColorStop(1,   color + "40");
      ctx!.beginPath();
      ctx!.arc(0, 0, orbR, 0, PI2);
      ctx!.fillStyle = orbG;
      ctx!.fill();

      // Orb rings
      [1.8, 2.6, 3.6].forEach((mul, ri) => {
        ctx!.beginPath();
        ctx!.arc(0, 0, orbR * mul, 0, PI2);
        ctx!.strokeStyle = color + ["55","30","15"][ri];
        ctx!.lineWidth = [1.2, 0.8, 0.5][ri];
        ctx!.stroke();
      });

      // Label
      ctx!.globalAlpha = alpha;
      const lSize = Math.max(10, r * 0.162);
      ctx!.font = `700 ${lSize}px 'Share Tech Mono', monospace`;
      ctx!.fillStyle = color;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      const lines = label.split("\n");
      const lH = lSize * 1.32;
      const lTop = r * 0.54;
      lines.forEach((line, li) => {
        ctx!.fillText(line, 0, lTop + (li - (lines.length - 1) / 2) * lH);
      });

      // Sub
      const sSize = Math.max(8, r * 0.125);
      ctx!.font = `${sSize}px 'Share Tech Mono', monospace`;
      ctx!.fillStyle = color + "65";
      ctx!.fillText(sub, 0, lTop + (lines.length / 2) * lH + sSize * 1.3);

      // Hover pulse ring
      if (hoverScale > 1.04) {
        ctx!.globalAlpha = (hoverScale - 1) * 3 * alpha;
        ctx!.beginPath();
        ctx!.arc(0, 0, r * 1.22, 0, PI2);
        ctx!.strokeStyle = color;
        ctx!.lineWidth = 1.8;
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(0, 0, r * 1.38, 0, PI2);
        ctx!.strokeStyle = color + "40";
        ctx!.lineWidth = 0.8;
        ctx!.stroke();
      }

      ctx!.restore();
    }

    function drawBG(t: number) {
      ctx!.clearRect(0, 0, W, H);

      // Radial dark bg
      const bg = ctx!.createRadialGradient(W/2, H*0.42, 0, W/2, H/2, Math.max(W,H)*0.75);
      bg.addColorStop(0,   "#021a0d");
      bg.addColorStop(0.38,"#010d06");
      bg.addColorStop(1,   "#000000");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);

      // Perspective grid floor
      ctx!.save();
      ctx!.globalAlpha = 0.09;
      const vx = W / 2, vy = H * 0.35;
      const gridY = H;
      const cols = 14;
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols) * W;
        ctx!.beginPath();
        ctx!.moveTo(vx + (x - vx) * 0.08, vy + (gridY - vy) * 0.08);
        ctx!.lineTo(x, gridY);
        ctx!.strokeStyle = "#00ff64";
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      }
      for (let j = 0; j <= 8; j++) {
        const p = j / 8;
        const yy = vy + (gridY - vy) * (0.08 + p * 0.92);
        const xl = vx + (0 - vx) * (0.08 + p * 0.92);
        const xr = vx + (W - vx) * (0.08 + p * 0.92);
        ctx!.beginPath();
        ctx!.moveTo(xl, yy);
        ctx!.lineTo(xr, yy);
        ctx!.strokeStyle = "#00ff64";
        ctx!.lineWidth = 0.4;
        ctx!.stroke();
      }
      ctx!.restore();

      // Stars
      ctx!.save();
      for (let i = 0; i < 80; i++) {
        const sx = ((i * 139.7 + t * 4) % W);
        const sy = ((i * 78.3 + Math.sin(t * 0.5 + i) * 20) % H);
        const sa = 0.08 + 0.22 * Math.abs(Math.sin(t * 0.9 + i * 0.8));
        const sr = 0.4 + (i % 4) * 0.35;
        ctx!.beginPath();
        ctx!.arc(sx, sy, sr, 0, PI2);
        ctx!.fillStyle = `rgba(255,255,255,${sa})`;
        ctx!.fill();
      }
      ctx!.restore();

      // Ambient nebula
      ctx!.save();
      ctx!.globalAlpha = 0.055 + 0.015 * Math.sin(t * 0.4);
      const neb = ctx!.createRadialGradient(W * 0.5, H * 0.38, 0, W * 0.5, H * 0.38, H * 0.6);
      neb.addColorStop(0, "#00ff64");
      neb.addColorStop(1, "transparent");
      ctx!.fillStyle = neb;
      ctx!.fillRect(0, 0, W, H);
      ctx!.restore();
    }

    function drawHUD(t: number) {
      ctx!.save();

      // Labels
      ctx!.font = `700 10px 'Share Tech Mono', monospace`;
      ctx!.textAlign = "left";
      ctx!.fillStyle = "rgba(0,255,100,0.38)";
      ctx!.fillText("◈  AWARDS MATRIX  ·  HOVER OR DRAG TO ROTATE", 14, 22);
      ctx!.textAlign = "right";
      ctx!.fillStyle = "rgba(0,255,100,0.38)";
      ctx!.fillText(`${TOTAL_AWARDS} AWARDS`, W - 14, 22);

      // Corner brackets
      const bp = 12, bs = 20;
      ctx!.strokeStyle = "rgba(0,255,100,0.35)";
      ctx!.lineWidth = 1;
      ([[bp,bp,1,1],[W-bp,bp,-1,1],[bp,H-bp,1,-1],[W-bp,H-bp,-1,-1]] as const).forEach(([x,y,dx,dy]) => {
        ctx!.beginPath();
        ctx!.moveTo(x, y + dy * bs); ctx!.lineTo(x, y); ctx!.lineTo(x + dx * bs, y);
        ctx!.stroke();
      });

      // Horizontal scan
      const scanX = ((t * 55) % (W + 60)) - 30;
      const sg = ctx!.createLinearGradient(scanX - 40, 0, scanX + 40, 0);
      sg.addColorStop(0,   "transparent");
      sg.addColorStop(0.5, "rgba(0,255,100,0.055)");
      sg.addColorStop(1,   "transparent");
      ctx!.fillStyle = sg;
      ctx!.fillRect(scanX - 40, 0, 80, H);

      ctx!.restore();
    }

    const FOV = 580;

    function render(now: number) {
      rafRef.current = requestAnimationFrame(render);
      time = now * 0.001;

      targetRotX = (mouseRef.current.y - 0.5) * 0.6;
      targetRotY = (mouseRef.current.x - 0.5) * 1.0;
      sceneRotX += (targetRotX + manualRotX - sceneRotX) * 0.042;
      sceneRotY += (targetRotY + manualRotY - sceneRotY) * 0.042;

      drawBG(time);

      // Update positions
      medals.forEach((m) => {
        m.orbitAngle += m.orbitSpeed;
        const ox = Math.cos(m.orbitAngle) * m.orbitR;
        const oz = Math.sin(m.orbitAngle) * m.orbitR * 0.5;
        const oy = oz * Math.sin(m.orbitTilt) + Math.sin(time * 0.65 + m.floatPhase) * m.floatAmp;
        const oz2 = oz * Math.cos(m.orbitTilt);
        m.pos = { x: ox, y: oy, z: oz2 };
        m.rot.x += m.rotVel.x;
        m.rot.y += m.rotVel.y;
        const ths = m.hovered ? 1.22 : 1;
        m.hoverScale += (ths - m.hoverScale) * 0.1;
      });

      // Project + sort
      const proj = medals.map((m) => {
        const rp = rotatePoint(m.pos, sceneRotX, sceneRotY);
        const { sx, sy, scale } = project(rp, FOV);
        const depth = Math.max(0, (rp.z + 400) / 800);
        return { m, sx, sy, scale, depth, rz: rp.z, rpx: rp.x, rpy: rp.y };
      }).sort((a, b) => a.rz - b.rz);

      // Update hover
      const mx2 = mouseRef.current.x * W;
      const my2 = mouseRef.current.y * H;
      proj.forEach(({ m, sx, sy, scale }) => {
        m.hovered = Math.hypot(mx2 - sx, my2 - sy) < m.size * scale * 1.15;
      });

      // Connection lines
      ctx!.save();
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const a = proj[i], b = proj[j];
          const d = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          const maxD = Math.min(W, H) * 0.52;
          if (d < maxD) {
            const al = (1 - d / maxD) * 0.14 * Math.min(a.depth, b.depth);
            ctx!.beginPath();
            ctx!.moveTo(a.sx, a.sy);
            ctx!.lineTo(b.sx, b.sy);
            ctx!.strokeStyle = `rgba(0,255,100,${al})`;
            ctx!.lineWidth = 0.7;
            ctx!.stroke();
          }
        }
      }
      ctx!.restore();

      // Draw medals
      proj.forEach(({ m, sx, sy, scale, depth }) => {
        drawMedal(
          sx, sy,
          m.size * scale,
          m.color, m.label, m.sub,
          m.featured, depth,
          m.rot.x, m.rot.y,
          m.hoverScale,
        );
      });

      drawHUD(time);
    }

    // Events
    const onMove = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top)  / r.height,
      };
      if (isDragging) {
        manualRotY += (e.clientX - lastMouse.x) * 0.006;
        manualRotX += (e.clientY - lastMouse.y) * 0.006;
        lastMouse = { x: e.clientX, y: e.clientY };
      }
    };
    const onDown = (e: MouseEvent) => { isDragging = true; lastMouse = { x: e.clientX, y: e.clientY }; canvas!.style.cursor = "grabbing"; };
    const onUp   = () => { isDragging = false; canvas!.style.cursor = "grab"; };

    canvas!.addEventListener("mousemove", onMove);
    canvas!.addEventListener("mousedown", onDown);
    canvas!.addEventListener("mouseup",   onUp);
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("resize",     resize);

    resize();
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas!.removeEventListener("mousemove", onMove);
      canvas!.removeEventListener("mousedown", onDown);
      canvas!.removeEventListener("mouseup",   onUp);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("resize",     resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", cursor: "grab" }} />;
}

export default function AwardsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="awards" className="section" style={{ borderTop: "1px solid rgba(0,255,100,0.06)" }}>
      <div className="container">

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "all 0.7s ease" }}>
          <p className="section-kicker">Awards & Recognition</p>
          <h2 className="section-title">Recognition that adds <span>credibility and proof</span></h2>
          <p className="section-copy">
            {TOTAL_AWARDS} awards — a Global Excellence Award, a worldwide top-10 ranking,
            three consecutive quarterly community recognitions, and the full-year top contributor title.
            All within a single organisation of thousands of technical staff worldwide.
          </p>
        </div>

        <div style={{
          height: "clamp(400px, 54vh, 580px)",
          borderRadius: 16,
          border: "1px solid rgba(0,255,100,0.2)",
          overflow: "hidden",
          marginBottom: "2rem",
          position: "relative",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px) scale(0.97)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
          boxShadow: "0 0 100px rgba(0,255,100,0.1), 0 40px 80px rgba(0,0,0,0.7)",
          userSelect: "none",
        }}>
          {visible && <AwardsCanvas3D />}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.2rem", marginBottom: "1.4rem" }}>
          {FEATURED_AWARDS.map((award, i) => (
            <div key={award.title} className="card holo-card" style={{
              border: `1px solid ${award.color}35`,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(18px)",
              transition: `all 0.7s ease ${0.2 + i * 0.12}s`,
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${award.color}, transparent)` }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: award.color, opacity: 0.7, letterSpacing: "0.12em", display: "block", marginBottom: 4, fontWeight: 700 }}>{award.badge}</span>
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: award.color, opacity: 0.5, letterSpacing: "0.08em", display: "block", marginBottom: 10 }}>{award.period}</span>
                  <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: award.color, lineHeight: 1.35, marginBottom: "0.8rem" }}>{award.title}</h3>
                  <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.91rem", color: "rgba(240,255,244,0.65)", lineHeight: 1.72 }}>{award.description}</p>
                </div>
                <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "2.2rem", color: `${award.color}18`, flexShrink: 0, animation: "pulseSlow 3s ease-in-out infinite" }}>◆</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(0,8,4,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,255,100,0.1)", borderRadius: 14, padding: "1.6rem", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(18px)", transition: "all 0.7s ease 0.35s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.4rem", borderBottom: "1px solid rgba(0,255,100,0.1)", paddingBottom: "0.9rem" }}>
            <div style={{ width: 2, height: 16, background: "#38bdf8", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#38bdf8", letterSpacing: "0.1em", fontWeight: 700 }}>SOPHOS STAFF COMMUNITY — CY25 RECOGNITION STREAK</span>
          </div>
          <div className="awards-grid">
            {COMMUNITY_AWARDS.map((award, i) => (
              <div key={award.title} className="card award-card holo-card" style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(14px)",
                transition: `all 0.6s ease ${0.45 + i * 0.1}s`,
                borderLeft: `2px solid ${award.color}45`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.7rem" }}>
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: award.color, opacity: 0.72, letterSpacing: "0.1em", fontWeight: 700 }}>{award.period}</span>
                  <span style={{ color: award.color, opacity: 0.55, fontSize: "0.85rem" }}>◈</span>
                </div>
                <h3 style={{ color: award.color, marginBottom: "0.6rem" }}>{award.title}</h3>
                <p>{award.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}