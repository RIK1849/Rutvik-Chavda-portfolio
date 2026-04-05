const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Awards", href: "#awards" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <a href="#home" className="logo">
          RUTVIK <span>CHAVDA</span>
        </a>

        <nav className="nav-menu" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}