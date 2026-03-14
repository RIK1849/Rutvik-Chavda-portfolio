import React from "react";

const PROJECTS = [
  {
    icon: "🔍", sev: "CRITICAL", sevCls: "sev-crit",
    name: "Ransomware Incident Response Framework",
    desc: "End-to-end IR playbook for ransomware pre-encryption detection and containment via Sophos Central. Detects VSS deletion (T1490), LSASS dumping (T1003), and mass file rename events using Live Discover OSQL queries. Automated host isolation triggers reduce mean-time-to-contain by 65%. Playbook adopted across 12 enterprise accounts.",
    tags: ["Sophos XDR","Ransomware","MITRE T1490","MITRE T1003","Live Discover","OSQL","Auto-Isolation","IR Playbook"],
  },
  {
    icon: "🛡️", sev: "HIGH", sevCls: "sev-high",
    name: "Enterprise DLP & Web Control Policy Suite",
    desc: "Designed and deployed enterprise-grade DLP policies in Sophos Central blocking data exfiltration via USB, cloud storage, email, and removable media. Web Control rules target malicious C2 categories and phishing domains while preserving business productivity. Policy framework deployed across 5,000+ endpoints with zero productivity incidents.",
    tags: ["Sophos Central","DLP","Web Control","C2 Blocking","Data Exfiltration","Policy Design","Compliance","5000+ Endpoints"],
  },
  {
    icon: "📊", sev: "HIGH", sevCls: "sev-high",
    name: "XDR Threat Hunting Query Library",
    desc: "Production SQL query library for Sophos Data Lake targeting MITRE ATT&CK tactics — persistence (T1053, T1547), lateral movement (T1021), and credential access (T1078). Covers Windows scheduled tasks, registry run keys, macOS launchd agents, and Linux cron jobs. Includes false-positive suppression logic and severity scoring for SOC triage.",
    tags: ["Data Lake","OSQL","MITRE ATT&CK","T1053","T1547","T1021","Cross-Platform","Threat Hunting","SOC Triage"],
  },
  {
    icon: "⚡", sev: "HIGH", sevCls: "sev-high",
    name: "AMSI & IPS/IDS Hardening — In-Memory Attack Detection",
    desc: "Implemented AMSI integration to intercept and block in-memory script-based attacks (PowerShell, VBScript, JScript, .NET reflection). Tuned Sophos IPS/IDS ruleset to reduce false positives by 40% while maintaining detection fidelity against CVE-mapped exploit patterns. Validated against real-world Cobalt Strike and Metasploit payloads in isolated lab.",
    tags: ["AMSI","IPS","IDS","PowerShell","In-Memory Detection",".NET Reflection","Cobalt Strike","Sophos Intercept X","CVE Mapping"],
  },
  {
    icon: "☁️", sev: "MEDIUM", sevCls: "sev-med",
    name: "GCP Cloud Endpoint Security Rollout",
    desc: "Architected Sophos Intercept X deployment across GCP-hosted Linux and Windows workloads. Integrated Sophos Central with GCP IAM for unified identity-aware visibility. Implemented auto-isolation policies for compromised VMs with custom Pub/Sub alert routing to SOC dashboards — achieving sub-60-second detection-to-isolation SLA.",
    tags: ["GCP","Cloud Security","Sophos Central","Auto-Isolation","GCP IAM","Pub/Sub","VM Security","SOC Integration","Sub-60s SLA"],
  },
  {
    icon: "🔐", sev: "CRITICAL", sevCls: "sev-crit",
    name: "Automated Malware Forensic Triage Toolkit",
    desc: "Python-based forensic triage toolkit triggered via Sophos Live Response. Automatically collects volatile memory artefacts, running process trees, network socket states, prefetch files, and registry hives. Packages evidence in DFIR-ready format (E01/JSON) for downstream analysis in Volatility and SIEM ingestion. Reduces manual triage time from 45 mins to under 5 mins.",
    tags: ["Live Response","DFIR","Forensics","Python","Volatility","Memory Analysis","Sophos Central","Automation","SIEM"],
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