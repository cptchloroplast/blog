import type { Environment } from "src/env"
import type { D1Migration } from "cloudflare:test"
declare module "cloudflare:test" {
    interface ProvidedEnv extends Environment {
      TEST_MIGRATIONS: D1Migration[]
    }
  }