import React from "react";

const EXP = [
  {
    title:   "Endpoint Security Engineer",
    company: "Sophos",
    period:  "Oct 2023 – Present",
    loc:     "Ahmedabad, Gujarat, India",
    bullets: [
      "Investigate and resolve endpoint security incidents for enterprise customers across Windows, macOS, and Linux — including malware outbreaks, ransomware events, and suspicious process activity.",
      "Design and deploy Sophos Central security policies — DLP, Web Control, AMSI, IPS/IDS — tailored to customer environments to strengthen security posture and reduce attack surface.",
      "Write and maintain Live Discover OSQL queries for proactive threat hunting across Sophos Data Lake — targeting MITRE ATT&CK techniques including persistence, lateral movement, and credential access.",
      "Support GCP cloud endpoint deployments integrating Sophos Intercept X — configuring auto-isolation policies and SOC alert routing for cloud-hosted workloads.",
      "Actively contribute to Sophos Community Forums — answering technical questions, sharing detection queries, and helping customers resolve product issues.",
    ],
    tags: ["Sophos Central","EDR","XDR","MDR","Ransomware IR","DLP","AMSI","IPS/IDS","GCP","MITRE ATT&CK","Live Discover","Threat Hunting"],
  },
  {
    title:   "Endpoint Security Engineer",
    company: "Sophos",
    period:  "Jan 2022 – Oct 2023",
    loc:     "Ahmedabad, Gujarat, India",
    bullets: [
      "Provided endpoint security support for enterprise customers — diagnosing detection issues, policy misconfigurations, and agent health problems across Sophos Intercept X and Sophos Central.",
      "Resolved 500+ security incidents including malware infections, false-positive tuning, and MDR alert investigations — consistently meeting SLA targets above 97%.",
      "Used Sophos Live Response to perform forensic triage — collecting memory artefacts, running process snapshots, network connections, and prefetch data to support DFIR workflows.",
      "Conducted security posture reviews for customers — identifying configuration gaps across Endpoint, Server, and Mobile verticals and recommending hardening steps.",
      "Recognised with Sophos Support Team 10 FY24 Excellence Award for outstanding contribution to customer success and team performance.",
    ],
    tags: ["Endpoint Protection","Server Security","Mobile Security","MDR","Sophos Intercept X","Live Response","DFIR","Forensics","Community Forums"],
  },
];

const EDU = [
  {
    title:   "Bachelor of Technology — Computer Engineering",
    company: "Ganpat University (U.V. Patel College of Engineering)",
    period:  "Jul 2019 – Jun 2023",
    loc:     "Mehsana, Gujarat, India",
    bullets: [
      "Studied networking, cybersecurity fundamentals, and software engineering — building a strong technical foundation directly applied in enterprise endpoint security work.",
      "Built hands-on projects using C#, Java, and Kotlin with Firebase — developing practical skills in software development across desktop and mobile platforms.",
    ],
    tags: ["Computer Engineering","Networking","Cybersecurity Fundamentals","Software Development"],
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
                <ul style={{ paddingLeft:"1.2rem", margin:".75rem 0" }}>
                  {j.bullets.map((b, i) => (
                    <li key={i} style={{ fontFamily:"var(--font-mono)", fontSize:".78rem", color:"rgba(223,242,250,.72)", lineHeight:1.7, marginBottom:".5rem" }}>
                      {b}
                    </li>
                  ))}
                </ul>
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
                <ul style={{ paddingLeft:"1.2rem", margin:".75rem 0" }}>
                  {e.bullets.map((b, i) => (
                    <li key={i} style={{ fontFamily:"var(--font-mono)", fontSize:".78rem", color:"rgba(223,242,250,.72)", lineHeight:1.7, marginBottom:".5rem" }}>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="tl-tags">{e.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}