import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import TechBadge from './TechBadge.jsx'
import CharPopText from './CharPopText.jsx'

const accentColor = {
  blue: {
    gradient: 'from-nebula-blue/50 to-nebula-purple/0',
    dot: 'bg-nebula-blue',
    glow: 'shadow-glow'
  },
  purple: {
    gradient: 'from-nebula-purple/50 to-nebula-blue/0',
    dot: 'bg-nebula-purple',
    glow: 'shadow-glow-purple'
  },
  gold: {
    gradient: 'from-nebula-gold/50 to-nebula-purple/0',
    dot: 'bg-nebula-gold',
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

  const accentConfig = accentColor[accent] ?? accentColor.blue
  const coverSrc =
    image ||
    `https://placehold.co/800x500/0A0F1F/60A5FA?text=${encodeURIComponent(title)}`
  const isExternal = href?.startsWith('http')

  const baseClasses =
    'group relative block overflow-hidden rounded-2xl glass glow-border will-change-transform transition-all hover:scale-[1.02]'

  if (featured) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className={`${baseClasses} md:col-span-2 grid md:grid-cols-2 gap-6 p-8`}
      >
        <motion.span
          aria-hidden="true"
          style={{ background: highlight }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Image on right */}
        <div className="relative order-2 aspect-video overflow-hidden rounded-xl bg-midnight ring-1 ring-white/10 md:order-last">
          <img
            src={coverSrc}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-gradient-to-tr ${accentConfig.gradient} mix-blend-screen opacity-60`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />
        </div>

        {/* Content on left */}
        <div className="relative order-1 flex flex-col justify-between md:order-first">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-block h-2 w-2 rounded-full ${accentConfig.dot}`} />
              <span className="font-mono text-xs uppercase tracking-widest text-white/60">Featured</span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4 leading-tight">
              {title}
            </h3>
            <p className="text-base text-white/70 mb-6 line-clamp-3">
              <CharPopText text={description} />
            </p>
          </div>

          {/* Tech badges */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((t) => (
                <TechBadge key={t} label={t} size="sm" />
              ))}
            </div>
          )}

          {/* View Project button */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white/60">
              <span className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
            >
              View Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </div>
      </motion.a>
    )
  }

  // Standard card layout
  return (
    <motion.a
      ref={ref}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`${baseClasses} flex flex-col p-4`}
    >
      <motion.span
        aria-hidden="true"
        style={{ background: highlight }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Image on top */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-midnight ring-1 ring-white/10 mb-4">
        <img
          src={coverSrc}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-tr ${accentConfig.gradient} mix-blend-screen opacity-60`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />
      </div>

      {/* Content below */}
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display text-xl font-semibold tracking-tight text-white">
            {title}
          </h3>
          <span className="inline-grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-white/30 group-hover:bg-white/10">
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>

        <p className="text-sm text-white/65 line-clamp-2 mb-3">
          <CharPopText text={description} />
        </p>

        <div className="flex flex-1 flex-col justify-between">
          {/* Tags (first 3 only) */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, 3).map((t) => (
                <TechBadge key={t} label={t} size="xs" />
              ))}
            </div>
          )}

          {/* Lang badge with divider */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">
              {lang}
            </span>
            <span className="text-xs text-white/40">Explore →</span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
