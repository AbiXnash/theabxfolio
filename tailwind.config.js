/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "system-ui", "sans-serif"],
      },
      colors: {
        game: {
          bg: "#1a1c2c",
          text: "#f4f4f4",
          border: "#f4f4f4",
          primary: "#e43b44",
          secondary: "#3b5dc9",
        },
      },
    },
  },
  plugins: [],
};
