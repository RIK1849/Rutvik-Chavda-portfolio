"use client";
import React, { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "9f72abfd-a57b-4428-96e0-0f935d46f6b1", // ⚠️ YOU MUST REPLACE THIS LINE
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" }); // Clears the form
      } else {
        console.log("Error sending message", result);
        setStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("idle");
      alert("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <p className="sec-label">CONTACT</p>
        <h2 className="sec-title">Get In <span>Touch</span></h2>

        <div className="con-grid">
          {/* INFO */}
          <div>
            <p className="con-p">
              Open to senior security engineering roles, threat intelligence positions,
              and XDR/MDR opportunities — including at Google, Microsoft, CrowdStrike, Palo Alto Networks,
              and leading MSSPs. Based in Ahmedabad, Gujarat — open to relocation and remote.
            </p>

            <div className="con-links">
              {[
                { icon:"📞", lbl:"PHONE",    val:"+91 722 689 4089",                  href:"tel:+917226894089"},
                { icon:"✉️", lbl:"EMAIL",    val:"chavdarutvik1849@gmail.com",        href:"mailto:chavdarutvik1849@gmail.com"},
                { icon:"💼", lbl:"LINKEDIN", val:"linkedin.com/in/rutvikchavda-584b37197", href:"https://www.linkedin.com/in/rutvik-chavda-584b37197/"},
                { icon:"🐙", lbl:"GITHUB",   val:"github.com/RIK1849",                href:"https://github.com/RIK1849"},
                { icon:"📍", lbl:"LOCATION", val:"Ahmedabad, Gujarat, India",         href:"#"},
              ].map(l => (
                <a key={l.lbl} href={l.href} className="con-link"
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="con-icon">{l.icon}</span>
                  <span className="con-txt">
                    <span className="con-lbl">{l.lbl}</span>
                    <span className="con-val">{l.val}</span>
                  </span>
                  <span className="con-arr">→</span>
                </a>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div>
            {status === "sent" ? (
              <div className="panel" style={{ padding:"3rem", textAlign:"center" }}>
                <div style={{ fontSize:"2rem", marginBottom:"1rem", color:"var(--green)" }}>✓</div>
                <p style={{ fontFamily:"var(--font-hd)", color:"var(--cyan)", fontSize:"1.05rem", marginBottom:".5rem" }}>
                  MESSAGE TRANSMITTED
                </p>
                <p style={{ fontFamily:"var(--font-mono)", fontSize:".72rem", color:"var(--muted)" }}>
                  I&apos;ll respond within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                {(["name","email","subject"] as const).map(field => (
                  <div key={field} className="frm-group">
                    <label className="frm-label" htmlFor={field}>{field.toUpperCase()}</label>
                    <input id={field} name={field} type={field === "email" ? "email" : "text"}
                      className="frm-input" value={form[field as keyof typeof form]} onChange={onChange}
                      placeholder={field === "name" ? "Your Full Name" : field === "email" ? "you@company.com" : "Senior Security Engineer Opportunity"}
                      autoComplete="off"
                    />
                  </div>
                ))}
                <div className="frm-group">
                  <label className="frm-label" htmlFor="message">MESSAGE</label>
                  <textarea id="message" name="message" className="frm-ta"
                    value={form.message} onChange={onChange}
                    placeholder="Tell me about the role or opportunity..."
                  />
                </div>
                <button className="btn-p" style={{ width:"100%", justifyContent:"center" }}
                  onClick={onSubmit} disabled={status === "sending"}
                >
                  <span>{status === "sending" ? "TRANSMITTING..." : "⟶ SEND MESSAGE"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}