import React from "react";

// All projects reflect real work experience or clearly labelled personal/lab investigations.
// No invented metrics, no fabricated enterprise ownership claims.

const PROJECTS = [
  {
    icon: "🔍", sev: "WORK", sevCls: "sev-crit",
    name: "Malware & Ransomware Incident Triage",
    desc: "Hands-on investigation of malware and ransomware incidents for enterprise customers at Sophos. Work involves correlating EDR/XDR telemetry, Windows Event Logs, Sysmon data, and process tree analysis to identify suspicious activity, reconstruct attack timelines, validate containment, and document findings for root cause reporting.",
    tags: ["Sophos EDR/XDR", "Ransomware IR", "Windows Event Logs", "Sysmon", "Process Tree Analysis", "Root Cause Analysis", "IOC/IOA"],
  },
  {
    icon: "📊", sev: "WORK", sevCls: "sev-crit",
    name: "Live Discover Threat Hunting Queries",
    desc: "Authored and maintained Live Discover OSQL queries used during threat investigations to surface suspicious activity across the Sophos Data Lake — targeting MITRE ATT&CK tactics including persistence, lateral movement, and credential access across Windows, macOS, and Linux endpoints.",
    tags: ["Live Discover", "OSQL", "SQL", "Sophos Data Lake", "MITRE ATT&CK", "Threat Hunting", "Cross-Platform"],
  },
  {
    icon: "🛡️", sev: "WORK", sevCls: "sev-high",
    name: "Sophos Central Policy Tuning & Optimisation",
    desc: "Designed and tuned enterprise Sophos Central security policies for customers across cloud, hybrid, and on-premise environments. Covered web content control, application control, device control, device encryption, and endpoint protection settings — balancing security coverage with operational stability and reducing false positives.",
    tags: ["Sophos Central", "Web Control", "App Control", "Device Encryption", "DLP", "Policy Tuning", "Azure"],
  },
  {
    icon: "🔬", sev: "WORK", sevCls: "sev-high",
    name: "Defect Reproduction & Engineering Escalation",
    desc: "Built and maintained lab environments across Windows, macOS, and Linux to reproduce complex customer defects — including agent behaviour issues, policy conflicts, performance problems, and update compatibility failures. Documented detailed reproduction steps and test cases to accelerate engineering investigation and validate fixes before customer delivery.",
    tags: ["Lab Environments", "Defect Reproduction", "Windows", "macOS", "Linux", "Engineering Escalation", "QA Validation"],
  },
  {
    icon: "📝", sev: "WORK", sevCls: "sev-high",
    name: "Knowledge Base Articles & Troubleshooting Runbooks",
    desc: "Authored internal knowledge base articles, troubleshooting runbooks, and investigation playbooks covering common endpoint security, policy, and incident response scenarios. These resources improved analyst consistency, reduced repeat escalations, and directly contributed to the case quality standards recognised in the Sophos Support Team Top 10 FY24 award.",
    tags: ["Knowledge Base", "Runbooks", "Technical Documentation", "Investigation Playbooks", "Case Quality"],
  },
  {
    icon: "💻", sev: "PERSONAL", sevCls: "sev-med",
    name: "Home Lab — Endpoint Security & MITRE ATT&CK Mapping",
    desc: "Personal lab environment used to practise threat investigation techniques, test detection logic against simulated attack scenarios, and map observed behaviours to MITRE ATT&CK tactics and techniques. Supports ongoing learning in EDR/XDR telemetry analysis, Splunk correlation, and endpoint forensics across Windows and Linux.",
    tags: ["Home Lab", "MITRE ATT&CK", "Splunk", "EDR Telemetry", "Detection Engineering", "Windows", "Linux"],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="sec-label">WORK & PROJECTS</p>
        <h2 className="sec-title">What I <span>Do</span></h2>

        {/* Legend */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {[
            { cls: "sev-crit", label: "WORK — Primary responsibilities at Sophos" },
            { cls: "sev-high",  label: "WORK — Supporting responsibilities"        },
            { cls: "sev-med",   label: "PERSONAL — Lab / Learning project"         },
          ].map(l => (
            <span key={l.label} style={{ display: "flex", alignItems: "center", gap: ".4rem", fontFamily: "var(--font-mono)", fontSize: ".62rem", color: "var(--muted)" }}>
              <span className={`proj-sev ${l.cls}`} style={{ padding: ".12rem .4rem" }}>{l.cls === "sev-crit" ? "WORK" : l.cls === "sev-high" ? "WORK" : "PERSONAL"}</span>
              {l.label.split("—")[1]}
            </span>
          ))}
        </div>

        <div className="proj-grid">
          {PROJECTS.map(p => (
            <div key={p.name} className="proj-card">
              <div className="proj-head">
                <span className="proj-icon">{p.icon}</span>
                <span className={`proj-sev ${p.sevCls}`}>{p.sev}</span>
              </div>
              <p className="proj-name">{p.name}</p>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}