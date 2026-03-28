"use client";
import React, { useEffect, useState } from "react";

const LINES = [
  "xdr_hunt --tactic=TA0003 --platform=windows,macos,linux",
  "live_discover --query=credential_access --severity=critical",
  "incident_response --type=ransomware --containment=auto",
  "splunk --correlate=endpoint_telemetry --ioc=validate",
  "sophos_central --policy=dlp,amsi,ips,web_control --deploy=enterprise",
  "mitre_attack --map=ttp --phase=lateral_movement,persistence",
];

export default function HeroSection() {
  const [typed, setTyped] = useState("");
  const [si, setSi]       = useState(0);
  const [ci, setCi]       = useState(0);
  const [del, setDel]     = useState(false);

  useEffect(() => {
    const target = LINES[si];
    const delay  = del ? 36 : ci === target.length ? 1900 : 55;
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
            <p className="hero-eyebrow">&#47;&#47; TECHNICAL SUPPORT ENGINEER · ENDPOINT SECURITY · SOPHOS &#47;&#47;</p>

            <h1 className="hero-name">
              <span className="glitch" data-text="RUTVIK" style={{ display: "block", color: "var(--white)", fontFamily: "var(--font-hd)" }}>
                RUTVIK
              </span>
              <span style={{ display: "block", color: "var(--cyan)", fontFamily: "var(--font-hd)", fontWeight: 900 }}>
                CHAVDA
              </span>
            </h1>

            <p className="hero-role">
              Sophos Certified Architect &nbsp;·&nbsp; <em>EDR · XDR · Threat Hunting · Incident Response</em>
            </p>

            <div className="hero-term">
              <div><span className="t-prompt">rutvik@sophos:~$ </span>{typed}<span className="t-cur" /></div>
              <div style={{ marginTop: ".5rem", color: "rgba(0,255,157,.6)", fontSize: ".7rem", lineHeight: 1.7 }}>
                ✓ &nbsp;3+ yrs · P1/P2 Escalations · EMEA, APAC, Americas<br />
                ✓ &nbsp;Top 10 FY24 · Top 2 Community FY25 · Community Staff Spotlight<br />
                ✓ &nbsp;Open to: CrowdStrike · Microsoft · Palo Alto · Zscaler · MSSPs
              </div>
            </div>

            <div className="hero-actions">
              <a href="#contact" className="btn-p"><span>⟶ HIRE ME</span></a>
              <a href="#projects" className="btn-g">VIEW WORK →</a>
            </div>
          </div>

          {/* RIGHT — orbit */}
          <div className="hero-vis">
            <div className="orb-wrap">
              <div className="orb-ring orb-r1">
                <div className="orb-dot od1" /><div className="orb-dot od3" />
              </div>
              <div className="orb-ring orb-r2">
                <div className="orb-dot od2" /><div className="orb-dot od4" />
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
          { n: "3+",   l: "Years at Sophos"         },
          { n: "P1/P2",l: "Escalation Ownership"    },
          { n: "Top 2",l: "Community FY25 Globally" },
          { n: "5+",   l: "Sophos Certifications"   },
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