"use client";

import React, { useEffect, useState } from "react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#hero" className="nav-brand" aria-label="Go to top">
          <span className="nav-brand-mark">[RC]</span>
          <span className="nav-brand-text">RUTVIK CHAVDA</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav-cta">
          OPEN TO OPPORTUNITIES
        </a>
      </div>
    </header>
  );
}
