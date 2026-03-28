"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const LINKS = [
  {
    label: "Email",
    value: "chavdarutvik1849@gmail.com",
    href: "mailto:chavdarutvik1849@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 7226894089",
    href: "tel:+917226894089",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rutvikchavda-584b37197",
    href: "https://www.linkedin.com/in/rutvikchavda-584b37197/",
  },
  {
    label: "GitHub",
    value: "github.com/RIK1849",
    href: "https://github.com/RIK1849",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          access_key: "9f72abfd-a57b-4428-96e0-0f935d46f6b1",
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      const result: { success?: boolean } = await response.json();

      if (result.success) {
        setStatus("sent");
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <p className="section-kicker">CONTACT</p>
        <h2 className="section-title">
          Open to the Right <span>Opportunity</span>
        </h2>

        <div className="contact-grid">
          <div className="card contact-info-card">
            <h3 className="card-title">What I&apos;m Open To</h3>
            <p>
              I&apos;m currently open to Technical Support Engineer, Endpoint
              Security Engineer, Security Operations, and Incident Response
              aligned roles.
            </p>
            <p>
              The strongest fit is where endpoint security depth, enterprise
              troubleshooting, and hands-on investigation work all matter.
            </p>

            <div className="contact-link-stack">
              {LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="contact-link"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="contact-link-label">{item.label}</span>
                  <span className="contact-link-value">{item.value}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="card contact-form-card">
            {status === "sent" ? (
              <div className="sent-state">
                <div className="sent-check">✓</div>
                <h3 className="card-title">Message Sent</h3>
                <p>Thanks for reaching out. I&apos;ll respond as soon as possible.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="field-grid">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Role or opportunity"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the role, team, or opportunity..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary submit-btn" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
