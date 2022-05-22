import { MarkdownInstance } from "astro"

const sortPosts = (a: MarkdownInstance<Post>, b: MarkdownInstance<Post>) => 
  (a.frontmatter.published < b.frontmatter.published) ? 1 : -1

export default sortPosts