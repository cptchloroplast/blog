import type { R2Bucket } from "@cloudflare/workers-types"

export type Repository<T> = {
  get: (key: string) => Promise<T | null>
  put: (key: string, value: T) => Promise<void>
  delete: (key: string) => Promise<void>
}

export function R2Repository<T>(bucket: R2Bucket, prefix?: string): Repository<T> {
    function build(key: string): string {
      if (!prefix) return key
      return `${prefix}/${key}`
    }
    return {
      async get(key) {
        const body = await bucket.get(build(key))
        if (body) return body.json<T>()
        return null
      },
      async put(key, value) {
        await bucket.put(build(key), JSON.stringify(value))
      },
      delete(key) {
        return bucket.delete(build(key))
      },
    }
  }