import type { APIContext } from "astro"
import metadata from "../../metadata"
import { getCollection } from "astro:content"
import { sortPosts } from "@utils"
export const prerender = false
export async function GET(context: APIContext) {
    const { published } = (await getCollection("posts"))
        .map(x => ({ ...x.data, url: x.slug}))
        .sort(sortPosts)[0]
    const { author: { name, username }, description } = metadata
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
		"summary": description,
		"url": origin,
		"discoverable": true,
		"published": published.toISOString(),
		"icon": {
            "type": "Image",
            "mediaType": "image/webp",
            "url": `${origin}/img/me.small.webp`,
		},
		"publicKey": {
			"id": `${origin}/activity#main-key`,
			"owner": `${origin}/activity`,
			"publicKeyPem": env.RSA_PUBLIC_KEY,
		 },
		"tag": [],
		"attachment": [],
	}).replace(/\\\\/g,"\\"), { // fix formatting of public key in local environment
		headers: { 
			"Content-Type": "application/activity+json" 
		}
	})
}
