import { useState, useEffect } from 'react'

// Reusable Framer Motion variants for the Celestial Core site.
// Import only what you need: `import { fadeUp, stagger } from '@/utils/animations'`.

export const EASE_OUT = [0.22, 1, 0.36, 1]

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?'

export function useTypewriterOnce(text, typeSpeed = 55, delayMs = 0) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let charIdx = 0
    let typeTimeoutId
    let startTimeoutId

    const type = () => {
      if (charIdx < text.length) {
        setDisplayed(text.slice(0, charIdx + 1))
        charIdx++
        typeTimeoutId = setTimeout(type, typeSpeed)
      }
    }

    startTimeoutId = setTimeout(type, delayMs)

    return () => {
      clearTimeout(startTimeoutId)
      clearTimeout(typeTimeoutId)
    }
  }, [text, typeSpeed, delayMs])

  return displayed
}

export function useScramble(finalText, speed = 42, delayMs = 300) {
  const [displayed, setDisplayed] = useState(() =>
    finalText.split('').map(c =>
      c === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    ).join('')
  )

  useEffect(() => {
    let resolved = 0
    let scrambleId
    let noiseId

    const noise = () => {
      setDisplayed(
        finalText.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < resolved) return char
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }).join('')
      )
      noiseId = setTimeout(noise, 60)
    }

    const start = setTimeout(() => {
      noiseId = setTimeout(noise, 0)
      scrambleId = setInterval(() => {
        resolved++
        if (resolved >= finalText.length) {
          clearTimeout(noiseId)
          clearInterval(scrambleId)
          setDisplayed(finalText)
        }
      }, speed)
    }, delayMs)

    return () => {
      clearTimeout(start)
      clearTimeout(noiseId)
      clearInterval(scrambleId)
    }
  }, [finalText, speed, delayMs])

  return displayed
}
export const EASE_IN = [0.4, 0, 1, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT }
  }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT }
  }
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren }
  }
})

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT }
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.35, ease: EASE_IN }
  }
}

export const letterFadeUp = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.6, ease: EASE_OUT }
  })
}

export const glowPulse = {
  animate: {
    opacity: [0.6, 1, 0.6],
    scale: [1, 1.03, 1],
    transition: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
  }
}

export const float = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
  }
}

export const hoverLift = {
  whileHover: { y: -3, scale: 1.02 },
  whileTap: { y: 0, scale: 0.98 },
  transition: { type: 'spring', stiffness: 380, damping: 22 }
}
