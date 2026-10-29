import sys
sys.path.insert(0, '.')
from backend.app.nlp_engine import analyze_cv_complete, job_categories, skills_taxonomy

print(f"Loaded {len(job_categories)} categories into engine.")
print(f"Loaded {len(skills_taxonomy)} domains into engine.")

sample_cv = """
Md. Tanvir Hossain
Software Engineer & Data Enthusiast
Dhaka, Bangladesh | Email: tanvir@example.com | GitHub: github.com/tanvir

EDUCATION
B.Sc. in Computer Science & Engineering (CSE)
Bangladesh University of Engineering and Technology (BUET), CGPA: 3.82

SKILLS
Python, JavaScript, TypeScript, React, Node.js, FastAPI, Docker, Kubernetes, PostgreSQL,
Machine Learning, PyTorch, Pandas, Scikit-learn, Git, AWS, RESTful APIs

EXPERIENCE
Software Engineer at Brain Station 23 (2023 - Present)
- Developed scalable microservices in Node.js and FastAPI handling 20,000+ daily requests.
- Integrated PostgreSQL database and Redis caching, reducing query latency by 45%.
- Implemented CI/CD pipelines with Docker and GitHub Actions for automated cloud deployments on AWS.
"""

result = analyze_cv_complete(sample_cv)
summary = result['cv_summary']
print(f"Parsed Candidate: {summary['name']}")
print(f"Total Skills Extracted: {summary['total_skills_found']}")
print(f"Extracted Sample: {summary['extracted_skills'][:8]}")
print(f"Top Categories Count: {len(result['top_categories'])}")
for cat in result['top_categories'][:5]:
    print(f"  #{cat['rank']} {cat['category_name']} ({cat['match_percentage']}%) | BDJobs: {cat['application_links']['bdjobs']}")

print(f"\nMatched Scholarships Count: {len(result['matched_scholarships'])}")
for sch in result['matched_scholarships'][:3]:
    print(f"  - {sch['name']} ({sch['country']}) - {sch['coverage']}")
