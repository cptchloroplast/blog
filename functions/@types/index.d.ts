type Environment = {
  MAILJET_API_KEY: string
  MAILJET_SECRET_KEY: string
  ADMIN_EMAIL: string
  SUBSCRIBERS: KVNamespace
}

type Subscriber = {
  id: string
  email: string
  subscribed: Date
  confirmed: boolean
}
