terraform {
  backend "remote" {
    organization = "okkema"
    workspaces {
      name = "blog"
    }
  }
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.11"
    }
  }
}