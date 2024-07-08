import { z } from "astro:content"
import { IconSchema } from "./Icon"
export const BioSchema = z.object({
    icon: IconSchema,
    text: z.string(),
    link: z.object({
      href: z.string(),
      text: z.string(),
    }).optional(),
})
export type Bio = z.infer<typeof BioSchema>
