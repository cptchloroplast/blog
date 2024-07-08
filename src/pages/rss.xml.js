import rss from '@astrojs/rss';
import metadata from "../metadata"
import { getCollection } from 'astro:content';
import { sortPosts } from '../utils/sortPosts';

const { description } = metadata
const posts = (await getCollection("posts"))
  .map(x => ({ ...x.data, slug: x.slug }))
  .sort(sortPosts)

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