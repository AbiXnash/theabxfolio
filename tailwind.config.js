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
        term: {
          bg: "#282828",
          text: "#ebdbb2", // gruvbox fg
          muted: "#928374", // gruvbox gray
          prompt: "#b8bb26", // gruvbox green
          path: "#83a598", // gruvbox blue
          branch: "#d3869b", // gruvbox purple
          command: "#fabd2f", // gruvbox yellow
          accent: "#fe8019", // gruvbox orange
          error: "#fb4934", // gruvbox red
        },
      },
    },
  },
  plugins: [],
};
