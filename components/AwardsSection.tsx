'use client'
import { useEffect, useRef, useState } from 'react'

const AWARDS = [
  {
    id: 1, icon: '◈', tag: 'GLOBAL EXCELLENCE',
    category: 'GLOBAL EXCELLENCE · SOPHOS SUPPORT', date: 'May 2025',
    title: 'Global Support Services Excellence Award (2024)',
    description: 'Recognised with the Global Support Services Excellence Award 2024 at Sophos for outstanding performance in Endpoint Security and Technical Support. Resolved complex L2/L3 issues across Windows environments, including EDR (Sophos Intercept X) and XDR telemetry analysis.',
    color: '#f5c842', emissive: 0xf5a800,
  },
  {
    id: 2, icon: '◉', tag: 'TOP 10 WORLDWIDE',
    category: 'GLOBAL RANKING · TOP 10 WORLDWIDE', date: 'Nov 2023',
    title: 'Sophos Support Team Top 10 — FY25',
    description: 'Ranked among the top 10 support engineers globally at Sophos for FY25 — recognised for outstanding case quality, consistent SLA adherence, customer satisfaction scores, and internal knowledge contribution across the endpoint security portfolio.',
    color: '#00ff88', emissive: 0x00cc66,
  },
  {
    id: 3, icon: '◎', tag: 'COMMUNITY CONTRIBUTOR',
    category: 'COMMUNITY · QUARTERLY RECOGNITION', date: 'Q1 2024',
    title: 'Top Community Contributor — Q1 2024',
    description: 'Awarded Top Community Contributor for Q1 2024 in recognition of consistent, high-quality technical contributions to the Sophos community forums, documentation improvements, and peer knowledge sharing across security domains.',
    color: '#00d4ff', emissive: 0x0099cc,
  },
  {
    id: 4, icon: '◎', tag: 'COMMUNITY CONTRIBUTOR',
    category: 'COMMUNITY · QUARTERLY RECOGNITION', date: 'Q2 2024',
    title: 'Top Community Contributor — Q2 2024',
    description: 'Consecutive quarterly recognition for sustained technical excellence and community leadership within the Sophos ecosystem, demonstrating deep specialisation in endpoint security, threat hunting, and XDR workflows.',
    color: '#a855f7', emissive: 0x7c22cc,
  },
  {
    id: 5, icon: '◎', tag: 'COMMUNITY CONTRIBUTOR',
    category: 'COMMUNITY · QUARTERLY RECOGNITION', date: 'Q3 2024',
    title: 'Top Community Contributor — Q3 2024',
    description: 'Third consecutive quarterly award, underlining consistent excellence and long-term impact on the Sophos community — from advanced troubleshooting guides to forensic triage methodologies shared with the global technical community.',
    color: '#ff6b6b', emissive: 0xcc3333,
  },
  {
    id: 6, icon: '★', tag: 'TOP CONTRIBUTOR',
    category: 'ANNUAL · TOP CONTRIBUTOR', date: '2024',
    title: 'Full-Year Top Contributor 2024',
    description: 'Awarded the Full-Year Top Contributor title for 2024 — the highest community recognition at Sophos, granted to engineers demonstrating sustained excellence across all four quarters in case resolution, knowledge creation, and community impact.',
    color: '#ff9500', emissive: 0xcc7000,
  },
]

export default function AwardsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const activeRef = useRef(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let THREE: any, renderer: any, raf: number

    const init = async () => {
      THREE = await import('three')
      const W = canvas.clientWidth || 900
      const H = canvas.clientHeight || 480

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15

      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x000008, 0.025)

      const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 200)
      camera.position.set(0, 2.5, 15)
      camera.lookAt(0, 0, 0)

      // Lighting
      scene.add(new THREE.AmbientLight(0x080818, 3))
      const rim = new THREE.DirectionalLight(0x00ffaa, 2.5); rim.position.set(-8, 6, -4); scene.add(rim)
      const fill = new THREE.DirectionalLight(0x0033ff, 1.2); fill.position.set(8, -4, 4); scene.add(fill)

      // Grid
      const grid = new THREE.GridHelper(80, 80, 0x003322, 0x001510)
      grid.position.y = -5; grid.material.opacity = 0.3; grid.material.transparent = true; scene.add(grid)

      // Particles
      const PC = 2200
      const pGeo = new THREE.BufferGeometry()
      const pPos = new Float32Array(PC * 3), pCol = new Float32Array(PC * 3), pSpd = new Float32Array(PC)
      const palette = AWARDS.map(a => new THREE.Color(a.color))
      for (let i = 0; i < PC; i++) {
        pPos[i*3] = (Math.random()-0.5)*110; pPos[i*3+1] = (Math.random()-0.5)*70; pPos[i*3+2] = (Math.random()-0.5)*110
        const c = palette[i % palette.length]; pCol[i*3] = c.r; pCol[i*3+1] = c.g; pCol[i*3+2] = c.b
        pSpd[i] = 0.002 + Math.random() * 0.005
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
      const pts = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.1, vertexColors: true, transparent: true, opacity: 0.6, sizeAttenuation: true }))
      scene.add(pts)

      // Orbs
      const TOTAL = AWARDS.length, RADIUS = 7.5
      const orbData: any[] = []
      AWARDS.forEach((award, i) => {
        const angle = (i / TOTAL) * Math.PI * 2
        const grp = new THREE.Group()
        grp.position.set(Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS)
        const col = new THREE.Color(award.color)

        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.95, 1),
          new THREE.MeshPhysicalMaterial({ color: col, emissive: new THREE.Color(award.emissive), emissiveIntensity: 0.8, metalness: 0.1, roughness: 0.04, transmission: 0.65, thickness: 2, transparent: true, opacity: 0.93 })
        )
        grp.add(core)

        const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.3, 1), new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.14 }))
        grp.add(wire)

        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.022, 8, 100), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55 }))
        ring.rotation.x = Math.PI / 2; grp.add(ring)

        // Glow sprite
        const gc = document.createElement('canvas'); gc.width = 128; gc.height = 128
        const gctx = gc.getContext('2d')!
        const gr = gctx.createRadialGradient(64,64,0,64,64,64)
        gr.addColorStop(0, award.color + 'bb'); gr.addColorStop(0.45, award.color + '33'); gr.addColorStop(1, 'transparent')
        gctx.fillStyle = gr; gctx.fillRect(0,0,128,128)
        const gMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(4.5, 4.5),
          new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(gc), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
        )
        gMesh.renderOrder = 1; grp.add(gMesh)

        const pl = new THREE.PointLight(col, 0, 7); grp.add(pl)
        scene.add(grp)
        orbData.push({ grp, core, wire, ring, gMesh, pl, baseAngle: angle, index: i })
      })

      // Central beacon
      const bCore = new THREE.Mesh(new THREE.OctahedronGeometry(1.3, 0), new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0x44ffaa, emissiveIntensity: 1.4, metalness: 0.9, roughness: 0, transparent: true, opacity: 0.88 }))
      const bWire = new THREE.Mesh(new THREE.OctahedronGeometry(1.9, 0), new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.2 }))
      scene.add(bCore, bWire)
      const beaconLight = new THREE.PointLight(0x00ff88, 3, 16); scene.add(beaconLight)

      // Orbit ring
      const oRing = new THREE.Mesh(new THREE.TorusGeometry(RADIUS, 0.014, 6, 240), new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.1 }))
      oRing.rotation.x = Math.PI / 2; scene.add(oRing)

      // Interaction
      let targetRot = 0, currentRot = 0, dragging = false, dragX0 = 0, dragRot0 = 0

      const snap = () => {
        const step = (Math.PI * 2) / TOTAL
        targetRot = Math.round(targetRot / step) * step
        const idx = (((Math.round(-targetRot / step) % TOTAL) + TOTAL) % TOTAL)
        activeRef.current = idx; setActiveIndex(idx)
      }
      const onMD = (e: MouseEvent) => { dragging = true; dragX0 = e.clientX; dragRot0 = targetRot }
      const onMM = (e: MouseEvent) => { if (!dragging) return; targetRot = dragRot0 + ((e.clientX - dragX0) / (canvas.clientWidth||W)) * Math.PI * 2 }
      const onMU = () => { if (dragging) { dragging = false; snap() } }
      const onTC = (e: TouchEvent) => { dragging = true; dragX0 = e.touches[0].clientX; dragRot0 = targetRot }
      const onTM = (e: TouchEvent) => { if (!dragging) return; targetRot = dragRot0 + ((e.touches[0].clientX - dragX0) / (canvas.clientWidth||W)) * Math.PI * 2 }
      const onTE = () => { if (dragging) { dragging = false; snap() } }

      canvas.addEventListener('mousedown', onMD)
      window.addEventListener('mousemove', onMM)
      window.addEventListener('mouseup', onMU)
      canvas.addEventListener('touchstart', onTC, { passive: true })
      canvas.addEventListener('touchmove', onTM, { passive: true })
      canvas.addEventListener('touchend', onTE)

      // Animate
      let t = 0
      const animate = () => {
        raf = requestAnimationFrame(animate); t += 0.011
        currentRot += (targetRot - currentRot) * 0.065

        const pa = pGeo.attributes.position.array as Float32Array
        for (let i = 0; i < PC; i++) { pa[i*3+1] += pSpd[i] * 0.5; if (pa[i*3+1] > 35) pa[i*3+1] = -35 }
        pGeo.attributes.position.needsUpdate = true; pts.rotation.y = t * 0.015

        bCore.rotation.y = t * 0.7; bCore.rotation.x = t * 0.35
        bWire.rotation.y = -t * 0.45; bWire.rotation.z = t * 0.22
        beaconLight.intensity = 2.5 + Math.sin(t * 2.2) * 0.9

        orbData.forEach(({ grp, core, wire, ring, gMesh, pl, baseAngle, index }) => {
          const active = index === activeRef.current
          const orbAngle = baseAngle + currentRot
          grp.position.x = Math.sin(orbAngle) * RADIUS
          grp.position.z = Math.cos(orbAngle) * RADIUS
          grp.position.y = Math.sin(t * 1.3 + index * 1.05) * 0.3 + (active ? 1.1 : 0)
          const targetScale = active ? 1.4 : 0.82
          const s = grp.scale.x + (targetScale - grp.scale.x) * 0.07
          grp.scale.setScalar(s)
          core.rotation.y += active ? 0.022 : 0.007; core.rotation.x += 0.005
          wire.rotation.y -= 0.011; wire.rotation.z += 0.007
          ring.rotation.z = t * 0.6 + index
          gMesh.lookAt(camera.position)
          const gs = active ? 1 + Math.sin(t * 3) * 0.22 : 0.5 + Math.sin(t * 1.5 + index) * 0.08
          gMesh.scale.setScalar(gs)
          const targetLI = active ? 2.8 : 0.25; pl.intensity += (targetLI - pl.intensity) * 0.07
        })

        camera.position.x = Math.sin(t * 0.12) * 0.7
        camera.position.y = 2.5 + Math.sin(t * 0.09) * 0.35
        camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => { const w = canvas.clientWidth, h = canvas.clientHeight; camera.aspect = w/h; camera.updateProjectionMatrix(); renderer.setSize(w, h) }
      window.addEventListener('resize', onResize)

      return () => {
        cancelAnimationFrame(raf)
        canvas.removeEventListener('mousedown', onMD)
        window.removeEventListener('mousemove', onMM)
        window.removeEventListener('mouseup', onMU)
        canvas.removeEventListener('touchstart', onTC)
        canvas.removeEventListener('touchmove', onTM)
        canvas.removeEventListener('touchend', onTE)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
      }
    }

    const cleanup = init()
    return () => { cleanup.then(fn => fn && fn()) }
  }, [])

  const active = AWARDS[activeIndex]

  return (
    <section id="awards" ref={sectionRef} style={{ background: '#000008', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #f5c84233, transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div data-anim style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#f5c842' }} />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: 11, color: '#f5c842', letterSpacing: 4 }}>06 · DISTINCTIONS</span>
          </div>
          <h2 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', letterSpacing: -1 }}>
            AWARDS<span style={{ color: '#f5c842' }}>.</span>
          </h2>
          <p style={{ fontFamily: 'Rajdhani', fontSize: 15, color: 'rgba(255,255,255,0.35)', marginTop: 12, fontWeight: 300 }}>
            6 distinctions earned within a single organisation of thousands of technical staff worldwide. Drag or click to explore.
          </p>
        </div>

        {/* 3D Canvas */}
        <div style={{ position: 'relative', height: 480, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(0,255,136,0.1)', background: 'radial-gradient(ellipse at 50% 60%, rgba(0,70,35,0.15) 0%, transparent 70%)', cursor: 'grab', marginBottom: 20 }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          <div style={{ position: 'absolute', top: 14, left: 16, fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 2 }}>◈ AWARDS MATRIX · DRAG TO ROTATE</div>
          <div style={{ position: 'absolute', top: 14, right: 16, fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 2 }}>{activeIndex + 1} / {AWARDS.length}</div>
          <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg, ${active.color}1a, transparent)`, border: `1px solid ${active.color}44`, padding: '6px 28px', borderRadius: 2, color: active.color, fontSize: 10, fontFamily: 'Share Tech Mono', letterSpacing: 3.5, textTransform: 'uppercase', whiteSpace: 'nowrap', backdropFilter: 'blur(10px)' }}>
            {active.icon} {active.tag}
          </div>
        </div>

        {/* Dot nav */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 9, marginBottom: 40 }}>
          {AWARDS.map((a, i) => (
            <button key={i} onClick={() => { activeRef.current = i; setActiveIndex(i) }} style={{ width: activeIndex === i ? 30 : 8, height: 8, borderRadius: 4, border: 'none', padding: 0, cursor: 'pointer', background: activeIndex === i ? a.color : 'rgba(255,255,255,0.12)', transition: 'all 0.3s ease', boxShadow: activeIndex === i ? `0 0 14px ${a.color}99` : 'none' }} />
          ))}
        </div>

        {/* Detail card */}
        <div key={activeIndex} style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, animation: 'fadeUp 0.4s ease' }}>
          <div style={{ border: `1px solid ${active.color}2e`, background: `${active.color}0a`, borderRadius: 4, padding: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${active.color}, transparent)` }} />
            <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: active.color, filter: 'blur(60px)', opacity: 0.1 }} />
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: `${active.color}88`, letterSpacing: 2.5, marginBottom: 6 }}>{active.category}</div>
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 20, letterSpacing: 2 }}>{active.date}</div>
            <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 18, color: active.color, filter: `drop-shadow(0 0 22px ${active.color})` }}>{active.icon}</div>
            <div style={{ width: '100%', height: 1, background: `linear-gradient(90deg, ${active.color}55, transparent)`, marginBottom: 16 }} />
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: 2 }}>AWARD {String(activeIndex + 1).padStart(2,'0')} OF {String(AWARDS.length).padStart(2,'0')}</div>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,0.055)', background: 'rgba(255,255,255,0.018)', borderRadius: 4, padding: 36, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${active.color}, transparent)`, borderRadius: '4px 4px 0 0' }} />
            <h3 style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 'clamp(16px, 2vw, 24px)', color: '#fff', margin: '0 0 18px', lineHeight: 1.35 }}>{active.title}</h3>
            <p style={{ fontFamily: 'Rajdhani', color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: 14, margin: 0, fontWeight: 300 }}>{active.description}</p>
            <div style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 8, background: `${active.color}0e`, border: `1px solid ${active.color}2e`, padding: '5px 16px', borderRadius: 2, color: active.color, fontSize: 9, fontFamily: 'Share Tech Mono', letterSpacing: 3.5 }}>◈ {active.tag}</div>
          </div>
        </div>

        {/* Thumbnail grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginTop: 28 }}>
          {AWARDS.map((award, i) => (
            <button key={i} onClick={() => { activeRef.current = i; setActiveIndex(i) }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ background: activeIndex === i ? `${award.color}15` : hovered === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.018)', border: activeIndex === i ? `1px solid ${award.color}55` : '1px solid rgba(255,255,255,0.055)', borderRadius: 4, padding: '14px 8px', cursor: 'pointer', transition: 'all 0.25s ease', textAlign: 'center', boxShadow: activeIndex === i ? `0 0 22px ${award.color}1a` : 'none' }}>
              <div style={{ fontSize: 22, color: award.color, marginBottom: 7, filter: activeIndex === i ? `drop-shadow(0 0 10px ${award.color})` : 'none', transition: 'filter 0.25s' }}>{award.icon}</div>
              <div style={{ color: activeIndex === i ? award.color : 'rgba(255,255,255,0.22)', fontSize: 7.5, letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'Share Tech Mono', lineHeight: 1.45 }}>{award.tag}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
