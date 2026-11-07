// Native scrolling only. Same-page anchor links (#work, /#projects…) use the
// browser's own smooth jump, landing just under the tmux bar.
const HEADER_OFFSET = 44;

// Layout position, ignoring transforms (sections are shifted while their reveal runs).
function documentTop(el: HTMLElement) {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

export function setupSmoothScroll() {
  if (document.documentElement.dataset.anchorsBound === "true") return;
  document.documentElement.dataset.anchorsBound = "true";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element | null)?.closest?.("a[href*='#']");
    if (!(link instanceof HTMLAnchorElement) || link.classList.contains("skip-link")) return;
    if (link.origin !== location.origin || link.pathname !== location.pathname) return;

    const id = decodeURIComponent(link.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target && id !== "main-content") return;

    event.preventDefault();
    window.scrollTo({
      top: target ? Math.max(0, documentTop(target) - HEADER_OFFSET) : 0,
      behavior: reduce ? "auto" : "smooth",
    });
    if (id && id !== "main-content") history.replaceState(null, "", `#${id}`);
  });
}
