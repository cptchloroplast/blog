import { json } from "../../../utils/json"
import { Emailer } from "../../../services/Emailer"
import { R2Repository } from "../../../services/Repository"
import type { APIContext } from "astro"
import type { Subscriber } from "../../../schemas/Subscriber"

export const prerender = false

export async function POST(context: APIContext) {
    const { env } = context.locals.runtime
    const site = context.site?.hostname
    const subscribers = R2Repository<Subscriber>(env.BUCKET, "subscribers")
    const data = await context.request.json<{ email: string }>()
    const { email } = data 
    const subscriber = await subscribers.get(email)
    const today = new Date()
    if (subscriber) {
        const { subscribed } = subscriber
        const seconds = (today.getTime() - new Date(subscribed).getTime()) / 1000
        return json({
        ok: false,
        message: `You already subscribed ${seconds} seconds ago!`
        })
    }
    const id = crypto.randomUUID()
    await subscribers.put(email, {
        email,
        subscribed: today,
        id,
    })
    const params = new URLSearchParams({
        email,
        id,
    })
    const emailer = Emailer({ 
        account: env.MAILJET_API_KEY,
        secret: env.MAILJET_SECRET_KEY,
    })
    const ok = await emailer.send({
        from: env.ADMIN_EMAIL,
        to: email,
        subject: `Confirm your subscription to ${site}!`,
        html: `
        <p>Hi!</p>
        <p>Thanks for subscribing to the email list!</p>
        <p>We promise to never send you spam, unless you specifically request it!</p>
        <a href="https://${site}/api/subscribe/confirm?${params.toString()}">Click here to confirm your subscription!</a>
        <p>Stay tuned for all the latest updates!</p>
        <p>Ben</p>
        `
    })
    if (!ok) {
        return json({
            ok: false,
            message: "Something funky happened... Please try again later.",
        })
    }
    return json({
        ok: true,
        message: "Thanks, please check your email for confirmation!",
    })
}