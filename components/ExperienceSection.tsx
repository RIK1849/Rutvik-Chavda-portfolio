'use client'
import { useEffect, useRef, useState } from 'react'

const EXPERIENCES = [
  {
    role: 'L2/L3 Technical Support Engineer',
    company: 'Sophos',
    period: '2022 – Present',
    type: 'FULL TIME · REMOTE',
    color: '#00ff88',
    achievements: [
      'Handled 2000+ complex L2/L3 cases across Windows, macOS, and Linux enterprise environments',
      'Deep investigation of Sophos Intercept X, Central, XDR, and Data Lake telemetry for threat detection',
      'Threat hunting using Live Discover SQL queries across large-scale endpoint datasets',
      'Forensic triage and root-cause analysis of malware incidents, EDR detections, and policy misconfigurations',
      'Developed PowerShell and Bash automation scripts for enterprise-scale remediation workflows',
      'Contributed technical documentation, detection methodologies, and KB articles to global knowledge base',
      'Global Support Services Excellence Award 2024 recipient',
      'Ranked Top 10 globally among Sophos support engineers — FY25',
    ],
    tech: ['Sophos Central', 'Intercept X', 'XDR', 'Data Lake', 'Live Discover', 'PowerShell', 'Bash', 'SQL'],
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        entries[0].target.querySelectorAll('[data-anim]').forEach((el, i) => {
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '1'
            ;(el as HTMLElement).style.transform = 'translateY(0)'
          }, i * 100)
        })
      }
    }, { threshold: 0.05 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} style={{ background: '#00010a', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #00ff8833, transparent)' }} />

      {/* BG grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div data-anim style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#f5c842' }} />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: 11, color: '#f5c842', letterSpacing: 4 }}>03 · DEPLOYMENT HISTORY</span>
          </div>
          <h2 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', letterSpacing: -1 }}>
            EXPERIENCE<span style={{ color: '#f5c842' }}>.</span>
          </h2>
        </div>

        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} data-anim style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>
            <div style={{
              border: `1px solid ${exp.color}33`, background: `${exp.color}04`,
              borderRadius: 4, overflow: 'hidden', position: 'relative'
            }}>
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />

              {/* Header */}
              <div style={{ padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
                <div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: `${exp.color}88`, letterSpacing: 3, marginBottom: 8 }}>{exp.type}</div>
                  <h3 style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 28px)', color: '#fff', marginBottom: 8, letterSpacing: -0.5 }}>{exp.role}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontFamily: 'Rajdhani', fontSize: 18, fontWeight: 600, color: exp.color }}>{exp.company}</span>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: exp.color, opacity: 0.4, display: 'inline-block' }} />
                    <span style={{ fontFamily: 'Share Tech Mono', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 2 }}>{exp.period}</span>
                  </div>
                </div>

                {/* Active status */}
                <div style={{
                  border: `1px solid ${exp.color}44`, background: `${exp.color}0a`,
                  padding: '10px 20px', borderRadius: 2, textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: exp.color, boxShadow: `0 0 8px ${exp.color}`, animation: 'blink 1.5s ease-in-out infinite' }} />
                    <span style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: exp.color, letterSpacing: 2 }}>ACTIVE</span>
                  </div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>CURRENT DEPLOYMENT</div>
                </div>
              </div>

              {/* Achievements */}
              <div style={{ padding: '0 40px 32px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: `${exp.color}66`, letterSpacing: 3, marginBottom: 20, marginTop: 24 }}>MISSION LOG</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {exp.achievements.map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ color: exp.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                      <span style={{ fontFamily: 'Rajdhani', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontWeight: 400 }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech tags */}
              <div style={{ padding: '20px 40px 28px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: `${exp.color}55`, letterSpacing: 3, marginBottom: 14 }}>TECH STACK</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {exp.tech.map(t => (
                    <span key={t} style={{
                      fontFamily: 'Share Tech Mono', fontSize: 10, color: exp.color,
                      border: `1px solid ${exp.color}33`, background: `${exp.color}08`,
                      padding: '4px 12px', borderRadius: 2, letterSpacing: 1
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
