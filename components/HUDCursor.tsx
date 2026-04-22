'use client'
import { useEffect } from 'react'

export default function HUDCursor() {
  useEffect(() => {
    const cursor = document.getElementById('hud-cursor')
    if (!cursor) return
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return <div id="hud-cursor" />
}
