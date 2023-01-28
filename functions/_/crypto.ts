import { base64ToBuffer, bufferToBase64 } from "./utils"

const ALGORITHM = "RSASSA-PKCS1-v1_5"
export const HASH = "SHA-256"

export function importPrivateKey(pem: string) {
  const header = "-----BEGIN RSA PRIVATE KEY-----"
  const footer = "-----END RSA PRIVATE KEY-----"
  const base64 = pem.substring(
    header.length, 
    pem.length - footer.length,
  )
  const buffer = base64ToBuffer(base64)
  return crypto.subtle.importKey(
    "pkcs8",
    buffer,
    {
      name: ALGORITHM,
      hash: HASH,
    },
    false,
    ["sign"],
  )
}

export async function createSignature(string: string, key: CryptoKey) {
  const buffer = await crypto.subtle.sign(
    {
      name: ALGORITHM,
      hash: { name: HASH },
    },
    key,
    new TextEncoder().encode(string),
  )
  return bufferToBase64(buffer)
}

export async function createDigest(string: string) {
  const buffer = await crypto.subtle.digest(
    HASH, 
    new TextEncoder().encode(string),
  )
  return bufferToBase64(buffer)
}