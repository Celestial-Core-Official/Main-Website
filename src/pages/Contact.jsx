import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Mail, MessageSquare, Check, Copy, ChevronDown } from 'lucide-react'
import { pageTransition, fadeUp, stagger } from '../utils/animations.js'

const EMAIL = 'admin@celestialcore.cc'

const emailClients = [
  {
    label: 'Gmail',
    href: `https://mail.google.com/mail/?view=cm&to=${EMAIL}`
  },
  {
    label: 'Outlook',
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}`
  },
  {
    label: 'Yahoo Mail',
    href: `https://compose.mail.yahoo.com/?to=${EMAIL}`
  },
  {
    label: 'ProtonMail',
    href: `https://mail.proton.me/u/0/inbox#compose?to=${EMAIL}`
  },
  {
    label: 'Apple Mail',
    href: `mailto:${EMAIL}`
  }
]

function EmailCard() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      variants={fadeUp}
      className="glass glow-border flex flex-col rounded-2xl p-6"
    >
      <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-nebula-blue/30 to-nebula-purple/30 ring-1 ring-white/10">
        <Mail className="h-6 w-6" />
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold">Email</h2>
      <p className="mt-2 flex-1 text-sm text-white/60">
        Best for serious enquiries, collabs, or anything that needs a proper reply.
      </p>
      <p className="mt-4 font-mono text-sm text-white/50">{EMAIL}</p>

      <div ref={ref} className="relative mt-4">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-nebula-blue to-nebula-purple px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
        >
          <span>Open in email app</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-xl border border-white/10 bg-midnight-900/95 backdrop-blur-xl shadow-glow"
            >
              {emailClients.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3 text-sm text-white/80 transition hover:bg-white/[0.07] hover:text-white"
                >
                  {label}
                </a>
              ))}
              <div className="border-t border-white/10">
                <button
                  onClick={() => { copyEmail(); setOpen(false) }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-nebula-blue-glow transition hover:bg-white/[0.07] hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy email address'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function LinkCard({ icon: Icon, title, description, label, href, accent }) {
  return (
    <motion.div variants={fadeUp} className="glass glow-border flex flex-col rounded-2xl p-6">
      <span className={`inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${accent} ring-1 ring-white/10`}>
        <Icon className="h-6 w-6" />
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 flex-1 text-sm text-white/60">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08]"
      >
        {label}
      </a>
    </motion.div>
  )
}

export default function Contact() {
  return (
    <motion.div {...pageTransition}>
      <section className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.1)}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.25em] text-nebula-blue-glow"
          >
            / Contact
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-3 font-display font-bold leading-[1.05] tracking-tight text-balance text-[clamp(2.2rem,6vw,4.5rem)]"
          >
            Get in touch with{' '}
            <span className="text-gradient">Celestial Core.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-white/70 md:text-lg"
          >
            Whether you want to collaborate, report something, or just say hi
            — pick whichever channel works best for you.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1)}
          className="mt-14 grid gap-5 sm:grid-cols-3"
        >
          <LinkCard
            icon={MessageSquare}
            title="Discord"
            description="Join the community. Chat about games, tooling, or just hang out."
            label="Join the server"
            href="https://discord.gg/UkkJ2UKZ6W"
            accent="from-nebula-purple/30 to-nebula-blue/30"
          />

          <EmailCard />

          <LinkCard
            icon={Github}
            title="GitHub"
            description="See what we're building. Open issues, check the code, or follow along."
            label="View on GitHub"
            href="https://github.com/Celestial-Core-Official"
            accent="from-nebula-gold/30 to-nebula-purple/30"
          />
        </motion.div>
      </section>
    </motion.div>
  )
}
