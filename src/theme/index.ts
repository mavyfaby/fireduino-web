import { argbFromHex, themeFromSourceColor, Theme, hexFromArgb, Scheme } from "@material/material-color-utilities";
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
  applyRgbTheme(theme, { target: document.documentElement, dark: store.dark });
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

/**
 * Customized version of applyTheme
 * (source: https://github.com/material-foundation/material-color-utilities/blob/main/typescript/utils/theme_utils.ts#L154)
 */
function applyRgbTheme(theme: Theme, options: any) {
  const target = options?.target || document.body;
  const isDark = options?.dark ?? false;
  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;

  setSchemeProperties(target, scheme);

  if (options?.brightnessSuffix) {
      setSchemeProperties(target, theme.schemes.dark, '-dark');
      setSchemeProperties(target, theme.schemes.light, '-light');
  }

  if (options?.paletteTones) {
      const tones = options?.paletteTones ?? [];
      for (const [key, palette] of Object.entries(theme.palettes)) {
          const paletteKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
          for (const tone of tones) {
              const token = `--md-ref-palette-${paletteKey}-${paletteKey}${tone}`;
              const color = hexFromArgb(palette.tone(tone));
              target.style.setProperty(token, color);
          }
      }
  }
}

/**
 * Set scheme properties to target
 */
function setSchemeProperties(target: HTMLElement, scheme: Scheme, suffix = '') {
  for (const [key, value] of Object.entries(scheme.toJSON())) {
      const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const color = (hexFromArgb(value));
      target.style.setProperty(`--md-sys-color-${token}${suffix}`, color);
  }
}

/**
 * Convert hex to rgb
 */
function hexToRgb(hex: string) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}