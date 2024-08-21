import { relations } from "drizzle-orm"
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { z } from "zod"
export const PostSchema = z.object({
    // content: z.string(),
    description: z.string().optional(),
    published: z.date(),
    // slug: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
    type: z.enum(["post", "photo"]),
    updated: z.date().nullable().optional(),
})
export type Post = z.infer<typeof PostSchema>
export const PostsTable = sqliteTable("posts", {
    content: text("content").notNull(),
    description: text("description"),
    published: text("published").notNull(),
    slug: text("slug").primaryKey(),
    title: text("title").notNull(),
    type: text("type", { enum: ["post", "photo"] }).notNull(),
    updated: text("updated"),
})
export const PostsRelations = relations(PostsTable, function({ many }) {
    return {
        tags: many(TagsTable),
    }
})
export const TagSchema = z.string()
export const TagsTable = sqliteTable("tags", {
    name: text("name").notNull(),
    post_slug: text("post_slug").notNull().references(function() { return PostsTable.slug })
}, function(table) {
    return {
        pk: primaryKey({ columns: [table.name, table.post_slug] })
    }
})
export type Tag = z.infer<typeof TagSchema>
export const TagsRelations = relations(TagsTable, function({ one }) {
    return {
        post: one(PostsTable, {
            fields: [TagsTable.post_slug],
            references: [PostsTable.slug],
        })
    }
})