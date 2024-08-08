import { z } from "zod"
import { IconSchema } from "./Icon"
export const ContactSchema = z.object({
    icon: IconSchema,
    href: z.string(),
    title: z.string(),
})
export type Contact = z.infer<typeof ContactSchema>
