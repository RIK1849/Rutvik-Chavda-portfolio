import React from "react";

const PROJECTS = [
  {
    icon: "🔍", sev: "CRITICAL", sevCls: "sev-crit",
    name: "Ransomware Incident Response & Containment",
    desc: "Led end-to-end P1 ransomware IR engagements for enterprise customers — triaging EDR/XDR telemetry, reconstructing attack timelines via process tree and registry analysis, validating containment actions, and driving remediation verification. Used Live Discover OSQL to hunt VSS deletion (T1490), LSASS access (T1003), and lateral movement patterns. Delivered customer-facing incident reports with root cause, IOCs, and hardening recommendations.",
    tags: ["Sophos XDR", "Ransomware IR", "Live Discover", "OSQL", "MITRE T1490", "MITRE T1003", "Containment", "RCA"],
  },
  {
    icon: "📊", sev: "HIGH", sevCls: "sev-high",
    name: "XDR Threat Hunting Query Library (Data Lake)",
    desc: "Built and maintained a production SQL/OSQL query library for the Sophos Data Lake targeting MITRE ATT&CK tactics — persistence (T1053, T1547), lateral movement (T1021), credential access (T1078), and defence evasion. Covers Windows scheduled tasks, registry run keys, macOS launchd agents, and Linux cron jobs. Includes false-positive suppression logic and severity-scoring to streamline SOC triage and reduce analyst noise.",
    tags: ["Data Lake", "OSQL", "SQL", "MITRE ATT&CK", "T1053", "T1547", "T1021", "Threat Hunting", "FP Tuning"],
  },
  {
    icon: "🛡️", sev: "HIGH", sevCls: "sev-high",
    name: "Enterprise Sophos Central Policy Architecture",
    desc: "Designed and deployed enterprise-grade Sophos Central security policies for large cloud, hybrid (Azure), and on-premise environments — covering web control, application control, device encryption, DLP, and endpoint protection settings. Balanced security coverage with operational stability, reducing policy-driven false positives across 5,000+ endpoints while maintaining detection fidelity.",
    tags: ["Sophos Central", "DLP", "Web Control", "App Control", "Device Encryption", "Azure", "Policy Design", "5000+ Endpoints"],
  },
  {
    icon: "⚡", sev: "HIGH", sevCls: "sev-high",
    name: "AMSI & IPS/IDS Tuning — In-Memory Attack Detection",
    desc: "Tuned Sophos AMSI integration to intercept and block in-memory script-based attacks (PowerShell, VBScript, .NET reflection). Refined IPS/IDS rulesets to reduce false positives while maintaining detection fidelity against CVE-mapped exploit patterns. Validated configurations against real-world payloads in isolated lab environments, documenting reproduction steps for Engineering escalation.",
    tags: ["AMSI", "IPS", "IDS", "PowerShell", "In-Memory Detection", ".NET Reflection", "CVE Mapping", "Lab Validation"],
  },
  {
    icon: "🔬", sev: "HIGH", sevCls: "sev-high",
    name: "Defect Reproduction Lab & Engineering Escalation",
    desc: "Built and maintained dedicated lab environments across Windows, macOS, and Linux to reproduce complex customer defects — covering agent behaviour, policy conflicts, performance regressions, and update compatibility issues across cloud, hybrid, and on-premise configurations. Authored structured reproduction cases, test steps, and validation tests fed directly into Sophos Engineering bug-fix cycles to accelerate resolution and prevent regressions.",
    tags: ["Lab Environments", "Defect Reproduction", "Windows", "macOS", "Linux", "Engineering Escalation", "QA Validation"],
  },
  {
    icon: "📝", sev: "MEDIUM", sevCls: "sev-med",
    name: "KB Articles, Runbooks & Investigation Playbooks",
    desc: "Authored a library of internal knowledge base articles, troubleshooting runbooks, and investigation playbooks covering common endpoint, policy, and security incident scenarios. Content directly reduced repeat escalations, improved analyst consistency across the team, and raised measurable case quality scores — contributing to the Sophos Support Team Top 10 FY24 and Top 2 Community Staff FY25 recognitions.",
    tags: ["Knowledge Base", "Runbooks", "Playbooks", "Technical Documentation", "Case Quality", "Analyst Enablement"],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="sec-label">PROJECTS & WORK</p>
        <h2 className="sec-title">Security <span>Work</span></h2>
        <div className="proj-grid">
          {PROJECTS.map(p => (
            <div key={p.name} className="proj-card">
              <div className="proj-head">
                <span className="proj-icon">{p.icon}</span>
                <span className={`proj-sev ${p.sevCls}`}>{p.sev}</span>
              </div>
              <p className="proj-name">{p.name}</p>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}