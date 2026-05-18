import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import TechBadge from './TechBadge.jsx'
import CharPopText from './CharPopText.jsx'

const accentColor = {
  blue: {
    gradient: 'from-nebula-blue/50 to-nebula-purple/0',
    glow: 'shadow-glow'
  },
  purple: {
    gradient: 'from-nebula-purple/50 to-nebula-blue/0',
    glow: 'shadow-glow-purple'
  },
  gold: {
    gradient: 'from-nebula-gold/50 to-nebula-purple/0',
    glow: 'shadow-glow-gold'
  }
}

export default function ProjectCard({
  title = 'PLACEHOLDER Project',
  description = 'PLACEHOLDER description - replace with a short, punchy summary of the project.',
  tags = ['PLACEHOLDER'],
  lang = 'JavaScript',
  href = '#',
  image,
  accent = 'blue',
  featured = false,
  layout = 'default',
}) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 220,
    damping: 18
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 220,
    damping: 18
  })

  const highlight = useTransform(
    [mx, my],
    ([vx, vy]) =>
      `radial-gradient(420px circle at ${(vx + 0.5) * 100}% ${
        (vy + 0.5) * 100
      }%, rgba(96,165,250,0.22), transparent 55%)`
  )

  function handleMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    mx.set(0)
    my.set(0)
    setIsHovered(false)
  }

  const accentConfig = accentColor[accent] ?? accentColor.blue
  const coverSrc =
    image ||
    `https://placehold.co/800x500/0A0F1F/60A5FA?text=${encodeURIComponent(title)}`
  const isExternal = href?.startsWith('http')

  return (
    <motion.a
      ref={ref}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      animate={{ height: isHovered ? 'auto' : 320 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="group relative block overflow-hidden rounded-2xl glass glow-border will-change-transform"
    >
      <motion.span
        aria-hidden="true"
        style={{ background: highlight }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Image - fixed height */}
      <div className="relative h-40 overflow-hidden bg-midnight ring-1 ring-white/10 shrink-0">
        <motion.img
          src={coverSrc}
          alt={title}
          loading="lazy"
          animate={{ scale: isHovered ? 1.12 : 1 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-tr ${accentConfig.gradient} mix-blend-screen opacity-60`}
        />
        <motion.div
          animate={{ opacity: isHovered ? 0.3 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-4">
        <motion.h3
          animate={{ fontSize: isHovered ? '1.125rem' : '1.25rem' }}
          transition={{ duration: 0.3 }}
          className="font-display font-semibold tracking-tight text-white leading-tight mb-2 line-clamp-2"
        >
          {title}
        </motion.h3>

        {/* Description - expands on hover */}
        <motion.p
          animate={{
            opacity: isHovered ? 1 : 0.6,
            height: isHovered ? 'auto' : 'clamp(0px, 1.2em, 1.2em)',
            marginBottom: isHovered ? 16 : 'auto'
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-xs text-white/60 leading-relaxed overflow-hidden"
        >
          <CharPopText text={description} />
        </motion.p>

        {/* Tags - fade in on hover */}
        {tags?.length > 0 && (
          <motion.div
            initial={{ opacity: isHovered ? 1 : 1 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2 mt-auto pt-2"
          >
            {tags.slice(0, 3).map((t) => (
              <TechBadge key={t} label={t} size="xs" />
            ))}
          </motion.div>
        )}
      </div>
    </motion.a>
  )
}
