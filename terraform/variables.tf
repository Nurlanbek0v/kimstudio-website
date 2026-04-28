variable "region" {
  description = "Primary AWS region"
  type        = string
  default     = "us-east-1"
}

variable "domain" {
  description = "Root domain"
  type        = string
  default     = "kim-studio.com"
}

variable "www_domain" {
  description = "WWW subdomain"
  type        = string
  default     = "www.kim-studio.com"
}

variable "project" {
  description = "Tag applied to all resources"
  type        = string
  default     = "kimstudio"
}
