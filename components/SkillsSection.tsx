'use client'
import { useEffect, useRef, useState } from 'react'

const SKILL_CATEGORIES = [
  {
    title: 'ENDPOINT SECURITY',
    color: '#00ff88',
    skills: [
      { name: 'Sophos Intercept X / Central', level: 98 },
      { name: 'XDR / EDR Telemetry Analysis', level: 96 },
      { name: 'Endpoint Threat Detection', level: 95 },
      { name: 'Behavioral Analysis', level: 92 },
      { name: 'Policy Management', level: 94 },
    ]
  },
  {
    title: 'THREAT HUNTING & FORENSICS',
    color: '#00d4ff',
    skills: [
      { name: 'Forensic Triage', level: 93 },
      { name: 'Root Cause Analysis', level: 95 },
      { name: 'Incident Response', level: 92 },
      { name: 'Live Discover / SQL', level: 90 },
      { name: 'IOC Investigation', level: 91 },
    ]
  },
  {
    title: 'PLATFORMS & OS',
    color: '#f5c842',
    skills: [
      { name: 'Windows (All Enterprise)', level: 97 },
      { name: 'macOS (Launch Agents)', level: 88 },
      { name: 'Linux (systemd / kernel)', level: 85 },
      { name: 'Registry / WMI / Event Logs', level: 93 },
      { name: 'Sophos Data Lake', level: 91 },
    ]
  },
  {
    title: 'SCRIPTING & ANALYTICS',
    color: '#a855f7',
    skills: [
      { name: 'PowerShell', level: 94 },
      { name: 'Bash Scripting', level: 88 },
      { name: 'SQL (Live Discover)', level: 90 },
      { name: 'Performance Optimisation', level: 87 },
      { name: 'Log Analytics', level: 92 },
    ]
  },
]

const RADAR_SKILLS = [
  { name: 'DETECTION', score: 96 },
  { name: 'FORENSICS', score: 93 },
  { name: 'RESPONSE', score: 92 },
  { name: 'SCRIPTING', score: 90 },
  { name: 'KNOWLEDGE', score: 97 },
  { name: 'COMM', score: 94 },
]

function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 300
    const H = 300
    const cx = W / 2
    const cy = H / 2
    const R = 100
    const N = RADAR_SKILLS.length
    let progress = 0

    const getPoint = (i: number, r: number) => {
      const angle = (i / N) * Math.PI * 2 - Math.PI / 2
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
    }

    const draw = (p: number) => {
      ctx.clearRect(0, 0, W, H)

      // Grid rings
      for (let ring = 1; ring <= 5; ring++) {
        const r = (ring / 5) * R
        ctx.beginPath()
        for (let i = 0; i < N; i++) {
          const pt = getPoint(i, r)
          if (i === 0) ctx.moveTo(pt.x, pt.y)
          else ctx.lineTo(pt.x, pt.y)
        }
        ctx.closePath()
        ctx.strokeStyle = ring === 5 ? 'rgba(0,255,136,0.25)' : 'rgba(0,255,136,0.07)'
        ctx.lineWidth = ring === 5 ? 1 : 0.5
        ctx.stroke()
      }

      // Axis lines
      for (let i = 0; i < N; i++) {
        const pt = getPoint(i, R)
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(pt.x, pt.y)
        ctx.strokeStyle = 'rgba(0,255,136,0.12)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Data fill
      ctx.beginPath()
      RADAR_SKILLS.forEach((s, i) => {
        const r = (s.score / 100) * R * p
        const pt = getPoint(i, r)
        if (i === 0) ctx.moveTo(pt.x, pt.y)
        else ctx.lineTo(pt.x, pt.y)
      })
      ctx.closePath()
      ctx.fillStyle = 'rgba(0,255,136,0.1)'
      ctx.fill()
      ctx.strokeStyle = '#00ff88'
      ctx.lineWidth = 2
      ctx.shadowColor = '#00ff88'
      ctx.shadowBlur = 8
      ctx.stroke()
      ctx.shadowBlur = 0

      // Dots
      RADAR_SKILLS.forEach((s, i) => {
        const r = (s.score / 100) * R * p
        const pt = getPoint(i, r)
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = '#00ff88'
        ctx.shadowColor = '#00ff88'
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Labels
      RADAR_SKILLS.forEach((s, i) => {
        const lpt = getPoint(i, R + 18)
        ctx.fillStyle = 'rgba(0,255,136,0.65)'
        ctx.font = '8px "Share Tech Mono", monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(s.name, lpt.x, lpt.y)

        const spt = getPoint(i, R + 30)
        ctx.fillStyle = '#00ff88'
        ctx.font = 'bold 9px "Share Tech Mono", monospace'
        ctx.fillText(`${Math.round(s.score * p)}%`, spt.x, spt.y)
      })
    }

    const animate = () => {
      progress = Math.min(1, progress + 0.03)
      draw(progress)
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      }
    }

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !startedRef.current) {
        startedRef.current = true
        animate()
      }
    }, { threshold: 0.3 })

    obs.observe(canvas)

    return () => {
      obs.disconnect()
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      style={{ width: '100%', maxWidth: 300, display: 'block' }}
    />
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true)
        obs.disconnect()
      }
    }, { threshold: 0.05 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} style={{
      background: '#000008',
      padding: '120px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #00ff8833, transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
          marginBottom: 64,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#00d4ff' }} />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: 11, color: '#00d4ff', letterSpacing: 4 }}>02 · CAPABILITIES</span>
          </div>
          <h2 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', letterSpacing: -1 }}>
            SKILL MATRIX<span style={{ color: '#00d4ff' }}>.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'start' }}>

          {/* Skill bars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {SKILL_CATEGORIES.map((cat, ci) => (
              <div key={cat.title} style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${ci * 0.1}s`,
              }}>
                <div style={{
                  fontFamily: 'Share Tech Mono', fontSize: 10,
                  color: cat.color, letterSpacing: 3, marginBottom: 20,
                }}>{cat.title}</div>

                {cat.skills.map((skill, si) => (
                  <div key={skill.name} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontFamily: 'Rajdhani', fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                        {skill.name}
                      </span>
                      <span style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: cat.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        borderRadius: 2,
                        background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`,
                        width: visible ? `${skill.level}%` : '0%',
                        boxShadow: `0 0 8px ${cat.color}66`,
                        transition: `width 1.2s ease ${0.4 + si * 0.1}s`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Radar */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.4s',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          }}>
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: '#00ff88', letterSpacing: 3 }}>
              COMPETENCY RADAR
            </div>
            <div style={{
              border: '1px solid rgba(0,255,136,0.15)',
              background: 'rgba(0,255,136,0.03)',
              borderRadius: 4, padding: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <RadarChart />
            </div>
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.35)', letterSpacing: 2, textAlign: 'center' }}>
              OVERALL THREAT RESPONSE CAPABILITY
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
