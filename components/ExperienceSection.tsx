import React from "react";

type Entry = {
  title: string;
  company: string;
  period: string;
  loc: string;
  bullets: string[];
  tags: string[];
};

const EXPERIENCE: Entry[] = [
  {
    title: "Technical Support Engineer — Endpoint Security",
    company: "Sophos",
    period: "January 2023 – Present",
    loc: "Ahmedabad, Gujarat, India",
    bullets: [
      "Handle advanced endpoint security escalations for enterprise customers across EMEA, APAC, and the Americas.",
      "Investigate malware, ransomware, suspicious processes, and detection anomalies across Windows, macOS, and Linux.",
      "Use endpoint telemetry, Windows Event Logs, Sysmon, and process analysis to validate activity and support root cause analysis.",
      "Work with Sophos Central, EDR/XDR workflows, and threat-hunting queries to support triage, containment, and remediation validation.",
      "Collaborate with Engineering on issue reproduction, escalation evidence, validation steps, and troubleshooting outcomes.",
      "Create technical notes, repeatable investigation steps, and internal knowledge content to improve case quality and consistency.",
    ],
    tags: [
      "Sophos Central",
      "EDR/XDR",
      "Malware Investigation",
      "Ransomware Response",
      "Windows",
      "macOS",
      "Linux",
      "Sysmon",
      "Splunk",
      "MITRE ATT&CK",
      "Root Cause Analysis",
      "P1/P2 Escalations",
    ],
  },
];

const EDUCATION: Entry[] = [
  {
    title: "Bachelor of Technology — Computer Engineering",
    company: "Ganpat University · U.V. Patel College of Engineering",
    period: "July 2019 – June 2023",
    loc: "Mehsana, Gujarat, India",
    bullets: [
      "Built a foundation in networking, operating systems, cybersecurity fundamentals, and software engineering.",
      "Worked on hands-on technical projects using C#, Java, Kotlin, and Firebase.",
    ],
    tags: [
      "Computer Engineering",
      "Networking",
      "Cybersecurity Fundamentals",
      "Software Development",
    ],
  },
];

function TimelineBlock({
  title,
  items,
}: {
  title: string;
  items: Entry[];
}) {
  return (
    <div className="panel" style={{ marginBottom: "1.5rem" }}>
      <p className="tl-head">{title}</p>

      {items.map((item) => (
        <div key={`${item.title}-${item.period}`} className="tl-item">
          <h3 className="tl-title">{item.title}</h3>
          <p className="tl-meta">
            {item.company} · {item.loc}
          </p>
          <p className="tl-period">{item.period}</p>

          <ul className="tl-bullets">
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          <div className="tag-row">
            {item.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <p className="sec-label">EXPERIENCE</p>
        <h2 className="sec-title">
          Career <span>Timeline</span>
        </h2>

        <TimelineBlock title="▸ WORK EXPERIENCE" items={EXPERIENCE} />
        <TimelineBlock title="▸ EDUCATION" items={EDUCATION} />
      </div>
    </section>
  );
}