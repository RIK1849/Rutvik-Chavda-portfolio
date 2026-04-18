import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rutvik Chavda — Endpoint Security Engineer | EDR/XDR · Incident Response · Threat Hunting",
  description:
    "Rutvik Chavda — L2/L3 Endpoint Security Engineer with 3+ years at Sophos specialising in EDR/XDR, Incident Response, and Threat Hunting across Windows, macOS, and Linux. Ranked Top 10 globally FY25. Expertise in Sophos Intercept X, Sophos Central, Live Discover, MITRE ATT&CK, Splunk SIEM, and Windows forensics.",
  keywords: [
    "Endpoint Security Engineer", "EDR", "XDR", "Sophos Intercept X", "Sophos Central",
    "Incident Response", "Threat Hunting", "MITRE ATT&CK", "Live Discover",
    "Splunk SIEM", "Windows Event Logs", "Sysmon", "Malware Analysis",
    "Ransomware Response", "Root Cause Analysis", "PowerShell", "Python",
    "AWS", "Azure", "Security Operations", "SOC", "Threat Detection",
    "Rutvik Chavda", "Ahmedabad", "Cybersecurity Engineer",
  ].join(", "),
  authors: [{ name: "Rutvik Chavda" }],
  creator: "Rutvik Chavda",
  openGraph: {
    title: "Rutvik Chavda — Endpoint Security Engineer",
    description: "L2/L3 Endpoint Security Engineer · EDR/XDR · Incident Response · Threat Hunting · Sophos Top 10 FY25",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rutvik Chavda — Endpoint Security Engineer",
    description: "EDR/XDR · Incident Response · Threat Hunting · Top 10 Globally FY25",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}