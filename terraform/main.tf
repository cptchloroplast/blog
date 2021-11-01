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
  type            = "AAAA"
  value           = "100::"
  proxied         = true
  allow_overwrite = true
}

resource "cloudflare_workers_kv_namespace" "subscribers" {
  title = "blog-subscribers"
}

locals {
  worker_path = abspath("${path.module}/../dist/worker.js")
}

resource "cloudflare_worker_script" "worker" {
  name    = "blog"
  content = file(local.worker_path)

  kv_namespace_binding {
    name         = "SUBSCRIBERS"
    namespace_id = cloudflare_workers_kv_namespace.subscribers.id
  }
}

resource "cloudflare_worker_route" "route" {
  zone_id     = var.cloudflare_zone_id
  pattern     = var.cloudflare_worker_route_pattern
  script_name = cloudflare_worker_script.worker.name
}