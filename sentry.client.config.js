import * as Sentry from "@sentry/astro"
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  sendDefaultPii: true,
  _experiments: {
    enableLogs: true
  },
  integrations: [Sentry.consoleLoggingIntegration()]
})
