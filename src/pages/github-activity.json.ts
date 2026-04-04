import { getRecentGithubActivity } from "../lib/githubActivity";

export const prerender = true;

export async function GET() {
  const activity = await getRecentGithubActivity("AbiXnash", 5);

  return new Response(JSON.stringify(activity), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
