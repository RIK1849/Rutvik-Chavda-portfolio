import React from "react";

const PROJECTS = [
  {
    icon: "🔍", sev: "CRITICAL", sevCls: "sev-crit",
    name: "Ransomware Incident Response Framework",
    desc: "End-to-end IR playbook for ransomware containment using Sophos Central. Covers pre-encryption detection via shadow copy deletion monitoring, LSASS access anomalies, and mass file rename events. Reduced mean-time-to-contain by 65% for enterprise clients.",
    tags: ["Sophos XDR","Ransomware","MITRE T1490","Live Discover","OSQL","IR Playbook"],
  },
  {
    icon: "🛡️", sev: "HIGH", sevCls: "sev-high",
    name: "DLP & Web Control Policy Suite",
    desc: "Designed and deployed enterprise-grade DLP policies in Sophos Central preventing data exfiltration via USB, cloud storage, and email. Web Control rules tuned to block malicious C2 categories while maintaining business productivity.",
    tags: ["Sophos Central","DLP","Web Control","Data Exfiltration","Policy Design","Compliance"],
  },
  {
    icon: "📊", sev: "MEDIUM", sevCls: "sev-med",
    name: "XDR Threat Hunting Query Library",
    desc: "SQL-based hunting query suite for Sophos Data Lake targeting persistence mechanisms — scheduled tasks, registry run keys, launchd agents — with cross-platform coverage (Windows/macOS/Linux) and false-positive suppression.",
    tags: ["Data Lake","SQL","Persistence","MITRE T1053","Cross-Platform","Threat Hunting"],
  },
  {
    icon: "⚡", sev: "HIGH", sevCls: "sev-high",
    name: "AMSI & IPS/IDS Hardening Project",
    desc: "Configured AMSI integration to detect in-memory script-based attacks (PowerShell, VBScript, JScript). Tuned IPS/IDS rules to reduce false positives by 40% while maintaining detection fidelity against known exploit patterns.",
    tags: ["AMSI","IPS","IDS","PowerShell","In-Memory Detection","Sophos Intercept X"],
  },
  {
    icon: "☁️", sev: "MEDIUM", sevCls: "sev-med",
    name: "GCP Cloud Endpoint Security Rollout",
    desc: "Architected Sophos Intercept X deployment across GCP-hosted workloads. Integrated with Sophos Central for unified visibility, auto-isolation policies for compromised VMs, and custom alert routing to SOC dashboards.",
    tags: ["GCP","Cloud Security","Sophos Central","Auto-Isolation","VM Security","SOC Integration"],
  },
  {
    icon: "🔐", sev: "CRITICAL", sevCls: "sev-crit",
    name: "Malware Outbreak Containment Toolkit",
    desc: "Scripted automated forensic triage and containment workflow triggered via Sophos Live Response. Collects memory artefacts, running processes, network connections, and prefetch data — packages evidence for DFIR analysis.",
    tags: ["Live Response","DFIR","Forensics","Malware Analysis","Sophos Central","Automation"],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="sec-label">PROJECTS</p>
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
