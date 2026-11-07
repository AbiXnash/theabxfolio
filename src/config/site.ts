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

export const techKinds: Record<string, string> = {
  Java: "language",
  Kafka: "messaging",
  "Oracle DB": "database",
  PostgreSQL: "database",
  Python: "language",
  TypeScript: "language",
  Docker: "containers",
  Kotlin: "language",
};

export const technologies = [
  "Spring Boot",
  "Golang",
  "Java",
  "Kafka",
  "Oracle DB",
  "PostgreSQL",
  "Python",
  "TypeScript",
  "Docker",
  "Kotlin",
] as const;