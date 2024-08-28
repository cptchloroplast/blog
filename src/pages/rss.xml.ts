import rss from "@astrojs/rss"
import { PostService } from "@services"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const metadata = context.locals.metadata
  const service = PostService(context.locals.runtime.env.DB)
  const posts = await service.list()
  return rss({
    title: context.site!.origin,
    description: metadata.description,
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