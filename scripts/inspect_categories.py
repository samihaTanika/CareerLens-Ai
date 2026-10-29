import json

with open('nlp_export/skills_taxonomy.json', 'r', encoding='utf-8') as f:
    tax = json.load(f)

total_skills = 0
for domain, skills in tax.items():
    if isinstance(skills, list):
        total_skills += len(skills)
        print(f"Domain: {domain} ({len(skills)} skills)")

print(f"\nTotal taxonomy domains: {len(tax)}, Total skills: {total_skills}")
