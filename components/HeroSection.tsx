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
  const [si, setSi]       = useState(0);
  const [ci, setCi]       = useState(0);
  const [del, setDel]     = useState(false);

  useEffect(() => {
    const target = LINES[si];
    const delay  = del ? 36 : ci === target.length ? 2000 : 55;
    const t = setTimeout(() => {
      if (!del) {
        if (ci < target.length) { setTyped(target.slice(0, ci + 1)); setCi(ci + 1); }
        else setDel(true);
      } else {
        if (ci > 0) { setTyped(target.slice(0, ci - 1)); setCi(ci - 1); }
        else { setDel(false); setSi((si + 1) % LINES.length); }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [typed, si, ci, del]);

  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-inner">

          {/* LEFT */}
          <div>
            <p className="hero-eyebrow">// TECHNICAL SUPPORT ENGINEER · ENDPOINT SECURITY · SOPHOS</p>

            <h1 className="hero-name">
              <span
                className="glitch"
                data-text="RUTVIK"
                style={{ display: "block", color: "var(--white)", fontFamily: "var(--font-hd)" }}
              >
                RUTVIK
              </span>
              <span style={{ display: "block", color: "var(--cyan)", fontFamily: "var(--font-hd)", fontWeight: 900 }}>
                CHAVDA
              </span>
            </h1>

            <p className="hero-role">
              Endpoint Security &nbsp;·&nbsp; <em>EDR/XDR · Threat Investigation · Incident Response</em>
            </p>

            <div className="hero-term">
              <div>
                <span className="t-prompt">rutvik@sophos:~$ </span>
                {typed}
                <span className="t-cur" />
              </div>
              <div style={{ marginTop: ".55rem", color: "rgba(0,255,157,.55)", fontSize: ".7rem", lineHeight: 1.8 }}>
                ✓ &nbsp;3+ years · Sophos · P1/P2 Escalations · EMEA, APAC, Americas<br />
                ✓ &nbsp;Top 10 FY24 · Top 2 Community Contributor FY25 · Staff Spotlight<br />
                ✓ &nbsp;Open to: Security Engineer · Threat Analyst · SOC · IR roles
              </div>
            </div>

            <div className="hero-actions">
              <a href="#contact" className="btn-p"><span>⟶ GET IN TOUCH</span></a>
              <a href="#experience" className="btn-g">VIEW EXPERIENCE →</a>
            </div>
          </div>

          {/* RIGHT — orbit visual */}
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

      {/* STATS BAR */}
      <div className="hero-stats" style={{ padding: "0 2rem" }}>
        {[
          { n: "3+",    l: "Years at Sophos"            },
          { n: "P1/P2", l: "Escalation Ownership"       },
          { n: "Top 2", l: "Community Contributor FY25" },
          { n: "4+",    l: "Sophos Certifications"      },
        ].map(s => (
          <div key={s.l} className="hstat">
            <span className="hstat-n">{s.n}</span>
            <span className="hstat-l">{s.l}</span>
          </div>
        ))}
      </div>
    </>
  );
}