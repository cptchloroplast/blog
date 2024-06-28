terraform {
  backend "remote" {
    organization = "okkema"
    workspaces {
      name = "blog"
    }
  }
}