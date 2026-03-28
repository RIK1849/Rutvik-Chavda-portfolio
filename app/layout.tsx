import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rutvik Chavda | Technical Support Engineer | Endpoint Security",
  description:
    "Rutvik Chavda - Technical Support Engineer with Endpoint Security specialization across EDR/XDR, threat investigation, incident response, and enterprise support.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
