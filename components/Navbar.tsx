"use client";

import React, { useEffect, useState } from "react";

const LINKS = [
  { label: "01.about", href: "#about" },
  { label: "02.experience", href: "#experience" },
  { label: "03.projects", href: "#projects" },
  { label: "04.contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#hero" className="nav-brand" aria-label="Go to top">
          [ RC ]
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-a">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav-cta">
          OPEN_TO_OPPORTUNITIES
        </a>
      </div>
    </header>
  );
}