import type { R2Bucket } from "@cloudflare/workers-types"
import type { Metadata } from "@schemas"

type MetadataService = {
    get(): Promise<Metadata | undefined>
}

export function MetadataService(blog: R2Bucket): MetadataService {
    return {
        async get() {
            const object = await blog.get("metadata.json")
            return object?.json<Metadata>()
        },
    }
} 