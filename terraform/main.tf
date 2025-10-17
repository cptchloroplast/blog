locals {
  role = "Blog Admin"
  audience = {
    email = "https://email.${module.zone.name}"
    blog  = "https://${var.pages_hostname}.${module.zone.name}"
  }
  scopes = {
    email = "send:email"
    blog  = "write:metadata"
  }
  secrets = {
    "TF_API_TOKEN" : var.TF_API_TOKEN,
    "CLOUDFLARE_API_TOKEN" : var.D1_CLOUDFLARE_API_TOKEN,
  }
}

module "zone" {
  source  = "app.terraform.io/okkema/zone/cloudflare"
  version = "~> 1.0"

  zone_id = var.cloudflare_zone_id
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
  version = "~> 2.0"

  account_id = var.cloudflare_account_id
  name       = var.github_repository
}

module "database" {
  source  = "app.terraform.io/okkema/database/cloudflare"
  version = "~> 1.0"

  account_id = var.cloudflare_account_id
  name       = var.github_repository
}

module "page" {
  source  = "app.terraform.io/okkema/page/cloudflare"
  version = "~> 1.0"

  account_id = var.cloudflare_account_id
  zone_id    = var.cloudflare_zone_id
  name       = var.github_repository
  owner      = var.github_owner
  repo_name  = var.github_repository
  hostnames  = [var.pages_hostname]
  env_vars = [
    { name = "HCAPTCHA_SITEKEY", text = var.HCAPTCHA_SITEKEY },
    { name = "RSA_PUBLIC_KEY", text = var.RSA_PUBLIC_KEY },
    { name = "OAUTH_CLIENT_ID", text = module.client.client_id },
    { name = "OAUTH_TENANT", text = var.OAUTH_TENANT },
    { name = "EMAIL_OAUTH_AUDIENCE", text = local.audience.email },
    { name = "EMAIL_OAUTH_SCOPE", text = local.scopes.email },
    { name = "OAUTH_AUDIENCE", text = local.audience.blog },
    { name = "OAUTH_SCOPE", text = local.scopes.blog },
    { name = "GITHUB_OWNER", text = var.github_owner },
    { name = "GITHUB_REPOSITORY", text = var.github_repository },
  ]
  secrets = [
    { name = "RSA_PRIVATE_KEY", text = var.RSA_PRIVATE_KEY },
    { name = "OAUTH_CLIENT_SECRET", text = module.client.client_secret },
    { name = "HCAPTCHA_SECRET", text = var.HCAPTCHA_SECRET },
    { name = "SENTRY_DSN", text = module.sentry.dsn },
  ]
  buckets = [
    { name = "BLOG", bucket_name = var.github_repository },
    { name = "STRAVA", bucket_name = "strava" }
  ]
  databases = [
    { name = "DB", id = module.database.id }
  ]

  depends_on = [module.bucket, module.database]
}

module "worker" {
  source  = "app.terraform.io/okkema/worker/cloudflare"
  version = "~> 1.0"

  account_id          = var.cloudflare_account_id
  zone_id             = var.cloudflare_zone_id
  name                = "${var.github_repository}-worker"
  content_file        = abspath("${path.module}/../build/index.js")
  compatibility_flags = ["nodejs_compat_v2"]
  schedules           = [
    { cron = var.WORKER_SCHEDULE }
  ]
  env_vars = [
    { name = "WORKER_SCHEDULE", text = var.WORKER_SCHEDULE },
  ]
  secrets = [
    { name = "SENTRY_DSN", text = module.sentry.dsn },
  ]
  buckets = [
    { name = "BLOG", bucket_name = var.github_repository },
    { name = "STRAVA", bucket_name = "strava" }
  ]
  databases = [
    { name = "DB", id = module.database.id }
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
  version = "~> 1.0"

  name = var.github_repository
  grants = [
    {
      audience = local.audience.email
      scopes   = [local.scopes.email]
    }
  ]
  callbacks = [
    "${local.audience.blog}/auth/login/callback",
    "http://localhost:5000/auth/login/callback"
  ]
  logouts = [
    "${local.audience.blog}/auth/logout/callback",
    "http://localhost:5000/auth/logout/callback"
  ]
}

module "server" {
  source  = "app.terraform.io/okkema/server/auth0"
  version = "~> 1.0"

  name       = var.github_repository
  identifier = local.audience.blog
  scopes = [
    { name = local.scopes.blog, description = "Update blog metadata" }
  ]
}

module "role" {
  source  = "app.terraform.io/okkema/role/auth0"
  version = "~> 0.2"

  name = local.role
  scopes = [
    { name = local.scopes.blog, audience = local.audience.blog }
  ]
}

