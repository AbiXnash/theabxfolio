// @ts-check
import netlify from "@astrojs/netlify";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://theabx.in",
  integrations: [sitemap()],
  output: "server",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
});
