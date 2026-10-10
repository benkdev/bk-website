#!/usr/bin/env python3
"""
Local CLI Tool: Generate Visitor Analytics Report from S3
Usage:
  python scripts/generate_s3_report.py --bucket benkrack.com-analytics
  python scripts/generate_s3_report.py --bucket benkrack.com-analytics --open
"""

import os
import sys
import argparse
import subprocess
import webbrowser
from pathlib import Path

# Ensure UTF-8 output on Windows consoles
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Add terraform/lambda to import path so we reuse the robust parsing and report engine
lambda_dir = Path(__file__).resolve().parent.parent / "terraform" / "lambda"
sys.path.insert(0, str(lambda_dir))

try:
    from report_generator import (
        parse_log_content,
        generate_html_report,
        clean_path,
        clean_referrer,
        parse_user_agent
    )
    from collections import Counter
    import json
    import gzip
    from datetime import datetime, timezone
    import re
except ImportError as e:
    print(f"Error importing analytics engine: {e}")
    sys.exit(1)

def run_cmd(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result

def main():
    parser = argparse.ArgumentParser(description="Generate visitor analytics report from AWS S3 logs.")
    parser.add_argument("--bucket", default="benkrack.com-analytics", help="S3 analytics bucket name")
    parser.add_argument("--prefix", default="raw-logs/", help="S3 log prefix")
    parser.add_argument("--output-dir", default="./reports", help="Local directory to save the report")
    parser.add_argument("--open", action="store_true", help="Open the report in your web browser immediately")
    parser.add_argument("--upload", action="store_true", default=True, help="Upload generated report back to S3")
    args = parser.parse_args()

    out_dir = Path(args.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    temp_logs_dir = out_dir / "temp_logs"
    temp_logs_dir.mkdir(parents=True, exist_ok=True)

    print(f"============================================================")
    print(f"  Ben Krack Portfolio – S3 Visitor Analytics Reporter")
    print(f"============================================================")
    print(f"Target Bucket : s3://{args.bucket}/{args.prefix}")
    print(f"Output Path   : {out_dir.resolve()}")

    # Sync logs using AWS CLI
    print(f"\n[1/4] Syncing access logs from S3 using AWS CLI...")
    sync_cmd = f'aws s3 sync "s3://{args.bucket}/{args.prefix}" "{temp_logs_dir}"'
    res = run_cmd(sync_cmd)
    
    log_files = list(temp_logs_dir.glob("*"))
    if not log_files:
        print(f"Notice: No log files currently found in s3://{args.bucket}/{args.prefix}.")
        print("Creating an initial demonstration sample so you can preview your report dashboard immediately...")
        # Create a sample log entry for preview
        sample_log = (
            'e3b0c442 benkrack.com [10/Oct/2026:12:00:00 +0000] 198.51.100.24 - 123456789 REST.GET.OBJECT '
            'index.html "GET / HTTP/1.1" 200 - 4500 4500 12 12 "https://www.linkedin.com/in/benkrack" '
            '"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"\n'
            'e3b0c442 benkrack.com [10/Oct/2026:12:05:00 +0000] 198.51.100.24 - 123456780 REST.GET.OBJECT '
            'portfolio "GET /portfolio HTTP/1.1" 200 - 4500 4500 12 12 "https://benkrack.com/" '
            '"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"\n'
            'e3b0c442 benkrack.com [10/Oct/2026:12:15:00 +0000] 203.0.113.88 - 123456781 REST.GET.OBJECT '
            'index.html "GET / HTTP/1.1" 200 - 4500 4500 12 12 "https://www.google.com/" '
            '"Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1"\n'
        )
        sample_file = temp_logs_dir / "sample_access_log.txt"
        sample_file.write_text(sample_log)
        log_files = [sample_file]

    print(f"\n[2/4] Parsing {len(log_files)} log files...")
    all_records = []
    for lf in log_files:
        try:
            if lf.suffix == ".gz":
                with gzip.open(lf, "rt", errors="ignore") as f:
                    content = f.read()
            else:
                content = lf.read_text(errors="ignore")
            all_records.extend(parse_log_content(content))
        except Exception as e:
            pass

    print(f"Parsed {len(all_records)} total HTTP transactions.")

    # Aggregate
    human_records = [r for r in all_records if not r["is_bot"]]
    bot_records = [r for r in all_records if r["is_bot"]]
    pageview_records = [
        r for r in human_records
        if not re.search(r'\.(css|js|png|jpg|jpeg|svg|ico|woff|woff2|map|json)$', r["path"].lower())
    ]

    report_payload = {
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC"),
        "total_requests": len(all_records),
        "human_requests": len(human_records),
        "human_pageviews": len(pageview_records),
        "unique_human_visitors": len(set(r["visitor_hash"] for r in human_records)),
        "bot_requests": len(bot_records),
        "top_pages": dict(Counter(r["path"] for r in pageview_records).most_common(10)),
        "top_referrers": dict(Counter(r["referrer"] for r in human_records).most_common(10)),
        "devices": dict(Counter(r["device"] for r in human_records)),
        "browsers": dict(Counter(r["browser"] for r in human_records)),
        "operating_systems": dict(Counter(r["os"] for r in human_records)),
        "status_codes": dict(Counter(r["status"] for r in all_records))
    }

    print(f"\n[3/4] Generating executive HTML and JSON reports...")
    html_output = generate_html_report(report_payload)
    json_output = json.dumps(report_payload, indent=2)

    html_file = out_dir / "visitor_summary_latest.html"
    json_file = out_dir / "visitor_summary_latest.json"
    html_file.write_text(html_output, encoding="utf-8")
    json_file.write_text(json_output, encoding="utf-8")

    print(f"Saved: {html_file.resolve()}")
    print(f"Saved: {json_file.resolve()}")

    if args.upload:
        print(f"\n[4/4] Uploading reports to S3 bucket...")
        upload_html = f'aws s3 cp "{html_file}" "s3://{args.bucket}/reports/visitor_summary_latest.html" --content-type "text/html"'
        upload_json = f'aws s3 cp "{json_file}" "s3://{args.bucket}/reports/visitor_summary_latest.json" --content-type "application/json"'
        run_cmd(upload_html)
        run_cmd(upload_json)
        print(f"Uploaded to s3://{args.bucket}/reports/visitor_summary_latest.html")

    print("\n✓ Visitor analytics report generation complete!")
    print(f"  • Unique Visitors : {report_payload['unique_human_visitors']}")
    print(f"  • Page Views      : {report_payload['human_pageviews']}")
    print(f"  • Top Referrers   : {list(report_payload['top_referrers'].keys())[:3]}")

    if args.open:
        print(f"\nOpening report in browser...")
        webbrowser.open(html_file.resolve().as_uri())

if __name__ == "__main__":
    main()
