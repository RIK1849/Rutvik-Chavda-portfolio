"use client";

import React, { useCallback, useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const move = useCallback((e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;

    if (dotRef.current) {
      dotRef.current.style.left = `${x}px`;
      dotRef.current.style.top = `${y}px`;
    }

    if (ringRef.current) {
      ringRef.current.style.left = `${x}px`;
      ringRef.current.style.top = `${y}px`;
    }
  }, []);

  const enter = useCallback(() => {
    ringRef.current?.classList.add("hov");
  }, []);

  const leave = useCallback(() => {
    ringRef.current?.classList.remove("hov");
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", move);

    const selectors =
      "a,button,.btn-p,.btn-g,.nav-a,.con-link,.proj-card,.tl-item,.cert-item";
    const elements = document.querySelectorAll(selectors);

    elements.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);

      elements.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [move, enter, leave]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}