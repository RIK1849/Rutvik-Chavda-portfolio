"use client";
import { useEffect, useState } from "react";

const TYPED_STRINGS = [
  "Endpoint Security Engineer",
  "EDR / XDR Specialist",
  "Incident Response Lead",
  "Threat Hunter",
  "Sophos Intercept X Expert",
];

const METRICS = [
  { value: "3+",     label: "Years @ Sophos"       },
  { value: "500+",   label: "Cases Resolved"       },
  { value: "Top 10", label: "Engineer FY25"        },
  { value: "5x",     label: "CY25 Awards"          },
];

export default function HeroSection() {
  const [typed,   setTyped]   = useState("");
  const [strIdx,  setStrIdx]  = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [del,     setDel]     = useState(false);
  const [visible, setVisible] = useState(false);
  const [glitch,  setGlitch]  = useState(false);

  useEffect(() => {
    const current = TYPED_STRINGS[strIdx];
    const delay = del ? 42 : charIdx === current.length ? 1800 : 68;
    const t = setTimeout(() => {
      if (!del && charIdx < current.length) {
        setTyped(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!del && charIdx === current.length) {
        setDel(true);
      } else if (del && charIdx > 0) {
        setTyped(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDel(false);
        setStrIdx((s) => (s + 1) % TYPED_STRINGS.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [typed, strIdx, charIdx, del]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 7000); // wait for boot sequence
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 380);
    }, 7500 + Math.random() * 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 clamp(1.4rem, 7vw, 5rem)",
        position: "relative",
        zIndex: 10,
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: "3.5rem",
        alignItems: "center",
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
      }} className="hero-grid">

        {/* Left column — text */}
        <div>
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(12px)",
              transition: "all 0.7s ease 0.1s",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.72rem",
              color: "rgba(0,255,100,0.7)",
              letterSpacing: "0.18em",
              marginBottom: "1.2rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.7rem",
              padding: "0.45rem 1rem",
              border: "1px solid rgba(0,255,100,0.3)",
              borderRadius: 999,
              background: "rgba(0,255,100,0.04)",
            }}
          >
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#00ff64", animation: "pulse 1.4s ease infinite" }} />
            AVAILABLE FOR OPPORTUNITIES
          </div>

          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.01em",
              lineHeight: 1.0,
              marginBottom: "1.4rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "all 0.8s ease 0.25s",
            }}
          >
            <span style={{ color: "#f0fff4", display: "block" }}>Rutvik</span>
            <span style={{ color: "transparent", WebkitTextStroke: "1.5px #00ff64", display: "inline-block", position: "relative" }}>
              Chavda
              {glitch && (
                <>
                  <span style={{
                    position: "absolute", left: 0, top: 0,
                    WebkitTextStroke: "1.5px #00e5ff",
                    color: "transparent",
                    animation: "glitch1 0.38s steps(1) forwards",
                    pointerEvents: "none", whiteSpace: "nowrap",
                  }}>Chavda</span>
                  <span style={{
                    position: "absolute", left: 0, top: 0,
                    WebkitTextStroke: "1.5px #ff2244",
                    color: "transparent",
                    animation: "glitch2 0.38s steps(1) forwards",
                    pointerEvents: "none", whiteSpace: "nowrap",
                  }}>Chavda</span>
                </>
              )}
            </span>
          </h1>

          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "clamp(0.95rem, 2.2vw, 1.25rem)",
              color: "#00ff64",
              marginBottom: "1.8rem",
              minHeight: "1.8rem",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.4s",
            }}
          >
            {typed}
            <span style={{
              display: "inline-block", width: 3, height: "1.1em",
              background: "#00ff64", verticalAlign: "middle",
              marginLeft: 3, animation: "pulse 1s ease infinite",
            }} />
          </div>

          <p
            style={{
              maxWidth: 560,
              fontSize: "clamp(0.95rem, 1.6vw, 1.02rem)",
              color: "rgba(240,255,244,0.65)",
              lineHeight: 1.78,
              marginBottom: "2.4rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(10px)",
              transition: "all 0.7s ease 0.55s",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 400,
            }}
          >
            L2/L3 Endpoint Security Engineer with 3+ years at Sophos, specialising in{" "}
            <strong style={{color:"#f0fff4",fontWeight:600}}>EDR/XDR</strong>,{" "}
            <strong style={{color:"#f0fff4",fontWeight:600}}>Incident Response</strong>, and{" "}
            <strong style={{color:"#f0fff4",fontWeight:600}}>Threat Hunting</strong> across Windows, macOS, and Linux enterprise environments.
            Ranked <strong style={{color:"#00ff64",fontWeight:600}}>Top 10 globally FY25</strong> with five community recognition awards.
          </p>

          <div
            style={{
              display: "flex", gap: "1rem", flexWrap: "wrap",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(10px)",
              transition: "all 0.7s ease 0.7s",
              marginBottom: "3rem",
            }}
          >
            <a
              href="#experience"
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: "0.78rem", letterSpacing: "0.12em",
                color: "#000", background: "#00ff64",
                padding: "0.8rem 2rem", borderRadius: 5,
                textDecoration: "none", fontWeight: 700,
                textTransform: "uppercase",
                transition: "transform 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.background = "#00cc50"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.background = "#00ff64"; }}
            >
              View My Work →
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: "0.78rem", letterSpacing: "0.12em",
                color: "#00ff64",
                border: "1px solid rgba(0,255,100,0.4)",
                padding: "0.8rem 2rem", borderRadius: 5,
                textDecoration: "none", fontWeight: 600,
                textTransform: "uppercase",
                transition: "transform 0.2s, border-color 0.2s, background 0.2s",
                background: "transparent",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.borderColor = "#00ff64"; el.style.background = "rgba(0,255,100,0.06)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.borderColor = "rgba(0,255,100,0.4)"; el.style.background = "transparent"; }}
            >
              Contact Me
            </a>
          </div>

          <div
            style={{
              display: "flex", gap: "clamp(1.5rem,4vw,2.8rem)", flexWrap: "wrap",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.85s",
            }}
          >
            {METRICS.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{
                  fontFamily: "'Orbitron',sans-serif",
                  fontSize: "clamp(1.3rem,2.6vw,1.8rem)",
                  fontWeight: 800, color: "#00ff64",
                  lineHeight: 1,
                }}>{m.value}</span>
                <span style={{
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: "0.62rem", color: "rgba(240,255,244,0.4)",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — profile photo */}
        <div
          className="hero-photo"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "scale(0.92)",
            transition: "all 1s ease 0.3s",
          }}
        >
          <div style={{ position: "relative", width: "clamp(240px, 30vw, 340px)", aspectRatio: "1", animation: "floatUp 5s ease-in-out infinite" }}>
            {/* Rotating outer ring */}
            <svg
              viewBox="0 0 400 400"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                animation: "spin360 18s linear infinite", pointerEvents: "none",
              }}
            >
              <circle cx="200" cy="200" r="195" fill="none" stroke="rgba(0,255,100,0.28)" strokeWidth="1" strokeDasharray="4 6"/>
            </svg>
            <svg
              viewBox="0 0 400 400"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                animation: "spin360Rev 26s linear infinite", pointerEvents: "none",
              }}
            >
              <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(0,229,255,0.18)" strokeWidth="1" strokeDasharray="2 8"/>
              <circle cx="200" cy="5" r="4" fill="#00e5ff"/>
            </svg>

            {/* Corner brackets */}
            <div style={{ position: "absolute", top: -8, left: -8, width: 26, height: 26, borderTop: "2px solid #00ff64", borderLeft: "2px solid #00ff64" }}/>
            <div style={{ position: "absolute", top: -8, right: -8, width: 26, height: 26, borderTop: "2px solid #00ff64", borderRight: "2px solid #00ff64" }}/>
            <div style={{ position: "absolute", bottom: -8, left: -8, width: 26, height: 26, borderBottom: "2px solid #00ff64", borderLeft: "2px solid #00ff64" }}/>
            <div style={{ position: "absolute", bottom: -8, right: -8, width: 26, height: 26, borderBottom: "2px solid #00ff64", borderRight: "2px solid #00ff64" }}/>

            {/* Image */}
            <div style={{
              position: "absolute",
              inset: "8%",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(0,255,100,0.5)",
              boxShadow: "0 0 40px rgba(0,255,100,0.25), inset 0 0 30px rgba(0,255,100,0.1)",
            }}>
              <img
                src="/rutvik.jpg"
                alt="Rutvik Chavda"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  filter: "contrast(1.05) saturate(0.88) brightness(0.95)",
                }}
              />
              {/* Green tint overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(0,255,100,0.08), transparent 50%, rgba(0,229,255,0.05))",
                mixBlendMode: "overlay",
                pointerEvents: "none",
              }}/>
              {/* Scanline */}
              <div style={{
                position: "absolute", inset: 0,
                background: "repeating-linear-gradient(0deg, rgba(0,255,100,0.04) 0px, rgba(0,255,100,0.04) 1px, transparent 1px, transparent 3px)",
                pointerEvents: "none",
              }}/>
            </div>

            {/* Status badge bottom */}
            <div style={{
              position: "absolute",
              bottom: "-18px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#000",
              border: "1px solid rgba(0,255,100,0.4)",
              padding: "0.32rem 0.9rem",
              borderRadius: 999,
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.62rem",
              color: "#00ff64",
              letterSpacing: "0.14em",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff64", animation: "pulse 1.4s ease infinite" }}/>
              ONLINE
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 8,
        opacity: visible ? 0.5 : 0,
        transition: "opacity 1s ease 1.2s",
      }}>
        <span style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: "0.62rem", letterSpacing: "0.18em",
          color: "rgba(0,255,100,0.7)", textTransform: "uppercase",
        }}>SCROLL</span>
        <div style={{
          width: 1, height: 30,
          background: "linear-gradient(to bottom, #00ff64, transparent)",
        }}/>
      </div>

      <style>{`
        @keyframes spin360 { to { transform: rotate(360deg); } }
        @keyframes spin360Rev { to { transform: rotate(-360deg); } }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hero-photo { order: -1; }
        }
      `}</style>
    </section>
  );
}