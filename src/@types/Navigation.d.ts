type Navigation = {
  text: string
  icon?: Icon
  href?: string
  external?: boolean
  children?: Omit<Navigation, "children">[]
}