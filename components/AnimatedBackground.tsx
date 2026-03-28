"use client";

import React, { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let particles: NodePoint[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.max(22, Math.floor(window.innerWidth / 70));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.18,
        dy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 0.8,
      }));
    };

    const render = () => {
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#02070d");
      bg.addColorStop(0.55, "#04111a");
      bg.addColorStop(1, "#03141b");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * 0.8,
        height * 0.24,
        0,
        width * 0.8,
        height * 0.24,
        Math.max(width, height) * 0.5
      );
      glow.addColorStop(0, "rgba(34,211,238,0.12)");
      glow.addColorStop(0.45, "rgba(0,255,157,0.04)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.strokeStyle = "rgba(34,211,238,0.035)";
      ctx.lineWidth = 1;
      const grid = 56;

      for (let x = 0; x < width; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34,211,238,0.75)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#22d3ee";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);

          if (dist < 140) {
            ctx.strokeStyle = `rgba(34,211,238,${0.09 * (1 - dist / 140)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      const scanY = ((performance.now() * 0.08) % (height + 120)) - 60;
      const scan = ctx.createLinearGradient(0, scanY - 18, 0, scanY + 18);
      scan.addColorStop(0, "rgba(0,255,157,0)");
      scan.addColorStop(0.5, "rgba(0,255,157,0.08)");
      scan.addColorStop(1, "rgba(0,255,157,0)");
      ctx.fillStyle = scan;
      ctx.fillRect(0, scanY - 18, width, 36);

      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.15,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.58)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    frame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
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
