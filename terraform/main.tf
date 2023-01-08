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
        HCAPTCHA_SITEKEY = var.HCAPTCHA_SITEKEY
      }
    }
  }
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

# resource "cloudflare_workers_kv_namespace" "subscribers" {
#   title = "blog-subscribers"
# }

# resource "cloudflare_workers_kv_namespace" "subscribers-preview" {
#   title = "blog-subscribers_preview"
# }

# locals {
#   worker_path = abspath("${path.module}/../dist/worker.mjs")
# }

# resource "cloudflare_worker_script" "worker" {
#   name    = "blog"
#   content = file(local.worker_path)

#   kv_namespace_binding {
#     name         = "SUBSCRIBERS"
#     namespace_id = cloudflare_workers_kv_namespace.subscribers.id
#   }

#   plain_text_binding {
#     name = "ADMIN_EMAIL"
#     text = var.admin_email
#   }

#   secret_text_binding {
#     name = "SENDGRID_API_KEY"
#     text = var.sendgrid_api_key
#   }
# }

# resource "cloudflare_worker_route" "route" {
#   zone_id     = var.cloudflare_zone_id
#   pattern     = var.cloudflare_worker_route_pattern
#   script_name = cloudflare_worker_script.worker.name
# }