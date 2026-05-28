import { motion } from 'framer-motion'
import { pageTransition, fadeUp, stagger } from '../utils/animations.js'

export default function PrivacyPolicy() {
  return (
    <motion.div {...pageTransition}>
      <section className="mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32">
        <motion.div initial="hidden" animate="visible" variants={stagger(0.08)}>
          <motion.p variants={fadeUp} className="font-mono text-xs uppercase tracking-[0.25em] text-nebula-blue-glow">
            / Legal
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Privacy Policy
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-3 font-mono text-sm text-white/40">
            Last updated: May 28, 2026
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 space-y-10 text-white/70 leading-relaxed">
            <div>
              <h2 className="font-display text-xl font-semibold text-white mb-3">What we collect</h2>
              <p>
                This site does not collect, store, or process any personal information. There are no
                accounts, contact forms, or tracking scripts. The only data stored on your device is
                a short-lived session cache of project listings (in <code className="font-mono text-sm text-nebula-blue-glow">sessionStorage</code>),
                which is cleared when you close your browser tab.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-white mb-3">Third-party services</h2>
              <p>
                The site is hosted on <strong className="text-white">Vercel</strong> and fetches content
                from <strong className="text-white">Supabase</strong>. These services may log standard
                server data (e.g. IP addresses, request metadata) as part of their normal operation.
                Their respective privacy policies govern that data — we don't have access to it.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-white mb-3">Cookies & tracking</h2>
              <p>
                No cookies are set by this site. No analytics, ad networks, or fingerprinting scripts
                are present.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-white mb-3">Contact</h2>
              <p>
                Questions? Reach out at{' '}
                <a
                  href="mailto:admin@celestialcore.cc"
                  className="text-nebula-blue-glow hover:text-white transition-colors"
                >
                  admin@celestialcore.cc
                </a>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  )
}
