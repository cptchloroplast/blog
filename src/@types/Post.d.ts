type Post = {
  title: string
  published: Date
  updated?: Date
  tags: string
  url: string
  astro: {
    html: string
  }
}