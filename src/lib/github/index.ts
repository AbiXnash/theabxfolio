/**
 * GitHub Activity Module - Barrel Export
 *
 * Main entry point for the GitHub activity feature.
 * Follows Single Responsibility Principle (SRP) - provides clean public API.
 *
 * @module github
 */

// Types
export type {
  CommitData,
  GitHubActivityResult,
  ActivitySource,
  ActivityError,
  GitHubPushEvent,
  GitHubRepo,
  GitHubCommit,
  ActivityFetchOptions,
  CacheEntry,
  GitHubConfig,
} from "./types";

// Configuration
export {
  DEFAULT_CONFIG,
  TOKEN_ENV_VARS,
  getGitHubToken,
  getGitHubConfig,
} from "./config";

// Cache
export {
  getCachedActivity,
  setCachedActivity,
  clearActivityCache,
  hasValidCache,
  getCacheAge,
  SESSION_STORAGE_KEY,
  CLIENT_CACHE_TTL_MS,
  getClientCachedActivity,
  setClientCachedActivity,
  clearClientCache,
} from "./cache";

// API Client
export {
  GitHubApiError,
  fetchGitHubJson,
  fetchUserPublicEvents,
  fetchUserRepositories,
  fetchRepositoryCommits,
  hasGitHubToken,
  isRateLimitError,
  isEmptyRepoError,
} from "./api-client";

// Mapper
export {
  toRepoUrl,
  extractRepoName,
  mapPushEventsToActivity,
  mapRepoToCommit,
  mapReposToActivity,
  countCommitsPerRepo,
  filterCommitsByDateRange,
} from "./mapper";

// Activity Service
export {
  GitHubActivityService,
  getActivityService,
  getRecentGithubActivity,
  getGithubActivityWithCache,
} from "./activity-service";

// UI (Client-side)
export {
  renderActivity,
  initializeGitHubActivity,
  refreshActivity,
} from "./ui";
