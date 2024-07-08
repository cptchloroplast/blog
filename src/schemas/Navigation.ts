import { z } from "astro:content"
import { IconSchema } from "./Icon"
const BaseNavigationSchema = z.object({
    text: z.string(),
    icon: IconSchema.optional(),
    href: z.string().optional(),
    external: z.boolean().optional(),
}) 
export const NavigationSchema = BaseNavigationSchema.extend({
  children: z.array(BaseNavigationSchema).optional()
})
export type Navigation = z.infer<typeof NavigationSchema>
