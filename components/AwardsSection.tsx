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

// ── 3D Canvas Animation ──────────────────────────────────────────────────────
function AwardsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const PI2 = Math.PI * 2;

    type Medal = {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      rotX: number; rotY: number; rotZ: number;
      vrX: number; vrY: number; vrZ: number;
      size: number; color: string; label: string;
      phase: number;
    };

    const COLORS = ["#fbbf24","#00ff64","#38bdf8","#38bdf8","#38bdf8","#a78bfa"];
    const LABELS  = ["GLOBAL\nEXC","TOP\n10","CY25\nQ2","CY25\nQ3","CY25\nQ4","CY25\nFULL"];

    let medals: Medal[] = [];
    let currentRX = 0, currentRY = 0;

    function buildMedals() {
      medals = COLORS.map((color, i) => ({
        x: (Math.random() - 0.5) * W * 0.55,
        y: (Math.random() - 0.5) * H * 0.5,
        z: (Math.random() - 0.5) * 220,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        vz: (Math.random() - 0.5) * 0.3,
        rotX: Math.random() * PI2,
        rotY: Math.random() * PI2,
        rotZ: Math.random() * PI2,
        vrX: (Math.random() - 0.5) * 0.008,
        vrY: (Math.random() - 0.5) * 0.01,
        vrZ: (Math.random() - 0.5) * 0.006,
        size: i < 2 ? 52 : 40,
        color,
        label: LABELS[i],
        phase: Math.random() * PI2,
      }));
    }

    function resize() {
      W = canvas!.offsetWidth; H = canvas!.offsetHeight;
      canvas!.width = W * window.devicePixelRatio;
      canvas!.height = H * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
      buildMedals();
    }

    function drawHex(cx: number, cy: number, r: number, fill: string, stroke: string, lw: number) {
      ctx!.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * 60 - 30) * Math.PI / 180;
        i === 0 ? ctx!.moveTo(cx + Math.cos(a)*r, cy + Math.sin(a)*r)
                : ctx!.lineTo(cx + Math.cos(a)*r, cy + Math.sin(a)*r);
      }
      ctx!.closePath();
      ctx!.fillStyle = fill; ctx!.fill();
      ctx!.strokeStyle = stroke; ctx!.lineWidth = lw; ctx!.stroke();
    }

    let t = 0;
    function render() {
      rafRef.current = requestAnimationFrame(render);
      t += 0.008;
      ctx!.clearRect(0, 0, W, H);

      // Scene tilt from mouse
      const targetRX = (mouseRef.current.y - 0.5) * 0.3;
      const targetRY = (mouseRef.current.x - 0.5) * 0.4;
      currentRX += (targetRX - currentRX) * 0.04;
      currentRY += (targetRY - currentRY) * 0.04;

      const cx = W / 2, cy = H / 2;
      const fov = 600;

      // Grid floor
      ctx!.save();
      ctx!.globalAlpha = 0.08;
      for (let gx = -4; gx <= 4; gx++) {
        const x = cx + gx * 70;
        ctx!.beginPath(); ctx!.moveTo(x, cy - 60); ctx!.lineTo(x + currentRY * 40, H);
        ctx!.strokeStyle = "#00ff64"; ctx!.lineWidth = 0.6; ctx!.stroke();
      }
      for (let gy = 0; gy <= 5; gy++) {
        const prog = gy / 5;
        const y = cy - 60 + prog * (H - cy + 60);
        ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(W, y);
        ctx!.strokeStyle = "#00ff64"; ctx!.lineWidth = 0.5; ctx!.stroke();
      }
      ctx!.restore();

      // Project medals
      const projected = medals.map((m, i) => {
        m.phase += 0.02;
        // Float
        m.x += m.vx; m.y += m.vy; m.z += m.vz;
        m.rotX += m.vrX; m.rotY += m.vrY; m.rotZ += m.vrZ;
        // Bounce
        const bx = W * 0.42, by = H * 0.38, bz = 180;
        if (Math.abs(m.x) > bx) { m.vx *= -0.9; m.x = Math.sign(m.x) * bx; }
        if (Math.abs(m.y) > by) { m.vy *= -0.9; m.y = Math.sign(m.y) * by; }
        if (Math.abs(m.z) > bz) { m.vz *= -0.9; m.z = Math.sign(m.z) * bz; }
        // Apply scene rotation
        const cosX = Math.cos(currentRX), sinX = Math.sin(currentRX);
        const cosY = Math.cos(currentRY), sinY = Math.sin(currentRY);
        let rx = m.x, ry = m.y * cosX - m.z * sinX, rz = m.y * sinX + m.z * cosX;
        let rx2 = rx * cosY + rz * sinY, rz2 = -rx * sinY + rz * cosY;
        const scale = fov / (fov + rz2);
        return { m, sx: cx + rx2 * scale, sy: cy + ry * scale, scale, depth: rz2 };
      }).sort((a, b) => b.depth - a.depth);

      projected.forEach(({ m, sx, sy, scale }) => {
        const size = m.size * scale;
        const alpha = Math.max(0.15, Math.min(1, scale * 0.9 + 0.1));
        const pulse = 0.85 + 0.15 * Math.sin(m.phase);

        ctx!.save();
        ctx!.globalAlpha = alpha;
        ctx!.translate(sx, sy);
        ctx!.rotate(m.rotZ);

        // Shadow
        ctx!.save();
        ctx!.globalAlpha = alpha * 0.15;
        ctx!.translate(size * 0.1, size * 0.15);
        drawHex(0, 0, size, "rgba(0,0,0,0.8)", "transparent", 0);
        ctx!.restore();

        // Glow
        const glowGrad = ctx!.createRadialGradient(0, 0, size * 0.3, 0, 0, size * 1.4);
        glowGrad.addColorStop(0, m.color + "22");
        glowGrad.addColorStop(1, "transparent");
        ctx!.fillStyle = glowGrad; ctx!.beginPath(); ctx!.arc(0, 0, size * 1.4, 0, PI2); ctx!.fill();

        // Hex body
        drawHex(0, 0, size, `rgba(0,8,4,0.95)`, m.color + "80", 1.5);

        // Inner hex rings
        drawHex(0, 0, size * 0.85, "transparent", m.color + "25", 0.8);
        drawHex(0, 0, size * 0.55, "transparent", m.color + "35", 0.6);

        // Face highlight
        const faceGrad = ctx!.createRadialGradient(-size * 0.2, -size * 0.25, 0, 0, 0, size);
        faceGrad.addColorStop(0, m.color + "18");
        faceGrad.addColorStop(1, "transparent");
        drawHex(0, 0, size, faceGrad as unknown as string, "transparent", 0);

        // Icon center
        ctx!.beginPath();
        ctx!.arc(0, 0, size * 0.22, 0, PI2);
        ctx!.fillStyle = m.color;
        ctx!.globalAlpha = alpha * 0.9 * pulse;
        ctx!.fill();

        // Label
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = m.color;
        ctx!.font = `bold ${Math.max(8, size * 0.18)}px 'Share Tech Mono', monospace`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        const lines = m.label.split("\n");
        lines.forEach((line, li) => {
          ctx!.fillText(line, 0, (li - (lines.length - 1) / 2) * size * 0.22 + size * 0.55);
        });

        // Edge shine
        ctx!.restore();
        ctx!.save();
        ctx!.globalAlpha = alpha * 0.5;
        ctx!.translate(sx, sy);
        ctx!.rotate(m.rotZ);
        const shineGrad = ctx!.createLinearGradient(-size * 0.5, -size * 0.5, size * 0.2, size * 0.2);
        shineGrad.addColorStop(0, `rgba(255,255,255,0.12)`);
        shineGrad.addColorStop(0.5, `rgba(255,255,255,0.02)`);
        shineGrad.addColorStop(1, "transparent");
        drawHex(0, 0, size, shineGrad as unknown as string, "transparent", 0);
        ctx!.restore();
      });
    }

    const onMouse = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      mouseRef.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    };

    resize();
    canvas!.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", resize);
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas!.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
  );
}

export default function AwardsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="awards" className="section" style={{ borderTop: "1px solid rgba(0,255,100,0.06)" }}>
      <div className="container">

        {/* Header */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "all 0.7s ease" }}>
          <p className="section-kicker">Awards & Recognition</p>
          <h2 className="section-title">Recognition that adds <span>credibility and proof</span></h2>
          <p className="section-copy">
            {TOTAL_AWARDS} awards — a Global Excellence Award, a worldwide top-10 ranking,
            three consecutive quarterly community recognitions, and the full-year top contributor title.
            All within a single organisation of thousands of technical staff worldwide.
          </p>
        </div>

        {/* 3D Medal Scene */}
        <div style={{
          height: 340,
          borderRadius: 16,
          border: "1px solid rgba(0,255,100,0.15)",
          background: "radial-gradient(ellipse at 50% 60%, rgba(0,20,10,0.8) 0%, rgba(0,5,2,0.95) 100%)",
          overflow: "hidden",
          marginBottom: "2rem",
          position: "relative",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px) scale(0.98)",
          transition: "all 0.8s ease 0.1s",
        }}>
          <AwardsCanvas />
          <div style={{ position: "absolute", top: 12, left: 16, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "rgba(0,255,100,0.4)", letterSpacing: "0.12em" }}>
            ◈ AWARDS MATRIX · MOVE MOUSE TO EXPLORE
          </div>
          <div style={{ position: "absolute", top: 12, right: 16, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "rgba(0,255,100,0.4)", letterSpacing: "0.12em" }}>
            {TOTAL_AWARDS} TOTAL
          </div>
        </div>

        {/* Featured Award Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.2rem",
          marginBottom: "1.4rem",
        }}>
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

        {/* Community Awards */}
        <div style={{
          background: "rgba(0,8,4,0.6)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(0,255,100,0.1)", borderRadius: 14, padding: "1.6rem",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(18px)",
          transition: "all 0.7s ease 0.35s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.4rem", borderBottom: "1px solid rgba(0,255,100,0.1)", paddingBottom: "0.9rem" }}>
            <div style={{ width: 2, height: 16, background: "#38bdf8", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#38bdf8", letterSpacing: "0.1em", fontWeight: 700 }}>
              SOPHOS STAFF COMMUNITY — CY25 RECOGNITION STREAK
            </span>
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
