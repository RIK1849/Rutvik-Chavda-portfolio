type Certification = {
  title: string;
  issuer: string;
};

const CERTIFICATIONS: Certification[] = [
  { title: "Sophos Central Certified Architect", issuer: "Sophos" },
  { title: "Sophos Central Certified Engineer", issuer: "Sophos" },
  { title: "Sophos Certified Endpoint Security Engineer", issuer: "Sophos" },
  { title: "Sophos Central Support Engineer", issuer: "Sophos" },
  { title: "Essentials with Azure Fundamentals", issuer: "Coursera" },
  { title: "Ethical Hacking From Scratch", issuer: "Udemy" },
  { title: "Introduction to Cyber Security", issuer: "SkillUp" },
  { title: "CISSP Security Assessment", issuer: "SkillUp" },
  {
    title: "The Absolute Guide to MITRE ATT&CK",
    issuer: "Purple Academy by Picus Security",
  },
  { title: "Introduction to SIEM (Splunk)", issuer: "EDUCBA" },
  { title: "Splunk Administration and Advanced Topics", issuer: "Coursera" },
  {
    title: "SIEM Splunk Hands-On Guide Specialization",
    issuer: "Coursera",
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section">
      <div className="container stack-24">
        <div>
          <p className="section-kicker">CERTIFICATIONS</p>

          <h2 className="section-title">
            Certifications that strengthen my <span>security foundation</span>
          </h2>

          <p className="section-copy">
            These certifications reflect continued learning across endpoint
            security, investigation, cloud fundamentals, and SIEM-related
            skills that support my practical experience.
          </p>
        </div>

        <div className="cert-grid">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.title} className="card cert-card">
              <span className="cert-mark" aria-hidden="true">
                ✓
              </span>

              <div>
                <span className="cert-text">{cert.title}</span>
                <span className="cert-issuer">{cert.issuer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}