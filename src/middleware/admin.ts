import type { OAuthResponse } from "@okkema/worker/auth"
import type { APIContext, MiddlewareNext } from "astro"

export async function admin(context: APIContext, next: MiddlewareNext) {
    if(!context.request.headers.has("Authorization")) {
        const cookie = context.cookies.get("auth")
        if (!cookie) return context.redirect("/auth/login")
        const json: OAuthResponse = cookie.json()
        context.request.headers.append("Authorization", `${json.token_type} ${json.access_token}`)
    }
    return next()
}