variable "cloudflare_account_id" {}
variable "cloudflare_r2_access_key" {
  sensitive = true
}
variable "cloudflare_r2_secret_key" {
  sensitive = true
}
variable "cloudflare_zone_id" {}
variable "cloudflare_zone" {}
variable "github_owner" {}
variable "github_repository" {}
variable "github_branch" {}
variable "build_command" {}
variable "build_destination" {}
variable "pages_subdomain" {}

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

# GitHub Actions Secrets
variable "TF_API_TOKEN" {
  sensitive = true
}
