// ═══════════════════════════════════════════════════════
//  ProjectsSection.tsx
// ═══════════════════════════════════════════════════════
"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "Ransomware Attack Timeline Reconstructor",
    tags: ["XDR","Live Discover","SQL"],
    color: "#00ff64",
    description:
      "Structured investigation methodology for reconstructing full ransomware attack timelines using Sophos Live Discover SQL queries against the Data Lake. Covers initial access vector, persistence mechanisms, lateral movement, encryption trigger, and exfiltration — correlated against Windows Event Logs and Sophos telemetry.",
    outcome: "Used across 50+ real incident investigations at Sophos. Reduced mean time to containment via clear query templates for each attack phase.",
    tech: ["Sophos Live Discover","SQL / XDR Queries","Windows Event Logs","Data Lake","MITRE ATT&CK"],
  },
  {
    id: "02",
    title: "Endpoint Diagnostic Triage Framework",
    tags: ["PowerShell","Automation","Forensics"],
    color: "#38bdf8",
    description:
      "PowerShell-based triage automation framework that collects critical endpoint forensic artefacts — running processes, network connections, registry run keys, scheduled tasks, recently modified files, and Sophos diagnostic output — into a structured bundle for rapid L2/L3 analysis.",
    outcome: "Cut initial triage time on escalated cases from 45+ minutes to under 10 minutes. Adopted as internal reference for diagnostic collection.",
    tech: ["PowerShell","Windows Forensics","Registry Analysis","Process Enum","Sophos Diagnostics"],
  },
  {
    id: "03",
    title: "Sysmon Config Hardening Playbook",
    tags: ["Sysmon","Windows","Blue Team"],
    color: "#f472b6",
    description:
      "Sysmon configuration hardening playbook for enterprise environments, aligned to SwiftOnSecurity base config and extended for Sophos Intercept X co-existence. Covers event ID selection, exclusion strategies to reduce noise, and detection logic for common MITRE ATT&CK techniques visible in Sysmon telemetry.",
    outcome: "Contributed to internal Sophos knowledge base. Referenced by community members for Sysmon deployment in enterprise Windows environments.",
    tech: ["Sysmon","XML Config","MITRE ATT&CK","WEF","Threat Detection"],
  },
  {
    id: "04",
    title: "Sophos Community Technical Knowledge Base",
    tags: ["Technical Writing","Community"],
    color: "#fb923c",
    description:
      "Authored 100+ detailed technical articles, troubleshooting guides, and investigation walkthroughs for the global Sophos Staff Community covering Intercept X policy tuning, Live Discover query patterns, false-positive root causes, macOS and Linux endpoint behaviour, and escalation decision frameworks.",
    outcome: "Recognised as Top Community Contributor for CY25-Q2, Q3, Q4, and CY25 Overall — earning global recognition for technical depth and consistency.",
    tech: ["Sophos Central","Intercept X","Technical Docs","Knowledge Mgmt","Community"],
  },
];

export default function ProjectsSection() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="projects" className="section" style={{ borderTop: "1px solid rgba(0,255,100,0.06)" }}>
      <div className="container">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "all 0.7s ease" }}>
          <p className="section-kicker">Projects & Work</p>
          <h2 className="section-title">What I&apos;ve <span>actually built</span></h2>
          <p className="section-copy">
            Real investigations, real tools, real contributions — not side-project demos.
            These came out of production incidents and enterprise security operations.
          </p>
        </div>

        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(440px, 1fr))", gap: "1.4rem" }}>
          {PROJECTS.map((proj, i) => (
            <div
              key={proj.id}
              className="card holo-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(22px)",
                transition: `all 0.7s ease ${i * 0.1}s`,
                borderColor: hovered === proj.id ? proj.color + "40" : undefined,
                boxShadow: hovered === proj.id ? `0 0 40px ${proj.color}12, 0 20px 60px rgba(0,0,0,0.4)` : undefined,
              }}
              onMouseEnter={() => setHovered(proj.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${proj.color}, transparent)`, opacity: hovered === proj.id ? 0.8 : 0.3, transition: "opacity 0.3s" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", gap: "0.8rem" }}>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: proj.color, opacity: 0.6, letterSpacing: "0.08em", fontWeight: 700 }}>◈ {proj.id}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.32rem", justifyContent: "flex-end" }}>
                  {proj.tags.map(tag => (
                    <span key={tag} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", padding: "2px 7px", borderRadius: 3, border: `1px solid ${proj.color}28`, color: proj.color, opacity: 0.8 }}>{tag}</span>
                  ))}
                </div>
              </div>
              <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.08rem", fontWeight: 700, color: "#f0fff4", lineHeight: 1.35, marginBottom: "0.9rem" }}>{proj.title}</h3>
              <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.9rem", color: "rgba(240,255,244,0.58)", lineHeight: 1.7, marginBottom: "1rem" }}>{proj.description}</p>
              <div style={{ background: `${proj.color}08`, border: `1px solid ${proj.color}1a`, borderRadius: 8, padding: "0.75rem 1rem", marginBottom: "1.1rem" }}>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: proj.color, opacity: 0.75, letterSpacing: "0.1em", display: "block", marginBottom: 5, fontWeight: 700 }}>▸ OUTCOME</span>
                <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.86rem", color: "rgba(240,255,244,0.7)", lineHeight: 1.58 }}>{proj.outcome}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.32rem" }}>
                {proj.tech.map(t => (
                  <span key={t} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", padding: "2px 8px", borderRadius: 999, background: "rgba(240,255,244,0.03)", border: "1px solid rgba(240,255,244,0.1)", color: "rgba(240,255,244,0.48)" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 920px) { .proj-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}