import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Github, Mail, MessageSquare, Send, Sparkles } from 'lucide-react'
import { pageTransition, fadeUp, stagger } from '../utils/animations.js'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    // TODO: wire up to a real backend (Formspree / Resend / serverless function).
    // For now we simulate a round-trip so the UI states are testable.
    await new Promise((r) => setTimeout(r, 1200))

    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 3500)
  }

  return (
    <motion.div {...pageTransition}>
      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1.1fr]">
        <motion.div initial="hidden" animate="visible" variants={stagger(0.1)}>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            <Sparkles className="h-3.5 w-3.5 text-nebula-gold" />
            Open for collaboration
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display font-bold leading-[1.05] tracking-tight text-balance text-[clamp(2.2rem,6vw,4.5rem)]"
          >
            Let's build something{' '}
            <span className="text-gradient">worth orbiting.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-white/70 md:text-lg"
          >
            Whether you're spinning up a new Roblox title, shipping a low-level
            service, or just want to trade notes on tooling — send a signal.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 grid gap-3">
            <a
              href="mailto:PLACEHOLDER@celestialcore.cc"
              className="glass glow-border flex items-center gap-3 rounded-2xl p-4 transition hover:bg-white/[0.05]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-nebula-blue/30 to-nebula-purple/30 ring-1 ring-white/10">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-semibold">Email</p>
                <p className="text-sm text-white/60">PLACEHOLDER@celestialcore.cc</p>
              </div>
            </a>
            <a
              href="https://github.com/RealDzolat"
              target="_blank"
              rel="noreferrer"
              className="glass glow-border flex items-center gap-3 rounded-2xl p-4 transition hover:bg-white/[0.05]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-nebula-blue/30 to-nebula-purple/30 ring-1 ring-white/10">
                <Github className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-semibold">GitHub</p>
                <p className="text-sm text-white/60">github.com/RealDzolat</p>
              </div>
            </a>
            <div className="glass flex items-center gap-3 rounded-2xl p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-nebula-blue/30 to-nebula-purple/30 ring-1 ring-white/10">
                <MessageSquare className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-semibold">Discord</p>
                <p className="text-sm text-white/60">PLACEHOLDER#0000</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass glow-border relative rounded-3xl p-6 md:p-8"
        >
          <h2 className="font-display text-2xl font-bold">Send a signal</h2>
          <p className="mt-1 text-sm text-white/60">
            Fields marked with{' '}
            <span className="text-nebula-blue-glow">*</span> are required.
          </p>

          <div className="mt-6 grid gap-5">
            <Field
              label="Your name *"
              name="name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              placeholder="Jane Nebula"
              required
            />
            <Field
              label="Email *"
              name="email"
              type="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              placeholder="jane@startup.dev"
              required
            />
            <Field
              label="Message *"
              name="message"
              as="textarea"
              value={form.message}
              onChange={(v) => setForm((f) => ({ ...f, message: v }))}
              placeholder="What are you building?"
              required
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nebula-blue to-nebula-purple px-6 py-3 font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:cursor-progress disabled:opacity-80"
            >
              {status === 'sent' ? (
                <>
                  <Check className="h-4 w-4" /> Sent — see you in orbit
                </>
              ) : status === 'sending' ? (
                <>
                  <Send className="h-4 w-4 animate-pulse" /> Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Transmit message
                </>
              )}
            </button>
          </div>
        </motion.form>
      </section>
    </motion.div>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  as = 'input',
  required
}) {
  const shared =
    'peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-nebula-blue-glow/70 focus:bg-white/[0.05] focus:shadow-glow'

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
      {as === 'textarea' ? (
        <textarea
          rows={5}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={shared}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={shared}
        />
      )}
    </label>
  )
}
