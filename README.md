# abx@portfolio

A terminal-inspired personal portfolio built to showcase engineering depth,
system thinking, and real-world projects — without noise or gimmicks.

This project is designed to feel like a **tool**, not a marketing site.

---

## Overview

```sh
$ whoami
Abinash S — Software Engineer (Full-Stack · Systems-Focused)
```

This portfolio prioritizes:

- clarity over decoration
- keyboard-first interaction
- inspectable content
- performance and simplicity

It avoids unnecessary animations, trackers, and UI libraries.

---

## Features

```sh
$ features
```

- Terminal-style UI and navigation
- Mobile dock navigation with social quick actions
- Command palette (`/`) with live filtering
- Keyboard-first interactions (↑ ↓ Enter Esc q)
- Inspector-style overlays for deep content
- Execution traces and line-numbered output
- GitHub activity widget with client-side caching and ETag support
- Responsive and accessible by design
- Minimal dependencies, static output

---

## Pages

```sh
$ tree src/pages/
```

- `/` — Home (identity & entry point)
- `/service` — Services & collaboration offerings
- `/resume` — Experience, research, and projects
- `/contact` — Communication & availability

---

## Keyboard Navigation

```sh
/        → open command palette
↑ ↓      → navigate results
enter    → open selection
esc      → close overlays / palette
```

Designed to feel familiar to users of terminals and editors.

---

## Project Structure

```text
src
├── components
│   ├── Contact.astro
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

- Components are intentionally small and reusable
- Pages remain thin and declarative
- Global styles are minimal and terminal-focused

---

## Tech Stack

```sh
$ stack
```

- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Runtime**: Bun
- **Language**: JavaScript (ESM)
- **Output**: Static site

No UI frameworks.
No client-heavy abstractions.

---

## GitHub Activity Caching

The GitHub activity widget fetches recent commits using the GitHub REST API
and applies a local cache (ETag + TTL) in the browser to reduce rate-limit
pressure while keeping the feed fresh.

---

## Commands

All commands are run from the project root.

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `bun install`    | Install dependencies                      |
| `bun dev`        | Start local dev server (`localhost:4321`) |
| `bun run build`  | Build production site to `dist/`          |
| `bun preview`    | Preview production build locally          |
| `bun run format` | Format code using Prettier                |

---

## License

This repository is intended for **personal and professional reference**.

You are welcome to:

- explore the code
- learn from the structure
- adapt ideas for inspiration

Please do not clone or redistribute as-is.

## Contact

```sh
$ contact

visit: https://theabx.in
navigate: /contact
```

→ [Open the portfolio](https://theabx.in) and navigate to [/contact](https://theabx.in/contact) to get in touch.
