import { PostService } from "@services"
import { xml, sitemap } from "@utils"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const service = PostService(context.locals.runtime.env.DB)
  const posts = await service.list()
  return xml(sitemap(context.url.origin, posts))
}
