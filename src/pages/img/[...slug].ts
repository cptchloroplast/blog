import type { APIContext } from "astro"

export async function GET(context: APIContext) {
    const slug = context.params.slug
    const object = await context.locals.runtime.env.BUCKET.get(`img/${slug}`)
    if (!object) return new Response("Not Found", { status: 404 })
    const headers = new Headers()
    // https://github.com/cloudflare/workers-sdk/issues/6047
    if (context.locals.runtime.env.CF_PAGES_COMMIT_SHA !== "develop") {
        //@ts-ignore incompatible types
        object.writeHttpMetadata(headers)
    }
    headers.set("etag", object.httpEtag)
    //@ts-ignore incompatible types
    return new Response(object.body, { headers })
}