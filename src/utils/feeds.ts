import type { Metadata, Post } from "@schemas"
import { formatDate } from "./posts"

const symbol = "\u00A9"

export function copyright(date: Date) {
  const year = date.getUTCFullYear()
  const current = new Date().getUTCFullYear()
  if (year < current) return `${symbol} ${year}-${current}`
  else if (year > current) return `${symbol} ${current}-${year}`
  else return `${symbol} ${year}`
}

export function rss(origin: string, metadata: Metadata, posts: Post[]) {
  const earliest = posts[posts.length - 1]
  const latest = posts[0]
  return '<rss version="2.0"><channel>'
    + `<title>${metadata.title}</title>`
    + "<image><url>https://okkema.org/logo.png</url></image>"
    + `<description>${metadata.description}</description>`
    + `<link>${origin}</link>`
    + "<language>en-us</language>"
    + `<copyright>${copyright(earliest.published!)} ${metadata.name}</copyright>`
    + `<webMaster>${metadata.email}</webMaster>`
    + `<pubDate>${formatDate(latest.published!)}</pubDate>`
    + posts.map(post => item(origin, post)).join("")
    + "</channel></rss>"
}

function item(origin: string, post: Post) {
  return "<item>"
    + `<title>${post.title}</title>`
    + `<link>${origin}/posts/${post.slug}</link>`
    + `<description>${post.content}</description>`
    + `<guid isPermaLink="true">${origin}/posts/${post.slug}</guid>`
    + `<pubDate>${formatDate(post.updated ?? post.published!)}</pubDate>`
    + post.tags.map(tag => `<category>${tag}</category>`).join("")
    + "</item>"
}

export function sitemap(origin: string, posts: Post[]) {
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
  return `<url><loc>${loc}</loc><lastmod>${formatDate(lastmod)}</lastmod></url>`
}