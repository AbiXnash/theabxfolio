import { component$, useVisibleTask$, $ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

const pageLabelMap: Record<string, string> = {
  '/': 'Home',
  '/resume': 'Resume',
  '/service': 'Service',
  '/contact': 'Contact',
};

export default component$(() => {
  const loc = useLocation();
  const path = loc.url.pathname.endsWith('/') && loc.url.pathname !== '/' ? loc.url.pathname.slice(0, -1) : loc.url.pathname;
  const pageLabel = pageLabelMap[path] ?? 'Portfolio';

  const goBack$ = $(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  });

  useVisibleTask$(() => {
    const bar = document.querySelector('.mobile-monogram');
    if (!bar) return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > lastY && currentY > 16;
      const nearTop = currentY < 8;

      if (nearTop) {
        bar.classList.remove('is-hidden');
      } else {
        bar.classList.toggle('is-hidden', goingDown);
      }

      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  });

  const isActive = (href: string) => (path === '' ? '/' : path) === href;

  return (
    <>
      <div class="mobile-monogram" aria-label="Mobile header">
        <div class="mono-left">
          <button class="mono-back" type="button" aria-label="Go back" onClick$={goBack$}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M14.7 6.3 13.3 4.9 6.2 12l7.1 7.1 1.4-1.4L9 12l5.7-5.7z"
              />
            </svg>
          </button>
          <a href="/" class="mono-pill" aria-label="Home">
            <span class="mono-badge" aria-hidden="true">
              <svg viewBox="0 0 32 32" role="presentation" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M15.188 0.807c-1.354 3.313-2.167 5.484-3.672 8.703 0.922 0.979 2.057 2.12 3.896 3.406-1.979-0.818-3.328-1.635-4.339-2.484-1.927 4.026-4.948 9.75-11.073 20.76 4.818-2.781 8.547-4.495 12.026-5.151-0.146-0.641-0.234-1.333-0.229-2.063l0.005-0.151c0.078-3.089 1.682-5.458 3.583-5.297s3.38 2.792 3.307 5.88c-0.016 0.578-0.083 1.135-0.198 1.656 3.443 0.672 7.135 2.38 11.885 5.125-0.938-1.724-1.771-3.281-2.573-4.76-1.255-0.974-2.568-2.245-5.24-3.62 1.839 0.479 3.151 1.031 4.177 1.646-8.12-15.109-8.771-17.12-11.557-23.651z"
                />
              </svg>
            </span>
            <span class="mono-name">Abinash S</span>
          </a>
        </div>
        <span class="mono-page">{pageLabel}</span>
      </div>

      <header class="site-header premium-header">
        <div class="header-inner">
          <div class="header-left">
            <button class="back-btn" type="button" aria-label="Go back" onClick$={goBack$}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M14.7 6.3 13.3 4.9 6.2 12l7.1 7.1 1.4-1.4L9 12l5.7-5.7z"
                />
              </svg>
              <span>Back</span>
            </button>
            <a href="/" class="brand-link" aria-label="Home">
              <span class="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 32 32" role="presentation">
                  <path
                    fill="currentColor"
                    d="M15.188 0.807c-1.354 3.313-2.167 5.484-3.672 8.703 0.922 0.979 2.057 2.12 3.896 3.406-1.979-0.818-3.328-1.635-4.339-2.484-1.927 4.026-4.948 9.75-11.073 20.76 4.818-2.781 8.547-4.495 12.026-5.151-0.146-0.641-0.234-1.333-0.229-2.063l0.005-0.151c0.078-3.089 1.682-5.458 3.583-5.297s3.38 2.792 3.307 5.88c-0.016 0.578-0.083 1.135-0.198 1.656 3.443 0.672 7.135 2.38 11.885 5.125-0.938-1.724-1.771-3.281-2.573-4.76-1.255-0.974-2.568-2.245-5.24-3.62 1.839 0.479 3.151 1.031 4.177 1.646-8.12-15.109-8.771-17.12-11.557-23.651z"
                  />
                </svg>
              </span>
              <div class="brand-text">
                <span class="brand-title">Abinash S</span>
                <span class="brand-sub">Software Engineer</span>
              </div>
            </a>
          </div>

          <nav class="nav-surface" aria-label="Primary">
            <a href="/resume" class={`nav-link ${isActive('/resume') ? 'is-active' : ''}`}>Resume</a>
            <a href="/service" class={`nav-link ${isActive('/service') ? 'is-active' : ''}`}>Service</a>
            <a href="/contact" class={`nav-link ${isActive('/contact') ? 'is-active' : ''}`}>Contact</a>
            <a class="github-btn" href="https://github.com/AbiXnash" target="_blank" rel="noreferrer">
              <svg class="gh-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.58 2 12.28c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.4-3.37-1.4-.45-1.16-1.1-1.47-1.1-1.47-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.82c0 .26.18.58.69.48A10.3 10.3 0 0 0 22 12.28C22 6.58 17.52 2 12 2z"
                ></path>
              </svg>
              <span>GitHub</span>
            </a>
          </nav>

          <div class="header-actions">
            <span class="current-page">{pageLabel}</span>
          </div>
        </div>
      </header>
    </>
  );
});
