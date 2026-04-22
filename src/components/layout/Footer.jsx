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
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <img src="/logo.png" alt="CelestialCore" className="h-8 w-auto object-contain" />
          <p className="mt-3 max-w-xs text-sm text-white/60">
            Systems-grade game and software engineering. Built by RealDzolat,
            headquartered in deep orbit.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50">
            Navigate
          </h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {footerLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50">
            Connect
          </h4>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>
              <a
                href="https://github.com/Dzolat"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <Github className="h-4 w-4" /> github.com/Dzolat
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
              </a>
            </li>
            <li>
              <a
                href="mailto:admin@celestialcore.cc"
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" /> admin@celestialcore.cc
              </a>
            </li>
            <li>
              <a
                href="https://discord.gg/UkkJ2UKZ6W"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <MessageSquare className="h-4 w-4" /> Discord
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
              </a>
            </li>
          </ul>
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
