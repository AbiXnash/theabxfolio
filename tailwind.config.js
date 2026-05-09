/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        pixel: ['"Press Start 2P"', "monospace"],
      },
      colors: {
        gruv: {
          bg: "#1d2021",
          surface: "#282828",
          border: "#3c3836",
          text: "#ebdbb2",
          muted: "#928374",
          green: "#b8bb26",
          blue: "#83a598",
          purple: "#d3869b",
          yellow: "#fabd2f",
          orange: "#fe8019",
          red: "#fb4934",
        },
      },
      boxShadow: {
        premium: "0 20px 50px rgba(0, 0, 0, 0.3)",
        "premium-hover": "0 30px 60px rgba(0, 0, 0, 0.4)",
      },
      borderRadius: {
        apple: "2.5rem",
      },
      letterSpacing: {
        tightest: "-0.06em",
      },
    },
  },
  plugins: [],
};
