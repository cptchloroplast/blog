const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyeYEwdZXvhpmJa4pC/zI
LE6Sy/BxsrSyy+kA3tzZIZId72DlU2NWVsCygvH9UIGW/OipHKmzihSZjlWJ/vam
QipBgD4/OKlZKuiyI+xzePBYWl4xxcB49CVvfthU3qT090eZJ+35/UQjfLotDAN9
24dqTCCIqchuOxAw3Jc/IbwRPDWPPpBV2Av9te2by60iK6Srg3JvkU3AB28efpF5
QtBjZgD8ZYjYheye2FDERI5fIBMSVzDMeyvF1E/Rru9nAgzFhhCBVhYPp7SZM9NU
SH93tPKo+67e19zeJMifRW811SRxe8FV0jfkrVhmDYMhtXl6CiZjm/r3rhDHL1DM
qQIDAQAB
-----END PUBLIC KEY-----`

const feed = {
	"@context": [
	  "https://www.w3.org/ns/activitystreams",
	  "https://w3id.org/security/v1",
	],
	"id": "https://ben.okkema.org/activity",
	"type": "Person",
	// "following": "https://ben.okkema.org/activity/following",
	// "followers": "https://ben.okkema.org/activity/followers",
	"inbox": "https://ben.okkema.org/activity/inbox",
	"outbox": "https://ben.okkema.org/activity/outbox",
	// "featured": "https://ben.okkema.org/activity/collections/featured",
	// "featuredTags": "https://ben.okkema.org/activity/collections/tags",
	"preferredUsername": "cptchloroplast",
	"name": "Benjamin Okkema",
	"summary": "Now on the fediverse!",
	"url": "https://ben.okkema.org",
	// "manuallyApprovesFollowers": false,
	"discoverable": false,
	"published": "2023-01-07T00:00:00Z",
	// "devices": "https://ben.okkema.org/activity/collections/devices",
	"icon": {
	  "type": "Image",
	  "mediaType": "image/webp",
	  "url": "https://ben.okkema.org/img/me.small.webp",
	},
	"publicKey": {
	  "id": "https://ben.okkema.org/activity#main-key",
	  "owner": "https://ben.okkema.org/activity",
	  "publicKeyPem": publicKey
	 },
	"tag": [],
	"attachment": [],
	// "endpoints": {
	//   "sharedInbox": "https://ben.okkema.org/activity/inbox"
	// }
  }

export const onRequestGet: PagesFunction<Environment> = async (context) => {
 	return new Response(JSON.stringify(feed), { 
		headers: { 
			"Content-Type": "application/activity+json" 
		}
	})
}
