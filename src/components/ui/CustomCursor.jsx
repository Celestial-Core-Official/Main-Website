import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.3 })
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.3 })

  const ringX = useSpring(x, { stiffness: 140, damping: 18, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 140, damping: 18, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const onOver = (e) => {
      const t = e.target
      if (!(t instanceof Element)) return
      const isInteractive = t.closest(
        'a, button, [role="button"], input, textarea, select, label, .cursor-pointer'
      )
      setHovering(!!isInteractive)
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('mouseup', onUp, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* DOT */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ scale: pressed ? 0.8 : hovering ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* RING */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] h-9 w-9 rounded-full border border-nebula-blue-glow/70 shadow-glow"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: pressed ? 0.85 : hovering ? 1.7 : 1,
          opacity: hovering ? 0.95 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      />
    </>
  )
}