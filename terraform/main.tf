locals {
  secrets = {
    "TF_API_TOKEN" : var.TF_API_TOKEN,
    "CLOUDFLARE_API_TOKEN" : var.D1_CLOUDFLARE_API_TOKEN,
  }
}

module "secrets" {
  for_each = local.secrets

  source  = "app.terraform.io/okkema/secret/github"
  version = "~> 0.2"

  repository = var.github_repository
  key        = each.key
  value      = each.value
}

module "bucket" {
  source  = "app.terraform.io/okkema/bucket/cloudflare"
  version = "~> 1.0"

  account_id = var.cloudflare_account_id
  name       = var.github_repository
}

module "database" {
  source  = "app.terraform.io/okkema/database/cloudflare"
  version = "~> 0.1"

  account_id = var.cloudflare_account_id
  name       = var.github_repository
}

module "page" {
  source  = "app.terraform.io/okkema/page/cloudflare"
  version = "~> 0.4"

  account_id     = var.cloudflare_account_id
  zone_id        = var.cloudflare_zone_id
  name           = var.github_repository
  owner          = var.github_owner
  repo_name      = var.github_repository
  pages_hostname = var.pages_hostname

  production_secrets = {
    RSA_PRIVATE_KEY     = var.RSA_PRIVATE_KEY
    OAUTH_CLIENT_SECRET = module.client.client_secret
    HCAPTCHA_SECRET     = var.HCAPTCHA_SECRET
  }

  production_buckets = {
    BLOG   = var.github_repository
    STRAVA = "strava"
  }

  production_env_vars = {
    HCAPTCHA_SITEKEY     = var.HCAPTCHA_SITEKEY
    RSA_PUBLIC_KEY       = var.RSA_PUBLIC_KEY
    OAUTH_CLIENT_ID      = module.client.client_id
    OAUTH_TENANT         = var.OAUTH_TENANT
    EMAIL_OAUTH_AUDIENCE = "https://email.okkema.org"
    EMAIL_OAUTH_SCOPE    = "email:send"
  }

  production_databases = {
    DB = module.database.id
  }

  depends_on = [module.bucket, module.database]
}

module "worker" {
  source  = "app.terraform.io/okkema/worker/cloudflare"
  version = "~> 0.12"

  account_id          = var.cloudflare_account_id
  zone_id             = var.cloudflare_zone_id
  name                = "${var.github_repository}-worker"
  content             = file(abspath("${path.module}/../build/index.js"))
  compatibility_flags = toset(["nodejs_compat"])
  schedules           = [var.WORKER_SCHEDULE]
  env_vars = [
    { name = "WORKER_SCHEDULE", value = var.WORKER_SCHEDULE },
  ]
  secrets = [
    { name = "SENTRY_DSN", value = module.sentry.dsn },
  ]
  buckets = [
    { binding = "BLOG", name = var.github_repository },
    { binding = "STRAVA", name = "strava" }
  ]
  databases = [
    { binding = "DB", id = module.database.id }
  ]

  depends_on = [module.database, module.sentry, module.bucket]
}

module "sentry" {
  source  = "app.terraform.io/okkema/project/sentry"
  version = "~> 0.4"

  github_organization = var.github_owner
  github_repository   = var.github_repository
}

module "client" {
  source  = "app.terraform.io/okkema/client/auth0"
  version = "~> 0.3"

  name = var.github_repository
  grants = {
    "https://email.okkema.org" : ["email:send"]
  }
}