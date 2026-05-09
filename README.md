# theabxfolio

Personal portfolio of [Abinash Selvarasu](https://theabx.in) — Software Engineer building resilient, high-stakes backend systems.

Built with **Astro 6**, **Bun**, and **Tailwind v4**, featuring a premium "Apple-Impact" design system with the iconic **Gruvbox Dark** color palette.

---

## 🚀 Key Features

- **Apple-Impact Design** — Premium, high-contrast layout with elegant whitespace and massive typography.
- **Gruvbox Aesthetic** — Warm, retro-dark theme featuring the legendary Gruvbox color palette.
- **Astro 6 Content Layer** — Type-safe data management with high-performance loaders for `resume.json`.
- **View Transitions** — Instant, app-like navigation using Astro's `ClientRouter`.
- **Interactive Personality** — A sarcastic, floating **Pixel Ghost Pet** with scroll-triggered speech bubbles.
- **Mobile Optimized** — Native-feeling **Bottom Drawer Menu** and compact section gaps.
- **Scroll Control** — "Load More" functionality for the Lab (Projects) section to maintain a clean UX.
- **SEO Ready** — Full meta tags, JSON-LD structured data, and high-performance static builds.

---

## 🛠 Tech Stack

- **Framework:** [Astro](https://astro.build) v6 (Content Layer, View Transitions)
- **Runtime:** [Bun](https://bun.sh) (Builds, Package Management, Macros)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4 (Vite plugin integration)
- **Typography:** Inter (Sans-serif), JetBrains Mono (Monospace), Press Start 2P (Pixel)
- **Deploy:** GitHub Pages (Static)

---

## ⚡ Quick Start

```sh
# Install dependencies (ultra-fast with Bun)
bun install

# Development server
bun run dev

# Production build
bun run build

# Preview production build locally
bun run preview
```

---

## 📂 Project Structure

```
src/
├── components/          # Reusable UI (Experience, Project cards, etc.)
├── content/             # Astro 6 Content Collections (config.ts)
├── data/                # Source of truth (resume.json)
├── layouts/             # Page skeletons (BaseLayout.astro)
├── lib/                 # Logic and helper macros
├── pages/               # Main routes (index.astro)
└── styles/              # Global CSS and theme definitions
```

---

## 🎨 Customization

### Design Tokens

All primary tokens are managed via the Tailwind v4 `@theme` directive in `src/styles/global.css`:

```css
@theme {
  --color-gruv-bg: #1d2021;
  --color-gruv-surface: #282828;
  --color-gruv-orange: #fe8019;
  --font-sans: Inter, system-ui;
}
```

---

## 📊 Deployment

### GitHub Pages

1. Push to `master` branch.
2. The site auto-deploys via GitHub Actions (`.github/workflows/astro.yml`).
3. Ensure GitHub Pages settings are pointed to the `gh-pages` branch or root depending on your workflow.

---

## 📝 License

MIT License — Feel free to fork this and make it your own!

---

## 🔗 References

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [Gruvbox Palette](https://github.com/morhetz/gruvbox)
