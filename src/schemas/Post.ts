import { z } from "astro:content"
export const PostSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(["post", "photo"]),
    published: z.date(),
    updated: z.date().optional(),
    tags: z.string(),
    url: z.string(),
})
export type Post = z.infer<typeof PostSchema>