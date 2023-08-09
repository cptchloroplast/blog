type Repository<T> = {
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
