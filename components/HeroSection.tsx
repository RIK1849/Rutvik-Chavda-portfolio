"use client";
import React, { useEffect, useState } from "react";

const LINES = [
  "xdr_hunt --tactic=TA0003 --platform=windows,macos,linux",
  "live_discover --query=credential_access --severity=critical",
  "incident_response --type=ransomware --containment=auto",
  "threat_intel --ioc=c2_domains --correlate=data_lake",
  "sophos_central --policy=dlp,amsi,ips --deploy=enterprise",
];

export default function HeroSection() {
  const [typed, setTyped]   = useState("");
  const [si, setSi]         = useState(0);
  const [ci, setCi]         = useState(0);
  const [del, setDel]       = useState(false);

  useEffect(() => {
    const target = LINES[si];
    const delay  = del ? 38 : ci === target.length ? 1900 : 58;
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
            <p className="hero-eyebrow">&#47;&#47; ENDPOINT SECURITY ENGINEER &#47;&#47; SOPHOS</p>

            <h1 className="hero-name">
              <span className="glitch" data-text="RUTVIK" style={{ display:"block", color:"var(--white)", fontFamily:"var(--font-hd)" }}>
                RUTVIK
              </span>
              <span style={{ display:"block", color:"var(--cyan)", fontFamily:"var(--font-hd)", fontWeight:900 }}>
                CHAVDA
              </span>
            </h1>

            <p className="hero-role">
              Sophos Certified Engineer &nbsp;·&nbsp; <em>EDR · XDR · MDR · Threat Hunting</em>
            </p>

            <div className="hero-term">
              <div><span className="t-prompt">rutvik@sophos:~$ </span>{typed}<span className="t-cur" /></div>
              <div style={{ marginTop:".4rem", color:"rgba(0,255,157,.55)", fontSize:".7rem" }}>
                ✓ &nbsp;3+ yrs defending enterprise endpoints · Open to CrowdStrike · Zscaler · Microsoft · Palo Alto
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

      {/* STATS */}
      <div className="hero-stats" style={{ padding:"0 2rem" }}>
        {[
          { n:"3+",    l:"Years at Sophos"        },
          { n:"500+",  l:"Incidents Resolved"      },
          { n:"1000+", l:"Endpoints Protected"     },
          { n:"3",     l:"Sophos Certifications"   },
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