const HIGHLIGHTS = [
  {
    title: "Enterprise case ownership",
    description:
      "Handled complex P1/P2 incidents with structured triage, escalation handling, workaround validation, and customer communication.",
  },
  {
    title: "Security-focused troubleshooting",
    description:
      "Worked across endpoint security products, policy behavior, telemetry, update failures, and protection incidents.",
  },
  {
    title: "Cross-functional execution",
    description:
      "Partnered with Engineering, QA, Product, and SRE teams using evidence-based escalation and reproducible diagnostics.",
  },
  {
    title: "Clear communication",
    description:
      "Translate technical findings into practical next steps for customers, internal teams, and incident stakeholders.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container grid-2">
        <div className="card info-card">
          <p className="section-kicker">ABOUT ME</p>
          <h2 className="section-title">
            Built for <span>high-trust support and security work</span>
          </h2>
          <p className="section-copy">
            I come from a hands-on technical support and endpoint security
            background where speed, clarity, and correctness matter. My work is
            centered around investigating issues deeply, isolating root cause,
            validating fixes, and helping enterprise customers move from problem
            to resolution with confidence.
          </p>
        </div>

        <div className="card info-card">
          <h3>What I bring</h3>

          <div className="highlight-list">
            {HIGHLIGHTS.map((item) => (
              <div key={item.title} className="highlight-item">
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