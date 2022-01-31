type Navigation = {
  text: string
  href?: string
  external?: boolean
  children?: Omit<Navigation, "children">[]
}