export const site = {
  name: "Abinash Selvarasu",
  handle: "abx",
  email: "abinash@theabx.in",
  role: "Backend Engineer",
  domain: "https://theabx.in",
  tagline: "Spring Boot · Go · Integration · Systems",
  location: "India",
  focus: "Backend integration & systems",
} as const;

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