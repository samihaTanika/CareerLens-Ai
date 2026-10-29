import urllib.request
import json

base_url = "http://127.0.0.1:8000"

# 1. Root & Health
try:
    with urllib.request.urlopen(f"{base_url}/", timeout=5) as res:
        root_data = json.loads(res.read().decode())
        print(f"Root: status={root_data['status']}, categories_loaded={root_data['categories_loaded']}, taxonomy={root_data['skills_taxonomy_categories']}")
except Exception as e:
    print("Root test failed:", e)

# 2. Health
try:
    with urllib.request.urlopen(f"{base_url}/api/health", timeout=5) as res:
        health_data = json.loads(res.read().decode())
        print(f"Health: status={health_data['status']}, categories={health_data['categories_count']}")
except Exception as e:
    print("Health test failed:", e)

# 3. Categories
try:
    with urllib.request.urlopen(f"{base_url}/api/categories", timeout=5) as res:
        cat_data = json.loads(res.read().decode())
        print(f"Categories: total={cat_data['total']}, first={cat_data['categories'][0]['name']}")
except Exception as e:
    print("Categories test failed:", e)

# 4. Scholarships
try:
    with urllib.request.urlopen(f"{base_url}/api/scholarships", timeout=5) as res:
        sch_data = json.loads(res.read().decode())
        items = sch_data.get("scholarships", [])
        print(f"Scholarships: count={len(items)}, first={items[0]['name']} ({items[0]['country']})")
except Exception as e:
    print("Scholarships test failed:", e)

# 5. Chatbot
try:
    payload = json.dumps({"message": "What are the eligibility requirements for Bangladesh Bank Assistant Director?"}).encode()
    req = urllib.request.Request(
        f"{base_url}/api/chat",
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=10) as res:
        chat_data = json.loads(res.read().decode())
        reply = chat_data.get("reply", "")
        print(f"Chatbot reply ({len(reply)} chars): {reply[:120]}...")
except Exception as e:
    print("Chat test failed:", e)
