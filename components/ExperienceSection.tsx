"use client";
import { useEffect, useRef, useState } from "react";

const EXPERIENCE = [
  {
    role: "Technical Support Engineer — Endpoint Security",
    company: "Sophos",
    period: "Jul 2023 – Mar 2026",
    duration: "2 yrs 9 mos",
    location: "Ahmedabad, India",
    color: "#00ff64",
    highlights: [
      "Delivered advanced technical support for Sophos Intercept X and Sophos Central across enterprise Windows, macOS, and Linux environments — handling the most complex escalations in the queue.",
      "Investigated security alerts, XDR telemetry, Sysmon logs, and Windows Event Log forensics to perform root-cause analysis and prescribe precise remediation.",
      "Owned end-to-end escalated case lifecycle: triage → investigation → engineering escalation → resolution — with strong SLA adherence and customer satisfaction.",
      "Wrote Sophos Live Discover SQL queries to hunt threats across the Sophos Data Lake and reconstruct attack timelines for ransomware, lateral movement, and persistence incidents.",
      "Collaborated with product engineering on defect reproduction in lab environments, fix validation, and cross-team incident workflows.",
      "Ranked Top 10 support engineer globally (FY25) and earned five Sophos Staff Community recognition awards across CY25.",
      "Maintained internal knowledge base, created resolution guides, and contributed to the global Sophos Staff Community — recognised quarterly for content accuracy.",
    ],
    tags: ["EDR/XDR","Intercept X","Sophos Central","Incident Response","Live Discover","Windows","macOS","Linux","Root Cause","Sysmon"],
  },
  {
    role: "Technical Support Engineer Intern — Endpoint Security",
    company: "Sophos",
    period: "Jan 2023 – Jun 2023",
    duration: "6 mos",
    location: "Ahmedabad, India",
    color: "#38bdf8",
    highlights: [
      "Provided technical support for Sophos endpoint security products across enterprise Windows, macOS, and Linux environments, building hands-on familiarity with the full Sophos ecosystem.",
      "Assisted with log review, diagnostic data analysis, and structured troubleshooting for product behaviour, policy enforcement, deployment, and endpoint performance issues.",
      "Supported case management through documentation, customer follow-ups, and coordination with senior engineers to ensure timely, accurate resolutions.",
      "Built foundational expertise in endpoint security architecture, EDR platform behaviour, enterprise support workflows, and escalation processes.",
    ],
    tags: ["Endpoint Security","Log Analysis","Troubleshooting","Case Documentation"],
  },
];

function ExperienceCard({ exp, index, visible }: { exp: typeof EXPERIENCE[0]; index: number; visible: boolean }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      style={{
        display: "flex", gap: "1.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateX(-18px)",
        transition: `all 0.7s ease ${index * 0.18}s`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 20 }}>
        <div style={{
          width: 11, height: 11, borderRadius: "50%",
          background: exp.color, border: `2px solid ${exp.color}`,
          boxShadow: `0 0 12px ${exp.color}70`,
          flexShrink: 0, marginTop: 8,
        }} />
        {index < EXPERIENCE.length - 1 && (
          <div style={{
            flex: 1, width: 1, marginTop: 6,
            background: `linear-gradient(to bottom, ${exp.color}50, rgba(255,255,255,0.04))`,
            minHeight: 40,
          }} />
        )}
      </div>

      <div
        className="card"
        style={{
          flex: 1, marginBottom: index < EXPERIENCE.length - 1 ? "1.5rem" : 0,
          cursor: "pointer",
          borderColor: expanded ? `${exp.color}30` : undefined,
        }}
        onClick={() => setExpanded((e) => !e)}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.08rem", fontWeight: 700, color: "#f0fff4", marginBottom: 5, lineHeight: 1.3 }}>
              {exp.role}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.78rem", fontWeight: 600, color: exp.color }}>
                {exp.company}
              </span>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", color: "rgba(240,255,244,0.45)" }}>
                {exp.location}
              </span>
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "rgba(240,255,244,0.45)", letterSpacing: "0.04em" }}>
              {exp.period}
            </div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: exp.color, marginTop: 2, opacity: 0.75 }}>
              {exp.duration}
            </div>
            <div style={{ marginTop: 8, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>
              {expanded ? "▲ collapse" : "▼ expand"}
            </div>
          </div>
        </div>

        {expanded && (
          <div style={{ marginTop: "1.2rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.1rem" }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.62rem" }}>
              {exp.highlights.map((h, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ color: exp.color, flexShrink: 0, fontSize: "0.68rem", marginTop: 5, fontFamily: "'Share Tech Mono',monospace" }}>▸</span>
                  <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", color: "rgba(240,255,244,0.68)", lineHeight: 1.65 }}>{h}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1.1rem" }}>
              {exp.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: "0.62rem", padding: "3px 9px",
                  borderRadius: 999,
                  border: `1px solid ${exp.color}28`,
                  color: exp.color, background: `${exp.color}0a`,
                  letterSpacing: "0.06em",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="experience" className="section" style={{ borderTop: "1px solid rgba(0,255,100,0.06)" }}>
      <div className="container">
        <div style={{
          maxWidth: 820, margin: "0 auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "all 0.7s ease",
        }}>
          <p className="section-kicker">Experience</p>
          <h2 className="section-title">3+ years <span>at Sophos</span></h2>
          <p className="section-copy">
            From intern to L2/L3 endpoint security engineer — owning enterprise-scale incidents,
            high-priority escalations, and cross-team threat investigations across the full Sophos ecosystem.
          </p>

          <div>
            {EXPERIENCE.map((exp, i) => (
              <ExperienceCard key={exp.role} exp={exp} index={i} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}