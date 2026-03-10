import React from "react";

const EXP = [
  {
    title:   "Endpoint Security Engineer",
    company: "Sophos",
    period:  "Oct 2023 – Present · 2 yrs 6 mos",
    loc:     "Ahmedabad, Gujarat, India",
    desc:
      "Certified Sophos Central Engineer and Architect specialising in endpoint security and threat response. Investigate malware outbreaks and assist customers with ransomware incidents. Design and implement security policies — DLP, Web Control, AMSI, IPS, IDS — and troubleshoot complex endpoint issues in cloud and on-premise environments. Focused on combining technical expertise with problem-solving to deliver cybersecurity resilience.",
    tags: ["Sophos Central","EDR","XDR","MDR","Ransomware IR","DLP","AMSI","IPS/IDS","GCP","Threat Hunting"],
  },
  {
    title:   "Endpoint Security Engineer",
    company: "Sophos",
    period:  "Jan 2022 – Present · 3 yrs 3 mos",
    loc:     "Ahmedabad, Gujarat, India",
    desc:
      "Broader endpoint security engineering scope covering Managed Detection and Response (MDR), advanced threat response, and enterprise customer security posture improvement. Developed deep expertise in Sophos product suite across Endpoint, Server, and Mobile protection verticals.",
    tags: ["Endpoint Protection","Server Security","Mobile Security","MDR","Sophos Intercept X","Cloud Security"],
  },
];

const EDU = [
  {
    title:   "Bachelor of Technology — Computer Engineering",
    company: "Ganpat University",
    period:  "Jul 2019 – Oct 2023",
    loc:     "Gujarat, India",
    desc:
      "Gained solid foundation in computer systems, software development, networking fundamentals, and security principles. Thesis focus on endpoint security architectures.",
    tags: ["Computer Engineering","Networking","Security Fundamentals","Software Development"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <p className="sec-label">EXPERIENCE</p>
        <h2 className="sec-title">Career <span>Timeline</span></h2>

        <div style={{ marginBottom:"3rem" }}>
          <p style={{ fontFamily:"var(--font-mono)", fontSize:".65rem", color:"var(--cyan)", letterSpacing:".2em", textTransform:"uppercase", marginBottom:"1.5rem" }}>
            ▸ WORK EXPERIENCE
          </p>
          <div className="timeline">
            {EXP.map(j => (
              <div key={j.title + j.period} className="tl-item">
                <div className="tl-meta">
                  <div>
                    <p className="tl-title">{j.title}</p>
                    <p className="tl-co">{j.company} · {j.loc}</p>
                  </div>
                  <span className="tl-period">{j.period}</span>
                </div>
                <p className="tl-desc">{j.desc}</p>
                <div className="tl-tags">{j.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily:"var(--font-mono)", fontSize:".65rem", color:"var(--cyan)", letterSpacing:".2em", textTransform:"uppercase", marginBottom:"1.5rem" }}>
            ▸ EDUCATION
          </p>
          <div className="timeline">
            {EDU.map(e => (
              <div key={e.title} className="tl-item">
                <div className="tl-meta">
                  <div>
                    <p className="tl-title">{e.title}</p>
                    <p className="tl-co">{e.company} · {e.loc}</p>
                  </div>
                  <span className="tl-period">{e.period}</span>
                </div>
                <p className="tl-desc">{e.desc}</p>
                <div className="tl-tags">{e.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
