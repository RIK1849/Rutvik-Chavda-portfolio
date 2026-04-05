const HERO_CHIPS = [
  "Open to Opportunities",
  "3+ Years Experience",
  "Endpoint Security",
  "Splunk & Investigation",
];

const FIT_ITEMS = [
  {
    title: "Endpoint Security",
    description:
      "Strong alignment for endpoint security engineering, EDR/XDR support, policy troubleshooting, and security-focused technical roles.",
  },
  {
    title: "Incident Response Support",
    description:
      "Hands-on experience across escalations, structured triage, investigation workflows, remediation validation, and customer-facing resolution.",
  },
  {
    title: "Investigation Depth",
    description:
      "Worked with Splunk, endpoint telemetry, Windows Event Logs, Sysmon, suspicious activity review, and evidence-based troubleshooting.",
  },
];

export default function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="card hero-panel">
          <p className="hero-kicker">
            OPEN TO OPPORTUNITIES | ENDPOINT SECURITY | INCIDENT RESPONSE
          </p>

          <h1 className="hero-title">
            Rutvik <span>Chavda</span>
          </h1>

          <p className="hero-subtitle">
            Endpoint Security Engineer | EDR/XDR | Incident Response | Splunk |
            Technical Support Engineer
          </p>

          <p className="hero-copy">
            I am an Endpoint Security Engineer with 3+ years of experience
            across endpoint security, EDR/XDR investigations, incident
            response, and advanced technical troubleshooting. My background
            includes working across Windows, macOS, and Linux to investigate
            suspicious activity, validate remediation, troubleshoot policy and
            product issues, and support enterprise customers through critical
            escalations.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
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