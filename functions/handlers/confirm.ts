import { json } from "../lib/utils"
import Repository from "../lib/repository"


type ConfirmQuery = {
  id: string
  email: string
}

type ConfirmRequest = Request & { query: ConfirmQuery }

export const confirm = async (req: Request, env: Environment): Promise<Response> => {
  const { query: { email, id } } = req as ConfirmRequest
  if (!id || !email) {
    return json({
      ok: false,
      message: "Something doesn't look right here....",
    })
  }
  const subscribers = Repository<Subscriber>(env.SUBSCRIBERS)
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