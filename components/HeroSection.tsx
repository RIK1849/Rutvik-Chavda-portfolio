"use client";
import { useEffect, useRef, useState } from "react";

const TYPED_STRINGS = [
  "Endpoint Security Engineer",
  "EDR / XDR Specialist",
  "Incident Response Lead",
  "Threat Hunter",
  "Sophos Intercept X Expert",
];

const METRICS = [
  { value: "3+",   label: "Years at Sophos"       },
  { value: "500+", label: "Enterprise Cases Owned" },
  { value: "5",    label: "Global Awards CY25"     },
  { value: "Top 10", label: "Engineer Globally FY25" },
];

export default function HeroSection() {
  const [typed,      setTyped]      = useState("");
  const [strIdx,     setStrIdx]     = useState(0);
  const [charIdx,    setCharIdx]    = useState(0);
  const [deleting,   setDeleting]   = useState(false);
  const [visible,    setVisible]    = useState(false);
  const [glitching,  setGlitching]  = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Typewriter
  useEffect(() => {
    const current = TYPED_STRINGS[strIdx];
    const delay   = deleting ? 42 : charIdx === current.length ? 1800 : 68;

    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setTyped(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setTyped(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setStrIdx((s) => (s + 1) % TYPED_STRINGS.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [typed, strIdx, charIdx, deleting]);

  // Fade in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Glitch interval
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 400);
    }, 7000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 clamp(1.4rem, 7vw, 5rem)",
        position: "relative",
        zIndex: 10,
        paddingTop: 80,
      }}
    >
      {/* Pre-title terminal line */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(12px)",
          transition: "all 0.7s ease 0.1s",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.72rem",
          color: "rgba(0,255,100,0.6)",
          letterSpacing: "0.18em",
          marginBottom: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
        }}
      >
        <span style={{ color:"#00ff64" }}>▶</span>
        AHMEDABAD, INDIA — ENDPOINT SECURITY ENGINEER
        <span style={{ display:"inline-block", width:6, height:12, background:"#00ff64", verticalAlign:"middle", animation:"pulse 1.2s ease infinite" }} />
      </div>

      {/* Main name / glitch title */}
      <h1
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
          fontWeight: 900,
          letterSpacing: "-0.01em",
          lineHeight: 1.0,
          marginBottom: "1.4rem",
          position: "relative",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.8s ease 0.25s",
          maxWidth: 780,
        }}
      >
        <span style={{ color: "#f0fff4" }}>Rutvik</span>
        {" "}
        <span style={{ color: "#00ff64", position: "relative" }}>
          Chavda
          {glitching && (
            <>
              <span style={{
                position:"absolute", left:0, top:0, color:"#00e5ff",
                animation:"glitch1 0.35s steps(1) forwards",
                pointerEvents:"none", whiteSpace:"nowrap",
              }}>Chavda</span>
              <span style={{
                position:"absolute", left:0, top:0, color:"#ff2244",
                animation:"glitch2 0.35s steps(1) forwards",
                pointerEvents:"none", whiteSpace:"nowrap",
              }}>Chavda</span>
            </>
          )}
        </span>
      </h1>

      {/* Typewriter role */}
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
          color: "#00ff64",
          marginBottom: "2rem",
          minHeight: "2rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.4s",
        }}
      >
        <span>{typed}</span>
        <span style={{
          display:"inline-block", width:3, height:"1.1em",
          background:"#00ff64", verticalAlign:"middle",
          marginLeft:3, animation:"pulse 1s ease infinite",
        }} />
      </div>

      {/* ATS-rich summary */}
      <p
        style={{
          maxWidth: 620,
          fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
          color: "rgba(240,255,244,0.62)",
          lineHeight: 1.78,
          marginBottom: "2.8rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(12px)",
          transition: "all 0.8s ease 0.55s",
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 400,
        }}
      >
        L2/L3 Endpoint Security Engineer with 3+ years at Sophos, specialising in{" "}
        <strong style={{color:"#f0fff4",fontWeight:600}}>EDR/XDR</strong>,{" "}
        <strong style={{color:"#f0fff4",fontWeight:600}}>Incident Response</strong>, and{" "}
        <strong style={{color:"#f0fff4",fontWeight:600}}>Threat Hunting</strong> across Windows, macOS, and Linux enterprise environments.
        Ranked <strong style={{color:"#00ff64",fontWeight:600}}>Top 10 globally FY25</strong> with five community recognition awards.
        Deep hands-on expertise in Sophos Intercept X, Sophos Central, Live Discover XDR queries, MITRE ATT&CK,
        and root-cause analysis of complex malware and ransomware incidents.
      </p>

      {/* CTA buttons */}
      <div
        style={{
          display:"flex", gap:"1rem", flexWrap:"wrap",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(12px)",
          transition: "all 0.8s ease 0.7s",
          marginBottom: "3.5rem",
        }}
      >
        <a
          href="#experience"
          style={{
            fontFamily:"'Share Tech Mono',monospace",
            fontSize:"0.78rem", letterSpacing:"0.12em",
            color:"#000", background:"#00ff64",
            padding:"0.75rem 2rem", borderRadius:5,
            textDecoration:"none", fontWeight:700,
            textTransform:"uppercase",
            transition:"transform 0.2s, background 0.2s",
            display:"inline-block",
          }}
          onMouseEnter={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-2px)"; el.style.background="#00cc50"; }}
          onMouseLeave={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.transform="translateY(0)"; el.style.background="#00ff64"; }}
        >
          View My Work
        </a>
        <a
          href="#contact"
          style={{
            fontFamily:"'Share Tech Mono',monospace",
            fontSize:"0.78rem", letterSpacing:"0.12em",
            color:"#00ff64",
            border:"1px solid rgba(0,255,100,0.4)",
            padding:"0.75rem 2rem", borderRadius:5,
            textDecoration:"none", fontWeight:600,
            textTransform:"uppercase",
            transition:"transform 0.2s, border-color 0.2s, background 0.2s",
            display:"inline-block", background:"transparent",
          }}
          onMouseEnter={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-2px)"; el.style.borderColor="#00ff64"; el.style.background="rgba(0,255,100,0.06)"; }}
          onMouseLeave={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.transform="translateY(0)"; el.style.borderColor="rgba(0,255,100,0.4)"; el.style.background="transparent"; }}
        >
          Contact Me
        </a>
      </div>

      {/* Metrics row */}
      <div
        style={{
          display:"flex", gap:"clamp(1.5rem,4vw,3.5rem)", flexWrap:"wrap",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.88s",
        }}
      >
        {METRICS.map((m, i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", gap:2 }}>
            <span style={{
              fontFamily:"'Orbitron',sans-serif",
              fontSize:"clamp(1.4rem,3vw,2rem)",
              fontWeight:800, color:"#00ff64",
              lineHeight:1,
            }}>{m.value}</span>
            <span style={{
              fontFamily:"'Share Tech Mono',monospace",
              fontSize:"0.65rem", color:"rgba(240,255,244,0.42)",
              letterSpacing:"0.1em", textTransform:"uppercase",
            }}>{m.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:"absolute", bottom:"2.5rem", left:"50%",
        transform:"translateX(-50%)",
        display:"flex", flexDirection:"column",
        alignItems:"center", gap:8,
        opacity: visible ? 0.55 : 0,
        transition: "opacity 1s ease 1.2s",
      }}>
        <span style={{
          fontFamily:"'Share Tech Mono',monospace",
          fontSize:"0.62rem", letterSpacing:"0.18em",
          color:"rgba(0,255,100,0.7)", textTransform:"uppercase",
        }}>scroll</span>
        <div style={{
          width:1, height:36,
          background:"linear-gradient(to bottom, #00ff64, transparent)",
          animation:"fadeIn 1.5s ease infinite alternate",
        }}/>
      </div>
    </section>
  );
}