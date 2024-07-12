import { env, createExecutionContext, waitOnExecutionContext } from "cloudflare:test"
import { describe, it, expect } from "vitest"
import worker from "../dist/_worker.js"

describe("index", function() {
  it("responds with HTML", async function() {
    const request = new Request("http://localhost")
    const ctx = createExecutionContext()
    const response: Response = await worker.fetch(request, env, ctx)
    await waitOnExecutionContext(ctx)
    expect(await response.text()).toContain("<!DOCTYPE html>")
    expect(response.headers.get("Content-Type")).toContain("text/html")
  })
})