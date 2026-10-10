# AWS Terraform Deployment for Ben Krack Portfolio (`benkrack.com`)

This directory contains the Infrastructure-as-Code (Terraform) to deploy the portfolio showcase as an **AWS S3 Static Website** with:
1. **Automated Static Website Hosting & Asset Uploads**
2. **Comprehensive SEO Optimization** (Sitemap, canonicals, Schema.org JSON-LD, OpenGraph, Twitter Cards)
3. **Automated Visitor Analytics & Reporting Saved Directly to S3**

---

## Architecture Overview

### 1. Amazon S3 Static Hosting
* **Primary S3 Bucket (`var.bucket_name`)**:
  * Configured for static website hosting with `index.html` as both index and error document for React client-side routing.
  * Public read bucket policy applied.
  * Optimized CORS and asset caching:
    * `assets/*`: `public, max-age=31536000, immutable`
    * `index.html`: `public, max-age=0, must-revalidate`

### 2. S3 Analytics & Logging Pipeline
* **Dedicated Analytics Bucket (`<bucket>-analytics`)**:
  * Stores raw S3 and CloudFront access logs in `raw-logs/`.
  * Lifecycle policy: Moves raw logs to Standard-IA after 30 days and expires after 90 days.
  * Stores generated executive reports in `reports/`.

### 3. Automated Visitor Analytics Reports Saved to S3
* **AWS Lambda Function (`*-visitor-reporter`)**:
  * Triggered daily via EventBridge cron (at 01:00 UTC) and can be executed on-demand.
  * Parses access logs to compute:
    * **Unique human visitors** (privacy-preserving cryptographic hashing of IP + user agent)
    * **Human pageviews** vs robot/search crawlers
    * **Top visited pages & routes** (`/`, `/portfolio`, `/companies`)
    * **Top referrers** (e.g. LinkedIn, Google, Direct)
    * **Devices, browsers & operating systems**
    * **HTTP status codes**
  * Generates two primary files in `s3://<analytics-bucket>/reports/`:
    1. **`reports/visitor_summary_latest.html`**: A responsive, self-contained executive dashboard with tables, metric cards, and charts styled in Ben Krack's dark forest aesthetic.
    2. **`reports/visitor_summary_latest.json`**: Structured JSON data for downstream analytics or queries.
    3. **`reports/archive/visitor_report_YYYYMMDD.html`**: Daily historical snapshots.

---

## Viewing Your Visitor Analytics Report from S3

Once deployed, you can access your visitor analytics reports in three convenient ways:

### Option 1: Direct AWS CLI Download
Download and view the latest report from S3 anytime:
```bash
# Download latest report from S3
aws s3 cp s3://benkrack.com-analytics/reports/visitor_summary_latest.html ./reports/visitor_summary_latest.html

# Open in your browser (Windows PowerShell)
Start-Process ./reports/visitor_summary_latest.html
```

### Option 2: Run the Local CLI Report Tool
We also provide a bundled python reporter in `scripts/`:
```bash
# Syncs latest S3 logs, computes analytics, generates the report, and opens it
python scripts/generate_s3_report.py --bucket benkrack.com-analytics --open
```

### Option 3: AWS S3 Console
Open the AWS S3 Console → Go to your `<bucket>-analytics` bucket → Open `reports/visitor_summary_latest.html` and click **Open** or **Download**.

---

## Terraform Step-by-Step Deployment

> **Important**: Do not run `terraform apply` until you are ready and have reviewed `terraform plan`.

### 1. Build the Static Site
Ensure the latest production bundle with SEO meta tags and analytics tracking is compiled:
```bash
npm run build
```

### 2. Initialize Terraform
```bash
cd terraform
terraform init
```

### 3. Review the Plan
```bash
terraform plan
```

This will show all resources:
* Website S3 bucket + static website configuration
* S3 public read bucket policy
* Static assets uploaded from `dist/`
* Dedicated Analytics S3 bucket (`benkrack.com-analytics`)
* S3 Server Access Logging rule
* Visitor Report Generator Lambda + EventBridge daily schedule

### 4. Deploy When Ready
```bash
terraform apply
```

After deployment completes, Terraform outputs the S3 website endpoint and the S3 URI for your analytics reports:
```
Outputs:
s3_website_endpoint            = "http://benkrack.com.s3-website-us-east-1.amazonaws.com"
analytics_bucket_name          = "benkrack.com-analytics"
analytics_reports_s3_uri       = "s3://benkrack.com-analytics/reports/"
analytics_latest_report_command = "aws s3 cp s3://benkrack.com-analytics/reports/visitor_summary_latest.html ./reports/visitor_summary_latest.html"
```
