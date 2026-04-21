"use client";
import { useEffect, useState, useRef } from "react";

const LINKS = [
  { label: "About",      href: "#about"         },
  { label: "Skills",     href: "#skills"        },
  { label: "Experience", href: "#experience"    },
  { label: "Projects",   href: "#projects"      },
  { label: "Certs",      href: "#certifications"},
  { label: "Awards",     href: "#awards"        },
  { label: "Contact",    href: "#contact"       },
];

function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos   = useRef({ x: 0, y: 0 });
  const ring  = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onEnter = () => { if (dotRef.current) dotRef.current.style.opacity = "1"; if (ringRef.current) ringRef.current.style.opacity = "1"; };
    const onLeave = () => { if (dotRef.current) dotRef.current.style.opacity = "0"; if (ringRef.current) ringRef.current.style.opacity = "0"; };

    const animate = () => {
      rafId.current = requestAnimationFrame(animate);
      ring.current.x += (pos.current.x - ring.current.x) * 0.14;
      ring.current.y += (pos.current.y - ring.current.y) * 0.14;
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%)`;
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    animate();

    // Scale ring on hover of interactive elements
    const scaleUp = () => { if (ringRef.current) { ringRef.current.style.width = "50px"; ringRef.current.style.height = "50px"; ringRef.current.style.borderColor = "rgba(0,255,100,0.9)"; } };
    const scaleDown = () => { if (ringRef.current) { ringRef.current.style.width = "32px"; ringRef.current.style.height = "32px"; ringRef.current.style.borderColor = "rgba(0,255,100,0.5)"; } };
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", scaleUp);
      el.addEventListener("mouseleave", scaleDown);
    });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0, position: "fixed", top: 0, left: 0, width: 6, height: 6, background: "#00ff64", borderRadius: "50%", pointerEvents: "none", zIndex: 99999, boxShadow: "0 0 10px #00ff64", transition: "opacity 0.3s, width 0.2s, height 0.2s" }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0, position: "fixed", top: 0, left: 0, width: 32, height: 32, border: "1px solid rgba(0,255,100,0.5)", borderRadius: "50%", pointerEvents: "none", zIndex: 99998, transition: "opacity 0.3s, width 0.2s, height 0.2s, border-color 0.2s" }} />
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("");
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <CustomCursor />
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
        height: 64, display: "flex", alignItems: "center",
        padding: "0 clamp(1.2rem, 5vw, 3.5rem)",
        background: scrolled ? "rgba(0,5,2,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,100,0.1)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <a href="#hero" style={{
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: "1.1rem",
          color: "#00ff64", textDecoration: "none", letterSpacing: "0.05em", flex: "0 0 auto",
          textShadow: "0 0 20px rgba(0,255,100,0.4)",
        }}>
          RC
          <span style={{ color: "rgba(0,255,100,0.38)", fontWeight: 400, fontSize: "0.68rem", marginLeft: 6, fontFamily: "'Share Tech Mono',monospace", letterSpacing: "0.16em" }}>_SEC</span>
        </a>

        <div className="desktop-links" style={{ display: "flex", gap: "1.8rem", marginLeft: "auto", alignItems: "center" }}>
          {LINKS.map(l => {
            const isActive = active === l.href.slice(1);
            return (
              <a key={l.href} href={l.href} style={{
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.82rem",
                letterSpacing: "0.1em", color: isActive ? "#00ff64" : "rgba(240,255,244,0.48)",
                textDecoration: "none", textTransform: "uppercase",
                transition: "color 0.25s", position: "relative", paddingBottom: 4,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#00ff64"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isActive ? "#00ff64" : "rgba(240,255,244,0.48)"; }}
              >
                {l.label}
                {isActive && <span style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 1, background: "linear-gradient(90deg, #00ff64, transparent)" }} />}
              </a>
            );
          })}

          <a href="mailto:chavdarutvik1849@gmail.com" style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em",
            color: "#000", background: "#00ff64", padding: "0.42rem 1.1rem",
            borderRadius: 5, textDecoration: "none", fontWeight: 700, textTransform: "uppercase",
            transition: "all 0.2s", boxShadow: "0 0 20px rgba(0,255,100,0.25)",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#00e55a"; el.style.transform = "translateY(-1px)"; el.style.boxShadow = "0 6px 25px rgba(0,255,100,0.4)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#00ff64"; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 0 20px rgba(0,255,100,0.25)"; }}
          >Hire Me</a>
        </div>

        <button className="mobile-toggle" onClick={() => setOpen(o => !o)} aria-label="Toggle menu" style={{
          display: "none", background: "none", border: "none",
          color: "#00ff64", cursor: "pointer", padding: "0.5rem", marginLeft: "auto",
          fontFamily: "'Share Tech Mono',monospace", fontSize: "1.3rem",
        }}>
          {open ? "✕" : "≡"}
        </button>

        {open && (
          <div style={{
            position: "fixed", top: 64, left: 0, right: 0,
            background: "rgba(0,5,2,0.97)", borderBottom: "1px solid rgba(0,255,100,0.15)",
            padding: "1.5rem clamp(1.2rem,5vw,3rem)",
            display: "flex", flexDirection: "column", gap: "1.2rem",
            backdropFilter: "blur(24px)", zIndex: 8999,
            animation: "fadeIn 0.2s ease",
          }}>
            {LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: "1rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "rgba(240,255,244,0.75)", textDecoration: "none",
              }}>{l.label}</a>
            ))}
          </div>
        )}

        <style>{`
          @media (max-width: 900px) {
            .mobile-toggle { display: block !important; }
            .desktop-links { display: none !important; }
          }
        `}</style>
      </nav>
    </>
  );
}
