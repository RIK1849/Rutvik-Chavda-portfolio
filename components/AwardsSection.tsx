const AWARDS = [
  {
    title: "Sophos Support Team Top 10 FY25",
    description:
      "Recognized among the top 10 support engineers globally for strong case quality, customer satisfaction, SLA adherence, and internal knowledge contribution.",
  },
  {
    title: "Top Sophos Staff Community Contributor – CY25 Overall",
    description:
      "Ranked among the top community staff contributors globally for the full calendar year, recognized for sustained technical depth, accuracy, and volume of helpful support content.",
  },
  {
    title: "Top Sophos Staff Community Contributor – CY25 Q2",
    description:
      "Recognized as a top community staff contributor for Q2 CY25 for detailed, technically accurate, and consistently helpful engagement across the Sophos community.",
  },
  {
    title: "Top Sophos Staff Community Contributor – CY25 Q3",
    description:
      "Recognized as a top community staff contributor for Q3 CY25, maintaining high-quality technical contributions and strong community presence.",
  },
  {
    title: "Top Sophos Staff Community Contributor – CY25 Q4",
    description:
      "Recognized as a top community staff contributor for Q4 CY25, sustaining consistent technical output and community engagement through the close of the year.",
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
            and visible contribution beyond day-to-day case handling — across
            both internal rankings and the global Sophos community.
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