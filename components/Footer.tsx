"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [time, setTime] = useState("");
  const [packets, setPackets] = useState(9412);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toUTCString().slice(17, 25) + " UTC");
      setPackets(p => p + Math.floor(Math.random() * 3));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer style={{
      borderTop: "1px solid rgba(0,255,100,0.12)",
      background: "rgba(0,4,2,0.95)",
      backdropFilter: "blur(16px)",
      position: "relative",
      zIndex: 10,
      overflow: "hidden",
    }}>
      {/* Status bar */}
      <div style={{
        borderBottom: "1px solid rgba(0,255,100,0.07)",
        padding: "0.5rem clamp(1.2rem, 5vw, 3.5rem)",
        display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "center",
        background: "rgba(0,255,100,0.015)",
      }}>
        {[
          { label: "EDR ENGINE", value: "ONLINE", color: "#00ff64" },
          { label: "XDR NODES",  value: "22/22",   color: "#00ff64" },
          { label: "PACKETS",    value: packets.toLocaleString(), color: "#38bdf8" },
          { label: "TIME",       value: time,      color: "rgba(240,255,244,0.4)" },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: "rgba(0,255,100,0.3)", letterSpacing: "0.1em" }}>{s.label}</span>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: s.color, fontWeight: 700 }}>{s.value}</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00ff64", display: "inline-block", animation: "pulse 1.4s ease infinite" }} />
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: "rgba(0,255,100,0.5)", letterSpacing: "0.1em" }}>SECURE SESSION ACTIVE</span>
        </div>
      </div>

      {/* Main footer */}
      <div style={{
        padding: "1.8rem clamp(1.2rem, 5vw, 3.5rem)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "1rem",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.9rem", fontWeight: 900, color: "#00ff64", letterSpacing: "0.08em", textShadow: "0 0 20px rgba(0,255,100,0.4)" }}>
            RC_SEC
          </span>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "rgba(0,255,100,0.38)", letterSpacing: "0.08em" }}>
            Rutvik Chavda — Endpoint Security Engineer
          </span>
        </div>

        <div style={{ display: "flex", gap: "1.8rem", flexWrap: "wrap" }}>
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/rutvik-chavda-584b37197" },
            { label: "Email",    href: "mailto:chavdarutvik1849@gmail.com" },
          ].map(l => (
            <a key={l.label} href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(240,255,244,0.38)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#00ff64"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(240,255,244,0.38)"; }}
            >{l.label}</a>
          ))}
        </div>

        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(240,255,244,0.22)", letterSpacing: "0.06em" }}>
          © {year} — All rights reserved
        </span>
      </div>
    </footer>
  );
}