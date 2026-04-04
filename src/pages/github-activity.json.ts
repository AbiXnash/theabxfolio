import { getRecentGithubActivity } from "../lib/githubActivity";

export const prerender = false;

export async function GET() {
  const activity = await getRecentGithubActivity("AbiXnash", 5);

  const cacheMaxAge = activity.error === "rate-limited" ? 60 : 300;

  return new Response(JSON.stringify(activity), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": `public, max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}`,
    },
    status: activity.error === "rate-limited" ? 503 : 200,
  });
}
