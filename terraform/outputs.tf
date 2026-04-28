output "website_url" {
  value = "https://${var.domain}"
}

output "cloudfront_domain" {
  description = "Use this to test before DNS propagates"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "cloudfront_distribution_id" {
  description = "Needed for GitHub Actions cache invalidation"
  value       = aws_cloudfront_distribution.website.id
}

output "s3_bucket_name" {
  description = "Upload site files here"
  value       = aws_s3_bucket.website.id
}

output "route53_nameservers" {
  description = "Point your domain registrar to these nameservers"
  value       = aws_route53_zone.primary.name_servers
}
