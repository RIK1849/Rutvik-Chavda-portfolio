"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,255,100,0.1)",
        padding: "2rem clamp(1.2rem, 5vw, 3.5rem)",
        background: "rgba(0,5,2,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "0.85rem", fontWeight: 800,
          color: "#00ff64", letterSpacing: "0.08em",
        }}>
          RC_SEC
        </span>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.65rem", color: "rgba(0,255,100,0.42)",
          letterSpacing: "0.08em",
        }}>
          Rutvik Chavda — Endpoint Security Engineer
        </span>
      </div>

      <div style={{ display: "flex", gap: "1.8rem", flexWrap: "wrap" }}>
        {[
          { label: "LinkedIn", href: "https://www.linkedin.com/in/rutvikchavda-584b37197" },
          { label: "Email",    href: "mailto:chavdarutvik1849@gmail.com" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.68rem", letterSpacing: "0.1em",
              color: "rgba(240,255,244,0.42)",
              textDecoration: "none", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00ff64"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,255,244,0.42)"; }}
          >
            {l.label}
          </a>
        ))}
      </div>

      <span style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "0.62rem", color: "rgba(240,255,244,0.25)",
        letterSpacing: "0.06em",
      }}>
        © {year} — All rights reserved
      </span>
    </footer>
  );
}