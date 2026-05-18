import { useEffect, useRef, useMemo } from 'react'

// ── Change this to control how many stars appear across the site ──
export const STAR_COUNT = 220

export default function StarField() {
  const canvasRef = useRef(null)

  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() * 1.1 + 0.25,
        baseOpacity: Math.random() * 0.65 + 0.15,
        // radians per millisecond - controls twinkle speed
        speed: (Math.random() * 0.0012 + 0.0004),
        phase: Math.random() * Math.PI * 2,
        // ~10% of stars get a subtle blue/purple tint
        tint: Math.random() < 0.12
          ? Math.random() < 0.5
            ? [56, 189, 248]   // cyan
            : [192, 132, 252]  // purple
          : [255, 255, 255],
      })),
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function draw(ts) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const t = Math.sin(ts * s.speed + s.phase)
        // oscillate between baseOpacity and ~15% of it
        const opacity = s.baseOpacity * (0.15 + 0.85 * ((t + 1) / 2))
        const [r, g, b] = s.tint
        ctx.beginPath()
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [stars])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20"
    />
  )
}
