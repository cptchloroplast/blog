import type { ExecutionContext, ScheduledController } from "@cloudflare/workers-types"
import type { Environment } from "../env"
import { drizzle } from "drizzle-orm/d1"
import { ComponentsTable, GearTable } from "@schemas/strava"
import { eq } from "drizzle-orm"
import type { Gear } from "@schemas/strava"

const GearRegex = /gear\/([b0-9]+).meta.json/

export default {
    async scheduled(controller: ScheduledController, env: Environment, ctx: ExecutionContext) {
        const gear = await env.STRAVA.list({ prefix: "gear" })
        for (const object of gear.objects) {
            const key = object.key
            const id = GearRegex.exec(key)?.[1]
            if (!id) {
                console.log("Unable to extract id from key", key)
                continue
            }
            const db = drizzle(env.DB)
            const [entry] = await db.select().from(GearTable).where(eq(GearTable.id, id))
            if (!entry) {
                const body = await env.STRAVA.get(key)
                if (!body) {
                    console.log("This should never happen...", key)
                    continue
                }
                const json = await body.json<Gear>()
                await db.insert(GearTable).values({ ...json, slug: json.name.toLowerCase().replace(/ /g, "-")})
                console.log("Inserted new gear", id)
                for (const component of json.components) {
                    await db.insert(ComponentsTable).values({ ...component, gear_id: id })
                    console.log("Inserted new component", component.id)
                }
            }
        }
    }
}