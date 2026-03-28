import React from "react";

const CERTIFICATIONS = [
  "Sophos Central - Certified Support Engineer",
  "Sophos Certified Endpoint Security Engineer",
  "Sophos Central - Certified Engineer",
  "TCS iON - Career Edge Young Professional",
  "Introduction to Cyber Security",
  "Introduction to CISSP Security Assessment",
];

const SPECIALTIES = [
  {
    title: "Threat Detection & Investigation",
    body:
      "Hands-on work across endpoint telemetry, suspicious process validation, malware triage, and escalation-focused investigation workflows.",
  },
  {
    title: "Endpoint Policy & Product Troubleshooting",
    body:
      "Experience with web control, application control, device encryption, cloud-managed policies, and structured root cause analysis.",
  },
  {
    title: "Cross-Platform Security Support",
    body:
      "Support coverage across Windows, macOS, and Linux environments in enterprise, hybrid, and customer-specific deployments.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <p className="section-label">ABOUT</p>
        <h2 className="section-title">
          Cyber Operations <span>Profile</span>
        </h2>

        <div className="about-layout">
          <div className="panel about-main">
            <p>
              I am Rutvik Chavda, an endpoint security professional with
              experience supporting enterprise customers in high-pressure,
              escalation-driven environments.
            </p>
            <p>
              My work combines deep product troubleshooting with practical
              security operations. I investigate malware alerts, suspicious
              activity, endpoint instability, policy conflicts, and complex
              support cases that require clean analysis and technical precision.
            </p>
            <p>
              I am targeting roles in endpoint security engineering, technical
              support engineering, SOC operations, threat analysis, and incident
              response where I can contribute both operational depth and strong
              customer-facing execution.
            </p>
          </div>

          <div className="panel cert-panel">
            <h3 className="card-title">Selected Certifications</h3>
            <div className="cert-stack">
              {CERTIFICATIONS.map((item) => (
                <div key={item} className="cert-chip">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="specialty-grid">
          {SPECIALTIES.map((item) => (
            <div key={item.title} className="panel specialty-card">
              <h3 className="card-title">{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}