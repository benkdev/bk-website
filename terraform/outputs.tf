output "s3_bucket_name" {
  description = "Name of the S3 website hosting bucket"
  value       = aws_s3_bucket.site.id
}

output "s3_website_endpoint" {
  description = "Direct HTTP endpoint for S3 static website hosting (e.g. http://benkrack.com.s3-website-us-east-1.amazonaws.com)"
  value       = aws_s3_bucket_website_configuration.site.website_endpoint
}

output "s3_website_domain" {
  description = "Regional domain name of the S3 website endpoint"
  value       = aws_s3_bucket_website_configuration.site.website_domain
}

output "uploaded_files_count" {
  description = "Number of static files uploaded to the S3 bucket"
  value       = length(aws_s3_object.dist_files)
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name (if enabled)"
  value       = var.enable_cloudfront ? aws_cloudfront_distribution.site[0].domain_name : null
}

# ==============================================================================
# ANALYTICS & VISITOR REPORT OUTPUTS
# ==============================================================================

output "analytics_bucket_name" {
  description = "Name of the S3 bucket storing raw access logs and visitor reports"
  value       = aws_s3_bucket.analytics.id
}

output "analytics_reports_s3_uri" {
  description = "S3 URI where generated HTML & JSON visitor reports are stored"
  value       = "s3://${aws_s3_bucket.analytics.id}/reports/"
}

output "analytics_latest_report_command" {
  description = "AWS CLI command to download and view the latest visitor report"
  value       = "aws s3 cp s3://${aws_s3_bucket.analytics.id}/reports/visitor_summary_latest.html ./reports/visitor_summary_latest.html"
}

output "lambda_report_generator_function" {
  description = "Name of the automated report generator Lambda function"
  value       = var.enable_report_generator_lambda ? aws_lambda_function.report_generator[0].function_name : null
}
