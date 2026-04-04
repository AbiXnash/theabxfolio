/**
 * GitHub Activity UI Module - Client Side
 *
 * Handles client-side rendering of GitHub activity in the Hero component.
 * Includes caching, error handling, and optimized rendering.
 * Following Single Responsibility Principle (SRP) - only UI logic.
 *
 * @module github/ui
 */

import type { CommitData, GitHubActivityResult } from "./types";
import { fetchUserPublicEvents } from "./api-client";
import { mapPushEventsToActivity } from "./mapper";
import { getClientCachedActivity, setClientCachedActivity } from "./cache";
import { getGitHubToken } from "./config";

/**
 * GitHub API configuration
 */
const GITHUB_API_BASE = "https://api.github.com";
const DEFAULT_USERNAME = "AbiXnash";
const COMMIT_LIMIT = 5;
const CACHE_TTL_MS = 60 * 1000; // 1 minute

/**
 * Escape HTML special characters for safe rendering
 *
 * @param value - String to escape
 * @returns Escaped string
 */
function escapeHtml(value: string): string {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] || char,
  );
}

/**
 * Format a date string to relative time
 *
 * @param isoDate - ISO date string
 * @returns Formatted relative time string
 */
function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Render a single commit item as HTML
 *
 * @param commit - Commit data
 * @returns HTML string for the commit
 */
function renderCommitItem(commit: CommitData): string {
  return `
    <a href="${escapeHtml(commit.htmlUrl)}" target="_blank" rel="noreferrer" class="commit-item">
      <div class="commit-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="4"/>
          <line x1="1.05" y1="12" x2="7" y2="12"/>
          <line x1="17.01" y1="12" x2="22.96" y2="12"/>
        </svg>
      </div>
      <div class="commit-content">
        <div class="commit-message">${escapeHtml(commit.message)}</div>
        <div class="commit-meta">
          <span class="commit-sha">${escapeHtml(commit.sha?.slice(0, 7) || "")}</span>
          <span class="commit-repo">${escapeHtml(commit.repoName)}</span>
          <span class="commit-time">${formatRelativeTime(commit.date)}</span>
        </div>
      </div>
    </a>
  `;
}

/**
 * Render the empty state when no commits found
 *
 * @returns HTML string for empty state
 */
function renderEmptyState(): string {
  return `
    <div class="repo-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
      <span>no commits found</span>
    </div>
  `;
}

/**
 * Render error state
 *
 * @returns HTML string for error state
 */
function renderErrorState(): string {
  return `
    <div class="repo-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>failed to load</span>
    </div>
  `;
}

/**
 * Render activity commits to the DOM
 *
 * @param commits - Array of commit data
 * @param repoListEl - DOM element to render into
 * @param commitsCountEl - DOM element for commit count
 */
export function renderActivity(
  commits: CommitData[],
  repoListEl: Element | null,
  commitsCountEl: Element | null,
): void {
  if (!repoListEl) return;

  if (!commits.length) {
    repoListEl.innerHTML = renderEmptyState();
    if (commitsCountEl) commitsCountEl.textContent = "0";
    return;
  }

  if (commitsCountEl) {
    commitsCountEl.textContent = commits.length.toString();
  }

  const commitsHtml = commits
    .slice(0, COMMIT_LIMIT)
    .map(renderCommitItem)
    .join("");
  repoListEl.innerHTML = commitsHtml;
}

/**
 * Fetch GitHub activity from API
 *
 * @param username - GitHub username
 * @returns Array of commit data
 */
async function fetchActivity(username: string): Promise<CommitData[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const token = getGitHubToken();
  if (token && token.startsWith("ghp_")) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/events/public?per_page=100`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}`);
  }

  const events = await response.json();
  return mapPushEventsToActivity(events, COMMIT_LIMIT);
}

/**
 * Initialize GitHub activity UI
 *
 * Sets up the activity card with caching and auto-refresh
 *
 * @param shellSelector - Selector for the activity shell element
 */
export function initializeGitHubActivity(
  shellSelector: string = "[data-activity-shell]",
): void {
  const shell = document.querySelector(shellSelector);
  if (!shell) return;

  const repoList = shell.querySelector("#repoList");
  const commitsCount = shell.querySelector("#commitsCount");
  if (!repoList) return;

  // Mark shell as ready for CSS transitions
  shell.classList.add("is-ready");

  // Try to render cached data immediately
  const cached = getClientCachedActivity();
  if (cached?.items) {
    renderActivity(cached.items, repoList, commitsCount);
    // Refresh in background
    fetchActivity(DEFAULT_USERNAME)
      .then((commits) => {
        setClientCachedActivity({
          items: commits,
          source: "public-events",
          error: null,
        });
        renderActivity(commits, repoList, commitsCount);
      })
      .catch(() => {
        // Silently fail - already showing cached data
      });
  } else {
    // No cache, fetch fresh data
    fetchActivity(DEFAULT_USERNAME)
      .then((commits) => {
        setClientCachedActivity({
          items: commits,
          source: "public-events",
          error: null,
        });
        renderActivity(commits, repoList, commitsCount);
      })
      .catch(() => {
        repoList.innerHTML = renderErrorState();
      });
  }
}

/**
 * Manually refresh GitHub activity
 *
 * @returns Promise that resolves when refresh completes
 */
export async function refreshActivity(): Promise<CommitData[]> {
  const commits = await fetchActivity(DEFAULT_USERNAME);
  setClientCachedActivity({
    items: commits,
    source: "public-events",
    error: null,
  });
  return commits;
}
