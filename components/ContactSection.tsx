'use client'
import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { label: 'LinkedIn', value: 'linkedin.com/in/rutvik-chavda', href: 'https://linkedin.com/in/rutvik-chavda', color: '#00d4ff', icon: '◈' },
  { label: 'GitHub', value: 'github.com/RIK1849', href: 'https://github.com/RIK1849', color: '#a855f7', icon: '◉' },
  { label: 'Sophos Community', value: 'community.sophos.com', href: 'https://community.sophos.com', color: '#00ff88', icon: '◎' },
  { label: 'Email', value: 'rutvik@sec.eng', href: 'mailto:rutvik@sec.eng', color: '#f5c842', icon: '★' },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [termLines, setTermLines] = useState<string[]>([])
  const [inputVal, setInputVal] = useState('')
  const [status, setStatus] = useState<'idle'|'sending'|'sent'>('idle')
  const termRef = useRef<HTMLDivElement>(null)

  const BOOT_SEQ = [
    '> INITIALISING SECURE CHANNEL...',
    '> ENCRYPTION: AES-256-GCM · OK',
    '> IDENTITY VERIFIED · RUTVIK CHAVDA',
    '> CHANNEL OPEN · AWAITING INPUT',
    '',
  ]

  useEffect(() => {
    let i = 0
    const tick = () => {
      if (i < BOOT_SEQ.length) {
        setTermLines(prev => [...prev, BOOT_SEQ[i]])
        i++
        setTimeout(tick, 180)
      }
    }
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { tick(); obs.disconnect() }
    }, { threshold: 0.2 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
  }, [termLines])

  const handleSend = () => {
    if (!inputVal.trim()) return
    setTermLines(prev => [...prev, `> MSG: "${inputVal}"`, '> ROUTING VIA SECURE CHANNEL...', '> DELIVERED · ACK RECEIVED ✓'])
    setInputVal('')
    setStatus('sent')
  }

  return (
    <section id="contact" ref={sectionRef} style={{ background: '#00010a', padding: '120px 0 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #00d4ff33, transparent)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,255,136,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.015) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#00d4ff' }} />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: 11, color: '#00d4ff', letterSpacing: 4 }}>07 · COMMS</span>
          </div>
          <h2 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', letterSpacing: -1 }}>
            INITIATE CONTACT<span style={{ color: '#00d4ff' }}>.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>

          {/* Terminal */}
          <div style={{ border: '1px solid rgba(0,255,136,0.2)', background: 'rgba(0,5,2,0.9)', borderRadius: 4, overflow: 'hidden', fontFamily: 'Share Tech Mono' }}>
            {/* Terminal header */}
            <div style={{ background: 'rgba(0,255,136,0.06)', borderBottom: '1px solid rgba(0,255,136,0.1)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              {['#ff5f57','#ffbd2e','#28c840'].map((c,i) => (
                <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
              <span style={{ fontSize: 10, color: 'rgba(0,255,136,0.4)', letterSpacing: 2, marginLeft: 8 }}>SECURE_CHANNEL.SH · RC@SOPHOS</span>
            </div>

            {/* Terminal body */}
            <div ref={termRef} style={{ height: 280, overflowY: 'auto', padding: '20px 20px 0' }}>
              {termLines.map((line, i) => (
                <div key={i} style={{ fontSize: 11, color: line.startsWith('>') ? '#00ff88' : 'rgba(255,255,255,0.3)', marginBottom: 6, letterSpacing: 1, lineHeight: 1.6 }}>{line}</div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(0,255,136,0.08)', display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ color: '#00ff88', fontSize: 12 }}>›</span>
              <input
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type message and press Enter..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'Share Tech Mono', fontSize: 11, color: '#00ff88', letterSpacing: 1 }}
              />
              <button onClick={handleSend} style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: '#000008', background: '#00ff88', border: 'none', padding: '6px 14px', borderRadius: 2, cursor: 'pointer', letterSpacing: 2 }}>SEND</button>
            </div>
          </div>

          {/* Links + info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Availability badge */}
            <div style={{ border: '1px solid rgba(0,255,136,0.2)', background: 'rgba(0,255,136,0.04)', borderRadius: 4, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 12px #00ff88', animation: 'blink 1.5s ease-in-out infinite', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'Orbitron', fontSize: 13, fontWeight: 700, color: '#00ff88', marginBottom: 3 }}>AVAILABLE FOR OPPORTUNITIES</div>
                <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>Open to senior endpoint security / threat hunting roles</div>
              </div>
            </div>

            {LINKS.map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                border: `1px solid ${link.color}22`, background: `${link.color}05`,
                borderRadius: 4, padding: '18px 24px', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.25s',
                position: 'relative', overflow: 'hidden'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = link.color+'55'; (e.currentTarget as HTMLElement).style.background = link.color+'0d' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = link.color+'22'; (e.currentTarget as HTMLElement).style.background = link.color+'05' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: 2, height: '100%', background: link.color, opacity: 0.5 }} />
                <span style={{ fontSize: 20, color: link.color, filter: `drop-shadow(0 0 6px ${link.color})` }}>{link.icon}</span>
                <div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: `${link.color}88`, letterSpacing: 2, marginBottom: 3 }}>{link.label}</div>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{link.value}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: `${link.color}44`, fontSize: 14 }}>→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'Orbitron', fontSize: 13, fontWeight: 700, color: '#00ff88', marginBottom: 4, letterSpacing: 2 }}>RUTVIK CHAVDA</div>
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: 2 }}>L2/L3 ENDPOINT SECURITY ENGINEER · SOPHOS</div>
          </div>
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: 2, textAlign: 'right' }}>
            <div>BUILT WITH NEXT.JS · THREE.JS · WEBGL</div>
            <div style={{ marginTop: 4 }}>© 2025 RUTVIK CHAVDA · ALL RIGHTS RESERVED</div>
          </div>
        </div>
      </div>
    </section>
  )
}
