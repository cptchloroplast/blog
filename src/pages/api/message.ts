import type { APIContext } from "astro"
import { json } from "@utils"

export async function POST(context: APIContext) {
  const data = await context.request.json<any>()
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