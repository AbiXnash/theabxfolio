# theabxfolio

A premium, performance‑focused portfolio built with Qwik City. Designed to feel crisp, minimal, and intentional across desktop and mobile.

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
│   ├── Contact.tsx
│   ├── Dock.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Resume.tsx
│   └── Service.tsx
├── routes
│   ├── contact
│   ├── resume
│   └── service
├── data
│   └── resume.json
└── global.css

src-astro (reference copy of the Astro implementation)
```

---

## GitHub Activity Widget

The activity panel fetches recent commits from public repos using the GitHub REST API and applies:

- ETag caching
- TTL cache (15 minutes)
- Stale‑while‑revalidate fallback for rate‑limit errors

Cache settings live in `src/components/Hero.tsx`.

---

## Configuration

Key files to tweak:

- `src/components/Header.tsx` — desktop header, mobile header
- `src/components/Dock.tsx` — mobile dock + social popover
- `src/components/Hero.tsx` — hero content + GitHub activity widget
- `src/global.css` — tokens, background, global visuals

---

## Deployment

Static output. Deploy anywhere that supports static sites.

---

## References

```text
Qwik City: https://qwik.dev/docs/qwikcity/
Qwik: https://qwik.dev/
Vite: https://vite.dev/
Bun: https://bun.sh
GitHub REST API: https://docs.github.com/en/rest
```

---

## License

Personal portfolio. Please don’t redistribute as‑is.
