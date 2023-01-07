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

const feed = {
  "@context": [
      "https://www.w3.org/ns/activitystreams",
      "https://w3id.org/security/v1"
  ],
  "id": "https://ben.okkema.org",
  "type": "Person",
  "preferredUsername": "cptchloroplast",
  "summary": "Now on the fediverse",
  "inbox": "https://${DOMAIN}/api/inbox",
  "followers": "https://${DOMAIN}/u/photos/followers",
  "icon": {
      "type": "Image",
      "mediaType": "image/webp",
      "url": "https://ben.okkema.org/img/me.small.webp"
  },
  "publicKey": {
      "id": "https://ben.okkema.org#main-key",
      "owner": "https://ben.okkema.org",
      "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA7LBs3Qyuh93lRboTNXLN\nhj4n92oK5Qg4oS8Cc81AXh04hD7nQSSKBhtarbHy2yPXeiKA+H3EGbcflsLvZCo2\nB3OPNo2nGTCMyJM8HWDf/7JCOHHcy4tZC1ldjrItkb1YDABWwfoXxyBiGTyTVXjL\nsBX5ArTGUPwctMSOdxlJp0ttFn5WDIHiPzxbSaEX/fzTy+HKr9RvYPu/hWWpXA/W\n8QQRacZjslweupZFGCGPX1zJ+P0FSe81uV6N5cOPpy+vFkBQrvApwCSIyp/n7Rfq\nUtU+zi/ru+wSxyvnoZPZa+zOXst8+pk7lIbmI6dyJ2+wijkykAxKt2DnDXWOSUGM\nR+aNjc6tt8xp2MwmhAz91f1rIt2+jOhkPZ0m6aLV3B86J3iI0BIHXzQNydDtz5/P\nEOj79vnnDwjCrWmbsfsIVCmECQDS7EW6Lzdc98GyiD/vyA4Epg3QgpeN4r7fELZj\n8IfJJ7J8Z8nYewRoCVNnfvXpR26y+CLftMUi9LtPP1N78er1IdvZEer/8RIAc58r\nS5VmDYBBfEduxPh/l3tn4A5Ri8smue26yG+wPkBj3CSqaOaNFxxZPgXcbI2OePrH\n81goKk17g+5O0sZJGv+EAeFM1OQPXKqyu0DLY6PHJKGSho/B/BNWQ34vZnQhQF1r\n++VZAcLEeqny/Cn6CHoeu5cCAwEAAQ==\n-----END PUBLIC KEY-----"
  }
}

export default {
  async fetch(request: Request, env: Environment, ctx: ExecutionContext) {
    if (request.url.match(/^.+\/api\/.+/g)) {
      return router.handle(request, env, ctx)
    } else if (request.url.match(/^.+\/.well-known\/.+/g)) {
      return json(webfinger)
    } else if (request.url.match(/^.+\/feed\/.+/g)) {
      return new Response(JSON.stringify(feed), { headers: { "Content-Type": "application/activity+json" }})
    }
    return fetch(request)
  }
}