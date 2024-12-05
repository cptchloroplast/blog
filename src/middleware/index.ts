import type { APIContext, MiddlewareNext, MiddlewareHandler } from "astro"
import { sequence } from "astro:middleware"
import { metadata } from "./metadata"
import { authenticate } from "./authenticate"
import { admin } from "./admin"

function router(routes: Record<string, MiddlewareHandler>) {
    const entries = Object.entries(routes)
    return function (context: APIContext, next: MiddlewareNext) {
        return sequence(
            ...entries.filter(function ([path]) {
                return context.url.pathname.match(RegExp(`^${(path
                    .replace(/\/+(\/|$)/g, '$1')) // strip double & trailing splash
                    .replace(/(\/?)\*/g, '($1.*)?') // wildcard
                    }/*$`))
            }).map(([_, handler]) => handler)
        )(context, next)
    }
}

export const onRequest = router({
    "*": metadata,
    "/admin/*": sequence(admin, authenticate),
})
