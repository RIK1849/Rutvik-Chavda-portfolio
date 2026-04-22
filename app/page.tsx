'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const AWARDS = [
  { id: 1, icon: '◈', tag: 'GLOBAL EXCELLENCE', category: 'GLOBAL EXCELLENCE · SOPHOS SUPPORT', date: 'May 2025', title: 'Global Support Services Excellence Award (2024)', description: 'Recognised with the Global Support Services Excellence Award 2024 at Sophos for outstanding performance in Endpoint Security and Technical Support. Resolved complex L2/L3 issues across Windows environments, including EDR (Sophos Intercept X) and XDR telemetry analysis.', color: '#f5c842', emissive: 0xf5a800 },
  { id: 2, icon: '◉', tag: 'TOP 10 WORLDWIDE', category: 'GLOBAL RANKING · TOP 10 WORLDWIDE', date: 'Nov 2023', title: 'Sophos Support Team Top 10 — FY25', description: 'Ranked among the top 10 support engineers globally at Sophos for FY25 — recognised for outstanding case quality, consistent SLA adherence, customer satisfaction scores, and internal knowledge contribution across the endpoint security portfolio.', color: '#00ff88', emissive: 0x00cc66 },
  { id: 3, icon: '◎', tag: 'COMMUNITY Q1', category: 'COMMUNITY · QUARTERLY RECOGNITION', date: 'Q1 2024', title: 'Top Community Contributor — Q1 2024', description: 'Awarded Top Community Contributor for Q1 2024 in recognition of consistent, high-quality technical contributions to the Sophos community forums, documentation improvements, and peer knowledge sharing across security domains.', color: '#00d4ff', emissive: 0x0099cc },
  { id: 4, icon: '◎', tag: 'COMMUNITY Q2', category: 'COMMUNITY · QUARTERLY RECOGNITION', date: 'Q2 2024', title: 'Top Community Contributor — Q2 2024', description: 'Consecutive quarterly recognition for sustained technical excellence and community leadership within the Sophos ecosystem, demonstrating deep specialisation in endpoint security, threat hunting, and XDR workflows.', color: '#a855f7', emissive: 0x7c22cc },
  { id: 5, icon: '◎', tag: 'COMMUNITY Q3', category: 'COMMUNITY · QUARTERLY RECOGNITION', date: 'Q3 2024', title: 'Top Community Contributor — Q3 2024', description: 'Third consecutive quarterly award, underlining consistent excellence and long-term impact on the Sophos community — from advanced troubleshooting guides to forensic triage methodologies shared with the global technical community.', color: '#ff6b6b', emissive: 0xcc3333 },
  { id: 6, icon: '★', tag: 'TOP CONTRIBUTOR', category: 'ANNUAL · TOP CONTRIBUTOR', date: '2024', title: 'Full-Year Top Contributor 2024', description: 'Awarded the Full-Year Top Contributor title for 2024 — the highest community recognition at Sophos, granted to engineers demonstrating sustained excellence across all four quarters in case resolution, knowledge creation, and community impact.', color: '#ff9500', emissive: 0xcc7000 },
]

const SKILLS = [
  { cat: 'ENDPOINT SECURITY', color: '#00ff88', items: [{ n: 'Sophos Intercept X / Central', v: 98 }, { n: 'XDR / EDR Telemetry', v: 96 }, { n: 'Threat Detection', v: 95 }, { n: 'Behavioral Analysis', v: 92 }, { n: 'Policy Management', v: 94 }] },
  { cat: 'THREAT HUNTING', color: '#00d4ff', items: [{ n: 'Forensic Triage', v: 93 }, { n: 'Root Cause Analysis', v: 95 }, { n: 'Incident Response', v: 92 }, { n: 'Live Discover SQL', v: 90 }, { n: 'IOC Investigation', v: 91 }] },
  { cat: 'PLATFORMS & OS', color: '#f5c842', items: [{ n: 'Windows (Enterprise)', v: 97 }, { n: 'macOS', v: 88 }, { n: 'Linux (systemd)', v: 85 }, { n: 'Registry / WMI', v: 93 }, { n: 'Data Lake', v: 91 }] },
  { cat: 'SCRIPTING', color: '#a855f7', items: [{ n: 'PowerShell', v: 94 }, { n: 'Bash', v: 88 }, { n: 'SQL Analytics', v: 90 }, { n: 'Automation', v: 87 }, { n: 'Log Analytics', v: 92 }] },
]

const PROJECTS = [
  { id: '001', title: 'XDR Threat Hunt Automation', sub: 'Live Discover · SQL · PowerShell', desc: 'Developed a comprehensive SQL-based threat hunting framework for Sophos Live Discover, enabling automated IOC sweeps across 10,000+ endpoints. Reduced mean-time-to-detect by 60% through correlated Data Lake queries.', tags: ['Live Discover', 'SQL', 'XDR', 'PowerShell'], color: '#00ff88', status: 'DEPLOYED', metrics: [{ l: 'Endpoints', v: '10K+' }, { l: 'MTTD Drop', v: '60%' }, { l: 'Queries', v: '40+' }] },
  { id: '002', title: 'Endpoint Forensic Triage Playbook', sub: 'Incident Response · Cross-Platform', desc: 'Engineered a cross-platform forensic triage methodology covering Windows registry artefacts, macOS launch agent persistence, Linux systemd service abuse and kernel module manipulation.', tags: ['Forensics', 'Windows', 'macOS', 'Linux'], color: '#00d4ff', status: 'PUBLISHED', metrics: [{ l: 'Platforms', v: '3' }, { l: 'Escalation Drop', v: '45%' }, { l: 'KB Articles', v: '22' }] },
  { id: '003', title: 'Sophos Central Health Monitor', sub: 'PowerShell · API · Automation', desc: 'Built a PowerShell-based health monitoring suite for Sophos Central deployments. Automated detection of tamper-protection violations, out-of-date endpoints, policy drift across enterprise tenants.', tags: ['PowerShell', 'Sophos API', 'Automation'], color: '#f5c842', status: 'PRODUCTION', metrics: [{ l: 'Checks', v: '35+' }, { l: 'Tenants', v: '50+' }, { l: 'MTTR Drop', v: '70%' }] },
  { id: '004', title: 'EDR Detection Logic Library', sub: 'Intercept X · Behavioral Rules', desc: 'Curated and authored a detection logic library for Sophos Intercept X, documenting behavioral detection patterns, false-positive suppression rules, and tuning guidance for enterprise environments.', tags: ['Intercept X', 'Detection', 'LOLBAS'], color: '#a855f7', status: 'MAINTAINED', metrics: [{ l: 'Rules', v: '80+' }, { l: 'FP Reduction', v: '55%' }, { l: 'Coverage', v: 'ATT&CK' }] },
  { id: '005', title: 'Community Knowledge Hub', sub: 'Sophos Community · Documentation', desc: 'Established a de facto knowledge hub within the Sophos Community forums, contributing over 200 detailed technical resolutions across endpoint security, XDR workflows, and Data Lake queries.', tags: ['Community', 'Knowledge', 'Mentoring'], color: '#ff9500', status: 'ACTIVE', metrics: [{ l: 'Contributions', v: '200+' }, { l: 'Rank', v: 'Top 3' }, { l: 'Helped', v: '500+' }] },
  { id: '006', title: 'Linux Endpoint Hardening Guide', sub: 'Linux · systemd · Bash', desc: 'Authored a comprehensive Linux endpoint hardening guide for enterprise environments running Sophos. Covers systemd service analysis, kernel module auditing and Sophos agent deployment optimisation.', tags: ['Linux', 'systemd', 'Bash', 'Hardening'], color: '#ff6b6b', status: 'PUBLISHED', metrics: [{ l: 'Pages', v: '85+' }, { l: 'Distros', v: '8' }, { l: 'Downloads', v: '300+' }] },
]

const CERTS = [
  { id: 'SCE', name: 'Sophos Certified Engineer', domain: 'Endpoint Security', color: '#00ff88', icon: '⬡', desc: 'Core certification covering Sophos Central administration, policy management, and endpoint security deployment across enterprise environments.' },
  { id: 'SCA', name: 'Sophos Certified Architect', domain: 'Architecture & Design', color: '#00d4ff', icon: '◈', desc: 'Advanced certification demonstrating capability in designing and architecting enterprise-scale Sophos security deployments and integrations.' },
  { id: 'XDR', name: 'Sophos XDR Specialist', domain: 'Extended Detection & Response', color: '#f5c842', icon: '◉', desc: 'Specialist certification in XDR telemetry, Data Lake query construction, cross-product correlation, and advanced threat detection using Live Discover.' },
  { id: 'MDR', name: 'Sophos MDR Certified', domain: 'Managed Detection & Response', color: '#a855f7', icon: '◎', desc: 'MDR certification covering managed threat response workflows, escalation procedures, and collaborative incident handling with Sophos MDR teams.' },
  { id: 'FW', name: 'Sophos Firewall Certified', domain: 'Network Security', color: '#ff9500', icon: '◆', desc: 'Certification in Sophos Firewall (XG/XGS) configuration, policy management, SD-WAN, and integrated endpoint-firewall security workflows.' },
  { id: 'CS', name: 'Sophos Cloud Security', domain: 'Cloud & Infrastructure', color: '#ff6b6b', icon: '★', desc: 'Cloud security certification covering Sophos deployment in AWS, Azure, and GCP environments, including cloud workload protection.' },
]

const NAV = ['ABOUT', 'SKILLS', 'EXPERIENCE', 'PROJECTS', 'CERTS', 'AWARDS', 'CONTACT']

// ─── CURSOR ──────────────────────────────────────────────────────────────────
function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const fn = (e: MouseEvent) => { el.style.left = e.clientX + 'px'; el.style.top = e.clientY + 'px' }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])
  return (
    <div ref={ref} style={{ position: 'fixed', width: 20, height: 20, pointerEvents: 'none', zIndex: 99999, transform: 'translate(-50%,-50%)', top: 0, left: 0 }}>
      <div style={{ position: 'absolute', inset: 0, border: '1.5px solid #00ff88', transform: 'rotate(45deg)', animation: 'cursorPulse 2s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 4, height: 4, background: '#00ff88', borderRadius: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0 0 8px #00ff88' }} />
    </div>
  )
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    tick(); const int = setInterval(tick, 1000)
    return () => { window.removeEventListener('scroll', onScroll); clearInterval(int) }
  }, [])
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000, background: scrolled ? 'rgba(0,0,8,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(0,255,136,0.15)' : '1px solid transparent', transition: 'all 0.4s ease' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, border: '1.5px solid #00ff88', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px #00ff8855' }}>
            <span style={{ transform: 'rotate(-45deg)', fontSize: 11, fontFamily: 'monospace', fontWeight: 900, color: '#00ff88' }}>RC</span>
          </div>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#00ff88', letterSpacing: 3 }}>RUTVIK CHAVDA</div>
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 2 }}>ENDPOINT SECURITY ENG.</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {NAV.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', padding: '8px 14px', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#00ff88'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
            >{item}</a>
          ))}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(0,255,136,0.4)', letterSpacing: 2 }}>SYS · {time}</div>
      </div>
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [typed, setTyped] = useState('')
  const FULL = 'L2/L3 ENDPOINT SECURITY & XDR ENGINEER'

  useEffect(() => {
    let i = 0
    const t = setInterval(() => { i++; setTyped(FULL.slice(0, i)); if (i >= FULL.length) clearInterval(t) }, 50)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    let animId: number; let alive = true

    const run = async () => {
      const THREE = await import('three')
      if (!alive) return
      const W = canvas.clientWidth || window.innerWidth
      const H = canvas.clientHeight || window.innerHeight
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x000008, 0.02)
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
      camera.position.set(0, 0, 18)

      scene.add(new THREE.AmbientLight(0x001122, 4))
      const d1 = new THREE.DirectionalLight(0x00ff88, 2); d1.position.set(5, 5, 5); scene.add(d1)
      const d2 = new THREE.DirectionalLight(0x0044ff, 1.5); d2.position.set(-5, -3, 3); scene.add(d2)

      const coreGrp = new THREE.Group()
      const dodGeo = new THREE.DodecahedronGeometry(3.5, 0)
      coreGrp.add(new THREE.Mesh(dodGeo, new THREE.MeshPhysicalMaterial({ color: 0x003322, emissive: 0x00ff88, emissiveIntensity: 0.12, metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.22 })))
      const dodWire = new THREE.Mesh(dodGeo, new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.18 }))
      coreGrp.add(dodWire)
      coreGrp.add(new THREE.Mesh(new THREE.IcosahedronGeometry(2.2, 1), new THREE.MeshPhysicalMaterial({ color: 0x001133, emissive: 0x0066ff, emissiveIntensity: 0.4, metalness: 1, roughness: 0, transparent: true, opacity: 0.45 })))
      coreGrp.add(new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 32), new THREE.MeshPhysicalMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 2, transparent: true, opacity: 0.9 })))
      const coreLight = new THREE.PointLight(0x00ff88, 4, 25); coreGrp.add(coreLight)
      scene.add(coreGrp)

      const rings = [
        { r: 4.5, rx: 0, rz: 0, color: 0x00ff88, spd: 0.005 },
        { r: 5.5, rx: Math.PI / 3, rz: 0, color: 0x00d4ff, spd: -0.004 },
        { r: 6.5, rx: Math.PI / 5, rz: 0, color: 0xf5c842, spd: 0.003 },
        { r: 7.5, rx: -Math.PI / 4, rz: Math.PI / 6, color: 0xa855f7, spd: -0.002 },
      ].map(cfg => {
        const m = new THREE.Mesh(new THREE.TorusGeometry(cfg.r, 0.018, 8, 200), new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.65 }))
        m.rotation.set(cfg.rx, 0, cfg.rz); scene.add(m); return { m, spd: cfg.spd }
      })

      const nodes = Array.from({ length: 20 }, (_, i) => {
        const colors = [0x00ff88, 0x00d4ff, 0xf5c842, 0xa855f7, 0xff6b6b]
        const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.08 + Math.random() * 0.1, 0), new THREE.MeshBasicMaterial({ color: colors[i % 5] }))
        const theta = Math.random() * Math.PI * 2, phi = Math.random() * Math.PI, r = 8 + Math.random() * 5
        m.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi) * 0.5, r * Math.sin(phi) * Math.sin(theta))
        scene.add(m); return { m, theta, phi, r, spd: 0.003 + Math.random() * 0.004, off: Math.random() * Math.PI * 2 }
      })

      const starGeo = new THREE.BufferGeometry()
      const sp = new Float32Array(2000 * 3); for (let i = 0; i < 6000; i++) sp[i] = (Math.random() - 0.5) * 300
      starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3))
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.07, color: 0x44ffaa, transparent: true, opacity: 0.5 })))

      const grid = new THREE.GridHelper(60, 60, 0x003322, 0x001510)
      grid.position.y = -8; grid.material.opacity = 0.25; grid.material.transparent = true; scene.add(grid)

      let mx = 0, my = 0
      const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = (e.clientY / window.innerHeight - 0.5) * 2 }
      window.addEventListener('mousemove', onMouse)

      let t = 0
      const tick = () => {
        if (!alive) return
        animId = requestAnimationFrame(tick); t += 0.008
        coreGrp.rotation.y = t * 0.25; coreGrp.rotation.x = Math.sin(t * 0.3) * 0.15
        dodWire.rotation.x = t * 0.12; dodWire.rotation.z = t * 0.08
        coreLight.intensity = 3.5 + Math.sin(t * 2.5) * 1.2
        rings.forEach(({ m, spd }) => { m.rotation.y += spd })
        nodes.forEach(n => { n.theta += n.spd; n.m.position.x = n.r * Math.sin(n.phi) * Math.cos(n.theta); n.m.position.z = n.r * Math.sin(n.phi) * Math.sin(n.theta); n.m.position.y = n.r * Math.cos(n.phi) * 0.5 + Math.sin(t + n.off) * 0.5; n.m.rotation.y += 0.03 })
        camera.position.x += (mx * 2 - camera.position.x) * 0.04
        camera.position.y += (-my * 1 - camera.position.y) * 0.04
        camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
      }
      tick()

      const onResize = () => { const w = canvas.clientWidth, h = canvas.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h) }
      window.addEventListener('resize', onResize)
      return () => { alive = false; cancelAnimationFrame(animId); window.removeEventListener('mousemove', onMouse); window.removeEventListener('resize', onResize); renderer.dispose() }
    }

    const p = run()
    return () => { alive = false; p.then(fn => fn && fn()) }
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000008' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      {[{ top: 24, left: 24, borderTop: '2px solid #00ff88', borderLeft: '2px solid #00ff88' }, { top: 24, right: 24, borderTop: '2px solid #00ff88', borderRight: '2px solid #00ff88' }, { bottom: 24, left: 24, borderBottom: '2px solid #00ff88', borderLeft: '2px solid #00ff88' }, { bottom: 24, right: 24, borderBottom: '2px solid #00ff88', borderRight: '2px solid #00ff88' }].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 60, height: 60, zIndex: 10, opacity: 0.7, ...s }} />
      ))}
      <div style={{ position: 'absolute', top: 80, left: 40, right: 40, zIndex: 10, display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 10, color: 'rgba(0,255,136,0.35)', letterSpacing: 2 }}>
        <span>SYS.STATUS: ONLINE</span><span>THREAT.LVL: NEUTRALISED</span><span>ENG.CLASS: L2/L3</span>
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.06)', padding: '6px 20px', borderRadius: 2, marginBottom: 32, fontFamily: 'monospace', fontSize: 11, color: '#00ff88', letterSpacing: 3, animation: 'fadeIn 1s ease 0.5s both' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', display: 'inline-block', boxShadow: '0 0 8px #00ff88', animation: 'blink 1.5s ease-in-out infinite' }} />
          IDENTITY VERIFIED · SOPHOS GLOBAL TOP 10
        </div>
        <h1 style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 'clamp(44px,8vw,96px)', letterSpacing: '-2px', lineHeight: 0.95, margin: '0 0 20px', background: 'linear-gradient(135deg,#ffffff 0%,#00ff88 40%,#00d4ff 70%,#f5c842 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'fadeUp 0.8s ease 0.8s both' }}>
          RUTVIK<br />CHAVDA
        </h1>
        <div style={{ fontFamily: 'monospace', fontSize: 'clamp(11px,1.8vw,15px)', color: '#00d4ff', letterSpacing: 4, marginBottom: 40, minHeight: 24, animation: 'fadeIn 1s ease 1.2s both' }}>
          {typed}<span style={{ animation: 'blink 1s step-end infinite', color: '#00ff88' }}>█</span>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48, animation: 'fadeUp 0.8s ease 1.5s both' }}>
          {[{ l: 'SOPHOS', v: 'CERTIFIED', c: '#00ff88' }, { l: 'XDR/EDR', v: 'EXPERT', c: '#00d4ff' }, { l: 'GLOBAL RANK', v: 'TOP 10', c: '#f5c842' }, { l: 'AWARDS', v: '6 TOTAL', c: '#a855f7' }].map(s => (
            <div key={s.l} style={{ border: `1px solid ${s.c}33`, background: `${s.c}0a`, padding: '10px 20px', borderRadius: 2, textAlign: 'center' }}>
              <div style={{ fontFamily: 'monospace', fontSize: 9, color: `${s.c}88`, letterSpacing: 2, marginBottom: 4 }}>{s.l}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: s.c, letterSpacing: 2 }}>{s.v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, animation: 'fadeUp 0.8s ease 1.8s both' }}>
          <a href="#about" style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: 3, color: '#000008', background: '#00ff88', padding: '14px 32px', borderRadius: 2, textDecoration: 'none', boxShadow: '0 0 20px #00ff8855', display: 'inline-block' }}>EXPLORE PROFILE</a>
          <a href="#contact" style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: 3, color: '#00ff88', background: 'transparent', border: '1px solid #00ff8866', padding: '14px 32px', borderRadius: 2, textDecoration: 'none', display: 'inline-block' }}>INITIATE CONTACT</a>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 40, right: 40, zIndex: 10, display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 9, color: 'rgba(0,255,136,0.3)', letterSpacing: 2 }}>
        <span>LAT: 22.3N · LONG: 70.1E · JAMNAGAR IN</span><span>SOPHOS CENTRAL · INTERCEPT X · XDR</span>
      </div>
    </section>
  )
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
function Section({ id, bg, accentColor, num, heading, children }: { id: string; bg: string; accentColor: string; num: string; heading: string; children: React.ReactNode }) {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <section id={id} ref={ref} style={{ background: bg, padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${accentColor}33,transparent)` }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: accentColor }} />
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: accentColor, letterSpacing: 4 }}>{num}</span>
          </div>
          <h2 style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', letterSpacing: -1 }}>
            {heading}<span style={{ color: accentColor }}>.</span>
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const a = (d: number) => ({ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: `all 0.6s ease ${d}s` })
  return (
    <Section id="about" bg="#00010a" accentColor="#00ff88" num="01 · IDENTITY" heading="WHO AM I">
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          <div style={{ ...a(0.1), border: '1px solid rgba(0,255,136,0.2)', background: 'rgba(0,255,136,0.03)', borderRadius: 4, padding: 32, marginBottom: 28, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#00ff88,#00d4ff,transparent)' }} />
            <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
              <div style={{ width: 68, height: 68, border: '2px solid #00ff88', borderRadius: 4, background: 'linear-gradient(135deg,#001a0f,#003322)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 30 }}>🛡️</div>
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Rutvik Chavda</div>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#00ff88', letterSpacing: 2, marginBottom: 4 }}>L2/L3 ENDPOINT SECURITY ENGINEER</div>
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>Sophos · Jamnagar, Gujarat, India</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 14 }}>Specialised L2/L3 Endpoint Security Engineer with deep expertise in Sophos Central, Intercept X, XDR, Data Lake, and Live Discover. I investigate, hunt, and neutralise threats across enterprise Windows, macOS, and Linux environments.</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85 }}>From EDR telemetry analysis and SQL-based log forensics to advanced root-cause investigations — I operate at the intersection of deep technical precision and enterprise security architecture.</p>
          </div>
          <div style={a(0.2)}>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(0,255,136,0.5)', letterSpacing: 3, marginBottom: 12 }}>DOMAIN TAGS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Sophos Central', 'Intercept X', 'XDR', 'EDR', 'Data Lake', 'Live Discover', 'Threat Hunting', 'Forensic Triage', 'Windows', 'macOS', 'Linux', 'PowerShell', 'Bash', 'SQL Analytics', 'Incident Response', 'Root Cause Analysis'].map(t => (
                <span key={t} style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(0,255,136,0.7)', border: '1px solid rgba(0,255,136,0.18)', background: 'rgba(0,255,136,0.05)', padding: '3px 9px', borderRadius: 2 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[{ l: 'Cases Resolved', v: '2000+', c: '#00ff88' }, { l: 'SLA Adherence', v: '99.2%', c: '#00d4ff' }, { l: 'CSAT Score', v: '4.9/5', c: '#f5c842' }, { l: 'Global Rank', v: 'Top 10', c: '#a855f7' }].map((s, i) => (
            <div key={s.l} style={{ ...a(0.15 + i * 0.08), border: `1px solid ${s.c}22`, background: `${s.c}07`, borderRadius: 4, padding: '20px 24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,${s.c},transparent)` }} />
              <div style={{ fontFamily: 'monospace', fontSize: 9, color: `${s.c}88`, letterSpacing: 3, marginBottom: 6 }}>{s.l}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 32, fontWeight: 900, color: s.c }}>{s.v}</div>
            </div>
          ))}
          <div style={{ ...a(0.5), border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', borderRadius: 4, padding: '16px 20px' }}>
            {[['LOCATION', 'Jamnagar, Gujarat, India'], ['ORGANISATION', 'Sophos'], ['SPECIALISATION', 'Endpoint Security & XDR'], ['PLATFORMS', 'Windows · macOS · Linux'], ['LANGUAGES', 'PowerShell · Bash · SQL']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 2 }}>{k}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────
function Skills() {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <Section id="skills" bg="#000008" accentColor="#00d4ff" num="02 · CAPABILITIES" heading="SKILL MATRIX">
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 32 }}>
        {SKILLS.map((cat, ci) => (
          <div key={cat.cat} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: `all 0.6s ease ${ci * 0.1}s` }}>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: cat.color, letterSpacing: 3, marginBottom: 18 }}>{cat.cat}</div>
            {cat.items.map((sk, si) => (
              <div key={sk.n} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{sk.n}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: cat.color }}>{sk.v}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 2, background: `linear-gradient(90deg,${cat.color},${cat.color}88)`, width: vis ? `${sk.v}%` : '0%', boxShadow: `0 0 8px ${cat.color}66`, transition: `width 1.2s ease ${0.4 + si * 0.1}s` }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────
function Experience() {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const achievements = ['Handled 2000+ complex L2/L3 cases across Windows, macOS, and Linux enterprise environments', 'Deep investigation of Sophos Intercept X, Central, XDR, and Data Lake telemetry for threat detection', 'Threat hunting using Live Discover SQL queries across large-scale endpoint datasets', 'Forensic triage and root-cause analysis of malware incidents, EDR detections, and policy misconfigurations', 'Developed PowerShell and Bash automation scripts for enterprise-scale remediation workflows', 'Contributed technical documentation, detection methodologies, and KB articles to global knowledge base', 'Global Support Services Excellence Award 2024 · Ranked Top 10 globally — FY25']
  const techStack = ['Sophos Central', 'Intercept X', 'XDR', 'Data Lake', 'Live Discover', 'PowerShell', 'Bash', 'SQL']
  return (
    <Section id="experience" bg="#00010a" accentColor="#f5c842" num="03 · DEPLOYMENT HISTORY" heading="EXPERIENCE">
      <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s', border: '1px solid rgba(0,255,136,0.2)', background: 'rgba(0,255,136,0.02)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#00ff88,transparent)' }} />
        <div style={{ padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(0,255,136,0.6)', letterSpacing: 3, marginBottom: 8 }}>FULL TIME · REMOTE</div>
            <h3 style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 'clamp(16px,2.5vw,26px)', color: '#fff', marginBottom: 8 }}>L2/L3 Technical Support Engineer</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: '#00ff88' }}>Sophos</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#00ff88', opacity: 0.4, display: 'inline-block' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 2 }}>2022 – Present</span>
            </div>
          </div>
          <div style={{ border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.06)', padding: '10px 20px', borderRadius: 2, textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88', animation: 'blink 1.5s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#00ff88', letterSpacing: 2 }}>ACTIVE</span>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>CURRENT DEPLOYMENT</div>
          </div>
        </div>
        <div style={{ padding: '24px 40px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(0,255,136,0.5)', letterSpacing: 3, marginBottom: 16 }}>MISSION LOG</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {achievements.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#00ff88', fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '20px 40px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(0,255,136,0.4)', letterSpacing: 3, marginBottom: 12 }}>TECH STACK</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {techStack.map(t => (
              <span key={t} style={{ fontFamily: 'monospace', fontSize: 9, color: '#00ff88', border: '1px solid rgba(0,255,136,0.25)', background: 'rgba(0,255,136,0.06)', padding: '3px 10px', borderRadius: 2 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
function Projects() {
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <Section id="projects" bg="#000008" accentColor="#a855f7" num="04 · OPERATIONS LOG" heading="PROJECTS">
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
        {PROJECTS.map((p, i) => (
          <div key={p.id} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: `all 0.6s ease ${i * 0.07}s`, border: `1px solid ${hov === i ? p.color + '55' : p.color + '18'}`, background: hov === i ? `${p.color}08` : 'rgba(255,255,255,0.015)', borderRadius: 4, padding: 24, position: 'relative', overflow: 'hidden', cursor: 'default', boxShadow: hov === i ? `0 0 30px ${p.color}12` : 'none' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${p.color},transparent)`, opacity: hov === i ? 1 : 0.3 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: p.color, border: `1px solid ${p.color}33`, background: `${p.color}0a`, padding: '2px 8px', borderRadius: 2, letterSpacing: 2 }}>{p.status}</span>
              <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: 2 }}>#{p.id}</span>
            </div>
            <h3 style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 4, lineHeight: 1.4 }}>{p.title}</h3>
            <div style={{ fontFamily: 'monospace', fontSize: 8, color: `${p.color}77`, letterSpacing: 2, marginBottom: 12 }}>{p.sub}</div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {p.metrics.map(m => (
                <div key={m.l} style={{ flex: 1, textAlign: 'center', border: `1px solid ${p.color}18`, background: `${p.color}05`, padding: '6px 4px', borderRadius: 2 }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color: p.color, marginBottom: 2 }}>{m.v}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.25)', letterSpacing: 1 }}>{m.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {p.tags.map(t => (
                <span key={t} style={{ fontFamily: 'monospace', fontSize: 8, color: `${p.color}88`, border: `1px solid ${p.color}18`, padding: '2px 7px', borderRadius: 2 }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── CERTS ───────────────────────────────────────────────────────────────────
function Certs() {
  const [vis, setVis] = useState(false)
  const [flipped, setFlipped] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <Section id="certs" bg="#00010a" accentColor="#f5c842" num="05 · CLEARANCES" heading="CERTIFICATIONS">
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', marginTop: -40, marginBottom: 40 }}>Click any card to reveal full details.</p>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
        {CERTS.map((cert, i) => (
          <div key={cert.id} onClick={() => setFlipped(flipped === i ? null : i)} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: `all 0.6s ease ${i * 0.08}s`, perspective: 1000, cursor: 'pointer', height: 240 }}>
            <div style={{ position: 'relative', height: '100%', transformStyle: 'preserve-3d', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transform: flipped === i ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
              {/* Front */}
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', border: `1px solid ${cert.color}28`, background: 'rgba(255,255,255,0.02)', borderRadius: 4, padding: 22, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${cert.color},transparent)` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ fontSize: 26, color: cert.color }}>{cert.icon}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 8, color: cert.color, border: `1px solid ${cert.color}33`, padding: '2px 7px', borderRadius: 2, letterSpacing: 2 }}>ACTIVE</span>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: 8, color: `${cert.color}66`, letterSpacing: 2, marginBottom: 6 }}>{cert.domain}</div>
                <h3 style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 12, color: '#fff', marginBottom: 6, lineHeight: 1.4 }}>{cert.name}</h3>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Sophos</div>
                <div style={{ position: 'absolute', bottom: 14, left: 22, fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.15)', letterSpacing: 2 }}>TAP TO FLIP · #{cert.id}</div>
              </div>
              {/* Back */}
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', border: `1px solid ${cert.color}44`, background: `${cert.color}08`, borderRadius: 4, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${cert.color},transparent)` }} />
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: `${cert.color}88`, letterSpacing: 3, marginBottom: 14 }}>CERTIFICATION DETAILS</div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>{cert.desc}</p>
                <div style={{ marginTop: 20, paddingTop: 14, borderTop: `1px solid ${cert.color}22`, fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>ISSUED BY SOPHOS · {cert.id}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── AWARDS ──────────────────────────────────────────────────────────────────
function Awards() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [hov, setHov] = useState<number | null>(null)
  const activeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    let alive = true, animId: number

    const run = async () => {
      const THREE = await import('three')
      if (!alive) return
      const W = canvas.clientWidth || 900, H = canvas.clientHeight || 480
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1
      const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2(0x000008, 0.025)
      const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 200); camera.position.set(0, 2.5, 15); camera.lookAt(0, 0, 0)
      scene.add(new THREE.AmbientLight(0x080818, 3))
      const rim = new THREE.DirectionalLight(0x00ffaa, 2.5); rim.position.set(-8, 6, -4); scene.add(rim)

      const grid = new THREE.GridHelper(80, 80, 0x003322, 0x001510); grid.position.y = -5; grid.material.opacity = 0.3; grid.material.transparent = true; scene.add(grid)

      const PC = 1800; const pGeo = new THREE.BufferGeometry(); const pPos = new Float32Array(PC * 3); const pCol = new Float32Array(PC * 3); const pSpd = new Float32Array(PC)
      const pal = AWARDS.map(a => new THREE.Color(a.color))
      for (let i = 0; i < PC; i++) { pPos[i*3]=(Math.random()-.5)*110; pPos[i*3+1]=(Math.random()-.5)*70; pPos[i*3+2]=(Math.random()-.5)*110; const c=pal[i%pal.length]; pCol[i*3]=c.r; pCol[i*3+1]=c.g; pCol[i*3+2]=c.b; pSpd[i]=.002+Math.random()*.005 }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3)); pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
      const pts = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: .09, vertexColors: true, transparent: true, opacity: .6 })); scene.add(pts)

      const TOTAL = AWARDS.length, R = 7.5
      const orbs: any[] = []
      AWARDS.forEach((aw, i) => {
        const angle = (i / TOTAL) * Math.PI * 2; const grp = new THREE.Group(); const col = new THREE.Color(aw.color)
        grp.position.set(Math.sin(angle) * R, 0, Math.cos(angle) * R)
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(.95, 1), new THREE.MeshPhysicalMaterial({ color: col, emissive: new THREE.Color(aw.emissive), emissiveIntensity: .8, metalness: .1, roughness: .04, transmission: .65, thickness: 2, transparent: true, opacity: .93 })); grp.add(core)
        const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.3, 1), new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: .13 })); grp.add(wire)
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.65, .022, 8, 100), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: .55 })); ring.rotation.x = Math.PI/2; grp.add(ring)
        const gc = document.createElement('canvas'); gc.width = 128; gc.height = 128; const gx = gc.getContext('2d')!; const gr = gx.createRadialGradient(64,64,0,64,64,64); gr.addColorStop(0,aw.color+'bb'); gr.addColorStop(.45,aw.color+'33'); gr.addColorStop(1,'transparent'); gx.fillStyle=gr; gx.fillRect(0,0,128,128)
        const gm = new THREE.Mesh(new THREE.PlaneGeometry(4.5,4.5), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(gc), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })); gm.renderOrder=1; grp.add(gm)
        const pl = new THREE.PointLight(col, 0, 7); grp.add(pl)
        scene.add(grp); orbs.push({ grp, core, wire, ring, gm, pl, baseAngle: angle, idx: i })
      })

      const bCore = new THREE.Mesh(new THREE.OctahedronGeometry(1.3,0), new THREE.MeshPhysicalMaterial({ color:0xffffff, emissive:0x44ffaa, emissiveIntensity:1.4, metalness:.9, roughness:0, transparent:true, opacity:.88 }))
      const bWire = new THREE.Mesh(new THREE.OctahedronGeometry(1.9,0), new THREE.MeshBasicMaterial({ color:0x00ff88, wireframe:true, transparent:true, opacity:.2 }))
      scene.add(bCore, bWire); const bLight = new THREE.PointLight(0x00ff88, 3, 16); scene.add(bLight)
      const oRing = new THREE.Mesh(new THREE.TorusGeometry(R,.014,6,240), new THREE.MeshBasicMaterial({ color:0x00ff88, transparent:true, opacity:.1 })); oRing.rotation.x=Math.PI/2; scene.add(oRing)

      let tRot=0, cRot=0, drag=false, dx0=0, dr0=0
      const snap = () => { const step=(Math.PI*2)/TOTAL; tRot=Math.round(tRot/step)*step; const idx=(((Math.round(-tRot/step)%TOTAL)+TOTAL)%TOTAL); activeRef.current=idx; setActiveIdx(idx) }
      const onMD=(e:MouseEvent)=>{drag=true;dx0=e.clientX;dr0=tRot}
      const onMM=(e:MouseEvent)=>{if(!drag)return;tRot=dr0+((e.clientX-dx0)/(canvas.clientWidth||W))*Math.PI*2}
      const onMU=()=>{if(drag){drag=false;snap()}}
      const onTS=(e:TouchEvent)=>{drag=true;dx0=e.touches[0].clientX;dr0=tRot}
      const onTM=(e:TouchEvent)=>{if(!drag)return;tRot=dr0+((e.touches[0].clientX-dx0)/(canvas.clientWidth||W))*Math.PI*2}
      const onTE=()=>{if(drag){drag=false;snap()}}
      canvas.addEventListener('mousedown',onMD); window.addEventListener('mousemove',onMM); window.addEventListener('mouseup',onMU)
      canvas.addEventListener('touchstart',onTS,{passive:true}); canvas.addEventListener('touchmove',onTM,{passive:true}); canvas.addEventListener('touchend',onTE)

      let t=0
      const tick=()=>{
        if(!alive)return; animId=requestAnimationFrame(tick); t+=.011; cRot+=(tRot-cRot)*.065
        const pa=pGeo.attributes.position.array as Float32Array; for(let i=0;i<PC;i++){pa[i*3+1]+=pSpd[i]*.5;if(pa[i*3+1]>35)pa[i*3+1]=-35}; pGeo.attributes.position.needsUpdate=true; pts.rotation.y=t*.015
        bCore.rotation.y=t*.7; bCore.rotation.x=t*.35; bWire.rotation.y=-t*.45; bWire.rotation.z=t*.22; bLight.intensity=2.5+Math.sin(t*2.2)*.9
        orbs.forEach(({grp,core,wire,ring,gm,pl,baseAngle,idx})=>{
          const active=idx===activeRef.current; const ang=baseAngle+cRot
          grp.position.x=Math.sin(ang)*R; grp.position.z=Math.cos(ang)*R; grp.position.y=Math.sin(t*1.3+idx*1.05)*.3+(active?1.1:0)
          const ts=active?1.4:.82; const s=grp.scale.x+(ts-grp.scale.x)*.07; grp.scale.setScalar(s)
          core.rotation.y+=active?.022:.007; core.rotation.x+=.005; wire.rotation.y-=.011; wire.rotation.z+=.007; ring.rotation.z=t*.6+idx
          gm.lookAt(camera.position); const gs=active?1+Math.sin(t*3)*.22:.5+Math.sin(t*1.5+idx)*.08; gm.scale.setScalar(gs)
          const tli=active?2.8:.25; pl.intensity+=(tli-pl.intensity)*.07
        })
        camera.position.x=Math.sin(t*.12)*.7; camera.position.y=2.5+Math.sin(t*.09)*.35; camera.lookAt(0,0,0)
        renderer.render(scene,camera)
      }
      tick()
      const onR=()=>{const w=canvas.clientWidth,h=canvas.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)}
      window.addEventListener('resize',onR)
      return()=>{alive=false;cancelAnimationFrame(animId);canvas.removeEventListener('mousedown',onMD);window.removeEventListener('mousemove',onMM);window.removeEventListener('mouseup',onMU);canvas.removeEventListener('touchstart',onTS);canvas.removeEventListener('touchmove',onTM);canvas.removeEventListener('touchend',onTE);window.removeEventListener('resize',onR);renderer.dispose()}
    }
    const p=run(); return()=>{alive=false;p.then(fn=>fn&&fn())}
  }, [])

  const active = AWARDS[activeIdx]
  return (
    <Section id="awards" bg="#000008" accentColor="#f5c842" num="06 · DISTINCTIONS" heading="AWARDS">
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', marginTop: -40, marginBottom: 32 }}>6 distinctions within a single organisation of thousands. Drag or click to explore.</p>
      <div style={{ position: 'relative', height: 460, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(0,255,136,0.1)', background: 'radial-gradient(ellipse at 50% 60%,rgba(0,70,35,.15) 0%,transparent 70%)', cursor: 'grab', marginBottom: 18 }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        <div style={{ position: 'absolute', top: 14, left: 16, fontFamily: 'monospace', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 2 }}>◈ AWARDS MATRIX · DRAG TO ROTATE</div>
        <div style={{ position: 'absolute', top: 14, right: 16, fontFamily: 'monospace', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 2 }}>{activeIdx + 1} / {AWARDS.length}</div>
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg,${active.color}1a,transparent)`, border: `1px solid ${active.color}44`, padding: '5px 24px', borderRadius: 2, color: active.color, fontSize: 10, fontFamily: 'monospace', letterSpacing: 3, whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}>
          {active.icon} {active.tag}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 36 }}>
        {AWARDS.map((a, i) => (
          <button key={i} onClick={() => { activeRef.current = i; setActiveIdx(i) }} style={{ width: activeIdx === i ? 28 : 8, height: 8, borderRadius: 4, border: 'none', padding: 0, cursor: 'pointer', background: activeIdx === i ? a.color : 'rgba(255,255,255,0.12)', transition: 'all 0.3s ease', boxShadow: activeIdx === i ? `0 0 12px ${a.color}99` : 'none' }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ border: `1px solid ${active.color}2e`, background: `${active.color}09`, borderRadius: 4, padding: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${active.color},transparent)` }} />
          <div style={{ fontFamily: 'monospace', fontSize: 9, color: `${active.color}88`, letterSpacing: 2, marginBottom: 4 }}>{active.category}</div>
          <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.25)', marginBottom: 18, letterSpacing: 2 }}>{active.date}</div>
          <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 16, color: active.color, filter: `drop-shadow(0 0 20px ${active.color})` }}>{active.icon}</div>
          <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: 2 }}>AWARD {String(activeIdx + 1).padStart(2, '0')} OF {String(AWARDS.length).padStart(2, '0')}</div>
        </div>
        <div style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.018)', borderRadius: 4, padding: 32, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${active.color},transparent)` }} />
          <h3 style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 'clamp(15px,2vw,22px)', color: '#fff', margin: '0 0 16px', lineHeight: 1.35 }}>{active.title}</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, margin: 0 }}>{active.description}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8 }}>
        {AWARDS.map((aw, i) => (
          <button key={i} onClick={() => { activeRef.current = i; setActiveIdx(i) }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ background: activeIdx === i ? `${aw.color}15` : hov === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)', border: activeIdx === i ? `1px solid ${aw.color}55` : '1px solid rgba(255,255,255,0.05)', borderRadius: 4, padding: '12px 6px', cursor: 'pointer', transition: 'all 0.25s', textAlign: 'center' }}>
            <div style={{ fontSize: 20, color: aw.color, marginBottom: 6, filter: activeIdx === i ? `drop-shadow(0 0 8px ${aw.color})` : 'none' }}>{aw.icon}</div>
            <div style={{ color: activeIdx === i ? aw.color : 'rgba(255,255,255,0.2)', fontSize: 7, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'monospace', lineHeight: 1.4 }}>{aw.tag}</div>
          </button>
        ))}
      </div>
    </Section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const [lines, setLines] = useState<string[]>([])
  const [inp, setInp] = useState('')
  const termRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  const sRef = useRef<HTMLElement>(null)

  const BOOT = ['> INITIALISING SECURE CHANNEL...', '> ENCRYPTION: AES-256-GCM · OK', '> IDENTITY VERIFIED · RUTVIK CHAVDA', '> CHANNEL OPEN · AWAITING INPUT', '']

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting && !started.current) {
        started.current = true; let i = 0
        const tick = () => { if (i < BOOT.length) { setLines(prev => [...prev, BOOT[i]]); i++; setTimeout(tick, 200) } }
        tick(); obs.disconnect()
      }
    }, { threshold: 0.2 })
    if (sRef.current) obs.observe(sRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => { if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight }, [lines])

  const send = () => {
    if (!inp.trim()) return
    setLines(prev => [...prev, `> MSG: "${inp}"`, '> ROUTING VIA SECURE CHANNEL...', '> DELIVERED · ACK RECEIVED ✓'])
    setInp('')
  }

  const LINKS = [
    { l: 'LinkedIn', v: 'Rutvik Chavda — View Profile', h: 'https://www.linkedin.com/in/rutvik-chavda-584b37197/', c: '#00d4ff', i: '◈' },
    { l: 'GitHub', v: 'github.com/RIK1849', h: 'https://github.com/RIK1849', c: '#a855f7', i: '◉' },
    { l: 'Sophos Community', v: 'community.sophos.com', h: 'https://community.sophos.com', c: '#00ff88', i: '◎' },
  ]

  return (
    <section id="contact" ref={sRef} style={{ background: '#00010a', padding: '120px 0 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#00d4ff33,transparent)' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#00d4ff' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#00d4ff', letterSpacing: 4 }}>07 · COMMS</span>
          </div>
          <h2 style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', letterSpacing: -1 }}>INITIATE CONTACT<span style={{ color: '#00d4ff' }}>.</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
          {/* Terminal */}
          <div style={{ border: '1px solid rgba(0,255,136,0.2)', background: 'rgba(0,5,2,0.9)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ background: 'rgba(0,255,136,0.06)', borderBottom: '1px solid rgba(0,255,136,0.1)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(0,255,136,0.4)', letterSpacing: 2, marginLeft: 8 }}>SECURE_CHANNEL.SH</span>
            </div>
            <div ref={termRef} style={{ height: 260, overflowY: 'auto', padding: '18px 18px 0' }}>
              {lines.map((line, i) => (
                <div key={i} style={{ fontFamily: 'monospace', fontSize: 11, color: (typeof line === 'string' && line.length > 0 && line[0] === '>') ? '#00ff88' : 'rgba(255,255,255,0.3)', marginBottom: 6, letterSpacing: 1, lineHeight: 1.6 }}>{line}</div>
              ))}
            </div>
            <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(0,255,136,0.08)', display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ color: '#00ff88', fontSize: 12, fontFamily: 'monospace' }}>›</span>
              <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type message and press Enter..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'monospace', fontSize: 11, color: '#00ff88', letterSpacing: 1 }} />
              <button onClick={send} style={{ fontFamily: 'monospace', fontSize: 9, color: '#000008', background: '#00ff88', border: 'none', padding: '6px 14px', borderRadius: 2, cursor: 'pointer', letterSpacing: 2 }}>SEND</button>
            </div>
          </div>
          {/* Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ border: '1px solid rgba(0,255,136,0.2)', background: 'rgba(0,255,136,0.04)', borderRadius: 4, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 12px #00ff88', animation: 'blink 1.5s ease-in-out infinite', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#00ff88', marginBottom: 2 }}>AVAILABLE FOR OPPORTUNITIES</div>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Open to senior endpoint security / threat hunting roles</div>
              </div>
            </div>
            {LINKS.map(lnk => (
              <a key={lnk.l} href={lnk.h} target="_blank" rel="noopener noreferrer" style={{ border: `1px solid ${lnk.c}22`, background: `${lnk.c}05`, borderRadius: 4, padding: '16px 22px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.25s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = lnk.c + '55'; el.style.background = lnk.c + '0d' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = lnk.c + '22'; el.style.background = lnk.c + '05' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: 2, height: '100%', background: lnk.c, opacity: 0.5 }} />
                <span style={{ fontSize: 18, color: lnk.c }}>{lnk.i}</span>
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: 9, color: `${lnk.c}88`, letterSpacing: 2, marginBottom: 2 }}>{lnk.l}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{lnk.v}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: `${lnk.c}44`, fontSize: 14 }}>→</span>
              </a>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div style={{ marginTop: 70, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#00ff88', marginBottom: 3, letterSpacing: 2 }}>RUTVIK CHAVDA</div>
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: 2 }}>L2/L3 ENDPOINT SECURITY ENGINEER · SOPHOS</div>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.15)', letterSpacing: 2, textAlign: 'right' }}>
            <div>BUILT WITH NEXT.JS · THREE.JS · WEBGL</div>
            <div style={{ marginTop: 4 }}>© 2025 RUTVIK CHAVDA</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes cursorPulse { 0%,100%{opacity:1;transform:rotate(45deg) scale(1)} 50%{opacity:.4;transform:rotate(45deg) scale(1.4)} }
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#000008;color:#e0ffe8;font-family:system-ui,sans-serif;overflow-x:hidden;cursor:none}
        body::before{content:'';position:fixed;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,136,.012) 2px,rgba(0,255,136,.012) 4px);pointer-events:none;z-index:9998}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#000} ::-webkit-scrollbar-thumb{background:#00ff88;border-radius:2px}
        ::selection{background:rgba(0,255,136,.2);color:#fff}
        input::placeholder{color:rgba(0,255,136,.3)}
      `}</style>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certs />
        <Awards />
        <Contact />
      </main>
    </>
  )
}