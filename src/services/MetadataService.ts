import type { R2Bucket } from "@cloudflare/workers-types"
import type { Metadata } from "@schemas"
import { parseMarkdown } from "@utils"

type MetadataService = {
    get(): Promise<Metadata | undefined>
}

export function MetadataService(blog: R2Bucket): MetadataService {
    return {
        async get() {
            const object = await blog.get("settings/metadata.md")
            const raw = await object?.text()
            return parseMarkdown<Metadata>(raw!).frontmatter
        },
    }
} 