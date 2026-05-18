import { useState, useEffect } from 'react'
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
import CharPopText from '../components/ui/CharPopText.jsx'
import { pageTransition, fadeUp, stagger, useScramble } from '../utils/animations.js'

const ROBLOX_USER_ID = 783467725

function useRobloxAvatar(userId) {
  const [url, setUrl] = useState(null)
  useEffect(() => {
    fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png`
    )
      .then((r) => r.json())
      .then((data) => setUrl(data?.data?.[0]?.imageUrl ?? null))
      .catch(() => {})
  }, [userId])
  return url
}

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
    icon: Code2,
    label: 'Web projects',
    title: 'Production Software',
    body: 'Building robust web applications with React and TypeScript. We focus on clean code, performance optimization, and scalable architecture that handles growth.',
    badge: 'Active'
  },
  {
    icon: Code2,
    label: 'System design',
    title: 'Architecture first',
    body: 'Every project starts with strong fundamentals. Scalable infrastructure, clear data flows, and systems designed to evolve without technical debt.',
    badge: 'Core'
  }
]

export default function About() {
  const avatarUrl = useRobloxAvatar(ROBLOX_USER_ID)
  const s1 = useScramble('A small studio. ', 42, 300)
  const s2 = useScramble('Serious craft.', 42, 700)

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
              {s1}<span className="text-gradient">{s2}</span>
            </motion.h1>
            <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
              <CharPopText
                text="Celestial Core is a systems engineering studio focused on building production-grade software. We prioritize clean architecture, strong fundamentals, and code that scales. Every project starts with clarity — whether it's performance optimization, scalable infrastructure, or polished user experiences."
                delayStart={0.5}
              />
            </p>
            <p className="mt-4 max-w-2xl text-white/60 md:text-base">
              <CharPopText
                text="We work across the full stack: web applications, backend systems, and everything in between. The mission is simple: ship excellent work."
                delayStart={0.5}
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative flex flex-col gap-5"
          >
            <div className="glass glow-border flex items-center gap-4 rounded-2xl p-5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-nebula-blue/30 to-nebula-purple/30 ring-1 ring-white/10">
                  <img src={'/realdzolat.png'} alt="RealDzolat" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-display text-base font-semibold">RealDzolat</p>
                <p className="mt-0.5 text-sm text-white/55">Founder · Celestial Core</p>
                <a
                  href="https://www.roblox.com/users/783467725/profile"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block font-mono text-[11px] uppercase tracking-wider text-nebula-blue hover:text-white transition-colors"
                >
                  Roblox profile →
                </a>
              </div>
            </div>

            <div className="glass glow-border relative rounded-3xl p-6 transition-colors">
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
                      <Icon className="h-5 w-5 text-nebula-blue" />
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
              className="glass card-border rounded-2xl p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-nebula-blue/20 to-nebula-purple/20 ring-1 ring-white/8">
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
              <p className="mt-2 text-sm text-white/65"><CharPopText text={body} /></p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  )
}
