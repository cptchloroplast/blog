import { z } from "astro:content"
export const GearSchema = z.object({
    brand_name: z.string().nullable(),
    components: z.array(z.object({
        added: z.string().datetime(),
        brand: z.string(),
        distance: z.number(),
        id: z.string(),
        model: z.string(),
        removed: z.string().datetime().nullable(),
        type: z.string(),
    })),
    description: z.string().nullable(),
    frame_type: z.string(),
    id: z.string(),
    model_name: z.string().nullable(),
    name: z.string()
})
export type Gear = z.infer<typeof GearSchema>