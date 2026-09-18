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
          peach: {
            50: "#FDF7F4",
            100: "#FCE9DE",
            200: "#F8D8C8",
            300: "#F2C2AD",
            400: "#E8A78F",
            500: "#D9886D",
            DEFAULT: "#F8D8C8",
          },
          nude: {
            50: "#FAF6F1",
            100: "#F5EBE1",
            200: "#E8C7B7",
            300: "#D9B19D",
            400: "#C79A83",
            DEFAULT: "#E8C7B7",
          },
          blush: {
            50: "#FCF8F8",
            100: "#F9E9E6",
            200: "#F6D6D5",
            300: "#EFC1C0",
            400: "#E8B7B5",
            500: "#DFA6A4",
            DEFAULT: "#E8B7B5",
          },
          rose: {
            light: "#DFA6A4",
            DEFAULT: "#B97878",
            medium: "#A35F5F",
            deep: "#8C4A4A",
            dark: "#683232",
          },
          ivory: {
            50: "#FFFEFD",
            100: "#FFFDF9",
            DEFAULT: "#FAF7F2",
            warm: "#F5EDE3",
            dark: "#EBDCCB",
          },
          champagne: {
            light: "#FAF2E3",
            DEFAULT: "#E6C88A",
            accent: "#D4AF65",
            dark: "#A38038",
          },
          charcoal: {
            50: "#6B5D5B",
            100: "#4D3F3D",
            DEFAULT: "#292321",
            dark: "#1A1514",
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
        subtle: "0 2px 15px -3px rgba(41, 35, 33, 0.04), 0 4px 6px -4px rgba(41, 35, 33, 0.02)",
        luxury: "0 10px 30px -5px rgba(232, 183, 181, 0.15), 0 20px 25px -5px rgba(41, 35, 33, 0.04)",
        glow: "0 0 25px rgba(232, 199, 183, 0.3)",
        card: "0 4px 20px -2px rgba(232, 183, 181, 0.12), 0 2px 6px -1px rgba(41, 35, 33, 0.03)",
      },
    },
  },
  plugins: [],
};

export default config;
