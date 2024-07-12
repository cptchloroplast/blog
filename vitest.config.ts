import path from "node:path"
import { buildPagesASSETSBinding, defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config"
const assetsPath = path.join(__dirname, "dist")
export default defineWorkersConfig(async function () {
  return {
    test: {
      poolOptions: {
        workers: {
          wrangler: { configPath: "./wrangler.toml" },
          miniflare: {
            compatibilityFlags: ["nodejs_compat"],
            compatibilityDate: "2024-07-01",
            serviceBindings: {
              ASSETS: await buildPagesASSETSBinding(assetsPath),
            },
          },
        },
      },
    },
  }
})
