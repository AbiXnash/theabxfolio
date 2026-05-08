/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        portfolio: {
          bg: '#09090b',
          surface: '#18181b',
          border: '#27272a',
          text: '#f4f4f5',
          muted: '#a1a1aa',
          accent: '#0ea5e9',
        }
      }
    },
  },
  plugins: [],
}
