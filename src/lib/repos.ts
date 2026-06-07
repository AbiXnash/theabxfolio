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

export function isRecentlyPushed(pushedAt: string, now = new Date()) {
  const days = Math.floor((now.getTime() - new Date(pushedAt).getTime()) / 86400000);
  return days <= 1;
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

function repoCellHtml(r: Repo) {
  const safeName = escapeHtml(r.name);
  const safeDescription = r.description ? escapeHtml(r.description) : "";
  const langColor = getLanguageColor(r.language);
  const safeLanguage = r.language ? escapeHtml(r.language) : "n/a";
  const previewDescription = safeDescription || `Repository on GitHub.`;
  const pushedLabel = formatPushedAt(r.pushedAt);
  const recent = isRecentlyPushed(r.pushedAt);
  const langDot = recent
    ? `<span class="ping-dot ping-dot--lang" aria-hidden="true"><span class="ping-dot-ring"></span><span class="ping-dot-core"></span></span>`
    : `<span class="repo-cell-lang-dot" aria-hidden="true"></span>`;
  const recentClass = recent ? " repo-cell--recent" : "";

  return `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="repo-cell group${recentClass}" data-link-preview data-preview-title="${safeName}" data-preview-description="${previewDescription}" data-preview-domain="github.com" style="--repo-lang:${langColor}">
  <span class="repo-cell-name">${safeName}</span>
  ${safeDescription ? `<span class="repo-cell-desc">${safeDescription}</span>` : `<span class="repo-cell-desc">Public repository on GitHub.</span>`}
  <span class="repo-cell-meta">
    <span class="repo-cell-lang">
      ${langDot}
      <span class="repo-cell-lang-label">${safeLanguage}</span>
    </span>
    <span class="repo-cell-commits">${r.commits} commits</span>
    <time class="repo-cell-time" datetime="${r.pushedAt}">${pushedLabel}</time>
  </span>
</a>`;
}

export function reposFeedHtml(repos: Repo[]) {
  const cells = repos.map((repo) => repoCellHtml(repo)).join("");

  return `<div class="repo-grid" aria-label="GitHub repositories">${cells}</div>`;
}