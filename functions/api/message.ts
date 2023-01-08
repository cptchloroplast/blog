import { json } from "../../functions/lib/utils"

export const onRequestPost: PagesFunction<Environment> = async (context) => {
  const data = await context.request.json()
  if (!data["h-captcha-response"]) return json({
    ok: false,
    message: "No robots allowed!"
  })

  // Do h-captcha verification

  return json({
    ok: true,
    message: "Transmission recieved. We'll get back to you soon!"
  })
}