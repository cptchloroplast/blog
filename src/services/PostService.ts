import type { D1Database } from "@cloudflare/workers-types"
import { type Post, PostsTable, schema, TagsTable } from "@schemas"
import { conflictUpdateAllExcept } from "@utils"
import { asc, count, desc, eq, inArray, type InferSelectModel } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"

type PostService = {
    getBySlug(slug: string): Promise<Post | undefined>
    getEarliest(): Promise<Post | undefined>
    getLatest(): Promise<Post | undefined>
    list(): Promise<Post[]>
    listByTag(tag: string): Promise<Post[]>
    listTags(): Promise<{ name: string, count: number }[]>
    upsert(value: Post): Promise<Post>
}
type PostRecord = InferSelectModel<typeof PostsTable> & { tags: InferSelectModel<typeof TagsTable>[] }
const tags = { orderBy: TagsTable.name }
const orderBy = [desc(PostsTable.published)]
function transformPost(post?: PostRecord): Post | undefined {
    if (!post) return undefined
    return Object.entries({
        ...post, 
        description: post.description ? post.description : undefined,
        published: new Date(post.published),
        tags: post.tags.map(function(tag) { return tag.name }), 
        updated: post.updated ? new Date(post.updated) : undefined,
    }).reduce(function(prev, [key, value]) {
        if (value !== undefined) prev[key] = value
        return prev
    }, {} as any)
}
function transformPosts(posts: PostRecord[]): Post[] {
    return posts.reduce(function(prev, curr) {
        const post = transformPost(curr)
        if (post) prev.push(post)
        return prev
    }, ([] as Post[]))
}
export function PostService(d1: D1Database): PostService {
    const db = drizzle(d1, { schema })
    return {
        async getBySlug(slug) {
            return db.query.PostsTable.findFirst({ with: { tags }, where: eq(PostsTable.slug, slug) }).then(transformPost)
        },
        async getEarliest() {
            return db.query.PostsTable.findFirst({ with: { tags }, orderBy: [asc(PostsTable.published)] }).then(transformPost) 
        },
        async getLatest() {
            return db.query.PostsTable.findFirst({ with: { tags }, orderBy }).then(transformPost)
        },
        async list() {
            return db.query.PostsTable.findMany({ with: { tags }, orderBy }).then(transformPosts)
        },
        async listByTag(tag) {
            const query = db.select({ slug: TagsTable.post_slug }).from(TagsTable).where(eq(TagsTable.name, tag))
            return db.query.PostsTable.findMany({ with: { tags }, orderBy, where: inArray(PostsTable.slug, query) }).then(transformPosts)
        },
        async listTags() {
            return db.select({ name: TagsTable.name, count: count(TagsTable.name)}).from(TagsTable).groupBy(TagsTable.name).orderBy(desc(count(TagsTable.name)), TagsTable.name)
        },
        async upsert(value) {
            const record = {
                ...value,
                published: value.published.toISOString(),
                updated: value.updated?.toISOString(),
            }
            let [post] = await db.insert(PostsTable).values(record)
                .onConflictDoUpdate({ target: PostsTable.slug, set: record })
                .returning()
            let tags: any[] = []
            if (record.tags.length) {
                tags = await db.insert(TagsTable)
                    .values(record.tags.map(function(tag) { return { name: tag, post_slug: post.slug} }))
                    .onConflictDoUpdate({ target: [TagsTable.name, TagsTable.post_slug], set: conflictUpdateAllExcept(TagsTable, []) })
                    .returning()       
            }
            const returned = post as any
            returned.tags = tags
            return transformPost(returned)!
        },
    }
}