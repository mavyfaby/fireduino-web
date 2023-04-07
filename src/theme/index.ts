import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";
import { setStore, getStore } from "~/utils/storage";
import { useStore } from "~/store";
import { THEME_COLOR } from "../env";

/**
 * Set theme color
 */
export function setTheme(color: string, isDark: boolean) {
  // Generate theme from theme builder
  const theme = themeFromSourceColor(argbFromHex(color));
  // Get store
  const store = useStore();
  // Is first time open
  const isFirstTimeOpen = getStore("dark") === null;

  // Set dark mode theme
  setStore("dark", isDark ? "1" : "0");
  // Set store dark
  store.dark = isDark;

  // If first time open
  if (isFirstTimeOpen) {
    // Get system dark mode preference
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Set theme to dark
    setStore("dark", isSystemDark ? "1" : "0");
    // Set store dark
    store.dark = isSystemDark;
  }

  // Apply theme
  applyTheme(theme, { target: document.documentElement, dark: store.dark });
}

/**
 * If dark mode
 */
export function isDarkMode() {
  return getStore("dark") === "1";
}

/**
 * Set default theme
 */
export function setDefaultTheme(isDark: boolean = isDarkMode()) {
  setTheme(THEME_COLOR, isDark);
}
