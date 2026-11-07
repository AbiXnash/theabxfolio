# theabxfolio

Personal portfolio of [Abinash Selvarasu](https://theabx.in) — software engineer working with Java, Spring Boot, Go, and payment systems.

Built with **Astro 7**, **Bun**, and **Tailwind v4**. The site is laid out like an editor running in tmux: a window bar on top, sections as panes, a file explorer, and a Neovim statusline — in the **Hell Pine** palette (Rosé Pine Dawn in light mode).

**Live:** [theabx.in](https://theabx.in) · **Version:** 6.0.0

---

## Features

- **Editor / tmux shell** — tmux window bar (`1:work 2:projects …`), sections as panes titled like files (`work.md`, `papers.bib`, `contact.sh`), and a Neovim statusline showing the file in view, its type, and scroll position.
- **Explorer sidebar** — neo-tree style file tree on wide screens; `projects/` expands to the real repos, plus links and `resume.pdf`.
- **Hero** — starship-style prompt, intro, and a fastfetch card (role, company, uptime, stack, papers, status).
- **Boot screen** — a short systemd-style boot log on the first visit. Skips on any key/click, is remembered, never shown with reduced motion. Add `?boot` to replay.
- **Research** — published papers with DOIs, rendered from `resume.json`.
- **GitHub activity** — recent repos as a `git log --graph`, sorted by last push, via the Cloudflare Worker.
- **Contact** — `contact.sh` shown as code next to a terminal "running" it: live IST clock and a `yy` copy-email button.
- **Animated visuals** — small diagrams per project, paper, and the payment pipeline; paused when off-screen and frozen for reduced motion.
- **Resume** — one-page LaTeX resume with an in-page preview (sharp SVG) and PDF download.
- **Light / dark** — system-aware, crossfades via the View Transitions API.
- **SEO** — JSON-LD (Person + ScholarlyArticle), Open Graph, Twitter cards, sitemap.

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | [Astro](https://astro.build) v7 (static, content collections, sitemap) |
| Runtime | [Bun](https://bun.sh) |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 (Vite plugin) + design tokens in `global.css` |
| Typography | Inter + JetBrains Mono, self-hosted via `@fontsource-variable` |
| Resume | LaTeX ([Tectonic](https://tectonic-typesetting.github.io)) + `pdftocairo` for the SVG preview |
| Deploy | GitHub Pages + Cloudflare Workers (API proxy) |
| API | Cloudflare Worker at `api.theabx.in` (GitHub token server-side) |

---

## Quick Start

```sh
bun install        # dependencies
bun run dev        # dev server
bun run build      # production build
bun run preview    # preview the build
```

Other scripts: `bun run lint`, `bun run format`, `bun run typecheck`, `bun test`, `bun run resume`, `bun run deploy`.

---

## Project Structure

```
src/
├── components/
│   ├── layout/            # Section (pane), SiteHeader (tmux bar), Explorer,
│   │                      # StatusLine, BootScreen, SiteFooter (contact.sh)
│   ├── Hero.astro         # prompt + intro | Fastfetch
│   ├── Fastfetch.astro
│   ├── PublicationsSection.astro, PaperVisual.astro
│   ├── ProjectsSection.astro, ProjectCard.astro, ProjectVisual.astro, CodistGraph.astro
│   ├── PaymentFlow.astro  # experience pipeline diagram
│   ├── OpenSourceSection.astro, RepoFeedSkeleton.astro
│   └── ResumeModal.astro
├── config/site.ts         # name, role, links, nav (tmux windows), tech list
├── content.config.ts      # content collection schema
├── data/resume.json       # work, projects, publications, education
├── layouts/BaseLayout.astro
├── lib/                   # repos (git-log feed), experience, link previews
├── pages/                 # index.astro, 404.astro
├── scripts/               # theme, site/nav, repos, reveals, motion, smooth-scroll, resume-modal
└── styles/global.css      # Hell Pine tokens + all component styles
resume/
└── abinash_selvarasu_resume.tex
workers/
└── repos.js               # Cloudflare Worker — proxies the GitHub API
public/
├── abinash_selvarasu_resume.pdf   # built from resume/*.tex
└── resume-preview.svg             # vector preview for the resume modal
```

---

## Customization

### Site config

`src/config/site.ts` holds name, handle, email, role, social links, the tmux windows (`navItems`), and the toolkit list.

### Content

`src/data/resume.json` drives work, projects, publications, and education. Projects keep their order; the first one is featured. Publications need `title`, `authors`, `venue`, `year`, and `doi`.

### Resume PDF

The one-page resume is LaTeX in `resume/abinash_selvarasu_resume.tex`. Rebuild with `bun run resume` (needs `brew install tectonic poppler`): it compiles `public/abinash_selvarasu_resume.pdf` and renders `public/resume-preview.svg` for the in-page preview. Keep the `.tex` in sync with `resume.json`.

### Design tokens

The palette lives at the top of `src/styles/global.css`. Light mode is Rosé Pine Dawn; dark mode is Hell Pine:

```css
html.dark {
  --hp-base: #16181d;   /* panes */
  --hp-mantle: #141416; /* page, bars */
  --hp-text: #e0def4;
  --hp-love: #d16d92;
  --hp-gold: #ca9f7c;
  --hp-rose: #ebbcba;   /* buttons, session label */
  --hp-pine: #5d7e80;
  --hp-foam: #9ccfd8;
  --hp-iris: #c4a7e7;   /* active pane, mode blocks */
}
```

Tailwind utilities map to these via `@theme` (e.g. `text-gruv-text`, `text-hp-love`).

### Panes

Wrap a section in `<Section id="…" file="name.ext">` to get a pane; the `file` shows on its border, in the statusline, and in the explorer.

---

## Deployment

### GitHub Pages + Cloudflare Worker

Repo data comes from the Cloudflare Worker `theabxfolio` at `api.theabx.in`, which proxies the GitHub API and keeps the token server-side.

#### Prerequisites

- Cloudflare account with the `theabx.in` zone
- GitHub token with `public_repo` scope
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

#### Setup

1. **Install:** `bun install`
2. **Local env** (`.env`): `VITE_WORKER_URL=https://api.theabx.in`
3. **Deploy the Worker** (worker `theabxfolio`):
   ```sh
   wrangler login
   wrangler deploy
   echo "<your-github-token>" | wrangler secret put GITHUB_TOKEN
   ```
   > The Worker name in Cloudflare must match `name` in `wrangler.toml`, or CI deploys fail with a route conflict.
4. **GitHub Actions variables/secrets:**
   ```sh
   gh variable set WORKER_URL --body "https://api.theabx.in"
   gh secret set CLOUDFLARE_API_TOKEN --body "<your-cloudflare-token>"
   gh secret set THE_REPO_TOKEN --body "<your-github-token>"
   ```
5. **Push to `master`** — the workflow builds the site, deploys to GitHub Pages, and updates the Worker. It also rebuilds every 6 hours so the experience counters stay current.

---

## Changelog

- **6.0.0** — Hell Pine editor/tmux redesign: window bar, panes, explorer, statusline, fastfetch hero, boot screen, Research section, git-log activity, `contact.sh`, self-hosted fonts. LaTeX resume with in-page preview.
- **5.5.0** — Terminal-first brutalist theme.

---

## License

MIT License.

---

## References

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Rosé Pine](https://rosepinetheme.com/) · [Hell Pine](https://github.com/AbiXnash/hell-pine)
