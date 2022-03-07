type Post = {
  title: string
  description?: string
  published: Date
  updated?: Date
  tags: string
  url: string
  astro: {
    html: string
  }
}