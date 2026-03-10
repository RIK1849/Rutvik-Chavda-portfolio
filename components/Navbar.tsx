"use client";
import React, { useState, useEffect } from "react";

const LINKS = [
  { label: "01.about",      href: "#about"      },
  { label: "02.experience", href: "#experience"  },
  { label: "03.projects",   href: "#projects"    },
  { label: "04.contact",    href: "#contact"     },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className="nav" style={{ borderBottomColor: scrolled ? "rgba(0,229,255,.14)" : "rgba(12,37,64,.5)" }}>
      <a href="#hero" className="nav-logo">
        <span className="nav-b">[</span>RC<span className="nav-b">]</span>
      </a>
      <ul className="nav-links">
        {LINKS.map(l => (
          <li key={l.href}><a href={l.href} className="nav-a">{l.label}</a></li>
        ))}
      </ul>
      <div className="nav-status">
        <span className="sdot" />
        OPEN_TO_OPPORTUNITIES
      </div>
    </nav>
  );
}
