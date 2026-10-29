"""
CareerLens AI — Render Backend Keep-Alive Ping Service
Sends periodic HTTP GET requests to the deployed Render backend
every 10 seconds to keep the free-tier service awake and responsive.
"""

import urllib.request
import time
import sys
from datetime import datetime

BACKEND_URL = "https://careerlens-backend-gy5k.onrender.com/api/health"
PING_INTERVAL_SECONDS = 10

def ping_once():
    start = time.time()
    try:
        req = urllib.request.Request(
            BACKEND_URL,
            headers={"User-Agent": "CareerLens-KeepAlive-Worker/1.0"}
        )
        with urllib.request.urlopen(req, timeout=15) as res:
            elapsed = round(time.time() - start, 2)
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"[{timestamp}] PING SUCCESS: HTTP {res.status} in {elapsed}s")
            return True
    except Exception as e:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] PING NOTICE: {e}")
        return False

def main():
    print("=" * 65)
    print(f"Starting CareerLens AI Keep-Alive Ping Daemon")
    print(f"Target: {BACKEND_URL}")
    print(f"Interval: Every {PING_INTERVAL_SECONDS} seconds")
    print("=" * 65)
    
    consecutive_failures = 0
    while True:
        success = ping_once()
        if success:
            consecutive_failures = 0
        else:
            consecutive_failures += 1
            if consecutive_failures >= 5:
                print(f"[ALERT] {consecutive_failures} consecutive ping failures. Retrying in 5s...")
                time.sleep(5)
                continue
        sys.stdout.flush()
        time.sleep(PING_INTERVAL_SECONDS)

if __name__ == "__main__":
    main()

