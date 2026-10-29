import re
import os

files_to_fix = [
    'frontend/src/data/mockAnalysis.js',
    'nlp_export/sample_analysis_result.json',
    'backend/app/nlp_engine.py',
    'frontend/src/pages/DashboardPage.jsx',
]

pattern1 = re.compile(r'https://jobs\.bdjobs\.com/jobsearch\.asp\?(?:fcatId=\d+&)?q=([^"\s&]+)')
pattern2 = re.compile(r'https://jobs\.bdjobs\.com/jobsearch\.asp\?[^"\s]+')
pattern3 = re.compile(r'https://jobs\.bdjobs\.com/jobdetails\.asp\?id=(\d+)')

for path in files_to_fix:
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace pattern 1
    new_content = pattern1.sub(r'https://bdjobs.com/jobsearch?keyword=\1', content)
    # Replace any remaining pattern 2
    new_content = pattern2.sub(r'https://bdjobs.com/jobsearch?keyword=Bangladesh', new_content)
    # Replace pattern 3
    new_content = pattern3.sub(r'https://bdjobs.com/jobdetails?id=\1', new_content)

    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated BDJobs links in {path}")
    else:
        print(f"No changes needed in {path}")

