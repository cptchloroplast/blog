import type { APIContext } from "astro"
import { json } from "@utils"
import { EmailService } from "@services"

export async function POST(context: APIContext) {
  const data = await context.request.json<{
    email: string
    message: string
    "h-captcha-response": string
  }>()
  if (!data["h-captcha-response"]) return json({
    ok: false,
    message: "You skipped the captcha..."
  })

  const response = await fetch("https://api.hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      response: data["h-captcha-response"],
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

  const key = `messages/${data.email}/${new Date().toISOString()}.txt`
  await context.locals.runtime.env.BLOG.put(key, data.message)
  await EmailService(context.locals.runtime.env).send({ 
    subject: `New message from ${data.email}`,
    body: `Key: ${key}\n\n---\n\n${data.message}`,
  })

  return json({
    ok: true,
    message: "Transmission recieved. We'll get back to you soon!"
  })
}