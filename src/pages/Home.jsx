import { motion } from 'framer-motion'
import { ArrowRight, Gamepad2, Code2, Cpu, Sparkles } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import ProjectCard from '../components/ui/ProjectCard.jsx'
import TechBadge from '../components/ui/TechBadge.jsx'
import {
  pageTransition,
  fadeUp,
  stagger,
  letterFadeUp
} from '../utils/animations.js'

const HERO_TITLE = 'Celestial Core'

const highlights = [
  {
    title: 'Factory Beyond',
    description:
      'An open-world Roblox factory game. Gather resources, build machines, and automate your way to something bigger. Currently in pre-alpha.',
    tags: ['Luau', 'Rojo', 'Fusion'],
    href: '/games',
    accent: 'blue',
    image: '/games/factory-beyond.png'
  }
]

const pillars = [
  {
    icon: Gamepad2,
    title: 'Game Architecture',
    body: 'Luau-first composition patterns, Rojo workflows, data-oriented ECS layers, and tooling that scales to hundreds of systems.'
  },
  {
    icon: Cpu,
    title: 'Systems Engineering',
    body: 'Low-level C++/C# internals, render pipelines, networking, and performance work where microseconds matter.'
  },
  {
    icon: Code2,
    title: 'Tooling & DX',
    body: 'TypeScript and Python toolchains that make teams faster: codegen, CI orchestration, and first-class developer experience.'
  }
]

export default function Home() {
  return (
    <motion.div {...pageTransition}>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 mesh-bg opacity-80 animate-aurora"
        />
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-nebula-blue/20 blur-[120px]" />
          <div className="absolute -right-20 top-40 h-[360px] w-[360px] rounded-full bg-nebula-purple/25 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-nebula-gold/10 blur-[120px]" />
        </div>

        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute block h-[2px] w-[2px] rounded-full bg-white/60 animate-glow-pulse"
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 7) * 0.4}s`,
                opacity: 0.35 + ((i * 13) % 50) / 100
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 pb-24 pt-20 text-center md:px-8 md:pt-28 lg:pt-36">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.12)}
            className="flex flex-col items-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70"
            >
              <Sparkles className="h-3.5 w-3.5 text-nebula-gold" />
              Systems & Game Engineering
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display font-bold leading-[1.05] tracking-tight text-balance text-[clamp(2.5rem,7vw,6rem)]"
            >
              <span className="block">
                {HERO_TITLE.split('').map((ch, i) => (
                  <motion.span
                    key={`${ch}-${i}`}
                    custom={i}
                    variants={letterFadeUp}
                    className={`inline-block ${ch === ' ' ? 'w-[0.3em]' : ''}`}
                  >
                    <span className="text-gradient drop-shadow-[0_0_30px_rgba(96,165,250,0.35)]">
                      {ch === ' ' ? '\u00A0' : ch}
                    </span>
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-balance text-base text-white/70 md:text-lg"
            >
              I'm <span className="font-semibold text-white">RealDzolat</span> — a
              hardcore systems &amp; game programmer shipping ambitious Roblox
              titles and deep low-level software. Welcome to the void.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
            >
              <Button to="/projects" variant="primary" icon={ArrowRight}>
                Explore Projects
              </Button>
              <Button to="/contact" variant="outline">
                Start a Project
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
            >
              {['Luau', 'TypeScript', 'C++', 'C#', 'Python'].map((t) => (
                <TechBadge key={t} label={t} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-nebula-blue-glow">
              / Featured
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Highlight reel from the studio
            </h2>
            <p className="mt-3 max-w-2xl text-white/60">
              A curated slice across game development, systems engineering, and
              tooling. Hover to inspect; tap to dive deeper on their dedicated
              pages.
            </p>
          </div>
          <Button to="/projects" variant="ghost" icon={ArrowRight}>
            View all
          </Button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.12)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {highlights.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="glass glow-border rounded-2xl p-6"
            >
              <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-nebula-blue/30 to-nebula-purple/30 ring-1 ring-white/10">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/65">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="glass glow-border relative overflow-hidden rounded-3xl p-8 md:p-14">
          <div
            aria-hidden="true"
            className="absolute inset-0 mesh-bg opacity-70"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold md:text-4xl">
                Have a project worth building?
              </h3>
              <p className="mt-2 max-w-xl text-white/70">
                From Roblox launches to systems rewrites, Celestial Core takes on
                ambitious, long-haul engineering work.
              </p>
            </div>
            <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
              Start the conversation
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
