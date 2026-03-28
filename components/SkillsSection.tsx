import React from "react";

const SKILL_GROUPS = [
  {
    title: "Endpoint Security",
    items: [
      "Sophos Central",
      "Intercept X",
      "Sophos EDR/XDR",
      "Sophos MDR",
      "Sophos Mobile",
    ],
  },
  {
    title: "Investigation & Response",
    items: [
      "Threat Investigation",
      "Incident Triage",
      "Malware Investigation",
      "Ransomware Investigation",
      "Remediation Validation",
    ],
  },
  {
    title: "Logs & Analysis",
    items: [
      "Splunk",
      "Windows Event Logs",
      "Sysmon",
      "Live Discover",
      "Root Cause Analysis",
    ],
  },
  {
    title: "Platform Coverage",
    items: [
      "Windows",
      "macOS",
      "Linux",
      "Enterprise Customer Support",
      "Escalation Handling",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="section-kicker">SKILLS</p>
        <h2 className="section-title">
          Skills Mapped to the Roles I&apos;m <span>Targeting</span>
        </h2>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="card skill-card">
              <h3 className="card-title">{group.title}</h3>
              <div className="chip-grid">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
