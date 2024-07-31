/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type R2Bucket = import("@cloudflare/workers-types").R2Bucket
type D1Database = import("@cloudflare/workers-types").D1Database
export type Environment = {
  MAILJET_API_KEY: string
  MAILJET_SECRET_KEY: string
  ADMIN_EMAIL: string
  BUCKET: R2Bucket
  RSA_PUBLIC_KEY: string
  RSA_PRIVATE_KEY: string
  CF_PAGES_COMMIT_SHA: string;
  STRAVA: R2Bucket
  DB: D1Database
}

type Runtime = import("@astrojs/cloudflare").Runtime<Environment>
declare global {
  namespace App {
    interface Locals extends Runtime { }
  }
}