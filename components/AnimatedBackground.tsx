"use client";

import React, { useEffect, useRef } from "react";

type ConicGradientContext = CanvasRenderingContext2D & {
  createConicGradient?: (
    startAngle: number,
    x: number,
    y: number
  ) => CanvasGradient;
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let angle = 0;

    type Node = {
      x: number;
      y: number;
      r: number;
      color: string;
      pulse: number;
      speed: number;
    };

    type Stream = {
      x: number;
      y: number;
      len: number;
      speed: number;
      alpha: number;
    };

    let nodes: Node[] = [];
    let streams: Stream[] = [];

    const COLORS = ["#00e5ff", "#00ff9d", "#ff3366", "#ffcc00"];

    const init = (w: number, h: number) => {
      nodes = [];
      streams = [];

      for (let i = 0; i < 18; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2.5 + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          pulse: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01,
        });
      }

      const count = Math.max(1, Math.floor(w / 80));
      for (let i = 0; i < count; i++) {
        streams.push({
          x: (i / count) * w + Math.random() * 40,
          y: Math.random() * h,
          len: Math.random() * 80 + 40,
          speed: Math.random() * 1.2 + 0.5,
          alpha: Math.random() * 0.12 + 0.04,
        });
      }
    };

    const drawGrid = (w: number, h: number) => {
      ctx.save();
      ctx.strokeStyle = "rgba(0,229,255,0.025)";
      ctx.lineWidth = 1;

      const step = 55;

      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawRadar = (w: number, h: number) => {
      const cx = w * 0.82;
      const cy = h * 0.78;
      const R = Math.min(w, h) * 0.22;

      ctx.save();

      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (R / 4) * i, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,229,255,${0.06 - i * 0.01})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(0,229,255,0.05)";
      ctx.beginPath();
      ctx.moveTo(cx - R, cy);
      ctx.lineTo(cx + R, cy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy - R);
      ctx.lineTo(cx, cy + R);
      ctx.stroke();

      const ctxWithConic = ctx as ConicGradientContext;
      const sweep =
        typeof ctxWithConic.createConicGradient === "function"
          ? ctxWithConic.createConicGradient(angle, cx, cy)
          : null;

      if (sweep) {
        sweep.addColorStop(0, "rgba(0,229,255,0.18)");
        sweep.addColorStop(0.15, "rgba(0,229,255,0.08)");
        sweep.addColorStop(0.35, "rgba(0,229,255,0.00)");

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fillStyle = sweep;
        ctx.fill();
        ctx.restore();
      } else {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, angle - 0.6, angle);
        ctx.closePath();

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, "rgba(0,229,255,0.18)");
        g.addColorStop(1, "rgba(0,229,255,0)");
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
      ctx.strokeStyle = "rgba(0,229,255,0.55)";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#00e5ff";
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      const blipCount = 5;
      for (let i = 0; i < blipCount; i++) {
        const bAngle = (i / blipCount) * Math.PI * 2;
        const bR = (0.3 + (i % 3) * 0.22) * R;
        const bx = cx + Math.cos(bAngle) * bR;
        const by = cy + Math.sin(bAngle) * bR;
        const diff = Math.abs(
          (((bAngle - angle) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        );
        const bright = diff < 0.5 ? 1 - diff / 0.5 : 0;

        if (bright > 0) {
          ctx.beginPath();
          ctx.arc(bx, by, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,157,${bright * 0.9})`;
          ctx.shadowBlur = 12 * bright;
          ctx.shadowColor = "#00ff9d";
          ctx.fill();
        }
      }

      ctx.restore();
    };

    const drawStreams = (h: number) => {
      streams.forEach((s) => {
        const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.len);
        grad.addColorStop(0, "rgba(0,229,255,0)");
        grad.addColorStop(0.5, `rgba(0,229,255,${s.alpha})`);
        grad.addColorStop(1, "rgba(0,229,255,0)");

        ctx.fillStyle = grad;
        ctx.fillRect(s.x, s.y, 1, s.len);

        s.y += s.speed;
        if (s.y > h) s.y = -s.len;
      });
    };

    const drawNodes = () => {
      nodes.forEach((n) => {
        n.pulse += n.speed;
        const a = (Math.sin(n.pulse) + 1) / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + a * 2, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = 0.35 + a * 0.5;
        ctx.shadowBlur = 8 + a * 10;
        ctx.shadowColor = n.color;
        ctx.fill();
        ctx.restore();
      });
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "rgba(0,5,10,0.92)";
      ctx.fillRect(0, 0, w, h);

      drawGrid(w, h);
      drawStreams(h);
      drawNodes();
      drawRadar(w, h);

      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(0,5,10,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      angle = (angle + 0.012) % (Math.PI * 2);
      raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: "#00050a",
      }}
      aria-hidden="true"
    />
  );
}