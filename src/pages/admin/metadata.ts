import { MetadataSchema, type Metadata } from "@schemas"
import { MetadataService } from "@services"
import { json } from "@utils"
import type { APIContext } from "astro"

type Nullable<T> = {
    [K in keyof T]: Nullable<T[K]> | null | undefined;
}

export async function PATCH(context: APIContext) {    
    try {
        const patch = await context.request.json<Nullable<Metadata>>()
        const metadata = MetadataSchema.parse({ ...context.locals.metadata, ...patch })
        await MetadataService(context.locals.runtime.env.BLOG).update(metadata)
    } catch (error: any) {
        console.error(error.message)
        return json({ ok: false, message: error.message })
    }
    return json({ ok: true, message: "Updated site metadata" })
}