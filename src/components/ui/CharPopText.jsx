import { motion } from 'framer-motion'
import { EASE_OUT } from '../../utils/animations.js'

// Container cascades 'cp-h'/'cp-v' state to all motion descendants.
// Unique names avoid inheriting parent hidden/visible stagger cascades.
const container = {
  'cp-h': {},
  'cp-v': {},
}

// Per-char variant with delay baked in so stagger works without direct motion children.
function charVariant(delay) {
  return {
    'cp-h': { opacity: 0, scale: 0.3 },
    'cp-v': { opacity: 1, scale: 1, transition: { delay, duration: 0.1, ease: EASE_OUT } },
  }
}

export default function CharPopText({ text, className, delayStart = 0 }) {
  const words = text.split(' ')

  // Pre-compute global char index per word for delay calculation.
  let charCount = 0
  const wordData = words.map((word) => {
    const chars = [...word]
    const startIdx = charCount
    charCount += chars.length + 1 // +1 accounts for the space after each word
    return { chars, startIdx }
  })
  const totalChars = charCount - 1
  const staggerDelay = totalChars > 1
    ? Math.min(0.025, (1.85 - delayStart) / (totalChars - 1))
    : 0

  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="cp-h"
      whileInView="cp-v"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      {wordData.map(({ chars, startIdx }, wi) => (
        <span key={wi}>
          {/* nowrap keeps chars within a word from splitting across lines */}
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {chars.map((char, ci) => (
              <motion.span
                key={ci}
                variants={charVariant(delayStart + (startIdx + ci) * staggerDelay)}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {/* Plain text space — natural word-break opportunity */}
          {wi < wordData.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  )
}
