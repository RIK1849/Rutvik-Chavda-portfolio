import React from "react";

const AWARDS = [
  "Sophos Support Team Top 10 FY24",
  "Top 2 Sophos Community Staff Contributor FY25",
  "Top 3 Globally — Sophos Community Staff Contributor FY25",
  "Sophos Community Staff Spotlight",
];

export default function AwardsSection() {
  return (
    <section id="awards" className="section">
      <div className="container">
        <p className="section-kicker">AWARDS & RECOGNITION</p>
        <h2 className="section-title">
          Recognition Already Earned Through <span>Real Work</span>
        </h2>

        <div className="awards-grid">
          {AWARDS.map((item) => (
            <div key={item} className="card award-card">
              <div className="award-icon">★</div>
              <div className="award-text">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
