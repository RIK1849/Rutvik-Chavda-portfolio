"use client";
import { useEffect, useRef, useState } from "react";

type Certification = { title: string; issuer: string; tier: "core" | "cloud" | "security" | "siem" };

const CERTIFICATIONS: Certification[] = [
  { title: "Sophos Central Certified Architect",           issuer: "Sophos",                       tier: "core"     },
  { title: "Sophos Central Certified Engineer",            issuer: "Sophos",                       tier: "core"     },
  { title: "Sophos Certified Endpoint Security Engineer",  issuer: "Sophos",                       tier: "core"     },
  { title: "Sophos Central Support Engineer",              issuer: "Sophos",                       tier: "core"     },
  { title: "Practical Windows PowerShell Scripting: Unit 1", issuer: "Sophos",                    tier: "core"     },
  { title: "AWS Cloud Technical Essentials",               issuer: "AWS",                          tier: "cloud"    },
  { title: "Essentials with Azure Fundamentals",           issuer: "Coursera",                     tier: "cloud"    },
  { title: "The Absolute Guide to MITRE ATT&CK",          issuer: "Purple Academy by Picus Security", tier: "security" },
  { title: "Ethical Hacking From Scratch",                 issuer: "Udemy",                        tier: "security" },
  { title: "Introduction to Cyber Security",               issuer: "SkillUp",                      tier: "security" },
  { title: "CISSP Security Assessment",                    issuer: "SkillUp",                      tier: "security" },
  { title: "Introduction to SIEM (Splunk)",                issuer: "EDUCBA",                       tier: "siem"     },
  { title: "Splunk Administration and Advanced Topics",    issuer: "Coursera",                     tier: "siem"     },
  { title: "SIEM Splunk Hands-On Guide Specialization",   issuer: "Coursera",                     tier: "siem"     },
];

const TIER_META: Record<string, { label: string; color: string }> = {
  core:     { label: "Sophos Core",        color: "#00ff64" },
  cloud:    { label: "Cloud & Infra",      color: "#38bdf8" },
  security: { label: "Security & Hacking", color: "#f472b6" },
  siem:     { label: "SIEM & Splunk",      color: "#fb923c" },
};

export default function CertificationsSection() {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter]   = useState<string>("all");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = filter === "all" ? CERTIFICATIONS : CERTIFICATIONS.filter((c) => c.tier === filter);

  return (
    <section ref={ref} id="certifications" className="section" style={{ background:"#000", borderTop:"1px solid rgba(0,255,100,0.06)" }}>
      <div className="container">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition:"all 0.7s ease",
          }}
        >
          <p className="section-kicker">Certifications</p>
          <h2 className="section-title">
            Certifications that prove <span>the depth</span>
          </h2>
          <p className="section-copy">
            14 certifications spanning endpoint security architecture, cloud infrastructure, offensive security,
            and SIEM operations — each one adding a concrete layer of verified knowledge.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap", marginBottom:"2rem" }}>
          {["all", "core", "cloud", "security", "siem"].map((tier) => {
            const isActive = filter === tier;
            const meta = tier === "all" ? { label:"All Certs", color:"#00ff64" } : TIER_META[tier];
            return (
              <button
                key={tier}
                onClick={() => setFilter(tier)}
                style={{
                  fontFamily:"'Share Tech Mono',monospace",
                  fontSize:"0.68rem", letterSpacing:"0.09em",
                  padding:"0.4rem 1rem", borderRadius:4,
                  border:`1px solid ${isActive ? meta.color : "rgba(240,255,244,0.12)"}`,
                  color: isActive ? (tier === "all" ? "#000" : "#000") : "rgba(240,255,244,0.5)",
                  background: isActive ? meta.color : "transparent",
                  cursor:"pointer", transition:"all 0.2s",
                  textTransform:"uppercase",
                }}
              >
                {meta.label}
              </button>
            );
          })}
        </div>

        <div className="cert-grid">
          {filtered.map((cert, i) => {
            const meta = TIER_META[cert.tier];
            return (
              <div
                key={cert.title}
                className="card cert-card"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(14px)",
                  transition:`all 0.5s ease ${i*0.045}s`,
                  borderLeft:`2px solid ${meta.color}40`,
                }}
              >
                <span className="cert-mark" style={{ color:meta.color }}>✓</span>
                <div>
                  <span className="cert-text">{cert.title}</span>
                  <span className="cert-issuer" style={{ color:meta.color }}>{cert.issuer}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}