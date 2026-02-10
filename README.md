# theabxfolio

A premium, performance‑focused portfolio built with Astro. Designed to feel crisp, minimal, and intentional across desktop and mobile.

---

## Highlights

- Premium dark UI with glass surfaces and motion restraint
- Desktop header with centered navigation + page context
- Mobile dock with social popover and magnify effect
- GitHub activity widget with client‑side cache + ETag
- Static build, minimal dependencies

---

## Quick Start

```sh
bun install
bun dev
```

Build and preview:

```sh
bun run build
bun preview
```

---

## Pages

- `/` — Home
- `/service` — Services
- `/resume` — Resume
- `/contact` — Contact

---

## Architecture

```text
src
├── components
│   ├── Contact.astro
│   ├── Dock.astro
│   ├── Footer.astro
│   ├── Header.astro
│   ├── Hero.astro
│   ├── Resume.astro
│   └── Service.astro
├── layouts
│   └── BaseLayout.astro
├── pages
│   ├── contact.astro
│   ├── index.astro
│   ├── resume.astro
│   └── service.astro
└── styles
    └── global.css
```

---

## GitHub Activity Widget

The activity panel fetches recent commits from public repos using the GitHub REST API and applies:

- ETag caching
- TTL cache (15 minutes)
- Stale‑while‑revalidate fallback for rate‑limit errors

Cache settings live in `src/components/Hero.astro`.

---

## Configuration

Key files to tweak:

- `src/components/Header.astro` — desktop header, mobile header
- `src/components/Dock.astro` — mobile dock + social popover
- `src/components/Hero.astro` — hero content + GitHub activity widget
- `src/styles/global.css` — tokens, background, global visuals

---

## Deployment

Static output. Deploy anywhere that supports static sites.

---

## References

```text
Astro: https://astro.build
Bun: https://bun.sh
GitHub REST API: https://docs.github.com/en/rest
```

---

## License

Personal portfolio. Please don’t redistribute as‑is.
