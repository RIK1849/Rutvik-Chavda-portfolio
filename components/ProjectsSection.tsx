import React from "react";

const PROJECTS = [
  {
    tag: "Operational Work",
    title: "Endpoint Threat Investigation Support",
    text:
      "Worked on endpoint threat investigations involving suspicious activity, malware alerts, ransomware-related cases, and remediation validation in customer environments.",
  },
  {
    tag: "Operational Work",
    title: "Escalation Handling and Case Ownership",
    text:
      "Owned and progressed complex technical support cases with a focus on structured troubleshooting, investigation quality, and clear communication.",
  },
  {
    tag: "Operational Work",
    title: "Defect Reproduction and Validation Support",
    text:
      "Collaborated with engineering teams by helping reproduce product issues, validate behavior, and organize evidence for deeper analysis.",
  },
  {
    tag: "Learning / Lab",
    title: "Splunk and Security Operations Skill Development",
    text:
      "Built practical familiarity with SIEM workflows, endpoint log analysis, and investigation concepts to strengthen alignment with security operations and detection-focused roles.",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="section-kicker">PROJECTS & HIGHLIGHTS</p>
        <h2 className="section-title">
          Work Presented in a More <span>Credible Way</span>
        </h2>

        <div className="projects-grid">
          {PROJECTS.map((item) => (
            <article key={item.title} className="card project-card">
              <span className="badge">{item.tag}</span>
              <h3 className="card-title">{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
