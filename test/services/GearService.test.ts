import { beforeEach, expect, it } from "vitest"
import { env } from "cloudflare:test"
import { GearService } from "@services"
import { drizzle } from "drizzle-orm/d1"
import { GearTable, schema } from "@schemas/strava"

beforeEach(async function() {
    await drizzle(env.DB, { schema }).insert(GearTable).values([
        {
            frame_type: "Mountain Bike",
            id: "001",
            name: "MTB",
            slug: "mtb"
        },
        {
            frame_type: "Road Bike",
            id: "002",
            name: "Roadie",
            slug: "roadie"
        }
    ])
})
it("should get gear by slug", async function() {
    const service = GearService(env.DB)
    const result = await service.getBySlug("mtb")
    expect(result).toMatchInlineSnapshot(`
      {
        "brand_name": null,
        "components": [],
        "description": null,
        "frame_type": "Mountain Bike",
        "id": "001",
        "model_name": null,
        "name": "MTB",
        "slug": "mtb",
      }
    `)
})
it("should get gear by id", async function() {
    const service = GearService(env.DB)
    const result = await service.getById("002")
    expect(result).toMatchInlineSnapshot(`
      {
        "brand_name": null,
        "components": [],
        "description": null,
        "frame_type": "Road Bike",
        "id": "002",
        "model_name": null,
        "name": "Roadie",
        "slug": "roadie",
      }
    `)
})
it("should list all gear", async function() {
    const service = GearService(env.DB)
    const result = await service.list()
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "brand_name": null,
          "components": [],
          "description": null,
          "frame_type": "Mountain Bike",
          "id": "001",
          "model_name": null,
          "name": "MTB",
          "slug": "mtb",
        },
        {
          "brand_name": null,
          "components": [],
          "description": null,
          "frame_type": "Road Bike",
          "id": "002",
          "model_name": null,
          "name": "Roadie",
          "slug": "roadie",
        },
      ]
    `)
})
