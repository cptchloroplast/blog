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
    GOOGLE_CREDENTIALS = var.GOOGLE_CREDENTIALS
    MAILJET_SECRET_KEY = var.MAILJET_SECRET_KEY
    RSA_PRIVATE_KEY    = var.RSA_PRIVATE_KEY
  }

  production_buckets = {
    BUCKET = var.github_repository
    STRAVA = "strava"
  }

  production_env_vars = {
    HCAPTCHA_SITEKEY    = var.HCAPTCHA_SITEKEY
    MAILJET_API_KEY     = var.MAILJET_API_KEY
    ADMIN_EMAIL         = var.ADMIN_EMAIL
    GOOGLE_SHEETS_ID    = var.GOOGLE_SHEETS_ID
    GOOGLE_SHEETS_RANGE = var.GOOGLE_SHEETS_RANGE
    RSA_PUBLIC_KEY      = var.RSA_PUBLIC_KEY
  }

  production_databases = {
    DB = module.database.id
  }

  depends_on = [module.bucket, module.database]
}

module "worker" {
  source  = "app.terraform.io/okkema/worker/cloudflare"
  version = "~> 0.11"

  account_id = var.cloudflare_account_id
  zone_id    = var.cloudflare_zone_id
  name       = "${var.github_repository}-worker"
  content    = file(abspath("${path.module}/../build/index.js"))
  schedules  = [var.WORKER_SCHEDULE]
  env_vars = [
    { name = "WORKER_SCHEDULE", value = var.WORKER_SCHEDULE }
  ]
  buckets = [
    { binding = "STRAVA", name = "strava" }
  ]
  databases = [
    { binding = "DB", id = module.database.id }
  ]

  depends_on = [module.database]
}