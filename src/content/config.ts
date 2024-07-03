import { defineCollection } from "astro:content"
import { PostSchema } from "../schemas/Post"
const PostCollection = defineCollection({
    type: "content",
    schema: PostSchema,
})
export const collections = {
    "post": PostCollection,
}