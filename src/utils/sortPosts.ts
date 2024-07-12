import type { Post } from "@schemas"
export function sortPosts(a: Post, b: Post) {
  const dateA = a.updated ?? a.published
  const dateB = b.updated ?? b.published
  return dateA < dateB ? 1 : -1
}