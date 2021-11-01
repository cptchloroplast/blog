import { router } from "./router"

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request) {
  if (request.url.match(/^.+\/api\/.+/g)) {
    return router.handle(request)
  }
  return fetch(request)
}