import { createExecutionContext, createScheduledController, env, waitOnExecutionContext } from "cloudflare:test"
import { it } from "vitest"
import worker from "@functions"

it("dispatches scheduled event", async () => {
	const controller = createScheduledController({
		scheduledTime: new Date(),
		cron: "* * * * *",
	})
	const ctx = createExecutionContext()
    await worker.scheduled(controller, env, ctx)
	await waitOnExecutionContext(ctx)
})