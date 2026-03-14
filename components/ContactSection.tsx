"use client";
import React, { useEffect, useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    cat: "DETECTION & RESPONSE",
    skills: [
      { name: "Sophos XDR / Intercept X",   lv: "Expert",       pct: 97 },
      { name: "EDR / MDR Operations",        lv: "Expert",       pct: 95 },
      { name: "Threat Hunting",              lv: "Expert",       pct: 93 },
      { name: "Incident Response",           lv: "Expert",       pct: 96 },
    ],
  },
  {
    cat: "PLATFORMS & POLICIES",
    skills: [
      { name: "Sophos Central Admin",        lv: "Expert",       pct: 98 },
      { name: "DLP / Web Control / AMSI",    lv: "Expert",       pct: 92 },
      { name: "IPS / IDS Policy Design",     lv: "Advanced",     pct: 88 },
      { name: "Cloud & On-Premise Env.",     lv: "Advanced",     pct: 87 },
    ],
  },
  {
    cat: "INFRASTRUCTURE",
    skills: [
      { name: "Google Cloud Platform (GCP)", lv: "Advanced",     pct: 84 },
      { name: "Windows / macOS / Linux",     lv: "Expert",       pct: 93 },
      { name: "Penetration Testing",         lv: "Intermediate", pct: 76 },
      { name: "Big Data Analytics",          lv: "Intermediate", pct: 74 },
    ],
  },
];

const SOPHOS_CERTS = [
  "Sophos Central – Certified Support Engineer",
  "Sophos Certified Endpoint Security Engineer",
  "Sophos Central – Certified Engineer",
  "Sophos Support Team 10 FY24 — Excellence Award",
];

const OTHER_CERTS = [
  "TCS ION – Career Edge Young Professional (2022)",
  "Introduction to Cyber Security – SkillUp",
  "Introduction to CISSP Security Assessment – SkillUp",
  "Introduction to Cloud Computing – SkillUp",
  "Complete Blockchain Professional Course – Udemy",
  "Learn Ethical Hacking From Scratch – Udemy",
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.12 }
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
          {/* BIO */}
          <div>
            <p className="about-p">
              I&apos;m <strong>Rutvik Chavda</strong>, an <strong>Endpoint Security Engineer at Sophos</strong> based
              in Ahmedabad, Gujarat, India — with 3+ years of hands-on experience protecting
              enterprise environments from sophisticated, real-world threats.
            </p>
            <p className="about-p">
              A <strong>triple-certified Sophos Engineer</strong>, I specialise in endpoint detection,
              threat hunting, and incident response. Day-to-day I investigate malware outbreaks,
              lead customers through <strong>ransomware containment</strong>, and architect
              security policies spanning <strong>DLP, Web Control, AMSI, IPS, and IDS</strong>.
            </p>
            <p className="about-p">
              My operational scope covers <strong>cloud and on-premise environments</strong> —
              leveraging GCP, Live Discover XDR queries, and big-data analytics to deliver
              measurable cybersecurity resilience for enterprise clients across EMEA and beyond.
            </p>

            {/* SOPHOS CERTIFICATIONS */}
            <p className="sec-label" style={{ marginTop:"1.5rem", marginBottom:".75rem" }}>
              SOPHOS CERTIFICATIONS
            </p>
            <div className="cert-grid">
              {SOPHOS_CERTS.map(c => (
                <div key={c} className="cert-item">
                  <span className="cert-chk" style={{ color:"var(--cyan)" }}>✓</span>
                  {c}
                </div>
              ))}
            </div>

            {/* OTHER CERTIFICATIONS */}
            <p className="sec-label" style={{ marginTop:"1.5rem", marginBottom:".75rem" }}>
              ADDITIONAL CERTIFICATIONS
            </p>
            <div className="cert-grid">
              {OTHER_CERTS.map(c => (
                <div key={c} className="cert-item">
                  <span className="cert-chk" style={{ color:"var(--green)" }}>✓</span>
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS */}
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
                    <div style={{ marginBottom:".65rem" }} />
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