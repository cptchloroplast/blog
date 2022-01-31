type Metadata = {
  author: {
    name: string
    email: string
  }
  description: string
  repo: string
  navigation: Navigation[]
  profile: {
    bio: Bio[]
    contact: Contact[]
  }
}