import { uuid } from "@okkema/worker/utils"
import { json } from "../utils"
import { sendEmail } from "../sendgrid"
import { subscribers } from "../kv/subscribers"

const site = "ben.okkema.org"

export const subscribe = async (req: Request): Promise<Response> => {
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
  const ok = await sendEmail(email, `Confirm your subscription to ${site}!`, `
    <p>Hi!</p>
    <p>Thanks for subscribing to the email list!</p>
    <p>We promise to never send you spam, unless you specifically request it!</p>
    <a href="https://${site}/api/subscribe/confirm?${params.toString()}">Click here to confirm your subscription!</a>
    <p>Stay tuned for all the latest updates!</p>
    <p>Ben</p>
  `)
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