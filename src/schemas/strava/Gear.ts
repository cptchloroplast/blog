import { z } from "zod"
import { relations } from "drizzle-orm"
import { index, real, sqliteTable, text } from "drizzle-orm/sqlite-core"

const RawGearSchema = z.object({
    brand_name: z.string().nullable(),
    components: z.array(z.object({
        added: z.string().datetime(),
        brand: z.string().nullable(),
        distance: z.number(),
        id: z.string(),
        model: z.string().nullable(),
        removed: z.string().datetime().nullable(),
        type: z.string(),
    })),
    description: z.string().nullable(),
    frame_type: z.string(),
    id: z.string(),
    model_name: z.string().nullable(),
    name: z.string()
})

export const GearSchema = RawGearSchema.extend({
    slug: z.string(),
})

export type Gear = z.infer<typeof GearSchema>

export const GearTable = sqliteTable("gear", {
    brand_name: text("brand_name"),
    description: text("description"),
    frame_type: text("frame_type").notNull(),
    id: text("id").primaryKey(),
    model_name: text("model_name"),
    name: text("name").notNull(),
    // calculated fields
    slug: text("slug").notNull(),
}, function(table) {
    return {
        slugIdx: index("slug_idx").on(table.slug),
    }
})

export const GearRelations = relations(GearTable, function({ many }){
    return {
        components: many(ComponentsTable),
    }
})

export const ComponentsTable = sqliteTable("components", {
    added: text("added").notNull(),
    brand: text("brand"),
    distance: real("distance").notNull(),
    gear_id: text("gear_id").notNull().references(function() { return GearTable.id }),
    id: text("id").primaryKey(),
    model: text("string"),
    removed: text("removed"),
    type: text("type").notNull(),
}, function(table) {
    return {
        gearIdIdx: index("gear_id_idx").on(table.gear_id),
    }
})

export const ComponentsRelations = relations(ComponentsTable, function({ one }) {
    return {
        gear: one(GearTable, {
            fields: [ComponentsTable.gear_id],
            references: [GearTable.id],
        })
    }
})