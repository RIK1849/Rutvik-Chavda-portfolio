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

    const buildParticles = (width: number, height: number) => {
      const count = Math.max(22, Math.floor(width / 70));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.35 + 0.12,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildParticles(canvas.width, canvas.height);
    };

    const drawGrid = (width: number, height: number) => {
      ctx.save();
      ctx.strokeStyle = "rgba(0,229,255,0.035)";
      ctx.lineWidth = 1;
      const step = 60;

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
        width * 0.8,
        height * 0.22,
        0,
        width * 0.8,
        height * 0.22,
        Math.max(width, height) * 0.45
      );

      gradient.addColorStop(0, "rgba(0,229,255,0.14)");
      gradient.addColorStop(0.45, "rgba(0,255,157,0.05)");
      gradient.addColorStop(1, "rgba(0,5,10,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawParticles = (width: number, height: number) => {
      for (const particle of particles) {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > height) particle.dy *= -1;

        ctx.save();
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${particle.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00e5ff";
        ctx.fill();
        ctx.restore();
      }
    };

    const drawLinks = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < 110) {
            ctx.save();
            ctx.strokeStyle = `rgba(0,229,255,${0.1 * (1 - distance / 110)})`;
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

    const drawScanLine = (width: number, height: number, time: number) => {
      const y = (time * 0.09) % (height + 140) - 70;
      const gradient = ctx.createLinearGradient(0, y - 24, 0, y + 24);
      gradient.addColorStop(0, "rgba(0,255,157,0)");
      gradient.addColorStop(0.5, "rgba(0,255,157,0.08)");
      gradient.addColorStop(1, "rgba(0,255,157,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, y - 24, width, 48);
    };

    const render = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#00050a";
      ctx.fillRect(0, 0, width, height);

      drawGlow(width, height);
      drawGrid(width, height);
      drawLinks();
      drawParticles(width, height);
      drawScanLine(width, height, time);

      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.15,
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