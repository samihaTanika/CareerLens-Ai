import urllib.request
import mimetypes
import uuid
import os

backend_url = "https://careerlens-backend-gy5k.onrender.com"

# Check if a sample PDF exists in the workspace
sample_pdf_path = "AI_Resume_Analyzer_Project_Plan.pdf"

if not os.path.exists(sample_pdf_path):
    print("Sample PDF not found, creating a minimal PDF...")
    # Minimal PDF file bytes
    pdf_bytes = b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000010 00000 n\n0000000053 00000 n\n0000000102 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n178\n%%EOF"
else:
    with open(sample_pdf_path, "rb") as f:
        pdf_bytes = f.read()

boundary = f"----WebKitFormBoundary{uuid.uuid4().hex}"
body = (
    f"--{boundary}\r\n"
    f'Content-Disposition: form-data; name="file"; filename="sample_cv.pdf"\r\n'
    f"Content-Type: application/pdf\r\n\r\n"
).encode("utf-8") + pdf_bytes + f"\r\n--{boundary}--\r\n".encode("utf-8")

req = urllib.request.Request(
    f"{backend_url}/api/analyze",
    data=body,
    headers={
        "Content-Type": f"multipart/form-data; boundary={boundary}",
        "Content-Length": str(len(body))
    }
)

print(f"Uploading PDF ({len(pdf_bytes)} bytes) to {backend_url}/api/analyze...")
try:
    with urllib.request.urlopen(req, timeout=30) as res:
        print(f"Status: {res.status}")
        resp_data = res.read().decode("utf-8")
        print(f"Response length: {len(resp_data)}")
        import json
        parsed = json.loads(resp_data)
        print("Success! Keys in response:", list(parsed.keys()))
        if "top_categories" in parsed:
            print(f"Top categories returned: {len(parsed['top_categories'])}")
            for cat in parsed['top_categories'][:3]:
                print(f"  #{cat.get('rank')} {cat.get('category_name')} ({cat.get('match_percentage')}%)")
except urllib.error.HTTPError as e:
    print(f"HTTP Error {e.code}: {e.read().decode('utf-8', errors='ignore')}")
except Exception as e:
    print(f"Error: {e}")
