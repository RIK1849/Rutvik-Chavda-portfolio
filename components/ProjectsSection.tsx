import React from "react";

type Project = {
  sev: "WORK" | "PERSONAL";
  sevCls: string;
  name: string;
  desc: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    sev: "WORK",
    sevCls: "sev-crit",
    name: "Malware & Ransomware Incident Triage",
    desc: "Investigated endpoint incidents by correlating EDR/XDR telemetry, Windows Event Logs, Sysmon activity, and process execution artifacts to validate suspicious behavior and support containment decisions.",
    tags: [
      "EDR/XDR",
      "Ransomware IR",
      "Windows Event Logs",
      "Sysmon",
      "Process Tree Analysis",
      "Root Cause Analysis",
    ],
  },
  {
    sev: "WORK",
    sevCls: "sev-crit",
    name: "Live Discover Threat Hunting Queries",
    desc: "Built and used Live Discover / OSQL queries to surface suspicious activity across endpoint telemetry and support investigation workflows mapped to MITRE ATT&CK behaviors.",
    tags: [
      "Live Discover",
      "OSQL",
      "Sophos Data Lake",
      "MITRE ATT&CK",
      "Threat Hunting",
      "Cross-Platform",
    ],
  },
  {
    sev: "WORK",
    sevCls: "sev-high",
    name: "Sophos Central Policy Tuning & Optimisation",
    desc: "Worked on endpoint policy tuning across web control, application control, device control, and device encryption to balance protection strength with customer environment stability.",
    tags: [
      "Sophos Central",
      "Web Control",
      "App Control",
      "Device Encryption",
      "Policy Tuning",
      "Hybrid Environments",
    ],
  },
  {
    sev: "WORK",
    sevCls: "sev-high",
    name: "Defect Reproduction & Engineering Escalation",
    desc: "Created repeatable test cases and lab scenarios to reproduce difficult customer issues, document expected vs actual behavior, and provide engineering-ready escalation evidence.",
    tags: [
      "Lab Environments",
      "Defect Reproduction",
      "Windows",
      "macOS",
      "Linux",
      "Engineering Escalation",
    ],
  },
  {
    sev: "PERSONAL",
    sevCls: "sev-med",
    name: "Home Lab — SIEM & Endpoint Investigation Practice",
    desc: "Used a personal lab to strengthen practical skills in detection logic, log correlation, Splunk fundamentals, and endpoint investigation workflows across Windows and Linux systems.",
    tags: [
      "Home Lab",
      "Splunk",
      "Endpoint Telemetry",
      "Detection Engineering",
      "Windows",
      "Linux",
    ],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="sec-label">WORK & PROJECTS</p>
        <h2 className="sec-title">
          What I <span>Do</span>
        </h2>

        <div className="legend-row">
          <span className="legend-item">
            <span className="sev sev-crit">WORK</span> Primary responsibilities
          </span>
          <span className="legend-item">
            <span className="sev sev-high">WORK</span> Supporting
            responsibilities
          </span>
          <span className="legend-item">
            <span className="sev sev-med">PERSONAL</span> Lab / learning project
          </span>
        </div>

        <div className="proj-grid">
          {PROJECTS.map((project) => (
            <div key={project.name} className="proj-card panel">
              <div className="proj-top">
                <span className={`sev ${project.sevCls}`}>{project.sev}</span>
              </div>

              <h3 className="proj-name">{project.name}</h3>
              <p className="proj-desc">{project.desc}</p>

              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
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