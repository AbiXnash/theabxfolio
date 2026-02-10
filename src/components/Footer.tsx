import { component$, useVisibleTask$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const year = new Date().getFullYear();
  const email = 'mailto:abinash@theabx.in';
  const github = 'https://github.com/AbiXnash';
  const linkedin = 'https://linkedin.com/in/abinash-selvarasu';
  const uptime = useSignal('uptime 00:00:00');

  useVisibleTask$(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const diff = Date.now() - start;
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      uptime.value = `uptime ${h}:${m}:${s}`;
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <footer class="footer-shell">
      <div class="footer-orb"></div>
      <div class="footer-inner">
        <div class="footer-left">
          <span class="footer-kicker">Portfolio</span>
          <div class="footer-title">Abinash S</div>
          <p class="footer-subtitle">Premium backend engineering · payments · research systems</p>
          <div class="footer-status">
            <span class="status-dot"></span>
            <span class="text-[var(--accent)]">Operational</span>
            <span class="text-white/30">·</span>
            <span id="uptime" class="text-white/40">{uptime.value}</span>
          </div>
        </div>

        <div class="footer-nav">
          <div class="footer-nav-title">Navigate</div>
          <a href="/resume"><span class="footer-icon">⎯</span>Resume</a>
          <a href="/service"><span class="footer-icon">◈</span>Service</a>
          <a href="/contact"><span class="footer-icon">✦</span>Contact</a>
        </div>

        <div class="footer-right">
          <div class="footer-nav-title">Connect</div>
          <a href={email}>
            <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6h16v12H4z"></path>
              <path d="m4 7 8 6 8-6"></path>
            </svg>
            abinash@theabx.in
          </a>
          <a href={github} target="_blank">
            <svg class="footer-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.28c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.4-3.37-1.4-.45-1.16-1.1-1.47-1.1-1.47-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.82c0 .26.18.58.69.48A10.3 10.3 0 0 0 22 12.28C22 6.58 17.52 2 12 2z"></path>
            </svg>
            GitHub
          </a>
          <a href={linkedin} target="_blank">
            <svg class="footer-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.6h.05c.53-1 1.83-2.1 3.75-2.1C20 8.5 21 10.7 21 14v7h-4v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9z"></path>
            </svg>
            LinkedIn
          </a>
          <div class="footer-copy">© {year} Abinash S</div>
        </div>
      </div>
    </footer>
  );
});
