import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "sqlite",
    schema: ["./src/schemas/strava/tables.ts"],
    out: "./migrations"
})