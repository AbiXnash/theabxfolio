# theabxfolio

Personal portfolio of [Abinash Selvarasu](https://theabx.in) — backend engineer working with Java, Go, and payment systems.

Built with **Astro 6**, **Bun**, and **Tailwind v4**. Apple-inspired light/dark theme with system typography.

**Live:** [theabx.in](https://theabx.in) · **Version:** 5.2.0

---

## Features

- **Content-driven resume** — work, projects, and education from `src/data/resume.json` via Astro content collections.
- **Unified page layout** — shared `page-shell` gutters and max-width across header, sections, and footer.
- **Link hover previews** — rich previews on external and internal links (desktop).
- **GitHub activity feed** — bento-style repo grid with language tints, commit counts, and recent-push indicators.
- **Light / dark mode** — system-aware theme toggle with CSS custom properties.
- **Responsive layout** — mobile nav drawer, compact project cards, and adaptive hero stack logos.
- **Resume download** — PDF linked from hero, work section, and footer.
- **SEO** — JSON-LD, Open Graph, Twitter cards, and sitemap.

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | [Astro](https://astro.build) v6 (static, content collections, sitemap) |
| Runtime | [Bun](https://bun.sh) |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 (Vite plugin) |
| Typography | SF Pro / system sans, SF Mono |
| Deploy | GitHub Pages + Cloudflare Workers (API proxy) |
| API | Cloudflare Worker at `api.theabx.in` (GitHub token server-side) |

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

Other scripts: `bun run lint`, `bun run format`, `bun run typecheck`, `bun test`.

---

## Project Structure

```
src/
├── components/          # UI (Hero, cards, layout, repo skeleton)
│   └── layout/        # Container, Section, SiteHeader, SiteFooter
├── config/
│   └── site.ts        # Site metadata, nav, social links
├── content.config.ts  # Astro content collection schema
├── data/
│   └── resume.json    # Work, projects, education source of truth
├── layouts/
│   └── BaseLayout.astro
├── lib/               # Helpers (repos, link previews, tech logos)
├── pages/             # index.astro, 404.astro
├── scripts/           # Client JS (theme, nav, repos, link previews)
└── styles/
    └── global.css     # Theme tokens, page-shell, component styles
workers/
└── repos.js           # Cloudflare Worker — proxies GitHub API
public/
└── abinash_selvarasu_resume.pdf
```

---

## Customization

### Site config

Edit `src/config/site.ts` for name, handle, email, social links, nav items, and resume path.

### Resume content

Update `src/data/resume.json`. Work skills render as text pills; project cards support featured layout and GitHub links.

### Design tokens

Theme and layout variables live in `src/styles/global.css`:

```css
:root {
  --page-gutter: 1.5rem;      /* 2rem at sm+ */
  --page-max-width: 1068px;
  --theme-bg: #ffffff;
  --theme-blue: #0071e3;
}

html.dark {
  --theme-bg: #000000;
  --theme-blue: #2997ff;
}
```

Tailwind utilities map to these via `@theme` (e.g. `text-gruv-text`, `bg-gruv-surface`).

---

## Deployment

### GitHub Pages + Cloudflare Worker

Repo data is fetched from a Cloudflare Worker at `api.theabx.in`, which proxies the GitHub API and keeps the token server-side.

#### Prerequisites

- Cloudflare account with `theabx.in` zone
- GitHub token with `public_repo` scope
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

#### Setup

1. **Clone and install:**
   ```sh
   bun install
   ```

2. **Configure environment:**
   ```sh
   # .env — used for local dev
   VITE_WORKER_URL=https://api.theabx.in
   ```

3. **Deploy the Worker:**
   ```sh
   wrangler login
   wrangler deploy
   echo "<your-github-token>" | wrangler secret put GITHUB_TOKEN
   ```

4. **Set GitHub Actions variables/secrets:**
   ```sh
   gh variable set WORKER_URL --body "https://api.theabx.in"
   gh secret set CLOUDFLARE_API_TOKEN --body "<your-cloudflare-token>"
   gh secret set THE_REPO_TOKEN --body "<your-github-token>"
   ```

5. **Push to `master`** — the workflow builds the site, deploys to GitHub Pages, and updates the Worker on Cloudflare.

---

## License

MIT License.

---

## References

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)