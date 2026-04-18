"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#000",
        borderTop: "1px solid rgba(0,255,100,0.08)",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.85rem",
              color: "#00ff64",
              letterSpacing: "0.08em",
              fontWeight: 700,
            }}
          >
            RC<span style={{ color: "rgba(255,255,255,0.2)" }}>.security</span>
          </span>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/rutvik-chavda-584b37197/" },
              { label: "Portfolio", href: "#hero" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#00ff64"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"; }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <p
          style={{
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "monospace",
            letterSpacing: "0.06em",
          }}
        >
          © {year} Rutvik Chavda — Endpoint Security Engineer · Built with purpose, not a template.
        </p>
      </div>
    </footer>
  );
}