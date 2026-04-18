"use client";
import { useEffect, useRef, useState } from "react";

type Certification = {
  title: string;
  issuer: string;
  category: "sophos" | "cloud" | "security" | "siem";
};

const CERTIFICATIONS: Certification[] = [
  { title: "Sophos Central Certified Architect", issuer: "Sophos", category: "sophos" },
  { title: "Sophos Central Certified Engineer", issuer: "Sophos", category: "sophos" },
  { title: "Sophos Certified Endpoint Security Engineer", issuer: "Sophos", category: "sophos" },
  { title: "Sophos Central Support Engineer", issuer: "Sophos", category: "sophos" },
  { title: "Practical Windows PowerShell Scripting: Unit 1", issuer: "Sophos", category: "sophos" },
  { title: "AWS Cloud Technical Essentials", issuer: "AWS", category: "cloud" },
  { title: "Essentials with Azure Fundamentals", issuer: "Coursera", category: "cloud" },
  { title: "Ethical Hacking From Scratch", issuer: "Udemy", category: "security" },
  { title: "Introduction to Cyber Security", issuer: "SkillUp", category: "security" },
  { title: "CISSP Security Assessment", issuer: "SkillUp", category: "security" },
  { title: "The Absolute Guide to MITRE ATT&CK", issuer: "Purple Academy by Picus Security", category: "security" },
  { title: "Introduction to SIEM (Splunk)", issuer: "EDUCBA", category: "siem" },
  { title: "Splunk Administration and Advanced Topics", issuer: "Coursera", category: "siem" },
  { title: "SIEM Splunk Hands-On Guide Specialization", issuer: "Coursera", category: "siem" },
];

const CATEGORY_META = {
  sophos:   { label: "Sophos",   color: "#00ff64", bg: "rgba(0,255,100,0.07)"   },
  cloud:    { label: "Cloud",    color: "#38bdf8", bg: "rgba(56,189,248,0.07)"  },
  security: { label: "Security", color: "#f472b6", bg: "rgba(244,114,182,0.07)" },
  siem:     { label: "SIEM",     color: "#fb923c", bg: "rgba(251,146,60,0.07)"  },
};

const FILTERS = ["all", "sophos", "cloud", "security", "siem"] as const;
type Filter = typeof FILTERS[number];

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const meta = CATEGORY_META[cert.category];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? meta.bg : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? meta.color + "40" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 10,
        padding: "1.2rem 1.1rem",
        transition: "all 0.25s ease",
        cursor: "default",
        animation: `certIn 0.5s ease ${index * 0.05}s both`,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 30px ${meta.color}15` : "none",
        display: "flex",
        gap: "0.8rem",
        alignItems: "flex-start",
      }}
    >
      {/* Check icon */}
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: `1.5px solid ${meta.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
          background: hovered ? meta.color + "20" : "transparent",
          transition: "background 0.25s",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <polyline
            points="1.5,5.5 4,8 8.5,2"
            stroke={meta.color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#fff",
            lineHeight: 1.4,
            marginBottom: 4,
          }}
        >
          {cert.title}
        </div>
        <div
          style={{
            fontSize: "0.72rem",
            color: meta.color,
            fontFamily: "monospace",
            letterSpacing: "0.05em",
            opacity: 0.8,
          }}
        >
          {cert.issuer}
        </div>
      </div>

      {/* Category badge */}
      <span
        style={{
          fontSize: "0.6rem",
          padding: "2px 7px",
          borderRadius: 999,
          background: meta.color + "15",
          color: meta.color,
          border: `1px solid ${meta.color}30`,
          fontFamily: "monospace",
          letterSpacing: "0.07em",
          whiteSpace: "nowrap",
          flexShrink: 0,
          fontWeight: 600,
          alignSelf: "flex-start",
          marginTop: 2,
        }}
      >
        {meta.label.toUpperCase()}
      </span>
    </div>
  );
}

export default function CertificationsSection() {
  const [filter, setFilter] = useState<Filter>("all");
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

  const filtered =
    filter === "all" ? CERTIFICATIONS : CERTIFICATIONS.filter((c) => c.category === filter);

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === "all" ? CERTIFICATIONS.length : CERTIFICATIONS.filter((c) => c.category === f).length;
    return acc;
  }, {} as Record<Filter, number>);

  return (
    <section
      ref={ref}
      id="certifications"
      style={{
        background: "#000",
        padding: "6rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,100,0.04) 0%, transparent 70%)",
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
            // CERTIFICATIONS
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
            Verified{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(0,255,100,0.6)",
                color: "transparent",
              }}
            >
              expertise
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", maxWidth: 500, lineHeight: 1.7 }}>
            14 certifications spanning endpoint security, cloud platforms, ethical hacking, and SIEM
            engineering — each one backed by hands-on practice.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(10px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          {FILTERS.map((f) => {
            const active = filter === f;
            const color = f === "all" ? "#fff" : CATEGORY_META[f as Exclude<Filter,"all">].color;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: `1px solid ${active ? color + "60" : "rgba(255,255,255,0.1)"}`,
                  background: active ? color + "15" : "transparent",
                  color: active ? color : "rgba(255,255,255,0.4)",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {f.toUpperCase()} ({counts[f]})
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.85rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}
        >
          {filtered.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes certIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}