import type { APIContext } from "astro"

export async function GET(context: APIContext) {
    const params = new URLSearchParams({
        response_type: "code",
        client_id: context.locals.runtime.env.OAUTH_CLIENT_ID,
        redirect_uri: `${context.url.origin}/auth/login/callback`,
        scope: `openid profile email offline_access ${context.locals.runtime.env.OAUTH_SCOPE}`,
        audience: context.locals.runtime.env.OAUTH_AUDIENCE,
    })
    let origin = context.locals.runtime.env.OAUTH_TENANT
    if (!origin.startsWith("https://")) origin = `https://${origin}`
	return context.redirect(`${origin}/authorize?${params}`)
}
