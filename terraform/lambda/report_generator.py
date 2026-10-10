"""
AWS Lambda Visitor Analytics Report Generator for Ben Krack Portfolio
Parses S3 and CloudFront access logs, aggregates visitor metrics,
and writes comprehensive HTML & JSON reports to S3.
"""

import os
import re
import json
import gzip
import hashlib
from datetime import datetime, timezone
from collections import Counter, defaultdict

try:
    import boto3
    s3 = boto3.client("s3")
except ImportError:
    s3 = None

# S3 Access Log regex pattern
# Reference: https://docs.aws.amazon.com/AmazonS3/latest/userguide/LogFormat.html
S3_LOG_PATTERN = re.compile(
    r'(?P<owner>\S+) (?P<bucket>\S+) \[(?P<timestamp>[^\]]+)\] (?P<remote_ip>\S+) '
    r'(?P<requester>\S+) (?P<request_id>\S+) (?P<operation>\S+) (?P<key>\S+) '
    r'"(?P<request_uri>[^"]*)" (?P<status>\S+) (?P<error_code>\S+) (?P<bytes_sent>\S+) '
    r'(?P<object_size>\S+) (?P<total_time>\S+) (?P<turn_around_time>\S+) '
    r'"(?P<referrer>[^"]*)" "(?P<user_agent>[^"]*)"'
)

def parse_user_agent(ua_str):
    """Classifies user agent into browser, OS, device, and bot flag."""
    ua_lower = ua_str.lower()
    
    # Bot detection
    is_bot = any(b in ua_lower for b in ["bot", "crawl", "spider", "slurp", "facebookexternalhit", "lighthouse", "curl", "wget", "python"])
    
    # Device
    if any(m in ua_lower for m in ["iphone", "android", "mobile"]):
        device = "Mobile"
    elif "ipad" in ua_lower or "tablet" in ua_lower:
        device = "Tablet"
    else:
        device = "Desktop"
        
    # Browser
    if "edg/" in ua_lower:
        browser = "Microsoft Edge"
    elif "chrome/" in ua_lower and "safari" in ua_lower:
        browser = "Google Chrome"
    elif "safari/" in ua_lower and not "chrome" in ua_lower:
        browser = "Apple Safari"
    elif "firefox/" in ua_lower:
        browser = "Mozilla Firefox"
    elif is_bot:
        browser = "Search Bot / Crawler"
    else:
        browser = "Other / Unknown"
        
    # OS
    if "mac os" in ua_lower or "macintosh" in ua_lower:
        os_name = "macOS"
    elif "windows" in ua_lower:
        os_name = "Windows"
    elif "iphone" in ua_lower or "ipad" in ua_lower:
        os_name = "iOS"
    elif "android" in ua_lower:
        os_name = "Android"
    elif "linux" in ua_lower:
        os_name = "Linux"
    else:
        os_name = "Other"
        
    return {
        "is_bot": is_bot,
        "device": device,
        "browser": browser,
        "os": os_name
    }

def clean_path(raw_path):
    """Cleans request path and extracts route."""
    if not raw_path or raw_path == "-":
        return "/"
    # Strip HTTP verb and HTTP version if present
    parts = raw_path.split()
    path = parts[1] if len(parts) > 1 else parts[0]
    # Strip query parameters
    path = path.split("?")[0]
    return path

def clean_referrer(ref):
    """Cleans and standardizes referrer."""
    if not ref or ref == "-" or ref == "Direct":
        return "Direct / Bookmark"
    try:
        # Extract hostname
        if "//" in ref:
            host = ref.split("//")[1].split("/")[0]
            if "linkedin.com" in host:
                return "LinkedIn"
            if "google.com" in host:
                return "Google Search"
            if "github.com" in host:
                return "GitHub"
            if "t.co" in host or "twitter.com" in host or "x.com" in host:
                return "X / Twitter"
            return host
        return ref
    except Exception:
        return ref

def parse_log_content(content_str):
    """Parses raw log text into structured event records."""
    records = []
    for line in content_str.splitlines():
        line = line.strip()
        if not line:
            continue
        # Check S3 access log format
        match = S3_LOG_PATTERN.match(line)
        if match:
            d = match.groupdict()
            ua_info = parse_user_agent(d.get("user_agent", ""))
            path = clean_path(d.get("request_uri", ""))
            
            # Anonymize IP using cryptographic hash for privacy
            ip = d.get("remote_ip", "")
            visitor_hash = hashlib.sha256(f"{ip}-{d.get('user_agent', '')}".encode()).hexdigest()[:12] if ip else "unknown"
            
            records.append({
                "timestamp": d.get("timestamp", ""),
                "visitor_hash": visitor_hash,
                "path": path,
                "status": d.get("status", ""),
                "referrer": clean_referrer(d.get("referrer", "")),
                "user_agent": d.get("user_agent", ""),
                "device": ua_info["device"],
                "browser": ua_info["browser"],
                "os": ua_info["os"],
                "is_bot": ua_info["is_bot"]
            })
            continue

        # CloudFront tab-delimited format fallback
        if not line.startswith("#") and "\t" in line:
            parts = line.split("\t")
            if len(parts) >= 15:
                # Fields: date, time, x-edge-location, sc-bytes, c-ip, cs-method, cs(Host), cs-uri-stem, sc-status, cs(Referer), cs(User-Agent)
                try:
                    c_ip = parts[4]
                    stem = parts[7]
                    status = parts[8]
                    ref = parts[9]
                    ua = parts[10] if len(parts) > 10 else ""
                    ua_info = parse_user_agent(ua)
                    visitor_hash = hashlib.sha256(f"{c_ip}-{ua}".encode()).hexdigest()[:12]
                    records.append({
                        "timestamp": f"{parts[0]} {parts[1]}",
                        "visitor_hash": visitor_hash,
                        "path": clean_path(stem),
                        "status": status,
                        "referrer": clean_referrer(ref),
                        "user_agent": ua,
                        "device": ua_info["device"],
                        "browser": ua_info["browser"],
                        "os": ua_info["os"],
                        "is_bot": ua_info["is_bot"]
                    })
                except Exception:
                    pass
    return records

def generate_html_report(data):
    """Renders a standalone, responsive executive HTML report dashboard."""
    gen_time = data["generated_at"]
    total_reqs = data["total_requests"]
    total_pageviews = data["human_pageviews"]
    unique_visitors = data["unique_human_visitors"]
    bot_requests = data["bot_requests"]

    # Table rows helper
    def render_rows(counter_dict, label_col="Item"):
        if not counter_dict:
            return "<tr><td colspan='3' class='empty'>No data recorded yet</td></tr>"
        rows = []
        total = sum(counter_dict.values()) or 1
        for k, v in counter_dict.items():
            pct = round((v / total) * 100, 1)
            rows.append(f"""
            <tr>
              <td class="name-cell">{k}</td>
              <td class="count-cell">{v:,}</td>
              <td class="pct-cell">
                <div class="bar-container">
                  <div class="bar" style="width: {pct}%"></div>
                  <span>{pct}%</span>
                </div>
              </td>
            </tr>
            """)
        return "".join(rows)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ben Krack Portfolio – Visitor Analytics Report</title>
  <style>
    :root {{
      --forest-900: #02160d;
      --forest-800: #063722;
      --forest-700: #047857;
      --mint-400: #34d399;
      --mint-300: #6ee7b7;
      --slate-50: #f8fafc;
      --slate-100: #f1f5f9;
      --slate-800: #1e293b;
      --slate-900: #0f172a;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #09120e;
      color: #e2e8f0;
      padding: 32px 20px;
      line-height: 1.5;
    }}
    .container {{
      max-width: 1100px;
      margin: 0 auto;
    }}
    header {{
      background: linear-gradient(135deg, #063722 0%, #02160d 100%);
      border: 1px solid rgba(52, 211, 153, 0.25);
      border-radius: 20px;
      padding: 32px;
      margin-bottom: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4);
    }}
    .brand {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}
    .brand-badge {{
      width: 48px;
      height: 48px;
      background: #047857;
      border: 1px solid #34d399;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 20px;
      color: #fff;
    }}
    h1 {{ font-size: 24px; font-weight: 600; color: #fff; letter-spacing: -0.5px; }}
    .subtitle {{ color: #a7f3d0; font-size: 14px; margin-top: 2px; }}
    .timestamp {{
      font-size: 13px;
      color: #94a3b8;
      background: rgba(0,0,0,0.3);
      padding: 8px 14px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.08);
    }}
    .metrics-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 18px;
      margin-bottom: 28px;
    }}
    .card {{
      background: #111e17;
      border: 1px solid rgba(52, 211, 153, 0.15);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }}
    .card-label {{
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #34d399;
      font-weight: 700;
      margin-bottom: 8px;
    }}
    .card-val {{
      font-size: 36px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1;
      letter-spacing: -1px;
    }}
    .card-sub {{
      font-size: 12px;
      color: #94a3b8;
      margin-top: 8px;
    }}
    .panels-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
      gap: 24px;
    }}
    @media(max-width: 600px) {{
      .panels-grid {{ grid-template-columns: 1fr; }}
    }}
    .panel {{
      background: #111e17;
      border: 1px solid rgba(52, 211, 153, 0.15);
      border-radius: 16px;
      padding: 24px;
    }}
    .panel-title {{
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }}
    th {{
      text-align: left;
      padding: 8px 10px;
      color: #94a3b8;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
    }}
    td {{
      padding: 10px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }}
    .name-cell {{ color: #f1f5f9; font-weight: 500; }}
    .count-cell {{ text-align: right; font-weight: 700; color: #34d399; width: 80px; }}
    .pct-cell {{ width: 140px; padding-left: 14px; }}
    .bar-container {{
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #94a3b8;
    }}
    .bar {{
      height: 6px;
      background: linear-gradient(90deg, #10b981, #6ee7b7);
      border-radius: 3px;
      min-width: 2px;
    }}
    .empty {{ text-align: center; color: #64748b; padding: 24px; }}
    footer {{
      margin-top: 40px;
      text-align: center;
      color: #64748b;
      font-size: 13px;
    }}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="brand">
        <div class="brand-badge">BK</div>
        <div>
          <h1>Visitor Traffic & Analytics Report</h1>
          <div class="subtitle">benkrack.com • S3 & CloudFront Edge Telemetry</div>
        </div>
      </div>
      <div class="timestamp">
        Report Generated: <strong>{gen_time}</strong>
      </div>
    </header>

    <div class="metrics-grid">
      <div class="card">
        <div class="card-label">Unique Human Visitors</div>
        <div class="card-val">{unique_visitors:,}</div>
        <div class="card-sub">Deduplicated visitor fingerprints</div>
      </div>
      <div class="card">
        <div class="card-label">Human Page Views</div>
        <div class="card-val">{total_pageviews:,}</div>
        <div class="card-sub">HTML document requests & views</div>
      </div>
      <div class="card">
        <div class="card-label">Total HTTP Requests</div>
        <div class="card-val">{total_reqs:,}</div>
        <div class="card-sub">All assets, styles & scripts</div>
      </div>
      <div class="card">
        <div class="card-label">Search Crawlers / Bots</div>
        <div class="card-val">{bot_requests:,}</div>
        <div class="card-sub">Googlebot, Bingbot, crawlers</div>
      </div>
    </div>

    <div class="panels-grid">
      <!-- Top Pages -->
      <div class="panel">
        <div class="panel-title">
          <span>Top Visited Pages</span>
          <span style="font-size:12px;color:#34d399;">Routes</span>
        </div>
        <table>
          <thead><tr><th>Path</th><th style="text-align:right;">Views</th><th>Share</th></tr></thead>
          <tbody>{render_rows(data.get("top_pages", {}))}</tbody>
        </table>
      </div>

      <!-- Top Referrers -->
      <div class="panel">
        <div class="panel-title">
          <span>Traffic Channels & Referrers</span>
          <span style="font-size:12px;color:#34d399;">Sources</span>
        </div>
        <table>
          <thead><tr><th>Channel / Source</th><th style="text-align:right;">Visits</th><th>Share</th></tr></thead>
          <tbody>{render_rows(data.get("top_referrers", {}))}</tbody>
        </table>
      </div>

      <!-- Devices -->
      <div class="panel">
        <div class="panel-title">
          <span>Device Breakdown</span>
          <span style="font-size:12px;color:#34d399;">Form Factor</span>
        </div>
        <table>
          <thead><tr><th>Device Category</th><th style="text-align:right;">Count</th><th>Share</th></tr></thead>
          <tbody>{render_rows(data.get("devices", {}))}</tbody>
        </table>
      </div>

      <!-- Browsers & OS -->
      <div class="panel">
        <div class="panel-title">
          <span>Browsers & Platforms</span>
          <span style="font-size:12px;color:#34d399;">Client</span>
        </div>
        <table>
          <thead><tr><th>Browser</th><th style="text-align:right;">Count</th><th>Share</th></tr></thead>
          <tbody>{render_rows(data.get("browsers", {}))}</tbody>
        </table>
      </div>
    </div>

    <footer>
      Ben Krack Engineering Portfolio • Automated S3 Analytics Pipeline • Privacy-first server log aggregation
    </footer>
  </div>
</body>
</html>
"""

def lambda_handler(event, context):
    """
    Lambda entrypoint:
    Reads logs from S3, computes metrics, and writes HTML/JSON reports to S3.
    """
    analytics_bucket = os.environ.get("ANALYTICS_BUCKET")
    if not analytics_bucket:
        raise ValueError("ANALYTICS_BUCKET environment variable must be set")

    raw_prefix = os.environ.get("RAW_LOG_PREFIX", "raw-logs/")
    reports_prefix = os.environ.get("REPORTS_PREFIX", "reports/")

    print(f"Scanning s3://{analytics_bucket}/{raw_prefix} for access logs...")

    # List objects in raw-logs prefix
    paginator = s3.get_paginator("list_objects_v2")
    log_keys = []
    for page in paginator.paginate(Bucket=analytics_bucket, Prefix=raw_prefix):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            if key != raw_prefix and not key.endswith("/"):
                log_keys.append(key)

    print(f"Found {len(log_keys)} log files.")

    all_records = []
    # Read up to the last 200 log files (or all if fewer)
    for key in log_keys[-200:]:
        try:
            resp = s3.get_object(Bucket=analytics_bucket, Key=key)
            body = resp["Body"].read()
            if key.endswith(".gz"):
                decompressed = gzip.decompress(body).decode("utf-8", errors="ignore")
                records = parse_log_content(decompressed)
            else:
                records = parse_log_content(body.decode("utf-8", errors="ignore"))
            all_records.extend(records)
        except Exception as e:
            print(f"Error reading {key}: {e}")

    # Aggregate statistics
    human_records = [r for r in all_records if not r["is_bot"]]
    bot_records = [r for r in all_records if r["is_bot"]]

    # Pageview records (filter out CSS/JS/images for clean page views)
    pageview_records = [
        r for r in human_records
        if not re.search(r'\.(css|js|png|jpg|jpeg|svg|ico|woff|woff2|map|json)$', r["path"].lower())
    ]

    unique_human_visitors = len(set(r["visitor_hash"] for r in human_records))
    top_pages = Counter(r["path"] for r in pageview_records).most_common(10)
    top_referrers = Counter(r["referrer"] for r in human_records).most_common(10)
    devices = Counter(r["device"] for r in human_records)
    browsers = Counter(r["browser"] for r in human_records)
    operating_systems = Counter(r["os"] for r in human_records)
    status_codes = Counter(r["status"] for r in all_records)

    report_payload = {
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC"),
        "total_requests": len(all_records),
        "human_requests": len(human_records),
        "human_pageviews": len(pageview_records),
        "unique_human_visitors": unique_human_visitors,
        "bot_requests": len(bot_records),
        "top_pages": dict(top_pages),
        "top_referrers": dict(top_referrers),
        "devices": dict(devices),
        "browsers": dict(browsers),
        "operating_systems": dict(operating_systems),
        "status_codes": dict(status_codes)
    }

    # Generate HTML
    html_content = generate_html_report(report_payload)
    json_content = json.dumps(report_payload, indent=2)

    # Output paths
    today_stamp = datetime.now(timezone.utc).strftime("%Y%m%d")
    latest_html_key = f"{reports_prefix}visitor_summary_latest.html"
    latest_json_key = f"{reports_prefix}visitor_summary_latest.json"
    archive_html_key = f"{reports_prefix}archive/visitor_report_{today_stamp}.html"

    # Save to S3
    s3.put_object(
        Bucket=analytics_bucket,
        Key=latest_html_key,
        Body=html_content.encode("utf-8"),
        ContentType="text/html",
        CacheControl="no-cache"
    )
    s3.put_object(
        Bucket=analytics_bucket,
        Key=latest_json_key,
        Body=json_content.encode("utf-8"),
        ContentType="application/json",
        CacheControl="no-cache"
    )
    s3.put_object(
        Bucket=analytics_bucket,
        Key=archive_html_key,
        Body=html_content.encode("utf-8"),
        ContentType="text/html",
        CacheControl="no-cache"
    )

    print(f"Reports successfully generated and uploaded to s3://{analytics_bucket}/{latest_html_key}")

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Report generated successfully",
            "report_url": f"s3://{analytics_bucket}/{latest_html_key}",
            "metrics": {
                "unique_visitors": unique_human_visitors,
                "human_pageviews": len(pageview_records),
                "total_requests": len(all_records)
            }
        })
    }
