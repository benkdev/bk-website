variable "aws_region" {
  description = "AWS region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domain name for the website (e.g., benkrack.com)"
  type        = string
  default     = "benkrack.com"
}

variable "bucket_name" {
  description = "Name of the S3 bucket. If left blank, defaults to var.domain_name ('benkrack.com'). If that bucket already exists or you need a custom name, specify it here."
  type        = string
  default     = ""
}

variable "analytics_bucket_name" {
  description = "Name of the S3 analytics bucket for logs and visitor reports. If left blank, defaults to '<bucket_name>-analytics'."
  type        = string
  default     = ""
}

variable "dist_dir" {
  description = "Relative path to the pre-built dist directory containing production static files"
  type        = string
  default     = "../dist"
}

variable "enable_access_logging" {
  description = "Enable S3 and CloudFront server access logging into the analytics S3 bucket"
  type        = bool
  default     = true
}

variable "enable_report_generator_lambda" {
  description = "Deploy an automated AWS Lambda function to aggregate logs into HTML & JSON reports in S3"
  type        = bool
  default     = true
}

variable "report_schedule_cron" {
  description = "EventBridge cron schedule for automatic daily visitor report generation (UTC)"
  type        = string
  default     = "cron(0 1 * * ? *)" # Runs daily at 01:00 UTC
}

variable "enable_cloudfront" {
  description = "Set to true to provision a CloudFront CDN distribution with SSL/TLS"
  type        = bool
  default     = false
}

variable "acm_certificate_arn" {
  description = "ARN of an existing ACM certificate in us-east-1 if using CloudFront with a custom domain (e.g. benkrack.com)"
  type        = string
  default     = ""
}

variable "price_class" {
  description = "CloudFront price class (e.g. PriceClass_100 for North America & Europe, PriceClass_All for global edge locations)"
  type        = string
  default     = "PriceClass_100"
}
