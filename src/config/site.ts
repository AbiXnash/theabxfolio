export const site = {
  name: "Abinash Selvarasu",
  handle: "abx",
  email: "abinash@theabx.in",
  role: "Backend Engineer",
  employer: "Mindgate Solutions",
  employerUrl: "https://www.mindgate.solutions/",
  domain: "https://theabx.in",
  workerUrl: "https://api.theabx.in",
  description:
    "Backend engineer focused on integration and systems with Spring Boot and Go.",
  tagline: "Spring Boot · Go · Integration · Systems",
  location: "India",
  focus: "Backend integration & systems",
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
    href: "/#opensource",
    label: "Activity",
    sectionId: "opensource",
    sectionName: "Open Source",
  },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/AbiXnash" },
  { label: "LinkedIn", href: "https://linkedin.com/in/abinash-selvarasu" },
] as const;

export const technologies = [
  "Spring Boot",
  "Golang",
  "Java",
  "Lua",
  "React",
  "Svelte",
  "Angular",
  "Kotlin",
  "TypeScript",
  "Rust",
] as const;