import type { Theme, Scheme } from "@material/material-color-utilities";
import { argbFromHex, themeFromSourceColor, applyTheme, hexFromArgb, rgbaFromArgb } from "@material/material-color-utilities";
import { setStore, getStore } from "~/utils/storage";
import { map } from "~/utils/string";
import { useStore } from "~/store";
import { THEME_COLOR } from "~/env";

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

  // Light background (default)
  let background = theme.schemes.light.background;

  // If dark mode
  if (store.dark) {
    background = theme.schemes.dark.background;
  }

  // Apply meta color theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", hexFromArgb(background));
  // Apply theme
  applyCustomTheme(theme, { target: document.documentElement, dark: store.dark });
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
 * Apply a theme to an element
 *
 * @param theme Theme object
 * @param options Options
 */
export function applyCustomTheme(theme: Theme, options?: {
  dark?: boolean,
  target?: HTMLElement,
  brightnessSuffix?: boolean,
  paletteTones?: number[],
}) {
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

function setSchemeProperties(
    target: HTMLElement,
    scheme: Scheme,
    suffix: string = '',
) {
  for (const [key, value] of Object.entries(scheme.toJSON())) {
    const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const color = hexFromArgb(value);

    target.style.setProperty(`--md-sys-color-${token}${suffix}`, color);

    let generate = true;

    for (const t of ['outline', 'inverse', 'shadow', 'scrim']) {
      if (token.includes(t)) {
        generate = false;
        break;
      }
    }

    if (!generate) continue;

    // Tones must be in-sync in tailwind config
    for (const tone of [25, 50, 75]) {
      // Set property
      target.style.setProperty(
        `--md-sys-color-${token}${suffix}-${tone}`,
        // Map tone to 0-255
        color + (map(tone, 0, 100, 0, 255) * 255).toString(16).slice(0, 2)
      );
    }
  }
}