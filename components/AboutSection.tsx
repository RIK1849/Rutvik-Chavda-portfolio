"use client";
import { useEffect, useRef, useState } from "react";

const CORE_SKILLS = [
  "L2/L3 Support","Incident Management","Sophos EDR/XDR",
  "Splunk & SIEM","Root Cause Analysis","Live Discover (SQL)",
  "Windows Event Logs","Linux & macOS","Network Protocols",
  "MITRE ATT&CK","REST APIs / JSON","PowerShell & Python",
];

const QUICK_FACTS = [
  { label: "LOCATION",  value: "Ahmedabad, Gujarat, India" },
  { label: "ROLE",      value: "Technical Support Engineer — Endpoint Security" },
  { label: "FOCUS",     value: "EDR/XDR · Incident Response · Threat Hunting" },
  { label: "EDUCATION", value: "B.Tech Computer Engineering — Ganpat University" },
  { label: "OPEN TO",   value: "L2/L3 Security · SOC · Threat Detection Roles" },
];

const THREAT_FEED = [
  { time: "00:01", event: "BLOCK",  src: "91.215.4.17",    detail: "RU-11 · XDR",    severity: "red"   },
  { time: "00:04", event: "ALERT",  src: "RANSOMWARE",     detail: "CONTAINED",       severity: "amber" },
  { time: "00:07", event: "DETECT", src: "LATERAL-MOV",    detail: "SG-02 · XDR",    severity: "red"   },
  { time: "00:11", event: "BLOCK",  src: "178.93.12.4",    detail: "UK-04 · EDR",    severity: "red"   },
  { time: "00:14", event: "SYNC",   src: "POLICY-V9",      detail: "OK",              severity: "green" },
  { time: "00:18", event: "SCAN",   src: "LIVE-DISCOVER",  detail: "COMPLETE",        severity: "green" },
  { time: "00:22", event: "HUNT",   src: "THREAT-HUNT-03", detail: "IN PROGRESS",     severity: "amber" },
];

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const [feedIdx, setFeedIdx] = useState(0);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); setTimeout(() => setSkillsVisible(true), 400); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setFeedIdx(i => (i + 1) % THREAT_FEED.length), 2200);
    return () => clearInterval(interval);
  }, []);

  const sevColor = (s: string) =>
    s === "red" ? "#ff2244" : s === "amber" ? "#fbbf24" : "#00ff64";

  return (
    <section ref={ref} id="about" className="section" style={{ borderTop: "1px solid rgba(0,255,100,0.07)" }}>
      <div className="container">
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

          {/* ── Left: Bio ── */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-24px)", transition: "all 0.8s ease" }}>
            <p className="section-kicker">About Me</p>
            <h2 className="section-title" style={{ marginBottom: "1.6rem" }}>
              I break down threats,<br /><span>not just alerts</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", maxWidth: 520 }}>
              {[
                "I'm Rutvik Chavda — a Technical Support Engineer specializing in Endpoint Security, with 3+ years handling complex P1/P2 escalations for enterprise customers. My work lives in the gap between an alert firing and delivering a definitive root cause analysis.",
                "I reconstruct attack timelines using Splunk and SIEM correlation, trace lateral movement through Windows Event Logs and Sysmon telemetry, and write Live Discover SQL queries to hunt across data lakes. I collaborate directly with engineering on defect reproduction — I don't just raise tickets, I own them end-to-end.",
                "Beyond casework, I am a recognised Top 10 Support Engineer globally at Sophos (FY25) and have earned six Sophos recognition awards including the Global Support Services Excellence Award and Top Community Contributor across CY25.",
              ].map((text, i) => (
                <p key={i} style={{
                  color: i === 0 ? "rgba(240,255,244,0.75)" : "rgba(240,255,244,0.55)",
                  lineHeight: 1.82, fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(10px)",
                  transition: `all 0.7s ease ${0.1 + i * 0.12}s`,
                }}>{text}</p>
              ))}
            </div>

            {/* Facts */}
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {QUICK_FACTS.map((f, i) => (
                <div key={f.label} style={{
                  display: "flex", gap: "0.9rem", alignItems: "flex-start",
                  padding: "0.5rem 0.8rem",
                  borderRadius: 6,
                  border: "1px solid transparent",
                  opacity: visible ? 1 : 0,
                  transition: `all 0.5s ease ${0.3 + i * 0.08}s`,
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,100,0.15)"; (e.currentTarget as HTMLElement).style.background = "rgba(0,255,100,0.03)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "transparent"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(0,255,100,0.5)", flexShrink: 0, width: 90, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{f.label}</span>
                  <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.9rem", color: "rgba(240,255,244,0.82)", fontWeight: 500 }}>{f.value}</span>
                </div>
              ))}
            </div>

            {/* Links */}
            <div style={{ marginTop: "2rem", display: "flex", gap: "0.9rem", flexWrap: "wrap", opacity: visible ? 1 : 0, transition: "all 0.6s ease 0.5s" }}>
              {[
                { label: "↗ LinkedIn", href: "https://www.linkedin.com/in/rutvik-chavda-584b37197", primary: true },
                { label: "↗ Email Me", href: "mailto:chavdarutvik1849@gmail.com", primary: false },
              ].map(l => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", letterSpacing: "0.1em",
                    color: l.primary ? "#00ff64" : "rgba(240,255,244,0.55)",
                    border: `1px solid ${l.primary ? "rgba(0,255,100,0.35)" : "rgba(240,255,244,0.15)"}`,
                    padding: "0.55rem 1.3rem", borderRadius: 5,
                    textDecoration: "none", textTransform: "uppercase",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = l.primary ? "rgba(0,255,100,0.08)" : "rgba(240,255,244,0.04)"; el.style.borderColor = l.primary ? "rgba(0,255,100,0.6)" : "rgba(240,255,244,0.3)"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = l.primary ? "rgba(0,255,100,0.35)" : "rgba(240,255,244,0.15)"; el.style.transform = "translateY(0)"; }}
                >{l.label}</a>
              ))}
            </div>
          </div>

          {/* ── Right: Terminal + Live Feed ── */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(24px)", transition: "all 0.8s ease 0.15s", display: "flex", flexDirection: "column", gap: "1.2rem" }}>

            {/* Terminal: skills */}
            <div style={{
              background: "rgba(0,8,4,0.88)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,255,100,0.18)", borderRadius: 12, overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,100,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.65rem 1rem", borderBottom: "1px solid rgba(0,255,100,0.1)", background: "rgba(0,255,100,0.025)" }}>
                {["#ff5f56","#ffbd2e","#27c93f"].map((col, i) => (
                  <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: col, opacity: 0.85, display: "inline-block" }} />
                ))}
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(0,255,100,0.5)", marginLeft: 8, letterSpacing: "0.1em" }}>
                  rutvik@sophos:~ $ cat core-competencies.txt
                </span>
              </div>
              <div style={{ padding: "1.4rem 1.2rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                  {CORE_SKILLS.map((skill, i) => (
                    <span key={skill} style={{
                      fontFamily: "'Share Tech Mono',monospace",
                      fontSize: "0.7rem", letterSpacing: "0.04em",
                      color: i % 3 === 0 ? "#00ff64" : i % 3 === 1 ? "rgba(0,229,255,0.9)" : "rgba(240,255,244,0.65)",
                      background: i % 3 === 0 ? "rgba(0,255,100,0.07)" : i % 3 === 1 ? "rgba(0,229,255,0.05)" : "rgba(240,255,244,0.03)",
                      border: `1px solid ${i % 3 === 0 ? "rgba(0,255,100,0.2)" : i % 3 === 1 ? "rgba(0,229,255,0.18)" : "rgba(240,255,244,0.1)"}`,
                      padding: "0.28rem 0.72rem", borderRadius: 4,
                      opacity: skillsVisible ? 1 : 0,
                      transform: skillsVisible ? "none" : "scale(0.9)",
                      transition: `all 0.35s ease ${0.04 * i}s`,
                    }}>{skill}</span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(0,255,100,0.3)", marginTop: "1rem", letterSpacing: "0.06em" }}>
                  {CORE_SKILLS.length} modules loaded — all production-tested ▌
                </p>
              </div>
            </div>

            {/* Live threat feed */}
            <div style={{
              background: "rgba(0,8,4,0.88)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,34,68,0.2)", borderRadius: 12, overflow: "hidden",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 1rem", borderBottom: "1px solid rgba(255,34,68,0.12)", background: "rgba(255,34,68,0.03)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff2244", animation: "pulse 0.9s ease infinite", display: "inline-block" }} />
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(255,34,68,0.8)", letterSpacing: "0.1em" }}>LIVE THREAT FEED</span>
                </div>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(0,255,100,0.4)", letterSpacing: "0.08em" }}>SOPHOS XDR</span>
              </div>
              <div style={{ padding: "0.8rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {THREAT_FEED.map((item, i) => {
                  const isActive = i === feedIdx;
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "0.7rem",
                      padding: "0.4rem 0.6rem", borderRadius: 5,
                      background: isActive ? `${sevColor(item.severity)}0a` : "transparent",
                      border: `1px solid ${isActive ? sevColor(item.severity) + "28" : "transparent"}`,
                      transition: "all 0.3s ease",
                      opacity: isActive ? 1 : 0.4,
                    }}>
                      <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: "rgba(240,255,244,0.3)", flexShrink: 0 }}>{item.time}</span>
                      <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: sevColor(item.severity), fontWeight: 700, width: 58, flexShrink: 0 }}>{item.event}</span>
                      <span style={{ fontFamily: "'Rajdhani',monospace", fontSize: "0.78rem", color: "rgba(240,255,244,0.7)", flex: 1 }}>{item.src}</span>
                      <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: sevColor(item.severity), opacity: 0.7 }}>{item.detail}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
      `}</style>
    </section>
  );
}
