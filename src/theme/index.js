import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";
import { THEME_COLOR } from "../env";

/**
 * Set theme color
 * @param {string} color Theme color
 */
export function setTheme(color) {
  // Generate theme from theme builder
  const theme = themeFromSourceColor(argbFromHex(color));

  // Check if the user has dark mode turned on
  const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply theme
  applyTheme(theme, { target: document.documentElement, dark: isSystemDark });
}

/**
 * Set default theme
 */
export function setDefaultTheme() {
  setTheme(THEME_COLOR);
}