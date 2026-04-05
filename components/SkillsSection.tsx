type SkillGroup = {
  title: string;
  items: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Security Platforms",
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
    title: "Networking & APIs",
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
    title: "Operating Systems & Automation",
    items: [
      "Windows",
      "Windows Server",
      "macOS",
      "Linux",
      "Azure Fundamentals",
      "PowerShell",
      "Python",
      "Bash",
    ],
  },
  {
    title: "Support & Process",
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
    title: "Frameworks",
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
            Skills aligned to <span>security, support, and investigation</span>
          </h2>
          <p className="section-copy">
            This portfolio is positioned for endpoint security, technical
            support, incident handling, and SIEM-aligned roles.
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