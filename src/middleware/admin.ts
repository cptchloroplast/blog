import type { OAuthResponse } from "@okkema/worker/auth"
import type { APIContext, MiddlewareNext } from "astro"

export async function admin(context: APIContext, next: MiddlewareNext) {
    if(!context.request.headers.has("Authorization")) {
        const cookie = context.cookies.get("auth")
        if (!cookie) return context.redirect("/auth/login")
        const json: OAuthResponse = cookie.json()
        return next(new Request(context.request, {
            headers: {
                ...Object.fromEntries(context.request.headers),
                "Authorization": `${json.token_type} ${json.access_token}`,
            }
        }))
    }
    return next()
}