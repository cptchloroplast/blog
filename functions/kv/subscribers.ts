type Subscriber = {
  id: string
  email: string
  subscribed: Date
  confirmed: boolean
}

export const Subscribers = (KV: KVNamespace) => ({
  get: (email: string) => {
    return KV.get<Subscriber>(email, "json")
  },
  put: (email: string, subscriber: Subscriber) => {
    return KV.put(email, JSON.stringify(subscriber))
  },
  delete: (email: string) => {
    return KV.delete(email)
  },
})
