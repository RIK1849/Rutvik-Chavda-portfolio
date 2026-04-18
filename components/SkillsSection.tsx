"use client";
import { useEffect, useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    category: "Endpoint Security & EDR/XDR",
    color: "#00ff64",
    skills: [
      { name: "Sophos Intercept X / XDR",        level: 98 },
      { name: "Sophos Central Administration",    level: 97 },
      { name: "Endpoint Detection & Response",    level: 95 },
      { name: "Malware & Ransomware Analysis",    level: 88 },
      { name: "Root Cause Analysis",              level: 92 },
    ],
  },
  {
    category: "Threat Hunting & IR",
    color: "#f472b6",
    skills: [
      { name: "Threat Hunting (Live Discover)",   level: 90 },
      { name: "Incident Response Workflow",       level: 93 },
      { name: "MITRE ATT&CK Framework",          level: 88 },
      { name: "Attack Timeline Reconstruction",   level: 87 },
      { name: "IOC Identification",               level: 85 },
    ],
  },
  {
    category: "SIEM & Log Analysis",
    color: "#fb923c",
    skills: [
      { name: "Splunk (SIEM, SPL Queries)",       level: 82 },
      { name: "Windows Event Log Analysis",       level: 93 },
      { name: "Sophos Data Lake / XDR Queries",   level: 88 },
      { name: "Sysmon Log Analysis",              level: 85 },
      { name: "SQL for Telemetry (Live Discover)",level: 80 },
    ],
  },
  {
    category: "Scripting & Automation",
    color: "#38bdf8",
    skills: [
      { name: "PowerShell (Enterprise)",          level: 85 },
      { name: "Bash / Shell Scripting",           level: 78 },
      { name: "Python (Automation & Parsing)",    level: 70 },
      { name: "AWS Cloud Fundamentals",           level: 72 },
      { name: "Azure Fundamentals",               level: 68 },
    ],
  },
];

function SkillBar({
  name,
  level,
  color,
  animate,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  animate: boolean;
  delay: number;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setWidth(level), delay);
    return () => clearTimeout(t);
  }, [animate, level, delay]);

  return (
    <div style={{ marginBottom: "0.9rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.4rem",
        }}
      >
        <span
          style={{
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.75)",
            fontWeight: 500,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: "0.72rem",
            color: color,
            fontFamily: "monospace",
            fontWeight: 700,
            opacity: animate ? 1 : 0,
            transition: `opacity 0.3s ease ${delay + 400}ms`,
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: `linear-gradient(to right, ${color}80, ${color})`,
            borderRadius: 2,
            transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="skills"
      style={{
        background: "#000",
        padding: "6rem 2rem",
        position: "relative",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,255,100,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,100,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "3rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              color: "#00ff64",
              letterSpacing: "0.2em",
              marginBottom: "0.75rem",
            }}
          >
            TECHNICAL SKILLS
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "1rem",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            Built in{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(0,255,100,0.6)",
                color: "transparent",
              }}
            >
              production
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", maxWidth: 500, lineHeight: 1.7 }}>
            Every skill here is battle-tested across real enterprise escalations — not textbook theory.
          </p>
        </div>

        {/* Skills grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
            gap: "2rem",
          }}
        >
          {SKILL_GROUPS.map((group, gi) => (
            <div
              key={group.category}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "1.6rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `all 0.6s ease ${gi * 0.1}s`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: "1.4rem",
                  paddingBottom: "0.9rem",
                  borderBottom: `1px solid ${group.color}20`,
                }}
              >
                <div
                  style={{
                    width: 3,
                    height: 18,
                    background: group.color,
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: group.color,
                    fontFamily: "monospace",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {group.category}
                </h3>
              </div>

              {group.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={group.color}
                  animate={visible}
                  delay={gi * 100 + si * 80}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}