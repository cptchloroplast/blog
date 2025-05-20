import { json } from "@utils"
import { R2Repository } from "@services"
import type { APIContext } from "astro"
import type { Subscriber } from "@schemas"
import { EmailService } from "@okkema/email"

export async function POST(context: APIContext) {
    const { env } = context.locals.runtime
    const site = context.site?.hostname
    const subscribers = R2Repository<Subscriber>(env.BLOG, "subscribers")
    const data = await context.request.json<{ email: string }>()
    const { email } = data 
    let subscriber = await subscribers.get(email)
    const today = new Date()
    if (subscriber) {
        console.warn("Duplicate subscriber", subscriber)
        const { subscribed } = subscriber
        const seconds = (today.getTime() - new Date(subscribed).getTime()) / 1000
        return json({
            ok: false,
            message: `You already subscribed ${seconds} seconds ago!`
        })
    }
    const id = crypto.randomUUID()
    subscriber = {
        email,
        subscribed: today,
        id,
    }
    await subscribers.put(email, {
        email,
        subscribed: today,
        id,
    })
    console.info("Pending subscriber", subscriber)
    const params = new URLSearchParams({
        email,
        id,
    })
    const emailer = EmailService(context.locals.runtime.env)
    const response = await emailer.send({
        to: [{ email }],
        subject: `Confirm your subscription to ${site}!`,
        html: `
        <p>Hi!</p>
        <p>Thanks for subscribing to the email list!</p>
        <p>We promise to never send you spam, unless you specifically request it!</p>
        <a href="https://${site}/subscribe/confirm?${params.toString()}">Click here to confirm your subscription!</a>
        <p>Stay tuned for all the latest updates!</p>
        <p>Ben</p>
        `
    })
    if (!response.ok) {
        const body = await response.json()
        console.error("Failed to send email", body)
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