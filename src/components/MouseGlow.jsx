import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const glowRef = useRef(null)
  const rafRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const target = targetRef.current
      const current = currentRef.current

      // Smooth lerp for trailing effect
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08

      glow.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`

      rafRef.current = requestAnimationFrame(animate)
    }

    // Check for touch / reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isTouch && !prefersReduced) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      rafRef.current = requestAnimationFrame(animate)
    } else {
      glow.style.display = 'none'
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="mouse-glow" ref={glowRef} aria-hidden="true">
      <div className="mouse-glow-inner" />
      <div className="mouse-glow-outer" />
    </div>
  )
}
