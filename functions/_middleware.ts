import { type Environment } from "@env"
import * as Sentry from "@sentry/cloudflare"
export const onRequest = [
  Sentry.sentryPagesPlugin<Environment>((context) => ({
    dsn: context.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    _experiments: {
      enableLogs: true
    },
    integrations: [Sentry.consoleLoggingIntegration()]
  })),
]
