"use client";

import React, { useEffect, useRef } from "react";

type Packet = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
  alpha: number;
};

type Blip = {
  x: number;
  y: number;
  baseR: number;
  pulse: number;
  speed: number;
};

type NodePoint = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
};

export default function CyberCommandBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let packets: Packet[] = [];
    let blips: Blip[] = [];
    let nodes: NodePoint[] = [];

    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const createPacket = (): Packet => {
      const lanes = [
        [width * 0.08, height * 0.28, width * 0.45, height * 0.48],
        [width * 0.12, height * 0.72, width * 0.54, height * 0.55],
        [width * 0.84, height * 0.18, width * 0.58, height * 0.42],
        [width * 0.92, height * 0.74, width * 0.62, height * 0.58],
        [width * 0.22, height * 0.08, width * 0.52, height * 0.34],
      ];
      const route = lanes[Math.floor(Math.random() * lanes.length)];

      return {
        startX: route[0],
        startY: route[1],
        endX: route[2],
        endY: route[3],
        progress: Math.random(),
        speed: rand(0.0022, 0.005),
        alpha: rand(0.3, 0.7),
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      packets = Array.from(
        { length: Math.max(8, Math.floor(width / 180)) },
        createPacket
      );

      const radarCenterX = width * 0.8;
      const radarCenterY = height * 0.24;
      const radarRadius = Math.min(width, height) * 0.17;

      blips = Array.from(
        { length: Math.max(10, Math.floor(width / 160)) },
        () => {
          const angle = rand(0, Math.PI * 2);
          const dist = rand(0, radarRadius * 0.92);
          return {
            x: radarCenterX + Math.cos(angle) * dist,
            y: radarCenterY + Math.sin(angle) * dist,
            baseR: rand(1.5, 3.2),
            pulse: rand(0, Math.PI * 2),
            speed: rand(0.015, 0.045),
          };
        }
      );

      nodes = Array.from(
        { length: Math.max(18, Math.floor(width / 85)) },
        () => ({
          x: rand(0, width),
          y: rand(0, height),
          dx: rand(-0.12, 0.12),
          dy: rand(-0.12, 0.12),
          r: rand(0.8, 1.8),
        })
      );
    };

    const drawBackground = () => {
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#02070d");
      bg.addColorStop(0.42, "#05111c");
      bg.addColorStop(1, "#031019");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const glowLeft = ctx.createRadialGradient(
        width * 0.18,
        height * 0.18,
        0,
        width * 0.18,
        height * 0.18,
        width * 0.42
      );
      glowLeft.addColorStop(0, "rgba(34,211,238,0.10)");
      glowLeft.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = glowLeft;
      ctx.fillRect(0, 0, width, height);

      const glowRight = ctx.createRadialGradient(
        width * 0.82,
        height * 0.22,
        0,
        width * 0.82,
        height * 0.22,
        width * 0.28
      );
      glowRight.addColorStop(0, "rgba(0,255,157,0.08)");
      glowRight.addColorStop(1, "rgba(0,255,157,0)");
      ctx.fillStyle = glowRight;
      ctx.fillRect(0, 0, width, height);
    };

    const drawHexGrid = (time: number) => {
      const size = 34;
      const hexHeight = Math.sqrt(3) * size;
      const vert = hexHeight;
      const horiz = 1.5 * size;

      ctx.save();
      ctx.lineWidth = 1;

      for (let x = -size * 2; x < width + size * 2; x += horiz) {
        for (let y = -hexHeight; y < height + hexHeight; y += vert) {
          const offsetY = Math.round(x / horiz) % 2 === 0 ? 0 : vert / 2;
          const px = x;
          const py = y + offsetY;

          const shimmer =
            0.025 + 0.02 * Math.sin((x + y + time * 0.05) * 0.01);
          ctx.strokeStyle = `rgba(56, 189, 248, ${shimmer})`;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + Math.PI / 6;
            const hx = px + size * Math.cos(angle);
            const hy = py + size * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const drawPacketRoutes = () => {
      ctx.save();

      packets.forEach((packet, index) => {
        packet.progress += packet.speed;
        if (packet.progress > 1) {
          packets[index] = createPacket();
          return;
        }

        ctx.strokeStyle = "rgba(34,211,238,0.07)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(packet.startX, packet.startY);
        ctx.lineTo(packet.endX, packet.endY);
        ctx.stroke();

        const x =
          packet.startX + (packet.endX - packet.startX) * packet.progress;
        const y =
          packet.startY + (packet.endY - packet.startY) * packet.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,157,${packet.alpha})`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#00ff9d";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();
    };

    const drawNodeMesh = () => {
      ctx.save();

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        a.x += a.dx;
        a.y += a.dy;

        if (a.x < 0 || a.x > width) a.dx *= -1;
        if (a.y < 0 || a.y > height) a.dy *= -1;

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34,211,238,0.42)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(34,211,238,${0.045 * (1 - dist / 110)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    };

    const drawRadar = (time: number) => {
      const cx = width * 0.8;
      const cy = height * 0.24;
      const radius = Math.min(width, height) * 0.17;
      const sweep = (time * 0.00055) % (Math.PI * 2);

      ctx.save();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34,211,238,0.18)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.68, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34,211,238,0.1)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.36, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34,211,238,0.08)";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.strokeStyle = "rgba(34,211,238,0.06)";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, sweep - 0.28, sweep + 0.03);
      ctx.closePath();

      const radarGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      radarGrad.addColorStop(0, "rgba(0,255,157,0.16)");
      radarGrad.addColorStop(0.55, "rgba(0,255,157,0.05)");
      radarGrad.addColorStop(1, "rgba(0,255,157,0)");
      ctx.fillStyle = radarGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweep) * radius, cy + Math.sin(sweep) * radius);
      ctx.strokeStyle = "rgba(0,255,157,0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();

      blips.forEach((blip) => {
        blip.pulse += blip.speed;
        const pulse = (Math.sin(blip.pulse) + 1) / 2;
        const angle = Math.atan2(blip.y - cy, blip.x - cx);
        const diff = Math.atan2(
          Math.sin(angle - sweep),
          Math.cos(angle - sweep)
        );
        const active = Math.abs(diff) < 0.22;

        ctx.beginPath();
        ctx.arc(blip.x, blip.y, blip.baseR + pulse * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = active
          ? "rgba(0,255,157,0.9)"
          : "rgba(34,211,238,0.45)";
        ctx.shadowBlur = active ? 20 : 8;
        ctx.shadowColor = active ? "#00ff9d" : "#22d3ee";
        ctx.fill();
        ctx.shadowBlur = 0;

        if (active) {
          ctx.beginPath();
          ctx.arc(
            blip.x,
            blip.y,
            blip.baseR + 5 + pulse * 3,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = "rgba(0,255,157,0.18)";
          ctx.stroke();
        }
      });

      ctx.restore();
    };

    const drawScanlinesAndSweep = (time: number) => {
      const scanY = ((time * 0.09) % (height + 140)) - 70;
      const grad = ctx.createLinearGradient(0, scanY - 18, 0, scanY + 18);
      grad.addColorStop(0, "rgba(0,255,157,0)");
      grad.addColorStop(0.5, "rgba(0,255,157,0.08)");
      grad.addColorStop(1, "rgba(0,255,157,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 18, width, 36);

      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.018)";
      for (let y = 0; y < height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawCornerHud = () => {
      ctx.save();
      ctx.strokeStyle = "rgba(56,189,248,0.18)";
      ctx.lineWidth = 1.3;

      const corner = 34;
      const len = 58;

      ctx.beginPath();
      ctx.moveTo(corner, corner + len);
      ctx.lineTo(corner, corner);
      ctx.lineTo(corner + len, corner);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width - corner - len, corner);
      ctx.lineTo(width - corner, corner);
      ctx.lineTo(width - corner, corner + len);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(corner, height - corner - len);
      ctx.lineTo(corner, height - corner);
      ctx.lineTo(corner + len, height - corner);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width - corner - len, height - corner);
      ctx.lineTo(width - corner, height - corner);
      ctx.lineTo(width - corner, height - corner - len);
      ctx.stroke();

      ctx.restore();
    };

    const drawVignette = () => {
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.14,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.66)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      drawBackground();
      drawHexGrid(time);
      drawPacketRoutes();
      drawNodeMesh();
      drawRadar(time);
      drawScanlinesAndSweep(time);
      drawCornerHud();
      drawVignette();

      animationId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}