import type { ExecutionContext, ScheduledController } from "@cloudflare/workers-types"
import type { Environment } from "@env"
import { BucketService } from "@services"
import { instrumentD1WithSentry } from "@sentry/cloudflare"
import { SentryWorker } from "@okkema/worker/sentry"

export default SentryWorker<Environment>({
    async scheduled(controller: ScheduledController, env: Environment, ctx: ExecutionContext) {
        const db = instrumentD1WithSentry(env.DB)
        const service = BucketService(env.BLOG, env.STRAVA, db)
        await Promise.all([
            service.processGear(),
            service.processPosts()
        ])
    }
})