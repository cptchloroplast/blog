import rss from '@astrojs/rss';
import metadata from "../metadata"

const { description } = metadata
const posts = Object.values(import.meta.globEager('./posts/*.md'))
  .sort((a,b) => (a.published < b.published) ? 1 : -1)

const site = import.meta.env.SITE ?? "https://ben.okkema.org"

export const get = () => rss({
  title: site,
  description: description,
  site: site,
  items: posts.map(({ frontmatter: post, url }) => ({
      title: post.title,
      description: post.tags,
      link: url,
      pubDate: post.published,
    }),
  )
})