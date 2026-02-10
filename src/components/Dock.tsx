import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const loc = useLocation();
  const path = loc.url.pathname.endsWith('/') && loc.url.pathname !== '/' ? loc.url.pathname.slice(0, -1) : loc.url.pathname;
  const isActive = (href: string) => (path === '' ? '/' : path) === href;

  useVisibleTask$(() => {
    const dock = document.querySelector('.dock');
    if (!dock) return;
    const items = Array.from(dock.querySelectorAll('.dock-item')) as HTMLElement[];
    if (!items.length) return;

    let raf = 0;
    const maxScale = 1.12;
    const maxLift = 6;
    const influence = 90;

    const reset = () => {
      items.forEach((item) => {
        item.style.transform = '';
      });
    };

    const onMove = (event: PointerEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = event.clientX;
        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          const dist = Math.abs(x - center);
          const t = Math.max(0, 1 - dist / influence);
          const scale = 1 + t * (maxScale - 1);
          const lift = t * maxLift;
          item.style.transform = `translateY(${-lift}px) scale(${scale})`;
        });
      });
    };

    dock.addEventListener('pointermove', onMove);
    dock.addEventListener('pointerleave', reset);

    const socialBtn = dock.querySelector('.dock-social') as HTMLElement | null;
    const popover = dock.querySelector('.dock-popover') as HTMLElement | null;
    if (socialBtn && popover) {
      const close = () => {
        popover.classList.remove('is-open');
        socialBtn.setAttribute('aria-expanded', 'false');
        popover.setAttribute('aria-hidden', 'true');
      };

      socialBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = popover.classList.toggle('is-open');
        socialBtn.setAttribute('aria-expanded', String(isOpen));
        popover.setAttribute('aria-hidden', String(!isOpen));
      });

      socialBtn.addEventListener('mouseenter', () => {
        popover.classList.add('is-open');
        socialBtn.setAttribute('aria-expanded', 'true');
        popover.setAttribute('aria-hidden', 'false');
      });

      socialBtn.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (!popover.matches(':hover')) close();
        }, 80);
      });

      popover.addEventListener('mouseleave', close);

      popover.addEventListener('click', (event) => event.stopPropagation());
      document.addEventListener('click', (event) => {
        if (socialBtn.contains(event.target as Node) || popover.contains(event.target as Node)) return;
        close();
      });
    }

    return () => {
      dock.removeEventListener('pointermove', onMove);
      dock.removeEventListener('pointerleave', reset);
    };
  });

  return (
    <nav class="dock-shell" aria-label="Mobile dock">
      <div class="dock">
        <a href="/" class={`dock-item ${isActive('/') ? 'is-active' : ''}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 3.2 3 10.4v9.4h6.1v-6h5.8v6H21v-9.4l-9-7.2zm0-2.2 11 8.6V22H1V9.6L12 1z"
            />
          </svg>
          <span>Home</span>
        </a>
        <a href="/resume" class={`dock-item ${isActive('/resume') ? 'is-active' : ''}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 1.8V9h4.2L14 4.8zM7.5 12h9v1.5h-9V12zm0 3.5h9V17h-9v-1.5z"
            />
          </svg>
          <span>Resume</span>
        </a>
        <a href="/service" class={`dock-item ${isActive('/service') ? 'is-active' : ''}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M4 6.5A2.5 2.5 0 0 1 6.5 4H9l1.2 2H17.5A2.5 2.5 0 0 1 20 8.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6.5zm2.5-.5a1 1 0 0 0-1 1V9h14V8.5a1 1 0 0 0-1-1H9.4l-1.2-2H6.5z"
            />
          </svg>
          <span>Service</span>
        </a>
        <a href="/contact" class={`dock-item ${isActive('/contact') ? 'is-active' : ''}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6zm2 0 7 4.5L19 6H5zm14 12V8.3l-7 4.5-7-4.5V18h14z"
            />
          </svg>
          <span>Contact</span>
        </a>
        <div class="dock-social-wrap">
          <button class="dock-item dock-social" type="button" aria-haspopup="true" aria-expanded="false">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0-4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
              />
            </svg>
            <span>Social</span>
          </button>
          <div class="dock-popover" aria-hidden="true">
            <a class="dock-popover-item" href="https://x.com/theabxguy" target="_blank" rel="noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M18.244 2H21.6l-7.53 8.61L22.5 22h-6.6l-5.17-6.63L4.9 22H1.5l8.06-9.21L1.5 2h6.75l4.67 6.05L18.24 2z"
                />
              </svg>
            </a>
            <a class="dock-popover-item" href="https://instagram.com/_abixnash_" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="17.5" cy="6.5" r="1"></circle>
              </svg>
            </a>
            <a class="dock-popover-item" href="https://linkedin.com/in/abinash-selvarasu" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.6h.05c.53-1 1.83-2.1 3.75-2.1C20 8.5 21 10.7 21 14v7h-4v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9z"
                />
              </svg>
            </a>
            <a class="dock-popover-item" href="https://github.com/AbiXnash" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.58 2 12.28c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.4-3.37-1.4-.45-1.16-1.1-1.47-1.1-1.47-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.82c0 .26.18.58.69.48A10.3 10.3 0 0 0 22 12.28C22 6.58 17.52 2 12 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
});
