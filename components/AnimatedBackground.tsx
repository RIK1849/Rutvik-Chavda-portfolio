"use client";

import React, { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
};

type Node = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
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
    let stars: Star[] = [];
    let nodes: Node[] = [];

    const createScene = (width: number, height: number) => {
      const starCount = Math.max(70, Math.floor((width * height) / 22000));
      const nodeCount = Math.max(10, Math.floor(width / 160));

      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.6 + 0.15,
        speed: Math.random() * 0.14 + 0.04,
      }));

      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * (height * 0.72),
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 2 + 1.2,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createScene(canvas.width, canvas.height);
    };

    const drawBase = (width: number, height: number) => {
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#02070d");
      bg.addColorStop(0.55, "#041019");
      bg.addColorStop(1, "#03141b");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
    };

    const drawGlow = (width: number, height: number, time: number) => {
      const pulse = 0.08 + Math.sin(time * 0.00055) * 0.02;

      const rightGlow = ctx.createRadialGradient(
        width * 0.78,
        height * 0.28,
        0,
        width * 0.78,
        height * 0.28,
        Math.max(width, height) * 0.55
      );
      rightGlow.addColorStop(0, `rgba(0,229,255,${pulse + 0.05})`);
      rightGlow.addColorStop(0.42, "rgba(0,255,157,0.06)");
      rightGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rightGlow;
      ctx.fillRect(0, 0, width, height);

      const centerGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      centerGlow.addColorStop(0, "rgba(0,229,255,0.02)");
      centerGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStars = (width: number, height: number) => {
      for (const star of stars) {
        star.y += star.speed;
        if (star.y > height + 3) {
          star.y = -3;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${star.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00e5ff";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const drawPerspectiveGrid = (width: number, height: number, time: number) => {
      const horizonY = height * 0.36;
      const vanishingX = width * 0.52 + Math.sin(time * 0.00025) * width * 0.02;
      const floorHeight = height - horizonY;

      ctx.save();
      ctx.strokeStyle = "rgba(0,229,255,0.075)";
      ctx.lineWidth = 1;

      for (let i = -16; i <= 16; i++) {
        const bottomX = vanishingX + i * (width * 0.08);
        const topX = vanishingX + i * (width * 0.012);
        ctx.beginPath();
        ctx.moveTo(topX, horizonY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      for (let i = 1; i <= 16; i++) {
        const p = i / 16;
        const y = horizonY + Math.pow(p, 1.8) * floorHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const sweepY =
        horizonY + ((time * 0.18) % (floorHeight + 80)) - 40;

      const sweep = ctx.createLinearGradient(0, sweepY - 22, 0, sweepY + 22);
      sweep.addColorStop(0, "rgba(0,255,157,0)");
      sweep.addColorStop(0.5, "rgba(0,255,157,0.1)");
      sweep.addColorStop(1, "rgba(0,255,157,0)");
      ctx.fillStyle = sweep;
      ctx.fillRect(0, sweepY - 22, width, 44);

      ctx.restore();
    };

    const drawDataNodes = (width: number, height: number) => {
      for (const node of nodes) {
        node.x += node.dx;
        node.y += node.dy;

        if (node.x < 0 || node.x > width) node.dx *= -1;
        if (node.y < 0 || node.y > height * 0.74) node.dy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,229,255,0.9)";
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#00e5ff";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.save();
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < 160) {
            ctx.strokeStyle = `rgba(0,229,255,${0.09 * (1 - distance / 160)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    };

    const drawDataRain = (width: number, height: number, time: number) => {
      ctx.save();
      const count = Math.floor(width / 70);

      for (let i = 0; i < count; i++) {
        const x = (i / count) * width + (i % 2) * 18;
        const y = ((time * 0.22 + i * 75) % (height + 160)) - 160;
        const h = 90 + (i % 4) * 28;

        const grad = ctx.createLinearGradient(x, y, x, y + h);
        grad.addColorStop(0, "rgba(0,229,255,0)");
        grad.addColorStop(0.5, "rgba(0,229,255,0.08)");
        grad.addColorStop(1, "rgba(0,229,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, 1.2, h);
      }

      ctx.restore();
    };

    const drawVignette = (width: number, height: number) => {
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.15,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.82
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.56)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const render = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      drawBase(width, height);
      drawGlow(width, height, time);
      drawDataRain(width, height, time);
      drawStars(width, height);
      drawDataNodes(width, height);
      drawPerspectiveGrid(width, height, time);
      drawVignette(width, height);

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
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}