'use client'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CERTS', href: '#certs' },
  { label: 'AWARDS', href: '#awards' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    tick()
    const int = setInterval(tick, 1000)
    return () => { window.removeEventListener('scroll', onScroll); clearInterval(int) }
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(0,0,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,255,136,0.15)' : '1px solid transparent',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, border: '1.5px solid #00ff88', transform: 'rotate(45deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px #00ff8855', position: 'relative',
          }}>
            <span style={{ transform: 'rotate(-45deg)', fontSize: 13, fontFamily: 'Orbitron', fontWeight: 900, color: '#00ff88' }}>RC</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Orbitron', fontSize: 11, color: '#00ff88', letterSpacing: 3 }}>RUTVIK CHAVDA</div>
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.45)', letterSpacing: 2 }}>ENDPOINT SECURITY ENG.</div>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} style={{
              fontFamily: 'Orbitron', fontSize: 10, letterSpacing: 2,
              color: active === item.label ? '#00ff88' : 'rgba(255,255,255,0.45)',
              textDecoration: 'none', padding: '8px 14px', position: 'relative',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = '#00ff88' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)' }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* System clock */}
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: 11, color: 'rgba(0,255,136,0.5)', letterSpacing: 2 }}>
          SYS · {time}
        </div>
      </div>
    </nav>
  )
}
