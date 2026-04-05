const EXPERIENCE_POINTS = [
  "Own L2/L3 enterprise support and end-to-end resolution of complex P1/P2 endpoint security incidents across cloud, hybrid, and on-premises customer environments.",
  "Troubleshoot agent health, policy behavior, update failures, connectivity issues, authentication workflows, and protection incidents across Windows, macOS, and Linux.",
  "Investigate issues using endpoint telemetry, process trees, system logs, diagnostic artifacts, Splunk, and API / JSON evidence to isolate root cause and confirm impact.",
  "Reproduce complex issues in lab environments and provide validated diagnostics to Engineering for defect tracking, escalation support, and long-term resolution.",
  "Support EDR/XDR investigations by reviewing alerts, registry activity, telemetry, and suspicious process behavior to guide containment, remediation, and recovery steps.",
  "Work across TCP/IP, DNS, HTTP/HTTPS, TLS/SSL, VPN, and proxy troubleshooting when product communication, SaaS connectivity, or endpoint service flows are affected.",
  "Collaborate with Engineering, QA, Product, and SRE teams while maintaining clear customer communication, strong case ownership, and SLA adherence.",
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container stack-24">
        <div>
          <p className="section-kicker">EXPERIENCE</p>

          <h2 className="section-title">
            Experience built on <span>ownership, troubleshooting, and security depth</span>
          </h2>

          <p className="section-copy">
            My current role sits at the intersection of endpoint security,
            enterprise support, escalation handling, and investigation-driven
            troubleshooting. It reflects the kind of work where technical depth,
            structured analysis, and reliable execution matter most.
          </p>
        </div>

        <div className="card timeline-card">
          <div className="timeline-meta">
            January 2023 – Present | Ahmedabad, India
          </div>

          <h3>Technical Support Engineer, Endpoint Security</h3>
          <h4>Sophos</h4>

          <ul className="timeline-points">
            {EXPERIENCE_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}