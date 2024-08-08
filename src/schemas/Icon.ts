import { z } from "zod"
export const IconSchema = z.enum([
  "keybase",
  "phone",
  "github",
  "twitter",
  "linkedin",
  "mail",
  "strava",
  "error",
  "leaf",
  "reject",
  "external",
  "space",
  "wrench",
  "menu",
  "dropdown",
  "code",
  "success",
  "send",
  "lab",
  "rss",
  "family",
  "activitypub"
])
export type Icon = z.infer<typeof IconSchema>