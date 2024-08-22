import type { D1Database } from "@cloudflare/workers-types"
import { PostsTable, schema } from "@schemas"
import { drizzle } from "drizzle-orm/d1"

export async function setupEnvironment(d1: D1Database) {
    const db = drizzle(d1, { schema })
    await db.insert(PostsTable).values({
        content: "Post1 content",
        published: new Date(0).toISOString(),
        slug: "post-one",
        title: "Post1",
        type: "photo",
    })
}