import type { APIContext } from "astro"
import { json } from "@utils"

export async function POST(context: APIContext) {
  const data = await context.request.json<any>()
  const token = data["h-captcha-response"]
  if (!token) return json({
    ok: false,
    message: "You skipped the captcha..."
  })

  const response = await fetch("https://api.hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      response: token,
      secret: context.locals.runtime.env.HCAPTCHA_SECRET,
      sitekey: context.locals.runtime.env.HCAPTCHA_SITEKEY,
    })
  })
  const body = await response.json<{
    success: boolean
    challenge_ts: string
    hostname: string
    "error-codes": string[]
  }>()
  if (!body.success) return json({
    ok: false,
    message: "No robots allowed!"
  })

  return json({
    ok: true,
    message: "Transmission recieved. We'll get back to you soon!"
  })
}