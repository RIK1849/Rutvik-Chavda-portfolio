const HERO_CHIPS = [
  "3+ Years Enterprise Support",
  "Endpoint Security Specialization",
  "Splunk & Log Analysis",
  "Top 10 Sophos Support FY24",
];

const FIT_ITEMS = [
  {
    title: "Endpoint Security",
    description:
      "Strong alignment for endpoint security engineering, EDR/XDR support, policy troubleshooting, and security-focused technical support roles.",
  },
  {
    title: "Incident Handling",
    description:
      "Experienced in L2/L3 case ownership, structured triage, escalation management, remediation validation, and customer-facing resolution work.",
  },
  {
    title: "Investigation Depth",
    description:
      "Hands-on with Splunk, Windows Event Logs, Sysmon, endpoint telemetry, suspicious activity review, and evidence-based troubleshooting.",
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
            I support enterprise customers across endpoint security,
            investigation-driven troubleshooting, and high-priority incident
            handling. My strongest fit is where technical depth, structured
            analysis, and customer-facing execution all matter across Windows,
            macOS, Linux, networking, and SaaS environments.
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