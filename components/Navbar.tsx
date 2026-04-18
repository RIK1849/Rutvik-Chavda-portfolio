"use client";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "About",       href: "#about" },
  { label: "Skills",      href: "#skills" },
  { label: "Experience",  href: "#experience" },
  { label: "Projects",    href: "#projects" },
  { label: "Certs",       href: "#certifications" },
  { label: "Awards",      href: "#awards" },
  { label: "Contact",     href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("");
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 9000,
        height: 64,
        display: "flex",
        alignItems: "center",
        padding: "0 clamp(1.2rem, 5vw, 3.5rem)",
        background: scrolled ? "rgba(0,8,3,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,100,0.1)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <a
        href="#hero"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 800,
          fontSize: "1.05rem",
          color: "#00ff64",
          textDecoration: "none",
          letterSpacing: "0.06em",
          flex: "0 0 auto",
        }}
      >
        RC
        <span style={{ color: "rgba(0,255,100,0.4)", fontWeight: 400, fontSize: "0.7rem", marginLeft: 6, fontFamily: "'Share Tech Mono',monospace", letterSpacing: "0.14em" }}>
          _SEC
        </span>
      </a>

      <div className="desktop-links" style={{ display: "flex", gap: "1.8rem", marginLeft: "auto", alignItems: "center" }}>
        {LINKS.map((l) => {
          const isActive = active === l.href.slice(1);
          return (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                color: isActive ? "#00ff64" : "rgba(240,255,244,0.5)",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.25s",
                position: "relative",
                paddingBottom: 4,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00ff64"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isActive ? "#00ff64" : "rgba(240,255,244,0.5)"; }}
            >
              {l.label}
              {isActive && (
                <span style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 1, background: "linear-gradient(90deg, #00ff64, transparent)" }} />
              )}
            </a>
          );
        })}

        <a
          href="mailto:chavdarutvik1849@gmail.com"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            color: "#000",
            background: "#00ff64",
            padding: "0.4rem 1.1rem",
            borderRadius: 4,
            textDecoration: "none",
            fontWeight: 700,
            textTransform: "uppercase",
            transition: "background 0.25s, transform 0.2s",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#00cc50"; el.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#00ff64"; el.style.transform = "translateY(0)"; }}
        >
          Hire Me
        </a>
      </div>

      <button
        className="mobile-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        style={{
          display: "none",
          background: "none", border: "none",
          color: "#00ff64", cursor: "pointer",
          padding: "0.5rem", marginLeft: "auto",
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: "1.3rem",
        }}
      >
        {open ? "✕" : "≡"}
      </button>

      {open && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0,
          background: "rgba(0,8,3,0.97)",
          borderBottom: "1px solid rgba(0,255,100,0.15)",
          padding: "1.5rem clamp(1.2rem,5vw,3rem)",
          display: "flex", flexDirection: "column", gap: "1.2rem",
          backdropFilter: "blur(20px)",
          zIndex: 8999,
        }}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Rajdhani',sans-serif",
                fontWeight: 600, fontSize: "1rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "rgba(240,255,244,0.75)", textDecoration: "none",
              }}
            >{l.label}</a>
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
  );
}