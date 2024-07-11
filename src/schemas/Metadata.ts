import { z } from "astro:content"
import { BioSchema } from "./Bio"
import { NavigationSchema } from "./Navigation"
import { ContactSchema } from "./Contact"
export const MetadataSchema = z.object({
    author: z.object({
      name: z.string(),
      email: z.string().email(),
      username: z.string(),
    }),
    description: z.string(),
    repo: z.string(),
    navigation: z.array(NavigationSchema),
    profile: z.object({
      bio: z.array(BioSchema),
      contact: z.array(ContactSchema),
    })
})
export type Metadata = z.infer<typeof MetadataSchema>
