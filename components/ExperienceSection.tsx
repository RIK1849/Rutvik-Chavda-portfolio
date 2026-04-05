const EXPERIENCE_POINTS = [
  "Own L2/L3 enterprise support and end-to-end resolution of complex P1/P2 endpoint security incidents across cloud, hybrid, and on-premises environments.",
  "Troubleshoot agent health, policy behavior, update failures, connectivity issues, authentication flows, and protection incidents across Windows, macOS, and Linux.",
  "Investigate issues using endpoint telemetry, process trees, system logs, diagnostic artifacts, Splunk, and API / JSON evidence to isolate root cause.",
  "Reproduce complex issues in lab environments and provide reproducible diagnostics to Engineering for long-term defect tracking and resolution.",
  "Support EDR/XDR investigations by reviewing alerts, registry activity, telemetry, and suspicious process behavior for containment and remediation guidance.",
  "Work across TCP/IP, DNS, HTTP/HTTPS, TLS/SSL, VPN, and proxy troubleshooting when product communication or SaaS connectivity is impacted.",
  "Collaborate with Engineering, QA, Product, and SRE teams while maintaining strong customer communication and SLA adherence.",
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container stack-24">
        <div>
          <p className="section-kicker">EXPERIENCE</p>
          <h2 className="section-title">
            Current role with <span>strong enterprise support depth</span>
          </h2>
          <p className="section-copy">
            My experience is strongest where endpoint security, deep technical
            troubleshooting, escalation handling, and investigation workflows
            intersect.
          </p>
        </div>

        <div className="card timeline-card">
          <div className="timeline-meta">January 2023 – Present | Ahmedabad, India</div>

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