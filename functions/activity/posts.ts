
const posts = { 
    "id": "https://ben.okkema.org/activity/outbox/posts?page=0",
    "type": "OrderedCollectionPage",
    "next": "https://ben.okkema.org/activity/posts?page=1",
    // "prev": "https://ben.okkema.org/activity/toots_less",
    "partOf": "https://ben.okkema.org/activity/posts",
    "orderedItems": [{
        "id": "https://ben.okkema.org/posts/hello-world",
        "type": "Create",
        "actor": "https://ben.okkema.org/activity",
        "published": "2018-10-06T00:00:00Z",
        "to": [
            "https://www.w3.org/ns/activitystreams#Public"
        ],
        "object": {
            "id": "https://ben.okkema.org/posts/hello-world",
            "type": "Article",
            "summary": null,
            "inReplyTo": null,
            "published": "2022-04-26T00:11:17Z",
            "url": "https://ben.okkema.org/posts/hello-world",
            "attributedTo": "https://ben.okkema.org/activity",
            "to": [
                "https://www.w3.org/ns/activitystreams#Public"
            ],
            "sensitive": false,
            "atomUri": "https://ben.okkema.org/posts/hello-world",
            "inReplyToAtomUri": null,
            // "conversation": "tag:ben.okkema.org/activity,2022-04-26:objectId=288755344:objectType=Conversation",
            "content": "<p>Hello, World!</p>",
            "attachment": [],
            "tag": [],
            // "replies": {
            //     "id": "https://ben.okkema.org/activity/posts/1_replies",
            //     "type": "Collection",
            //     "first": {
            //         "type": "CollectionPage",
            //         "next": "https://ben.okkema.org/activity/posts/1_replies_more",
            //         "partOf": "https://ben.okkema.org/activity/posts/1_replies",
            //         "items": []
            //     }
            // }
        }
    }]
}

export const onRequestGet: PagesFunction<Environment> = async (context) => {
    return new Response(JSON.stringify(posts), { 
       headers: { 
           "Content-Type": "application/activity+json" 
       }
   })
}
