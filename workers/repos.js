export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const token = env.GITHUB_TOKEN || "";
    const headers = { "User-Agent": "theabxfolio-worker" };
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      const res = await fetch(
        "https://api.github.com/users/AbiXnash/repos?sort=updated&per_page=4",
        { headers },
      );
      if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);
      const data = await res.json();

      const commitCounts = await Promise.all(
        data.map(async (r) => {
          try {
            const c = await fetch(
              `https://api.github.com/repos/AbiXnash/${r.name}/commits?per_page=1`,
              { headers },
            );
            if (!c.ok) return 0;
            const link = c.headers.get("link") ?? "";
            const m = link.match(/page=(\d+)>; rel="last"/);
            return m ? Number(m[1]) : 1;
          } catch {
            return 0;
          }
        }),
      );

        const repos = data.map((r, i) => ({
          name: r.name,
          description: r.description ?? "",
          language: r.language,
          url: r.html_url,
          pushedAt: r.pushed_at ?? "",
          commits: commitCounts[i],
        }));

      return new Response(JSON.stringify(repos), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=300",
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
}
