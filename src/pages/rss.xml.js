import rss from '@astrojs/rss';
import metadata from "../metadata"
import { getCollection } from 'astro:content';

const { description } = metadata
const posts = (await getCollection("posts"))
  .map(x => ({ ...x.data, slug: x.slug }))
  .sort((a,b) => (a.published < b.published) ? 1 : -1)

export const GET = (context) => rss({
  title: context.site.origin,
  description: description,
  site: context.site,
  items: posts.map((post) => ({
      title: post.title,
      description: post.tags,
      link: `/posts/${post.slug}`,
      pubDate: post.published,
    }),
  )
})