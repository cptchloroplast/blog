import EnvironmentPlugin from "vite-plugin-environment"
import svelte from "@astrojs/svelte"
import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare"
import sentry from "@sentry/astro"


export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: {
      enabled: true
    },
  }),
  site: "https://ben.okkema.org",
  server: {
    port: 5000
  },
  integrations: [svelte(), sentry()],
  vite: {
    plugins: [EnvironmentPlugin(["HCAPTCHA_SITEKEY"])],
    ssr: {
      noExternal: ["@okkema/worker"],
      external: ["node:async_hooks"]
    }
  },
})