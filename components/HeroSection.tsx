const HERO_CHIPS = [
  "3+ Years Experience",
  "Top 10 Sophos Support FY24",
  "Top 2 Community Contributor FY25",
  "12 Security Certifications",
];

const FIT_ITEMS = [
  {
    title: "Endpoint Security",
    description:
      "Strong fit for endpoint security engineering, EDR/XDR support, and policy troubleshooting roles.",
  },
  {
    title: "Technical Support Depth",
    description:
      "L2/L3 incident ownership, escalation handling, customer communication, and RCA-driven resolution.",
  },
  {
    title: "SIEM / Investigation Alignment",
    description:
      "Hands-on with Splunk, endpoint telemetry, Sysmon, logs, IOC/IOA review, and suspicious activity analysis.",
  },
];

export default function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="card hero-panel">
          <p className="hero-kicker">
            ENDPOINT SECURITY | TECHNICAL SUPPORT | THREAT INVESTIGATION
          </p>

          <h1 className="hero-title">
            Rutvik <span>Chavda</span>
          </h1>

          <p className="hero-subtitle">
            Technical Support Engineer | Endpoint Security | Splunk | Incident
            Management
          </p>

          <p className="hero-copy">
            I support enterprise customers across endpoint security, production
            incidents, investigation workflows, and complex troubleshooting
            across Windows, macOS, Linux, networking, and SaaS environments.
          </p>

          <div className="hero-actions">
            <a
              href="/resumes/Rutvik-Chavda-Technical-Support-Resume.pdf"
              className="btn btn-primary"
              download
            >
              Download Resume
            </a>

            <a href="#work" className="btn btn-secondary">
              View Work Areas
            </a>

            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
          </div>

          <div className="hero-chips">
            {HERO_CHIPS.map((chip) => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="card hero-panel">
          <h2 className="right-panel-title">Why this profile stands out</h2>

          <div className="hero-list">
            {FIT_ITEMS.map((item) => (
              <div key={item.title} className="hero-list-item">
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}