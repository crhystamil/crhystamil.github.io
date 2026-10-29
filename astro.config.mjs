// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://elcerrajero.online",
  trailingSlash: "always",
  integrations: [tailwind(), react()],
  vite: {
    // Keep production dependency optimization from replacing the dev JSX runtime.
    cacheDir:
      process.env.NODE_ENV === "production"
        ? "node_modules/.vite/production"
        : "node_modules/.vite/development",
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
      },
    },
  },
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  server: {
    host: true,
    port: 4321,
  },
});
