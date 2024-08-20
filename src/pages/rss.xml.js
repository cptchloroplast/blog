import rss from "@astrojs/rss"
import metadata from "../metadata"
import { getCollection } from "astro:content"
import { sortPosts } from "@utils"

const { description } = metadata
const posts = (await getCollection("posts"))
  .map(x => ({ ...x.data, url: x.slug }))
  .sort(sortPosts)

export const GET = (context) => rss({
  title: context.site.origin,
  description: description,
  site: context.site,
  items: posts.map((post) => ({
      title: post.title,
      description: post.tags.join(","),
      link: `/posts/${post.url}`,
      pubDate: post.published,
    }),
  )
})