import type { D1Database } from "@cloudflare/workers-types"
import { ComponentsTable, type Gear, GearTable, schema } from "@schemas/strava"
import { conflictUpdateAllExcept } from "@utils"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"

type GearService = {
    getById: (id: string) => Promise<Gear | undefined>
    getBySlug: (slug: string) => Promise<Gear | undefined>
    list: () => Promise<Gear[]>
    upsert: (value: Gear) => Promise<Gear>
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
        async upsert(value) {
            value.slug = value.name.toLowerCase().replace(/ /g, "-")
            const [gear] = await db.insert(GearTable).values(value)
                .onConflictDoUpdate({ target: GearTable.id, set: value }).returning()
            let components = value.components
            if (components.length) {
                components = await db.insert(ComponentsTable)
                    .values(components.map(function(component) { return { ...component, gear_id: gear.id } }))
                    .onConflictDoUpdate({ target: ComponentsTable.id, set: conflictUpdateAllExcept(ComponentsTable, ["id"]) })
                    .returning()
            }
            const returned: Gear = gear as any
            returned.components = components
            return returned
        },
    }
}