import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import ProjectCard from '../components/ui/ProjectCard.jsx'
import { pageTransition, fadeUp, stagger } from '../utils/animations.js'

const projects = [
  {
    title: 'PLACEHOLDER: Engine Core (C++)',
    description:
      'Custom C++20 runtime with job system, allocator arenas, and hot-reload. PLACEHOLDER summary.',
    tags: ['C++', 'CMake', 'Vulkan'],
    lang: 'C++',
    accent: 'blue',
    href: '#'
  },
  {
    title: 'PLACEHOLDER: Net Gateway (C#)',
    description:
      'High-throughput C# gateway with per-connection pipelines. PLACEHOLDER description.',
    tags: ['C#', '.NET 8', 'MessagePack'],
    lang: 'C#',
    accent: 'purple',
    href: '#'
  },
  {
    title: 'PLACEHOLDER: Toolchain CLI (TS)',
    description:
      'TypeScript CLI that orchestrates game pipelines end-to-end. PLACEHOLDER.',
    tags: ['TypeScript', 'Node', 'esbuild'],
    lang: 'TypeScript',
    accent: 'gold',
    href: '#'
  },
  {
    title: 'PLACEHOLDER: Data Ops (Python)',
    description:
      'Python data pipeline for balancing, telemetry, and playtest reports. PLACEHOLDER.',
    tags: ['Python', 'Pandas', 'DuckDB'],
    lang: 'Python',
    accent: 'blue',
    href: '#'
  },
  {
    title: 'PLACEHOLDER: Shader Lab (C++)',
    description:
      'Interactive shader authoring environment with hot-reload and node graph. PLACEHOLDER.',
    tags: ['C++', 'GLSL', 'ImGui'],
    lang: 'C++',
    accent: 'purple',
    href: '#'
  },
  {
    title: 'PLACEHOLDER: Anti-Cheat (C#)',
    description:
      'Behavioral anti-cheat with on-device signal collection. PLACEHOLDER.',
    tags: ['C#', 'ML.NET', 'gRPC'],
    lang: 'C#',
    accent: 'gold',
    href: '#'
  },
  {
    title: 'PLACEHOLDER: Asset CDN (TS)',
    description:
      'Edge-first asset delivery layer with signed URLs and cache warmup. PLACEHOLDER.',
    tags: ['TypeScript', 'Cloudflare', 'KV'],
    lang: 'TypeScript',
    accent: 'blue',
    href: '#'
  },
  {
    title: 'PLACEHOLDER: Sim Harness (Python)',
    description:
      'Headless simulation harness for regression-testing game systems. PLACEHOLDER.',
    tags: ['Python', 'Asyncio', 'Pytest'],
    lang: 'Python',
    accent: 'purple',
    href: '#'
  },
  {
    title: 'PLACEHOLDER: Profiler UI (TS)',
    description:
      'Web-based frame profiler for game servers with flamegraphs. PLACEHOLDER.',
    tags: ['TypeScript', 'React', 'WebGL'],
    lang: 'TypeScript',
    accent: 'gold',
    href: '#'
  }
]

const FILTERS = ['All', 'C++', 'C#', 'TypeScript', 'Python']

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = useMemo(
    () =>
      active === 'All' ? projects : projects.filter((p) => p.lang === active),
    [active]
  )

  return (
    <motion.div {...pageTransition}>
      <section className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <motion.div initial="hidden" animate="visible" variants={stagger(0.1)}>
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.25em] text-nebula-blue-glow"
          >
            / Software engineering
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-3 font-display font-bold leading-[1.05] tracking-tight text-balance text-[clamp(2.2rem,6vw,4.5rem)]"
          >
            Projects across <span className="text-gradient">every stack</span>
            <br />
            that matters.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-white/70 md:text-lg"
          >
            Engines, services, tools, and research. Each card is a real
            engineering problem reduced to its essence.
          </motion.p>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
            <Filter className="h-3.5 w-3.5" /> Filter
          </span>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                active === f
                  ? 'border-transparent bg-gradient-to-r from-nebula-blue/30 to-nebula-purple/30 text-white ring-1 ring-white/15 shadow-glow-sm'
                  : 'border-white/10 bg-white/[0.02] text-white/60 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial="hidden"
          animate="visible"
          variants={stagger(0.06)}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-white/50">
            No projects match this filter yet.
          </p>
        )}
      </section>
    </motion.div>
  )
}
