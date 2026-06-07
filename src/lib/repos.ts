export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00add8",
  Kotlin: "#a97bff",
  Java: "#b07219",
  Lua: "#000080",
  Rust: "#dea584",
  Python: "#3572a5",
  "Emacs Lisp": "#c065db",
  Astro: "#ff5a03",
  Zig: "#ec915c",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export interface Repo {
  url: string;
  name: string;
  language?: string | null;
  description?: string | null;
  commits: number;
  pushedAt: string;
}

export function getLanguageColor(lang?: string | null) {
  return LANGUAGE_COLORS[lang ?? ""] ?? "#86868b";
}

export function timeAgo(pushedAt: string) {
  const days = Math.floor(
    (Date.now() - new Date(pushedAt).getTime()) / 86400000,
  );
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export async function fetchRepos(workerUrl: string): Promise<Repo[]> {
  const res = await fetch(workerUrl, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`Worker responded with ${res.status}`);
  }

  const repos = (await res.json()) as Repo[];
  if (!Array.isArray(repos)) {
    throw new Error("Worker returned invalid data");
  }

  return repos;
}