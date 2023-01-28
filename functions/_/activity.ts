import { createDigest, createSignature, HASH } from "./crypto"
import { HOSTNAME } from "./utils"

export async function postActivity(inbox: string, activity: object, key: CryptoKey) {
  const url = new URL(inbox)
  const body = JSON.stringify(activity)
  const digest = await createDigest(body)
  const date = new Date().toUTCString()
  const stringToSign = `(request-target): post ${url.pathname}\nhost: ${url.hostname}\ndate: ${date}\ndigest: ${HASH}=${digest}`
  const rawSignature = await createSignature(stringToSign, key)
  const signature = `keyId="https://${HOSTNAME}/activity#main-key",headers="(request-target) host date digest",signature="${rawSignature}"`
  return fetch(url, {
    headers: new Headers({
      "Content-Type": "application/ld+json",
      Host: url.hostname,
      Date: date,
      Digest: `${HASH}=${digest}`,
      Signature: signature,
    }),
    method: "POST",
    body,
  })
}

export async function getInbox(url: string) {
  const response = await fetch(url, { 
    headers: new Headers({
      "Accept": "application/activity+json"
    })
  })
  const actor = await response.json<any>()
  return actor.inbox
}