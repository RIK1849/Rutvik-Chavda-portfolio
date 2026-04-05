type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  points: string[];
};

const EXPERIENCE: ExperienceItem[] = [
  {
    period: "July 2023 – March 2026 | Ahmedabad, India",
    role: "Technical Support Engineer – Endpoint Security",
    company: "Sophos",
    points: [
      "Provided advanced technical support for endpoint security solutions across enterprise environments, supporting Windows, macOS, and Linux systems.",
      "Investigated and resolved complex issues related to product behavior, policy enforcement, deployment, updates, and endpoint performance.",
      "Analyzed security alerts, system logs, and diagnostic data to identify root causes and recommend effective remediation steps.",
      "Managed escalated support cases with end-to-end ownership, structured troubleshooting, and consistent customer communication throughout the case lifecycle.",
      "Collaborated with engineering, product, and internal technical teams on issue reproduction, defect validation, fix verification, and long-term resolution.",
      "Maintained accurate case documentation, technical notes, and knowledge sharing to improve support quality and customer experience.",
    ],
  },
  {
    period: "January 2023 – June 2023 | Ahmedabad, India",
    role: "Technical Support Engineer Intern – Endpoint Security",
    company: "Sophos",
    points: [
      "Provided technical support for endpoint security products across enterprise environments, supporting Windows, macOS, and Linux systems.",
      "Assisted in troubleshooting product, policy, deployment, update, and performance-related issues by reviewing logs, diagnostics, and reported behavior.",
      "Supported case handling through documentation, follow-ups, troubleshooting, and coordination with internal teams.",
      "Worked closely with senior engineers to analyze issues, validate findings, and improve resolution quality.",
      "Built practical exposure to endpoint security, customer support operations, and troubleshooting in enterprise environments.",
      "Maintained clear case notes and contributed to internal knowledge sharing to support team efficiency and customer experience.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container stack-24">
        <div>
          <p className="section-kicker">EXPERIENCE</p>

          <h2 className="section-title">
            Experience built on <span>security depth and case ownership</span>
          </h2>

          <p className="section-copy">
            My recent experience is centered around endpoint security,
            enterprise support, escalated issue handling, investigation-driven
            troubleshooting, and close collaboration with engineering and
            internal technical teams.
          </p>
        </div>

        <div className="stack-24">
          {EXPERIENCE.map((item) => (
            <div key={`${item.role}-${item.period}`} className="card timeline-card">
              <div className="timeline-meta">{item.period}</div>

              <h3>{item.role}</h3>
              <h4>{item.company}</h4>

              <ul className="timeline-points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}