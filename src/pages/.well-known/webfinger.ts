import type { APIContext } from "astro"
import { json } from "../../utils/json"
export const prerender = false
export function GET(context: APIContext) {
  const { request: { url } } = context
  const { origin, hostname } = new URL(url)
  return json({
    "subject": `acct:me@${hostname}`,
    "aliases": [],
    "links": [
      {
        "rel": "http://webfinger.net/rel/profile-page",
        "type": "text/html",
        "href": origin,
      },
      {
        "rel": "self",
        "type": "application/activity+json",
        "href": `${origin}/activity`
      }
    ]
  })
}
