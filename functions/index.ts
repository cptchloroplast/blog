addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request) {
  if (request.url.match(/^.+\/api\/.+/g)) {
    return new Response(JSON.stringify(request), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    })
  }
  return fetch(request)
}