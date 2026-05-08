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
          bg: "#000000",
          text: "#e2e8f0", // zinc-200
          muted: "#71717a", // zinc-500
          prompt: "#22c55e", // green-500
          path: "#3b82f6", // blue-500
          branch: "#a855f7", // purple-500
          command: "#eab308", // yellow-500
          accent: "#ff6b35", // theabx orange
          error: "#ef4444", // red-500
        },
      },
    },
  },
  plugins: [],
};
