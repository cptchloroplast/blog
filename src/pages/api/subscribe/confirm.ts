import { json } from "../../../utils/json"
import { R2Repository } from "../../../services/Repository"
import type { APIContext } from "astro"
import type { Subscriber } from "../../../schemas/Subscriber"

export const prerender = false

export async function GET(context: APIContext) {
    const { request, locals: { runtime: { env } } } = context
    const params = new URL(request.url).searchParams
    const email = params.get("email")
    const id = params.get("id")
    if (!email || !id) return json({
        ok: false,
        message: "Something doesn't look right here....",
    })
    const subscribers = R2Repository<Subscriber>(env.BUCKET, "subscribers")
    const subscriber = await subscribers.get(email)
    if (!subscriber || id !== subscriber.id) {
    return json({
        ok: false,
        message: "Something doesn't look right here....",
    })
    }
    await subscribers.put(email, {
        ...subscriber,
        confirmed: new Date(),
    })
    return json({
        ok: true,
        message: "Thanks for confirming your email!",
    })
}