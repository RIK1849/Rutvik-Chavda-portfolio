'use client'
import { useEffect, useRef, useState } from 'react'

const CERTS = [
  {
    id: 'SCS-001',
    name: 'Sophos Certified Engineer',
    issuer: 'Sophos',
    domain: 'Endpoint Security',
    color: '#00ff88',
    icon: '⬡',
    status: 'ACTIVE',
    description: 'Core certification covering Sophos Central administration, policy management, and endpoint security deployment across enterprise environments.',
    skills: ['Central Administration', 'Policy Management', 'Endpoint Deployment'],
  },
  {
    id: 'SCA-002',
    name: 'Sophos Certified Architect',
    issuer: 'Sophos',
    domain: 'Architecture & Design',
    color: '#00d4ff',
    icon: '◈',
    status: 'ACTIVE',
    description: 'Advanced certification demonstrating capability in designing and architecting enterprise-scale Sophos security deployments and integrations.',
    skills: ['Security Architecture', 'Enterprise Design', 'Integration Patterns'],
  },
  {
    id: 'XDR-003',
    name: 'Sophos XDR Specialist',
    issuer: 'Sophos',
    domain: 'Extended Detection & Response',
    color: '#f5c842',
    icon: '◉',
    status: 'ACTIVE',
    description: 'Specialist certification in XDR telemetry, Data Lake query construction, cross-product correlation, and advanced threat detection using Live Discover.',
    skills: ['XDR Telemetry', 'Data Lake', 'Live Discover SQL', 'Threat Correlation'],
  },
  {
    id: 'MDR-004',
    name: 'Sophos MDR Certified',
    issuer: 'Sophos',
    domain: 'Managed Detection & Response',
    color: '#a855f7',
    icon: '◎',
    status: 'ACTIVE',
    description: 'MDR certification covering managed threat response workflows, escalation procedures, and collaborative incident handling with Sophos MDR teams.',
    skills: ['MDR Workflows', 'Threat Response', 'Incident Escalation'],
  },
  {
    id: 'FW-005',
    name: 'Sophos Firewall Certified',
    issuer: 'Sophos',
    domain: 'Network Security',
    color: '#ff9500',
    icon: '◆',
    status: 'ACTIVE',
    description: 'Certification in Sophos Firewall (XG/XGS) configuration, policy management, SD-WAN, and integrated endpoint-firewall security workflows.',
    skills: ['XG Firewall', 'SD-WAN', 'Network Policies', 'Endpoint Integration'],
  },
  {
    id: 'CS-006',
    name: 'Sophos Cloud Security',
    issuer: 'Sophos',
    domain: 'Cloud & Infrastructure',
    color: '#ff6b6b',
    icon: '★',
    status: 'ACTIVE',
    description: 'Cloud security certification covering Sophos deployment in AWS, Azure, and GCP environments, including cloud workload protection and CSPM integration.',
    skills: ['AWS', 'Azure', 'GCP', 'Cloud Workload Protection'],
  },
]

function CertCard({ cert, index }: { cert: typeof CERTS[0], index: number }) {
  const [hovered, setHovered] = useState(false)
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      data-anim
      style={{ opacity: 0, transform: 'translateY(24px)', transition: `all 0.6s ease ${index * 0.08}s`, perspective: 1000, cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <div style={{ position: 'relative', height: 280, transformStyle: 'preserve-3d', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>

        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          border: `1px solid ${hovered ? cert.color + '55' : cert.color + '22'}`,
          background: hovered ? `${cert.color}07` : 'rgba(255,255,255,0.02)',
          borderRadius: 4, padding: 24, overflow: 'hidden',
          transition: 'all 0.3s', boxShadow: hovered ? `0 0 25px ${cert.color}18` : 'none'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${cert.color}, transparent)` }} />
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: cert.color, filter: 'blur(40px)', opacity: hovered ? 0.1 : 0.04 }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: 28, color: cert.color, filter: `drop-shadow(0 0 8px ${cert.color}66)` }}>{cert.icon}</span>
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: cert.color, border: `1px solid ${cert.color}33`, padding: '3px 8px', borderRadius: 2, letterSpacing: 2 }}>{cert.status}</span>
          </div>

          <div style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: `${cert.color}66`, letterSpacing: 2, marginBottom: 8 }}>{cert.domain}</div>
          <h3 style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 8, lineHeight: 1.4 }}>{cert.name}</h3>
          <div style={{ fontFamily: 'Rajdhani', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>{cert.issuer}</div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {cert.skills.map(s => (
              <span key={s} style={{ fontFamily: 'Share Tech Mono', fontSize: 7, color: `${cert.color}88`, border: `1px solid ${cert.color}18`, padding: '2px 7px', borderRadius: 2, letterSpacing: 1 }}>{s}</span>
            ))}
          </div>

          <div style={{ position: 'absolute', bottom: 18, left: 24, fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: 2 }}>CLICK TO FLIP · #{cert.id}</div>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
          border: `1px solid ${cert.color}44`, background: `${cert.color}08`,
          borderRadius: 4, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${cert.color}, transparent)` }} />
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: `${cert.color}88`, letterSpacing: 3, marginBottom: 16 }}>CERTIFICATION DETAILS</div>
          <p style={{ fontFamily: 'Rajdhani', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontWeight: 300 }}>{cert.description}</p>
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${cert.color}22` }}>
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: 2 }}>ISSUED BY {cert.issuer.toUpperCase()} · {cert.id}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CertsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        entries[0].target.querySelectorAll('[data-anim]').forEach((el, i) => {
          setTimeout(() => {
            ;(el as HTMLElement).style.opacity = '1'
            ;(el as HTMLElement).style.transform = 'translateY(0)'
          }, i * 80)
        })
      }
    }, { threshold: 0.05 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="certs" ref={sectionRef} style={{ background: '#00010a', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #f5c84233, transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div data-anim style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#f5c842' }} />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: 11, color: '#f5c842', letterSpacing: 4 }}>05 · CLEARANCES</span>
          </div>
          <h2 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', letterSpacing: -1 }}>
            CERTIFICATIONS<span style={{ color: '#f5c842' }}>.</span>
          </h2>
          <p style={{ fontFamily: 'Rajdhani', fontSize: 15, color: 'rgba(255,255,255,0.35)', marginTop: 12, fontWeight: 300 }}>
            Click any card to reveal full certification details.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {CERTS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
