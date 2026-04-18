"use client";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About",    href: "#about"         },
  { label: "Experience", href: "#experience"  },
  { label: "Projects", href: "#projects"      },
  { label: "Skills",   href: "#skills"        },
  { label: "Certs",    href: "#certifications"},
  { label: "Awards",   href: "#awards"        },
  { label: "Contact",  href: "#contact"       },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("");
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(0,0,0,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(0,255,100,0.1)"
          : "1px solid transparent",
        padding: "0 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#00ff64",
            textDecoration: "none",
            letterSpacing: "0.1em",
          }}
        >
          RC<span style={{ color: "rgba(255,255,255,0.3)" }}>.security</span>
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setActive(l.href)}
              style={{
                padding: "6px 12px",
                borderRadius: 4,
                fontSize: "0.78rem",
                fontFamily: "monospace",
                letterSpacing: "0.06em",
                color: active === l.href ? "#00ff64" : "rgba(255,255,255,0.5)",
                textDecoration: "none",
                transition: "color 0.2s, background 0.2s",
                background: active === l.href ? "rgba(0,255,100,0.08)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (active !== l.href) {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== l.href) {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
                }
              }}
            >
              {l.label}
            </a>
          ))}

          <a
            href="#contact"
            style={{
              marginLeft: "0.5rem",
              padding: "7px 16px",
              borderRadius: 4,
              fontSize: "0.78rem",
              fontFamily: "monospace",
              letterSpacing: "0.08em",
              color: "#000",
              background: "#00ff64",
              textDecoration: "none",
              fontWeight: 700,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            HIRE ME
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
          className="nav-burger"
          aria-label="Toggle menu"
        >
          <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  height: 1.5,
                  background: "#00ff64",
                  borderRadius: 1,
                  transition: "transform 0.3s, opacity 0.3s",
                  transformOrigin: "center",
                  transform:
                    open && i === 0 ? "rotate(45deg) translateY(6.5px)" :
                    open && i === 1 ? "scaleX(0)" :
                    open && i === 2 ? "rotate(-45deg) translateY(-6.5px)" :
                    "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            background: "rgba(0,0,0,0.95)",
            borderTop: "1px solid rgba(0,255,100,0.1)",
            padding: "1rem 2rem 1.5rem",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => { setActive(l.href); setOpen(false); }}
              style={{
                display: "block",
                padding: "10px 0",
                fontSize: "0.9rem",
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                letterSpacing: "0.06em",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-burger   { display: block !important; }
        }
      `}</style>
    </nav>
  );
}