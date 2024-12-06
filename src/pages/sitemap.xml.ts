import type { Metadata, Navigation, Post, Tag } from "@schemas"
import { PostService } from "@services"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const metadata = context.locals.metadata
  const service = PostService(context.locals.runtime.env.DB)
  const posts = await service.list()
  const tags = await service.listTags()
  return new Response(renderSitemap(context.url.origin, metadata, posts), {
    headers: {
      "Content-Type": "application/xml"
    }
  })
}

function renderSitemap(origin: string, metadata: Metadata, posts: Post[]) {
  const map: Record<string, Date> = {}
  const latest = posts[0].published!
  const first = posts[posts.length - 1].published!
  map[`${origin}`] = latest
  map[`${origin}/rss.xml`] = latest
  map[`${origin}/contact`] = first
  map[`${origin}/posts`] = latest
  for (const post of posts) {
    map[`${origin}/posts/${post.slug}`] = post.updated ?? post.published!
  }
  const entries = Object.entries(map)
  entries.sort(([loc1], [loc2]) => loc1 < loc2 ? -1 : 1)
  return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' 
    + entries.map(([loc, lastmod]) => url(loc, lastmod)).join("")
    + "</urlset>"
}

function url(loc: string, lastmod: Date) {
  return `<url><loc>${loc}</loc><lastmod>${lastmod.toISOString().split("T")[0]}</lastmod></url>`
}