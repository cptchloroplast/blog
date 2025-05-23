import { json } from "@utils"
import { R2Repository } from "@services"
import type { APIContext } from "astro"
import type { Subscriber } from "@schemas"

export async function GET(context: APIContext) {
    const { request, locals: { runtime: { env } } } = context
    const params = new URL(request.url).searchParams
    const email = params.get("email")
    const id = params.get("id")
    if (!email || !id)
        return json({
            ok: false,
            message: "Something doesn't look right here....",
        })
    const subscribers = R2Repository<Subscriber>(env.BLOG, "subscribers")
    const subscriber = await subscribers.get(email)
    if (!subscriber || id !== subscriber.id) 
        return json({
            ok: false,
            message: "Something doesn't look right here....",
        })
    subscriber.confirmed = new Date()
    await subscribers.put(email, subscriber)
    console.info("Confirmed subscriber", subscriber)
    return json({
        ok: true,
        message: "Thanks for confirming your email!",
    })
}