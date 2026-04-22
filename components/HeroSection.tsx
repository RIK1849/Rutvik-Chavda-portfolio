'use client'
import { useEffect, useRef, useState } from 'react'

const PILLS = [
  { label: 'SOPHOS', val: 'CERTIFIED', color: '#00ff88' },
  { label: 'XDR/EDR', val: 'EXPERT', color: '#00d4ff' },
  { label: 'GLOBAL RANK', val: 'TOP 10', color: '#f5c842' },
  { label: 'AWARDS', val: '6 TOTAL', color: '#a855f7' },
]

const FULL_TEXT = 'L2/L3 ENDPOINT SECURITY & XDR ENGINEER'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [typed, setTyped] = useState('')
  const [show, setShow] = useState(false)

  // Typewriter
  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      i++
      setTyped(FULL_TEXT.slice(0, i))
      if (i >= FULL_TEXT.length) { clearInterval(t); setShow(true) }
    }, 50)
    return () => clearInterval(t)
  }, [])

  // Three.js scene
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animId: number
    let mounted = true

    const run = async () => {
      const THREE = await import('three')
      if (!mounted || !canvasRef.current) return

      const W = canvas.clientWidth || window.innerWidth
      const H = canvas.clientHeight || window.innerHeight

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping

      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x000008, 0.02)

      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
      camera.position.set(0, 0, 18)

      // Lights
      scene.add(new THREE.AmbientLight(0x001122, 4))
      const d1 = new THREE.DirectionalLight(0x00ff88, 2)
      d1.position.set(5, 5, 5); scene.add(d1)
      const d2 = new THREE.DirectionalLight(0x0044ff, 1.5)
      d2.position.set(-5, -3, 3); scene.add(d2)

      // Core group
      const coreGroup = new THREE.Group()

      // Outer shell
      const dodGeo = new THREE.DodecahedronGeometry(3.5, 0)
      coreGroup.add(new THREE.Mesh(dodGeo, new THREE.MeshPhysicalMaterial({
        color: 0x003322, emissive: 0x00ff88, emissiveIntensity: 0.12,
        metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.22,
      })))
      const dodWire = new THREE.Mesh(dodGeo, new THREE.MeshBasicMaterial({
        color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.18,
      }))
      coreGroup.add(dodWire)

      // Inner
      const icoGeo = new THREE.IcosahedronGeometry(2.2, 1)
      coreGroup.add(new THREE.Mesh(icoGeo, new THREE.MeshPhysicalMaterial({
        color: 0x001133, emissive: 0x0066ff, emissiveIntensity: 0.4,
        metalness: 1, roughness: 0, transparent: true, opacity: 0.45,
      })))

      // Core glow
      const coreMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.0, 32, 32),
        new THREE.MeshPhysicalMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 2, transparent: true, opacity: 0.9 })
      )
      coreGroup.add(coreMesh)

      const coreLight = new THREE.PointLight(0x00ff88, 4, 25)
      coreGroup.add(coreLight)
      scene.add(coreGroup)

      // Rings
      const ringConfigs = [
        { r: 4.5, rx: 0, ry: 0, rz: 0, speed: 0.4, color: 0x00ff88 },
        { r: 5.5, rx: Math.PI/3, ry: 0, rz: 0, speed: -0.3, color: 0x00d4ff },
        { r: 6.5, rx: Math.PI/5, ry: Math.PI/4, rz: 0, speed: 0.2, color: 0xf5c842 },
        { r: 7.5, rx: -Math.PI/4, ry: 0, rz: Math.PI/6, speed: -0.15, color: 0xa855f7 },
      ]
      const rings = ringConfigs.map(cfg => {
        const mesh = new THREE.Mesh(
          new THREE.TorusGeometry(cfg.r, 0.018, 8, 200),
          new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.65 })
        )
        mesh.rotation.set(cfg.rx, cfg.ry, cfg.rz)
        scene.add(mesh)
        return { mesh, speed: cfg.speed }
      })

      // Floating nodes
      const nodeColors = [0x00ff88, 0x00d4ff, 0xf5c842, 0xa855f7, 0xff6b6b]
      const nodes = Array.from({ length: 24 }, (_, i) => {
        const mesh = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.08 + Math.random() * 0.1, 0),
          new THREE.MeshBasicMaterial({ color: nodeColors[i % nodeColors.length] })
        )
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        const r = 8 + Math.random() * 5
        mesh.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi) * 0.5, r * Math.sin(phi) * Math.sin(theta))
        scene.add(mesh)
        return { mesh, theta, phi, r, speed: 0.003 + Math.random() * 0.005, offset: Math.random() * Math.PI * 2 }
      })

      // Stars
      const starCount = 2000
      const starGeo = new THREE.BufferGeometry()
      const starPos = new Float32Array(starCount * 3)
      for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 300
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.07, color: 0x44ffaa, transparent: true, opacity: 0.5 })))

      // Grid
      const grid = new THREE.GridHelper(60, 60, 0x003322, 0x001510)
      grid.position.y = -8; grid.material.opacity = 0.25; grid.material.transparent = true
      scene.add(grid)

      // Mouse
      let mx = 0, my = 0
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2
        my = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouse)

      let t = 0
      const animate = () => {
        if (!mounted) return
        animId = requestAnimationFrame(animate)
        t += 0.008

        coreGroup.rotation.y = t * 0.25
        coreGroup.rotation.x = Math.sin(t * 0.3) * 0.15
        dodWire.rotation.x = t * 0.12
        dodWire.rotation.z = t * 0.08
        coreLight.intensity = 3.5 + Math.sin(t * 2.5) * 1.2

        rings.forEach(({ mesh, speed }) => { mesh.rotation.y += speed * 0.012 })

        nodes.forEach(n => {
          n.theta += n.speed
          n.mesh.position.x = n.r * Math.sin(n.phi) * Math.cos(n.theta)
          n.mesh.position.z = n.r * Math.sin(n.phi) * Math.sin(n.theta)
          n.mesh.position.y = n.r * Math.cos(n.phi) * 0.5 + Math.sin(t + n.offset) * 0.5
          n.mesh.rotation.y += 0.03
        })

        camera.position.x += (mx * 2 - camera.position.x) * 0.04
        camera.position.y += (-my * 1 - camera.position.y) * 0.04
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight
        camera.aspect = w / h; camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      return () => {
        mounted = false
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
      }
    }

    const cleanup = run()
    return () => { mounted = false; cancelAnimationFrame(animId); cleanup.then(fn => fn && fn()) }
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000008' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Corner brackets */}
      {[
        { top: 24, left: 24, borderTop: '2px solid #00ff88', borderLeft: '2px solid #00ff88' },
        { top: 24, right: 24, borderTop: '2px solid #00ff88', borderRight: '2px solid #00ff88' },
        { bottom: 24, left: 24, borderBottom: '2px solid #00ff88', borderLeft: '2px solid #00ff88' },
        { bottom: 24, right: 24, borderBottom: '2px solid #00ff88', borderRight: '2px solid #00ff88' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 60, height: 60, zIndex: 10, opacity: 0.7, ...s }} />
      ))}

      {/* Top HUD bar */}
      <div style={{ position: 'absolute', top: 80, left: 40, right: 40, zIndex: 10, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'rgba(0,255,136,0.35)', letterSpacing: 2 }}>
        <span>SYS.STATUS: ONLINE</span>
        <span>THREAT.LVL: NEUTRALISED</span>
        <span>ENG.CLASS: L2/L3</span>
      </div>

      {/* Main content */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.06)', padding: '6px 20px', borderRadius: 2, marginBottom: 32, fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#00ff88', letterSpacing: 3, animation: 'fadeIn 1s ease 0.5s both' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', display: 'inline-block', boxShadow: '0 0 8px #00ff88', animation: 'blink 1.5s ease-in-out infinite' }} />
          IDENTITY VERIFIED · SOPHOS GLOBAL TOP 10
        </div>

        {/* Name */}
        <h1 style={{ fontFamily: 'var(--font-orbitron), monospace', fontWeight: 900, fontSize: 'clamp(44px,8vw,96px)', letterSpacing: '-2px', lineHeight: 0.95, margin: '0 0 20px', background: 'linear-gradient(135deg,#ffffff 0%,#00ff88 40%,#00d4ff 70%,#f5c842 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'fadeUp 0.8s ease 0.8s both' }}>
          RUTVIK<br />CHAVDA
        </h1>

        {/* Typewriter */}
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 'clamp(11px,1.8vw,16px)', color: '#00d4ff', letterSpacing: 4, marginBottom: 40, minHeight: 24, animation: 'fadeIn 1s ease 1.2s both' }}>
          {typed}<span style={{ animation: 'blink 1s step-end infinite', color: '#00ff88' }}>█</span>
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48, animation: 'fadeUp 0.8s ease 1.5s both' }}>
          {PILLS.map(s => (
            <div key={s.label} style={{ border: `1px solid ${s.color}33`, background: `${s.color}0a`, padding: '10px 20px', borderRadius: 2, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: `${s.color}88`, letterSpacing: 2, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-orbitron), monospace', fontSize: 13, fontWeight: 700, color: s.color, letterSpacing: 2 }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, animation: 'fadeUp 0.8s ease 1.8s both' }}>
          <a href="#about" style={{ fontFamily: 'var(--font-orbitron), monospace', fontSize: 11, letterSpacing: 3, color: '#000008', background: '#00ff88', padding: '14px 32px', borderRadius: 2, textDecoration: 'none', boxShadow: '0 0 20px #00ff8855', display: 'inline-block' }}>EXPLORE PROFILE</a>
          <a href="#contact" style={{ fontFamily: 'var(--font-orbitron), monospace', fontSize: 11, letterSpacing: 3, color: '#00ff88', background: 'transparent', border: '1px solid #00ff8866', padding: '14px 32px', borderRadius: 2, textDecoration: 'none', display: 'inline-block' }}>INITIATE CONTACT</a>
        </div>
      </div>

      {/* Bottom HUD */}
      <div style={{ position: 'absolute', bottom: 24, left: 40, right: 40, zIndex: 10, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: 'rgba(0,255,136,0.3)', letterSpacing: 2 }}>
        <span>LAT: 22.3N · LONG: 70.1E · JAMNAGAR IN</span>
        <span>SOPHOS CENTRAL · INTERCEPT X · XDR</span>
      </div>
    </section>
  )
}
