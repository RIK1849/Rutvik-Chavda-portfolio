"use client";

import React, { useEffect, useRef } from "react";

type Blip = {
  x: number;
  y: number;
  r: number;
  pulse: number;
  speed: number;
  alpha: number;
};

type Stream = {
  y: number;
  x: number;
  width: number;
  speed: number;
  alpha: number;
};

type NodePoint = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
};

export default function ThreatRadarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId = 0;
    let width = 0;
    let height = 0;

    let blips: Blip[] = [];
    let streams: Stream[] = [];
    let nodes: NodePoint[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * Math.min(window.devicePixelRatio || 1, 2);
      canvas.height = height * Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(Math.min(window.devicePixelRatio || 1, 2), Math.min(window.devicePixelRatio || 1, 2));

      const blipCount = Math.max(14, Math.floor(width / 120));
      const streamCount = Math.max(10, Math.floor(height / 70));
      const nodeCount = Math.max(18, Math.floor(width / 90));

      const radarCenterX = width * 0.78;
      const radarCenterY = height * 0.23;
      const radarRadius = Math.min(width, height) * 0.18;

      blips = Array.from({ length: blipCount }, () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * radarRadius * 0.9;
        return {
          x: radarCenterX + Math.cos(angle) * dist,
          y: radarCenterY + Math.sin(angle) * dist,
          r: Math.random() * 2.8 + 1.5,
          pulse: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.03 + 0.015,
          alpha: Math.random() * 0.4 + 0.25,
        };
      });

      streams = Array.from({ length: streamCount }, (_, i) => ({
        y: ((i + 1) * height) / (streamCount + 1),
        x: Math.random() * width,
        width: Math.random() * 120 + 40,
        speed: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.1 + 0.05,
      }));

      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.6 + 0.8,
      }));
    };

    const drawGrid = () => {
      ctx.save();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.045)";
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
    };

    const drawStreams = (time: number) => {
      ctx.save();

      streams.forEach((stream, index) => {
        stream.x += stream.speed;
        if (stream.x - stream.width > width) {
          stream.x = -40;
        }

        const grad = ctx.createLinearGradient(stream.x, stream.y, stream.x + stream.width, stream.y);
        grad.addColorStop(0, "rgba(0,255,157,0)");
        grad.addColorStop(0.5, `rgba(0,255,157,${stream.alpha})`);
        grad.addColorStop(1, "rgba(0,255,157,0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = index % 3 === 0 ? 1.2 : 1;
        ctx.beginPath();
        ctx.moveTo(stream.x, stream.y);
        ctx.lineTo(stream.x + stream.width, stream.y);
        ctx.stroke();

        const pingX = (stream.x + (time * 0.06 + index * 37)) % width;
        ctx.beginPath();
        ctx.arc(pingX, stream.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34,211,238,0.7)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#22d3ee";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();
    };

    const drawNodes = () => {
      ctx.save();

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.dx;
        a.y += a.dy;

        if (a.x < 0 || a.x > width) a.dx *= -1;
        if (a.y < 0 || a.y > height) a.dy *= -1;

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34,211,238,0.45)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(34,211,238,${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
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
      const cx = width * 0.78;
      const cy = height * 0.23;
      const radius = Math.min(width, height) * 0.18;
      const sweepAngle = (time * 0.00055) % (Math.PI * 2);

      ctx.save();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34,211,238,0.18)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.66, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34,211,238,0.12)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.33, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34,211,238,0.08)";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.strokeStyle = "rgba(34,211,238,0.08)";
      ctx.stroke();

      const sweepGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      sweepGradient.addColorStop(0, "rgba(34,211,238,0.14)");
      sweepGradient.addColorStop(0.55, "rgba(34,211,238,0.05)");
      sweepGradient.addColorStop(1, "rgba(34,211,238,0)");

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, sweepAngle - 0.28, sweepAngle + 0.04);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
      ctx.strokeStyle = "rgba(0,255,157,0.32)";
      ctx.lineWidth = 2;
      ctx.stroke();

      blips.forEach((blip) => {
        blip.pulse += blip.speed;
        const pulse = (Math.sin(blip.pulse) + 1) / 2;

        const angleToBlip = Math.atan2(blip.y - cy, blip.x - cx);
        const diff = Math.atan2(Math.sin(angleToBlip - sweepAngle), Math.cos(angleToBlip - sweepAngle));
        const highlighted = Math.abs(diff) < 0.18;

        ctx.beginPath();
        ctx.arc(blip.x, blip.y, blip.r + pulse * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = highlighted
          ? `rgba(0,255,157,${0.75})`
          : `rgba(34,211,238,${blip.alpha})`;
        ctx.shadowBlur = highlighted ? 18 : 8;
        ctx.shadowColor = highlighted ? "#00ff9d" : "#22d3ee";
        ctx.fill();
        ctx.shadowBlur = 0;

        if (highlighted) {
          ctx.beginPath();
          ctx.arc(blip.x, blip.y, blip.r + 5 + pulse * 3, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(0,255,157,0.18)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      ctx.restore();
    };

    const drawOverlays = (time: number) => {
      const scanY = ((time * 0.08) % (height + 140)) - 70;
      const scan = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      scan.addColorStop(0, "rgba(0,255,157,0)");
      scan.addColorStop(0.5, "rgba(0,255,157,0.07)");
      scan.addColorStop(1, "rgba(0,255,157,0)");
      ctx.fillStyle = scan;
      ctx.fillRect(0, scanY - 20, width, 40);

      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.018)";
      for (let y = 0; y < height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
        ctx.stroke();
      }
      ctx.restore();

      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.12,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.78
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.62)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#02070d");
      bg.addColorStop(0.5, "#05131d");
      bg.addColorStop(1, "#031019");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const glowA = ctx.createRadialGradient(
        width * 0.18,
        height * 0.16,
        0,
        width * 0.18,
        height * 0.16,
        width * 0.4
      );
      glowA.addColorStop(0, "rgba(34,211,238,0.12)");
      glowA.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = glowA;
      ctx.fillRect(0, 0, width, height);

      const glowB = ctx.createRadialGradient(
        width * 0.8,
        height * 0.24,
        0,
        width * 0.8,
        height * 0.24,
        width * 0.32
      );
      glowB.addColorStop(0, "rgba(0,255,157,0.08)");
      glowB.addColorStop(1, "rgba(0,255,157,0)");
      ctx.fillStyle = glowB;
      ctx.fillRect(0, 0, width, height);

      drawGrid();
      drawStreams(time);
      drawNodes();
      drawRadar(time);
      drawOverlays(time);

      frameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    frameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
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