import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import ProjectCard from '../components/ui/ProjectCard.jsx'
import { pageTransition, fadeUp, stagger, useScramble, useTypewriterOnce } from '../utils/animations.js'
import { useProjects } from '../hooks/useProjects.js'

export default function Projects() {
  const { projects, loading, error } = useProjects()
  const [active, setActive] = useState('All')
  const s1 = useScramble('Projects across ', 42, 300)
  const s2 = useScramble('every stack', 42, 600)
  const s3 = useScramble('that matters.', 42, 900)
  const description = useTypewriterOnce('Engines, services, tools, and research. Each card is a real engineering problem reduced to its essence.', 45, 600)

  const FILTERS = useMemo(() => {
    const languages = ['All', ...new Set(projects.map((p) => p.lang))]
    return languages
  }, [projects])

  const filtered = useMemo(
    () =>
      active === 'All' ? projects : projects.filter((p) => p.lang === active),
    [active, projects]
  )

  return (
    <motion.div {...pageTransition}>
      <section className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <motion.div initial="hidden" animate="visible" variants={stagger(0.1)}>
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.25em] text-nebula-blue-glow"
          >
            / Software engineering
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-3 font-display font-bold leading-[1.05] tracking-tight text-balance text-[clamp(2.2rem,6vw,4.5rem)]"
          >
            {s1}<span className="text-gradient">{s2}</span> {s3}
          </motion.h1>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            {description}
          </p>
        </motion.div>

        {loading && (
          <p className="mt-10 text-center text-white/50">
            Loading projects...
          </p>
        )}

        {error && (
          <p className="mt-10 text-center text-red-400">
            Error loading projects: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
                <Filter className="h-3.5 w-3.5" /> Filter
              </span>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    active === f
                      ? 'border-transparent bg-gradient-to-r from-nebula-blue/30 to-nebula-purple/30 text-white ring-1 ring-white/15 shadow-glow-sm'
                      : 'border-white/10 bg-white/[0.02] text-white/60 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div
              key={active}
              className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              {filtered.map((p) => (
                <ProjectCard key={p.title} {...p} featured={p.featured} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="mt-10 text-center text-white/50">
                No projects match this filter yet.
              </p>
            )}
          </>
        )}
      </section>
    </motion.div>
  )
}
