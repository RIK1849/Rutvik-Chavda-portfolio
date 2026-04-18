"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mount = mountRef.current;
    if (!mount) return;

    // ── Dynamically load Three.js from CDN ──────────────────────────────────
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const THREE = (window as any).THREE;
      if (!THREE) return;

      // ── Renderer ──────────────────────────────────────────────────────────
      const W = window.innerWidth;
      const H = window.innerHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.cssText =
        "position:fixed;inset:0;width:100vw;height:100vh;z-index:0;pointer-events:none;";
      mount.appendChild(renderer.domElement);

      // ── Scene & Camera ────────────────────────────────────────────────────
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 2000);
      camera.position.set(0, 0, 4.2);

      // ── Master group that rotates the globe ───────────────────────────────
      const GLOBE = new THREE.Group();
      scene.add(GLOBE);

      // ── Starfield ─────────────────────────────────────────────────────────
      const starCount = 1800;
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const r = 18 + Math.random() * 22;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        starPos[i * 3 + 1] = r * Math.cos(phi);
        starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.04,
        transparent: true,
        opacity: 0.55,
      });
      scene.add(new THREE.Points(starGeo, starMat));

      // ── Deep space ambient particles (green) ──────────────────────────────
      const ambCount = 900;
      const ambPos = new Float32Array(ambCount * 3);
      for (let i = 0; i < ambCount; i++) {
        const r = 2.2 + Math.random() * 3.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        ambPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        ambPos[i * 3 + 1] = r * Math.cos(phi);
        ambPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      }
      const ambGeo = new THREE.BufferGeometry();
      ambGeo.setAttribute("position", new THREE.BufferAttribute(ambPos, 3));
      const ambMat = new THREE.PointsMaterial({
        color: 0x00ff64,
        size: 0.018,
        transparent: true,
        opacity: 0.4,
      });
      const ambParticles = new THREE.Points(ambGeo, ambMat);
      scene.add(ambParticles);

      // ── Globe core (dark fill) ─────────────────────────────────────────────
      const coreGeo = new THREE.SphereGeometry(0.995, 48, 48);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0x010f07 });
      GLOBE.add(new THREE.Mesh(coreGeo, coreMat));

      // ── Lat/lon wireframe grid ─────────────────────────────────────────────
      const gridMat = new THREE.LineBasicMaterial({
        color: 0x00ff64,
        transparent: true,
        opacity: 0.1,
      });

      for (let lat = -80; lat <= 80; lat += 15) {
        const pts: any[] = [];
        const phi = THREE.MathUtils.degToRad(90 - lat);
        for (let lon = 0; lon <= 360; lon += 3) {
          const theta = THREE.MathUtils.degToRad(lon);
          pts.push(
            new THREE.Vector3(
              Math.sin(phi) * Math.cos(theta),
              Math.cos(phi),
              Math.sin(phi) * Math.sin(theta)
            )
          );
        }
        GLOBE.add(
          new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat)
        );
      }

      for (let lon = 0; lon < 360; lon += 15) {
        const pts: any[] = [];
        const theta = THREE.MathUtils.degToRad(lon);
        for (let lat = -90; lat <= 90; lat += 3) {
          const phi = THREE.MathUtils.degToRad(90 - lat);
          pts.push(
            new THREE.Vector3(
              Math.sin(phi) * Math.cos(theta),
              Math.cos(phi),
              Math.sin(phi) * Math.sin(theta)
            )
          );
        }
        GLOBE.add(
          new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat)
        );
      }

      // ── Equator highlight ring ────────────────────────────────────────────
      const eqGeo = new THREE.RingGeometry(0.998, 1.008, 128);
      const eqMat = new THREE.MeshBasicMaterial({
        color: 0x00ff64,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      GLOBE.add(new THREE.Mesh(eqGeo, eqMat));

      // ── Outer atmosphere shell ────────────────────────────────────────────
      const atmosGeo = new THREE.SphereGeometry(1.06, 48, 48);
      const atmosMat = new THREE.MeshBasicMaterial({
        color: 0x00ff64,
        transparent: true,
        opacity: 0.025,
        side: THREE.FrontSide,
      });
      GLOBE.add(new THREE.Mesh(atmosGeo, atmosMat));

      // ── Helper: lat/lon → 3D position ─────────────────────────────────────
      function ll3d(lat: number, lon: number, r = 1.01): THREE.Vector3 {
        const phi = THREE.MathUtils.degToRad(90 - lat);
        const theta = THREE.MathUtils.degToRad(lon);
        return new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
      }

      // ── Threat node data [lat, lon, severity] ─────────────────────────────
      // severity: 0=critical(red), 1=warning(orange), 2=monitored(green)
      const NODES: [number, number, number][] = [
        [51.5, -0.1, 2],    // London
        [40.7, -74.0, 0],   // New York
        [35.7, 139.7, 2],   // Tokyo
        [48.9, 2.3, 1],     // Paris
        [55.7, 37.6, 0],    // Moscow
        [39.9, 116.4, 0],   // Beijing
        [28.6, 77.2, 2],    // New Delhi
        [-33.9, 151.2, 2],  // Sydney
        [37.8, -122.4, 2],  // San Francisco
        [1.3, 103.8, 1],    // Singapore
        [19.4, -99.1, 1],   // Mexico City
        [52.5, 13.4, 2],    // Berlin
        [25.2, 55.3, 1],    // Dubai
        [43.7, -79.4, 2],   // Toronto
        [59.9, 30.3, 0],    // St Petersburg
        [31.2, 121.5, 1],   // Shanghai
        [6.5, 3.4, 1],      // Lagos
        [-23.5, -46.6, 2],  // São Paulo
        [30.0, 31.2, 1],    // Cairo
        [34.0, -118.2, 2],  // Los Angeles
      ];

      const NODE_COLORS = [0xff2222, 0xff8800, 0x00ff64];
      const nodeMeshes: {
        dot: THREE.Mesh;
        ring: THREE.Mesh;
        ringMat: THREE.MeshBasicMaterial;
        phase: number;
        col: number;
      }[] = [];

      NODES.forEach(([lat, lon, sev]) => {
        const col = NODE_COLORS[sev];
        const pos = ll3d(lat, lon, 1.012);

        // Core dot
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.022, 10, 10),
          new THREE.MeshBasicMaterial({ color: col })
        );
        dot.position.copy(pos);
        GLOBE.add(dot);

        // Pulse ring
        const ringGeo = new THREE.RingGeometry(0.028, 0.045, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: col,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        GLOBE.add(ring);

        nodeMeshes.push({ dot, ring, ringMat, phase: Math.random() * Math.PI * 2, col });
      });

      // ── Attack arc connections ─────────────────────────────────────────────
      const ARC_PAIRS: [number, number][] = [
        [1, 4],  // NY → Moscow   (critical)
        [4, 5],  // Moscow → Beijing
        [5, 14], // Beijing → StPete
        [1, 0],  // NY → London
        [0, 3],  // London → Paris
        [9, 5],  // Singapore → Beijing
        [8, 1],  // SF → NY
        [11, 0], // Berlin → London
        [6, 9],  // Delhi → Singapore
        [2, 9],  // Tokyo → Singapore
        [15, 5], // Shanghai → Beijing
        [16, 3], // Lagos → Paris
        [17, 1], // SãoPaulo → NY
        [18, 3], // Cairo → Paris
        [10, 8], // MexCity → SF
        [12, 0], // Dubai → London
      ];

      const arcObjects: {
        line: THREE.Line;
        mat: THREE.LineBasicMaterial;
        phase: number;
        speed: number;
      }[] = [];

      ARC_PAIRS.forEach(([a, b]) => {
        const posA = ll3d(...(NODES[a].slice(0, 2) as [number, number]), 1.012);
        const posB = ll3d(...(NODES[b].slice(0, 2) as [number, number]), 1.012);
        const mid = posA.clone().add(posB).multiplyScalar(0.5).normalize().multiplyScalar(1.55);

        const curve = new THREE.QuadraticBezierCurve3(posA, mid, posB);
        const pts = curve.getPoints(60);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({
          color: 0x00ff64,
          transparent: true,
          opacity: 0.0,
        });
        const line = new THREE.Line(geo, mat);
        GLOBE.add(line);
        arcObjects.push({ line, mat, phase: Math.random() * Math.PI * 2, speed: 0.6 + Math.random() * 0.8 });
      });

      // ── Data packet tracers on arcs ───────────────────────────────────────
      const packetMeshes: {
        mesh: THREE.Mesh;
        curve: THREE.QuadraticBezierCurve3;
        t: number;
        speed: number;
      }[] = [];

      ARC_PAIRS.slice(0, 8).forEach(([a, b]) => {
        const posA = ll3d(...(NODES[a].slice(0, 2) as [number, number]), 1.012);
        const posB = ll3d(...(NODES[b].slice(0, 2) as [number, number]), 1.012);
        const mid = posA.clone().add(posB).multiplyScalar(0.5).normalize().multiplyScalar(1.55);
        const curve = new THREE.QuadraticBezierCurve3(posA, mid, posB);

        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.016, 6, 6),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        GLOBE.add(mesh);
        packetMeshes.push({ mesh, curve, t: Math.random(), speed: 0.0025 + Math.random() * 0.003 });
      });

      // ── Rotating scan ring ────────────────────────────────────────────────
      const scanGeo = new THREE.RingGeometry(1.0, 1.015, 128);
      const scanMat = new THREE.MeshBasicMaterial({
        color: 0x00ff64,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.55,
      });
      const scanRing = new THREE.Mesh(scanGeo, scanMat);
      GLOBE.add(scanRing);

      // Second scan ring (tilted)
      const scan2Geo = new THREE.RingGeometry(1.0, 1.012, 128);
      const scan2Mat = new THREE.MeshBasicMaterial({
        color: 0x00ccff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
      });
      const scanRing2 = new THREE.Mesh(scan2Geo, scan2Mat);
      scanRing2.rotation.z = Math.PI / 3;
      GLOBE.add(scanRing2);

      // ── HUD Canvas overlay (2D) ───────────────────────────────────────────
      const hud = document.createElement("canvas");
      hud.style.cssText =
        "position:fixed;inset:0;width:100vw;height:100vh;z-index:1;pointer-events:none;";
      hud.width = W;
      hud.height = H;
      mount.appendChild(hud);
      const hctx = hud.getContext("2d")!;

      const FONT_MONO = "'Courier New', monospace";

      function drawHUD(time: number) {
        hctx.clearRect(0, 0, W, H);

        // Corner bracket — top left
        hctx.strokeStyle = "rgba(0,255,100,0.55)";
        hctx.lineWidth = 1.2;
        hctx.beginPath(); hctx.moveTo(24, 52); hctx.lineTo(24, 24); hctx.lineTo(52, 24); hctx.stroke();
        hctx.beginPath(); hctx.moveTo(W - 24, 52); hctx.lineTo(W - 24, 24); hctx.lineTo(W - 52, 24); hctx.stroke();
        hctx.beginPath(); hctx.moveTo(24, H - 52); hctx.lineTo(24, H - 24); hctx.lineTo(52, H - 24); hctx.stroke();
        hctx.beginPath(); hctx.moveTo(W - 24, H - 52); hctx.lineTo(W - 24, H - 24); hctx.lineTo(W - 52, H - 24); hctx.stroke();

        // ── Top-left panel ────────────────────────────────────────────────
        hctx.font = `bold 11px ${FONT_MONO}`;
        hctx.fillStyle = "rgba(0,255,100,0.9)";
        hctx.fillText("◈  ENDPOINT THREAT MONITOR", 36, 52);

        hctx.font = `10px ${FONT_MONO}`;
        hctx.fillStyle = "rgba(0,255,100,0.55)";
        hctx.fillText("SOPHOS XDR  ·  INTERCEPT X  ·  LIVE DISCOVER", 36, 68);

        // Animated status lines
        const statuses = [
          { label: "ACTIVE SENSORS", val: "20 / 20", col: "rgba(0,255,100,0.8)" },
          { label: "THREATS BLOCKED", val: String(847 + Math.floor(Math.sin(time * 0.4) * 3)), col: "rgba(255,50,50,0.85)" },
          { label: "ARCS TRACKED", val: "16", col: "rgba(0,255,100,0.7)" },
          { label: "DATA PACKETS", val: String(9412 + Math.floor(time * 2.3)), col: "rgba(0,200,255,0.8)" },
        ];

        statuses.forEach((s, i) => {
          hctx.font = `9px ${FONT_MONO}`;
          hctx.fillStyle = "rgba(0,255,100,0.35)";
          hctx.fillText(s.label, 36, 88 + i * 17);
          hctx.font = `bold 9px ${FONT_MONO}`;
          hctx.fillStyle = s.col;
          hctx.fillText(s.val, 180, 88 + i * 17);
        });

        // ── Top-right panel ───────────────────────────────────────────────
        const uptime = Math.floor(time);
        const mm = Math.floor(uptime / 60).toString().padStart(2, "0");
        const ss = (uptime % 60).toString().padStart(2, "0");

        hctx.font = `bold 11px ${FONT_MONO}`;
        hctx.fillStyle = "rgba(0,255,100,0.9)";
        hctx.textAlign = "right";
        hctx.fillText("SYSTEM STATUS  ◈", W - 36, 52);

        hctx.font = `10px ${FONT_MONO}`;
        hctx.fillStyle = "rgba(0,255,100,0.55)";
        hctx.fillText(`UPTIME  ${mm}:${ss}`, W - 36, 68);

        const right = [
          { label: "EDR ENGINE", val: "ONLINE", col: "rgba(0,255,100,0.9)" },
          { label: "MITRE ATT&CK", val: "ACTIVE", col: "rgba(0,255,100,0.9)" },
          { label: "ROOT CAUSE", val: "ARMED", col: "rgba(255,150,0,0.9)" },
          { label: "POLICY SYNC", val: "OK", col: "rgba(0,255,100,0.9)" },
        ];

        right.forEach((r, i) => {
          hctx.font = `9px ${FONT_MONO}`;
          hctx.fillStyle = "rgba(0,255,100,0.35)";
          hctx.fillText(r.label, W - 36, 88 + i * 17);
          hctx.font = `bold 9px ${FONT_MONO}`;
          hctx.fillStyle = r.col;
          hctx.fillText(r.val, W - 170, 88 + i * 17);
        });

        hctx.textAlign = "left";

        // ── Bottom-left legend ────────────────────────────────────────────
        const legend = [
          { label: "CRITICAL NODE", col: "#ff2222" },
          { label: "WARNING NODE", col: "#ff8800" },
          { label: "MONITORED NODE", col: "#00ff64" },
        ];

        legend.forEach((l, i) => {
          hctx.fillStyle = l.col;
          hctx.beginPath();
          hctx.arc(40, H - 46 + i * 16, 4, 0, Math.PI * 2);
          hctx.fill();
          hctx.font = `9px ${FONT_MONO}`;
          hctx.fillStyle = "rgba(255,255,255,0.45)";
          hctx.fillText(l.label, 52, H - 42 + i * 16);
        });

        // ── Bottom-right: scrolling telemetry log ─────────────────────────
        const logs = [
          ">> BLOCK  178.93.12.4  → ENDPOINT-UK-04",
          ">> ALLOW  10.0.8.22   → SOPHOS-CENTRAL",
          ">> BLOCK  91.215.4.17 → ENDPOINT-RU-11",
          ">> SCAN   XDR-QUERY   LIVE-DISCOVER OK",
          ">> ALERT  RANSOMWARE  CONTAINED #3821",
          ">> SYNC   POLICY-V9   PUSH COMPLETE",
          ">> BLOCK  45.142.12.8 → ENDPOINT-CN-03",
        ];
        const logIdx = Math.floor(time * 0.6) % logs.length;
        hctx.textAlign = "right";
        for (let i = 0; i < 5; i++) {
          const idx = (logIdx + i) % logs.length;
          const alpha = 0.15 + (i / 5) * 0.55;
          hctx.font = `9px ${FONT_MONO}`;
          hctx.fillStyle = `rgba(0,255,100,${alpha})`;
          hctx.fillText(logs[idx], W - 36, H - 42 + i * 14);
        }
        hctx.textAlign = "left";

        // ── Horizontal scan line (global sweep) ───────────────────────────
        const scanY = ((time * 55) % (H + 60)) - 30;
        const grad = hctx.createLinearGradient(0, scanY - 12, 0, scanY + 12);
        grad.addColorStop(0, "rgba(0,255,100,0)");
        grad.addColorStop(0.5, "rgba(0,255,100,0.055)");
        grad.addColorStop(1, "rgba(0,255,100,0)");
        hctx.fillStyle = grad;
        hctx.fillRect(0, scanY - 12, W, 24);
      }

      // ── Resize handler ────────────────────────────────────────────────────
      function onResize() {
        const nW = window.innerWidth;
        const nH = window.innerHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
        hud.width = nW;
        hud.height = nH;
      }
      window.addEventListener("resize", onResize);

      // ── Mouse parallax ────────────────────────────────────────────────────
      let mouseX = 0;
      let mouseY = 0;
      function onMouse(e: MouseEvent) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      }
      window.addEventListener("mousemove", onMouse);

      // ── Animation loop ────────────────────────────────────────────────────
      let rafId: number;
      const clock = new THREE.Clock();
      let elapsed = 0;

      function animate() {
        rafId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        elapsed += delta;

        // Globe slow auto-rotate + mouse parallax tilt
        GLOBE.rotation.y += 0.0022;
        GLOBE.rotation.x += (mouseY * 0.18 - GLOBE.rotation.x) * 0.04;
        GLOBE.rotation.z += (-mouseX * 0.06 - GLOBE.rotation.z) * 0.04;

        // Camera subtle drift
        camera.position.x += (mouseX * 0.12 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 0.08 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        // Ambient particles drift
        ambParticles.rotation.y += 0.0008;
        ambParticles.rotation.x += 0.0003;

        // Scan rings
        scanRing.rotation.x = elapsed * 0.55;
        scanMat.opacity = 0.3 + 0.25 * Math.sin(elapsed * 2.1);
        scanRing2.rotation.y = elapsed * 0.38;
        scan2Mat.opacity = 0.15 + 0.15 * Math.cos(elapsed * 1.7);

        // Pulse arcs
        arcObjects.forEach((a) => {
          a.mat.opacity =
            0.08 + 0.28 * Math.abs(Math.sin(elapsed * a.speed + a.phase));
        });

        // Pulse nodes
        nodeMeshes.forEach((n) => {
          n.phase += 0.04;
          const s = 1 + 0.45 * Math.abs(Math.sin(n.phase));
          n.ring.scale.setScalar(s);
          n.ringMat.opacity = 0.6 - 0.3 * Math.abs(Math.sin(n.phase));
          n.dot.scale.setScalar(0.85 + 0.15 * Math.abs(Math.sin(n.phase * 0.7)));
        });

        // Move data packets along arcs
        packetMeshes.forEach((p) => {
          p.t += p.speed;
          if (p.t > 1) p.t -= 1;
          const pos = p.curve.getPoint(p.t);
          p.mesh.position.copy(pos);
        });

        drawHUD(elapsed);
        renderer.render(scene, camera);
      }

      animate();

      // ── Cleanup ───────────────────────────────────────────────────────────
      (mount as any)._cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouse);
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        if (hud.parentNode) hud.parentNode.removeChild(hud);
      };
    };

    return () => {
      if ((mount as any)._cleanup) (mount as any)._cleanup();
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at 60% 40%, #011a0c 0%, #000d05 55%, #000000 100%)",
      }}
    />
  );
}