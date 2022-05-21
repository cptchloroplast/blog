import { router } from "./router"

export default {
  async fetch(request, env, ctx) {
    console.log(request.url)
    if (request.url.match(/^.+\/api\/.+/g)) {
      return router.handle(request)
    }
    return fetch(request)
  }
}