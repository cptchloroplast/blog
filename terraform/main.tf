terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 2.0"
    }
  }

  backend "remote" {
    organization = "okkema"
    workspaces {
      name = "blog"
    }
  }
}

provider "cloudflare" {
  account_id = var.cloudflare_account_id
}

resource "cloudflare_record" "domain" {
  zone_id         = var.cloudflare_zone_id
  name            = var.cloudflare_domain_name
  type            = "CNAME"
  value           = var.cloudflare_pages_url
  proxied         = true
  allow_overwrite = true
}

resource "cloudflare_workers_kv_namespace" "subscribers" {
  title = "blog-subscribers"
}

resource "cloudflare_workers_kv_namespace" "subscribers-preview" {
  title = "blog-subscribers_preview"
}

locals {
  worker_path = abspath("${path.module}/../dist/worker.mjs")
}

resource "cloudflare_worker_script" "worker" {
  name    = "blog"
  content = file(local.worker_path)

  kv_namespace_binding {
    name         = "SUBSCRIBERS"
    namespace_id = cloudflare_workers_kv_namespace.subscribers.id
  }

  plain_text_binding {
    name = "ADMIN_EMAIL"
    text = var.admin_email
  }

  secret_text_binding {
    name = "SENDGRID_API_KEY"
    text = var.sendgrid_api_key
  }
}

resource "cloudflare_worker_route" "route" {
  zone_id     = var.cloudflare_zone_id
  pattern     = var.cloudflare_worker_route_pattern
  script_name = cloudflare_worker_script.worker.name
}