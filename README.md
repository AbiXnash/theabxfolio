# theabxfolio

Personal portfolio of [Abinash Selvarasu](https://theabx.in), a backend engineer working with Java, Go, and payment systems.

Built with **Astro 6**, **Bun**, and **Tailwind v4**, using a Gruvbox-inspired dark color palette.

---

## Features

- **Astro content layer** for work, project, and education data in `resume.json`.
- **Responsive layout** with a mobile navigation drawer.
- **View transitions** using Astro's `ClientRouter`.
- **Project pagination** through a simple "show more projects" action.
- **Gruvbox-inspired theme** defined with Tailwind CSS tokens.

---

## Tech Stack

- **Framework:** [Astro](https://astro.build) v6 (Content Layer, View Transitions)
- **Runtime:** [Bun](https://bun.sh) (Builds, Package Management, Macros)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4 (Vite plugin integration)
- **Typography:** Inter (Sans-serif), JetBrains Mono (Monospace), Press Start 2P (Pixel)
- **Deploy:** GitHub Pages (Static)

---

## Quick Start

```sh
# Install dependencies
bun install

# Development server
bun run dev

# Production build
bun run build

# Preview production build locally
bun run preview
```

---

## Project Structure

```
src/
├── components/          # Reusable UI (Experience, Project cards, etc.)
├── content.config.ts    # Astro content collection schema
├── data/                # Source of truth (resume.json)
├── layouts/             # Page skeletons (BaseLayout.astro)
├── lib/                 # Logic and helper macros
├── pages/               # Main routes (index.astro)
└── styles/              # Global CSS and theme definitions
```

---

## Customization

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

## Deployment

### GitHub Pages

1. Push to `master` branch.
2. The site auto-deploys via GitHub Actions (`.github/workflows/astro.yml`).
3. Ensure GitHub Pages settings are pointed to the `gh-pages` branch or root depending on your workflow.

---

## License

MIT License.

---

## References

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [Gruvbox Palette](https://github.com/morhetz/gruvbox)
