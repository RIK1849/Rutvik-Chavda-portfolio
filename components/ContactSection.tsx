const LINKEDIN_URL = "https://www.linkedin.com/in/rutvik-chavda-584b37197/";

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container stack-24">
        <div>
          <p className="section-kicker">CONTACT</p>

          <h2 className="section-title">
            Ready for the <span>next strong opportunity</span>
          </h2>

          <p className="section-copy">
            I am open to roles in endpoint security, technical support,
            incident-focused engineering, and security operations aligned
            environments where strong troubleshooting, ownership, and clear
            communication matter.
          </p>
        </div>

        <div className="contact-grid">
          <div className="card contact-card">
            <h3>Email</h3>
            <p>
              <a href="mailto:chavdarutvik1849@gmail.com">
                chavdarutvik1849@gmail.com
              </a>
            </p>
          </div>

          <div className="card contact-card">
            <h3>Phone</h3>
            <p>
              <a href="tel:+917226894089">+91 7226894089</a>
            </p>
          </div>

          <div className="card contact-card">
            <h3>Location</h3>
            <p>Ahmedabad, Gujarat, India</p>
          </div>

          <div className="card contact-card">
            <h3>LinkedIn</h3>
            <p>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                View LinkedIn Profile
              </a>
            </p>
          </div>

          <div className="card contact-card">
            <h3>Primary Focus</h3>
            <p>Endpoint Security, L2/L3 Support, Incident Management, Splunk</p>
          </div>

          <div className="card contact-card">
            <h3>Current Role</h3>
            <p>Technical Support Engineer, Endpoint Security at Sophos</p>
          </div>
        </div>
      </div>
    </section>
  );
}