'use client'
import { useEffect, useRef, useState } from 'react'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [typedText, setTypedText] = useState('')
  const fullText = 'L2/L3 ENDPOINT SECURITY & XDR ENGINEER'

  useEffect(() => {
    // Typewriter
    let i = 0
    const t = setInterval(() => {
      setTypedText(fullText.slice(0, i))
      i++
      if (i > fullText.length) { clearInterval(t); setLoaded(true) }
    }, 45)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let THREE: any
    let renderer: any, scene: any, camera: any, raf: number

    const init = async () => {
      THREE = await import('three')
      const W = canvas.clientWidth, H = canvas.clientHeight

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.0

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
      camera.position.set(0, 0, 18)

      // Ambient + directional lights
      scene.add(new THREE.AmbientLight(0x001122, 4))
      const d1 = new THREE.DirectionalLight(0x00ff88, 2)
      d1.position.set(5, 5, 5); scene.add(d1)
      const d2 = new THREE.DirectionalLight(0x0044ff, 1.5)
      d2.position.set(-5, -3, 3); scene.add(d2)

      // ── Central Shield / Core ──────────────────────────────────────────────
      const coreGroup = new THREE.Group()

      // Outer dodecahedron ring
      const dodGeo = new THREE.DodecahedronGeometry(3.5, 0)
      const dodMat = new THREE.MeshPhysicalMaterial({
        color: 0x003322, emissive: 0x00ff88, emissiveIntensity: 0.15,
        metalness: 0.9, roughness: 0.1, wireframe: false, transparent: true, opacity: 0.25
      })
      coreGroup.add(new THREE.Mesh(dodGeo, dodMat))

      // Dodecahedron wireframe
      const dodWire = new THREE.Mesh(dodGeo.clone(), new THREE.MeshBasicMaterial({
        color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.2
      }))
      coreGroup.add(dodWire)

      // Inner icosahedron
      const icoGeo = new THREE.IcosahedronGeometry(2.2, 1)
      const icoMat = new THREE.MeshPhysicalMaterial({
        color: 0x001133, emissive: 0x0066ff, emissiveIntensity: 0.4,
        metalness: 1, roughness: 0, transparent: true, opacity: 0.5,
        transmission: 0.3, thickness: 2
      })
      coreGroup.add(new THREE.Mesh(icoGeo, icoMat))

      // Core glow sphere
      const coreGeo = new THREE.SphereGeometry(1.0, 32, 32)
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 2,
        metalness: 0, roughness: 0, transparent: true, opacity: 0.9
      })
      const coreMesh = new THREE.Mesh(coreGeo, coreMat)
      coreGroup.add(coreMesh)

      // Core point light
      const coreLight = new THREE.PointLight(0x00ff88, 4, 25)
      coreGroup.add(coreLight)

      scene.add(coreGroup)

      // ── Orbital Rings ──────────────────────────────────────────────────────
      const rings: any[] = []
      const ringConfigs = [
        { r: 4.5, tube: 0.02, color: 0x00ff88, rotX: 0, rotY: 0, rotZ: 0, speed: 0.4 },
        { r: 5.5, tube: 0.015, color: 0x00d4ff, rotX: Math.PI/3, rotY: 0, rotZ: 0, speed: -0.3 },
        { r: 6.5, tube: 0.012, color: 0xf5c842, rotX: Math.PI/5, rotY: Math.PI/4, rotZ: 0, speed: 0.2 },
        { r: 7.5, tube: 0.01, color: 0xa855f7, rotX: -Math.PI/4, rotY: 0, rotZ: Math.PI/6, speed: -0.15 },
      ]
      ringConfigs.forEach(cfg => {
        const geo = new THREE.TorusGeometry(cfg.r, cfg.tube, 8, 200)
        const mat = new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.7 })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.rotation.set(cfg.rotX, cfg.rotY, cfg.rotZ)
        scene.add(mesh)
        rings.push({ mesh, speed: cfg.speed, baseRotX: cfg.rotX })
      })

      // ── HUD Arc markers on rings ───────────────────────────────────────────
      const arcGroup = new THREE.Group()
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2
        const r = 5.5
        const geo = new THREE.BoxGeometry(0.05, 0.3, 0.05)
        const mat = new THREE.MeshBasicMaterial({ color: 0x00ff88 })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r)
        mesh.lookAt(0, 0, 0)
        arcGroup.add(mesh)
      }
      scene.add(arcGroup)

      // ── Floating data nodes ────────────────────────────────────────────────
      const nodes: any[] = []
      const nodeColors = [0x00ff88, 0x00d4ff, 0xf5c842, 0xa855f7, 0xff6b6b]
      for (let i = 0; i < 28; i++) {
        const geo = new THREE.OctahedronGeometry(0.08 + Math.random() * 0.12, 0)
        const col = nodeColors[i % nodeColors.length]
        const mat = new THREE.MeshBasicMaterial({ color: col })
        const mesh = new THREE.Mesh(geo, mat)
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        const r = 8 + Math.random() * 5
        mesh.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.5,
          r * Math.sin(phi) * Math.sin(theta)
        )
        scene.add(mesh)
        nodes.push({ mesh, theta, phi, r, speed: 0.002 + Math.random() * 0.006, offset: Math.random() * Math.PI * 2 })
      }

      // ── Star field ────────────────────────────────────────────────────────
      const starGeo = new THREE.BufferGeometry()
      const starPos = new Float32Array(3000 * 3)
      const starCol = new Float32Array(3000 * 3)
      for (let i = 0; i < 3000; i++) {
        starPos[i*3]   = (Math.random()-0.5)*300
        starPos[i*3+1] = (Math.random()-0.5)*300
        starPos[i*3+2] = (Math.random()-0.5)*300
        const c = new THREE.Color().setHSL(0.35 + Math.random()*0.3, 0.8, 0.6)
        starCol[i*3] = c.r; starCol[i*3+1] = c.g; starCol[i*3+2] = c.b
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
      starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3))
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.08, vertexColors: true, transparent: true, opacity: 0.6 })))

      // ── Holographic grid floor ─────────────────────────────────────────────
      const grid = new THREE.GridHelper(60, 60, 0x003322, 0x001510)
      grid.position.y = -8
      grid.material.opacity = 0.3
      grid.material.transparent = true
      scene.add(grid)

      // ── Mouse parallax ────────────────────────────────────────────────────
      let mx = 0, my = 0
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2
        my = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouse)

      // ── Animate ───────────────────────────────────────────────────────────
      let t = 0
      const animate = () => {
        raf = requestAnimationFrame(animate)
        t += 0.008

        coreGroup.rotation.y = t * 0.25
        coreGroup.rotation.x = Math.sin(t * 0.3) * 0.15
        dodWire.rotation.x = t * 0.15
        dodWire.rotation.z = t * 0.1
        coreLight.intensity = 3.5 + Math.sin(t * 2.5) * 1.2

        rings.forEach(({ mesh, speed }) => { mesh.rotation.y += speed * 0.012 })
        arcGroup.rotation.y = t * 0.08

        nodes.forEach(n => {
          n.theta += n.speed
          n.mesh.position.x = n.r * Math.sin(n.phi) * Math.cos(n.theta)
          n.mesh.position.z = n.r * Math.sin(n.phi) * Math.sin(n.theta)
          n.mesh.position.y = n.r * Math.cos(n.phi) * 0.5 + Math.sin(t + n.offset) * 0.5
          n.mesh.rotation.y += 0.03
        })

        // Camera parallax
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
        cancelAnimationFrame(raf)
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
      }
    }

    const cleanup = init()
    return () => { cleanup.then(fn => fn && fn()) }
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000008' }}>
      {/* Three.js canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Corner HUD brackets */}
      {[
        { top: 24, left: 24, borderTop: '2px solid #00ff88', borderLeft: '2px solid #00ff88' },
        { top: 24, right: 24, borderTop: '2px solid #00ff88', borderRight: '2px solid #00ff88' },
        { bottom: 24, left: 24, borderBottom: '2px solid #00ff88', borderLeft: '2px solid #00ff88' },
        { bottom: 24, right: 24, borderBottom: '2px solid #00ff88', borderRight: '2px solid #00ff88' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 60, height: 60, zIndex: 10, opacity: 0.7, ...s }} />
      ))}

      {/* Top HUD bar */}
      <div style={{
        position: 'absolute', top: 80, left: 0, right: 0, zIndex: 10,
        display: 'flex', justifyContent: 'space-between', padding: '0 40px',
        fontFamily: 'Share Tech Mono', fontSize: 10, color: 'rgba(0,255,136,0.4)', letterSpacing: 2
      }}>
        <span>SYS.STATUS: ONLINE</span>
        <span>THREAT.LVL: NEUTRALISED</span>
        <span>ENG.CLASS: L2/L3</span>
      </div>

      {/* Main hero content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px'
      }}>
        {/* Status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.06)',
          padding: '6px 20px', borderRadius: 2, marginBottom: 32,
          fontFamily: 'Share Tech Mono', fontSize: 11, color: '#00ff88', letterSpacing: 3,
          animation: 'fadeIn 1s ease 0.5s both'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', display: 'inline-block', boxShadow: '0 0 8px #00ff88', animation: 'blink 1.5s ease-in-out infinite' }} />
          IDENTITY VERIFIED · SOPHOS GLOBAL TOP 10
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'Orbitron', fontWeight: 900,
          fontSize: 'clamp(44px, 8vw, 96px)',
          letterSpacing: '-2px', lineHeight: 0.95,
          margin: '0 0 20px',
          background: 'linear-gradient(135deg, #ffffff 0%, #00ff88 40%, #00d4ff 70%, #f5c842 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          animation: 'fadeUp 0.8s ease 0.8s both',
          filter: 'drop-shadow(0 0 30px rgba(0,255,136,0.3))'
        }}>
          RUTVIK<br />CHAVDA
        </h1>

        {/* Typewriter title */}
        <div style={{
          fontFamily: 'Share Tech Mono', fontSize: 'clamp(11px, 1.8vw, 16px)',
          color: '#00d4ff', letterSpacing: 4, marginBottom: 40,
          minHeight: 24, animation: 'fadeIn 1s ease 1.2s both'
        }}>
          {typedText}<span style={{ animation: 'blink 1s step-end infinite', color: '#00ff88' }}>█</span>
        </div>

        {/* Stat pills */}
        <div style={{
          display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: 48, animation: 'fadeUp 0.8s ease 1.5s both'
        }}>
          {[
            { label: 'SOPHOS', val: 'CERTIFIED', color: '#00ff88' },
            { label: 'XDR/EDR', val: 'EXPERT', color: '#00d4ff' },
            { label: 'GLOBAL RANK', val: 'TOP 10', color: '#f5c842' },
            { label: 'AWARDS', val: '6 TOTAL', color: '#a855f7' },
          ].map(s => (
            <div key={s.label} style={{
              border: `1px solid ${s.color}33`, background: `${s.color}0a`,
              padding: '10px 20px', borderRadius: 2, textAlign: 'center'
            }}>
              <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: `${s.color}88`, letterSpacing: 2, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'Orbitron', fontSize: 13, fontWeight: 700, color: s.color, letterSpacing: 2 }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 16, animation: 'fadeUp 0.8s ease 1.8s both' }}>
          <a href="#experience" style={{
            fontFamily: 'Orbitron', fontSize: 11, letterSpacing: 3,
            color: '#000008', background: '#00ff88', border: 'none',
            padding: '14px 32px', borderRadius: 2, textDecoration: 'none',
            boxShadow: '0 0 20px #00ff8855, 0 0 40px #00ff8822',
            transition: 'all 0.3s', display: 'inline-block'
          }}>EXPLORE PROFILE</a>
          <a href="#contact" style={{
            fontFamily: 'Orbitron', fontSize: 11, letterSpacing: 3,
            color: '#00ff88', background: 'transparent',
            border: '1px solid #00ff8866', padding: '14px 32px', borderRadius: 2,
            textDecoration: 'none', transition: 'all 0.3s', display: 'inline-block'
          }}>INITIATE CONTACT</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'fadeIn 1s ease 2.5s both'
      }}>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 3 }}>SCROLL TO INITIALISE</div>
        <div style={{
          width: 1, height: 40, background: 'linear-gradient(to bottom, #00ff88, transparent)',
          animation: 'pulseGlow 2s ease-in-out infinite'
        }} />
      </div>

      {/* Bottom HUD */}
      <div style={{
        position: 'absolute', bottom: 24, left: 40, right: 40, zIndex: 10,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.3)', letterSpacing: 2
      }}>
        <span>LAT: 22.3°N · LONG: 70.1°E · JAMNAGAR, GJ, IN</span>
        <span>SOPHOS CENTRAL · INTERCEPT X · XDR · DATA LAKE</span>
        <span>UPTIME: {Math.floor(Date.now()/1000) % 86400}s</span>
      </div>
    </section>
  )
}
