"use client";
import { useEffect, useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    category: "Endpoint Security & EDR/XDR",
    color: "#00ff64",
    icon: "◉",
    skills: [
      { name: "Sophos Intercept X / XDR",     level: 98 },
      { name: "Sophos Central Administration", level: 97 },
      { name: "Endpoint Detection & Response", level: 95 },
      { name: "Malware & Ransomware Analysis", level: 88 },
      { name: "Root Cause Analysis",           level: 93 },
    ],
  },
  {
    category: "Threat Hunting & Incident Response",
    color: "#f472b6",
    icon: "◈",
    skills: [
      { name: "Threat Hunting via Live Discover", level: 90 },
      { name: "Incident Response Workflow",       level: 93 },
      { name: "MITRE ATT&CK Framework",          level: 88 },
      { name: "Attack Timeline Reconstruction",   level: 87 },
      { name: "IOC Identification & Triage",      level: 85 },
    ],
  },
  {
    category: "SIEM & Log Analysis",
    color: "#fb923c",
    icon: "◆",
    skills: [
      { name: "Splunk SIEM / SPL Queries",         level: 82 },
      { name: "Windows Event Log Analysis",        level: 94 },
      { name: "Sophos Data Lake / XDR Queries",    level: 88 },
      { name: "Sysmon Log Analysis",               level: 85 },
      { name: "SQL for Telemetry (Live Discover)", level: 81 },
    ],
  },
  {
    category: "Scripting, Cloud & Automation",
    color: "#38bdf8",
    icon: "◇",
    skills: [
      { name: "PowerShell (Enterprise Scripting)", level: 85 },
      { name: "Bash / Shell Scripting",            level: 78 },
      { name: "Python (Automation & Parsing)",     level: 70 },
      { name: "AWS Cloud Fundamentals",            level: 72 },
      { name: "Azure Fundamentals",               level: 68 },
    ],
  },
];

function RadarChart({ groups, visible }: { groups: typeof SKILL_GROUPS; visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 280;
    canvas.width = SIZE; canvas.height = SIZE;
    const cx = SIZE / 2, cy = SIZE / 2;
    const maxR = SIZE * 0.4;
    const axes = groups.map((g, i) => ({
      angle: (i / groups.length) * Math.PI * 2 - Math.PI / 2,
      color: g.color,
      label: g.category.split(" ")[0],
      value: g.skills.reduce((a, s) => a + s.level, 0) / g.skills.length / 100,
    }));

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      if (visible && progressRef.current < 1) progressRef.current = Math.min(1, progressRef.current + 0.015);
      const p = progressRef.current;

      ctx.clearRect(0, 0, SIZE, SIZE);

      // Grid rings
      for (let r = 1; r <= 4; r++) {
        const rr = maxR * r / 4;
        ctx.beginPath();
        axes.forEach((a, i) => {
          const x = cx + Math.cos(a.angle) * rr;
          const y = cy + Math.sin(a.angle) * rr;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.strokeStyle = `rgba(0,255,100,${0.06 + r * 0.015})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Axis lines
      axes.forEach(a => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a.angle) * maxR, cy + Math.sin(a.angle) * maxR);
        ctx.strokeStyle = "rgba(0,255,100,0.08)";
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      // Data polygon
      ctx.beginPath();
      axes.forEach((a, i) => {
        const r = a.value * maxR * p;
        const x = cx + Math.cos(a.angle) * r;
        const y = cy + Math.sin(a.angle) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      grad.addColorStop(0, "rgba(0,255,100,0.25)");
      grad.addColorStop(1, "rgba(0,255,100,0.04)");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,255,100,0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Axis nodes
      axes.forEach((a, i) => {
        const r = a.value * maxR * p;
        const x = cx + Math.cos(a.angle) * r;
        const y = cy + Math.sin(a.angle) * r;
        ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = a.color; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.strokeStyle = a.color + "40"; ctx.lineWidth = 1; ctx.stroke();

        // Labels
        const lx = cx + Math.cos(a.angle) * (maxR + 22);
        const ly = cy + Math.sin(a.angle) * (maxR + 22);
        ctx.font = `bold 8px 'Share Tech Mono', monospace`;
        ctx.fillStyle = a.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(a.label, lx, ly);
      });
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  return <canvas ref={canvasRef} style={{ width: 280, height: 280 }} />;
}

function SkillBar({ name, level, color, animate, delay }: {
  name: string; level: number; color: string; animate: boolean; delay: number;
}) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setWidth(level), delay);
    return () => clearTimeout(t);
  }, [animate, level, delay]);

  return (
    <div style={{ marginBottom: "0.95rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.38rem", alignItems: "center" }}>
        <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.86rem", color: "rgba(240,255,244,0.78)", fontWeight: 500 }}>{name}</span>
        <span style={{
          fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem",
          color, fontWeight: 700,
          opacity: animate ? 1 : 0, transition: `opacity 0.3s ease ${delay + 350}ms`,
        }}>{level}%</span>
      </div>
      <div style={{ height: 2, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden", position: "relative" }}>
        <div style={{
          height: "100%", width: `${width}%`,
          background: `linear-gradient(90deg, ${color}50, ${color})`,
          borderRadius: 2,
          transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          boxShadow: `0 0 10px ${color}60`,
        }} />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [visible, setVisible] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
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
    <section ref={ref} id="skills" className="section" style={{ borderTop: "1px solid rgba(0,255,100,0.06)" }}>
      <div className="container">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "all 0.7s ease" }}>
          <p className="section-kicker">Technical Skills</p>
          <h2 className="section-title">Built in <span>production</span></h2>
          <p className="section-copy">
            Every skill battle-tested across real enterprise escalations — ransomware incidents,
            lateral movement investigations, XDR query hunts. Not textbook theory.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "start" }} className="skills-layout">

          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "1.6rem" }}>
            {SKILL_GROUPS.map((group, gi) => (
              <div
                key={group.category}
                className="card holo-card"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(22px)",
                  transition: `all 0.7s ease ${gi * 0.12}s`,
                  cursor: "pointer",
                  borderColor: activeGroup === gi ? `${group.color}40` : undefined,
                  boxShadow: activeGroup === gi ? `0 0 30px ${group.color}18` : undefined,
                }}
                onClick={() => setActiveGroup(gi)}
              >
                {/* Accent bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${group.color}, transparent)`, opacity: activeGroup === gi ? 0.8 : 0.3 }} />

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.4rem", paddingBottom: "0.9rem", borderBottom: `1px solid ${group.color}20` }}>
                  <span style={{ fontSize: "1rem", color: group.color }}>{group.icon}</span>
                  <div style={{ width: 2, height: 14, background: group.color, borderRadius: 2 }} />
                  <h3 style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: 700, color: group.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {group.category}
                  </h3>
                </div>
                {group.skills.map((skill, si) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level}
                    color={group.color} animate={visible} delay={gi * 100 + si * 70} />
                ))}
              </div>
            ))}
          </div>

          {/* Radar */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "scale(0.85)",
            transition: "all 0.8s ease 0.3s",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",
            background: "rgba(0,10,5,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0,255,100,0.15)",
            borderRadius: 14, padding: "1.5rem",
          }} className="radar-panel">
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(0,255,100,0.5)", letterSpacing: "0.12em" }}>◈ COMPETENCY RADAR</span>
            <RadarChart groups={SKILL_GROUPS} visible={visible} />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", width: "100%" }}>
              {SKILL_GROUPS.map(g => (
                <div key={g.category} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: g.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(240,255,244,0.4)", letterSpacing: "0.06em" }}>
                    {g.category.split(" ")[0].toUpperCase()}
                  </span>
                  <span style={{ marginLeft: "auto", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: g.color }}>
                    {Math.round(g.skills.reduce((a, s) => a + s.level, 0) / g.skills.length)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .skills-layout { grid-template-columns: 1fr !important; }
          .radar-panel { display: none !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}