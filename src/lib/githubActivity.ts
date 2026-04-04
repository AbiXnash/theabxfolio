const GITHUB_API_BASE = "https://api.github.com";
const REQUEST_TIMEOUT_MS = 4000;
const RECENT_REPO_LIMIT = 6;
let cachedActivity: GitHubActivityResult | null = null;

type GitHubPushEvent = {
  type?: string;
  created_at?: string;
  repo?: {
    name?: string;
  };
  payload?: {
    commits?: Array<{
      sha?: string;
      message?: string;
    }>;
  };
};

type GitHubRepo = {
  full_name?: string;
  html_url?: string;
};

type GitHubCommitResponse = Array<{
  sha?: string;
  commit?: {
    message?: string;
    author?: {
      date?: string;
    };
  };
}>;

export type GitHubActivityItem = {
  date: string;
  htmlUrl: string;
  message: string;
  repoName: string;
  sha: string;
};

export type GitHubActivityResult = {
  items: GitHubActivityItem[];
  source: "public-events" | "repo-fallback" | "none";
  error: "rate-limited" | "request-failed" | null;
};

const token =
  import.meta.env.VITE_GITHUB_TOKEN ||
  import.meta.env.VITE_GH_TOKEN ||
  import.meta.env.GITHUB_TOKEN ||
  import.meta.env.GH_TOKEN;

if (!token) {
  console.warn(
    "[githubActivity] No GitHub token found. Set VITE_GITHUB_TOKEN or GITHUB_TOKEN env var for higher rate limits.",
  );
}

const requestHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "theabxfolio-github-activity",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

const toRepoUrl = (fullName?: string) =>
  fullName ? `https://github.com/${fullName}` : "https://github.com";

async function fetchGithubJson<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${GITHUB_API_BASE}${path}`, {
      headers: requestHeaders,
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(`GitHub API ${response.status}: ${body.slice(0, 200)}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

function isEmptyRepoError(error: unknown) {
  return error instanceof Error && error.message.includes("API 409");
}

function mapPushEventsToActivity(
  events: GitHubPushEvent[],
  limit: number,
): GitHubActivityItem[] {
  return events
    .filter(
      (event) =>
        event.type === "PushEvent" && event.created_at && event.repo?.name,
    )
    .flatMap((event) => {
      const repoName =
        event.repo?.name?.split("/")[1] || event.repo?.name || "Repository";
      const htmlUrl = toRepoUrl(event.repo?.name);
      const date = event.created_at || "";

      return (event.payload?.commits || []).map((commit) => ({
        date,
        htmlUrl,
        message: commit.message || "Commit",
        repoName,
        sha: commit.sha || "",
      }));
    })
    .filter((commit) => commit.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

async function fetchFromPublicEvents(
  username: string,
  limit: number,
): Promise<GitHubActivityItem[]> {
  const events = await fetchGithubJson<GitHubPushEvent[]>(
    `/users/${username}/events/public?per_page=100`,
  );
  return mapPushEventsToActivity(events, limit);
}

async function fetchFromRecentRepos(
  username: string,
  limit: number,
): Promise<GitHubActivityItem[]> {
  const repos = await fetchGithubJson<GitHubRepo[]>(
    `/users/${username}/repos?sort=pushed&per_page=${RECENT_REPO_LIMIT}`,
  );

  const commitsByRepo = await Promise.all(
    repos
      .filter((repo) => repo.full_name)
      .map(async (repo) => {
        try {
          const commits = await fetchGithubJson<GitHubCommitResponse>(
            `/repos/${repo.full_name}/commits?per_page=1`,
          );
          const latest = commits[0];
          if (!latest?.commit?.author?.date) {
            return null;
          }

          return {
            date: latest.commit.author.date,
            htmlUrl: repo.html_url || toRepoUrl(repo.full_name),
            message: latest.commit.message || "Commit",
            repoName:
              repo.full_name?.split("/")[1] || repo.full_name || "Repository",
            sha: latest.sha || "",
          } satisfies GitHubActivityItem;
        } catch (error) {
          if (!isEmptyRepoError(error)) {
            console.warn(
              `[githubActivity] repo fallback failed for ${repo.full_name}`,
              error,
            );
          }
          return null;
        }
      }),
  );

  return commitsByRepo
    .filter((item): item is GitHubActivityItem => Boolean(item))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

const isRateLimitError = (error: unknown) =>
  error instanceof Error &&
  error.message.includes("API 403") &&
  error.message.includes("rate limit");

export async function getRecentGithubActivity(
  username: string,
  limit = 5,
): Promise<GitHubActivityResult> {
  try {
    const fromEvents = await fetchFromPublicEvents(username, limit);
    if (fromEvents.length) {
      cachedActivity = {
        items: fromEvents,
        source: "public-events",
        error: null,
      };
      return cachedActivity;
    }
    console.warn(
      `[githubActivity] no push events returned for ${username}, trying repo fallback`,
    );
  } catch (error) {
    console.warn(
      `[githubActivity] public events fetch failed for ${username}`,
      error,
    );
    if (isRateLimitError(error)) {
      console.warn(
        `[githubActivity] Rate limited. ${cachedActivity ? "Using cached activity." : "No cached activity available."}`,
      );
      if (cachedActivity) {
        return { ...cachedActivity, error: "rate-limited" };
      }
      try {
        const items = await fetchFromRecentRepos(username, limit);
        if (items.length) {
          cachedActivity = { items, source: "repo-fallback", error: null };
          return cachedActivity;
        }
      } catch (fallbackError) {
        console.error(
          `[githubActivity] all GitHub activity fetches failed for ${username}`,
          fallbackError,
        );
      }

      return { items: [], source: "none", error: "rate-limited" };
    }
  }

  try {
    const items = await fetchFromRecentRepos(username, limit);
    cachedActivity = {
      items,
      source: items.length ? "repo-fallback" : "none",
      error: items.length ? null : "request-failed",
    };
    return cachedActivity;
  } catch (error) {
    console.error(
      `[githubActivity] all GitHub activity fetches failed for ${username}`,
      error,
    );
    return {
      items: [],
      source: "none",
      error: isRateLimitError(error) ? "rate-limited" : "request-failed",
    };
  }
}
