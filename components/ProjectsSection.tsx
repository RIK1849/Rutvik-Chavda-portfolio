'use client'
import { useEffect, useRef, useState } from 'react'

const PROJECTS = [
  {
    id: '001',
    title: 'XDR Threat Hunt Automation',
    subtitle: 'Live Discover · SQL · PowerShell',
    description: 'Developed a comprehensive SQL-based threat hunting framework for Sophos Live Discover, enabling automated IOC sweeps across 10,000+ endpoints. Reduced mean-time-to-detect by 60% through correlated Data Lake queries targeting lateral movement, persistence mechanisms, and credential harvesting.',
    tags: ['Live Discover', 'SQL', 'XDR', 'PowerShell', 'Data Lake'],
    color: '#00ff88',
    status: 'DEPLOYED',
    metrics: [
      { label: 'Endpoints Covered', value: '10K+' },
      { label: 'MTTD Reduction', value: '60%' },
      { label: 'Queries Built', value: '40+' },
    ],
    icon: '⬡',
  },
  {
    id: '002',
    title: 'Endpoint Forensic Triage Playbook',
    subtitle: 'Incident Response · Windows · macOS · Linux',
    description: 'Engineered a cross-platform forensic triage methodology covering Windows registry artefacts, macOS launch agent persistence, Linux systemd service abuse, and kernel module manipulation. Published as internal KB with step-by-step RCA workflows reducing escalation time by 45%.',
    tags: ['Forensics', 'Windows', 'macOS', 'Linux', 'Incident Response'],
    color: '#00d4ff',
    status: 'PUBLISHED',
    metrics: [
      { label: 'Platforms', value: '3' },
      { label: 'Escalation Reduction', value: '45%' },
      { label: 'KB Articles', value: '22' },
    ],
    icon: '◈',
  },
  {
    id: '003',
    title: 'Sophos Central Health Monitor',
    subtitle: 'PowerShell · API · Automation',
    description: 'Built a PowerShell-based health monitoring suite for Sophos Central deployments. Automated detection of tamper-protection violations, out-of-date endpoints, policy drift, and agent health anomalies across enterprise tenants. Integrated with alerting pipelines for proactive remediation.',
    tags: ['PowerShell', 'Sophos API', 'Automation', 'Monitoring'],
    color: '#f5c842',
    status: 'PRODUCTION',
    metrics: [
      { label: 'Checks Automated', value: '35+' },
      { label: 'Tenants Covered', value: '50+' },
      { label: 'Alert MTTR', value: '-70%' },
    ],
    icon: '◉',
  },
  {
    id: '004',
    title: 'EDR Detection Logic Library',
    subtitle: 'Intercept X · Behavioral Rules · SQL',
    description: 'Curated and authored a detection logic library for Sophos Intercept X, documenting behavioral detection patterns, false-positive suppression rules, and tuning guidance for enterprise environments. Includes process injection, LOLBAS abuse, persistence mechanisms, and exfiltration patterns.',
    tags: ['Intercept X', 'Detection Engineering', 'LOLBAS', 'Behavioral Analysis'],
    color: '#a855f7',
    status: 'MAINTAINED',
    metrics: [
      { label: 'Detection Rules', value: '80+' },
      { label: 'FP Reduction', value: '55%' },
      { label: 'Coverage', value: 'MITRE ATT&CK' },
    ],
    icon: '◎',
  },
  {
    id: '005',
    title: 'Community Knowledge Hub',
    subtitle: 'Sophos Community · Documentation · Mentoring',
    description: 'Established a de facto knowledge hub within the Sophos Community forums, contributing over 200 detailed technical resolutions across endpoint security, XDR workflows, and Data Lake queries. Consistently ranked Top Contributor for 3 consecutive quarters and full-year 2024.',
    tags: ['Community', 'Knowledge Sharing', 'Technical Writing', 'Mentoring'],
    color: '#ff9500',
    status: 'ACTIVE',
    metrics: [
      { label: 'Contributions', value: '200+' },
      { label: 'Community Rank', value: 'Top 3' },
      { label: 'Engineers Helped', value: '500+' },
    ],
    icon: '★',
  },
  {
    id: '006',
    title: 'Linux Endpoint Hardening Guide',
    subtitle: 'Linux · systemd · Bash · Security',
    description: 'Authored a comprehensive Linux endpoint hardening guide for enterprise environments running Sophos. Covers systemd service analysis, kernel module auditing, eBPF-based detection considerations, and Sophos agent deployment optimisation across major distributions.',
    tags: ['Linux', 'systemd', 'Bash', 'Hardening', 'Sophos'],
    color: '#ff6b6b',
    status: 'PUBLISHED',
    metrics: [
      { label: 'Pages', value: '85+' },
      { label: 'Distros Covered', value: '8' },
      { label: 'Downloads', value: '300+' },
    ],
    icon: '◆',
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        entries[0].target.querySelectorAll('[data-anim]').forEach((el, i) => {
          setTimeout(() => {
            ;(el as HTMLElement).style.opacity = '1'
            ;(el as HTMLElement).style.transform = 'translateY(0) scale(1)'
          }, i * 80)
        })
      }
    }, { threshold: 0.05 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} style={{ background: '#000008', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #a855f733, transparent)' }} />

      {/* Ambient glow */}
      <div style={{ position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div data-anim style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#a855f7' }} />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: 11, color: '#a855f7', letterSpacing: 4 }}>04 · OPERATIONS LOG</span>
          </div>
          <h2 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', letterSpacing: -1 }}>
            PROJECTS<span style={{ color: '#a855f7' }}>.</span>
          </h2>
          <p style={{ fontFamily: 'Rajdhani', fontSize: 16, color: 'rgba(255,255,255,0.35)', marginTop: 12, fontWeight: 300 }}>
            Key technical initiatives, tools, and knowledge assets built in the field.
          </p>
        </div>

        {/* Project grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              data-anim
              onClick={() => setSelected(selected === i ? null : i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                opacity: 0, transform: 'translateY(24px) scale(0.97)',
                transition: `all 0.6s ease ${i * 0.07}s`,
                border: `1px solid ${hovered === i || selected === i ? project.color + '55' : project.color + '18'}`,
                background: hovered === i || selected === i ? `${project.color}08` : 'rgba(255,255,255,0.015)',
                borderRadius: 4, padding: 28, cursor: 'pointer',
                position: 'relative', overflow: 'hidden',
                boxShadow: hovered === i ? `0 0 30px ${project.color}15` : 'none',
              }}
            >
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${project.color}, transparent)`, opacity: hovered === i || selected === i ? 1 : 0.3, transition: 'opacity 0.3s' }} />

              {/* BG glow */}
              <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: project.color, filter: 'blur(50px)', opacity: hovered === i ? 0.08 : 0.03, transition: 'opacity 0.3s', pointerEvents: 'none' }} />

              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ fontFamily: 'Share Tech Mono', fontSize: 32, color: project.color, filter: `drop-shadow(0 0 8px ${project.color}66)`, lineHeight: 1 }}>{project.icon}</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(255,255,255,0.25)', letterSpacing: 2 }}>#{project.id}</span>
                  <span style={{
                    fontFamily: 'Share Tech Mono', fontSize: 8, letterSpacing: 2,
                    color: project.color, border: `1px solid ${project.color}44`,
                    background: `${project.color}0a`, padding: '3px 8px', borderRadius: 2
                  }}>{project.status}</span>
                </div>
              </div>

              {/* Title */}
              <h3 style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 6, letterSpacing: 0.5, lineHeight: 1.4 }}>{project.title}</h3>
              <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: `${project.color}77`, letterSpacing: 2, marginBottom: 16 }}>{project.subtitle}</div>

              {/* Description */}
              <p style={{ fontFamily: 'Rajdhani', fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontWeight: 300, marginBottom: 20 }}>
                {selected === i ? project.description : project.description.slice(0, 120) + '...'}
              </p>

              {/* Metrics */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                {project.metrics.map(m => (
                  <div key={m.label} style={{ flex: 1, textAlign: 'center', border: `1px solid ${project.color}18`, background: `${project.color}05`, padding: '8px 4px', borderRadius: 2 }}>
                    <div style={{ fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: project.color, marginBottom: 3 }}>{m.value}</div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: 7, color: 'rgba(255,255,255,0.25)', letterSpacing: 1, lineHeight: 1.3 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: `${project.color}88`, border: `1px solid ${project.color}18`, padding: '2px 8px', borderRadius: 2, letterSpacing: 1 }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
