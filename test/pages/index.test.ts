import { env, createExecutionContext, waitOnExecutionContext } from "cloudflare:test"
import { it, expect, beforeAll } from "vitest"
import { setupEnvironment } from "./setup"
// @ts-ignore cannot find module
import worker from "../../dist/_worker.js"
beforeAll(async function() {
  await setupEnvironment(env.DB) 
})
it.skip("responds with HTML", async function() {
  const request = new Request("http://localhost")
  const ctx = createExecutionContext()
  const response: Response = await worker.fetch(request, env, ctx)
  await waitOnExecutionContext(ctx)
  expect(await response.text()).toContain("<!DOCTYPE html>")
  expect(response.headers.get("Content-Type")).toContain("text/html")
})
