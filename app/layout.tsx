import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rutvik Chavda | Endpoint Security Engineer",
  description:
    "Rutvik Chavda - Endpoint Security Engineer focused on EDR/XDR, threat investigation, incident response, and enterprise endpoint security.",
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