import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rutvik Chavda — Endpoint Security Engineer',
  description: 'L2/L3 Endpoint Security & XDR Engineer | Sophos | EDR | Threat Hunting | Live Discover',
  keywords: 'Rutvik Chavda, Endpoint Security, Sophos, Intercept X, XDR, EDR, Threat Hunting, Cybersecurity',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28'>🛡️</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  )
}
