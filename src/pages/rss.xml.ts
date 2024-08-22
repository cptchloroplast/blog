import rss from "@astrojs/rss"
import metadata from "../metadata"
import { PostService } from "@services"
import type { APIContext } from "astro"

const { description } = metadata

export async function GET(context: APIContext) {
  const service = PostService(context.locals.runtime.env.DB)
  const posts = await service.list()
  return rss({
    title: context.site!.origin,
    description: description,
    site: context.site!,
    items: posts.map((post) => ({
        title: post.title,
        description: post.tags.join(","),
        link: `/posts/${post.slug}`,
        pubDate: post.published,
      }),
    )
  })
}