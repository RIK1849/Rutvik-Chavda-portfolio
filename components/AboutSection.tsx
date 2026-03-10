"use client";
import React, { useEffect, useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    cat: "DETECTION & RESPONSE",
    skills: [
      { name: "Sophos XDR / Intercept X",   lv: "Expert",    pct: 97 },
      { name: "EDR / MDR Operations",        lv: "Expert",    pct: 95 },
      { name: "Threat Hunting",              lv: "Expert",    pct: 93 },
      { name: "Incident Response",           lv: "Expert",    pct: 96 },
    ],
  },
  {
    cat: "PLATFORMS & POLICIES",
    skills: [
      { name: "Sophos Central Admin",        lv: "Expert",    pct: 98 },
      { name: "DLP / Web Control / AMSI",    lv: "Expert",    pct: 92 },
      { name: "IPS / IDS Policy Design",     lv: "Advanced",  pct: 88 },
      { name: "Cloud & On-Premise Env.",     lv: "Advanced",  pct: 87 },
    ],
  },
  {
    cat: "INFRASTRUCTURE",
    skills: [
      { name: "Google Cloud Platform (GCP)", lv: "Advanced",  pct: 84 },
      { name: "Windows / macOS / Linux",     lv: "Expert",    pct: 93 },
      { name: "Penetration Testing",         lv: "Intermediate", pct: 76 },
      { name: "Big Data Analytics",          lv: "Intermediate", pct: 74 },
    ],
  },
];

const CERTS = [
  { label: "Sophos Central – Support Engineer",          active: true  },
  { label: "Sophos Certified – Endpoint Security Eng.",  active: true  },
  { label: "Sophos Central – Certified Engineer",        active: true  },
  { label: "Sophos Support Team 10 FY24 (Award)",        active: true  },
  { label: "BTech Computer Engineering – Ganpat Univ.",  active: true  },
  { label: "CEH / OSCP (Pursuing)",                      active: false },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
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
              in Ahmedabad, Gujarat, India — with 3+ years protecting enterprise environments
              from advanced threats.
            </p>
            <p className="about-p">
              I am a <strong>Certified Sophos Central Engineer &amp; Architect</strong>, specialising in
              endpoint security and threat response. I investigate malware outbreaks, assist
              customers during <strong>ransomware incidents</strong>, and design &amp; implement
              security policies including <strong>DLP, Web Control, AMSI, IPS, and IDS</strong>.
            </p>
            <p className="about-p">
              My work spans <strong>cloud and on-premise environments</strong>, leveraging GCP,
              penetration testing methodology, and big data analytics to ensure cybersecurity
              resilience for enterprise clients worldwide.
            </p>

            <div className="cert-grid">
              {CERTS.map(c => (
                <div key={c.label} className="cert-item">
                  <span className="cert-chk" style={{ color: c.active ? "var(--green)" : "var(--amber)" }}>
                    {c.active ? "✓" : "◎"}
                  </span>
                  {c.label}
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
