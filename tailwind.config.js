/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/**/*.html",
    "./frontend/src/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading:  ["'Playfair Display'", "Georgia", "serif"],
        display:  ["'Amatic SC'", "cursive"],
        sans:     ["'Nunito'", "'Helvetica Neue'", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        caseado: {
          /* Turquesa principal (botões, links, destaques) */
          "primary":          "#2C8C91",
          "primary-focus":    "#1d6b6f",
          "primary-content":  "#ffffff",

          /* Rosa artesanal (badges, accents, hovers) */
          "secondary":        "#C96B9A",
          "secondary-focus":  "#b35587",
          "secondary-content":"#ffffff",

          /* Turquesa vivo (accent / header bg) */
          "accent":           "#48C7C7",
          "accent-focus":     "#33b3b3",
          "accent-content":   "#1a4a4d",

          /* Neutro escuro (footer) */
          "neutral":          "#1a4a4d",
          "neutral-focus":    "#0f2f31",
          "neutral-content":  "#DDF4F6",

          /* Base */
          "base-100":         "#ffffff",
          "base-200":         "#DDF4F6",
          "base-300":         "#CFE7D8",
          "base-content":     "#1a4a4d",

          "info":    "#0ea5e9",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error":   "#ef4444",
        },
      },
    ],
  },
};
