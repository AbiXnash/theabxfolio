const MODULES: Record<string, string> = {
  "null-chat": "https://github.com/TheWebTek/null-chat",
};

const CACHE_TTL = 86_400; // 24 hours

const cache = (caches as unknown as { default: Cache }).default;

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const match = url.pathname.match(/^\/x\/([^/]+)/);
    if (!match) {
      return new Response("Not found", { status: 404 });
    }

    const cached = await cache.match(request);
    if (cached) return cached;

    const name = match[1];
    const repo = MODULES[name];
    if (!repo) {
      return new Response("Not found", { status: 404 });
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="go-import" content="theabx.in/x/${name} git ${repo}">
  <meta http-equiv="refresh" content="0; url=${repo}">
  <title>theabx.in/x/${name}</title>
</head>
<body>
  <p>Go module: <code>theabx.in/x/${name}</code></p>
  <p>Source: <a href="${repo}">${repo}</a></p>
</body>
</html>`;

    const response = new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": `public, max-age=${CACHE_TTL}`,
      },
    });

    await cache.put(request, response.clone());
    return response;
  },
};
