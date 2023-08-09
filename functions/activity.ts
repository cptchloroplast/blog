

function getFeed(origin: string, publicKey: string) {
	return {
		"@context": [
			"https://www.w3.org/ns/activitystreams",
			"https://w3id.org/security/v1",
		],
		"id": `${origin}/activity`,
		"type": "Person",
		"inbox": `${origin}/activity/inbox`,
		"outbox": `${origin}/activity/outbox`,
		"preferredUsername": "cptchloroplast",
		"name": "Benjamin Okkema",
		"summary": "Now on the fediverse!",
		"url": origin,
		"discoverable": false,
		"published": "2023-01-07T00:00:00Z",
		"icon": {
			"type": "Image",
			"mediaType": "image/webp",
			"url": `${origin}/img/me.small.webp`,
		},
		"publicKey": {
			"id": `${origin}/activity#main-key`,
			"owner": `${origin}/activity`,
			"publicKeyPem": publicKey,
		 },
		"tag": [],
		"attachment": [],
	}
}

export const onRequestGet: PagesFunction<Environment> = async ({ env, request }) => {
	const url = new URL(request.url)
	const feed = getFeed(url.origin, env.RSA_PUBLIC_KEY)
 	return new Response(JSON.stringify(feed), { 
		headers: { 
			"Content-Type": "application/activity+json" 
		}
	})
}
