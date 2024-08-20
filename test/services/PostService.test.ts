import { beforeEach, expect, it } from "vitest"
import { env } from "cloudflare:test"
import { PostService } from "@services"
import { PostsTable, schema, TagsTable } from "@schemas"
import { drizzle } from "drizzle-orm/d1"

beforeEach(async function () {
  const db = drizzle(env.DB, { schema })
  await db.insert(PostsTable).values([
    {
      content: "Post1 content",
      published: new Date(0).toISOString(),
      slug: "post-one",
      title: "Post1",
      type: "post",
    },
    {
      content: "Post2 content",
      published: new Date(1).toISOString(),
      slug: "post-two",
      title: "Post2",
      type: "post",
    },
    {
      content: "Post3 content",
      published: new Date(2).toISOString(),
      slug: "post-three",
      title: "Post3",
      type: "post",
    },
  ])
  await db.insert(TagsTable).values([
    {
      name: "Tag1",
      post_slug: "post-one",
    },
    {
      name: "Tag2",
      post_slug: "post-one",
    },
    {
      name: "Tag2",
      post_slug: "post-two",
    },
    {
      name: "Tag3",
      post_slug: "post-two",
    },
    {
      name: "Tag3",
      post_slug: "post-three",
    },
  ])
})
it("should get post by slug", async function () {
  const service = PostService(env.DB)
  const result = await service.getBySlug("post-one")
  expect(result).toMatchInlineSnapshot(`
      {
        "content": "Post1 content",
        "published": 1970-01-01T00:00:00.000Z,
        "slug": "post-one",
        "tags": [
          "Tag1",
          "Tag2",
        ],
        "title": "Post1",
        "type": "post",
      }
    `)
})
it("should list posts", async function () {
  const service = PostService(env.DB)
  const result = await service.list()
  expect(result).toMatchInlineSnapshot(`
    [
      {
        "content": "Post3 content",
        "published": 1970-01-01T00:00:00.002Z,
        "slug": "post-three",
        "tags": [
          "Tag3",
        ],
        "title": "Post3",
        "type": "post",
      },
      {
        "content": "Post2 content",
        "published": 1970-01-01T00:00:00.001Z,
        "slug": "post-two",
        "tags": [
          "Tag2",
          "Tag3",
        ],
        "title": "Post2",
        "type": "post",
      },
      {
        "content": "Post1 content",
        "published": 1970-01-01T00:00:00.000Z,
        "slug": "post-one",
        "tags": [
          "Tag1",
          "Tag2",
        ],
        "title": "Post1",
        "type": "post",
      },
    ]
  `)
})
it("should upsert post and tags", async function () {
  const service = PostService(env.DB)
  const value = await service.getBySlug("post-one")
  value!.title = "Post1.1"
  value!.tags.push("Tag3")
  value!.updated = new Date(1)
  expect(value!.tags.length).toBe(3)
  const result = await service.upsert(value!)
  expect(result).toMatchInlineSnapshot(`
    {
      "content": "Post1 content",
      "published": 1970-01-01T00:00:00.000Z,
      "slug": "post-one",
      "tags": [
        "Tag1",
        "Tag2",
        "Tag3",
      ],
      "title": "Post1.1",
      "type": "post",
      "updated": 1970-01-01T00:00:00.001Z,
    }
  `)
})
it("should get the latest post", async function() {
  const service = PostService(env.DB)
  const result = await service.getLatest()
  expect(result).toMatchInlineSnapshot(`
    {
      "content": "Post3 content",
      "published": 1970-01-01T00:00:00.002Z,
      "slug": "post-three",
      "tags": [
        "Tag3",
      ],
      "title": "Post3",
      "type": "post",
    }
  `)
})
it("should list posts by tag", async function() {
  const service = PostService(env.DB)
  const result = await service.listByTag("Tag2")
  expect(result).toMatchInlineSnapshot(`
    [
      {
        "content": "Post2 content",
        "published": 1970-01-01T00:00:00.001Z,
        "slug": "post-two",
        "tags": [
          "Tag2",
          "Tag3",
        ],
        "title": "Post2",
        "type": "post",
      },
      {
        "content": "Post1 content",
        "published": 1970-01-01T00:00:00.000Z,
        "slug": "post-one",
        "tags": [
          "Tag1",
          "Tag2",
        ],
        "title": "Post1",
        "type": "post",
      },
    ]
  `)
})