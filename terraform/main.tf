locals {
  secrets = {
    "TF_API_TOKEN" : var.TF_API_TOKEN,
  }
}

module "secrets" {
  for_each = local.secrets

  source  = "app.terraform.io/okkema/secret/github"
  version = "0.2.1"

  repository = var.github_repository
  key        = each.key
  value      = each.value
}

module "bucket" {
  source  = "app.terraform.io/okkema/bucket/cloudflare"
  version = "0.1.1"

  account_id = var.cloudflare_account_id
  access_key = var.cloudflare_r2_access_key
  secret_key = var.cloudflare_r2_secret_key
  bucket     = var.github_repository
}

resource "cloudflare_pages_project" "project" {
  account_id        = var.cloudflare_account_id
  name              = var.github_repository
  production_branch = var.github_branch
  build_config {
    build_command   = var.build_command
    destination_dir = var.build_destination
  }
  source {
    type = "github"
    config {
      owner                         = var.github_owner
      repo_name                     = var.github_repository
      production_branch             = var.github_branch
      pr_comments_enabled           = false
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_deployment_setting    = "none"
    }
  }
  deployment_configs {
    production {
      environment_variables = {
        HCAPTCHA_SITEKEY    = var.HCAPTCHA_SITEKEY
        MAILJET_API_KEY     = var.MAILJET_API_KEY
        ADMIN_EMAIL         = var.ADMIN_EMAIL
        GOOGLE_SHEETS_ID    = var.GOOGLE_SHEETS_ID
        GOOGLE_SHEETS_RANGE = var.GOOGLE_SHEETS_RANGE
        RSA_PUBLIC_KEY      = var.RSA_PUBLIC_KEY
      }
      secrets = {
        GOOGLE_CREDENTIALS = var.GOOGLE_CREDENTIALS
        MAILJET_SECRET_KEY = var.MAILJET_SECRET_KEY
        RSA_PRIVATE_KEY    = var.RSA_PRIVATE_KEY
      }
      r2_buckets = {
        BUCKET = var.github_repository
      }
    }
    preview {}
  }
  depends_on = [
    module.bucket
  ]
}

resource "cloudflare_pages_domain" "domain" {
  account_id   = var.cloudflare_account_id
  project_name = var.github_repository
  domain       = "${var.pages_subdomain}.${var.cloudflare_zone}"
  depends_on = [
    cloudflare_pages_project.project,
    cloudflare_record.record,
  ]
}

resource "cloudflare_record" "record" {
  zone_id = var.cloudflare_zone_id
  name    = var.pages_subdomain
  value   = cloudflare_pages_project.project.subdomain
  type    = "CNAME"
  proxied = true
  depends_on = [
    cloudflare_pages_project.project
  ]
}
