import { defineCollection } from "astro:content"
import { PostSchema } from "@schemas"
const PostCollection = defineCollection({
    type: "content",
    schema: PostSchema,
})
export const collections = {
    "posts": PostCollection,
}