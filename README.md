# Celestial Core

> Portfolio of **RealDzolat** — a systems and game programmer. Built as a deep-space dark-mode React SPA with glassmorphism, Framer Motion micro-interactions, and a custom cursor. Deployed on Vercel.

Live site: **[celestialcore.cc](https://celestialcore.cc)**

This project was made with **[Claude Code](https://claude.ai)**

---

## Tech stack

| Layer       | Tool                                        |
| ----------- | ------------------------------------------- |
| Framework   | [React 18](https://react.dev) + [Vite 5](https://vitejs.dev) |
| Routing     | [React Router DOM v6](https://reactrouter.com) |
| Styling     | [Tailwind CSS 3.4](https://tailwindcss.com) with custom tokens |
| Animations  | [Framer Motion 11](https://www.framer.com/motion/) |
| Icons       | [Lucide React](https://lucide.dev)          |
| Hosting     | [Vercel](https://vercel.com)                |

## Getting started

### Prerequisites

- **Node.js >= 18** (Vite 5 requires it)
- **npm >= 9** (or pnpm / yarn / bun — just swap the commands below)

### Install & run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally (http://localhost:4173)
npm run preview
```

---

## Project structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── LICENSE
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── utils/
    │   └── animations.js
    ├── components/
    │   ├── layout/
    │   │   ├── Layout.jsx
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   └── ui/
    │       ├── Button.jsx
    │       ├── ProjectCard.jsx
    │       ├── TechBadge.jsx
    │       └── CustomCursor.jsx
    └── pages/
        ├── Home.jsx
        ├── Projects.jsx
        ├── About.jsx
        └── Contact.jsx
```

---

## Deploying to Vercel

This Portfolio is built for Vercel.

### 1. Push to GitHub

```bash
git add -A
git commit -m "feat: initial Celestial Core React build"
git push origin main
```

### 2. Import the repo in Vercel

1. Log in at [vercel.com](https://vercel.com) and click **Add New → Project**.
2. Import this repository from GitHub.
3. Vercel auto-detects Vite. Confirm these defaults:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **Deploy**.

---

## Customizing the content

Every piece of site copy that wasn't supplied yet is marked `PLACEHOLDER` in the source. Quick wins:

- **Featured projects** — `src/pages/Home.jsx` → `highlights` array.
- **Software projects** — `src/pages/Projects.jsx` → `projects` array.
- **Bio + milestones** — `src/pages/About.jsx` → `milestones` array.
- **Contact info** — `src/pages/Contact.jsx` and `src/components/layout/Footer.jsx`.

Real cover images can be dropped anywhere (e.g. `/public/covers/`) and passed to `<ProjectCard image="/covers/nova.jpg" />`. Without an image it falls back to [placehold.co](https://placehold.co).

---

## Design tokens

Defined centrally in `tailwind.config.js` + `src/index.css`:

| Token              | Value            |
| ------------------ | ---------------- |
| `void`             | `#050505`        |
| `midnight`         | `#0A0F1F`        |
| `nebula.blue`      | `#3B82F6`        |
| `nebula.blue-glow` | `#60A5FA`        |
| `nebula.purple`   | `#8B5CF6`        |
| `nebula.gold`     | `#F5C451`        |
| Display font       | `Space Grotesk`  |
| Body font          | `Inter`          |
| Mono font          | `JetBrains Mono` |

Utilities available: `.glass`, `.glass-card`, `.glow-border`, `.text-gradient`, `.mesh-bg`, `.grid-overlay`.

---

## License

[MIT](./LICENSE) (c) RealDzolat / Celestial Core.
