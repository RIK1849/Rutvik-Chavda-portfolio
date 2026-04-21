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
  { value: "3+",     label: "Years @ Sophos"  },
  { value: "500+",   label: "Cases Resolved"  },
  { value: "Top 10", label: "Engineer FY25"   },
  { value: "6x",     label: "Awards CY25"     },
];

export default function HeroSection() {
  const [typed,   setTyped]   = useState("");
  const [strIdx,  setStrIdx]  = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [del,     setDel]     = useState(false);
  const [visible, setVisible] = useState(false);
  const [glitch,  setGlitch]  = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLCanvasElement>(null);

  // Typewriter
  useEffect(() => {
    const current = TYPED_STRINGS[strIdx];
    const delay = del ? 40 : charIdx === current.length ? 1800 : 65;
    const t = setTimeout(() => {
      if (!del && charIdx < current.length) {
        setTyped(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1);
      } else if (!del && charIdx === current.length) {
        setDel(true);
      } else if (del && charIdx > 0) {
        setTyped(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1);
      } else {
        setDel(false); setStrIdx(s => (s + 1) % TYPED_STRINGS.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [typed, strIdx, charIdx, del]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 7200);
    return () => clearTimeout(t);
  }, []);

  // Glitch
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 360);
    }, 7000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  // 3D card tilt on mouse
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Particle canvas on photo
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let rafId = 0;
    let particles: { x: number; y: number; vx: number; vy: number; life: number; size: number; }[] = [];

    function resize() {
      canvas!.width  = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }
    resize();

    function spawn() {
      const cx = canvas!.width / 2;
      const cy = canvas!.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const r = canvas!.width * 0.3 + Math.random() * 20;
      particles.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        life: 1,
        size: Math.random() * 2 + 0.5,
      });
    }

    let frame = 0;
    function render() {
      rafId = requestAnimationFrame(render);
      frame++;
      if (frame % 3 === 0 && particles.length < 60) spawn();
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles = particles.filter(p => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.008;
        if (p.life <= 0) return false;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0,255,100,${p.life * 0.7})`;
        ctx!.fill();
        return true;
      });
    }
    render();
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Card tilt
  const getTilt = () => {
    if (!cardRef.current) return { x: 0, y: 0 };
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return {
      x: ((mousePos.y - cy) / rect.height) * 12,
      y: ((mousePos.x - cx) / rect.width) * -12,
    };
  };
  const tilt = getTilt();

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
        gridTemplateColumns: "1.45fr 1fr",
        gap: "3.5rem",
        alignItems: "center",
        width: "100%",
        maxWidth: 1180,
        margin: "0 auto",
      }} className="hero-grid">

        {/* ── Left: Text ── */}
        <div>
          {/* Status pill */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(12px)",
            transition: "all 0.7s ease 0.1s",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.7rem",
            color: "rgba(0,255,100,0.8)",
            letterSpacing: "0.18em",
            marginBottom: "1.4rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.7rem",
            padding: "0.45rem 1.1rem",
            border: "1px solid rgba(0,255,100,0.35)",
            borderRadius: 999,
            background: "rgba(0,255,100,0.04)",
            boxShadow: "0 0 20px rgba(0,255,100,0.1)",
            position: "relative",
            overflow: "hidden",
          }}>
            <span style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(0,255,100,0.04), transparent)", animation: "shimmer 2.5s ease infinite" }} />
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#00ff64", animation: "pulse 1.4s ease infinite", flexShrink: 0 }} />
            AVAILABLE FOR OPPORTUNITIES
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 5.8rem)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.8s ease 0.25s",
          }}>
            <span style={{ color: "#f0fff4", display: "block", marginBottom: "0.12em" }}>Rutvik</span>
            <span style={{ color: "transparent", WebkitTextStroke: "2px #00ff64", display: "inline-block", position: "relative", filter: "drop-shadow(0 0 20px rgba(0,255,100,0.4))" }}>
              Chavda
              {glitch && (
                <>
                  <span style={{ position: "absolute", left: 0, top: 0, WebkitTextStroke: "2px #00e5ff", color: "transparent", animation: "glitch1 0.36s steps(1) forwards", pointerEvents: "none", whiteSpace: "nowrap" }}>Chavda</span>
                  <span style={{ position: "absolute", left: 0, top: 0, WebkitTextStroke: "2px #ff2244", color: "transparent", animation: "glitch2 0.36s steps(1) forwards", pointerEvents: "none", whiteSpace: "nowrap" }}>Chavda</span>
                </>
              )}
            </span>
          </h1>

          {/* Typewriter */}
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(1rem, 2.2vw, 1.28rem)",
            color: "#00ff64",
            marginBottom: "1.8rem",
            minHeight: "2rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.4s",
            textShadow: "0 0 20px rgba(0,255,100,0.5)",
          }}>
            <span style={{ color: "rgba(0,255,100,0.4)" }}>~ $ </span>
            {typed}
            <span style={{ display: "inline-block", width: 2, height: "1.1em", background: "#00ff64", verticalAlign: "middle", marginLeft: 2, animation: "pulse 0.9s ease infinite" }} />
          </div>

          {/* Bio */}
          <p style={{
            maxWidth: 560,
            fontSize: "clamp(0.95rem, 1.6vw, 1.02rem)",
            color: "rgba(240,255,244,0.62)",
            lineHeight: 1.82,
            marginBottom: "2.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(10px)",
            transition: "all 0.7s ease 0.55s",
            fontFamily: "'Rajdhani', sans-serif",
          }}>
            L2/L3 Endpoint Security Engineer with 3+ years at Sophos, specialising in{" "}
            <strong style={{ color: "#f0fff4", fontWeight: 600 }}>EDR/XDR</strong>,{" "}
            <strong style={{ color: "#f0fff4", fontWeight: 600 }}>Incident Response</strong>, and{" "}
            <strong style={{ color: "#f0fff4", fontWeight: 600 }}>Threat Hunting</strong> across Windows, macOS, and Linux enterprise environments.
            Ranked <strong style={{ color: "#00ff64", fontWeight: 700 }}>Top 10 globally FY25</strong> with six recognition awards.
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: "1rem", flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(10px)",
            transition: "all 0.7s ease 0.7s",
            marginBottom: "3rem",
          }}>
            <a href="#experience" style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: "0.76rem", letterSpacing: "0.12em",
              color: "#000", background: "#00ff64",
              padding: "0.85rem 2.2rem", borderRadius: 6,
              textDecoration: "none", fontWeight: 700, textTransform: "uppercase",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 0 0 rgba(0,255,100,0)",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 8px 30px rgba(0,255,100,0.4)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 0 0 rgba(0,255,100,0)"; }}
            >
              View My Work →
            </a>
            <a href="#contact" style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: "0.76rem", letterSpacing: "0.12em",
              color: "#00ff64", border: "1px solid rgba(0,255,100,0.45)",
              padding: "0.85rem 2.2rem", borderRadius: 6,
              textDecoration: "none", fontWeight: 600, textTransform: "uppercase",
              transition: "transform 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s",
              background: "transparent",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-3px)"; el.style.borderColor = "#00ff64"; el.style.background = "rgba(0,255,100,0.06)"; el.style.boxShadow = "0 8px 30px rgba(0,255,100,0.15)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.borderColor = "rgba(0,255,100,0.45)"; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
            >
              Contact Me
            </a>
          </div>

          {/* Metrics */}
          <div style={{
            display: "flex", gap: "clamp(1.5rem,4vw,3rem)", flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.85s",
          }}>
            {METRICS.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{
                  fontFamily: "'Orbitron',sans-serif",
                  fontSize: "clamp(1.35rem,2.6vw,1.9rem)",
                  fontWeight: 900, color: "#00ff64", lineHeight: 1,
                  textShadow: "0 0 25px rgba(0,255,100,0.5)",
                }}>{m.value}</span>
                <span style={{
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: "0.6rem", color: "rgba(240,255,244,0.38)",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: 3D Holographic Card ── */}
        <div ref={cardRef} className="hero-photo" style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transition: "all 1s ease 0.3s",
          perspective: "800px",
        }}>
          <div style={{
            position: "relative",
            width: "clamp(260px, 30vw, 360px)",
            aspectRatio: "1",
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.12s ease-out",
            animation: visible ? "floatUp 6s ease-in-out infinite" : "none",
          }}>
            {/* Rotating orbit rings */}
            <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", animation: "spin360 20s linear infinite", pointerEvents: "none" }}>
              <circle cx="200" cy="200" r="195" fill="none" stroke="rgba(0,255,100,0.22)" strokeWidth="1" strokeDasharray="3 7"/>
              <circle cx="200" cy="6" r="5" fill="#00ff64" opacity="0.8"/>
              <circle cx="200" cy="394" r="3" fill="rgba(0,255,100,0.5)"/>
            </svg>
            <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", animation: "spin360Rev 30s linear infinite", pointerEvents: "none" }}>
              <ellipse cx="200" cy="200" rx="185" ry="120" fill="none" stroke="rgba(0,229,255,0.12)" strokeWidth="1" strokeDasharray="2 9"/>
              <circle cx="385" cy="200" r="4" fill="rgba(0,229,255,0.7)"/>
            </svg>
            <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", animation: "spin360 45s linear infinite", pointerEvents: "none" }}>
              <ellipse cx="200" cy="200" rx="175" ry="80" fill="none" stroke="rgba(167,139,250,0.1)" strokeWidth="0.8" strokeDasharray="1 12"/>
            </svg>

            {/* Corner brackets */}
            {[[-8,-8,1,1],[-8,-8,-1,1] as [number,number,number,number],[-8,-8,1,-1],[-8,-8,-1,-1]].map((_,i) => {
              const positions = [
                { top: -10, left: -10, borderTop: "2px solid #00ff64", borderLeft: "2px solid #00ff64" },
                { top: -10, right: -10, borderTop: "2px solid #00ff64", borderRight: "2px solid #00ff64" },
                { bottom: -10, left: -10, borderBottom: "2px solid #00ff64", borderLeft: "2px solid #00ff64" },
                { bottom: -10, right: -10, borderBottom: "2px solid #00ff64", borderRight: "2px solid #00ff64" },
              ];
              return <div key={i} style={{ position: "absolute", width: 28, height: 28, ...positions[i] }} />;
            })}

            {/* Particle canvas */}
            <canvas ref={particleRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }} />

            {/* Photo */}
            <div style={{
              position: "absolute", inset: "8%",
              borderRadius: "50%", overflow: "hidden",
              border: "2px solid rgba(0,255,100,0.6)",
              boxShadow: "0 0 50px rgba(0,255,100,0.3), 0 0 100px rgba(0,255,100,0.1), inset 0 0 30px rgba(0,255,100,0.08)",
              zIndex: 2,
            }}>
              <img src="/rutvik.jpg" alt="Rutvik Chavda" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.06) saturate(0.85) brightness(0.95)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,255,100,0.07), transparent 50%, rgba(0,229,255,0.04))", mixBlendMode: "overlay", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, rgba(0,255,100,0.03) 0px, rgba(0,255,100,0.03) 1px, transparent 1px, transparent 4px)", pointerEvents: "none" }} />
            </div>

            {/* ID card overlay */}
            <div style={{
              position: "absolute",
              bottom: "-28px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,8,4,0.95)",
              border: "1px solid rgba(0,255,100,0.45)",
              padding: "0.4rem 1.1rem",
              borderRadius: 8,
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.6rem",
              color: "#00ff64",
              letterSpacing: "0.14em",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 6,
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 20px rgba(0,255,100,0.2)",
              zIndex: 10,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00ff64", animation: "pulse 1.4s ease infinite", flexShrink: 0 }}/>
              ONLINE · L2/L3 SEC ENG
            </div>

            {/* Floating data labels */}
            {[
              { text: "XDR", top: "12%", left: "-22%", delay: "0s" },
              { text: "MITRE", top: "35%", right: "-25%", delay: "0.3s" },
              { text: "SIEM", bottom: "28%", left: "-20%", delay: "0.6s" },
              { text: "EDR", top: "60%", right: "-22%", delay: "0.9s" },
            ].map((l, i) => (
              <div key={i} style={{
                position: "absolute",
                ...l,
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: "0.58rem",
                color: "rgba(0,255,100,0.6)",
                border: "1px solid rgba(0,255,100,0.2)",
                padding: "2px 7px",
                borderRadius: 3,
                background: "rgba(0,12,6,0.8)",
                animation: `floatUp ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: l.delay,
                zIndex: 3,
                backdropFilter: "blur(6px)",
              }}>{l.text}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: visible ? 0.5 : 0,
        transition: "opacity 1s ease 1.2s",
      }}>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(0,255,100,0.7)", textTransform: "uppercase" }}>SCROLL</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #00ff64, transparent)" }}/>
      </div>

      <style>{`
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .hero-photo { order: -1; }
        }
      `}</style>
    </section>
  );
}