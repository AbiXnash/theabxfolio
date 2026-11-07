export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage blocked: theme still applies for this page */
  }
  syncThemeToggleUI();
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // One smooth crossfade of the whole page instead of every colour animating separately.
  if (!document.startViewTransition || reduce) {
    applyTheme(theme);
    return;
  }
  root.classList.add("vt-theme");
  const transition = document.startViewTransition(() => applyTheme(theme));
  transition.finished.finally(() => root.classList.remove("vt-theme"));
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

function syncThemeToggleUI() {
  const isDark = getTheme() === "dark";

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );

    const lightIcon = button.querySelector(".theme-icon-light");
    const darkIcon = button.querySelector(".theme-icon-dark");

    lightIcon?.classList.toggle("hidden", isDark);
    darkIcon?.classList.toggle("hidden", !isDark);
  });
}

export function setupThemeToggle() {
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    if (button.getAttribute("data-theme-bound") === "true") return;
    button.setAttribute("data-theme-bound", "true");
    button.addEventListener("click", toggleTheme);
  });

  syncThemeToggleUI();
}