"use client";

import React, { useEffect, useState } from "react";

const COMMANDS = [
  "investigate --type=malware --platform=windows,macos,linux",
  "query --source=live_discover --focus=suspicious_process",
  "correlate --tool=splunk --logs=endpoint_telemetry",
  "triage --severity=p1 --workflow=incident_response",
  "map --framework=mitre_attack --use_case=threat_investigation",
];

const STATS = [
  { value: "3+ Years", label: "Endpoint Security Experience" },
  { value: "Sophos", label: "January 2023 – Present" },
  { value: "Windows · macOS · Linux", label: "Cross-Platform Support" },
  { value: "EDR/XDR · IR", label: "Core Focus Areas" },
];

export default function HeroSection() {
  const [typed, setTyped] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = COMMANDS[lineIndex];
    const delay = isDeleting ? 24 : charIndex === current.length ? 1200 : 44;

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setTyped(current.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else if (charIndex > 0) {
        setTyped(current.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setLineIndex((prev) => (prev + 1) % COMMANDS.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [lineIndex, charIndex, isDeleting]);

  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="section-kicker">RUTVIK CHAVDA</p>

          <h1 className="hero-title">
            Technical Support Engineer
            <span>
              Endpoint Security | EDR/XDR | Threat Investigation | Incident Response
            </span>
          </h1>

          <p className="hero-summary">
            Technical Support Engineer with strong endpoint security specialization
            and hands-on experience supporting enterprise customers, investigating
            endpoint threats, handling escalations, and validating remediation
            across Windows, macOS, and Linux environments.
          </p>

          <div className="hero-terminal card">
            <div className="terminal-bar">
              <span className="terminal-dot terminal-red" />
              <span className="terminal-dot terminal-yellow" />
              <span className="terminal-dot terminal-green" />
              <span className="terminal-label">live session / endpoint security</span>
            </div>

            <div className="terminal-line">
              <span className="terminal-prompt">rutvik@sophos:~$</span>
              <span className="terminal-command">{typed}</span>
              <span className="terminal-caret" />
            </div>

            <div className="terminal-tags">
              <span>Sophos Central</span>
              <span>Intercept X</span>
              <span>Live Discover</span>
              <span>Splunk</span>
              <span>Windows Event Logs</span>
              <span>Sysmon</span>
            </div>
          </div>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Contact Me
            </a>
            <a href="#experience" className="btn btn-secondary">
              View Experience
            </a>
          </div>
        </div>

        <div className="hero-panel card">
          <div className="hero-panel-head">
            <span className="status-dot" />
            <span>Current Positioning</span>
          </div>

          <div className="hero-focus-list">
            <div className="hero-focus-item">
              <h3>Technical Support + Security Depth</h3>
              <p>
                Enterprise-focused support work aligned to endpoint security,
                investigation quality, escalation handling, and structured
                troubleshooting.
              </p>
            </div>

            <div className="hero-focus-item">
              <h3>Threat Investigation</h3>
              <p>
                Malware and ransomware investigations, suspicious process
                analysis, remediation validation, and root cause analysis.
              </p>
            </div>

            <div className="hero-focus-item">
              <h3>Engineering Collaboration</h3>
              <p>
                Defect reproduction support, validation, escalation handoff, and
                technical documentation for repeatable investigation workflows.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container stat-grid">
        {STATS.map((item) => (
          <div key={item.label} className="stat-card card">
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
