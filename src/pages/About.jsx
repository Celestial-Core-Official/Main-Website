import { motion } from 'framer-motion'
import {
  Braces,
  Code2,
  Cpu,
  Gamepad2,
  Rocket,
  Terminal,
  Workflow,
  Layers,
  Hammer,
  Zap
} from 'lucide-react'
import { pageTransition, fadeUp, stagger } from '../utils/animations.js'

const stack = [
  { name: 'Luau', icon: Braces },
  { name: 'Fusion', icon: Zap },
  { name: 'Rojo', icon: Workflow },
  { name: 'TypeScript', icon: Code2 },
  { name: 'C++', icon: Cpu },
  { name: 'C#', icon: Layers },
  { name: 'Python', icon: Terminal },
  { name: 'Vite', icon: Rocket },
]

const focus = [
  {
    icon: Gamepad2,
    label: 'In development',
    title: 'Factory Beyond',
    body: "Our first title — a Roblox factory game set in an open world. Pre-alpha. We're building the core loop: gather, craft, automate, expand.",
    badge: 'Pre-Alpha'
  },
  {
    icon: Hammer,
    label: 'Internal tooling',
    title: 'Studio pipeline',
    body: 'Rojo-based workflow, shared Luau libraries, and Fusion-driven UI patterns we reuse across every project we ship.',
    badge: 'Ongoing'
  }
]

export default function About() {
  return (
    <motion.div {...pageTransition}>
      <section className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.1)}>
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.25em] text-nebula-blue-glow"
            >
              / About
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-3 font-display font-bold leading-[1.05] tracking-tight text-balance text-[clamp(2.2rem,6vw,4.5rem)]"
            >
              A small studio.{' '}
              <span className="text-gradient">Serious craft.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-white/70 md:text-lg"
            >
              Celestial Core is a one-person Roblox studio run by RealDzolat.
              The goal is simple: build games that are actually worth playing,
              backed by code that won't fall apart when things get interesting.
              Every title starts with a solid Luau foundation — strict types,
              clean systems, and a UI layer built on Fusion.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-white/60 md:text-base"
            >
              Right now that means Factory Beyond — an open-world factory game
              in pre-alpha. There's a lot left to build, and that's the fun part.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              <div className="glass glow-border rounded-2xl p-5">
                <h3 className="font-display text-lg font-semibold">How we build</h3>
                <p className="mt-2 text-sm text-white/65">
                  Small, focused systems. Fusion for reactive UI. Rojo for a
                  real dev workflow. Nothing gets shipped until it feels right.
                </p>
              </div>
              <div className="glass glow-border rounded-2xl p-5">
                <h3 className="font-display text-lg font-semibold">What we care about</h3>
                <p className="mt-2 text-sm text-white/65">
                  Games that respect the player's time. Code that a future
                  version of us won't hate. Quality over output.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="glass glow-border relative rounded-3xl p-6">
              <h2 className="font-display text-sm uppercase tracking-[0.2em] text-white/60">
                Tech stack
              </h2>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger(0.05)}
                className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4"
              >
                {stack.map(({ name, icon: Icon }) => (
                  <motion.div
                    key={name}
                    variants={fadeUp}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-2 py-4 text-center transition hover:border-white/25 hover:bg-white/[0.06] hover:shadow-glow-sm"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-nebula-blue/25 to-nebula-purple/25 ring-1 ring-white/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/75 group-hover:text-white">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-nebula-blue-glow">
            / Now
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            What we're working on
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1)}
          className="grid gap-6 md:grid-cols-2"
        >
          {focus.map(({ icon: Icon, label, title, body, badge }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="glass glow-border rounded-2xl p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-nebula-blue/30 to-nebula-purple/30 ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-nebula-gold">
                  {badge}
                </span>
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                {label}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/65">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  )
}
