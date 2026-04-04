/**
 * GitHub Activity Cache Module
 *
 * Implements caching strategy for GitHub activity data.
 * Following Single Responsibility Principle (SRP) - only caching logic.
 * Uses in-memory cache with TTL support.
 *
 * @module github/cache
 */

import type { GitHubActivityResult, CacheEntry } from "./types";

/**
 * Default cache TTL in milliseconds (5 minutes)
 */
const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * In-memory cache storage
 */
let activityCache: CacheEntry<GitHubActivityResult> | null = null;

/**
 * Get cached activity if available and not expired
 *
 * @param ttlMs - Time-to-live in milliseconds (default: 5 minutes)
 * @returns Cached activity or null if not available/expired
 */
export function getCachedActivity(
  ttlMs: number = DEFAULT_CACHE_TTL_MS,
): GitHubActivityResult | null {
  if (!activityCache) {
    return null;
  }

  const isExpired = Date.now() - activityCache.timestamp > ttlMs;

  if (isExpired) {
    activityCache = null;
    return null;
  }

  return activityCache.data;
}

/**
 * Set cached activity with current timestamp
 *
 * @param data - Activity data to cache
 */
export function setCachedActivity(data: GitHubActivityResult): void {
  activityCache = {
    data,
    timestamp: Date.now(),
  };
}

/**
 * Clear the activity cache
 */
export function clearActivityCache(): void {
  activityCache = null;
}

/**
 * Check if cache is available and not expired
 *
 * @param ttlMs - Time-to-live in milliseconds
 * @returns True if valid cache exists
 */
export function hasValidCache(ttlMs: number = DEFAULT_CACHE_TTL_MS): boolean {
  return getCachedActivity(ttlMs) !== null;
}

/**
 * Get cache age in milliseconds
 *
 * @returns Age of cache in ms, or -1 if no cache
 */
export function getCacheAge(): number {
  if (!activityCache) {
    return -1;
  }
  return Date.now() - activityCache.timestamp;
}

/**
 * Session storage key for client-side caching
 */
export const SESSION_STORAGE_KEY = "github-activity-cache";

/**
 * Client-side cache TTL (1 minute)
 */
export const CLIENT_CACHE_TTL_MS = 60 * 1000;

/**
 * Get client-side cached activity from sessionStorage
 *
 * @returns Cached activity or null
 */
export function getClientCachedActivity(): GitHubActivityResult | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;

    const parsed: CacheEntry<GitHubActivityResult> = JSON.parse(stored);
    const isExpired = Date.now() - parsed.timestamp > CLIENT_CACHE_TTL_MS;

    return isExpired ? null : parsed.data;
  } catch {
    return null;
  }
}

/**
 * Set client-side cached activity in sessionStorage
 *
 * @param data - Activity data to cache
 */
export function setClientCachedActivity(data: GitHubActivityResult): void {
  if (typeof window === "undefined") return;

  try {
    const entry: CacheEntry<GitHubActivityResult> = {
      data,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // Storage might be full or disabled
  }
}

/**
 * Clear client-side cache
 */
export function clearClientCache(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}
