import { HOSTNAME } from "../_/utils"

const outbox = {                                                                                                                                                                                                                                                                                           
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": `https://${HOSTNAME}/activity/outbox`,
  "type": "OrderedCollection",
  "totalItems": 1,
  "orderedItems": [{
    "id": `https://${HOSTNAME}/posts/hello-world/activity`,
    "type": "Create",
    "actor": `https://ben.okkema.org/activity`,
    "published": "2018-10-06T00:00:00Z",
    "to": [
      "https://www.w3.org/ns/activitystreams#Public"
    ],
    "object": {
      "id": `https://${HOSTNAME}/posts/hello-world`,
      "type": "Article",
      "published": "2018-10-06T00:00:00Z",
      "url": `https://${HOSTNAME}/posts/hello-world`,
      "attributedTo": `https://${HOSTNAME}/activity`,
      "to": [
        "https://www.w3.org/ns/activitystreams#Public"
      ],
      "sensitive": false,
      "content": "<p>Hello, World!</p>",
      "attachment": [],
      "tag": [],
    }
  }]                                                                                                                                                                                                                   
}

export const onRequestGet: PagesFunction<Environment> = async (context) => {
  return new Response(JSON.stringify(outbox), { 
    headers: { 
      "Content-Type": "application/activity+json" 
    }
  })
}
