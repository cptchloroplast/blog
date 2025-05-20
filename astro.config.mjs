import EnvironmentPlugin from "vite-plugin-environment"
import svelte from "@astrojs/svelte"
import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare"

const builtins = [
  "async_hooks",
  "child_process",
  "diagnostics_channel",
  "events",
  "fs",
  "http",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "readline",
  "stream",
  "tls",
  "url",
  "util",
  "worker_threads",
  "zlib",
]

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
  integrations: [svelte()],
  vite: {
    plugins: [EnvironmentPlugin(["HCAPTCHA_SITEKEY"])],
    ssr: {
      noExternal: ["@okkema/worker", "@okkema/email"],
      external: [...builtins, ...builtins.map(module => `node:${module}`)]
    }
  },
})