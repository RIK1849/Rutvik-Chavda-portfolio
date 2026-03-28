"use client";

import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
  alpha: number;
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationId = 0;
    let particles: Particle[] = [];

    const createParticles = (width: number, height: number) => {
      const count = Math.max(24, Math.floor(width / 55));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.45,
        dy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.35 + 0.15,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles(canvas.width, canvas.height);
    };

    const drawGrid = (width: number, height: number) => {
      ctx.save();
      ctx.strokeStyle = "rgba(0,229,255,0.04)";
      ctx.lineWidth = 1;

      const step = 64;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawGlow = (width: number, height: number) => {
      const gradient = ctx.createRadialGradient(
        width * 0.72,
        height * 0.28,
        0,
        width * 0.72,
        height * 0.28,
        Math.max(width, height) * 0.45
      );

      gradient.addColorStop(0, "rgba(0,229,255,0.12)");
      gradient.addColorStop(0.45, "rgba(0,255,157,0.06)");
      gradient.addColorStop(1, "rgba(0,5,10,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawParticles = (width: number, height: number) => {
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00e5ff";
        ctx.fill();
        ctx.restore();
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);

          if (dist < 120) {
            ctx.save();
            ctx.strokeStyle = `rgba(0,229,255,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const drawScan = (width: number, height: number, time: number) => {
      const y = (time * 0.08) % (height + 140) - 70;

      const gradient = ctx.createLinearGradient(0, y - 30, 0, y + 30);
      gradient.addColorStop(0, "rgba(0,255,157,0)");
      gradient.addColorStop(0.5, "rgba(0,255,157,0.08)");
      gradient.addColorStop(1, "rgba(0,255,157,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, y - 30, width, 60);
    };

    const render = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#00050a";
      ctx.fillRect(0, 0, width, height);

      drawGlow(width, height);
      drawGrid(width, height);
      drawConnections();
      drawParticles(width, height);
      drawScan(width, height, time);

      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.2,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,5,10,0.62)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationId = window.requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
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
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: "#00050a",
      }}
    />
  );
}