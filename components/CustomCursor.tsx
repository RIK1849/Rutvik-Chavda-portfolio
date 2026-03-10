"use client";
import React, { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const move = useCallback((e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    if (dotRef.current)  { dotRef.current.style.left  = x + "px"; dotRef.current.style.top  = y + "px"; }
    if (ringRef.current) { ringRef.current.style.left = x + "px"; ringRef.current.style.top = y + "px"; }
  }, []);

  const enter = useCallback(() => ringRef.current?.classList.add("hov"), []);
  const leave = useCallback(() => ringRef.current?.classList.remove("hov"), []);

  useEffect(() => {
    window.addEventListener("mousemove", move);
    const els = document.querySelectorAll("a,button,.btn-p,.btn-g,.nav-a,.con-link,.proj-card,.tl-item,.cert-item");
    els.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
    return () => {
      window.removeEventListener("mousemove", move);
      els.forEach(el => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
    };
  }, [move, enter, leave]);

  return (
    <>
      <div ref={dotRef}  className="cur-dot"  />
      <div ref={ringRef} className="cur-ring" />
    </>
  );
}
