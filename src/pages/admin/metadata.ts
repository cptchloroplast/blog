import { MetadataSchema } from "@schemas"
import { json } from "@utils"
import type { APIContext } from "astro"

export async function POST(context: APIContext) {
    const { metadata } = await context.request.json<{ metadata: string }>()
    try {
        MetadataSchema.parse(JSON.parse(metadata))
    } catch (error: any) {
        console.error(error.message)
        return json({ ok: false, message: error.message })
    }
    return json({ ok: true, message: "Ok!" })
}