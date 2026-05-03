import { Link } from 'react-router-dom'
import { Github, Mail, MessageSquare, ArrowUpRight } from 'lucide-react'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-24 border-t border-white/5 bg-void/60">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <img src="/logo.png" alt="CelestialCore" className="h-8 w-auto object-contain" />
            <p className="mt-3 max-w-xs text-sm text-white/60">
              Systems-grade game and software engineering. Built by RealDzolat,
              headquartered in deep orbit.
            </p>
            <nav className="mt-6 flex flex-wrap gap-4 text-sm">
              {footerLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/Dzolat"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                className="p-2 text-white/70 transition-colors hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:admin@celestialcore.cc"
                title="Email"
                className="p-2 text-white/70 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/UkkJ2UKZ6W"
                target="_blank"
                rel="noreferrer"
                title="Discord"
                className="p-2 text-white/70 transition-colors hover:text-white"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-5 text-xs text-white/40 md:flex-row md:items-center md:px-8">
          <p>© {year} Celestial Core · RealDzolat. All rights reserved.</p>
          <p className="font-mono">built in the void · v0.1.0</p>
        </div>
      </div>
    </footer>
  )
}
