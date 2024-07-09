/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type R2Bucket = import("@cloudflare/workers-types").R2Bucket
export type Environment = {
    MAILJET_API_KEY: string
    MAILJET_SECRET_KEY: string
    ADMIN_EMAIL: string
    BUCKET: R2Bucket
    RSA_PUBLIC_KEY: string
    RSA_PRIVATE_KEY: string
    CF_PAGES_COMMIT_SHA: string;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Environment>
declare global {
  namespace App {
    interface Locals extends Runtime {}
  }
}