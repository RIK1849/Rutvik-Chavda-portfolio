"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const AWARDS = [
  {
    id: 1,
    category: "GLOBAL EXCELLENCE · SOPHOS SUPPORT",
    date: "May 2025",
    title: "Global Support Services Excellence Award (2024)",
    description:
      "Recognised with the Global Support Services Excellence Award 2024 at Sophos for outstanding performance in Endpoint Security and Technical Support. Resolved complex L2/L3 issues across Windows environments, including EDR (Sophos Intercept X) and XDR telemetry analysis.",
    tag: "GLOBAL EXCELLENCE",
    color: "#f5c842",
    emissive: 0xf5a800,
    icon: "◈",
  },
  {
    id: 2,
    category: "GLOBAL RANKING · TOP 10 WORLDWIDE",
    date: "Nov 2023",
    title: "Sophos Support Team Top 10 — FY25",
    description:
      "Ranked among the top 10 support engineers globally at Sophos for FY25 — recognised for outstanding case quality, consistent SLA adherence, customer satisfaction scores, and internal knowledge contribution across the endpoint security portfolio.",
    tag: "TOP 10 WORLDWIDE",
    color: "#00ff88",
    emissive: 0x00cc66,
    icon: "◉",
  },
  {
    id: 3,
    category: "COMMUNITY · QUARTERLY RECOGNITION",
    date: "Q1 2024",
    title: "Top Community Contributor — Q1 2024",
    description:
      "Awarded Top Community Contributor for Q1 2024 in recognition of consistent, high-quality technical contributions to the Sophos community forums, documentation improvements, and peer knowledge sharing across security domains.",
    tag: "COMMUNITY CONTRIBUTOR",
    color: "#00cfff",
    emissive: 0x0099cc,
    icon: "◎",
  },
  {
    id: 4,
    category: "COMMUNITY · QUARTERLY RECOGNITION",
    date: "Q2 2024",
    title: "Top Community Contributor — Q2 2024",
    description:
      "Consecutive quarterly recognition for sustained technical excellence and community leadership within the Sophos ecosystem, demonstrating deep specialisation in endpoint security, threat hunting, and XDR workflows.",
    tag: "COMMUNITY CONTRIBUTOR",
    color: "#a855f7",
    emissive: 0x7c22cc,
    icon: "◎",
  },
  {
    id: 5,
    category: "COMMUNITY · QUARTERLY RECOGNITION",
    date: "Q3 2024",
    title: "Top Community Contributor — Q3 2024",
    description:
      "Third consecutive quarterly award, underlining consistent excellence and long-term impact on the Sophos community — from advanced troubleshooting guides to forensic triage methodologies shared with the global technical community.",
    tag: "COMMUNITY CONTRIBUTOR",
    color: "#ff6b6b",
    emissive: 0xcc3333,
    icon: "◎",
  },
  {
    id: 6,
    category: "ANNUAL · TOP CONTRIBUTOR",
    date: "2024",
    title: "Full-Year Top Contributor 2024",
    description:
      "Awarded the Full-Year Top Contributor title for 2024 — the highest community recognition at Sophos, granted to engineers demonstrating sustained excellence across all four quarters in case resolution, knowledge creation, and community impact.",
    tag: "TOP CONTRIBUTOR",
    color: "#ff9500",
    emissive: 0xcc7000,
    icon: "★",
  },
];

// ─── Three.js Hook ────────────────────────────────────────────────────────────
function useThreeScene(canvasRef, setActiveIndex, activeIndexRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth || 900;
    const H = canvas.clientHeight || 480;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000008, 0.028);
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 200);
    camera.position.set(0, 2.5, 15);
    camera.lookAt(0, 0, 0);

    // ── Lighting ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x080818, 3));
    const rim = new THREE.DirectionalLight(0x00ffaa, 2);
    rim.position.set(-8, 6, -4);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0x0033ff, 1);
    fill.position.set(8, -4, 4);
    scene.add(fill);

    // ── Grid ──────────────────────────────────────────────────────────────────
    const grid = new THREE.GridHelper(80, 80, 0x003322, 0x001510);
    grid.position.y = -5;
    grid.material.opacity = 0.35;
    grid.material.transparent = true;
    scene.add(grid);

    // ── Star Particles ────────────────────────────────────────────────────────
    const PC = 2000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(PC * 3);
    const pCol = new Float32Array(PC * 3);
    const pSpd = new Float32Array(PC);
    const palette = AWARDS.map((a) => new THREE.Color(a.color));

    for (let i = 0; i < PC; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 100;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      const c = palette[i % palette.length];
      pCol[i * 3] = c.r; pCol[i * 3 + 1] = c.g; pCol[i * 3 + 2] = c.b;
      pSpd[i] = 0.002 + Math.random() * 0.006;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.1, vertexColors: true, transparent: true, opacity: 0.65, sizeAttenuation: true });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Orbs ──────────────────────────────────────────────────────────────────
    const TOTAL = AWARDS.length;
    const RADIUS = 7.5;
    const orbData = [];

    AWARDS.forEach((award, i) => {
      const angle = (i / TOTAL) * Math.PI * 2;
      const grp = new THREE.Group();
      grp.position.set(Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS);

      const col = new THREE.Color(award.color);

      // Core gem
      const cGeo = new THREE.IcosahedronGeometry(0.95, 1);
      const cMat = new THREE.MeshPhysicalMaterial({
        color: col,
        emissive: new THREE.Color(award.emissive),
        emissiveIntensity: 0.8,
        metalness: 0.1,
        roughness: 0.04,
        transmission: 0.65,
        thickness: 2,
        transparent: true,
        opacity: 0.93,
      });
      const core = new THREE.Mesh(cGeo, cMat);
      grp.add(core);

      // Wireframe shell
      const wGeo = new THREE.IcosahedronGeometry(1.3, 1);
      const wMat = new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.14 });
      const wire = new THREE.Mesh(wGeo, wMat);
      grp.add(wire);

      // Equatorial ring
      const rGeo = new THREE.TorusGeometry(1.65, 0.022, 8, 100);
      const rMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55 });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.x = Math.PI / 2;
      grp.add(ring);

      // Glow billboard
      const gc = document.createElement("canvas");
      gc.width = 128; gc.height = 128;
      const gctx = gc.getContext("2d");
      const gr = gctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, award.color + "bb");
      gr.addColorStop(0.45, award.color + "33");
      gr.addColorStop(1, "transparent");
      gctx.fillStyle = gr; gctx.fillRect(0, 0, 128, 128);
      const glowTex = new THREE.CanvasTexture(gc);
      const gMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(4.5, 4.5),
        new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
      );
      gMesh.renderOrder = 1;
      grp.add(gMesh);

      // Point light
      const pl = new THREE.PointLight(col, 0, 7);
      grp.add(pl);

      scene.add(grp);
      orbData.push({ grp, core, wire, ring, gMesh, pl, baseAngle: angle, index: i });
    });

    // ── Central beacon ────────────────────────────────────────────────────────
    const beaconGrp = new THREE.Group();
    const bCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.3, 0),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0x44ffaa, emissiveIntensity: 1.4, metalness: 0.9, roughness: 0, transparent: true, opacity: 0.88 })
    );
    const bWire = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.9, 0),
      new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.2 })
    );
    beaconGrp.add(bCore, bWire);
    scene.add(beaconGrp);
    const beaconLight = new THREE.PointLight(0x00ff88, 3, 16);
    scene.add(beaconLight);

    // Orbit ring
    const oRing = new THREE.Mesh(
      new THREE.TorusGeometry(RADIUS, 0.014, 6, 240),
      new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.1 })
    );
    oRing.rotation.x = Math.PI / 2;
    scene.add(oRing);

    // ── State ─────────────────────────────────────────────────────────────────
    let targetRot = 0;
    let currentRot = 0;
    let dragging = false;
    let dragX0 = 0;
    let dragRot0 = 0;

    const snap = () => {
      const step = (Math.PI * 2) / TOTAL;
      targetRot = Math.round(targetRot / step) * step;
      const idx = ((Math.round(-targetRot / step) % TOTAL) + TOTAL) % TOTAL;
      activeIndexRef.current = idx;
      setActiveIndex(idx);
    };

    const onMouseDown = (e) => { dragging = true; dragX0 = e.clientX; dragRot0 = targetRot; };
    const onMouseMove = (e) => {
      if (!dragging) return;
      targetRot = dragRot0 + ((e.clientX - dragX0) / (canvas.clientWidth || W)) * Math.PI * 2;
    };
    const onMouseUp = () => { if (dragging) { dragging = false; snap(); } };

    const onTouchStart = (e) => { dragging = true; dragX0 = e.touches[0].clientX; dragRot0 = targetRot; };
    const onTouchMove = (e) => {
      if (!dragging) return;
      targetRot = dragRot0 + ((e.touches[0].clientX - dragX0) / (canvas.clientWidth || W)) * Math.PI * 2;
    };
    const onTouchEnd = () => { if (dragging) { dragging = false; snap(); } };

    const onClick = (e) => {
      if (Math.abs(e.clientX - dragX0) > 6) return;
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      const rc = new THREE.Raycaster();
      rc.setFromCamera(mouse, camera);
      const hits = rc.intersectObjects(orbData.map((o) => o.core));
      if (hits.length > 0) {
        const idx = orbData.findIndex((o) => o.core === hits[0].object);
        if (idx !== -1) {
          activeIndexRef.current = idx;
          setActiveIndex(idx);
          targetRot = -(idx / TOTAL) * Math.PI * 2;
        }
      }
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("click", onClick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);

    // ── Animation ─────────────────────────────────────────────────────────────
    let raf;
    let t = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.011;

      currentRot += (targetRot - currentRot) * 0.065;

      // Particles drift
      const pa = pGeo.attributes.position.array;
      for (let i = 0; i < PC; i++) {
        pa[i * 3 + 1] += pSpd[i] * 0.5;
        if (pa[i * 3 + 1] > 30) pa[i * 3 + 1] = -30;
      }
      pGeo.attributes.position.needsUpdate = true;
      particles.rotation.y = t * 0.015;

      // Beacon
      bCore.rotation.y = t * 0.7;
      bCore.rotation.x = t * 0.35;
      bWire.rotation.y = -t * 0.45;
      bWire.rotation.z = t * 0.22;
      beaconLight.intensity = 2.5 + Math.sin(t * 2.2) * 0.9;

      // Orbs
      orbData.forEach(({ grp, core, wire, ring, gMesh, pl, baseAngle, index }) => {
        const active = index === activeIndexRef.current;
        const orbAngle = baseAngle + currentRot;

        grp.position.x = Math.sin(orbAngle) * RADIUS;
        grp.position.z = Math.cos(orbAngle) * RADIUS;
        grp.position.y = Math.sin(t * 1.3 + index * 1.05) * 0.3 + (active ? 1.1 : 0);

        const targetScale = active ? 1.4 : 0.82;
        const s = grp.scale.x + (targetScale - grp.scale.x) * 0.07;
        grp.scale.setScalar(s);

        core.rotation.y += active ? 0.022 : 0.007;
        core.rotation.x += 0.005;
        wire.rotation.y -= 0.011;
        wire.rotation.z += 0.007;
        ring.rotation.z = t * 0.6 + index;

        gMesh.lookAt(camera.position);
        const gScale = active ? 1 + Math.sin(t * 3) * 0.22 : 0.5 + Math.sin(t * 1.5 + index) * 0.08;
        gMesh.scale.setScalar(gScale);

        const targetLI = active ? 2.8 : 0.25;
        pl.intensity += (targetLI - pl.intensity) * 0.07;
      });

      // Camera sway
      camera.position.x = Math.sin(t * 0.12) * 0.7;
      camera.position.y = 2.5 + Math.sin(t * 0.09) * 0.35;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AwardsSection() {
  const canvasRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(null);
  const activeIndexRef = useRef(0);

  const handleSetActive = (idx) => {
    activeIndexRef.current = idx;
    setActiveIndex(idx);
  };

  useThreeScene(canvasRef, handleSetActive, activeIndexRef);

  const active = AWARDS[activeIndex];

  return (
    <section style={{
      background: "#000008",
      minHeight: "100vh",
      fontFamily: "'Space Mono', 'Courier New', monospace",
      position: "relative",
      overflow: "hidden",
      padding: "80px 0 70px",
    }}>
      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.013) 2px, rgba(0,255,136,0.013) 4px)",
      }} />

      {/* Corner brackets */}
      {[
        { top: 18, left: 18, borderTop: "2px solid #00ff88", borderLeft: "2px solid #00ff88" },
        { top: 18, right: 18, borderTop: "2px solid #00ff88", borderRight: "2px solid #00ff88" },
        { bottom: 18, left: 18, borderBottom: "2px solid #00ff88", borderLeft: "2px solid #00ff88" },
        { bottom: 18, right: 18, borderBottom: "2px solid #00ff88", borderRight: "2px solid #00ff88" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 55, height: 55, opacity: 0.4, zIndex: 2, ...s }} />
      ))}

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(0,255,136,0.07)", border: "1px solid rgba(0,255,136,0.28)",
            borderRadius: 2, padding: "6px 22px", marginBottom: 22,
          }}>
            <span style={{ color: "#00ff88", fontSize: 9, letterSpacing: 4 }}>◈ AWARDS MATRIX</span>
            <span style={{ color: "#00ff8833" }}>·</span>
            <span style={{ color: "#00ff8866", fontSize: 9, letterSpacing: 2 }}>{AWARDS.length} RECOGNITIONS</span>
          </div>

          <h2 style={{
            fontSize: "clamp(30px, 5vw, 62px)", fontWeight: 700, letterSpacing: -1,
            margin: 0, lineHeight: 1.1,
            background: "linear-gradient(130deg, #ffffff 0%, #00ff88 55%, #f5c842 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Distinguished<br />Achievements
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, letterSpacing: 3.5, marginTop: 14, textTransform: "uppercase" }}>
            Drag · Click to Explore All Awards
          </p>
        </div>

        {/* ── Canvas ── */}
        <div style={{
          position: "relative", height: 490, borderRadius: 3, overflow: "hidden",
          border: "1px solid rgba(0,255,136,0.11)",
          background: "radial-gradient(ellipse at 50% 60%, rgba(0,70,35,0.18) 0%, transparent 70%)",
          cursor: "grab",
        }}>
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

          {/* HUD labels */}
          <div style={{ position: "absolute", top: 14, left: 16, color: "rgba(0,255,136,0.45)", fontSize: 9, letterSpacing: 2.5 }}>◈ AWARDS MATRIX</div>
          <div style={{ position: "absolute", top: 14, right: 16, color: "rgba(0,255,136,0.45)", fontSize: 9, letterSpacing: 2.5 }}>{activeIndex + 1} / {AWARDS.length}</div>

          {/* Active badge */}
          <div style={{
            position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)",
            background: `linear-gradient(135deg, ${active.color}1a, transparent)`,
            border: `1px solid ${active.color}44`,
            padding: "6px 28px", borderRadius: 2,
            color: active.color, fontSize: 10, letterSpacing: 3.5,
            textTransform: "uppercase", whiteSpace: "nowrap",
            backdropFilter: "blur(10px)",
            boxShadow: `0 0 24px ${active.color}22`,
          }}>
            {active.icon} {active.tag}
          </div>
        </div>

        {/* ── Dot nav ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 9, marginTop: 18 }}>
          {AWARDS.map((a, i) => (
            <button key={i} onClick={() => handleSetActive(i)} style={{
              width: activeIndex === i ? 30 : 8, height: 8,
              borderRadius: 4, border: "none", padding: 0, cursor: "pointer",
              background: activeIndex === i ? a.color : "rgba(255,255,255,0.12)",
              transition: "all 0.3s ease",
              boxShadow: activeIndex === i ? `0 0 14px ${a.color}99` : "none",
            }} />
          ))}
        </div>

        {/* ── Detail Card ── */}
        <div key={activeIndex} style={{
          marginTop: 44, display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 28, animation: "fadeSlide 0.4s ease",
        }}>
          {/* Left stat panel */}
          <div style={{
            background: `linear-gradient(145deg, ${active.color}0f 0%, rgba(0,0,0,0.55) 100%)`,
            border: `1px solid ${active.color}2e`,
            borderRadius: 4, padding: 28, position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -50, right: -50, width: 130, height: 130,
              borderRadius: "50%", background: active.color, filter: "blur(70px)", opacity: 0.12, pointerEvents: "none",
            }} />
            {/* Top accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${active.color}, transparent)`, borderRadius: "4px 4px 0 0" }} />

            <div style={{ color: active.color, fontSize: 9, letterSpacing: 3, marginBottom: 6, opacity: 0.75 }}>{active.category}</div>
            <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, marginBottom: 24, letterSpacing: 2 }}>{active.date}</div>

            <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 18, color: active.color, filter: `drop-shadow(0 0 22px ${active.color})` }}>
              {active.icon}
            </div>

            <div style={{ width: "100%", height: 1, background: `linear-gradient(90deg, ${active.color}55, transparent)`, marginBottom: 18 }} />

            <div style={{ color: "rgba(255,255,255,0.18)", fontSize: 9, letterSpacing: 2.5 }}>
              AWARD {String(activeIndex + 1).padStart(2, "0")} OF {String(AWARDS.length).padStart(2, "0")}
            </div>
          </div>

          {/* Right content panel */}
          <div style={{
            background: "rgba(255,255,255,0.018)",
            border: "1px solid rgba(255,255,255,0.055)",
            borderRadius: 4, padding: 36, position: "relative",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, ${active.color}, transparent)`,
              borderRadius: "4px 4px 0 0",
            }} />
            <h3 style={{
              fontSize: "clamp(17px, 2.2vw, 25px)", fontWeight: 700,
              color: "#ffffff", margin: "0 0 18px", lineHeight: 1.35,
              fontFamily: "'Space Mono', monospace",
            }}>
              {active.title}
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.5)", lineHeight: 1.9, fontSize: 14,
              margin: 0, fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 300, letterSpacing: 0.2,
            }}>
              {active.description}
            </p>
            <div style={{
              marginTop: 28, display: "inline-flex", alignItems: "center", gap: 8,
              background: `${active.color}0e`, border: `1px solid ${active.color}2e`,
              padding: "5px 16px", borderRadius: 2,
              color: active.color, fontSize: 9, letterSpacing: 3.5,
            }}>
              ◈ {active.tag}
            </div>
          </div>
        </div>

        {/* ── Award grid thumbnails ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
          gap: 10, marginTop: 30,
        }}>
          {AWARDS.map((award, i) => (
            <button
              key={i}
              onClick={() => handleSetActive(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: activeIndex === i ? `${award.color}15` : hovered === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.018)",
                border: activeIndex === i ? `1px solid ${award.color}55` : "1px solid rgba(255,255,255,0.055)",
                borderRadius: 4, padding: "14px 8px", cursor: "pointer",
                transition: "all 0.25s ease", textAlign: "center",
                boxShadow: activeIndex === i ? `0 0 22px ${award.color}1a` : "none",
              }}
            >
              <div style={{
                fontSize: 22, color: award.color, marginBottom: 7,
                filter: activeIndex === i ? `drop-shadow(0 0 10px ${award.color})` : "none",
                transition: "filter 0.25s",
              }}>
                {award.icon}
              </div>
              <div style={{
                color: activeIndex === i ? award.color : "rgba(255,255,255,0.22)",
                fontSize: 7.5, letterSpacing: 1.5, textTransform: "uppercase",
                fontFamily: "monospace", lineHeight: 1.45,
              }}>
                {award.tag}
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        *, *::before, *::after { box-sizing: border-box; }
        button { font-family: inherit; }
      `}</style>
    </section>
  );
}