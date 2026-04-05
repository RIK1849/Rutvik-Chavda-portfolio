import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rutvik Chavda | Endpoint Security | Technical Support | Splunk",
  description:
    "Rutvik Chavda is a Technical Support Engineer specializing in endpoint security, enterprise support, incident handling, Splunk, EDR/XDR investigation, and troubleshooting across Windows, macOS, Linux, and SaaS environments.",
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