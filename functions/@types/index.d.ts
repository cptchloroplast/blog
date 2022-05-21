type Environment = {
  SENDGRID_API_KEY: string
  ADMIN_EMAIL: string
  SUBSCRIBERS: KVNamespace
}

type Subscriber = {
  id: string
  email: string
  subscribed: Date
  confirmed: boolean
}
