import { MetadataSchema } from "@schemas"
import { MetadataService } from "@services"
import { json } from "@utils"
import type { APIContext } from "astro"

export async function POST(context: APIContext) {
    const { metadata: raw } = await context.request.json<{ metadata: string }>()
    try {
        const metadata = MetadataSchema.parse(JSON.parse(raw))
        await MetadataService(context.locals.runtime.env.BLOG).update(metadata)
    } catch (error: any) {
        console.error(error.message)
        return json({ ok: false, message: error.message })
    }
    return json({ ok: true, message: "Ok!" })
}