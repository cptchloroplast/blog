import { json } from "../utils"

declare const SUBSCRIBERS: KVNamespace

type ConfirmQuery = {
  id: string
  email: string
}

type Subscriber = {
  id: string
  email: string
  subscribed: Date
  confirmed: boolean
}

export const confirm = async (req: Request & { query: ConfirmQuery }): Promise<Response> => {
  const { query: { email, id } } = req
  if (!id || !email) {
    return json({
      ok: false,
      message: "Something doesn't look right here....",
    })
  }
  const subscriber = await SUBSCRIBERS.get<Subscriber>(email, "json")
  if (!subscriber || id !== subscriber.id) {
    return json({
      ok: false,
      message: "Something doesn't look right here....",
    })
  }
  await SUBSCRIBERS.put(email, JSON.stringify({
    ...subscriber,
    confirmed: true,
  }))
  return json({
    ok: true,
    message: "Thanks for confirming your email!",
  })
}