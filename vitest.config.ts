import path from "node:path"
import { buildPagesASSETSBinding, defineWorkersConfig, readD1Migrations } from "@cloudflare/vitest-pool-workers/config"
import tsconfigPaths from "vite-tsconfig-paths"
const assetsPath = path.join(__dirname, "dist")
const migrationsPath = path.join(__dirname, "migrations")
export default defineWorkersConfig(async function () {
  const migrations = await readD1Migrations(migrationsPath)
  return {
    plugins: [tsconfigPaths()],
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
