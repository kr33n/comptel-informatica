// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://comptelinfo.com.br",
  integrations: [react(), sitemap(), partytown()],

  vite: {
    plugins: [tailwindcss()],
  },
});