"use client";

import React, { useEffect, useState } from "react";

const LINES = [
  "investigate --type=malware --platform=windows,macos,linux",
  "live_discover --query=suspicious_process --correlate=sysmon",
  "splunk --search=endpoint_telemetry --validate=ioc_ioa",
  "incident_response --severity=P1 --phase=triage,containment",
  "sophos_central --policy=web_control,app_control,device_encryption",
  "mitre_attack --map=ttp --tactic=persistence,credential_access",
];

export default function HeroSection() {
  const [typed, setTyped] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const target = LINES[lineIndex];
    const delay = isDeleting ? 32 : charIndex === target.length ? 1800 : 48;

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < target.length) {
          setTyped(target.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setTyped(target.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setLineIndex((prev) => (prev + 1) % LINES.length);
        }
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [lineIndex, charIndex, isDeleting]);

  return (
    <>
      <section id="hero" className="hero">
        <div className="container hero-inner">
          <div>
            <p className="hero-eyebrow">
              {"// TECHNICAL SUPPORT ENGINEER · ENDPOINT SECURITY · SOPHOS"}
            </p>

            <h1 className="hero-name">
              <span
                className="glitch"
                data-text="RUTVIK"
                style={{
                  display: "block",
                  color: "var(--white)",
                  fontFamily: "var(--font-hd)",
                }}
              >
                RUTVIK
              </span>
              <span
                style={{
                  display: "block",
                  color: "var(--cyan)",
                  fontFamily: "var(--font-hd)",
                  fontWeight: 900,
                }}
              >
                CHAVDA
              </span>
            </h1>

            <p className="hero-role">
              Endpoint Security &nbsp;·&nbsp;
              <em>EDR/XDR · Threat Investigation · Incident Response</em>
            </p>

            <div className="hero-term">
              <div>
                <span className="t-prompt">rutvik@sophos:~$ </span>
                {typed}
                <span className="t-cur" />
              </div>

              <div
                style={{
                  marginTop: ".6rem",
                  color: "rgba(0,255,157,.58)",
                  fontSize: ".72rem",
                  lineHeight: 1.8,
                }}
              >
                ✓ &nbsp;3+ years · Sophos · P1/P2 Escalations · EMEA, APAC,
                Americas
                <br />
                ✓ &nbsp;Top 10 FY24 · Top 2 Community Contributor FY25 · Staff
                Spotlight
                <br />
                ✓ &nbsp;Open to: Security Engineer · Threat Analyst · SOC · IR
                roles
              </div>
            </div>

            <div className="hero-actions">
              <a href="#contact" className="btn-p">
                <span>⟶ GET IN TOUCH</span>
              </a>
              <a href="#experience" className="btn-g">
                VIEW EXPERIENCE →
              </a>
            </div>
          </div>

          <div className="hero-vis">
            <div className="orb-wrap">
              <div className="orb-ring orb-r1">
                <div className="orb-dot od1" />
                <div className="orb-dot od3" />
              </div>
              <div className="orb-ring orb-r2">
                <div className="orb-dot od2" />
                <div className="orb-dot od4" />
              </div>
              <div className="orb-ring orb-r3" />
              <div className="orb-core">
                <span className="orb-icon">🛡️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hero-stats" style={{ padding: "0 2rem" }}>
        {[
          { n: "3+", l: "Years at Sophos" },
          { n: "P1/P2", l: "Escalation Ownership" },
          { n: "Top 2", l: "Community Contributor FY25" },
          { n: "4+", l: "Sophos Certifications" },
        ].map((item) => (
          <div key={item.l} className="hstat">
            <span className="hstat-n">{item.n}</span>
            <span className="hstat-l">{item.l}</span>
          </div>
        ))}
      </div>
    </>
  );
}