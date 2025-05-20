import type { APIContext, MiddlewareNext } from "astro"
import { ZodError } from "zod"
import { wrapRequestHandler, consoleLoggingIntegration } from "@sentry/cloudflare"

export async function error(context: APIContext, next: MiddlewareNext) {
    return wrapRequestHandler({ 
        options: {
            dsn: context.locals.runtime.env.SENTRY_DSN,
            _experiments: {
                enableLogs: true
            },
            integrations: [consoleLoggingIntegration()]
        },
        context: context.locals.runtime.ctx,
        // @ts-expect-error
        request: context.request,
    }, async function() {
        try {
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
    })
}