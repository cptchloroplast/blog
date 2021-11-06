declare const SUBSCRIBERS: KVNamespace

type Subscriber = {
  id: string
  email: string
  subscribed: Date
  confirmed: boolean
}

export const subscribers = {
  get: (email: string) => {
    return SUBSCRIBERS.get<Subscriber>(email, "json")
  },
  put: (email: string, subscriber: Subscriber) => {
    return SUBSCRIBERS.put(email, JSON.stringify(subscriber))
  },
  delete: (email: string) => {
    return SUBSCRIBERS.delete(email)
  },
}
