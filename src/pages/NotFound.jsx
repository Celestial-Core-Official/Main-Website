import { motion } from 'framer-motion'
import { Home, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import { pageTransition, fadeUp, stagger, useScramble } from '../utils/animations.js'

export default function NotFound() {
  const s404 = useScramble('404', 42, 300)
  const slost = useScramble('Lost in the void', 42, 600)

  return (
    <motion.div {...pageTransition}>
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 mesh-bg opacity-40 pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 grid-overlay pointer-events-none" />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger(0.1)}
              className="flex flex-col items-center"
            >
              <motion.div
                variants={fadeUp}
                className="mb-8"
              >
                <p className="font-mono text-sm uppercase tracking-[0.25em] text-nebula-blue-glow">
                  Error
                </p>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display font-extrabold leading-[1.0] tracking-tight text-[clamp(5rem,15vw,12rem)] text-gradient"
              >
                {s404}
              </motion.h1>

              <motion.h2
                variants={fadeUp}
                className="mt-6 font-display text-3xl font-bold text-white md:text-5xl"
              >
                {slost}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-lg text-lg text-white/60"
              >
                The page you're looking for has drifted beyond the event horizon. Let's get you back on course.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              >
                <Button to="/" variant="primary" icon={Home}>
                  Return Home
                </Button>
                <Button to="/projects" variant="outline">
                  View Projects
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
