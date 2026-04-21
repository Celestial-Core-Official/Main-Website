import { motion } from 'framer-motion'
import {
  Braces,
  Code2,
  Cpu,
  Gamepad2,
  Rocket,
  Sparkles,
  Terminal,
  Workflow,
  Layers,
  Network,
  Database,
  Wrench
} from 'lucide-react'
import { pageTransition, fadeUp, stagger } from '../utils/animations.js'

const stack = [
  { name: 'Luau', icon: Braces },
  { name: 'TypeScript', icon: Code2 },
  { name: 'C++', icon: Cpu },
  { name: 'C#', icon: Layers },
  { name: 'Python', icon: Terminal },
  { name: 'Rojo', icon: Workflow },
  { name: 'Roact', icon: Gamepad2 },
  { name: 'Vite', icon: Rocket },
]

const milestones = [
  {
    year: '2016',
    title: 'First lines of Lua',
    body: 'PLACEHOLDER — started building small Roblox experiments, fell in love with systems design.'
  },
  {
    year: '2019',
    title: 'Going low-level',
    body: 'PLACEHOLDER — picked up C++ and C#, shipped small engines and networking toys.'
  },
  {
    year: '2022',
    title: 'Full-spectrum engineering',
    body: 'PLACEHOLDER — merged game dev and systems work, formalized a personal studio pipeline.'
  },
  {
    year: '2025',
    title: 'Celestial Core',
    body: 'PLACEHOLDER — launched the Celestial Core identity to unify every title, tool, and library I ship.'
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
              Engineering first. <span className="text-gradient">Feel always.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-white/70 md:text-lg"
            >
              I'm RealDzolat — founder of Celestial Core. I treat games and
              systems as the same craft: tight loops, clear data, and hot paths
              that respect the player and the team. I obsess over Luau topology,
              compiler flags, input latency, and the small rituals that make
              engineering feel like play.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              <div className="glass glow-border rounded-2xl p-5">
                <h3 className="font-display text-lg font-semibold">Philosophy</h3>
                <p className="mt-2 text-sm text-white/65">
                  Build small, composable units. Measure everything. Optimize the
                  feedback loop before the feature. Ship with taste.
                </p>
              </div>
              <div className="glass glow-border rounded-2xl p-5">
                <h3 className="font-display text-lg font-semibold">Discipline</h3>
                <p className="mt-2 text-sm text-white/65">
                  Strict typing, deterministic simulation, and documentation that
                  lives next to the code. Simulation parity with production.
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
            / Journey
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Milestones on the way here
          </h2>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-nebula-blue via-nebula-purple to-nebula-gold/70 md:left-1/2"
          />
          <ul className="space-y-10">
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="relative grid gap-4 md:grid-cols-2 md:gap-10"
              >
                <div
                  className={`glass glow-border relative ml-10 rounded-2xl p-5 md:ml-0 ${
                    i % 2 === 0 ? '' : 'md:col-start-2'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[34px] top-5 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-nebula-blue to-nebula-purple shadow-glow md:hidden"
                  />
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-nebula-blue-glow">
                    {m.year}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/65">{m.body}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-6 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gradient-to-br from-nebula-blue to-nebula-purple shadow-glow md:block"
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </motion.div>
  )
}
