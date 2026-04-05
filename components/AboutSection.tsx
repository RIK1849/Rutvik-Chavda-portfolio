type Highlight = {
  title: string;
  description: string;
};

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Enterprise support ownership",
    description:
      "Trusted to handle complex customer issues with structured troubleshooting, strong follow-up, and end-to-end case ownership.",
  },
  {
    title: "Practical security depth",
    description:
      "Hands-on across endpoint security, policy behavior, update failures, telemetry analysis, and protection-related troubleshooting.",
  },
  {
    title: "Evidence-based escalation",
    description:
      "Collaborate with Engineering, QA, Product, and internal teams using reproducible diagnostics, validated logs, and technical evidence.",
  },
  {
    title: "Clear stakeholder communication",
    description:
      "Translate complex technical findings into practical updates, next steps, and resolution guidance for customers and internal teams.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container grid-2">
        <div className="card info-card">
          <p className="section-kicker">ABOUT ME</p>

          <h2 className="section-title">
            Built for <span>trust, technical depth, and execution</span>
          </h2>

          <p className="section-copy">
            I come from a hands-on endpoint security and enterprise support
            background where technical accuracy, ownership, and communication
            matter every day. My work focuses on solving complex customer
            issues, isolating root cause, validating fixes, and driving
            resolution in a way that is both technically sound and easy for
            stakeholders to follow.
          </p>
        </div>

        <div className="card info-card">
          <h3>Core strengths</h3>

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