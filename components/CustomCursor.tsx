"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        dotRef.current.style.opacity = "1";
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = "1";
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }

      raf = window.requestAnimationFrame(animate);
    };

    const interactiveSelector =
      'a, button, input, textarea, select, [role="button"], .btn-p, .btn-g, .nav-a, .con-link, .proj-card, .tl-item, .cert-item';

    const handleEnter = () => {
      ringRef.current?.classList.add("hov");
    };

    const handleLeave = () => {
      ringRef.current?.classList.remove("hov");
    };

    const attachHoverListeners = () => {
      const elements = document.querySelectorAll(interactiveSelector);
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });

      return () => {
        elements.forEach((el) => {
          el.removeEventListener("mouseenter", handleEnter);
          el.removeEventListener("mouseleave", handleLeave);
        });
      };
    };

    const detachHoverListeners = attachHoverListeners();

    window.addEventListener("mousemove", move);
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      detachHoverListeners();
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}