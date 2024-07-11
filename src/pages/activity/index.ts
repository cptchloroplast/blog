import type { APIContext } from "astro"
import metadata from "../../metadata"
export const prerender = false
export function GET(context: APIContext) {
    const { author: { name, username } } = metadata
    const { locals: { runtime: { env } }, request: { url } } = context
	const { origin } = new URL(url)
 	return new Response(JSON.stringify({
		"@context": [
			"https://www.w3.org/ns/activitystreams",
			"https://w3id.org/security/v1",
		],
		"id": `${origin}/activity`,
		"type": "Person",
		"inbox": `${origin}/activity/inbox`,
		"outbox": `${origin}/activity/outbox`,
		"preferredUsername": username,
		"name": name,
		"summary": "Now on the fediverse!",
		"url": origin,
		"discoverable": true,
		"published": "2023-01-07T00:00:00Z",
		"icon": {
			"type": "Image",
			"mediaType": "image/webp",
			"url": `${origin}/img/me.webp`,
		},
		"publicKey": {
			"id": `${origin}/activity#main-key`,
			"owner": `${origin}/activity`,
			"publicKeyPem": env.RSA_PUBLIC_KEY,
		 },
		"tag": [],
		"attachment": [],
	}), { 
		headers: { 
			"Content-Type": "application/activity+json" 
		}
	})
}
