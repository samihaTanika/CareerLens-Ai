import re

with open('frontend/src/data/mockJobs.js', 'r', encoding='utf-8') as f:
    text = f.read()

titles = re.findall(r"title:\s*['\"]([^'\"]+)['\"]", text)
sectors = re.findall(r"sector:\s*['\"]([^'\"]+)['\"]", text)
print(f"Total jobs in mockJobs.js: {len(titles)}")
for i, t in enumerate(titles, 1):
    sec = sectors[i-1] if i-1 < len(sectors) else 'N/A'
    print(f"{i}. {t} [{sec}]")

