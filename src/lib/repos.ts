// Mapped onto the Hell Pine palette so the activity feed matches the site.
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "var(--hp-foam)",
  JavaScript: "var(--hp-gold)",
  Go: "var(--hp-foam)",
  Kotlin: "var(--hp-iris)",
  Java: "var(--hp-gold)",
  Lua: "var(--hp-iris)",
  Rust: "var(--hp-rose)",
  Python: "var(--hp-pine)",
  "Emacs Lisp": "var(--hp-iris)",
  Astro: "var(--hp-love)",
  Zig: "var(--hp-gold)",
  Shell: "var(--hp-pine)",
  HTML: "var(--hp-love)",
  CSS: "var(--hp-iris)",
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
  return LANGUAGE_COLORS[lang ?? ""] ?? "var(--hp-subtle)";
}

export function isRecentlyPushed(pushedAt: string, now = new Date()) {
  const days = Math.floor(
    (now.getTime() - new Date(pushedAt).getTime()) / 86400000,
  );
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

export function formatRelative(pushedAt: string, now = Date.now()) {
  const diff = Math.max(0, now - new Date(pushedAt).getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatPushedAt(pushedAt);
}

function repoRowHtml(r: Repo, index: number) {
  const safeName = escapeHtml(r.name);
  const safeDescription = r.description ? escapeHtml(r.description) : "";
  const langColor = getLanguageColor(r.language);
  const safeLanguage = r.language ? escapeHtml(r.language) : "text";
  const previewDescription = safeDescription || `Repository on GitHub.`;
  const recent = isRecentlyPushed(r.pushedAt);
  const ref =
    index === 0
      ? `<span class="glog-ref">(HEAD → main)</span>`
      : recent
        ? `<span class="glog-ref glog-ref--recent">(today)</span>`
        : "";

  return `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="glog-row${recent ? " glog-row--recent" : ""}" data-link-preview data-preview-title="${safeName}" data-preview-description="${previewDescription}" data-preview-domain="github.com" style="--repo-lang:${langColor}">
  <span class="glog-graph" aria-hidden="true"><span class="glog-node"></span></span>
  <span class="glog-head"><span class="glog-name">${safeName}</span>${ref}</span>
  <span class="glog-desc">${safeDescription || "Public repository on GitHub."}</span>
  <span class="glog-meta">
    <span class="glog-lang"><i aria-hidden="true"></i>${safeLanguage}</span>
    <span class="glog-commits">${r.commits} commits</span>
    <time class="glog-time" datetime="${r.pushedAt}" title="${escapeHtml(new Date(r.pushedAt).toUTCString())}">${formatRelative(r.pushedAt)}</time>
  </span>
</a>`;
}

export function reposFeedHtml(input: Repo[]) {
  // The worker sorts by "updated"; order by last push so HEAD is the real latest.
  const repos = [...input].sort(
    (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime(),
  );
  const rows = repos.map((repo, i) => repoRowHtml(repo, i)).join("");
  const total = repos.reduce((sum, r) => sum + (Number(r.commits) || 0), 0);
  const latest = repos[0]?.pushedAt ? formatRelative(repos[0].pushedAt) : "";

  return `<div class="glog" aria-label="Recently pushed GitHub repositories">
  <div class="glog-rows">${rows}</div>
  <p class="glog-summary"><span>${repos.length} repos</span><span>·</span><span>${total} commits</span>${latest ? `<span>·</span><span>last push <b>${latest}</b></span>` : ""}</p>
</div>`;
}
