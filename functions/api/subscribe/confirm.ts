import { json } from "../../_/utils"
import { R2Repository } from "../../_/repository"

export const onRequestGet: PagesFunction<Environment> = async ({ request, env }) => {
  const params = new URL(request.url).searchParams
  if (!params.has("id") || !params.has("email")) {
    return json({
      ok: false,
      message: "Something doesn't look right here....",
    })
  }
  const email = params.get("email")
  const id = params.get("id")
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