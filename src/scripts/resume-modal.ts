import { site } from "../config/site";

const STATE_KEY = "resumeModal";

/**
 * Opens the resume preview dialog for any link that points at the resume PDF.
 * Without JS the links still work as plain PDF downloads.
 */
export function setupResumeModal() {
  const dialog = document.getElementById("resume-modal") as HTMLDialogElement | null;
  if (!dialog || dialog.dataset.bound === "true") return;
  dialog.dataset.bound = "true";

  const img = dialog.querySelector<HTMLImageElement>(".resume-modal__img");
  const page = dialog.querySelector<HTMLElement>(".resume-modal__page");
  const body = dialog.querySelector<HTMLElement>(".resume-modal__body");
  let opener: HTMLElement | null = null;

  function loadPreview() {
    if (!img || img.getAttribute("src")) return;
    img.addEventListener(
      "load",
      () => page?.classList.add("is-loaded"),
      { once: true },
    );
    img.src = dialog!.dataset.previewSrc ?? "";
  }

  function open(trigger: HTMLElement | null) {
    if (dialog!.open) return;
    opener = trigger;
    loadPreview();
    dialog!.showModal();
    document.documentElement.classList.add("modal-open");
    if (body) body.scrollTop = 0;
    // Let the hardware/gesture back button close the dialog on mobile.
    history.pushState({ [STATE_KEY]: true }, "");
  }

  function close() {
    if (dialog!.open) dialog!.close();
  }

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("modal-open");
    if (history.state?.[STATE_KEY]) history.back();
    opener?.focus({ preventScroll: true });
    opener = null;
  });

  // Close on backdrop click (the dialog element itself is the backdrop area).
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });

  dialog
    .querySelectorAll<HTMLElement>("[data-resume-close]")
    .forEach((btn) => btn.addEventListener("click", close));

  window.addEventListener("popstate", () => {
    if (dialog.open) dialog.close();
  });

  const resumePath = new URL(site.resumeUrl, location.origin).pathname;

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = (event.target as Element | null)?.closest?.("a[href]");
    if (!(link instanceof HTMLAnchorElement)) return;
    if (dialog.contains(link)) return;
    if (link.origin !== location.origin || link.pathname !== resumePath) return;

    event.preventDefault();
    open(link);
  });

  if (location.hash === "#resume") open(null);
}
