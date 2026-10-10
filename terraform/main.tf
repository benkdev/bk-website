locals {
  bucket_name           = var.bucket_name != "" ? var.bucket_name : var.domain_name
  analytics_bucket_name = var.analytics_bucket_name != "" ? var.analytics_bucket_name : "${local.bucket_name}-analytics"
  dist_path             = abspath("${path.module}/${var.dist_dir}")

  mime_types = {
    ".html"        = "text/html"
    ".css"         = "text/css"
    ".js"          = "application/javascript"
    ".json"        = "application/json"
    ".svg"         = "image/svg+xml"
    ".png"         = "image/png"
    ".jpg"         = "image/jpeg"
    ".jpeg"        = "image/jpeg"
    ".gif"         = "image/gif"
    ".ico"         = "image/x-icon"
    ".txt"         = "text/plain"
    ".xml"         = "application/xml"
    ".woff"        = "font/woff"
    ".woff2"       = "font/woff2"
    ".ttf"         = "font/ttf"
    ".eot"         = "application/vnd.ms-fontobject"
    ".webmanifest" = "application/manifest+json"
  }
}

# ==============================================================================
# S3 BUCKET FOR STATIC WEBSITE
# ==============================================================================

resource "aws_s3_bucket" "site" {
  bucket        = local.bucket_name
  force_destroy = true
}

# S3 Website Hosting Configuration
# index.html and error.html both point to index.html for React SPA client-side routing
resource "aws_s3_bucket_website_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# Public Access Block Configuration for Static Website
resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# S3 Bucket Policy allowing Public Read Access for Web Visitors
resource "aws_s3_bucket_policy" "site_public_read" {
  bucket = aws_s3_bucket.site.id

  depends_on = [aws_s3_bucket_public_access_block.site]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.site.arn}/*"
      }
    ]
  })
}

# S3 CORS Configuration for Fonts and Web Assets
resource "aws_s3_bucket_cors_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# Automated S3 File Uploads from dist/
# Includes dynamic MIME type detection and optimized Cache-Control headers
resource "aws_s3_object" "dist_files" {
  for_each = fileset(local.dist_path, "**/*")

  bucket = aws_s3_bucket.site.id
  key    = each.value
  source = "${local.dist_path}/${each.value}"
  etag   = filemd5("${local.dist_path}/${each.value}")

  content_type = lookup(
    local.mime_types,
    lower(try(regex("\\.[^.]+$", each.value), "")),
    "application/octet-stream"
  )

  cache_control = startswith(each.value, "assets/") ? "public, max-age=31536000, immutable" : (
    each.value == "index.html" ? "public, max-age=0, must-revalidate" : "public, max-age=86400"
  )
}

# ==============================================================================
# S3 ANALYTICS & LOGGING BUCKET
# ==============================================================================

resource "aws_s3_bucket" "analytics" {
  bucket        = local.analytics_bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "analytics" {
  bucket = aws_s3_bucket.analytics.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "analytics" {
  depends_on = [aws_s3_bucket_ownership_controls.analytics]
  bucket     = aws_s3_bucket.analytics.id
  acl        = "log-delivery-write"
}

# Lifecycle management for logs: archive after 30 days, clean up raw logs after 90 days
resource "aws_s3_bucket_lifecycle_configuration" "analytics" {
  bucket = aws_s3_bucket.analytics.id

  rule {
    id     = "archive-raw-access-logs"
    status = "Enabled"

    filter {
      prefix = "raw-logs/"
    }

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    expiration {
      days = 90
    }
  }
}

# Enable Server Access Logging from the Website bucket to the Analytics bucket
resource "aws_s3_bucket_logging" "site" {
  count = var.enable_access_logging ? 1 : 0

  bucket        = aws_s3_bucket.site.id
  target_bucket = aws_s3_bucket.analytics.id
  target_prefix = "raw-logs/s3/"
}

# ==============================================================================
# OPTIONAL CLOUDFRONT CDN DISTRIBUTION
# ==============================================================================

resource "aws_cloudfront_distribution" "site" {
  count = var.enable_cloudfront ? 1 : 0

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = var.price_class
  aliases             = var.acm_certificate_arn != "" ? [var.domain_name] : []

  origin {
    domain_name = aws_s3_bucket_website_configuration.site.website_endpoint
    origin_id   = "S3Website-${aws_s3_bucket.site.id}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  dynamic "logging_config" {
    for_each = var.enable_access_logging ? [1] : []
    content {
      include_cookies = false
      bucket          = aws_s3_bucket.analytics.bucket_domain_name
      prefix          = "raw-logs/cloudfront/"
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Website-${aws_s3_bucket.site.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn            = var.acm_certificate_arn != "" ? var.acm_certificate_arn : null
    cloudfront_default_certificate = var.acm_certificate_arn == "" ? true : false
    ssl_support_method             = var.acm_certificate_arn != "" ? "sni-only" : null
    minimum_protocol_version       = var.acm_certificate_arn != "" ? "TLSv1.2_2021" : null
  }
}

# ==============================================================================
# AUTOMATED VISITOR REPORT GENERATOR LAMBDA (S3 REPORT OUTPUT)
# ==============================================================================

data "archive_file" "report_generator_zip" {
  count       = var.enable_report_generator_lambda ? 1 : 0
  type        = "zip"
  source_file = "${path.module}/lambda/report_generator.py"
  output_path = "${path.module}/lambda/report_generator.zip"
}

resource "aws_iam_role" "lambda_report_generator" {
  count = var.enable_report_generator_lambda ? 1 : 0
  name  = "${replace(local.bucket_name, ".", "-")}-reporter-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "lambda_report_generator" {
  count = var.enable_report_generator_lambda ? 1 : 0
  name  = "${replace(local.bucket_name, ".", "-")}-reporter-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.analytics.arn
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject"
        ]
        Resource = [
          "${aws_s3_bucket.analytics.arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_report_generator" {
  count      = var.enable_report_generator_lambda ? 1 : 0
  role       = aws_iam_role.lambda_report_generator[0].name
  policy_arn = aws_iam_policy.lambda_report_generator[0].arn
}

resource "aws_lambda_function" "report_generator" {
  count            = var.enable_report_generator_lambda ? 1 : 0
  function_name    = "${replace(local.bucket_name, ".", "-")}-visitor-reporter"
  role             = aws_iam_role.lambda_report_generator[0].arn
  handler          = "report_generator.lambda_handler"
  runtime          = "python3.12"
  filename         = data.archive_file.report_generator_zip[0].output_path
  source_code_hash = data.archive_file.report_generator_zip[0].output_base64sha256
  timeout          = 60
  memory_size      = 256

  environment {
    variables = {
      ANALYTICS_BUCKET = aws_s3_bucket.analytics.id
      RAW_LOG_PREFIX   = "raw-logs/"
      REPORTS_PREFIX   = "reports/"
    }
  }
}

# EventBridge rule to automatically trigger the report generator on schedule
resource "aws_cloudwatch_event_rule" "daily_report" {
  count               = var.enable_report_generator_lambda ? 1 : 0
  name                = "${replace(local.bucket_name, ".", "-")}-daily-report"
  description         = "Trigger daily visitor analytics report generation"
  schedule_expression = var.report_schedule_cron
}

resource "aws_cloudwatch_event_target" "daily_report" {
  count     = var.enable_report_generator_lambda ? 1 : 0
  rule      = aws_cloudwatch_event_rule.daily_report[0].name
  target_id = "VisitorReporterLambda"
  arn       = aws_lambda_function.report_generator[0].arn
}

resource "aws_lambda_permission" "allow_cloudwatch" {
  count         = var.enable_report_generator_lambda ? 1 : 0
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.report_generator[0].function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.daily_report[0].arn
}
