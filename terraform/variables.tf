variable "cloudflare_account_id" {}
variable "cloudflare_zone_id" {}
variable "github_owner" {}
variable "github_repository" {}
variable "pages_hostname" {}

# Environment Variables
variable "HCAPTCHA_SITEKEY" {}
variable "HCAPTCHA_SECRET" {
  sensitive = true
}
variable "RSA_PUBLIC_KEY" {}
variable "RSA_PRIVATE_KEY" {
  sensitive = true
}
variable "WORKER_SCHEDULE" {}
variable "D1_CLOUDFLARE_API_TOKEN" {
  sensitive = true
}
variable "OAUTH_TENANT" {}

# GitHub Actions Secrets
variable "TF_API_TOKEN" {
  sensitive = true
}
