import type { APIContext } from "astro"
import { json } from "../../utils/json"

export const prerender = false

const webfinger = {
    "subject": "acct:ben@okkema.org",
    "aliases": [],
    "links": [
      {
        "rel": "http://webfinger.net/rel/profile-page",
        "type": "text/html",
        "href": "https://ben.okkema.org"
      },
      {
        "rel": "self",
        "type": "application/activity+json",
        "href": "https://ben.okkema.org/activity"
      }
    ]
}

export function GET(context: APIContext) {
    return json(webfinger)
}
