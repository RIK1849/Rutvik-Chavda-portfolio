import React from "react";

const EXPERIENCE = [
  {
    role: "Technical Support Engineer",
    company: "Sophos",
    period: "January 2023 – Present",
    points: [
      "Support enterprise customers with complex endpoint security cases across Windows, macOS, and Linux environments.",
      "Investigate malware, ransomware, suspicious processes, and policy-related issues using Sophos tooling, telemetry, and supporting endpoint data.",
      "Perform incident triage, remediation validation, and root cause analysis for escalated support cases.",
      "Use Splunk, Windows Event Logs, Sysmon, and Live Discover style workflows to support troubleshooting and investigation.",
      "Collaborate with engineering teams for defect reproduction, validation, and escalation handoff.",
      "Create and maintain technical documentation, knowledge content, and runbooks to improve case handling and repeatability.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <p className="section-kicker">EXPERIENCE</p>
        <h2 className="section-title">
          Work Experience with Strong <span>Security Relevance</span>
        </h2>

        <div className="timeline">
          {EXPERIENCE.map((item) => (
            <article key={item.role} className="card timeline-card">
              <div className="timeline-top">
                <div>
                  <h3 className="card-title">{item.role}</h3>
                  <p className="timeline-meta">{item.company}</p>
                </div>
                <span className="timeline-period">{item.period}</span>
              </div>

              <ul className="timeline-list">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
