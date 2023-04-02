import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";
import { setStore, getStore } from "~/utils/storage";
import { useStore } from "~/store";
import { THEME_COLOR } from "../env";

/**
 * Set theme color
 * @param {string} color Theme color
 * @param {boolean | null} isDarkOverride Override dark mode
 */
export function setTheme(color, isDarkOverride) {
  // Generate theme from theme builder
  const theme = themeFromSourceColor(argbFromHex(color));
  // Check if the user has dark mode turned on
  const isDark = isDarkOverride === null ? isDarkMode() : isDarkOverride;
  // Get store
  const store = useStore();

  // Set dark mode theme
  setStore("dark", isDark ? 1 : 0);
  // Set store dark
  store.dark = isDark;

  // If first time open
  if (isDark === null) {
    // Get system dark mode preference
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Set theme to dark
    setStore("dark", isSystemDark ? 1 : 0);
    // Set store dark
    store.dark = isSystemDark;
  }

  // Apply theme
  applyTheme(theme, { target: document.documentElement, dark: store.dark });
}

/**
 * Get whether theme is in dark mode
 * @returns {boolean} Whether theme is in dark mode
 */
export function isDarkMode() {
  return getStore("dark") === null ? null : getStore("dark") === "1";
}

/**
 * Set default theme
 * @param {null | boolean} isDark Whether theme is in dark mode
 */
export function setDefaultTheme(isDark = null) {
  setTheme(THEME_COLOR, isDark);
}