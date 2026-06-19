import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        appBg: "#f3f4f7",
        primary: "#3b82f6",
        textPrimary: "#111827",
        textMuted: "#6b7280",
        figmaMuted: "#6a6a7c",
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 8px 22px rgba(17, 24, 39, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
