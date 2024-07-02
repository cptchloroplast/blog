import { MarkdownInstance } from "astro"
import { z } from "astro:content"
import  {rssSchema} from "@astrojs/rss"

export function sortPosts(a: MarkdownInstance<Post>, b: MarkdownInstance<Post>) {
  const dateA = a.frontmatter.updated ?? a.frontmatter.published
  const dateB = b.frontmatter.updated ?? b.frontmatter.published
  return dateA < dateB ? 1 : -1
}

type rss = z.infer<typeof rssSchema>