"use client";

import React, { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#hero" className="nav-brand" aria-label="Go to top">
          <span className="nav-brand-mark">[RC]</span>
          <span className="nav-brand-text">RUTVIK CHAVDA</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((item) => (
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