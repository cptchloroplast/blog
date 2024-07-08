import { z } from "astro:content"
export const TagSchema = z.object({
    name: z.string(),
    count: z.number().int().optional(),
})
export type Tag = z.infer<typeof TagSchema>