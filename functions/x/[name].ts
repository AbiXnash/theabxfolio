const MODULES: Record<string, string> = {
  "null-chat": "https://github.com/TheWebTek/null-chat",
};

export async function onRequest({ params }: { params: { name: string } }) {
  const name = params.name;
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

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
