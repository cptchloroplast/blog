import { router } from "./router"

export default {
  async fetch(request: Request, env: Environment, ctx: ExecutionContext) {
    if (request.url.match(/^.+\/api\/.+/g)) {
      return router.handle(request, env, ctx)
    }
    return fetch(request)
  }
}