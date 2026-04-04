/**
 * GitHub Configuration Module
 *
 * Centralized configuration for GitHub API settings.
 * Following Single Responsibility Principle (SRP) - only configuration.
 *
 * @module github/config
 */

import type { GitHubConfig } from "./types";

/**
 * Default GitHub API configuration
 */
export const DEFAULT_CONFIG: GitHubConfig = {
  baseUrl: "https://api.github.com",
  apiVersion: "2022-11-28",
  userAgent: "theabxfolio-github-activity",
  requestTimeout: 4000,
  perPage: 100,
};

/**
 * Environment variable names to check for GitHub token
 */
export const TOKEN_ENV_VARS = [
  "VITE_GITHUB_TOKEN",
  "VITE_GH_TOKEN",
  "VITE_THE_REPO_TOKEN",
  "GITHUB_TOKEN",
  "GH_TOKEN",
  "THE_REPO_TOKEN",
] as const;

/**
 * Get GitHub token from environment variables
 * Checks multiple sources for backward compatibility
 *
 * @returns The GitHub token or undefined if not found
 */
export function getGitHubToken(): string | undefined {
  for (const envVar of TOKEN_ENV_VARS) {
    const token = import.meta.env[envVar];
    if (token) {
      return token;
    }
  }
  return undefined;
}

/**
 * Get GitHub configuration
 *
 * @returns Complete GitHub configuration object
 */
export function getGitHubConfig(): GitHubConfig {
  return DEFAULT_CONFIG;
}
