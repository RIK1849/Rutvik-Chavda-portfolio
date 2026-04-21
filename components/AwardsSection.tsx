"use client";
import { useEffect, useRef, useState } from "react";

// ─── Award Data ────────────────────────────────────────────────────────────────
// SOURCE: LinkedIn Honours page (screenshot, April 2026) — 6 confirmed awards:
//   1. Global Support Services Excellence Award (2024)  — May 2025
//   2. Sophos Support Team 10 FY25                      — Nov 2023
//   3. Top Sophos Staff Community Contributor CY25-Q2   — Jun 2025
//   4. Top Sophos Staff Community Contributor CY25-Q3
//   5. Top Sophos Staff Community Contributor CY25-Q4
//   6. Top Sophos Staff Community Contributor CY25 Overall
// ──────────────────────────────────────────────────────────────────────────────

const FEATURED_AWARDS = [
  {
    title: "Global Support Services Excellence Award (2024)",
    badge: "◈ GLOBAL EXCELLENCE — SOPHOS SUPPORT",
    period: "May 2025",
    color: "#fbbf24", // amber — visually distinct from the green/blue/purple palette
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

export default function AwardsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="awards"
      className="section"
      style={{ borderTop: "1px solid rgba(0,255,100,0.06)" }}
    >
      <div className="container">

        {/* ── Section Header ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "all 0.7s ease",
          }}
        >
          <p className="section-kicker">Awards & Recognition</p>
          <h2 className="section-title">
            Recognition that adds <span>credibility and proof</span>
          </h2>
          <p className="section-copy">
            {TOTAL_AWARDS} awards — a Global Excellence Award, a worldwide top-10
            ranking, three consecutive quarterly community recognitions, and the
            full-year top contributor title. All within a single organisation of
            thousands of technical staff worldwide.
          </p>
        </div>

        {/* ── Featured Cards: Excellence Award + Top 10 (side by side) ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.2rem",
            marginBottom: "1.4rem",
          }}
        >
          {FEATURED_AWARDS.map((award, i) => (
            <div
              key={award.title}
              style={{
                background: "rgba(0,20,10,0.55)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${award.color}45`,
                borderRadius: 12,
                padding: "2rem 2.2rem",
                position: "relative",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(18px)",
                transition: `all 0.7s ease ${0.1 + i * 0.12}s`,
              }}
            >
              {/* top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${award.color}, transparent)`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono',monospace",
                      fontSize: "0.65rem",
                      color: award.color,
                      opacity: 0.7,
                      letterSpacing: "0.12em",
                      display: "block",
                      marginBottom: 4,
                      fontWeight: 700,
                    }}
                  >
                    {award.badge}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono',monospace",
                      fontSize: "0.6rem",
                      color: award.color,
                      opacity: 0.5,
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    {award.period}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Orbitron',sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: award.color,
                      lineHeight: 1.35,
                      marginBottom: "0.8rem",
                    }}
                  >
                    {award.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Rajdhani',sans-serif",
                      fontSize: "0.93rem",
                      color: "rgba(240,255,244,0.7)",
                      lineHeight: 1.7,
                    }}
                  >
                    {award.description}
                  </p>
                </div>
                <div
                  style={{
                    fontFamily: "'Orbitron',sans-serif",
                    fontSize: "2.5rem",
                    color: `${award.color}25`,
                    flexShrink: 0,
                  }}
                >
                  ◆
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Community Awards Grid ── */}
        <div
          style={{
            background: "rgba(0,10,5,0.4)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,255,100,0.1)",
            borderRadius: 12,
            padding: "1.6rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(18px)",
            transition: "all 0.7s ease 0.25s",
          }}
        >
          {/* sub-header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: "1.4rem",
              borderBottom: "1px solid rgba(0,255,100,0.1)",
              paddingBottom: "0.9rem",
            }}
          >
            <div
              style={{
                width: 2,
                height: 16,
                background: "#38bdf8",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: "0.72rem",
                color: "#38bdf8",
                letterSpacing: "0.1em",
                fontWeight: 700,
              }}
            >
              SOPHOS STAFF COMMUNITY — CY25 RECOGNITION STREAK
            </span>
          </div>

          {/* award cards */}
          <div className="awards-grid">
            {COMMUNITY_AWARDS.map((award, i) => (
              <div
                key={award.title}
                className="card award-card"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(14px)",
                  transition: `all 0.6s ease ${0.35 + i * 0.1}s`,
                  borderLeft: `2px solid ${award.color}45`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.7rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono',monospace",
                      fontSize: "0.62rem",
                      color: award.color,
                      opacity: 0.72,
                      letterSpacing: "0.1em",
                      fontWeight: 700,
                    }}
                  >
                    {award.period}
                  </span>
                  <span
                    style={{
                      color: award.color,
                      opacity: 0.55,
                      fontSize: "0.9rem",
                    }}
                  >
                    ◈
                  </span>
                </div>
                <h3 style={{ color: award.color, marginBottom: "0.6rem" }}>
                  {award.title}
                </h3>
                <p>{award.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}