import { PostSchema, type Post } from "@schemas"
import yaml from "js-yaml"
import { marked } from "marked"

export function sortPosts(a: Post, b: Post) {
  const dateA = a.updated ?? a.published
  const dateB = b.updated ?? b.published
  return dateA < dateB ? 1 : -1
}

export function formatDate(date: string | Date) {
  return new Date(date).toISOString().split("T")[0]
}

export function parseMarkdown(markdown: string, slug: string): Post {
  const start = "---\n"
  const end = "\n---"
  const content = markdown.substring(markdown.indexOf(end) + end.length).trim()
  const frontmatter = markdown.substring(start.length, markdown.indexOf(end))
  const data = yaml.load(frontmatter) as Post
  const post = { ...data, content, slug }
  PostSchema.parse(post)
  return post
}

export async function renderMarkdown(markdown: string) {
  let html = await marked.parse(markdown)
  const regex = /<a\s+href=(?:"([^"]+)"|'([^']+)').*?>(.*?)<\/a>/g
  const matches = Array.from(html.matchAll(regex))
  if (matches.length) {
    for (const [link, href, _, content] of matches) {
      if (!href.startsWith("/")) {
        const external = link.replace(content, `${content}<span style="margin-left: 4px;"><i class="i-external"></i></span>`)
          .replace(href, `${href}" target="_blank`)
        html = html.replace(link, external)
      }
    }
  }
  return html
}
