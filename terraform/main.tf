locals {
  secrets = {
    "TF_API_TOKEN" : var.TF_API_TOKEN,
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
  build_command  = "npm test"

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

  depends_on = [module.bucket]
}