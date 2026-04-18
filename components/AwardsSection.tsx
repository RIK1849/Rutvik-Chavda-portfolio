"use client";
import { useEffect, useRef, useState } from "react";

const AWARDS = [
  {
    title: "Sophos Support Team Top 10 — FY25",
    description:
      "Ranked among the top 10 support engineers globally for case quality, CSAT scores, SLA adherence, and internal knowledge contribution across the full fiscal year.",
    icon: "🏆",
    color: "#fbbf24",
    year: "FY25",
  },
  {
    title: "Top Sophos Staff Community Contributor — CY25 Overall",
    description:
      "Recognized as a top-ranked staff contributor for the full calendar year, awarded for sustained technical depth, accuracy, and high-volume quality engagement across the global Sophos community.",
    icon: "⭐",
    color: "#a78bfa",
    year: "CY25",
  },
  {
    title: "Top Sophos Staff Community Contributor — CY25 Q2",
    description:
      "Quarterly recognition for being among the highest-impact community contributors in Q2, consistently delivering technically accurate and actionable support content.",
    icon: "◆",
    color: "#00ff64",
    year: "Q2",
  },
  {
    title: "Top Sophos Staff Community Contributor — CY25 Q3",
    description:
      "Maintained top contributor status in Q3 with continued high-quality technical engagement, peer knowledge sharing, and community-first support mindset.",
    icon: "◆",
    color: "#00ff64",
    year: "Q3",
  },
  {
    title: "Top Sophos Staff Community Contributor — CY25 Q4",
    description:
      "Closed the year as a top contributor in Q4, sustaining consistent output and community presence through the end of the calendar year.",
    icon: "◆",
    color: "#00ff64",
    year: "Q4",
  },
];

function AwardCard({ award, index }: { award: typeof AWARDS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? `${award.color}08` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? award.color + "30" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 12,
        padding: "1.8rem",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? `0 12px 40px ${award.color}10` : "none",
        animation: `awardIn 0.6s ease ${index * 0.08}s both`,
        display: "flex",
        gap: "1.2rem",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: 3,
          flexShrink: 0,
          borderRadius: 99,
          background: `linear-gradient(to bottom, ${award.color}, ${award.color}30)`,
          transition: "opacity 0.3s",
          opacity: hovered ? 1 : 0.5,
        }}
      />

      <div style={{ flex: 1 }}>
        {/* Year badge */}
        <div style={{ marginBottom: "0.6rem" }}>
          <span
            style={{
              fontSize: "0.65rem",
              padding: "3px 10px",
              borderRadius: 999,
              background: award.color + "18",
              color: award.color,
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              fontWeight: 700,
              border: `1px solid ${award.color}30`,
            }}
          >
            {award.year}
          </span>
        </div>

        <h3
          style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.4,
            marginBottom: "0.6rem",
          }}
        >
          {award.title}
        </h3>
        <p
          style={{
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
          }}
        >
          {award.description}
        </p>
      </div>
    </div>
  );
}

export default function AwardsSection() {
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
      id="awards"
      style={{
        background: "#050505",
        padding: "6rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(251,191,36,0.3), transparent)",
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
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
              color: "#fbbf24",
              letterSpacing: "0.2em",
              marginBottom: "0.75rem",
            }}
          >
            // AWARDS & RECOGNITION
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
            Recognition that{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(251,191,36,0.7)",
                color: "transparent",
              }}
            >
              speaks
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "0.95rem",
              maxWidth: 500,
              lineHeight: 1.7,
            }}
          >
            Five global recognitions — one annual ranking, one full-year community award, and three
            consecutive quarterly distinctions — earned through consistent technical excellence and
            community leadership.
          </p>
        </div>

        {/* Counter row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 8,
            overflow: "hidden",
            marginBottom: "2.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(10px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          {[
            { val: "5", label: "Total Awards" },
            { val: "3", label: "Consecutive Quarters" },
            { val: "Global", label: "Recognition Scope" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                padding: "1.2rem",
                background: "rgba(251,191,36,0.04)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "#fbbf24",
                  fontFamily: "monospace",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.08em",
                  marginTop: 4,
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Award cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}
        >
          {AWARDS.map((award, i) => (
            <AwardCard key={award.title} award={award} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes awardIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}