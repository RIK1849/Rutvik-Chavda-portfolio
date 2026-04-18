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
      "Advanced L2/L3 support for Sophos Intercept X and Sophos Central across Windows, macOS, and Linux enterprise environments.",
      "Investigated security alerts, XDR telemetry, and diagnostic data to perform root-cause analysis and prescribe precise remediation.",
      "Owned end-to-end escalated case lifecycle — triage → investigation → resolution — with consistent SLA adherence and CSAT.",
      "Collaborated with engineering on defect reproduction, fix validation, and cross-team incident workflows.",
      "Ranked Top 10 support engineer globally (FY25) and earned five community recognition awards across CY25.",
      "Maintained internal knowledge base and contributed to global Sophos Staff Community for quarterly-recognized content quality.",
    ],
    tags: ["EDR/XDR", "Intercept X", "Incident Response", "Windows", "macOS", "Linux", "Sophos Central"],
  },
  {
    role: "Technical Support Engineer Intern — Endpoint Security",
    company: "Sophos",
    period: "Jan 2023 – Jun 2023",
    duration: "6 mos",
    location: "Ahmedabad, India",
    color: "#38bdf8",
    highlights: [
      "Provided technical support for endpoint security across enterprise Windows, macOS, and Linux environments.",
      "Assisted in log review, diagnostic analysis, and structured troubleshooting for product, policy, and deployment issues.",
      "Supported case documentation, customer follow-ups, and coordination with senior engineers for resolution quality.",
      "Built foundational expertise in endpoint security, enterprise support operations, and EDR platform behaviour.",
    ],
    tags: ["Endpoint Security", "Log Analysis", "Troubleshooting", "Case Documentation"],
  },
];

function ExperienceCard({ exp, index, visible }: { exp: typeof EXPERIENCE[0]; index: number; visible: boolean }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateX(-20px)",
        transition: `all 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Timeline column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 20,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: exp.color,
            border: `2px solid ${exp.color}`,
            boxShadow: `0 0 10px ${exp.color}60`,
            flexShrink: 0,
            marginTop: 6,
          }}
        />
        {index < EXPERIENCE.length - 1 && (
          <div
            style={{
              flex: 1,
              width: 1,
              marginTop: 6,
              background: `linear-gradient(to bottom, ${exp.color}40, rgba(255,255,255,0.06))`,
              minHeight: 40,
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${expanded ? exp.color + "25" : "rgba(255,255,255,0.06)"}`,
          borderRadius: 12,
          padding: "1.4rem 1.6rem",
          marginBottom: index < EXPERIENCE.length - 1 ? "1.5rem" : 0,
          transition: "border-color 0.3s",
          cursor: "pointer",
        }}
        onClick={() => setExpanded((e) => !e)}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 4,
                lineHeight: 1.3,
              }}
            >
              {exp.role}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: exp.color,
                  fontFamily: "monospace",
                }}
              >
                {exp.company}
              </span>
              <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.8rem" }}>·</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                {exp.location}
              </span>
            </div>
          </div>

          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div
              style={{
                fontSize: "0.72rem",
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.04em",
              }}
            >
              {exp.period}
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: exp.color,
                fontFamily: "monospace",
                marginTop: 2,
                opacity: 0.7,
              }}
            >
              {exp.duration}
            </div>
            <div style={{ marginTop: 8, fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>
              {expanded ? "▲ collapse" : "▼ expand"}
            </div>
          </div>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div style={{ marginTop: "1.2rem", borderTop: `1px solid rgba(255,255,255,0.05)`, paddingTop: "1.1rem" }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {exp.highlights.map((h, i) => (
                <li
                  key={i}
                  style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}
                >
                  <span style={{ color: exp.color, flexShrink: 0, fontSize: "0.7rem", marginTop: 4, fontFamily: "monospace" }}>
                    ▸
                  </span>
                  <span style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                    {h}
                  </span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1rem" }}>
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.65rem",
                    padding: "3px 10px",
                    borderRadius: 999,
                    border: `1px solid ${exp.color}30`,
                    color: exp.color,
                    fontFamily: "monospace",
                    letterSpacing: "0.06em",
                    background: exp.color + "0a",
                  }}
                >
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
      id="experience"
      style={{
        background: "#050505",
        padding: "6rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
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
            // EXPERIENCE
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
            3+ years{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(0,255,100,0.6)",
                color: "transparent",
              }}
            >
              at Sophos
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", maxWidth: 520, lineHeight: 1.7 }}>
            From intern to L2/L3 endpoint security engineer — handling enterprise-scale incidents, escalations, and
            cross-team investigations across the full Sophos ecosystem.
          </p>
        </div>

        {/* Timeline */}
        <div>
          {EXPERIENCE.map((exp, i) => (
            <ExperienceCard key={exp.role} exp={exp} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}