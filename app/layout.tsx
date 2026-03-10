import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rutvik Chavda | Endpoint Security Engineer at Sophos",
  description:
    "Certified Sophos Central Engineer specialising in Endpoint Security, EDR, XDR, MDR, Threat Hunting and Incident Response. Based in Ahmedabad, Gujarat.",
  keywords: [
    "Rutvik Chavda","Sophos","Endpoint Security","EDR","XDR","MDR",
    "Threat Hunting","Incident Response","Sophos Central","Cybersecurity Engineer",
    "Ahmedabad","Gujarat","India",
  ],
  openGraph: {
    title: "Rutvik Chavda | Endpoint Security Engineer",
    description: "Certified Sophos Central Engineer — Defending enterprise endpoints since 2022.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scanlines">{children}</body>
    </html>
  );
}