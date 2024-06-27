import rss from '@astrojs/rss';
import metadata from "../metadata"

const { description } = metadata
const posts = Object.values(import.meta.glob('./posts/*.md'))
  .sort((a,b) => (a.published < b.published) ? 1 : -1)

export const get = (context) => rss({
  title: context.site,
  description: description,
  site: context.site,
  items: posts.map(({ frontmatter: post, url }) => ({
      title: post.title,
      description: post.tags,
      link: url,
      pubDate: post.published,
    }),
  )
})