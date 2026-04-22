'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { label: 'Cases Resolved', value: '2000+', color: '#00ff88' },
  { label: 'SLA Adherence', value: '99.2%', color: '#00d4ff' },
  { label: 'CSAT Score', value: '4.9/5', color: '#f5c842' },
  { label: 'Global Rank', value: 'Top 10', color: '#a855f7' },
]

const TAGS = [
  'Sophos Central', 'Intercept X', 'XDR', 'EDR', 'Data Lake',
  'Live Discover', 'Threat Hunting', 'Forensic Triage',
  'Windows', 'macOS', 'Linux', 'PowerShell', 'Bash',
  'SQL Analytics', 'Incident Response', 'Root Cause Analysis',
]

const FACTS = [
  ['LOCATION', 'Jamnagar, Gujarat, India'],
  ['ORGANISATION', 'Sophos'],
  ['SPECIALISATION', 'Endpoint Security & XDR'],
  ['PLATFORMS', 'Windows · macOS · Linux'],
  ['LANGUAGES', 'PowerShell · Bash · SQL'],
]

export default function AboutSection() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.05 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const anim = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  })

  return (
    <section id="about" ref={sectionRef} style={{ background: '#00010a', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #00ff8833, transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div style={{ ...anim(0), marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#00ff88' }} />
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#00ff88', letterSpacing: 4 }}>01 · IDENTITY</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-orbitron), monospace', fontWeight: 900, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', letterSpacing: -1 }}>
            WHO AM I<span style={{ color: '#00ff88' }}>.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

          {/* Left */}
          <div>
            <div style={{ ...anim(0.1), border: '1px solid rgba(0,255,136,0.2)', background: 'rgba(0,255,136,0.03)', borderRadius: 4, padding: 32, marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #00ff88, #00d4ff, transparent)' }} />
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 24 }}>
                <div style={{ width: 72, height: 72, border: '2px solid #00ff88', borderRadius: 4, background: 'linear-gradient(135deg,#001a0f,#003322)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 20px rgba(0,255,136,0.2)', fontSize: 32 }}>🛡️</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-orbitron), monospace', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Rutvik Chavda</div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#00ff88', letterSpacing: 2, marginBottom: 6 }}>L2/L3 ENDPOINT SECURITY ENGINEER</div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: 1 }}>Sophos · Jamnagar, Gujarat, India</div>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-rajdhani), sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: 16, fontWeight: 300 }}>
                Specialised L2/L3 Endpoint Security and Technical Support Engineer with deep expertise in Sophos Central, Intercept X, XDR, Data Lake, and Live Discover. I investigate, hunt, and neutralise threats across enterprise Windows, macOS, and Linux environments.
              </p>
              <p style={{ fontFamily: 'var(--font-rajdhani), sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, fontWeight: 300 }}>
                From EDR telemetry analysis and SQL-based log forensics to advanced root-cause investigations and scalable remediation strategies — I operate at the intersection of deep technical precision and enterprise security architecture.
              </p>
            </div>

            <div style={anim(0.2)}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'rgba(0,255,136,0.5)', letterSpacing: 3, marginBottom: 14 }}>DOMAIN TAGS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TAGS.map(tag => (
                  <span key={tag} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'rgba(0,255,136,0.7)', border: '1px solid rgba(0,255,136,0.18)', background: 'rgba(0,255,136,0.05)', padding: '4px 10px', borderRadius: 2, letterSpacing: 1 }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {STATS.map((stat, i) => (
              <div key={stat.label} style={{ ...anim(0.15 + i * 0.1), border: `1px solid ${stat.color}22`, background: `${stat.color}07`, borderRadius: 4, padding: '24px 28px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 1, background: `linear-gradient(90deg, ${stat.color}, transparent)` }} />
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: `${stat.color}88`, letterSpacing: 3, marginBottom: 8 }}>{stat.label}</div>
                <div style={{ fontFamily: 'var(--font-orbitron), monospace', fontSize: 36, fontWeight: 900, color: stat.color }}>{stat.value}</div>
              </div>
            ))}

            <div style={{ ...anim(0.55), border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', borderRadius: 4, padding: '20px 24px' }}>
              {FACTS.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'rgba(0,255,136,0.45)', letterSpacing: 2 }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-rajdhani), sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}