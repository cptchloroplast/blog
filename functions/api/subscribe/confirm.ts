import { json } from "../../lib/utils"
import Repository from "../../lib/repository"

export const onRequestGet: PagesFunction<Environment> = async (context) => {
  const params = new URL(context.request.url).searchParams
  if (!params.has("id") || !params.has("email")) {
    return json({
      ok: false,
      message: "Something doesn't look right here....",
    })
  }
  const email = params.get("email")
  const id = params.get("id")
  const subscribers = Repository<Subscriber>(context.env.SUBSCRIBERS)
  const subscriber = await subscribers.get(email)
  if (!subscriber || id !== subscriber.id) {
    return json({
      ok: false,
      message: "Something doesn't look right here....",
    })
  }
  await subscribers.put(email, {
    ...subscriber,
    confirmed: true,
  })
  return json({
    ok: true,
    message: "Thanks for confirming your email!",
  })
}