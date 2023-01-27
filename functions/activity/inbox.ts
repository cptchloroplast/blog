type Object = {
  type: string
  actor: string
}

function bufferToString(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0, length = bytes.byteLength; i < length; i++) {
      binary += String.fromCharCode(bytes[i])
  }
  return binary
}

function stringToBuffer(str) {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, length = str.length; i < length; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

const ALGORITHM = "RSASSA-PKCS1-v1_5"
const HASH = "SHA-256"

function importPrivateKey(pem: string) {
  const pemHeader = "-----BEGIN RSA PRIVATE KEY-----"
  const pemFooter = "-----END RSA PRIVATE KEY-----"
  const pemContents = pem.substring(
    pemHeader.length, 
    pem.length - pemFooter.length,
  )
  const binaryDerString = atob(pemContents)
  const binaryDer = stringToBuffer(binaryDerString)

  return crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: ALGORITHM,
      hash: HASH,
    },
    false,
    ["sign"],
  )
}
  
async function digestMessage(message: string) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(message))
  return btoa(bufferToString(hash))
}

async function signAndSend(message, key) {
  const inbox = message.object.actor + "/inbox"
  const url = new URL(inbox)
  const digestHash = await digestMessage(JSON.stringify(message))
  const d = new Date()
  const stringToSign = `(request-target): post ${url.pathname}\nhost: ${url.hostname}\ndate: ${d.toUTCString()}\ndigest: SHA-256=${digestHash}`
  const cryptoKey = await importPrivateKey(key)
  const buffer = await crypto.subtle.sign(
    {
      name: ALGORITHM,
      hash: { name: HASH },
    },
    cryptoKey,
    new TextEncoder().encode(stringToSign),
  )
  const signature = btoa(bufferToString(buffer))
  const header = `keyId="https://ben.okkema.org/activity#main-key",headers="(request-target) host date digest",signature="${signature}"`
  await fetch(inbox, {
    headers: new Headers({
      Host: url.hostname,
      Date: d.toUTCString(),
      Digest: `SHA-256=${digestHash}`,
      "Content-Type": "application/ld+json",
      Signature: header,
    }),
    method: "POST",
    body: JSON.stringify(message),
  }).then(async (res) => {
    const response = await res.text()
    if (res.status >= 400) console.error("response", response)
    else console.log("response", response)
  }).catch((e) => console.error(e))
}

async function sendAcceptMessage(object: Object, key: string) {
  const guid = crypto.randomUUID()
  const message = {
    "@context": "https://www.w3.org/ns/activitystreams",
    id: `https://ben.okkema.org/${guid}`,
    type: "Accept",
    actor: "https://ben.okkema.org/activity",
    object,
  }
  return await signAndSend(message, key)
}

export const onRequestPost: PagesFunction<Environment> = async (context) => {
  const key = await context.env.KEYS.get("private")
  const body = await context.request.json<Object>()
  switch (body.type) {
    case "Follow":
      await sendAcceptMessage(body, key)
      return new Response("", { 
        headers: { 
          "Content-Type": "application/activity+json" 
        }
      })
    default:
      return new Response("Unknown action", { status: 400 })
  }
}
