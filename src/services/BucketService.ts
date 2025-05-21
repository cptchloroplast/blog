import type { D1Database, R2Bucket } from "@cloudflare/workers-types"
import { PostService } from "./PostService"
import { parseMarkdown } from "@utils"
import { PostSchema, type Post } from "@schemas"
import type { Gear } from "@schemas/strava"
import { GearService } from "./GearService"

type BucketService = {
    processPosts(): Promise<void>
    processGear(): Promise<void>
}

const PostsRegex = /posts\/([A-Za-z0-9\-]+).md/

export function BucketService(blog: R2Bucket, strava: R2Bucket, db: D1Database): BucketService {
    return {
        async processGear() {
            const gear = await strava.list({ prefix: "gear" })
            const service = GearService(db)
            for (const object of gear.objects) {
                const key = object.key
                const body = await strava.get(key)
                const gear = await body!.json<Gear>()
                await service.upsert(gear)
            }
        },
        async processPosts() {
            const service = PostService(db)
            const posts = await blog.list({ prefix: "posts" })
            for (const object of posts.objects) {
                const key = object.key
                const slug = PostsRegex.exec(key)?.[1]!
                const body = await blog.get(key)
                const raw = await body!.text()
                const { content, frontmatter } = parseMarkdown<Post>(raw)
                const post = { ...frontmatter, content, slug }
                PostSchema.parse(post)
                await service.upsert(post)
            }
        },
    }
}