export const HOSTNAME = "ben.okkema.org"

export function json(obj: object){
  return new Response(JSON.stringify(obj), { 
    headers: {
      "Content-Type": "application/json",
    }
  })
} 

export function createActivity(object: object, type: string) {
  return {
    "@context": "https://www.w3.org/ns/activitystreams",
    id: `https://${HOSTNAME}/${crypto.randomUUID()}`,
    actor: `https://${HOSTNAME}/activity`,
    type, 
    object,
  }
}

export function bufferToString(buffer: ArrayBuffer) {
  let binary = ""
  const bytes = new Uint8Array(buffer)
  for (let i = 0, length = bytes.byteLength; i < length; i++) {
      binary += String.fromCharCode(bytes[i])
  }
  return binary
}

export function bufferToBase64(buffer: ArrayBuffer) {
  return btoa(bufferToString(buffer))
}

export function stringToBuffer(string: string) {
  const buffer = new ArrayBuffer(string.length)
  const bytes = new Uint8Array(buffer)
  for (let i = 0, length = string.length; i < length; i++) {
    bytes[i] = string.charCodeAt(i)
  }
  return buffer
}

export function base64ToBuffer(string: string) {
  return stringToBuffer(atob(string))
}