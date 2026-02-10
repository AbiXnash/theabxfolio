import { component$, useVisibleTask$ } from '@builder.io/qwik';
import resume from '../data/resume.json';

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const calcTenure = (startDate?: string, endDate?: string) => {
  if (!startDate) return '';
  const start = new Date(startDate);
  const now = new Date();
  const endLabel = endDate && endDate !== 'Present' ? endDate : 'Present';

  const months =
    now.getFullYear() * 12 + now.getMonth() - (start.getFullYear() * 12 + start.getMonth());
  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  const tenure =
    years > 0 ? `${years} yr${years > 1 ? 's' : ''} ${remMonths} mo` : `${remMonths} mo`;

  return `${tenure} · ${formatDate(start)} – ${endLabel}`;
};

const extractYear = (meta?: string) => {
  if (!meta) return '';
  const rangeMatch = meta.match(/\b(19|20)\d{2}\s*–\s*(Present|(19|20)\d{2})\b/);
  const singleYearMatch = meta.match(/\b(19|20)\d{2}\b/);
  return rangeMatch ? rangeMatch[0] : singleYearMatch ? singleYearMatch[0] : '';
};

const detailLines = (details?: string) =>
  details ? details.trim().split('\n').filter((l) => l.trim()) : [];

const sectionIcon = (key: string) => {
  switch (key) {
    case 'work':
      return '⎯';
    case 'projects':
      return '◈';
    case 'research':
      return '✦';
    default:
      return '•';
  }
};

export default component$(() => {
  useVisibleTask$(() => {
    document.querySelectorAll('[data-showcase]').forEach((section) => {
      const items = Array.from(section.querySelectorAll('.showcase-item')) as HTMLElement[];
      const cards = Array.from(section.querySelectorAll('.showcase-card')) as HTMLElement[];
      if (!items.length || !cards.length) return;

      if (!window.matchMedia('(min-width: 980px)').matches) {
        return;
      }

      const activate = (idx: number) => {
        items.forEach((item, i) => {
          item.classList.toggle('is-active', i === idx);
        });
        cards.forEach((card, i) => {
          card.classList.toggle('is-active', i === idx);
        });
      };

      activate(0);
      items.forEach((item, idx) => {
        item.addEventListener('mouseenter', () => activate(idx));
        item.addEventListener('focusin', () => activate(idx));
        item.addEventListener('click', () => activate(idx));
      });

      section.addEventListener('keydown', (event) => {
        if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
          return;
        }
        const current = items.findIndex((item) => item.classList.contains('is-active'));
        if (current === -1) return;
        const delta = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
        const next = (current + delta + items.length) % items.length;
        const summary = items[next].querySelector('summary') as HTMLElement | null;
        if (summary) {
          summary.focus();
        } else {
          items[next].focus();
        }
        activate(next);
        event.preventDefault();
      });
    });

    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const sectionId = btn.getAttribute('data-copy');
        if (!sectionId) return;
        const link = `${window.location.origin}${window.location.pathname}#${sectionId}`;
        try {
          await navigator.clipboard.writeText(link);
          btn.textContent = 'Copied';
          setTimeout(() => {
            btn.textContent = 'Copy link';
          }, 1400);
        } catch (err) {
          btn.textContent = 'Copy failed';
          setTimeout(() => {
            btn.textContent = 'Copy link';
          }, 1400);
        }
      });
    });

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      const toggle = () => {
        backToTop.classList.toggle('is-visible', window.scrollY > 380);
      };
      toggle();
      window.addEventListener('scroll', toggle, { passive: true });
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });

  return (
    <>
      <section class="page-shell">
        <div class="page-inner resume-story">
          <div class="hero-block" data-reveal>
            <span class="hero-kicker">Resume</span>
            <h1 class="hero-title">Story Timeline</h1>
            <p class="hero-subtitle">
              A narrative timeline of work, research, and projects designed for readability across all devices.
            </p>
            <p class="section-hint">
              Tip: Tap any card to expand for details. On desktop, use arrow keys to browse the project and research showcase.
            </p>
          </div>

          {Object.entries(resume as Record<string, any>)
            .filter(([sectionKey]) => sectionKey !== 'education')
            .map(([sectionKey, section]) => (
              <section class="story-section" id={sectionKey} data-reveal>
                <div class="story-head">
                  <div class="section-line">
                    <h2 class="section-title">
                      <span class="section-icon">{sectionIcon(sectionKey)}</span>
                      {section.label}
                    </h2>
                    <button class="copy-link" type="button" data-copy={sectionKey}>
                      Copy link
                    </button>
                  </div>
                  <p class="section-subtitle">{section.description}</p>
                  {sectionKey === 'work' ? (
                    <p class="section-hint">Hint: Click a role to expand highlights.</p>
                  ) : (
                    <p class="section-hint">
                      Hint: Select a card to see the deep‑dive panel. Tap to expand on mobile.
                    </p>
                  )}
                </div>

                {section.items.length === 0 ? (
                  <div class="empty-card">No items published yet. Updates coming soon.</div>
                ) : sectionKey === 'work' ? (
                  <div class="story-list">
                    {section.items.map((item: any) => {
                      const year = extractYear(item.meta);
                      const tenure = calcTenure(item.startDate, item.endDate);
                      const lines = detailLines(item.details);
                      const showSkills = Array.isArray(item.skills) && item.skills.length;

                      return (
                        <details class="story-card" data-reveal>
                          <summary class="story-summary" title="Click to expand">
                            <div class="story-rail">
                              <span class="rail-dot"></span>
                              <span class="rail-line"></span>
                            </div>

                            <div class="story-body">
                              <div class="story-top">
                                <div>
                                  <div class="story-title">{item.title}</div>
                                  <div class="story-intro">{item.intro}</div>
                                  {tenure && <div class="story-tenure">{tenure}</div>}
                                </div>
                                <div class="story-meta">
                                  {year && <span class="chip">{year}</span>}
                                  {item.meta && <span class="chip ghost">{item.meta}</span>}
                                  {item.github && <span class="chip accent">source</span>}
                                  <span class="chev">more</span>
                                </div>
                              </div>

                              {showSkills && (
                                <div class="story-block">
                                  <div class="block-label">Skills</div>
                                  <div class="skill-row">
                                    {item.skills.map((s: string) => (
                                      <span class="skill-pill">{s}</span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </summary>

                          <div class="story-details">
                            {lines.length > 0 && (
                              <div class="story-block">
                                <div class="block-label">Highlights</div>
                                <ul class="detail-list">
                                  {lines.map((line: string) => (
                                    <li>{line}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {item.note && (
                              <div class="story-block">
                                <div class="block-label">Note</div>
                                <p class="detail-note">{item.note}</p>
                              </div>
                            )}

                            {Array.isArray(item.references) && item.references.length > 0 && (
                              <div class="story-block">
                                <div class="block-label">References</div>
                                <ul class="detail-list">
                                  {item.references.map((r: any) => (
                                    <li>
                                      <a href={r.url} target="_blank">{r.label}</a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </details>
                      );
                    })}
                  </div>
                ) : (
                  <div class="showcase" data-showcase={sectionKey} data-reveal>
                    <div class="showcase-list">
                      {section.items.map((item: any, idx: number) => {
                        const year = extractYear(item.meta);
                        const lines = detailLines(item.details);
                        const showContributors =
                          (sectionKey === 'research' || sectionKey === 'projects') &&
                          item.contributors.length > 1;
                        const showSkills = Array.isArray(item.skills) && item.skills.length;
                        return (
                          <details class="showcase-item" data-index={idx}>
                            <summary class="showcase-summary" title="Tap to expand">
                              <div class="showcase-title">{item.title}</div>
                              <div class="showcase-intro">{item.intro}</div>
                              <div class="showcase-meta">
                                {year && <span class="chip">{year}</span>}
                                {item.meta && <span class="chip ghost">{item.meta}</span>}
                                {item.github && <span class="chip accent">source</span>}
                              </div>
                            </summary>

                            <div class="showcase-mobile">
                              {showSkills && (
                                <div class="story-block">
                                  <div class="block-label">Stack</div>
                                  <div class="skill-row">
                                    {item.skills.map((s: string) => (
                                      <span class="skill-pill">{s}</span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {lines.length > 0 && (
                                <div class="story-block">
                                  <div class="block-label">Highlights</div>
                                  <ul class="detail-list">
                                    {lines.map((line: string) => (
                                      <li>{line}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {item.note && (
                                <div class="story-block">
                                  <div class="block-label">Note</div>
                                  <p class="detail-note">{item.note}</p>
                                </div>
                              )}

                              {showContributors && (
                                <div class="story-block">
                                  <div class="block-label">Contributors</div>
                                  <ul class="detail-list">
                                    {item.contributors.map((c: any) => (
                                      <li>{c.name} — {c.role}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {Array.isArray(item.references) && item.references.length > 0 && (
                                <div class="story-block">
                                  <div class="block-label">References</div>
                                  <ul class="detail-list">
                                    {item.references.map((r: any) => (
                                      <li>
                                        <a href={r.url} target="_blank">{r.label}</a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {item.github && (
                                <div class="story-block">
                                  <div class="block-label">Source</div>
                                  <a class="detail-link" href={item.github} target="_blank">
                                    View repository
                                  </a>
                                </div>
                              )}
                            </div>
                          </details>
                        );
                      })}
                    </div>

                    <div class="showcase-panel">
                      {section.items.map((item: any, idx: number) => {
                        const showContributors =
                          (sectionKey === 'research' || sectionKey === 'projects') &&
                          item.contributors.length > 1;
                        const showSkills = Array.isArray(item.skills) && item.skills.length;
                        const lines = detailLines(item.details);

                        return (
                          <div class={`showcase-card ${idx === 0 ? 'is-active' : ''}`} data-index={idx}>
                            <div class="showcase-card-head">
                              <div>
                                <div class="showcase-card-title">{item.title}</div>
                                <div class="showcase-card-intro">{item.intro}</div>
                              </div>
                              {item.meta && <span class="chip ghost">{item.meta}</span>}
                            </div>

                            {showSkills && (
                              <div class="story-block">
                                <div class="block-label">Stack</div>
                                <div class="skill-row">
                                  {item.skills.map((s: string) => (
                                    <span class="skill-pill">{s}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {lines.length > 0 && (
                              <div class="story-block">
                                <div class="block-label">Highlights</div>
                                <ul class="detail-list">
                                  {lines.map((line: string) => (
                                    <li>{line}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {item.note && (
                              <div class="story-block">
                                <div class="block-label">Note</div>
                                <p class="detail-note">{item.note}</p>
                              </div>
                            )}

                            {showContributors && (
                              <div class="story-block">
                                <div class="block-label">Contributors</div>
                                <ul class="detail-list">
                                  {item.contributors.map((c: any) => (
                                    <li>{c.name} — {c.role}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {Array.isArray(item.references) && item.references.length > 0 && (
                              <div class="story-block">
                                <div class="block-label">References</div>
                                <ul class="detail-list">
                                  {item.references.map((r: any) => (
                                    <li>
                                      <a href={r.url} target="_blank">{r.label}</a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {item.github && (
                              <div class="story-block">
                                <div class="block-label">Source</div>
                                <a class="detail-link" href={item.github} target="_blank">
                                  View repository
                                </a>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            ))}
        </div>
      </section>

      <button id="backToTop" class="btn-ghost" type="button">Back to top</button>
    </>
  );
});
