# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build at http://localhost:4173
```

There are no test or lint commands configured.

## Stack

React 18 + Vite 5, React Router DOM v6, Tailwind CSS 3.4, Framer Motion 11, Lucide React. Deployed on Vercel (zero-config, auto-deploys on push to main).

## Architecture

Single-page portfolio site for RealDzolat with a dark/space aesthetic. All routes share a persistent Layout (Navbar + Footer + CustomCursor).

**Routing** (`src/App.jsx`): BrowserRouter with `<AnimatePresence mode="wait">` wrapping all routes. Every page wraps its root element in `<motion.div>` using the `pageTransition` variant from `src/utils/animations.js`. Catch-all `*` redirects to `/`.

**Routes**: `/` (Home), `/projects`, `/about`, `/contact`, `/privacy`.

**State**: No global state manager. Component-level `useState` only. Framer Motion `useMotionValue` is used in `ProjectCard` for 3D tilt effects.

**Data**: Content is hardcoded as arrays inside each page file (e.g., `highlights` in Home.jsx, `projects` in Projects.jsx). Items marked `PLACEHOLDER` are stubs awaiting real content.

## Key Files

- `src/utils/animations.js` — shared Framer Motion variants (`fadeUp`, `scaleIn`, `stagger`, `pageTransition`, etc.). Import from here instead of defining inline variants.
- `src/index.css` — global utility classes: `.glass` (backdrop-blur card), `.glow-border` (conic gradient border), `.text-gradient`, `.mesh-bg`, `.grid-overlay`. Also sets `cursor: none` on fine-pointer devices for the custom cursor.
- `tailwind.config.js` — custom design tokens: colors (`void`, `midnight.*`, `nebula.blue/purple/gold`), fonts (`Space Grotesk`, `Inter`, `JetBrains Mono`), shadow utilities (`glow`, `glow-purple`, `glow-gold`), keyframe animations.
- `src/components/ui/Button.jsx` — polymorphic component supporting `as="link"` (React Router), `as="href"` (anchor), or default button. Variants: `primary`, `outline`, `ghost`.
- `src/components/ui/ProjectCard.jsx` — 3D tilt on hover, lazy image loading, accent color prop.
- `src/components/layout/CustomCursor.jsx` — dual-layer orb + spring-ring cursor; only active on fine-pointer (desktop) devices.

## Design Conventions

- Use existing Tailwind tokens (`nebula-blue`, `midnight-800`, etc.) rather than arbitrary hex values.
- New animated elements should use variants from `src/utils/animations.js`.
- Glassmorphic cards use the `.glass` class + `glow-border` for the border effect.
- The site targets a dark color scheme only — no light mode support.
- Static assets go in `public/` and are referenced by absolute path (e.g., `/image.jpg`).

## Gstack

For all web browsing and AI-assisted development workflows, use the gstack skill suite instead of browser MCPs. Use the `/browse` skill for web browsing, never use `mcp__claude-in-chrome__*` tools.

**Available gstack skills:**
- `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review` — planning & reviews
- `/design-consultation`, `/design-shotgun`, `/design-html`, `/review`, `/design-review` — design workflows
- `/ship`, `/land-and-deploy`, `/canary`, `/qa`, `/qa-only` — deployment & testing
- `/browse`, `/connect-chrome`, `/setup-browser-cookies` — web browsing
- `/plan`, `/autoplan` — development planning
- `/benchmark`, `/benchmark-models` — performance analysis
- `/investigate`, `/document-release`, `/codex`, `/cso` — investigation & documentation
- `/retro` — retrospectives
- `/freeze`, `/guard`, `/unfreeze` — change management
- `/gstack-upgrade`, `/learn` — framework utilities
