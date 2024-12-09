import type { APIContext, MiddlewareNext } from "astro"
import * as Sentry from "@sentry/browser"
import { ZodError } from "zod"
import { Problem } from "@okkema/worker"

export async function error(context: APIContext, next: MiddlewareNext) {
    try {
        Sentry.init({
            dsn: context.locals.runtime.env.SENTRY_DSN,
        })
        const response = await next()
        return response
    } catch (error) {
        if (error instanceof ZodError) {
            const formatted = error.format()
            console.error(formatted)
        } else {
            console.error(error)
        }
        throw error
    }
}