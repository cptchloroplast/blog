locals {
  secrets = {
    "TF_API_TOKEN" : var.TF_API_TOKEN,
  }
}

module "secrets" {
  for_each = local.secrets

  source  = "app.terraform.io/okkema/secret/github"
  version = "0.1.0"

  repository = var.github_repository
  key        = each.key
  value      = each.value
}

resource "cloudflare_pages_project" "project" {
  account_id        = var.cloudflare_account_id
  name              = var.pages_name
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
        HCAPTCHA_SITEKEY   = var.HCAPTCHA_SITEKEY
        MAILJET_API_KEY    = var.MAILJET_API_KEY
        MAILJET_SECRET_KEY = var.MAILJET_SECRET_KEY
        ADMIN_EMAIL        = var.ADMIN_EMAIL
      }
      kv_namespaces = {
        SUBSCRIBERS = cloudflare_workers_kv_namespace.subscribers.id
        KEYS = cloudflare_workers_kv_namespace.keys.id
      }
    }
  }
  depends_on = [
    cloudflare_workers_kv_namespace.subscribers
  ]
}

resource "cloudflare_pages_domain" "domain" {
  account_id   = var.cloudflare_account_id
  project_name = var.pages_name
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

resource "cloudflare_workers_kv_namespace" "subscribers" {
  account_id = var.cloudflare_account_id
  title      = "blog:subscribers"
}

resource "cloudflare_workers_kv_namespace" "keys" {
  account_id = var.cloudflare_account_id
  title      = "blog:keys"
}