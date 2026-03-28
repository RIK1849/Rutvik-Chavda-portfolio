import React from "react";

const CERTIFICATIONS = [
  "Sophos Central Certified Architect",
  "Sophos Central Certified Engineer",
  "Sophos Certified Endpoint Security Engineer",
  "Sophos Central Support Engineer",
  "The Absolute Guide to MITRE ATT&CK — Purple Academy by Picus Security",
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <p className="section-kicker">CERTIFICATIONS</p>
        <h2 className="section-title">
          Certifications that Support My <span>Positioning</span>
        </h2>

        <div className="cert-grid">
          {CERTIFICATIONS.map((item) => (
            <div key={item} className="card cert-card">
              <span className="cert-mark">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
