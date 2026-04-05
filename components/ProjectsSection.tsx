type WorkCard = {
  title: string;
  description: string;
  points: string[];
};

type ResumeTrack = {
  title: string;
  description: string;
  href: string;
  tags: string[];
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

const RESUME_TRACKS: ResumeTrack[] = [
  {
    title: "Endpoint Security Resume",
    description:
      "Use this for Endpoint Security Engineer, EDR/XDR, Threat Investigation, or security product support roles.",
    href: "/resumes/Rutvik-Chavda-Endpoint-Security-Resume.pdf",
    tags: ["Endpoint", "EDR/XDR", "Investigation"],
  },
  {
    title: "Technical Support Resume",
    description:
      "Use this for L2/L3 Support Engineer, enterprise SaaS support, escalation-heavy, and incident management roles.",
    href: "/resumes/Rutvik-Chavda-Technical-Support-Resume.pdf",
    tags: ["L2/L3", "SaaS", "Incident Management"],
  },
  {
    title: "Cloud / Security Operations Resume",
    description:
      "Use this for cloud security, SIEM, SOC, and hybrid cloud support opportunities.",
    href: "/resumes/Rutvik-Chavda-Cloud-Security-Resume.pdf",
    tags: ["Cloud", "Splunk", "Security Operations"],
  },
];

export default function ProjectsSection() {
  return (
    <section id="work" className="section">
      <div className="container stack-24">
        <div>
          <p className="section-kicker">SELECTED WORK AREAS</p>
          <h2 className="section-title">
            Better than generic projects: <span>real work alignment</span>
          </h2>
          <p className="section-copy">
            Since this portfolio is for hiring impact, these cards focus on the
            kinds of technical work I actually handle rather than fake demo
            projects.
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

        <div style={{ marginTop: "8px" }}>
          <p className="section-kicker">TARGETED RESUMES</p>
          <h2 className="section-title">
            Resume tracks for <span>different job applications</span>
          </h2>
          <p className="section-copy">
            One portfolio. Three targeted resumes. This makes your profile look
            cleaner and more intentional to recruiters.
          </p>
        </div>

        <div className="resume-grid">
          {RESUME_TRACKS.map((resume) => (
            <div key={resume.title} className="card resume-card">
              <h3>{resume.title}</h3>
              <p>{resume.description}</p>

              <div className="resume-tags">
                {resume.tags.map((tag) => (
                  <span key={tag} className="resume-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <a href={resume.href} className="btn btn-primary" download>
                Download Resume
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}