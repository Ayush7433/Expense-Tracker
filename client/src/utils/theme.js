// client/src/utils/theme.js

const STORAGE_KEY = "expense-tracker-theme";

/**
 * Reads the stored theme preference from localStorage.
 * Falls back to the OS-level prefers-color-scheme if nothing is stored.
 */
export const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

/**
 * Applies (or removes) the `dark` class on <html> and persists the choice.
 */
export const applyTheme = (mode) => {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  localStorage.setItem(STORAGE_KEY, mode);
};

export const THEME_STORAGE_KEY = STORAGE_KEY;
