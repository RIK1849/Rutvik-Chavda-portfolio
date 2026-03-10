"use client";
import React, { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number;
    let gridOff = 0;

    class Particle {
      x: number; y: number; vx: number; vy: number;
      r: number; color: string; alpha: number;
      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.75;
        this.vy = (Math.random() - 0.5) * 0.75;
        this.r = Math.random() * 1.4 + 0.4;
        this.alpha = Math.random() * 0.55 + 0.35;
        const rng = Math.random();
        this.color = rng > 0.97 ? "#ff3366" : rng > 0.88 ? "#00ff9d" : "#00e5ff";
      }
      update(w: number, h: number) {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.shadowBlur = 9; c.shadowColor = this.color;
        c.fill(); c.restore();
      }
    }

    let pts: Particle[] = [];

    const init = (w: number, h: number) => {
      pts = [];
      const n = w < 768 ? 55 : 115;
      for (let i = 0; i < n; i++) pts.push(new Particle(w, h));
    };

    const drawLines = () => {
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 115) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = "#00e5ff";
            ctx.lineWidth = 0.5;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke(); ctx.restore();
          }
        }
      }
    };

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = "#00050a";
      ctx.fillRect(0, 0, w, h);

      // drifting grid
      gridOff = (gridOff + 0.12) % 60;
      ctx.save();
      ctx.strokeStyle = "rgba(0,229,255,.02)";
      ctx.lineWidth = 1;
      for (let x = (gridOff % 60) - 60; x < w + 60; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = (gridOff % 60) - 60; y < h + 60; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      ctx.restore();

      // center glow
      const g = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w * 0.55);
      g.addColorStop(0, "rgba(0,229,255,.022)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

      pts.forEach(p => { p.update(w, h); p.draw(ctx); });
      drawLines();
      raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize(); draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position:"fixed", top:0, left:0, width:"100vw", height:"100vh", zIndex:-1, pointerEvents:"none", backgroundColor:"#00050a" }} aria-hidden="true" />
  );
}