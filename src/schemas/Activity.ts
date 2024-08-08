import { z } from "zod"
export const ActivitySchema = z.object({
    type: z.string(),
})
export type Activity = z.infer<typeof ActivitySchema>