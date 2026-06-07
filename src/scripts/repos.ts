const LANGUAGE_COLORS: Record<string, string> = {
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

function getLanguageColor(lang?: string | null) {
  return LANGUAGE_COLORS[lang ?? ""] ?? "#86868b";
}

function timeAgo(pushedAt: string) {
  const days = Math.floor(
    (Date.now() - new Date(pushedAt).getTime()) / 86400000,
  );
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

interface Repo {
  url: string;
  name: string;
  language?: string | null;
  description?: string | null;
  commits: number;
  pushedAt: string;
}

function repoToCard(r: Repo) {
  const langColor = getLanguageColor(r.language);
  const ago = timeAgo(r.pushedAt);

  return `<a href="${r.url}" target="_blank" class="tile-card group flex h-full min-h-[240px] flex-col gap-4 rounded-[1.75rem] p-6 sm:min-h-[260px] sm:p-8">
  <div class="flex items-center justify-between gap-4">
    ${
      r.language
        ? `<span class="flex items-center gap-2 text-xs text-gruv-muted">
      <span class="h-1.5 w-1.5 rounded-full" style="background-color:${langColor}"></span>
      ${r.language}
    </span>`
        : `<span class="text-xs text-gruv-muted">Repository</span>`
    }
    <svg class="ml-auto shrink-0 text-gruv-muted opacity-0 transition-opacity group-hover:opacity-100" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  </div>
  <h4 class="text-xl font-semibold tracking-tight">${r.name}</h4>
  ${r.description ? `<p class="line-clamp-2 flex-1 text-sm leading-relaxed text-gruv-muted">${r.description}</p>` : ""}
  <div class="mt-auto flex items-center gap-3 text-xs text-gruv-muted">
    <span>${r.commits} commits</span>
    <span class="text-gruv-border/60">·</span>
    <span>${ago}</span>
  </div>
</a>`;
}

export async function loadRepos() {
  const container = document.getElementById("repos-container");
  const loading = document.getElementById("repos-loading");
  if (!container || !loading) return;

  const workerUrl = import.meta.env.VITE_WORKER_URL || "";

  if (!workerUrl) {
    loading.innerHTML =
      '<p class="text-sm text-gruv-muted">Repositories unavailable.</p>';
    return;
  }

  try {
    const res = await fetch(workerUrl, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Worker responded with ${res.status}`);
    const repos = (await res.json()) as Repo[];

    if (!Array.isArray(repos) || repos.length === 0) {
      loading.innerHTML =
        '<p class="text-sm text-gruv-muted">No public repositories found.</p>';
      return;
    }

    loading.remove();
    container.innerHTML = repos.map(repoToCard).join("");
  } catch {
    loading.innerHTML =
      '<p class="text-sm text-gruv-muted">Failed to load repositories.</p>';
  }
}