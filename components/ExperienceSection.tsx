import React from "react";

const EXP = [
  {
    title:   "Technical Support Engineer — Endpoint Security",
    company: "Sophos",
    period:  "January 2023 – Present",
    loc:     "Ahmedabad, Gujarat, India",
    bullets: [
      "Own complex P1/P2 endpoint security escalations for enterprise customers across EMEA, APAC, and the Americas — leading incident triage, remediation validation, containment verification, and customer-facing communication while consistently meeting SLA and case quality expectations.",
      "Investigate malware, ransomware, and suspicious endpoint activity across Windows, macOS, and Linux using EDR/XDR telemetry, Windows Event Logs, Sysmon, process tree analysis, and registry inspection to identify indicators of compromise, reconstruct attack timelines, and drive root cause analysis.",
      "Correlate endpoint telemetry with Splunk (SIEM) and other log sources to validate detections and IOCs/IOAs, confirm remediation outcomes, and escalate reproducible product issues to Engineering with clear technical evidence.",
      "Build and maintain lab environments to reproduce complex customer defects — covering agent behaviour, policy conflicts, performance issues, and update compatibility across cloud, hybrid, and on-premise configurations — then document reproduction steps and test cases for Engineering escalation.",
      "Apply MITRE ATT&CK mappings to investigations and tune Sophos EDR/XDR detection rules to improve signal-to-noise and elevate true positive rates for analysts handling escalations.",
      "Design and tune enterprise Sophos Central security policies — web control, application control, device encryption, and endpoint protection settings — across cloud (including Microsoft Azure), hybrid, and on-premise environments to balance security coverage with operational stability.",
      "Develop troubleshooting runbooks, validation tests, and investigation playbooks to verify fixes, confirm containment and recovery actions, and feed reproducible steps into engineering bug-fix cycles.",
      "Author internal knowledge base articles and technical documentation that improve analyst consistency, reduce repeat escalations, and raise case quality across the team.",
      "Coordinate with Engineering and Product teams to reproduce defects, verify fixes, and document validation steps to improve release quality and reduce regressions.",
    ],
    tags: [
      "Sophos Central", "Intercept X", "Sophos EDR/XDR", "Sophos MDR",
      "Live Discover (SQL)", "Splunk (SIEM)", "Windows Event Logs", "Sysmon",
      "Malware Investigation", "Ransomware IR", "MITRE ATT&CK", "IOC/IOA",
      "Web Control", "App Control", "Device Encryption", "DLP",
      "Microsoft Azure", "P1/P2 Escalations", "Root Cause Analysis", "DFIR",
    ],
  },
];

const EDU = [
  {
    title:   "Bachelor of Technology — Computer Engineering",
    company: "Ganpat University · U.V. Patel College of Engineering",
    period:  "July 2019 – June 2023",
    loc:     "Mehsana, Gujarat, India",
    bullets: [
      "Studied networking, operating systems, cybersecurity fundamentals, and software engineering — building the technical foundation applied in enterprise endpoint security work.",
      "Developed hands-on projects using C#, Java, and Kotlin with Firebase, gaining practical experience in software and mobile development.",
    ],
    tags: ["Computer Engineering", "Networking", "Cybersecurity Fundamentals", "Software Development"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <p className="sec-label">EXPERIENCE</p>
        <h2 className="sec-title">Career <span>Timeline</span></h2>

        {/* WORK */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: ".65rem", color: "var(--cyan)",
            letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            ▸ WORK EXPERIENCE
          </p>
          <div className="timeline">
            {EXP.map(j => (
              <div key={j.title} className="tl-item">
                <div className="tl-meta">
                  <div>
                    <p className="tl-title">{j.title}</p>
                    <p className="tl-co">{j.company} · {j.loc}</p>
                  </div>
                  <span className="tl-period">{j.period}</span>
                </div>
                <ul style={{ paddingLeft: "1.2rem", margin: ".75rem 0" }}>
                  {j.bullets.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: ".78rem",
                        color: "rgba(223,242,250,.68)", lineHeight: 1.78, marginBottom: ".55rem",
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="tl-tags">
                  {j.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: ".65rem", color: "var(--cyan)",
            letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
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
                <ul style={{ paddingLeft: "1.2rem", margin: ".75rem 0" }}>
                  {e.bullets.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: ".78rem",
                        color: "rgba(223,242,250,.68)", lineHeight: 1.78, marginBottom: ".55rem",
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="tl-tags">
                  {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}