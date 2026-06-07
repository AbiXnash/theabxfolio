export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(STORAGE_KEY, theme);
  syncThemeToggleUI();
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