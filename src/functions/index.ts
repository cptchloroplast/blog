import type { ExecutionContext, ScheduledController } from "@cloudflare/workers-types"
import type { Environment } from "@env"
import type { Gear } from "@schemas/strava"
import { GearService, PostService } from "@services"
import { parseMarkdown } from "@utils"

const GearRegex = /gear\/([b0-9]+).meta.json/
const PostsRegex = /posts\/([A-Za-z0-9\-]+).md/

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

        const posts = await env.BUCKET.list({ prefix: "posts" })
        for (const object of posts.objects) {
            const key = object.key
            const slug = PostsRegex.exec(key)?.[1]
            if (!slug) {
                console.log("Unable to extract slug from key", key)
                continue
            }
            const body = await env.BUCKET.get(key)
            const raw = await body!.text()
            const post = parseMarkdown(raw, slug)
            const service = PostService(env.DB)
            await service.upsert(post)
        }
    }
}