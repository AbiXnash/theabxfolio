/**
 * GitHub Activity Module - Type Definitions
 *
 * Defines all TypeScript interfaces and types for the GitHub activity feature.
 * Following Single Responsibility Principle (SRP) - only type definitions.
 *
 * @module github/types
 */

/**
 * Represents a single commit from GitHub activity
 */
export interface CommitData {
  date: string;
  htmlUrl: string;
  message: string;
  repoName: string;
  sha: string;
}

/**
 * Source of the activity data
 */
export type ActivitySource = "public-events" | "repo-fallback" | "none";

/**
 * Error types that can occur when fetching activity
 */
export type ActivityError = "rate-limited" | "request-failed" | null;

/**
 * Result of fetching GitHub activity
 */
export interface GitHubActivityResult {
  items: CommitData[];
  source: ActivitySource;
  error: ActivityError;
}

/**
 * GitHub API response for push events
 */
export interface GitHubPushEvent {
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
}

/**
 * GitHub API response for repository
 */
export interface GitHubRepo {
  full_name?: string;
  html_url?: string;
}

/**
 * GitHub API response for commits
 */
export interface GitHubCommit {
  sha?: string;
  commit?: {
    message?: string;
    author?: {
      date?: string;
    };
  };
}

/**
 * Configuration options for activity fetching
 */
export interface ActivityFetchOptions {
  username: string;
  limit?: number;
  useCache?: boolean;
}

/**
 * Cache entry structure
 */
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * GitHub API configuration
 */
export interface GitHubConfig {
  baseUrl: string;
  apiVersion: string;
  userAgent: string;
  requestTimeout: number;
  perPage: number;
}
