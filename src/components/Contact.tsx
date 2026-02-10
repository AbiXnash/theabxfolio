import { component$, useSignal, $ } from '@builder.io/qwik';

export default component$(() => {
  const toastText = useSignal('Email copied');
  const toastVisible = useSignal(false);

  const showToast = $((text: string) => {
    toastText.value = text;
    toastVisible.value = true;
    setTimeout(() => {
      toastVisible.value = false;
      toastText.value = 'Email copied';
    }, 1500);
  });

  const onCopy$ = $(async (email: string) => {
    try {
      await navigator.clipboard.writeText(email.trim());
      showToast('Email copied');
    } catch (err) {
      showToast('Copy failed');
    }
  });

  const onBriefSubmit$ = $((event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement | null;
    if (!form) return;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const org = String(formData.get('org') || '').trim();
    const summary = String(formData.get('summary') || '').trim();
    const subject = encodeURIComponent('Project brief from portfolio');
    const body = encodeURIComponent(
      `Name: ${name || '-'}\nOrganization: ${org || '-'}\n\nSummary:\n${summary || '-'}`,
    );
    window.location.href = `mailto:abinash@theabx.in?subject=${subject}&body=${body}`;
  });

  return (
    <section class="page-shell">
      <div class="page-inner contact-shell">
        <div class="hero-block" data-reveal>
          <span class="hero-kicker">$ connect --secure</span>
          <h1 class="hero-title">Let’s Work Together</h1>
          <p class="hero-subtitle">
            Open to full-time roles, long-term collaborations, and high-impact engineering opportunities.
            Choose a channel below and I’ll respond within 24–48 hours.
          </p>
          <p class="section-hint">Hint: The quick brief opens your email app with the details prefilled.</p>
        </div>

        <div class="card contact-primary" data-reveal>
          <div>
            <p class="hero-kicker">primary channel</p>
            <h2 class="section-title">Email</h2>
            <p class="section-subtitle">
              Best for project inquiries, backend consulting, and research collaboration. I reply within
              24–48 hours.
            </p>
          </div>
          <div class="primary-cta">
            <span class="tag">preferred</span>
            <a id="primaryEmail" href="mailto:abinash@theabx.in" class="primary-link">
              abinash@theabx.in
            </a>
            <button class="copy-btn" type="button" onClick$={() => onCopy$('abinash@theabx.in')}>
              copy
            </button>
          </div>
        </div>

        <div class="contact-duo">
          <div class="card contact-brief" data-reveal>
            <h2 class="section-title">Quick Brief</h2>
            <p class="section-subtitle">Share a short scope and I will reply with a plan and timeline.</p>
            <form class="brief-form" onSubmit$={onBriefSubmit$}>
              <label>
                Name
                <input name="name" type="text" placeholder="Your name" />
              </label>
              <label>
                Company / Org
                <input name="org" type="text" placeholder="Organization" />
              </label>
              <label>
                Project summary
                <textarea name="summary" rows={4} placeholder="What are you building?" />
              </label>
              <button class="btn-primary" type="submit">Send brief</button>
            </form>
          </div>

          <div class="card contact-activity" data-reveal>
            <div class="hero-panel">
              <div class="panel-head">
                <div>
                  <span class="panel-label">Profile</span>
                  <div class="panel-title">Current focus snapshot</div>
                </div>
                <span class="panel-dot" aria-hidden="true"></span>
              </div>

              <div class="panel-grid">
                <div class="panel-card">
                  <span class="panel-card-label">Focus</span>
                  <span class="panel-card-value">Backend reliability & payment flows</span>
                </div>
                <div class="panel-card">
                  <span class="panel-card-label">Stack</span>
                  <span class="panel-card-value stack-value">
                    <span class="stack-badge">
                      <img
                        class="stack-icon"
                        src="https://cdn.simpleicons.org/springboot/d3d6dc?viewbox=auto&size=18"
                        alt="Spring Boot"
                        loading="lazy"
                        decoding="async"
                      />
                      <span class="stack-name">Spring Boot</span>
                    </span>
                    <span class="stack-badge">
                      <img
                        class="stack-icon"
                        src="https://cdn.simpleicons.org/rust/d3d6dc?viewbox=auto&size=18"
                        alt="Rust"
                        loading="lazy"
                        decoding="async"
                      />
                      <span class="stack-name">Rust</span>
                    </span>
                    <span class="stack-badge">
                      <img
                        class="stack-icon"
                        src="https://cdn.simpleicons.org/go/d3d6dc?viewbox=auto&size=18"
                        alt="Go"
                        loading="lazy"
                        decoding="async"
                      />
                      <span class="stack-name">Go</span>
                    </span>
                    <span class="stack-badge">
                      <img
                        class="stack-icon"
                        src="https://cdn.simpleicons.org/openjdk/d3d6dc?viewbox=auto&size=18"
                        alt="Java"
                        loading="lazy"
                        decoding="async"
                      />
                      <span class="stack-name">Java</span>
                    </span>
                  </span>
                </div>
                <div class="panel-card">
                  <span class="panel-card-label">Domain</span>
                  <span class="panel-card-value">Fintech · Critical Systems · Risk</span>
                </div>
              </div>

              <div class="panel-foot">
                <span class="panel-note">Remote · Long-term · High-impact</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card" data-reveal>
          <div class="contact-grid">
            <a href="https://github.com/AbiXnash" target="_blank" class="contact-tile">
              <div class="contact-icon">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.48 2 2 6.58 2 12.28c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.4-3.37-1.4-.45-1.16-1.1-1.47-1.1-1.47-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.82c0 .26.18.58.69.48A10.3 10.3 0 0 0 22 12.28C22 6.58 17.52 2 12 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p>GitHub</p>
                <span>github.com/AbiXnash</span>
              </div>
            </a>

            <a href="https://linkedin.com/in/abinash-selvarasu" target="_blank" class="contact-tile">
              <div class="contact-icon">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.6h.05c.53-1 1.83-2.1 3.75-2.1C20 8.5 21 10.7 21 14v7h-4v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9z"
                  ></path>
                </svg>
              </div>
              <div>
                <p>LinkedIn</p>
                <span>linkedin.com/in/abinash-selvarasu</span>
              </div>
            </a>

            <a href="https://x.com/theabxguy" target="_blank" class="contact-tile">
              <div class="contact-icon">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M18.244 2H21.6l-7.53 8.61L22.5 22h-6.6l-5.17-6.63L4.9 22H1.5l8.06-9.21L1.5 2h6.75l4.67 6.05L18.24 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p>X (Twitter)</p>
                <span>x.com/theabxguy</span>
              </div>
            </a>

            <a href="https://instagram.com/_abixnash_" target="_blank" class="contact-tile">
              <div class="contact-icon">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                  <circle cx="12" cy="12" r="4"></circle>
                  <circle cx="17.5" cy="6.5" r="1"></circle>
                </svg>
              </div>
              <div>
                <p>Instagram</p>
                <span>instagram.com/_abixnash_</span>
              </div>
            </a>

            <a href="https://wa.me/919345642528" target="_blank" class="contact-tile">
              <div class="contact-icon">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12.04 2C6.57 2 2.1 6.3 2.1 11.63c0 2.05.63 4.06 1.83 5.78L2 22l4.82-1.87a10.1 10.1 0 0 0 5.22 1.42h.01c5.46 0 9.93-4.3 9.93-9.62C21.98 6.3 17.5 2 12.04 2zm4.85 13.56c-.2.55-1.14 1.05-1.57 1.1-.4.05-.92.08-1.48-.09-.34-.1-.78-.25-1.34-.48-2.36-1-3.89-3.46-4-3.62-.11-.15-.96-1.26-.96-2.4 0-1.14.6-1.7.81-1.93.21-.23.46-.29.61-.29.15 0 .3 0 .43.01.14.01.33-.05.52.4.2.46.68 1.58.74 1.7.06.12.1.27.02.43-.08.16-.12.27-.24.42-.12.15-.25.34-.36.45-.12.12-.24.25-.1.49.14.24.63 1.03 1.35 1.67.93.83 1.72 1.09 1.96 1.22.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.6-.14 1.15z"
                  ></path>
                </svg>
              </div>
              <div>
                <p>WhatsApp</p>
                <span>chat directly</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div id="copyToast" class={`copy-toast ${toastVisible.value ? 'show' : ''}`}>
        {toastText.value}
      </div>
    </section>
  );
});
