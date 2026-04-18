"use client";
import { useEffect, useRef, useState } from "react";

const CONTACT_LINKS = [
  { label: "Email",     value: "chavdarutvik1849@gmail.com",            href: "mailto:chavdarutvik1849@gmail.com",                color: "#00ff64" },
  { label: "LinkedIn",  value: "https://www.linkedin.com/in/rutvik-chavda-584b37197/", href: "https://www.linkedin.com/in/rutvik-chavda-584b37197/", color: "#38bdf8" },
  { label: "Location",  value: "Ahmedabad, Gujarat, India",             href: "#hero",                                             color: "#f472b6" },
];

export default function ContactSection() {
  const [visible, setVisible] = useState(false);
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<"idle" | "submitting" | "sent">("idle");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData();
    formData.append("access_key", "9f72abfd-a57b-4428-96e0-0f935d46f6b1"); 
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("subject", `New Portfolio Enquiry from ${name}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
        
        // Reset the button state after 4 seconds
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        console.error("Failed to send message");
        setStatus("idle");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("idle");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,255,100,0.03)",
    border: "1px solid rgba(0,255,100,0.2)",
    borderRadius: 6,
    padding: "0.75rem 1rem",
    color: "#f0fff4",
    fontFamily: "'Rajdhani',sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.25s",
  };

  return (
    <section ref={ref} id="contact" className="section" style={{ borderTop: "1px solid rgba(0,255,100,0.06)" }}>
      <div className="container">
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          
          {/* Left Column - Contact Info */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-20px)", transition: "all 0.7s ease" }}>
            <p className="section-kicker">Contact</p>
            <h2 className="section-title">Let&apos;s talk <span>security</span></h2>
            <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem", color: "rgba(240,255,244,0.62)", lineHeight: 1.78, marginBottom: "2.5rem" }}>
              I&apos;m actively looking for roles in Endpoint Security, Threat Detection, and Security Operations.
              If you&apos;re hiring for L2/L3 security engineering, SOC, or threat hunting — I&apos;d like to hear from you.
              Response within 24 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "0.9rem 1.2rem",
                    background: "rgba(0,255,100,0.025)",
                    border: "1px solid rgba(0,255,100,0.12)",
                    borderRadius: 8, textDecoration: "none",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = `${link.color}12`; el.style.borderColor = `${link.color}48`; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(0,255,100,0.025)"; el.style.borderColor = "rgba(0,255,100,0.12)"; }}
                >
                  <div style={{ width: 2, height: 36, background: link.color, borderRadius: 2, flexShrink: 0 }} />
                  <div>
                    <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: link.color, opacity: 0.75, display: "block", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3, fontWeight: 700 }}>
                      {link.label}
                    </span>
                    <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.9rem", color: "rgba(240,255,244,0.78)", fontWeight: 500 }}>
                      {link.value}
                    </span>
                  </div>
                  <span style={{ marginLeft: "auto", color: link.color, opacity: 0.55, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.8rem" }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(20px)", transition: "all 0.7s ease 0.15s" }}>
            <div style={{
              background: "rgba(0,10,5,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(0,255,100,0.14)",
              borderRadius: 12, overflow: "hidden",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.7rem 1rem", borderBottom: "1px solid rgba(0,255,100,0.1)", background: "rgba(0,255,100,0.03)" }}>
                {["#ff5f56", "#ffbd2e", "#27c93f"].map((col, i) => (
                  <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: col, opacity: 0.75, display: "inline-block" }} />
                ))}
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(0,255,100,0.5)", marginLeft: 8, letterSpacing: "0.08em" }}>
                  new-message.sh
                </span>
              </div>

              <form onSubmit={handleSubmit} style={{ padding: "1.6rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(0,255,100,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6, fontWeight: 700 }}>
                    $ Your Name
                  </label>
                  <input
                    type="text" required
                    value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    style={inputStyle}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(0,255,100,0.55)"; }}
                    onBlur={(e)  => { (e.target as HTMLInputElement).style.borderColor = "rgba(0,255,100,0.2)"; }}
                    disabled={status === "submitting"}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(0,255,100,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6, fontWeight: 700 }}>
                    $ Email Address
                  </label>
                  <input
                    type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    style={inputStyle}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(0,255,100,0.55)"; }}
                    onBlur={(e)  => { (e.target as HTMLInputElement).style.borderColor = "rgba(0,255,100,0.2)"; }}
                    disabled={status === "submitting"}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(0,255,100,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6, fontWeight: 700 }}>
                    $ Message
                  </label>
                  <textarea
                    required rows={5}
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about the role..."
                    style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                    onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(0,255,100,0.55)"; }}
                    onBlur={(e)  => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(0,255,100,0.2)"; }}
                    disabled={status === "submitting"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting" || status === "sent"}
                  style={{
                    fontFamily: "'Share Tech Mono',monospace",
                    fontSize: "0.75rem", letterSpacing: "0.12em",
                    color: "#000", 
                    background: status === "sent" ? "#00cc50" : (status === "submitting" ? "#00aa44" : "#00ff64"),
                    border: "none", padding: "0.9rem 1.5rem",
                    borderRadius: 6, cursor: (status === "idle" ? "pointer" : "default"),
                    fontWeight: 700, textTransform: "uppercase",
                    transition: "background 0.2s, transform 0.15s",
                    opacity: status === "submitting" ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => { if(status === "idle") (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { if(status === "idle") (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  {status === "submitting" ? "Sending..." : status === "sent" ? "✓ Message Sent!" : "$ Send Message →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}