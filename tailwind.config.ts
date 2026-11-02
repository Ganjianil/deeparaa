import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f3f9",
          100: "#dee5f2",
          200: "#bfcce3",
          300: "#9bb2d4",
          400: "#6e8ec4",
          500: "#4069b5",
          600: "#2a4b8d",
          700: "#213b73",
          800: "#1b2e5a",
          900: "#162241",
          950: "#0d1628",
        },
        surface: {
          dark: "#1e1e1e",
          darker: "#121212",
        },
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-libre-baskerville)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
