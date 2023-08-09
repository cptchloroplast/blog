export type Repository<T> = {
  get: (key: string) => Promise<T>
  put: (key: string, value: T) => Promise<void>
  delete: (key: string) => Promise<void>
}

export function KVRepository<T>(KV: KVNamespace): Repository<T> {
  return {
    get(key) {  
      return KV.get<T>(key, "json")
    },
    put(key, value) {
      return KV.put(key, JSON.stringify(value))
    },
    delete(key) {
      return KV.delete(key)
    },
  }
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
    },
    async put(key, value) {
      await bucket.put(build(key), JSON.stringify(value))
    },
    delete(key) {
      return bucket.delete(build(key))
    },
  }
}
