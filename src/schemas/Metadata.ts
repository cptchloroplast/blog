import { z } from "zod"
import { BioSchema } from "./Bio"
import { NavigationSchema } from "./Navigation"
import { ContactSchema } from "./Contact"
export const MetadataSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    title: z.string(),
    description: z.string(),
    navigation: z.array(NavigationSchema),
    bio: z.array(BioSchema),
    contact: z.array(ContactSchema),
})
export type Metadata = z.infer<typeof MetadataSchema>
