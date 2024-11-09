import { json } from "@utils"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const metadata = context.locals.metadata
  return json(metadata)
}