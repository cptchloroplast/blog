import type { D1Database, ExecutionContext, R2Bucket, ScheduledController } from "@cloudflare/workers-types"
import type { Environment } from "@env"
import type { Gear } from "@schemas/strava"
import { GearService, PostService } from "@services"
import { parseMarkdown } from "@utils"
import * as Sentry from "@sentry/cloudflare"

const GearRegex = /gear\/([b0-9]+).meta.json/
const PostsRegex = /posts\/([A-Za-z0-9\-]+).md/

async function processBuckets(blog: R2Bucket, strava: R2Bucket, db: D1Database) {
    const posts = await blog.list({ prefix: "posts" })
    for (const object of posts.objects) {
        const key = object.key
        const slug = PostsRegex.exec(key)?.[1]
        if (!slug) {
            console.log("Unable to extract slug from key", key)
            continue
        }
        const body = await blog.get(key)
        const raw = await body!.text()
        const post = parseMarkdown(raw, slug)
        const service = PostService(db)
        await service.upsert(post)
    }
    
    const gear = await strava.list({ prefix: "gear" })
    for (const object of gear.objects) {
        const key = object.key
        const id = GearRegex.exec(key)?.[1]
        if (!id) {
            console.log("Unable to extract id from key", key)
            continue
        }
        const body = await strava.get(key)
        if (!body) {
            console.log("This should never happen...", key)
            continue
        }
        const gear = await body.json<Gear>()
        const service = GearService(db)
        await service.upsert(gear)
    }
}

export default Sentry.withSentry(function(env) {
    return {
        dsn: env.SENTRY_DSN
    }
}, {
    async scheduled(controller: ScheduledController, env: Environment, ctx: ExecutionContext) {
        const db = Sentry.instrumentD1WithSentry(env.DB)
        ctx.waitUntil(processBuckets(env.BLOG, env.STRAVA, db))
    }
})