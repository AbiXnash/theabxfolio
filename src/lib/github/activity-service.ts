/**
 * GitHub Activity Service Module
 *
 * Main service for fetching and managing GitHub activity.
 * Following Single Responsibility Principle (SRP) - orchestrates activity fetching.
 * Uses Open/Closed Principle (OCP) - open for extension, closed for modification.
 *
 * @module github/activity-service
 */

import type {
  CommitData,
  GitHubActivityResult,
  ActivitySource,
  ActivityError,
} from "./types";
import {
  fetchUserPublicEvents,
  fetchUserRepositories,
  fetchRepositoryCommits,
  GitHubApiError,
  isRateLimitError,
  isEmptyRepoError,
} from "./api-client";
import { mapPushEventsToActivity, mapReposToActivity } from "./mapper";
import {
  getCachedActivity,
  setCachedActivity,
  clearActivityCache,
} from "./cache";
import { getGitHubConfig } from "./config";

/**
 * Default activity limit
 */
const DEFAULT_LIMIT = 5;

/**
 * Service for fetching GitHub activity with fallback strategies
 */
export class GitHubActivityService {
  private username: string;
  private limit: number;

  /**
   * Create a new GitHub activity service
   *
   * @param username - GitHub username
   * @param limit - Maximum number of commits to fetch
   */
  constructor(username: string, limit: number = DEFAULT_LIMIT) {
    this.username = username;
    this.limit = limit;
  }

  /**
   * Fetch activity from public events (primary source)
   *
   * @returns Commit data or empty array on failure
   */
  async fetchFromPublicEvents(): Promise<CommitData[]> {
    try {
      const events = await fetchUserPublicEvents(
        this.username,
        getGitHubConfig().perPage,
      );
      return mapPushEventsToActivity(events, this.limit);
    } catch (error) {
      this.handleFetchError(error, "public-events");
      return [];
    }
  }

  /**
   * Fetch activity from recent repositories (fallback source)
   *
   * @returns Commit data or empty array on failure
   */
  async fetchFromRepositories(): Promise<CommitData[]> {
    try {
      const repos = await fetchUserRepositories(this.username, 6);

      const reposWithCommits = await Promise.all(
        repos
          .filter((repo) => repo.full_name)
          .map(async (repo) => {
            try {
              const [owner, name] = repo.full_name!.split("/");
              const commits = await fetchRepositoryCommits(owner, name);
              return { repo, commit: commits[0] || null };
            } catch (error) {
              if (!isEmptyRepoError(error)) {
                console.warn(
                  `[GitHubActivity] Failed to fetch commits for ${repo.full_name}`,
                  error,
                );
              }
              return { repo, commit: null };
            }
          }),
      );

      return mapReposToActivity(reposWithCommits, this.limit);
    } catch (error) {
      this.handleFetchError(error, "repo-fallback");
      return [];
    }
  }

  /**
   * Fetch activity with fallback strategy
   *
   * Tries public events first, falls back to repository commits if needed.
   *
   * @returns Complete activity result with source and error info
   */
  async fetchActivity(): Promise<GitHubActivityResult> {
    // Try public events first
    const publicEvents = await this.fetchFromPublicEvents();

    if (publicEvents.length > 0) {
      const result: GitHubActivityResult = {
        items: publicEvents,
        source: "public-events",
        error: null,
      };
      setCachedActivity(result);
      return result;
    }

    // Fallback to repository commits
    console.warn(
      `[GitHubActivity] No push events for ${this.username}, trying repo fallback`,
    );

    const repoCommits = await this.fetchFromRepositories();

    if (repoCommits.length > 0) {
      const result: GitHubActivityResult = {
        items: repoCommits,
        source: "repo-fallback",
        error: null,
      };
      setCachedActivity(result);
      return result;
    }

    // Return empty result
    return {
      items: [],
      source: "none",
      error: "request-failed",
    };
  }

  /**
   * Fetch activity with caching
   *
   * @param useCache - Whether to use cached data
   * @returns Activity result
   */
  async fetchActivityWithCache(
    useCache: boolean = true,
  ): Promise<GitHubActivityResult> {
    if (useCache) {
      const cached = getCachedActivity();
      if (cached) {
        return cached;
      }
    }
    return this.fetchActivity();
  }

  /**
   * Handle fetch errors with logging
   *
   * @param error - Error that occurred
   * @param source - Source that was being used
   */
  private handleFetchError(error: unknown, source: ActivitySource): void {
    if (error instanceof GitHubApiError) {
      if (error.isRateLimited) {
        console.warn(`[GitHubActivity] Rate limited on ${source}`);
      } else {
        console.warn(`[GitHubActivity] API error on ${source}:`, error.message);
      }
    } else {
      console.error(`[GitHubActivity] Unexpected error on ${source}:`, error);
    }
  }

  /**
   * Clear the activity cache
   */
  clearCache(): void {
    clearActivityCache();
  }

  /**
   * Update the username
   *
   * @param username - New username
   */
  setUsername(username: string): void {
    this.username = username;
  }

  /**
   * Update the limit
   *
   * @param limit - New limit
   */
  setLimit(limit: number): void {
    this.limit = limit;
  }
}

/**
 * Default username for the portfolio
 */
const DEFAULT_USERNAME = "AbiXnash";

/**
 * Default service instance
 */
let defaultService: GitHubActivityService | null = null;

/**
 * Get the default activity service instance (singleton)
 *
 * @param limit - Number of commits to fetch
 * @returns Activity service instance
 */
export function getActivityService(
  limit: number = DEFAULT_LIMIT,
): GitHubActivityService {
  if (!defaultService) {
    defaultService = new GitHubActivityService(DEFAULT_USERNAME, limit);
  }
  return defaultService;
}

/**
 * Convenience function to fetch GitHub activity
 *
 * @param username - GitHub username
 * @param limit - Maximum number of commits
 * @returns Activity result
 */
export async function getRecentGithubActivity(
  username: string = DEFAULT_USERNAME,
  limit: number = DEFAULT_LIMIT,
): Promise<GitHubActivityResult> {
  const service = new GitHubActivityService(username, limit);
  return service.fetchActivity();
}

/**
 * Convenience function to fetch activity with caching
 *
 * @param username - GitHub username
 * @param limit - Maximum number of commits
 * @param useCache - Whether to use cache
 * @returns Activity result
 */
export async function getGithubActivityWithCache(
  username: string = DEFAULT_USERNAME,
  limit: number = DEFAULT_LIMIT,
  useCache: boolean = true,
): Promise<GitHubActivityResult> {
  const service = new GitHubActivityService(username, limit);
  return service.fetchActivityWithCache(useCache);
}
