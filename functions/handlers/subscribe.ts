import { json } from "../utils"

declare const SUBSCRIBERS: KVNamespace

type Subscriber = {
  email: string
  subscribed: Date
}

export const subscribe = async (req: Request): Promise<Response> => {
  const data = await req.json<{ email: string }>()
  const { email } = data 
  const subscriber = await SUBSCRIBERS.get<Subscriber>(email, "json")
  const today = new Date()
  if (subscriber) {
    const { subscribed } = subscriber
    const seconds = today.getUTCSeconds() - new Date(subscribed).getUTCSeconds()
    return json({
      ok: true,
      message: `You already subscribed ${seconds} seconds ago!`
    })
  }
  await SUBSCRIBERS.put(email, JSON.stringify({
    email,
    subscribed: today,
  }))

  // Send conformation email

  return json({
    ok: true,
    message: "Thanks, please check your email for confirmation!",
  })
}