const MODULES = {
  "null-chat": "https://github.com/TheWebTek/null-chat",
};

export async function handleGoImport(request) {
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/x\/(.+)/);

  if (!match) {
    return new Response("Not found", { status: 404 });
  }

  const name = match[1];
  const repo = MODULES[name];

  if (!repo) {
    return new Response("Module not found", { status: 404 });
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

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
