/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        ide: {
          bg: "#1e1e2e",
          sidebar: "#181825",
          activity: "#11111b",
          border: "#313244",
          highlight: "#313244",
          text: "#cdd6f4",
          comment: "#6c7086",
          keyword: "#cba6f7",
          string: "#a6e3a1",
          function: "#89b4fa",
          variable: "#f38ba8",
          number: "#fab387",
          accent: "#89dceb",
        },
      },
    },
  },
  plugins: [],
};
