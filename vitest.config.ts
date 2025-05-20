import path from "node:path"
import { buildPagesASSETSBinding, defineWorkersConfig, readD1Migrations } from "@cloudflare/vitest-pool-workers/config"
const assetsPath = path.join(__dirname, "dist")
const migrationsPath = path.join(__dirname, "migrations")
export default defineWorkersConfig(async function () {
  const migrations = await readD1Migrations(migrationsPath)
  return {
    resolve: {
      alias: {
        "@functions": path.resolve(__dirname, "src/functions"),
        "@schemas": path.resolve(__dirname, "src/schemas"),
        "@services": path.resolve(__dirname, "src/services"),
        "@utils": path.resolve(__dirname, "src/utils"),
      }
    },
    test: {
      setupFiles: ["./test/setup.ts"],
      poolOptions: {
        workers: {
          wrangler: { configPath: "./wrangler.toml" },
          miniflare: {
            bindings: { TEST_MIGRATIONS: migrations },
            compatibilityFlags: ["nodejs_compat"],
            serviceBindings: {
              ASSETS: await buildPagesASSETSBinding(assetsPath),
            },
          },
        },
      },
    },
  }
})
