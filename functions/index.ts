import { router } from "./router"
import { json } from "./lib/utils"

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
          "href": "https://ben.okkema.org/feed"
      }
  ]
}


export default {
  async fetch(request: Request, env: Environment, ctx: ExecutionContext) {
    if (request.url.match(/^.+\/api\/.+/g)) {
      return router.handle(request, env, ctx)
    } else if (request.url.match(/^.+\/.well-known\/.+/g)) {
      return json(webfinger)
    }
    return fetch(request)
  }
}