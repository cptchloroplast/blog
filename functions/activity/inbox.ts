import { getInbox, postActivity } from "../_/activity"
import { importPrivateKey } from "../_/crypto"
import { createActivity } from "../_/utils"

export const onRequestPost: PagesFunction<Environment> = async ({ env, request }) => {
  const activity = await request.json<any>()
  switch (activity.type) {
    case "Follow":
      const inbox = await getInbox(activity.actor)
      const accept = createActivity(activity, "Accept")
      const crytoKey = await importPrivateKey(env.RSA_PRIVATE_KEY)
      await postActivity(inbox, accept, crytoKey)
      return new Response("", { 
        headers: { 
          "Content-Type": "application/activity+json" 
        }
      })
    default:
      console.error(JSON.stringify(activity))
      return new Response("Unknown action", { status: 400 })
  }
}
