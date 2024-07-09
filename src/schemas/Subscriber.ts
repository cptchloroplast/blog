import { z } from "astro:content"
export const SubscriberSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    subscribed: z.date(),
    confirmed: z.date().optional(),
})
export type Subscriber = z.infer<typeof SubscriberSchema>
