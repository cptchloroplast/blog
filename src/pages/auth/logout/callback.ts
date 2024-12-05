import type { APIContext } from "astro"

export async function GET(context: APIContext) {
    context.cookies.delete("auth", { path: "/" })
    return context.redirect(context.url.origin)
}
