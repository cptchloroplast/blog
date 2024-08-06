import type { ExecutionContext, ScheduledController } from "@cloudflare/workers-types"
import type { Environment } from "@env"
import type { Gear } from "@schemas/strava"
import { GearService } from "@services"

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
            const body = await env.STRAVA.get(key)
            if (!body) {
                console.log("This should never happen...", key)
                continue
            }
            const gear = await body.json<Gear>()
            const service = GearService(env.DB)
            await service.upsert(gear)
        }
    }
}