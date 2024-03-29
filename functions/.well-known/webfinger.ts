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

export const onRequestGet: PagesFunction<Environment> = async (context) => {
    return new Response(JSON.stringify(webfinger), { 
       headers: { 
           "Content-Type": "application/json" 
       }
   })
}
