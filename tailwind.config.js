/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/**/*.html",
    "./frontend/src/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Playfair Display'", "Georgia", "serif"],
        sans:    ["'Nunito'", "'Helvetica Neue'", "Arial", "sans-serif"],
      },
      backgroundImage: {
        /* Padrao xadrez para o header */
        "plaid": `
          repeating-linear-gradient(90deg, rgba(13,148,136,0.10) 0 1px, transparent 1px 32px),
          repeating-linear-gradient(0deg,  rgba(13,148,136,0.10) 0 1px, transparent 1px 32px)
        `,
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        caseado: {
          /* Verde-agua (teal) como cor primaria */
          "primary":          "#0d9488",
          "primary-focus":    "#0f766e",
          "primary-content":  "#ffffff",

          /* Rosa como cor secundaria */
          "secondary":        "#f43f5e",
          "secondary-focus":  "#e11d48",
          "secondary-content":"#ffffff",

          /* Accent: teal claro */
          "accent":           "#5eead4",
          "accent-focus":     "#2dd4bf",
          "accent-content":   "#0f2f2e",

          /* Neutro: verde-escuro quase preto */
          "neutral":          "#1c3132",
          "neutral-focus":    "#0d1f1f",
          "neutral-content":  "#f0fdfa",

          /* Fundo: branco puro e variantes teal suaves */
          "base-100":         "#ffffff",
          "base-200":         "#f0fdfa",
          "base-300":         "#ccfbf1",
          "base-content":     "#1c3132",

          "info":    "#0ea5e9",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error":   "#ef4444",
        },
      },
    ],
  },
};
