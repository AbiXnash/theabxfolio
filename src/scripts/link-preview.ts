const SHOW_DELAY = 360;
const HIDE_DELAY = 80;

interface PreviewData {
  title: string;
  description?: string;
  image?: string;
  domain?: string;
}

function canHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function pageGutterPx() {
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;visibility:hidden;pointer-events:none;padding-left:var(--page-gutter)";
  document.documentElement.appendChild(probe);
  const px = parseFloat(getComputedStyle(probe).paddingLeft) || 24;
  probe.remove();
  return px;
}

function readPreviewData(link: HTMLAnchorElement): PreviewData | null {
  const title = link.dataset.previewTitle?.trim();
  if (!title) return null;

  return {
    title,
    description: link.dataset.previewDescription?.trim(),
    image: link.dataset.previewImage?.trim(),
    domain: link.dataset.previewDomain?.trim(),
  };
}

function faviconUrl(domain: string) {
  if (domain === "email") {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230a84ff' stroke-width='1.75'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cpath d='m3 7 9 6 9-6'/%3E%3C/svg%3E";
  }

  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
}

export function setupLinkPreviews() {
  if (!canHover()) return;

  let card: HTMLDivElement | null = null;
  let domainEl: HTMLElement | null = null;
  let titleEl: HTMLElement | null = null;
  let descriptionEl: HTMLElement | null = null;
  let imageEl: HTMLImageElement | null = null;
  let imageWrap: HTMLElement | null = null;
  let iconEl: HTMLImageElement | null = null;
  let showTimer: ReturnType<typeof setTimeout> | undefined;
  let hideTimer: ReturnType<typeof setTimeout> | undefined;
  let activeLink: HTMLAnchorElement | null = null;

  function ensureCard() {
    if (card) return card;

    card = document.createElement("div");
    card.className = "link-preview";
    card.setAttribute("role", "tooltip");
    card.setAttribute("aria-hidden", "true");
    card.innerHTML = `
      <div class="link-preview-image-wrap" hidden>
        <img class="link-preview-image" alt="" loading="lazy" decoding="async" />
      </div>
      <div class="link-preview-body">
        <div class="link-preview-meta">
          <img class="link-preview-icon" alt="" width="16" height="16" loading="lazy" decoding="async" />
          <span class="link-preview-domain"></span>
        </div>
        <p class="link-preview-title"></p>
        <p class="link-preview-description"></p>
      </div>
    `;

    document.body.appendChild(card);

    imageWrap = card.querySelector(".link-preview-image-wrap");
    imageEl = card.querySelector(".link-preview-image");
    domainEl = card.querySelector(".link-preview-domain");
    titleEl = card.querySelector(".link-preview-title");
    descriptionEl = card.querySelector(".link-preview-description");
    iconEl = card.querySelector(".link-preview-icon");

    return card;
  }

  function clearTimers() {
    if (showTimer) clearTimeout(showTimer);
    if (hideTimer) clearTimeout(hideTimer);
    showTimer = undefined;
    hideTimer = undefined;
  }

  function positionCard(link: HTMLAnchorElement) {
    if (!card) return;

    const rect = link.getBoundingClientRect();
    const margin = pageGutterPx();
    const cardRect = card.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = rect.top - cardRect.height - margin;
    if (top < margin) {
      top = rect.bottom + margin;
    }

    let left = rect.left + rect.width / 2 - cardRect.width / 2;
    left = Math.max(
      margin,
      Math.min(left, viewportWidth - cardRect.width - margin),
    );

    if (top + cardRect.height > viewportHeight - margin) {
      top = Math.max(margin, viewportHeight - cardRect.height - margin);
    }

    card.style.top = `${top}px`;
    card.style.left = `${left}px`;
  }

  function renderPreview(link: HTMLAnchorElement, data: PreviewData) {
    const el = ensureCard();
    if (!domainEl || !titleEl || !descriptionEl || !iconEl || !imageEl || !imageWrap) {
      return;
    }

    const domain = data.domain ?? "link";
    domainEl.textContent = domain;
    titleEl.textContent = data.title;
    iconEl.src = faviconUrl(domain);
    iconEl.alt = "";

    if (data.description) {
      descriptionEl.textContent = data.description;
      descriptionEl.hidden = false;
    } else {
      descriptionEl.textContent = "";
      descriptionEl.hidden = true;
    }

    if (data.image) {
      imageEl.src = data.image;
      imageWrap.hidden = false;
    } else {
      imageEl.removeAttribute("src");
      imageWrap.hidden = true;
    }

    el.classList.add("is-visible");
    el.setAttribute("aria-hidden", "false");
    positionCard(link);
    requestAnimationFrame(() => positionCard(link));
  }

  function hidePreview() {
    clearTimers();
    card?.classList.remove("is-visible");
    card?.setAttribute("aria-hidden", "true");
    activeLink = null;
  }

  function scheduleShow(link: HTMLAnchorElement, data: PreviewData) {
    clearTimers();
    showTimer = setTimeout(() => {
      activeLink = link;
      renderPreview(link, data);
    }, SHOW_DELAY);
  }

  function scheduleHide() {
    clearTimers();
    hideTimer = setTimeout(hidePreview, HIDE_DELAY);
  }

  function isPointerOverLink(link: HTMLAnchorElement, x: number, y: number) {
    const target = document.elementFromPoint(x, y);
    return Boolean(target && (link === target || link.contains(target)));
  }

  function bindLink(link: HTMLAnchorElement) {
    if (link.dataset.linkPreviewBound === "true") return;
    link.dataset.linkPreviewBound = "true";

    const show = () => {
      const data = readPreviewData(link);
      if (!data) return;
      scheduleShow(link, data);
    };

    const hide = () => {
      if (activeLink === link) {
        scheduleHide();
        return;
      }

      clearTimers();
    };

    link.addEventListener("pointerenter", show);
    link.addEventListener("pointerleave", hide);
    link.addEventListener("pointercancel", hide);
    link.addEventListener("focus", () => {
      if (!link.matches(":focus-visible")) return;
      show();
    });
    link.addEventListener("blur", hide);
  }

  function bindAll(root: ParentNode = document) {
    root
      .querySelectorAll<HTMLAnchorElement>("a[data-link-preview]")
      .forEach(bindLink);
  }

  bindAll();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches("a[data-link-preview]")) {
          bindLink(node);
        }
        bindAll(node);
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener(
    "pointermove",
    (event) => {
      if (!activeLink || !card?.classList.contains("is-visible")) return;
      if (!isPointerOverLink(activeLink, event.clientX, event.clientY)) {
        hidePreview();
      }
    },
    { passive: true },
  );

  document.addEventListener("pointerdown", (event) => {
    if (!activeLink || !card?.classList.contains("is-visible")) return;
    const target = event.target;
    if (target instanceof Node && activeLink.contains(target)) return;
    hidePreview();
  });

  window.addEventListener(
    "scroll",
    () => {
      if (card?.classList.contains("is-visible")) {
        hidePreview();
      }
    },
    { passive: true },
  );

  window.addEventListener("resize", () => {
    if (activeLink && card?.classList.contains("is-visible")) {
      positionCard(activeLink);
    }
  });

  window.addEventListener("blur", hidePreview);
}