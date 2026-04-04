# theabxfolio

Personal portfolio of [Abinash Selvarasu](https://theabx.in) — Backend Engineer specializing in payments, security, and resilient systems.

Built with [Astro](https://astro.build), featuring a clean terminal-inspired dark theme with orange accents.

---

## Features

- **Clean Dark Theme** — Minimal design with `#0f0f0f` background and `#ff6b35` accent
- **Terminal Aesthetic** — JetBrains Mono font, command-line inspired UI
- **GitHub Activity** — Live commit feed from public GitHub events (client-side)
- **Responsive** — Optimized for mobile with bottom sheet navigation
- **SEO Optimized** — Full meta tags, Open Graph, Twitter cards, JSON-LD structured data
- **Performance** — Static build, minimal dependencies
- **Tested** — Unit tests with Bun

---

## Tech Stack

- **Framework:** [Astro](https://astro.build) v6
- **Styling:** CSS with custom properties
- **Font:** [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- **Deploy:** GitHub Pages (static)

---

## Quick Start

```sh
# Install dependencies
bun install

# Development server
bun run dev

# Run tests
bun test

# Production build
bun run build

# Preview production build
bun run preview
```

---

## GitHub Activity

The GitHub activity section fetches commits client-side. For higher API rate limits:

### Local Development

Create `.env` file:

```sh
VITE_THE_REPO_TOKEN=ghp_your_github_token
```

### Production (GitHub Pages)

Add `VITE_THE_REPO_TOKEN` secret in repo Settings → Secrets and variables → Actions.

Get token: https://github.com/settings/tokens (classic, repo scope)

---

## Project Structure

```
src/
├── components/
│   ├── Contact.astro    # Contact page with social links
│   ├── Footer.astro     # Site footer
│   ├── Header.astro     # Header with mobile bottom sheet nav
│   ├── Hero.astro       # Hero section with GitHub activity
│   └── Resume.astro     # Resume page
├── layouts/
│   └── BaseLayout.astro # Main layout with SEO/structured data
├── lib/github/          # GitHub activity module (SOLID architecture)
│   ├── activity-service.ts
│   ├── api-client.ts
│   ├── cache.ts
│   ├── config.ts
│   ├── index.ts
│   ├── mapper.ts
│   ├── types.ts
│   └── ui.ts
├── pages/
│   ├── index.astro
│   ├── resume.astro
│   ├── contact.astro
│   └── github-activity.json.ts  # Static JSON endpoint
├── data/
│   └── resume.json      # Resume content
└── styles/
    └── global.css       # CSS variables, global styles
```

---

## Customization

### Personal Info

- **Name/Title:** `src/components/Hero.astro`, `src/components/Footer.astro`
- **Resume Content:** `src/data/resume.json`
- **Social Links:** `src/components/Header.astro`, `src/components/Contact.astro`
- **GitHub Username:** `src/components/Hero.astro` (const USERNAME)

### Design Tokens

All CSS variables in `src/styles/global.css`:

```css
:root {
  --bg: #0f0f0f;
  --accent: #ff6b35;
  --text: #ffffff;
  --border: #1a1a1a;
}
```

### Colors

| Variable         | Value     | Usage                    |
| ---------------- | --------- | ------------------------ |
| `--bg`           | `#0f0f0f` | Background               |
| `--bg-elevated`  | `#141414` | Cards, elevated surfaces |
| `--accent`       | `#ff6b35` | Primary accent (orange)  |
| `--accent-hover` | `#ff8c5a` | Accent hover state       |
| `--text`         | `#ffffff` | Primary text             |
| `--text-muted`   | `#888888` | Secondary text           |
| `--border`       | `#1a1a1a` | Borders                  |

---

## SEO & Structured Data

The site includes comprehensive SEO optimization:

- Meta tags (title, description, robots)
- Open Graph and Twitter Card tags
- JSON-LD structured data:
  - Person schema
  - Website schema
  - BreadcrumbList schema

---

## Deployment

### GitHub Pages

1. Push to `master` branch
2. Enable GitHub Pages in repository settings
3. Set source to `master` branch
4. Add `VITE_THE_REPO_TOKEN` secret for GitHub API rate limits

The site auto-deploys on push (via GitHub Actions).

---

## Testing

```sh
bun test          # Run all tests
bun test --watch # Watch mode
```

Tests are in `tests/` directory.

---

## License

MIT License — Feel free to use as a template for your own portfolio.

---

## References

- [Astro Documentation](https://docs.astro.build)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- [GitHub REST API](https://docs.github.com/en/rest)
