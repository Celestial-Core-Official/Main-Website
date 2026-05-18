import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, Gamepad2, Code2, Cpu, Sparkles,
  Radio, User
} from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import TechBadge from '../components/ui/TechBadge.jsx'
import { pageTransition, fadeUp, stagger, useScramble } from '../utils/animations.js'

function useTypewriter(phrases, typeSpeed = 55, deleteSpeed = 30, pauseMs = 2400) {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[phraseIdx]
    if (!deleting && charIdx < phrase.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), typeSpeed)
      return () => clearTimeout(t)
    }
    if (!deleting && charIdx === phrase.length) {
      const t = setTimeout(() => setDeleting(true), pauseMs)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), deleteSpeed)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % phrases.length)
    }
  }, [charIdx, deleting, phraseIdx, phrases, typeSpeed, deleteSpeed, pauseMs])

  return phrases[phraseIdx].slice(0, charIdx)
}

const techStack = ['Luau', 'TypeScript', 'C++', 'C#', 'Python']

const marqueeItems = ['Celestial', 'Core']

const QUOTES = [
  'Build systems that serve. Every architecture carries intention-make it count for something.',
  'Faith in the work. Excellence isn\'t luck; it\'s discipline guided by purpose.',
  'Discipline of code. We\'re caretakers of what we build, responsible to users and to something greater.',
  'Create with conviction. The best work happens when craft meets calling.',
]

const buildStages = ['Map', 'Items', 'Core Systems', 'Official Release']

export default function Home() {
  const quote = useTypewriter(QUOTES)
  const scrambleCelestial = useScramble('Celestial', 42, 300)
  const scrambleCore = useScramble('Core.', 42, 700)

  return (
    <motion.div {...pageTransition}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 mesh-bg opacity-40 pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 grid-overlay pointer-events-none" />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">

            {/* Left: Identity */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger(0.1)}
              className="flex flex-col items-start"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-white/60"
              >
                <Sparkles className="h-3 w-3 text-nebula-gold" />
                Systems Engineering
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="mt-6 font-display font-extrabold leading-[1.0] tracking-tight text-[clamp(3rem,7.5vw,7rem)]"
              >
                <span className="text-gradient">{scrambleCelestial}</span>
                <br />
                <span className="text-white">{scrambleCore}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-white/60 md:text-lg">
                I'm{' '}
                <span className="font-semibold text-white">RealDzolat</span>
                {' '}- a systems engineer building production-grade software.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button to="/projects" variant="primary" icon={ArrowRight}>
                  View My Projects
                </Button>
                <Button to="/contact" variant="outline">
                  Start a Project
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-2">
                {techStack.map((t) => (
                  <TechBadge key={t} label={t} />
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Live Status Panel */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div className="glass glow-border rounded-3xl p-6 space-y-6">

                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <Radio className="h-3.5 w-3.5 text-nebula-blue" />
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-nebula-blue-glow">
                      / Currently Building
                    </p>
                  </div>
                  <div className="mb-5 flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)] animate-pulse" />
                    <div>
                      <p className="font-display text-lg font-semibold text-white">Factory Beyond</p>
                      <p className="mt-0.5 text-xs text-white/50">Resource loop · Machine systems · World gen</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {buildStages.map((stage, i) => (
                      <div key={stage} className="flex items-center gap-3">
                        <div className={`h-1 flex-1 rounded-full ${i < 3 ? 'bg-nebula-blue/50' : 'bg-white/[0.08]'}`} />
                        <span className={`w-28 text-right font-mono text-[10px] uppercase tracking-wider ${i < 3 ? 'text-white/55' : 'text-white/20'}`}>
                          {stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/[0.06]" />

                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-nebula-purple-glow">
                    / Philosophy
                  </p>
                  <p className="min-h-[3rem] font-display text-base font-semibold leading-snug text-white/80">
                    &ldquo;{quote}
                    <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-nebula-purple align-middle animate-pulse" />
                    &rdquo;
                  </p>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-y border-white/5 py-4">
        <div className="marquee-track flex items-center">
          {Array.from({ length: 60 }, (_, i) => marqueeItems[i % marqueeItems.length]).map((item, i) => (
            <span
              key={i}
              className="mx-8 flex-shrink-0 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-white/30"
            >
              {item}
              <span className="ml-8 text-nebula-blue/30">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured Project Spotlight ────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-nebula-purple-glow"
        >
          / Featured Project
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="glass glow-border relative overflow-hidden rounded-3xl"
        >
          <div aria-hidden="true" className="absolute inset-0 mesh-bg opacity-30" />
          <div className="relative grid lg:grid-cols-[1fr_auto]">
            <div className="p-8 md:p-12">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-nebula-purple/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-nebula-purple ring-1 ring-nebula-purple/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-nebula-purple animate-pulse" />
                  Production
                </span>
                <span className="font-mono text-xs text-white/40">React · TypeScript · Vite</span>
              </div>
              <h2 className="mb-4 font-display text-4xl font-bold text-white md:text-5xl">
                Celestial Website
              </h2>
              <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/60">
                High-performance portfolio site with dark-space aesthetic, smooth animations, and premium glass-morphic design. Built for speed and visual polish.
              </p>
              <div className="mb-8 flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Vite', 'Framer Motion'].map(t => <TechBadge key={t} label={t} />)}
              </div>
              <Button to="/projects" variant="primary" icon={ArrowRight}>
                View All Projects
              </Button>
            </div>
            <div className="hidden items-center justify-center border-l border-white/5 p-10 lg:flex">
              <div className="relative">
                <div className="flex h-36 w-36 items-center justify-center rounded-2xl bg-gradient-to-br from-nebula-purple/20 to-nebula-gold/10 ring-1 ring-white/10">
                  <Code2 className="h-16 w-16 text-nebula-purple/60" />
                </div>
                <div className="absolute -inset-6 -z-10 rounded-3xl bg-nebula-purple/5 blur-2xl" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>


    </motion.div>
  )
}
