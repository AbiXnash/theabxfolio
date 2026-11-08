export const site = {
  name: "Abinash Selvarasu",
  handle: "abx.engg",
  email: "abinash@theabx.in",
  role: "Software Engineer",
  employer: "Mindgate Solutions",
  employerUrl: "https://www.mindgate.solutions/",
  domain: "https://theabx.in",
  workerUrl: "https://api.theabx.in",
  description:
    "Backend engineer focused on integration and systems with Spring Boot and Go.",
  tagline: "Spring Boot · Go · Integration · Systems",
  location: "Chennai, India",
  focus: "Backend integration & systems",
  resumeFileName: "abinash_selvarasu_resume.pdf",
  resumeUrl: "/abinash_selvarasu_resume.pdf",
  resumePreviewUrl: "/resume-preview.svg",
} as const;

export const sameAs = [
  "https://github.com/AbiXnash",
  "https://linkedin.com/in/abinash-selvarasu",
  "https://instagram.com/abx.engg",
] as const;

export const navItems = [
  {
    href: "/#experience",
    label: "Work",
    sectionId: "experience",
    sectionName: "Work",
  },
  {
    href: "/#projects",
    label: "Projects",
    sectionId: "projects",
    sectionName: "Projects",
  },
  {
    href: "/#publications",
    label: "Research",
    sectionId: "publications",
    sectionName: "Research",
  },
  {
    href: "/#opensource",
    label: "Activity",
    sectionId: "opensource",
    sectionName: "Open Source",
  },
  {
    href: "/#contact",
    label: "Contact",
    sectionId: "contact",
    sectionName: "Contact",
  },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/AbiXnash", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/abinash-selvarasu",
    icon: "linkedin",
  },
] as const;

// Rendered as stack.toml: one table per area, `core` = daily drivers, `also` = used in real work.
export const stack: { table: string; core: string[]; also: string[] }[] = [
  {
    table: "languages",
    core: ["Java", "Python", "Go"],
    also: ["TypeScript", "Kotlin", "SQL", "Lua"],
  },
  {
    table: "backend",
    core: ["Spring Boot", "Spring Batch", "Microservices"],
    also: ["Spring MVC", "REST APIs", "Gin", "Echo"],
  },
  {
    table: "data",
    core: ["Kafka", "Oracle DB", "PostgreSQL"],
    also: ["IBM WebSphere MQ", "libSQL"],
  },
  {
    table: "frontend",
    core: ["Svelte", "React"],
    also: ["Next.js", "Qwik", "Tailwind CSS"],
  },
  {
    table: "tools",
    core: ["Git", "Docker", "Linux", "Neovim"],
    also: ["Cloudflare Workers", "Bun"],
  },
];

export const technologies = stack.flatMap((t) => [...t.core, ...t.also]);