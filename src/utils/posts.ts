import yaml from "js-yaml"
import { marked } from "marked"


export function formatDate(date: string | Date) {
  return new Date(date).toISOString().split("T")[0]
}

export function parseMarkdown<T>(markdown: string): { content: string, frontmatter: T} {
  const pieces = markdown.split("---")
  if (pieces.length !== 3) throw new Error("Invalid formatting")
  const frontmatter = yaml.load(pieces[1]) as T
  const content = pieces[2].trim()
  return { content, frontmatter }
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
