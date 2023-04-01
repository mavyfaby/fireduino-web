const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Roboto", "sans-serif"],
      }
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".primary": {
          color: "var(--md-sys-color-primary)",
        },
        ".on-primary": {
          color: "var(--md-sys-color-on-primary)",
        },
        ".primary-container": {
          color: "var(--md-sys-color-primary-container)",
        },
        ".on-primary-container": {
          color: "var(--md-sys-color-on-primary-container)",
        },
        ".secondary": {
          color: "var(--md-sys-color-secondary)",
        },
        ".on-secondary": {
          color: "var(--md-sys-color-on-secondary)",
        },
        ".secondary-container": {
          color: "var(--md-sys-color-secondary-container)",
        },
        ".on-secondary-container": {
          color: "var(--md-sys-color-on-secondary-container)",
        },
        ".tertiary": {
          color: "var(--md-sys-color-tertiary)",
        },
        ".on-tertiary": {
          color: "var(--md-sys-color-on-tertiary)",
        },
        ".tertiary-container": {
          color: "var(--md-sys-color-tertiary-container)",
        },
        ".on-tertiary-container": {
          color: "var(--md-sys-color-on-tertiary-container)",
        },
        ".error": {
          color: "var(--md-sys-color-error)",
        },
        ".on-error": {
          color: "var(--md-sys-color-on-error)",
        },
        ".error-container": {
          color: "var(--md-sys-color-error-container)",
        },
        ".on-error-container": {
          color: "var(--md-sys-color-on-error-container)",
        },
        ".background": {
          color: "var(--md-sys-color-background)",
        },
        ".on-background": {
          color: "var(--md-sys-color-on-background)",
        },
        ".surface": {
          color: "var(--md-sys-color-surface)",
        },
        ".on-surface": {
          color: "var(--md-sys-color-on-surface)",
        },
        ".surface-variant": {
          color: "var(--md-sys-color-surface-variant)",
        },
        ".on-surface-variant": {
          color: "var(--md-sys-color-on-surface-variant)", 
        },
        ".outline": {
          color: "var(--md-sys-color-outline)",
        },
        ".outline-variant": {
          color: "var(--md-sys-color-outline-variant)",
        },
        ".shadow": {
          color: "var(--md-sys-color-shadow)",
        },
        ".scrim": {
          color: "var(--md-sys-color-scrim)",
        },
        ".inverse-surface": {
          color: "var(--md-sys-color-inverse-surface)",
        },
        ".inverse-on-surface": {
          color: "var(--md-sys-color-inverse-on-surface)",
        },
        ".inverse-primary": {
          color: "var(--md-sys-color-inverse-primary)",
        },
        ".bg-primary": {
          backgroundColor: "var(--md-sys-color-primary)",
        },
        ".bg-on-primary": {
          backgroundColor: "var(--md-sys-color-on-primary)",
        },
        ".bg-primary-container": {
          backgroundColor: "var(--md-sys-color-primary-container)",
        },
        ".bg-on-primary-container": {
          backgroundColor: "var(--md-sys-color-on-primary-container)",
        },
        ".bg-secondary": {
          backgroundColor: "var(--md-sys-color-secondary)",
        },
        ".bg-on-secondary": {
          backgroundColor: "var(--md-sys-color-on-secondary)",
        },
        ".bg-secondary-container": {
          backgroundColor: "var(--md-sys-color-secondary-container)",
        },
        ".bg-on-secondary-container": {
          backgroundColor: "var(--md-sys-color-on-secondary-container)",
        },
        ".bg-tertiary": {
          backgroundColor: "var(--md-sys-color-tertiary)",
        },
        ".bg-on-tertiary": {
          backgroundColor: "var(--md-sys-color-on-tertiary)",
        },
        ".bg-tertiary-container": {
          backgroundColor: "var(--md-sys-color-tertiary-container)",
        },
        ".bg-on-tertiary-container": {
          backgroundColor: "var(--md-sys-color-on-tertiary-container)",
        },
        ".bg-error": {
          backgroundColor: "var(--md-sys-color-error)",
        },
        ".bg-on-error": {
          backgroundColor: "var(--md-sys-color-on-error)",
        },
        ".bg-error-container": {
          backgroundColor: "var(--md-sys-color-error-container)",
        },
        ".bg-on-error-container": {
          backgroundColor: "var(--md-sys-color-on-error-container)",
        },
        ".bg-background": {
          backgroundColor: "var(--md-sys-color-background)",
        },
        ".bg-on-background": {
          backgroundColor: "var(--md-sys-color-on-background)",
        },
        ".bg-surface": {
          backgroundColor: "var(--md-sys-color-surface)",
        },
        ".bg-on-surface": {
          backgroundColor: "var(--md-sys-color-on-surface)",
        },
        ".bg-surface-variant": {
          backgroundColor: "var(--md-sys-color-surface-variant)",
        },
        ".bg-on-surface-variant": {
          backgroundColor: "var(--md-sys-color-on-surface-variant)", 
        },
        ".bg-outline": {
          backgroundColor: "var(--md-sys-color-outline)",
        },
        ".bg-outline-variant": {
          backgroundColor: "var(--md-sys-color-outline-variant)",
        },
        ".bg-shadow": {
          backgroundColor: "var(--md-sys-color-shadow)",
        },
        ".bg-scrim": {
          backgroundColor: "var(--md-sys-color-scrim)",
        },
        ".bg-inverse-surface": {
          backgroundColor: "var(--md-sys-color-inverse-surface)",
        },
        ".bg-inverse-on-surface": {
          backgroundColor: "var(--md-sys-color-inverse-on-surface)",
        },
        ".bg-inverse-primary": {
          backgroundColor: "var(--md-sys-color-inverse-primary)",
        }
      });
    })
  ] 
}

