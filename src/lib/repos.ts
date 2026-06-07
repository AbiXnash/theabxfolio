export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00add8",
  Kotlin: "#a97bff",
  Java: "#b07219",
  Lua: "#6574cd",
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

export function formatPushedAt(pushedAt: string) {
  const date = new Date(pushedAt);
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);

  if (days === 0) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  if (days === 1) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function repoTagItemHtml(r: Repo) {
  const safeName = escapeHtml(r.name);
  const safeDescription = r.description ? escapeHtml(r.description) : "";
  const langColor = getLanguageColor(r.language);
  const safeLanguage = r.language ? escapeHtml(r.language) : "n/a";

  return `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="repo-tag-item group" style="--repo-lang:${langColor}">
  <div class="repo-tag-head">
    <span class="repo-tag-label">Repository</span>
    <span class="repo-tag-name">${safeName}</span>
  </div>
  ${safeDescription ? `<span class="repo-tag-desc">${safeDescription}</span>` : ""}
  <div class="repo-tag-chips">
    <span class="repo-chip repo-chip-lang">${safeLanguage}</span>
    <span class="repo-chip repo-chip-mono">${r.commits} commits</span>
    <time class="repo-chip repo-chip-time" datetime="${r.pushedAt}">${formatPushedAt(r.pushedAt)}</time>
  </div>
</a>`;
}

export function reposFeedHtml(repos: Repo[]) {
  const items = repos.map((repo) => repoTagItemHtml(repo)).join("");

  return `<div class="repo-tag-board">${items}</div>`;
}