type Environment = {
  MAILJET_API_KEY: string
  MAILJET_SECRET_KEY: string
  ADMIN_EMAIL: string
  BUCKET: R2Bucket
  RSA_PUBLIC_KEY: string
  RSA_PRIVATE_KEY: string
}

type Subscriber = {
  id: string
  email: string
  subscribed: Date
  confirmed?: Date
}
