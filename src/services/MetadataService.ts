import type { R2Bucket } from "@cloudflare/workers-types"
import type { Metadata } from "@schemas"
import { parseMarkdown, renderFrontmatter } from "@utils"

type MetadataService = {
    get(): Promise<Metadata | undefined>
    update(metadata: Metadata): Promise<void>
}

const MetadataKey = "settings/metadata.md"

export function MetadataService(blog: R2Bucket): MetadataService {
    return {
        async get() {
            const object = await blog.get(MetadataKey)
            const raw = await object?.text()
            return parseMarkdown<Metadata>(raw!).frontmatter
        },
        async update(metadata) {
            const frontmatter = renderFrontmatter(metadata)
            await blog.put(MetadataKey, frontmatter)
        },
    }
} 