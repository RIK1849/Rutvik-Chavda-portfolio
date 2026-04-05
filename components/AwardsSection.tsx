const AWARDS = [
  {
    title: "Sophos Support Team Top 10 FY24",
    description:
      "Recognized among the top support engineers globally for strong case quality, customer satisfaction, SLA adherence, and internal knowledge contribution.",
  },
  {
    title: "Top 2 Sophos Community Staff Contributor FY25",
    description:
      "Ranked among the top community staff contributors globally for detailed, technically accurate, and consistently helpful support content.",
  },
  {
    title: "Sophos Community Staff Spotlight",
    description:
      "Featured for sustained technical contribution, strong product understanding, and valuable support to the global Sophos community.",
  },
];

export default function AwardsSection() {
  return (
    <section id="awards" className="section">
      <div className="container stack-24">
        <div>
          <p className="section-kicker">AWARDS & RECOGNITION</p>

          <h2 className="section-title">
            Recognition that adds <span>credibility and proof</span>
          </h2>

          <p className="section-copy">
            These recognitions reflect consistent performance, technical depth,
            and visible contribution beyond day-to-day case handling.
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