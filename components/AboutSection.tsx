"use client";
import { useEffect, useRef, useState } from "react";

const CORE_SKILLS = [
  "EDR / XDR", "Sophos Intercept X", "Sophos Central",
  "Incident Response", "Threat Hunting", "Root Cause Analysis",
  "MITRE ATT&CK", "Live Discover", "Malware Analysis",
  "Windows Event Logs", "Sysmon", "PowerShell Scripting",
  "Splunk SIEM", "SQL Telemetry Queries", "Linux Forensics",
  "Ransomware Containment", "Attack Timeline Reconstruction", "AWS Cloud",
];

const QUICK_FACTS = [
  { icon: "◈", label: "Location",  value: "Ahmedabad, Gujarat, India" },
  { icon: "◈", label: "Role",      value: "Endpoint Security Engineer" },
  { icon: "◈", label: "Focus",     value: "EDR/XDR · Incident Response · Threat Hunting" },
  { icon: "◈", label: "Education", value: "B.Tech Computer Engineering, Ganpat University" },
  { icon: "◈", label: "Open To",   value: "Security Operations · Threat Detection · SOC" },
];

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="section"
      style={{ background: "rgba(0,0,0,0.6)", borderTop: "1px solid rgba(0,255,100,0.07)" }}
    >
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

          {/* Left */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-24px)",
            transition: "all 0.8s ease",
          }}>
            <p className="section-kicker">About Me</p>
            <h2 className="section-title" style={{ marginBottom: "1.6rem" }}>
              I break down threats,<br /><span>not just alerts</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 520 }}>
              <p style={{ color: "rgba(240,255,244,0.65)", lineHeight: 1.82, fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem" }}>
                I&apos;m Rutvik Chavda — an Endpoint Security Engineer who spent 3+ years at Sophos handling the most complex
                escalations enterprise customers throw at EDR/XDR platforms. My work lives in the gap between
                &quot;the alert fired&quot; and &quot;here&apos;s exactly what happened, why it happened, and how to stop it happening again.&quot;
              </p>
              <p style={{ color: "rgba(240,255,244,0.55)", lineHeight: 1.82, fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem" }}>
                I reconstruct attack timelines, trace lateral movement through Windows Event Logs and Sysmon telemetry,
                write Live Discover SQL queries to hunt across Sophos Data Lake, and collaborate directly with engineering
                on defect reproduction and fix validation. I don&apos;t just raise tickets — I own them end-to-end.
              </p>
              <p style={{ color: "rgba(240,255,244,0.55)", lineHeight: 1.82, fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem" }}>
                Outside casework I contribute to the global Sophos Staff Community — earning five recognition
                awards in CY25 including Top Contributor for the full year. I&apos;m actively seeking roles in
                Endpoint Security, Threat Detection, or Security Operations.
              </p>
            </div>

            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {QUICK_FACTS.map((f) => (
                <div key={f.label} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#00ff64", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", flexShrink: 0, marginTop: 3 }}>{f.icon}</span>
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", color: "rgba(0,255,100,0.55)", flexShrink: 0, width: 82, textTransform: "uppercase", letterSpacing: "0.08em" }}>{f.label}</span>
                  <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.9rem", color: "rgba(240,255,244,0.75)", fontWeight: 500 }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(24px)",
            transition: "all 0.8s ease 0.15s",
          }}>
            <div style={{
              background: "rgba(0,255,100,0.04)",
              border: "1px solid rgba(0,255,100,0.14)",
              borderRadius: 10,
              overflow: "hidden",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "0.7rem 1rem",
                borderBottom: "1px solid rgba(0,255,100,0.1)",
                background: "rgba(0,255,100,0.03)",
              }}>
                {["#ff5f56", "#ffbd2e", "#27c93f"].map((col, i) => (
                  <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: col, opacity: 0.8, display: "inline-block" }} />
                ))}
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: "rgba(0,255,100,0.5)", marginLeft: 8, letterSpacing: "0.1em" }}>
                  rutvik@sophos ~ core-competencies
                </span>
              </div>

              <div style={{ padding: "1.4rem 1.2rem" }}>
                <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", color: "rgba(0,255,100,0.45)", marginBottom: "1rem", letterSpacing: "0.08em" }}>
                  $ ls -la skills/
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {CORE_SKILLS.map((skill, i) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "'Share Tech Mono',monospace",
                        fontSize: "0.7rem", letterSpacing: "0.05em",
                        color: i % 3 === 0 ? "#00ff64" : i % 3 === 1 ? "rgba(0,229,255,0.85)" : "rgba(240,255,244,0.65)",
                        background: i % 3 === 0 ? "rgba(0,255,100,0.07)" : i % 3 === 1 ? "rgba(0,229,255,0.06)" : "rgba(240,255,244,0.04)",
                        border: `1px solid ${i % 3 === 0 ? "rgba(0,255,100,0.2)" : i % 3 === 1 ? "rgba(0,229,255,0.18)" : "rgba(240,255,244,0.1)"}`,
                        padding: "0.3rem 0.7rem",
                        borderRadius: 4,
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.4s ease ${0.05 * i}s`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: "rgba(0,255,100,0.35)", marginTop: "1.2rem", letterSpacing: "0.06em" }}>
                  {CORE_SKILLS.length} modules loaded — all battle-tested in production
                </p>
              </div>
            </div>

            <div style={{ marginTop: "1.4rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="https://www.linkedin.com/in/rutvikchavda-584b37197"
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: "0.72rem", letterSpacing: "0.1em",
                  color: "#00ff64", border: "1px solid rgba(0,255,100,0.32)",
                  padding: "0.5rem 1.2rem", borderRadius: 5,
                  textDecoration: "none", textTransform: "uppercase",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(0,255,100,0.08)"; el.style.borderColor = "rgba(0,255,100,0.6)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = "rgba(0,255,100,0.32)"; }}
              >
                ↗ LinkedIn
              </a>
              <a
                href="mailto:chavdarutvik1849@gmail.com"
                style={{
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: "0.72rem", letterSpacing: "0.1em",
                  color: "rgba(240,255,244,0.55)", border: "1px solid rgba(240,255,244,0.12)",
                  padding: "0.5rem 1.2rem", borderRadius: 5,
                  textDecoration: "none", textTransform: "uppercase",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(240,255,244,0.04)"; el.style.color = "rgba(240,255,244,0.85)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "rgba(240,255,244,0.55)"; }}
              >
                ↗ Email Me
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}