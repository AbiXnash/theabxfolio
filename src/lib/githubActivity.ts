/**
 * GitHub Activity - Main Entry Point
 *
 * This module provides backward compatibility for the GitHub activity feature.
 * All functionality has been refactored into the github/ module following SOLID principles.
 *
 * @deprecated Use src/lib/github/index.ts for new code
 * @module lib/githubActivity
 */

import type { GitHubActivityResult } from "./github/types";
import { getRecentGithubActivity as fetchActivity } from "./github/activity-service";

/**
 * Get recent GitHub activity for a user
 *
 * @param username - GitHub username
 * @param limit - Maximum number of commits
 * @returns Activity result with commits
 * @deprecated Use getRecentGithubActivity from ./github/activity-service
 */
export async function getRecentGithubActivity(
  username: string,
  limit: number = 5,
): Promise<GitHubActivityResult> {
  return fetchActivity(username, limit);
}

// Re-export types for backward compatibility
export type {
  CommitData as GitHubActivityItem,
  GitHubActivityResult,
  ActivitySource,
  ActivityError,
} from "./github/types";
