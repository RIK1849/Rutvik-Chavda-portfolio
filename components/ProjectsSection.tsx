type WorkCard = {
  title: string;
  description: string;
  points: string[];
};

const WORK_AREAS: WorkCard[] = [
  {
    title: "P1 / P2 Endpoint Incident Ownership",
    description:
      "Handling high-priority enterprise incidents from triage to resolution across cloud, hybrid, and on-premises customer environments.",
    points: [
      "Structured triage and issue isolation",
      "SLA-focused case ownership",
      "Workaround validation and customer communication",
    ],
  },
  {
    title: "EDR / XDR Investigation Support",
    description:
      "Reviewing process trees, registry activity, telemetry, logs, and suspicious behavior to support investigation and remediation workflows.",
    points: [
      "Splunk and endpoint telemetry analysis",
      "IOC / IOA review",
      "Containment and remediation guidance",
    ],
  },
  {
    title: "Policy, Agent, and Integration Troubleshooting",
    description:
      "Diagnosing policy conflicts, update issues, network communication failures, authentication problems, and SaaS integration issues.",
    points: [
      "Windows, macOS, and Linux coverage",
      "API / JSON evidence review",
      "Cross-functional escalation with Engineering",
    ],
  },
];

export default function ProjectsSection() {
  return (
    <section id="work" className="section">
      <div className="container stack-24">
        <div>
          <p className="section-kicker">SELECTED WORK AREAS</p>

          <h2 className="section-title">
            Real work aligned to <span>security, support, and investigation</span>
          </h2>

          <p className="section-copy">
            Instead of showing generic demo projects, this section highlights
            the kinds of technical work I handle in real enterprise support and
            endpoint security environments.
          </p>
        </div>

        <div className="work-grid">
          {WORK_AREAS.map((item) => (
            <div key={item.title} className="card work-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <ul className="work-points">
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