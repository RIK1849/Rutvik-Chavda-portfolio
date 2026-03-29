import React from "react";

const AWARDS = [
  "Sophos Support Team Top 10 FY24",
  "Ranked #2 among the Top 3 Global Sophos Community Staff Contributors FY25",
  "Sophos Community Staff Spotlight",
];

export default function AwardsSection() {
  return (
    <section id="awards" className="section">
      <div className="container">
        <p className="section-kicker">AWARDS & RECOGNITION</p>
        <h2 className="section-title">
          Recognition Earned Through <span>Real Work</span>
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