import React from "react";

const PROFILE_POINTS = [
  "Technical Support Engineer with strong Endpoint Security specialization.",
  "Hands-on experience supporting enterprise customers across Windows, macOS, and Linux.",
  "Focused on threat investigation, escalation handling, root cause analysis, and structured troubleshooting.",
  "Positioned for Technical Support Engineer, Endpoint Security Engineer, Security Operations, and Incident Response aligned roles.",
];

const FOCUS_AREAS = [
  {
    title: "Enterprise Endpoint Support",
    text:
      "Support experience in customer-facing environments where resolution quality, case ownership, and escalation handling matter.",
  },
  {
    title: "Threat Investigation",
    text:
      "Investigation of malware, ransomware, suspicious activity, and endpoint events using telemetry, logs, and supporting artifacts.",
  },
  {
    title: "Engineering Collaboration",
    text:
      "Defect reproduction support, validation testing, documentation, and structured handoff for deeper product investigation.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <p className="section-kicker">ABOUT</p>
        <h2 className="section-title">
          A Clear and Credible <span>Profile</span>
        </h2>

        <div className="about-grid">
          <div className="card about-main">
            <h3 className="card-title">Who I Am</h3>
            <p className="section-copy">
              I&apos;m Rutvik Chavda, a Technical Support Engineer with strong
              specialization in endpoint security. My background sits at the
              intersection of enterprise support, endpoint investigation, and
              escalation-driven troubleshooting.
            </p>
            <p className="section-copy">
              I work on complex support cases involving endpoint protection,
              threat investigation, policy-related issues, incident triage, and
              remediation validation. My experience is strongest in environments
              where technical depth, structured analysis, and customer-facing
              execution all matter.
            </p>

            <div className="bullet-stack">
              {PROFILE_POINTS.map((item) => (
                <div key={item} className="bullet-item">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="about-side">
            {FOCUS_AREAS.map((item) => (
              <div key={item.title} className="card focus-card">
                <h3 className="card-title">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
