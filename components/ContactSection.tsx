"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactItem = {
  icon: string;
  lbl: string;
  val: string;
  href: string;
};

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: "📞",
    lbl: "PHONE",
    val: "+91 722 689 4089",
    href: "tel:+917226894089",
  },
  {
    icon: "✉️",
    lbl: "EMAIL",
    val: "chavdarutvik1849@gmail.com",
    href: "mailto:chavdarutvik1849@gmail.com",
  },
  {
    icon: "🔗",
    lbl: "LINKEDIN",
    val: "linkedin.com/in/rutvikchavda-584b37197",
    href: "https://www.linkedin.com/in/rutvikchavda-584b37197/",
  },
  {
    icon: "💻",
    lbl: "GITHUB",
    val: "github.com/RIK1849",
    href: "https://github.com/RIK1849",
  },
  {
    icon: "📍",
    lbl: "LOCATION",
    val: "Ahmedabad, Gujarat, India",
    href: "#",
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

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      console.error("Fetch error:", error);
      setStatus("idle");
      alert("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <p className="sec-label">CONTACT</p>
        <h2 className="sec-title">
          Get In <span>Touch</span>
        </h2>

        <div className="con-grid">
          <div>
            <p className="con-p">
              I&apos;m open to{" "}
              <strong style={{ color: "var(--cyan)" }}>
                Technical Support Engineer
              </strong>
              ,{" "}
              <strong style={{ color: "var(--cyan)" }}>
                Endpoint Security Engineer
              </strong>
              , and{" "}
              <strong style={{ color: "var(--cyan)" }}>
                Security Operations / Incident Response
              </strong>{" "}
              roles at security-focused companies globally. Based in Ahmedabad,
              Gujarat — open to remote and relocation opportunities.
            </p>

            <p className="con-p" style={{ marginTop: "-.5rem" }}>
              If you&apos;re hiring for roles in endpoint security, EDR/XDR
              investigations, threat analysis, or enterprise security support —
              feel free to reach out directly.
            </p>

            <div className="con-links">
              {CONTACT_ITEMS.map((item) => (
                <a
                  key={item.lbl}
                  href={item.href}
                  className="con-link"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <span className="con-icon">{item.icon}</span>
                  <span className="con-txt">
                    <span className="con-lbl">{item.lbl}</span>
                    <span className="con-val">{item.val}</span>
                  </span>
                  <span className="con-arr">→</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            {status === "sent" ? (
              <div className="panel" style={{ padding: "3rem", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    color: "var(--green)",
                  }}
                >
                  ✓
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-hd)",
                    color: "var(--cyan)",
                    fontSize: "1.05rem",
                    marginBottom: ".5rem",
                  }}
                >
                  MESSAGE TRANSMITTED
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: ".72rem",
                    color: "var(--muted)",
                  }}
                >
                  I&apos;ll respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                {(["name", "email", "subject"] as const).map((field) => (
                  <div key={field} className="frm-group">
                    <label className="frm-label" htmlFor={field}>
                      {field.toUpperCase()}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      className="frm-input"
                      value={form[field]}
                      onChange={onChange}
                      placeholder={
                        field === "name"
                          ? "Your Full Name"
                          : field === "email"
                          ? "you@company.com"
                          : "Endpoint Security Engineer Opportunity"
                      }
                      autoComplete="off"
                      required
                    />
                  </div>
                ))}

                <div className="frm-group">
                  <label className="frm-label" htmlFor="message">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="frm-ta"
                    value={form.message}
                    onChange={onChange}
                    placeholder="Tell me about the role or opportunity..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-p"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={status === "sending"}
                >
                  <span>
                    {status === "sending" ? "TRANSMITTING..." : "⟶ SEND MESSAGE"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}