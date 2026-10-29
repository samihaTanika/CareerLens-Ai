import urllib.request
import urllib.parse
import json
import time

backend_url = "https://careerlens-backend-gy5k.onrender.com"

print(f"Testing live Render backend at: {backend_url}")

# 1. Root
t0 = time.time()
try:
    with urllib.request.urlopen(f"{backend_url}/", timeout=15) as res:
        data = json.loads(res.read().decode())
        print(f"Root endpoint: {res.status} OK in {time.time()-t0:.2f}s -> {data}")
except Exception as e:
    print(f"Root endpoint failed: {e}")

# 2. Health
t0 = time.time()
try:
    with urllib.request.urlopen(f"{backend_url}/api/health", timeout=15) as res:
        data = json.loads(res.read().decode())
        print(f"Health endpoint: {res.status} OK in {time.time()-t0:.2f}s -> {data}")
except Exception as e:
    print(f"Health endpoint failed: {e}")

# 3. Categories
t0 = time.time()
try:
    with urllib.request.urlopen(f"{backend_url}/api/categories", timeout=15) as res:
        data = json.loads(res.read().decode())
        print(f"Categories endpoint: {res.status} OK in {time.time()-t0:.2f}s -> Total categories: {data.get('total')}")
except Exception as e:
    print(f"Categories endpoint failed: {e}")

# 4. Scholarships
t0 = time.time()
try:
    with urllib.request.urlopen(f"{backend_url}/api/scholarships", timeout=15) as res:
        data = json.loads(res.read().decode())
        schs = data.get('scholarships', [])
        print(f"Scholarships endpoint: {res.status} OK in {time.time()-t0:.2f}s -> Total: {len(schs)}, First: {schs[0]['name']}")
except Exception as e:
    print(f"Scholarships endpoint failed: {e}")

# 5. Chatbot
t0 = time.time()
try:
    payload = json.dumps({"message": "Hello, how does CareerLens work?"}).encode()
    req = urllib.request.Request(
        f"{backend_url}/api/chat",
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=15) as res:
        data = json.loads(res.read().decode())
        reply = data.get('reply', '')
        print(f"Chatbot endpoint: {res.status} OK in {time.time()-t0:.2f}s -> Response length: {len(reply)} chars")
except Exception as e:
    print(f"Chatbot endpoint failed: {e}")
