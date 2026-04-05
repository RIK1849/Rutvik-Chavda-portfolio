const AWARDS = [
  {
    title: "Sophos Support Team Top 10 FY24",
    description:
      "Recognized among the top 10 support engineers globally based on case quality, CSAT, SLA adherence, and internal knowledge contribution.",
  },
  {
    title: "Top 2 Sophos Community Staff Contributor FY25",
    description:
      "Ranked among the top staff contributors globally for detailed and technically accurate support content across Sophos products.",
  },
  {
    title: "Sophos Community Staff Spotlight",
    description:
      "Featured for sustained technical contribution, strong product expertise, and helpful engagement with the global Sophos community.",
  },
];

export default function AwardsSection() {
  return (
    <section id="awards" className="section">
      <div className="container stack-24">
        <div>
          <p className="section-kicker">AWARDS & RECOGNITION</p>
          <h2 className="section-title">
            Recognition that adds <span>real proof</span>
          </h2>
          <p className="section-copy">
            These recognitions are the strongest trust signals on the portfolio,
            so they should stay visible and easy to read.
          </p>
        </div>

        <div className="awards-grid">
          {AWARDS.map((award) => (
            <div key={award.title} className="card award-card">
              <h3>{award.title}</h3>
              <p>{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}