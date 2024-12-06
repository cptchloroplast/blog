import { PostService } from "@services"
import { rss, xml } from "@utils"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const metadata = context.locals.metadata
  const service = PostService(context.locals.runtime.env.DB)
  const posts = await service.list()
  return xml(rss(context.url.origin, metadata, posts))
}