// Pause decorative animations while they're off-screen (saves CPU/battery on phones).
const SELECTOR = ".viz, .ff, .glog-term, .hero-prompt";

export function setupMotion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll<HTMLElement>(SELECTOR);
  if (!targets.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const visible = entry.isIntersecting;
        el.classList.toggle("is-paused", !visible);
        // SMIL (<animateMotion>) ignores CSS play-state, so pause it directly.
        el.querySelectorAll<SVGSVGElement>("svg").forEach((svg) => {
          if (visible && !reduce) svg.unpauseAnimations?.();
          else svg.pauseAnimations?.();
        });
      }
    },
    { rootMargin: "120px 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}
