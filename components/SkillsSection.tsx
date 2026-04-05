type SkillGroup = {
  title: string;
  items: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Endpoint Security Platforms",
    items: [
      "Sophos Central",
      "Intercept X",
      "Sophos EDR/XDR",
      "Sophos MDR",
      "Sophos Mobile",
      "Endpoint Policy Troubleshooting",
    ],
  },
  {
    title: "Investigation & Log Analysis",
    items: [
      "Splunk",
      "Windows Event Logs",
      "Sysmon",
      "Endpoint Telemetry",
      "Process Tree Analysis",
      "IOC / IOA Review",
      "Registry Analysis",
      "Live Discover (SQL)",
    ],
  },
  {
    title: "Networking & Integrations",
    items: [
      "TCP/IP",
      "DNS",
      "HTTP/HTTPS",
      "TLS/SSL",
      "VPN",
      "Proxy",
      "REST APIs",
      "JSON",
      "XML",
    ],
  },
  {
    title: "Operating Systems & Scripting",
    items: [
      "Windows",
      "Windows Server",
      "macOS",
      "Linux",
      "PowerShell",
      "Python",
      "Bash",
      "Azure Fundamentals",
    ],
  },
  {
    title: "Support Operations",
    items: [
      "L2/L3 Support",
      "Incident Management",
      "SLA Adherence",
      "Case Ownership",
      "Escalation Management",
      "Troubleshooting Runbooks",
      "Knowledge Base Writing",
      "Customer Communication",
    ],
  },
  {
    title: "Security Methods & Frameworks",
    items: [
      "MITRE ATT&CK",
      "Structured Triage",
      "Remediation Validation",
      "Root Cause Analysis",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container stack-24">
        <div>
          <p className="section-kicker">CORE SKILLS</p>

          <h2 className="section-title">
            Technical strengths across{" "}
            <span>security, support, and investigation</span>
          </h2>

          <p className="section-copy">
            My skill set is strongest across endpoint security, incident-driven
            troubleshooting, investigation workflows, enterprise support, and
            technical analysis in customer-facing environments.
          </p>
        </div>

        <div className="grid-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="card skill-card">
              <h3>{group.title}</h3>

              <div className="tag-row">
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}