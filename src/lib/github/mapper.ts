/**
 * GitHub Activity Mapper Module
 *
 * Transforms raw GitHub API responses into application-specific models.
 * Following Single Responsibility Principle (SRP) - only data transformation.
 *
 * @module github/mapper
 */

import type {
  GitHubPushEvent,
  GitHubRepo,
  GitHubCommit,
  CommitData,
} from "./types";

/**
 * Default GitHub base URL
 */
const GITHUB_BASE_URL = "https://github.com";

/**
 * Convert repository full name to URL
 *
 * @param fullName - Repository full name (owner/repo)
 * @returns Repository URL
 */
export function toRepoUrl(fullName?: string): string {
  return fullName ? `${GITHUB_BASE_URL}/${fullName}` : GITHUB_BASE_URL;
}

/**
 * Extract repository name from full name
 *
 * @param fullName - Repository full name
 * @returns Repository name only
 */
export function extractRepoName(fullName?: string): string {
  if (!fullName) return "Repository";
  return fullName.split("/")[1] || fullName;
}

/**
 * Map a single push event to activity items
 *
 * @param event - GitHub push event
 * @returns Array of commit data (usually one)
 */
function mapEventToCommits(event: GitHubPushEvent): CommitData[] {
  const repoName = extractRepoName(event.repo?.name);
  const htmlUrl = toRepoUrl(event.repo?.name);
  const date = event.created_at || "";

  return (event.payload?.commits || []).map((commit) => ({
    date,
    htmlUrl,
    message: commit.message || "Commit",
    repoName,
    sha: commit.sha || "",
  }));
}

/**
 * Map GitHub push events to activity items
 *
 * @param events - Array of GitHub push events
 * @param limit - Maximum number of items to return
 * @returns Sorted and limited commit data
 */
export function mapPushEventsToActivity(
  events: GitHubPushEvent[],
  limit: number,
): CommitData[] {
  return events
    .filter(
      (event) =>
        event.type === "PushEvent" && event.created_at && event.repo?.name,
    )
    .flatMap(mapEventToCommits)
    .filter((commit) => commit.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * Map a repository to its latest commit
 *
 * @param repo - GitHub repository
 * @param commit - Latest commit
 * @returns Commit data or null if invalid
 */
export function mapRepoToCommit(
  repo: GitHubRepo,
  commit: GitHubCommit,
): CommitData | null {
  if (!commit.commit?.author?.date) {
    return null;
  }

  return {
    date: commit.commit.author.date,
    htmlUrl: repo.html_url || toRepoUrl(repo.full_name),
    message: commit.commit.message || "Commit",
    repoName: extractRepoName(repo.full_name),
    sha: commit.sha || "",
  };
}

/**
 * Map multiple repositories to their latest commits
 *
 * @param repos - Array of repositories with their commits
 * @param limit - Maximum number of items to return
 * @returns Sorted and limited commit data
 */
export function mapReposToActivity(
  repos: Array<{ repo: GitHubRepo; commit: GitHubCommit | null }>,
  limit: number,
): CommitData[] {
  return repos
    .filter(
      (item): item is { repo: GitHubRepo; commit: GitHubCommit } =>
        item.commit !== null,
    )
    .map(({ repo, commit }) => mapRepoToCommit(repo, commit))
    .filter((item): item is CommitData => item !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * Count commits per repository
 *
 * @param commits - Array of commit data
 * @returns Map of repo name to commit count
 */
export function countCommitsPerRepo(
  commits: CommitData[],
): Map<string, number> {
  const counts = new Map<string, number>();

  for (const commit of commits) {
    const count = counts.get(commit.repoName) || 0;
    counts.set(commit.repoName, count + 1);
  }

  return counts;
}

/**
 * Filter commits by date range
 *
 * @param commits - Array of commit data
 * @param since - Start date
 * @param until - End date
 * @returns Filtered commits
 */
export function filterCommitsByDateRange(
  commits: CommitData[],
  since?: Date,
  until?: Date,
): CommitData[] {
  return commits.filter((commit) => {
    const commitDate = new Date(commit.date);
    const afterSince = !since || commitDate >= since;
    const beforeUntil = !until || commitDate <= until;
    return afterSince && beforeUntil;
  });
}
