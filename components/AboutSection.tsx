import React from "react";

const CERTIFICATIONS = {
  sophos: [
    "Sophos Central – Certified Support Engineer",
    "Sophos Certified Endpoint Security Engineer",
    "Sophos Central – Certified Engineer",
    "Sophos Support Team Top 10 FY24 — Excellence Award",
  ],
  additional: [
    "TCS iON – Career Edge Young Professional",
    "Introduction to Cyber Security",
    "Introduction to CISSP Security Assessment",
    "Introduction to Cloud Computing",
    "Complete Blockchain Professional Course",
    "Learn Ethical Hacking From Scratch",
  ],
};

const SKILL_GROUPS = [
  {
    title: "DETECTION & RESPONSE",
    items: [
      "Sophos XDR / Intercept X",
      "EDR / XDR Investigations",
      "Threat Hunting",
      "Incident Response",
    ],
  },
  {
    title: "PLATFORMS & POLICIES",
    items: [
      "Sophos Central Administration",
      "Web Control / App Control / Device Encryption",
      "Windows / macOS / Linux",
      "Cloud, Hybrid, and On-Prem Environments",
    ],
  },
  {
    title: "INFRASTRUCTURE & ANALYSIS",
    items: [
      "Splunk Fundamentals",
      "Windows Event Logs / Sysmon",
      "Root Cause Analysis",
      "MITRE ATT&CK Mapping",
    ],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <p className="sec-label">ABOUT</p>
        <h2 className="sec-title">
          Who I <span>Am</span>
        </h2>

        <div className="about-grid">
          <div className="panel">
            <p className="about-copy">
              I&apos;m Rutvik Chavda, an endpoint security professional with
              hands-on experience supporting enterprise customers across
              Windows, macOS, and Linux environments.
            </p>
            <p className="about-copy">
              My work focuses on malware and ransomware investigations,
              endpoint telemetry analysis, escalation handling, policy tuning,
              and structured troubleshooting across Sophos Central and
              EDR/XDR-driven workflows.
            </p>
            <p className="about-copy">
              I&apos;m targeting technical support, security engineering, threat
              investigation, and SOC/IR roles where I can combine deep product
              troubleshooting with practical detection and response work.
            </p>
          </div>

          <div className="panel">
            <h3 className="subhead">SOPHOS CERTIFICATIONS</h3>
            <div className="cert-list">
              {CERTIFICATIONS.sophos.map((item) => (
                <div key={item} className="cert-item">
                  ✓ {item}
                </div>
              ))}
            </div>

            <h3 className="subhead" style={{ marginTop: "1.5rem" }}>
              ADDITIONAL CERTIFICATIONS
            </h3>
            <div className="cert-list">
              {CERTIFICATIONS.additional.map((item) => (
                <div key={item} className="cert-item">
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skill-grid" style={{ marginTop: "2rem" }}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="panel">
              <h3 className="subhead">{group.title}</h3>
              <div className="cert-list">
                {group.items.map((item) => (
                  <div key={item} className="cert-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}