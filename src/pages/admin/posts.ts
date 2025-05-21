import { BucketService } from "@services"
import { json } from "@utils"
import type { APIContext } from "astro"

export async function POST(context: APIContext) {    
    try {
        const { BLOG, STRAVA, DB } = context.locals.runtime.env
        await BucketService(BLOG, STRAVA, DB).processPosts()
    } catch (error: any) {
        console.error(error.message)
        return json({ ok: false, message: error.message })
    }
    return json({ ok: true, message: "Updated posts in database" })
}