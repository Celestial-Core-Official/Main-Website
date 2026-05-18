import { motion } from 'framer-motion'
import { Gamepad2, Map, Cpu, Sparkles } from 'lucide-react'
import ProjectCard from '../components/ui/ProjectCard.jsx'
import TechBadge from '../components/ui/TechBadge.jsx'
import CharPopText from '../components/ui/CharPopText.jsx'
import { pageTransition, fadeUp, stagger, useScramble } from '../utils/animations.js'

const games = [
  {
    title: 'Factory Beyond',
    description:
      'An open-world Roblox factory game. Gather resources, build machines, and automate your way to something bigger. Currently in pre-alpha.',
    tags: ['Luau', 'Rojo', 'Fusion'],
    accent: 'blue',
    href: '#',
    image: '/games/factory-beyond.png',
    status: 'Pre-Alpha'
  }
]

const pillars = [
  {
    icon: Cpu,
    title: 'Luau Architecture',
    body: 'Code that holds up under pressure. Strict types, clean modules, and a structure built to grow without breaking.'
  },
  {
    icon: Gamepad2,
    title: 'Feel & Mechanics',
    body: 'Games that feel good before they look good. Every movement and interaction gets tuned until it just clicks.'
  },
  {
    icon: Map,
    title: 'World-Building',
    body: 'Worlds worth getting lost in. Hand-built environments - places that pull you back.'
  }
]

export default function Games() {
  const s1 = useScramble('Games engineered', 42, 300)
  const s2 = useScramble('for the long orbit.', 42, 700)

  return (
    <motion.div {...pageTransition}>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1)}
            className="max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70"
            >
              <Sparkles className="h-3.5 w-3.5 text-nebula-gold" />
              Roblox · Luau · Worlds
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display font-bold leading-[1.05] tracking-tight text-balance text-[clamp(2.2rem,6vw,4.5rem)]"
            >
              <span className="text-gradient">{s1}</span>
              <br />
              {s2}
            </motion.h1>
            <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
              <CharPopText
                text="Every title ships on a hand-forged Luau foundation - strict types, composable systems, and a design discipline that treats simulation quality as product quality."
                delayStart={0.5}
              />
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-nebula-blue-glow">
            / Pillars
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            How every Celestial Core game is built
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="glass card-border rounded-2xl p-6 transition-colors"
            >
              <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-nebula-blue/20 to-nebula-purple/20 ring-1 ring-white/8">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/65"><CharPopText text={body} /></p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-nebula-blue-glow">
              / Titles
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Roblox portfolio
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Luau', 'Rojo', 'Fusion'].map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.08)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {games.map((g) => (
            <motion.div key={g.title} variants={fadeUp}>
              <ProjectCard {...g} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  )
}
