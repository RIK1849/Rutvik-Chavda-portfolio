import React from "react";

const EXP = [
  {
    title:   "Endpoint Security Engineer — L2/L3",
    company: "Sophos",
    period:  "Oct 2023 – Present",
    loc:     "Ahmedabad, Gujarat, India",
    bullets: [
      "Lead L2/L3 escalation handling for enterprise EDR/XDR incidents across Windows, macOS, and Linux — covering ransomware containment, malware triage, and advanced persistent threat (APT) investigation.",
      "Architect and deploy Sophos Central security policies (DLP, Web Control, AMSI, IPS/IDS) for enterprise clients across EMEA — reducing policy-related incidents by 35%.",
      "Build and maintain a Live Discover XDR query library (OSQL) targeting MITRE ATT&CK tactics — persistence, lateral movement, credential access — with cross-platform coverage and false-positive suppression.",
      "Drive GCP cloud endpoint security rollouts integrating Sophos Intercept X with auto-isolation policies for compromised VMs and custom SOC alert routing.",
      "Collaborate directly with Sophos engineering on product feedback loops — identifying detection gaps and validating new Intercept X features pre-release.",
    ],
    tags: ["Sophos Central","EDR","XDR","MDR","Ransomware IR","DLP","AMSI","IPS/IDS","GCP","MITRE ATT&CK","Live Discover","Threat Hunting"],
  },
  {
    title:   "Endpoint Security Engineer — L1/L2",
    company: "Sophos",
    period:  "Jan 2022 – Oct 2023",
    loc:     "Ahmedabad, Gujarat, India",
    bullets: [
      "Handled endpoint security support for enterprise customers — diagnosing detection anomalies, policy misconfigurations, and agent health issues across Sophos Intercept X and Sophos Central.",
      "Resolved 500+ security incidents including malware outbreaks, false-positive tuning, and MDR alert triage — achieving consistent SLA adherence above 97%.",
      "Developed automated forensic triage scripts via Sophos Live Response — collecting memory artefacts, process trees, network connections, and prefetch data for DFIR analysis.",
      "Delivered customer security posture reviews — identifying configuration gaps across Endpoint, Server, and Mobile protection verticals and implementing hardening recommendations.",
    ],
    tags: ["Endpoint Protection","Server Security","Mobile Security","MDR","Sophos Intercept X","Live Response","DFIR","Forensics","SLA Management"],
  },
];

const EDU = [
  {
    title:   "Bachelor of Technology — Computer Engineering",
    company: "Ganpat University (U.V. Patel College of Engineering)",
    period:  "Jul 2019 – Jun 2023",
    loc:     "Mehsana, Gujarat, India",
    bullets: [
      "Specialised in networking, cybersecurity fundamentals, and software engineering — building foundational knowledge applied directly in enterprise endpoint security operations.",
      "Developed projects in C#, Java/Kotlin with Firebase — demonstrating practical software engineering skills across desktop and mobile platforms.",
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