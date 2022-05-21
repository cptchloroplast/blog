import { uuid } from "@okkema/worker/utils"
import { json } from "../utils"
import Emailer from "../lib/emailer"
import { Subscribers } from "../kv/subscribers"

const site = "ben.okkema.org"

export const subscribe = async (req: Request, env: Environment): Promise<Response> => {
  const subscribers = Subscribers(env.SUBSCRIBERS)
  const data = await req.json<{ email: string }>()
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
  const id = uuid()
  await subscribers.put(email, {
    email,
    subscribed: today,
    confirmed: false,
    id,
  })
  const params = new URLSearchParams({
    email,
    id,
  })
  const emailer = Emailer({ key: env.SENDGRID_API_KEY })
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