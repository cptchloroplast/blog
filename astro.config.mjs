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
  integrations: [svelte(), sentry({ 
    sourceMapsUploadOptions: { 
      enabled: false 
    }
  })],
  vite: {
    plugins: [EnvironmentPlugin(["HCAPTCHA_SITEKEY"])],
    ssr: {
      noExternal: ["@okkema/worker"],
      external: [
        "node:async_hooks",
        "node:fs",
        "node:path",
        "node:readline",
        "node:child_process",
        "node:os",
        "node:util",
        "node:diagnostics_channel",
        "node:http",
        "node:util",
        "node:worker_threads",
        "util",
        "async_hooks",
        "events",
        "diagnostics_channel",
      ]
    }
  },
})