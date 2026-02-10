import { component$, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  useVisibleTask$(() => {
    const repoList = document.getElementById('repoList');
    if (!repoList) return;

    const username = 'AbiXnash';
    const formatDate = (iso: string) => new Date(iso).toLocaleString();
    const shortSha = (sha: string) => (sha ? sha.slice(0, 7) : '');
    const escapeHtml = (str: string) =>
      String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const headers = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    const CACHE_TTL_MS = 15 * 60 * 1000;

    const readCache = (url: string) => {
      try {
        const raw = localStorage.getItem(`gh-cache:${url}`);
        const parsed = raw ? JSON.parse(raw) : null;
        if (!parsed?.ts || Date.now() - parsed.ts > CACHE_TTL_MS) {
          return null;
        }
        return parsed;
      } catch {
        return null;
      }
    };

    const readStale = (url: string) => {
      try {
        const raw = localStorage.getItem(`gh-cache:${url}`);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    };

    const writeCache = (url: string, payload: { etag?: string; data: any; link?: string | null }) => {
      try {
        localStorage.setItem(`gh-cache:${url}`, JSON.stringify({ ...payload, ts: Date.now() }));
      } catch {
        // Ignore cache write errors (storage full / blocked).
      }
    };

    const fetchJson = async (url: string) => {
      const cached = readCache(url);
      if (cached?.data) {
        return { data: cached.data, link: cached.link || null };
      }

      const stale = readStale(url);
      const requestHeaders: Record<string, string> = { ...headers };
      if (stale?.etag) {
        requestHeaders['If-None-Match'] = stale.etag;
      }

      const res = await fetch(url, { headers: requestHeaders });
      if (res.status === 304 && stale?.data) {
        return { data: stale.data, link: stale.link || null };
      }

      if (!res.ok) {
        const retryAfter = res.headers.get('retry-after');
        const remaining = res.headers.get('x-ratelimit-remaining');
        const reset = res.headers.get('x-ratelimit-reset');
        if (retryAfter || remaining === '0' || res.status === 403) {
          if (stale?.data) {
            return { data: stale.data, link: stale.link || null };
          }
          throw new Error(
            `GitHub rate limit: retry-after=${retryAfter || 'n/a'} reset=${reset || 'n/a'}`,
          );
        }
        if (stale?.data) {
          return { data: stale.data, link: stale.link || null };
        }
        throw new Error(`GitHub API error ${res.status}`);
      }

      const data = await res.json();
      const etag = res.headers.get('etag');
      const link = res.headers.get('link');
      if (etag) writeCache(url, { etag, data, link });
      return { data, link };
    };

    const getNextPage = (linkHeader: string | null) => {
      if (!linkHeader) return null;
      const parts = linkHeader.split(',').map((s) => s.trim());
      for (const part of parts) {
        const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
        if (match && match[2] === 'next') return match[1];
      }
      return null;
    };

    const fetchAllRepos = async () => {
      const repos: any[] = [];
      let url: string | null = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
      while (url) {
        const { data, link } = await fetchJson(url);
        if (!Array.isArray(data) || data.length === 0) break;
        repos.push(...data);
        url = getNextPage(link);
      }
      return repos;
    };

    (async () => {
      try {
        const repos = await fetchAllRepos();
        const repoEntries = repos
          .map((repo) => ({
            name: repo.name,
            fullName: repo.full_name,
            htmlUrl: repo.html_url,
          }))
          .filter((repo) => repo.fullName);

        const commitSets: { repo: { name: string; fullName: string; htmlUrl: string }; commits: any[] }[] = [];
        for (const repo of repoEntries) {
          const url = `https://api.github.com/repos/${repo.fullName}/commits?per_page=1`;
          const { data } = await fetchJson(url).catch(() => ({ data: [] }));
          commitSets.push({ repo, commits: Array.isArray(data) ? data : [] });
        }

        const flattened = commitSets.flatMap(({ repo, commits }) =>
          commits.map((c) => ({
            repo,
            sha: c.sha,
            message: c.commit?.message,
            date: c.commit?.author?.date,
          })),
        );

        const recent = flattened
          .filter((c) => c.date)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        if (!recent.length) {
          repoList.innerHTML = "<div class='repo-empty'>Unable to load GitHub activity.</div>";
          return;
        }

        const commitItems = recent
          .map(
            (c) => `
              <div class="commit-item">
                <div class="commit-message">${escapeHtml(c.message || 'Commit')}</div>
                <div class="commit-meta">
                  <span class="commit-sha">${shortSha(c.sha)}</span>
                  <a class="commit-repo" href="${escapeHtml(c.repo.htmlUrl)}" target="_blank">
                    ${escapeHtml(c.repo.name)}
                  </a>
                  <span>${formatDate(c.date)}</span>
                </div>
              </div>
            `,
          )
          .join('');

        repoList.innerHTML = `
          <div class="repo-item">
            <div class="repo-head">
              <div>
                <div class="repo-badge">Recent commits</div>
                <div class="repo-title">Latest activity</div>
                <div class="repo-desc">Across all public repositories</div>
              </div>
              <a class="repo-link" href="https://github.com/${username}" target="_blank">View GitHub</a>
            </div>
            <div class="commit-list">${commitItems}</div>
          </div>
        `;
      } catch (err) {
        repoList.innerHTML = "<div class='repo-empty'>Unable to load GitHub activity.</div>";
      }
    })();
  });

  return (
    <section class="page-shell hero-shell">
      <div class="page-inner hero-layout">
        <div class="hero-content" data-reveal>
          <span class="hero-kicker">Backend Engineer</span>
          <h1 class="hero-title">Abinash S</h1>
          <p class="hero-subtitle">
            Building resilient payment systems and security-focused platforms with clean architecture and
            measured performance.
          </p>

          <div class="hero-actions">
            <a href="/resume" class="btn-primary">View Resume</a>
            <a href="/service" class="btn-ghost">Services</a>
            <a href="/contact" class="btn-ghost">Contact</a>
          </div>

          <div class="hero-tags">
            <span class="tag">Payments · Microservices</span>
            <span class="tag">Security · Reliability</span>
            <span class="tag">Java · Spring Boot</span>
          </div>
        </div>

        <div class="card contact-activity" data-reveal>
          <h2 class="section-title">GitHub Activity</h2>
          <p class="activity-badge">Available for select projects</p>
          <p class="section-subtitle">Latest commits aggregated across public repositories.</p>
          <div id="repoList" class="repo-list">
            <div class="repo-item skeleton"></div>
            <div class="repo-item skeleton"></div>
            <div class="repo-item skeleton"></div>
          </div>
        </div>
      </div>
    </section>
  );
});
