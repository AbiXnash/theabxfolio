/**
 * GitHub API Client Module
 *
 * Handles all HTTP communication with GitHub API.
 * Following Single Responsibility Principle (SRP) - only API communication.
 * Includes request timeout, retry logic, and error handling.
 *
 * @module github/api-client
 */

import type { GitHubPushEvent, GitHubRepo, GitHubCommit } from "./types";
import { getGitHubToken, getGitHubConfig } from "./config";

/**
 * GitHub API error class
 */
export class GitHubApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public isRateLimited: boolean = false,
  ) {
    super(message);
    this.name = "GitHubApiError";
  }
}

/**
 * Creates request headers for GitHub API
 *
 * @returns Headers object with authentication
 */
function createRequestHeaders(): HeadersInit {
  const config = getGitHubConfig();
  const token = getGitHubToken();

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": config.apiVersion,
    "User-Agent": config.userAgent,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Check if error is a rate limit error
 *
 * @param error - Error to check
 * @returns True if rate limited
 */
function isRateLimitError(error: unknown): boolean {
  if (error instanceof GitHubApiError) {
    return error.isRateLimited;
  }
  return false;
}

/**
 * Check if error is an empty repository error (409)
 *
 * @param error - Error to check
 * @returns True if empty repo
 */
function isEmptyRepoError(error: unknown): boolean {
  if (error instanceof GitHubApiError) {
    return error.statusCode === 409;
  }
  return false;
}

/**
 * Fetch JSON from GitHub API with timeout
 *
 * @template T - Response type
 * @param path - API endpoint path
 * @returns Parsed response
 * @throws GitHubApiError on API error
 */
export async function fetchGitHubJson<T>(path: string): Promise<T> {
  const config = getGitHubConfig();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.requestTimeout);

  try {
    const response = await fetch(`${config.baseUrl}${path}`, {
      headers: createRequestHeaders(),
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      const isRateLimited =
        response.status === 403 && body.includes("rate limit");

      throw new GitHubApiError(
        `GitHub API ${response.status}: ${body.slice(0, 200)}`,
        response.status,
        isRateLimited,
      );
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetch public events for a user
 *
 * @param username - GitHub username
 * @param perPage - Number of events to fetch
 * @returns Array of push events
 */
export async function fetchUserPublicEvents(
  username: string,
  perPage: number = 100,
): Promise<GitHubPushEvent[]> {
  return fetchGitHubJson<GitHubPushEvent[]>(
    `/users/${username}/events/public?per_page=${perPage}`,
  );
}

/**
 * Fetch user's recent repositories
 *
 * @param username - GitHub username
 * @param perPage - Number of repos to fetch
 * @returns Array of repositories
 */
export async function fetchUserRepositories(
  username: string,
  perPage: number = 6,
): Promise<GitHubRepo[]> {
  return fetchGitHubJson<GitHubRepo[]>(
    `/users/${username}/repos?sort=pushed&per_page=${perPage}`,
  );
}

/**
 * Fetch latest commit from a repository
 *
 * @param owner - Repository owner
 * @param repo - Repository name
 * @returns Array of commits (first is latest)
 */
export async function fetchRepositoryCommits(
  owner: string,
  repo: string,
): Promise<GitHubCommit[]> {
  return fetchGitHubJson<GitHubCommit[]>(
    `/repos/${owner}/${repo}/commits?per_page=1`,
  );
}

/**
 * Check if a GitHub token is available and valid
 *
 * @returns True if token is set
 */
export function hasGitHubToken(): boolean {
  const token = getGitHubToken();
  return token !== undefined && token.length > 0;
}

export { isRateLimitError, isEmptyRepoError };
