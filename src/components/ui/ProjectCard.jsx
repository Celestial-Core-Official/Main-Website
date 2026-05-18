import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import TechBadge from './TechBadge.jsx'
import CharPopText from './CharPopText.jsx'

const ACCENTS = {
  blue: 'from-nebula-blue/50 to-nebula-purple/0',
  purple: 'from-nebula-purple/50 to-nebula-blue/0',
  gold: 'from-nebula-gold/50 to-nebula-purple/0'
}

const STATUS_STYLES = {
  'Pre-Alpha':      'border-nebula-gold/40 bg-nebula-gold/10 text-nebula-gold',
  'In Development': 'border-nebula-blue/40 bg-nebula-blue/10 text-nebula-blue',
  'Beta':           'border-nebula-purple/40 bg-nebula-purple/10 text-white',
  'Released':       'border-green-500/40 bg-green-500/10 text-green-400',
}

export default function ProjectCard({
  title = 'PLACEHOLDER Project',
  description = 'PLACEHOLDER description - replace with a short, punchy summary of the project.',
  tags = ['PLACEHOLDER'],
  href = '#',
  image,
  accent = 'blue',
  status,
}) {
  const ref = useRef(null)

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
  }

  const accentClass = ACCENTS[accent] ?? ACCENTS.blue
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
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative block overflow-hidden rounded-2xl glass card-border p-5 will-change-transform transition-colors"
    >
      <motion.span
        aria-hidden="true"
        style={{ background: highlight }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-midnight ring-1 ring-white/10">
        <img
          src={coverSrc}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-tr ${accentClass} mix-blend-screen opacity-60`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />
        {status && (
          <span className={`absolute top-2.5 right-2.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm ${STATUS_STYLES[status] ?? 'border-white/20 bg-white/10 text-white/70'}`}>
            {status}
          </span>
        )}
      </div>

      <div className="relative mt-5 flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-semibold tracking-tight text-white">
          {title}
        </h3>
        <span className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-white/30 group-hover:bg-white/10">
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
      <p className="relative mt-2 text-sm text-white/65"><CharPopText text={description} /></p>

      {tags?.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <TechBadge key={t} label={t} size="xs" />
          ))}
        </div>
      )}
    </motion.a>
  )
}
