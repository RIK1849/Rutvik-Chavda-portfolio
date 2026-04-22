import type { Metadata } from 'next'
import { Share_Tech_Mono, Orbitron, Rajdhani } from 'next/font/google'
import './globals.css'

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const orbitron = Orbitron({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const rajdhani = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rutvik Chavda — Endpoint Security Engineer',
  description: 'L2/L3 Endpoint Security & XDR Engineer | Sophos | EDR | Threat Hunting | Live Discover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${shareTechMono.variable} ${orbitron.variable} ${rajdhani.variable}`}>
      <body>{children}</body>
    </html>
  )
}
