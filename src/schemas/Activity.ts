import { z } from "astro:content"
export const ActivitySchema = z.object({
    type: z.string(),
})
export type Activity = z.infer<typeof ActivitySchema>