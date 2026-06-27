import { site } from "../config/site";
import { fetchRepos, reposFeedHtml } from "../lib/repos";

export async function loadRepos() {
  const feed = document.getElementById("repos-feed");
  const error = document.getElementById("repos-error");

  if (!feed) return;

  try {
    const repos = await fetchRepos(site.workerUrl);

    if (repos.length === 0) {
      feed.innerHTML =
        '<p class="py-14 text-center text-sm text-gruv-muted">No public repositories found.</p>';
      return;
    }

    feed.innerHTML = reposFeedHtml(repos);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[repos] client load failed:", message);
    feed.classList.add("hidden");
    error?.classList.remove("hidden");
  }
}

export function setupReposFeed() {
  const section = document.getElementById("opensource");
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      loadRepos().finally(() => {
        document.getElementById("repos-feed")?.removeAttribute("aria-busy");
      });
    },
    { rootMargin: "200px 0px" },
  );

  observer.observe(section);
}

