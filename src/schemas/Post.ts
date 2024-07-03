import { z } from "astro:content"
export const PostSchema = z.object({
    title: z.string(),
    type: z.enum(["post", "photo"])
})
