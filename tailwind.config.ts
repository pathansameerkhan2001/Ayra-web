import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ayra: {
          blush: {
            50: "#FCF8F8",
            100: "#F9F0F0",
            200: "#F4E1E1",
            300: "#EACDCD",
            400: "#DEB2B2",
            500: "#CF9797",
            DEFAULT: "#F9EBEA",
          },
          rose: {
            light: "#E5B8B6",
            DEFAULT: "#C88A88",
            medium: "#B26E6C",
            deep: "#9C5553",
            dark: "#7A3E3C",
          },
          ivory: {
            50: "#FFFEFC",
            100: "#FFFDF9",
            DEFAULT: "#FAF7F2",
            warm: "#F5EFE6",
            dark: "#ECE2D3",
          },
          beige: {
            light: "#F5EBE6",
            DEFAULT: "#EFE7DE",
            muted: "#E2D7CC",
          },
          gold: {
            light: "#F0DFBC",
            DEFAULT: "#D4AF37",
            accent: "#C5A880",
            dark: "#A38655",
          },
          charcoal: {
            50: "#6B5E5E",
            100: "#4F4444",
            DEFAULT: "#2D2424",
            dark: "#1E1818",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "var(--font-cormorant)", "serif"],
        script: ["var(--font-alex-brush)", "cursive"],
        cormorant: ["var(--font-cormorant)", "serif"],
      },
      letterSpacing: {
        widestLuxury: "0.22em",
        ultraLuxury: "0.3em",
      },
      boxShadow: {
        subtle: "0 2px 15px -3px rgba(45, 36, 36, 0.04), 0 4px 6px -4px rgba(45, 36, 36, 0.02)",
        luxury: "0 10px 30px -5px rgba(200, 138, 136, 0.08), 0 20px 25px -5px rgba(45, 36, 36, 0.04)",
        glow: "0 0 25px rgba(200, 138, 136, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
