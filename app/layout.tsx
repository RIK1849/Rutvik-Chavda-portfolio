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
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}