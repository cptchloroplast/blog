import { MetadataSchema } from "@schemas"
import { MetadataService } from "@services"
import type { APIContext, MiddlewareNext } from "astro"

export async function MetadataMiddleware(context: APIContext, next: MiddlewareNext) {
    const service = MetadataService(context.locals.runtime.env.BLOG)
    const metadata = await service.get()
    if (!metadata) throw new Error("Missing metadata")
    MetadataSchema.parse(metadata)
    context.locals.metadata = metadata
    return next()
}