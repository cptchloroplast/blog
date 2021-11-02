import { json } from "../utils"

export const message = async (req: Request): Promise<Response> => {
  const data = await req.json()
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