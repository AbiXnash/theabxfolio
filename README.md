# theabxfolio

Personal portfolio of [Abinash Selvarasu](https://abinash.dev) — Backend Engineer specializing in payments, security, and resilient systems.

Built with [Astro](https://astro.build), featuring a clean terminal-inspired dark theme with orange accents.

---

## Features

- **Clean Dark Theme** — Minimal design with `#0f0f0f` background and `#ff6b35` accent
- **Terminal Aesthetic** — JetBrains Mono font, command-line inspired UI
- **GitHub Activity** — Live commit feed from public GitHub events
- **Responsive** — Optimized for mobile with bottom sheet navigation
- **SEO Optimized** — Full meta tags, Open Graph, Twitter cards, JSON-LD structured data
- **Performance** — Static build, minimal dependencies

---

## Tech Stack

- **Framework:** [Astro](https://astro.build) v5
- **Styling:** CSS with custom properties
- **Font:** [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- **Deploy:** Static site (Vercel, Netlify, GitHub Pages, etc.)

---

## Pages

| Route      | Description                                      |
| ---------- | ------------------------------------------------ |
| `/`        | Home — Hero with GitHub activity and stats       |
| `/resume`  | Experience — Work, projects, research, education |
| `/contact` | Contact — Email CTA and social links             |

---

## Quick Start

```sh
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Contact.astro    # Contact page with social links
│   ├── Footer.astro     # Site footer
│   ├── Header.astro     # Header with mobile bottom sheet nav
│   ├── Hero.astro       # Hero section with GitHub activity
│   └── Resume.astro     # Resume page with collapsible cards
├── layouts/
│   └── BaseLayout.astro # Main layout with SEO/structured data
├── pages/
│   ├── index.astro
│   ├── resume.astro
│   ├── contact.astro
│   └── github-activity.json.ts  # GitHub API endpoint
├── data/
│   └── resume.json      # Resume content
└── styles/
    └── global.css       # CSS variables, global styles
```

---

## Customization

### Personal Info

Update these files to customize:

- **Name/Title:** `src/components/Hero.astro`, `src/components/Footer.astro`
- **Resume Content:** `src/data/resume.json`
- **Social Links:** `src/components/Header.astro`, `src/components/Contact.astro`
- **GitHub Username:** `src/components/Hero.astro` (line 2)

### Design Tokens

All CSS variables are defined in `src/styles/global.css`:

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
  - FAQPage schema

---

## Deployment

### GitHub Pages

1. Push to `master` branch
2. Enable GitHub Pages in repository settings
3. Set source to `master` branch

### Vercel / Netlify

Connect repository and deploy automatically.

---

## License

MIT License — Feel free to use as a template for your own portfolio.

---

## References

- [Astro Documentation](https://docs.astro.build)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- [GitHub REST API](https://docs.github.com/en/rest)
