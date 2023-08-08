import { MarkdownInstance } from "astro"

export function sortPosts(a: MarkdownInstance<Post>, b: MarkdownInstance<Post>) {
  const dateA = a.frontmatter.updated ?? a.frontmatter.published
  const dateB = b.frontmatter.updated ?? b.frontmatter.published
  return dateA < dateB ? 1 : -1
}
