"use client";
import React, { useEffect, useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    cat: "DETECTION & RESPONSE",
    skills: [
      { name: "Sophos EDR / XDR / MDR",         lv: "Expert",       pct: 98 },
      { name: "Threat Hunting (MITRE ATT&CK)",   lv: "Expert",       pct: 95 },
      { name: "Incident Response (P1/P2)",        lv: "Expert",       pct: 97 },
      { name: "Malware & Ransomware Analysis",    lv: "Expert",       pct: 94 },
    ],
  },
  {
    cat: "TELEMETRY & LOG ANALYSIS",
    skills: [
      { name: "Live Discover (SQL / OSQL)",       lv: "Expert",       pct: 96 },
      { name: "Splunk SIEM",                      lv: "Advanced",     pct: 89 },
      { name: "Windows Event Logs & Sysmon",      lv: "Expert",       pct: 93 },
      { name: "Process Tree & Registry Analysis", lv: "Expert",       pct: 92 },
    ],
  },
  {
    cat: "PLATFORMS & POLICY",
    skills: [
      { name: "Sophos Central Admin & Architect", lv: "Expert",       pct: 98 },
      { name: "DLP / Web / App / Device Control", lv: "Expert",       pct: 93 },
      { name: "AMSI / IPS / IDS Tuning",          lv: "Advanced",     pct: 90 },
      { name: "Azure / Hybrid Cloud Envs.",        lv: "Advanced",     pct: 85 },
    ],
  },
  {
    cat: "OPERATING SYSTEMS",
    skills: [
      { name: "Windows / Windows Server",         lv: "Expert",       pct: 95 },
      { name: "macOS",                            lv: "Advanced",     pct: 87 },
      { name: "Linux",                            lv: "Advanced",     pct: 86 },
    ],
  },
];

const SOPHOS_CERTS = [
  "Sophos Central Certified Architect",
  "Sophos Central Certified Engineer",
  "Sophos Certified Endpoint Security Engineer",
  "Sophos Central Support Engineer",
];

const OTHER_CERTS = [
  "The Absolute Guide to MITRE ATT&CK — Purple Academy by Picus Security",
  "Essentials with Azure Fundamentals — Coursera",
  "Ethical Hacking From Scratch — Udemy",
  "Introduction to Cyber Security — SkillUp",
  "CISSP Security Assessment — SkillUp",
  "Introduction to Cloud Computing — SkillUp",
];

const AWARDS = [
  {
    title: "🏆 Sophos Support Team Top 10 — FY24",
    desc:  "Selected among the top 10 support engineers globally at Sophos — evaluated across case quality, CSAT scores, SLA adherence, and internal KB contributions.",
    color: "var(--amber)",
  },
  {
    title: "🥈 Top 2 Sophos Community Staff Contributor — FY25 (Top 3 Globally)",
    desc:  "Ranked #2 staff contributor on the Sophos Community platform, recognised for delivering detailed, technically accurate answers helping hundreds of customers and partners worldwide.",
    color: "var(--cyan)",
  },
  {
    title: "🌟 Sophos Community Staff Spotlight",
    desc:  "Featured in the Staff Spotlight on the Sophos Community Blog for sustained technical contributions, deep product expertise, and commitment to the global customer community.",
    color: "var(--green)",
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.10 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <p className="sec-label">ABOUT</p>
        <h2 className="sec-title">Who I <span>Am</span></h2>

        <div className="about-grid">
          {/* LEFT — bio + certs + awards */}
          <div>
            <p className="about-p">
              I&apos;m <strong>Rutvik Chavda</strong>, a <strong>Technical Support Engineer — Endpoint Security at Sophos</strong>,
              based in Ahmedabad, Gujarat, India. With 3+ years owning complex P1/P2 escalations for enterprise
              customers across <strong>EMEA, APAC, and the Americas</strong>, I operate at the intersection of
              deep endpoint investigation and operational security delivery.
            </p>
            <p className="about-p">
              My day-to-day spans <strong>malware and ransomware investigations</strong>, attack timeline
              reconstruction, root cause analysis, and remediation validation using
              <strong> EDR/XDR telemetry, Splunk (SIEM), Windows Event Logs, Sysmon, and Live Discover</strong> SQL
              queries across the Sophos Data Lake — on Windows, macOS, and Linux.
            </p>
            <p className="about-p">
              I build and maintain <strong>lab environments</strong> to reproduce complex customer defects,
              collaborate directly with Engineering and Product teams on bug-fix validation, and author
              <strong> troubleshooting runbooks, KB articles, and investigation playbooks</strong> that reduce
              repeat escalations and raise team-wide resolution quality.
            </p>
            <p className="about-p">
              A <strong>Sophos Certified Architect</strong> and active community contributor — recognised
              as a <strong>Top 2 Global Community Staff Contributor for FY25</strong> and
              featured in the Sophos Community Staff Spotlight.
            </p>

            {/* AWARDS */}
            <p className="sec-label" style={{ marginTop: "2rem", marginBottom: ".75rem" }}>AWARDS & RECOGNITION</p>
            <div style={{ display: "flex", flexDirection: "column", gap: ".6rem", marginBottom: "1.75rem" }}>
              {AWARDS.map(a => (
                <div key={a.title} className="cert-item" style={{ flexDirection: "column", alignItems: "flex-start", gap: ".3rem", padding: ".75rem .9rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", color: a.color, fontWeight: 600 }}>{a.title}</span>
                  <span style={{ fontSize: ".7rem", color: "rgba(223,242,250,.55)", lineHeight: 1.55 }}>{a.desc}</span>
                </div>
              ))}
            </div>

            {/* SOPHOS CERTS */}
            <p className="sec-label" style={{ marginBottom: ".75rem" }}>SOPHOS CERTIFICATIONS</p>
            <div className="cert-grid">
              {SOPHOS_CERTS.map(c => (
                <div key={c} className="cert-item">
                  <span className="cert-chk" style={{ color: "var(--cyan)" }}>✓</span>
                  {c}
                </div>
              ))}
            </div>

            {/* OTHER CERTS */}
            <p className="sec-label" style={{ marginTop: "1.5rem", marginBottom: ".75rem" }}>ADDITIONAL CERTIFICATIONS</p>
            <div className="cert-grid">
              {OTHER_CERTS.map(c => (
                <div key={c} className="cert-item">
                  <span className="cert-chk" style={{ color: "var(--green)" }}>✓</span>
                  {c}
                </div>
              ))}
            </div>

            {/* LANGUAGES */}
            <p className="sec-label" style={{ marginTop: "1.5rem", marginBottom: ".75rem" }}>LANGUAGES</p>
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
              {[
                { lang: "English", level: "Professional Working" },
                { lang: "Hindi",   level: "Native / Bilingual"   },
                { lang: "Gujarati",level: "Native / Bilingual"   },
              ].map(l => (
                <div key={l.lang} style={{
                  fontFamily: "var(--font-mono)", fontSize: ".68rem",
                  padding: ".35rem .75rem", border: "1px solid var(--border)",
                  color: "var(--muted)", lineHeight: 1.5
                }}>
                  <span style={{ color: "var(--white)", display: "block" }}>{l.lang}</span>
                  <span style={{ color: "var(--muted)", fontSize: ".6rem" }}>{l.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — skill bars */}
          <div className="panel skills-panel">
            {SKILL_GROUPS.map(g => (
              <div key={g.cat} className="sk-cat">
                <p className="sk-cat-title">{g.cat}</p>
                {g.skills.map(s => (
                  <div key={s.name}>
                    <div className="sk-row">
                      <span className="sk-name">{s.name}</span>
                      <span className="sk-lv">{s.lv}</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: vis ? `${s.pct}%` : "0%" }} />
                    </div>
                    <div style={{ marginBottom: ".65rem" }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}