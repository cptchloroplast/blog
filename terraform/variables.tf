variable "cloudflare_account_id" {}
variable "cloudflare_zone_id" {}
variable "github_owner" {}
variable "github_repository" {}
variable "pages_hostname" {}
variable "sentry_default_user" {}

# Environment Variables
variable "HCAPTCHA_SITEKEY" {}
variable "MAILJET_API_KEY" {}
variable "MAILJET_SECRET_KEY" {
  sensitive = true
}
variable "ADMIN_EMAIL" {}
variable "GOOGLE_CREDENTIALS" {
  sensitive = true
}
variable "GOOGLE_SHEETS_ID" {}
variable "GOOGLE_SHEETS_RANGE" {}
variable "RSA_PUBLIC_KEY" {}
variable "RSA_PRIVATE_KEY" {
  sensitive = true
}
variable "WORKER_SCHEDULE" {}
variable "D1_CLOUDFLARE_API_TOKEN" {
  sensitive = true
}

# GitHub Actions Secrets
variable "TF_API_TOKEN" {
  sensitive = true
}
