import type { D1Database } from "@cloudflare/workers-types"
import { ComponentsTable, type Gear, GearTable, schema } from "@schemas/strava"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"

type GearService = {
    getById: (id: string) => Promise<Gear | undefined>
    getBySlug: (slug: string) => Promise<Gear | undefined>
    list: () => Promise<Gear[]>
}

const components = { orderBy: ComponentsTable.type }

export function GearService(d1: D1Database): GearService {
    const db = drizzle(d1, { schema })
    return {
        async getById(id) {
            return db.query.GearTable.findFirst({ with: { components }, where: eq(GearTable.id, id) })
        },
        async getBySlug(slug) {
            return db.query.GearTable.findFirst({ with: { components }, where: eq(GearTable.slug, slug) })  
        },
        async list() {
            return db.query.GearTable.findMany({ with: { components }, orderBy: GearTable.name })
        },
    }
}