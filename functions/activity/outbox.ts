const outbox = {                                                                                                                                                                                                                                                                                           
    "@context": "https://www.w3.org/ns/activitystreams",
    "id": "https://ben.okkema.org/activity/outbox",
    "type": "OrderedCollection",
    "totalItems": 1,
    "first": "https://ben.okkema.org/activity/outbox/posts?page=0"                                                                                                                                                                                                                   
  }

export const onRequestGet: PagesFunction<Environment> = async (context) => {
    return new Response(JSON.stringify(outbox), { 
       headers: { 
           "Content-Type": "application/activity+json" 
       }
   })
}
