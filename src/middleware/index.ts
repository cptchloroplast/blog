import type { APIContext, MiddlewareNext, MiddlewareHandler } from "astro"
import { sequence } from "astro:middleware"
import micromatch from "micromatch"
import { MetadataMiddleware } from "./MetadataMiddleware"

function MiddlewareRouter(router: Record<string, MiddlewareHandler>) {
  const entries = Object.entries(router)
  return function(context: APIContext, next: MiddlewareNext) {
    return sequence(
      ...entries.filter(([path]) => micromatch.isMatch(context.url.pathname, path))
        .map(([_, handler]) => handler)
    )(context, next)
  }
}

export const onRequest = MiddlewareRouter({
    "*": MetadataMiddleware
})
