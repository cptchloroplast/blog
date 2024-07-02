import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import metadata from "../metadata"

const { description } = metadata
const posts = (await Promise.all(Object.values(import.meta.glob('./posts/*.md')).map(async function(getInfo) {
  const { frontmatter, url } = await getInfo()
  return { ...frontmatter, url }
}))).sort((a,b) => (a.published < b.published) ? 1 : -1)

export const GET = (context) => rss({
  title: context.site.origin,
  description: description,
  site: context.site,
  items: posts.map((post) => ({
      title: post.title,
      description: post.tags,
      link: post.url,
      pubDate: post.published,
    }),
  )
})