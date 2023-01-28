const Repository = <T>(KV: KVNamespace) => ({
  get: (key: string) => {
    return KV.get<T>(key, "json")
  },
  put: (key: string, value: T) => {
    return KV.put(key, JSON.stringify(value))
  },
  delete: (key: string) => {
    return KV.delete(key)
  },
})

export default Repository