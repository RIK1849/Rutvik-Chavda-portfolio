"use client";
import { useEffect, useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    category: "Endpoint Security & EDR/XDR",
    color: "#00ff64",
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
    skills: [
      { name: "PowerShell (Enterprise Scripting)", level: 85 },
      { name: "Bash / Shell Scripting",            level: 78 },
      { name: "Python (Automation & Parsing)",     level: 70 },
      { name: "AWS Cloud Fundamentals",            level: 72 },
      { name: "Azure Fundamentals",                level: 68 },
    ],
  },
];

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
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.35rem" }}>
        <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:"0.88rem", color:"rgba(240,255,244,0.78)", fontWeight:500 }}>
          {name}
        </span>
        <span style={{
          fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem",
          color, fontWeight:700,
          opacity: animate ? 1 : 0,
          transition: `opacity 0.3s ease ${delay + 400}ms`,
        }}>
          {level}%
        </span>
      </div>
      <div style={{ height:3, background:"rgba(255,255,255,0.05)", borderRadius:2, overflow:"hidden" }}>
        <div style={{
          height:"100%", width:`${width}%`,
          background:`linear-gradient(90deg, ${color}55, ${color})`,
          borderRadius:2,
          transition:`width 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          boxShadow:`0 0 8px ${color}55`,
        }} />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="skills" className="section" style={{ background:"#000", borderTop:"1px solid rgba(0,255,100,0.06)" }}>
      {/* Grid bg */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"linear-gradient(rgba(0,255,100,0.018) 1px, transparent 1px),linear-gradient(90deg, rgba(0,255,100,0.018) 1px, transparent 1px)",
        backgroundSize:"72px 72px", pointerEvents:"none",
      }}/>

      <div className="container" style={{ position:"relative" }}>
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(18px)",
            transition:"all 0.7s ease",
          }}
        >
          <p className="section-kicker">Technical Skills</p>
          <h2 className="section-title">
            Built in <span>production</span>
          </h2>
          <p className="section-copy">
            Every skill listed here comes from real enterprise escalations — ransomware incidents, lateral movement
            investigations, XDR query hunts. Not certifications alone. Not labs. Production.
          </p>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(400px, 1fr))",
          gap:"1.8rem",
        }}>
          {SKILL_GROUPS.map((group, gi) => (
            <div
              key={group.category}
              className="card"
              style={{
                padding:"1.8rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(22px)",
                transition:`all 0.7s ease ${gi * 0.12}s`,
              }}
            >
              <div style={{
                display:"flex", alignItems:"center", gap:10,
                marginBottom:"1.4rem", paddingBottom:"0.9rem",
                borderBottom:`1px solid ${group.color}22`,
              }}>
                <div style={{ width:3, height:16, background:group.color, borderRadius:2, flexShrink:0 }} />
                <h3 style={{
                  fontFamily:"'Share Tech Mono',monospace",
                  fontSize:"0.75rem", fontWeight:700,
                  color:group.color, letterSpacing:"0.07em",
                  textTransform:"uppercase",
                }}>
                  {group.category}
                </h3>
              </div>
              {group.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name} level={skill.level}
                  color={group.color} animate={visible}
                  delay={gi*110 + si*75}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #skills .container > div + div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}