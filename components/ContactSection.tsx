const LINKEDIN_URL = "YOUR_LINKEDIN_URL_HERE";

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
            incident-focused engineering, SIEM-aligned operations, and related
            enterprise security environments.
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
            <h3>Resume Download</h3>
            <p>
              <a
                href="/resumes/Rutvik-Chavda-Technical-Support-Resume.pdf"
                download
              >
                Download current primary resume
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}