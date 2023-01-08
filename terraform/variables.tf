variable "cloudflare_account_id" {}
variable "cloudflare_zone_id" {}
variable "cloudflare_zone" {}
variable "github_owner" {}
variable "github_repository" {}
variable "github_branch" {}
variable "build_command" {}
variable "build_destination" {}
variable "pages_name" {}
variable "pages_subdomain" {}

# Environment Variables
variable "HCAPTCHA_SITEKEY" {}
variable "MAILJET_API_KEY" {}
variable "MAILJET_SECRET_KEY" {}
variable "ADMIN_EMAIL" {}

# GitHub Actions Secrets
variable "TF_API_TOKEN" {}
