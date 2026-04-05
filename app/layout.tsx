import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import CyberCommandBackground from "../components/CyberCommandBackground";

export const metadata: Metadata = {
  title: "Rutvik Chavda | Endpoint Security Engineer | EDR/XDR | Splunk",
  description:
    "Rutvik Chavda is an Endpoint Security Engineer with 3+ years of experience across endpoint security, EDR/XDR investigations, incident response, Splunk, and advanced technical support. Currently open to opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CyberCommandBackground />

        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: `
              radial-gradient(circle at 15% 18%, rgba(56,189,248,0.10), transparent 28%),
              radial-gradient(circle at 82% 20%, rgba(0,255,157,0.08), transparent 22%),
              radial-gradient(circle at 50% 100%, rgba(56,189,248,0.05), transparent 30%)
            `,
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.08,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            maskImage:
              "radial-gradient(circle at center, black 35%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 35%, transparent 100%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}