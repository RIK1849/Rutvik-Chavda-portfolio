import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import ThreatRadarBackground from "../components/ThreatRadarBackground";

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
        <ThreatRadarBackground />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}