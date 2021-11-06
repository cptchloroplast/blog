import { router } from "./router"
import Worker from "@okkema/worker"

Worker({
  handler: (event) => {
    const { request } = event
    if (request.url.match(/^.+\/api\/.+/g)) {
      return router.handle(request)
    }
    return fetch(request)
  },
})
