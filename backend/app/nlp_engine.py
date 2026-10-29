"""
CareerLens AI — Complete NLP & Machine Learning Engine
Handles PDF text extraction, spaCy linguistic skill extraction,
Bangladesh job market matching, and Gemini AI career assessment.
"""

import os
import re
import json
import time
import urllib.parse
from typing import Dict, Any, List

# Try imports with graceful fallback for testing/demo
try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

try:
    import spacy
    from spacy.matcher import PhraseMatcher
    nlp = spacy.load("en_core_web_sm")
except Exception:
    nlp = None
    PhraseMatcher = None

try:
    from google import genai
    from google.genai import types
    from google.genai.errors import ServerError, ClientError
except ImportError:
    genai = None

# Paths to taxonomy files
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TAXONOMY_PATH = os.path.join(BASE_DIR, "..", "nlp_export", "skills_taxonomy.json")
JOBS_PATH = os.path.join(BASE_DIR, "..", "nlp_export", "job_categories.json")

def load_json(filepath, default):
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return default

skills_taxonomy = load_json(TAXONOMY_PATH, {})
job_categories = load_json(JOBS_PATH, [])

# Inverted mapping: skill -> category
skill_to_category = {}
for category, skills in skills_taxonomy.items():
    for skill in skills:
        skill_to_category[skill.lower()] = category

# Initialize spaCy PhraseMatcher if available
matcher = None
if nlp and PhraseMatcher:
    matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
    for category, skills in skills_taxonomy.items():
        patterns = [nlp.make_doc(skill) for skill in skills if len(skill) > 1]
        matcher.add(category, patterns)


def extract_text_from_pdf(pdf_stream_or_path) -> Dict[str, Any]:
    """Extracts text content from a PDF file using PyMuPDF, or accepts raw text."""
    if isinstance(pdf_stream_or_path, str) and ("\n" in pdf_stream_or_path or len(pdf_stream_or_path) > 300) and not os.path.exists(pdf_stream_or_path):
        return {"success": True, "text": pdf_stream_or_path, "pages": 1}

    if not fitz:
        return {"success": False, "error": "PyMuPDF (fitz) is not installed."}
    try:
        if isinstance(pdf_stream_or_path, str):
            doc = fitz.open(pdf_stream_or_path)
        else:
            doc = fitz.open(stream=pdf_stream_or_path, filetype="pdf")

        full_text = ""
        for page in doc:
            full_text += page.get_text() + "\n"

        return {"success": True, "text": full_text, "pages": len(doc)}
    except Exception as e:
        return {"success": False, "error": str(e)}


def clean_cv_text(text: str) -> Dict[str, Any]:
    """Cleans raw CV text and extracts contact details."""
    emails = re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    phones = re.findall(r'(\+?880\s?1[3-9]\d{8}|\+?1?\(?\d{3}\)?[\s\.-]?\d{3}[\s\.-]?\d{4})', text)
    cleaned_text = re.sub(r'[\r\t]+', ' ', text)
    cleaned_text = re.sub(r'\n{3,}', '\n\n', cleaned_text)
    return {
        "cleaned_text": cleaned_text.strip(),
        "emails": emails,
        "phones": phones
    }


def extract_skills(text: str) -> List[Dict[str, Any]]:
    """Extracts skills matching our 650+ taxonomy terms."""
    found_skills = {}
    
    # 1. Match using spaCy PhraseMatcher if available
    if nlp and matcher:
        doc = nlp(text)
        matches = matcher(doc)
        for match_id, start, end in matches:
            span = doc[start:end]
            skill_text = span.text.strip()
            cat = nlp.vocab.strings[match_id]
            # Avoid false positive "Less" unless in a tech context
            if skill_text.lower() == "less" and "css" not in text.lower():
                continue
            found_skills[skill_text.title()] = {
                "skill": skill_text.title(),
                "category": cat
            }

    # 2. Regex fallback for essential multi-word terms
    text_lower = text.lower()
    for cat, skills in skills_taxonomy.items():
        for s in skills:
            if len(s) > 2 and s.title() not in found_skills:
                # Use word boundaries
                pattern = r'\b' + re.escape(s.lower()) + r'\b'
                if s.lower() == "less" and "css" not in text_lower:
                    continue
                if re.search(pattern, text_lower):
                    found_skills[s] = {"skill": s, "category": cat}

    return list(found_skills.values())


def extract_education(text: str) -> Dict[str, Any]:
    """Extracts degrees, university, and field of study."""
    degrees = []
    degree_patterns = [
        (r'\b(Ph\.?D|Doctorate|Doctor of Philosophy|M\.?Phil)\b[\s\.]*(?:in|of)?\s*([A-Za-z\s&]+?)(?:\n|,|\(|\d{4}|$)', 'phd'),
        (r'\b(Master(?:\'s)?|M\.?Sc|MSc|M\.?S(?![\s\.]*Office)|MS(?![\s\.]*Office)|MBA|M\.?Tech)\b[\s\.]*(?:in|of)?\s*([A-Za-z\s&]+?)(?:\n|,|\(|\d{4}|$)', 'masters'),
        (r'\b(Bachelor(?:\'s)?|B\.?Sc|BSc|B\.?S|BS|B\.?A|BA|BBA|B\.?Tech|B\.?Eng)\b[\s\.]*(?:in|of)?\s*([A-Za-z\s&]+?)(?:\n|,|\(|\d{4}|$)', 'bachelors'),
    ]

    for pat, d_type in degree_patterns:
        for match in re.finditer(pat, text, re.IGNORECASE):
            d_name = match.group(1).strip()
            field = match.group(2).strip() if len(match.groups()) > 1 and match.group(2) else ""
            degrees.append({"degree": d_name, "field": field, "type": d_type})

    highest = "Bachelor's Degree"
    types_found = [d["type"] for d in degrees]
    if "phd" in types_found:
        highest = "Doctorate (PhD)"
    elif "masters" in types_found:
        highest = "Master's Degree"
    elif "bachelors" in types_found:
        highest = "Bachelor's Degree"

    # Match common BD/international institutions
    universities = []
    uni_pattern = r'\b([A-Z][A-Za-z\s&,\.\-]+?(?:University|College|Institute|School of [A-Za-z]+))\b'
    for u in re.findall(uni_pattern, text):
        clean_u = u.strip(" ,.-")
        if len(clean_u.split()) >= 2 and clean_u not in universities:
            universities.append(clean_u)

    return {
        "degrees": degrees,
        "highest_level": highest,
        "universities": universities[:2]
    }


def extract_experience(text: str) -> Dict[str, Any]:
    """Estimates years of work experience from CV."""
    exp_matches = re.findall(r'(\d{1,2})\+?\s*(?:years?|yrs?)\s*(?:of\s*)?experience', text, re.IGNORECASE)
    years = 0
    if exp_matches:
        years = max([int(m) for m in exp_matches])
    else:
        # Fallback date range calculation
        years_found = [int(y) for y in re.findall(r'\b(19\d{2}|20\d{2})\b', text)]
        if len(years_found) >= 2:
            years = min(15, max(years_found) - min(years_found))

    return {"total_years": max(1, years)}


def match_cv_to_categories(profile: Dict[str, Any], categories: List[Dict[str, Any]], top_n: int = 20) -> List[Dict[str, Any]]:
    """Calculates match scores across Bangladesh job taxonomy."""
    user_skills = set(s["skill"].lower() for s in profile.get("skills", []))
    edu_text = profile.get("education", {}).get("highest_level", "").lower() + " " + " ".join(
        [d.get("field", "") for d in profile.get("education", {}).get("degrees", [])]
    ).lower()

    scored = []

    for cat in categories:
        cat_id = cat.get("id", "")
        req_skills = cat.get("required_skills", [])
        pref_skills = cat.get("preferred_skills", [])
        
        matched_req = [s for s in req_skills if s.lower() in user_skills]
        matched_pref = [s for s in pref_skills if s.lower() in user_skills]
        all_matched = matched_req + matched_pref

        missing_req = [{"skill": s, "priority": "critical"} for s in req_skills if s.lower() not in user_skills]
        missing_pref = [{"skill": s, "priority": "important"} for s in pref_skills if s.lower() not in user_skills]

        # Skill match score (0-100)
        total_cat_skills = len(req_skills) + (0.5 * len(pref_skills))
        matched_pts = len(matched_req) + (0.5 * len(matched_pref))
        skill_score = (matched_pts / total_cat_skills * 100) if total_cat_skills > 0 else 50

        # Education Fit calculation
        edu_score = 60
        if "engineering" in cat_id:
            if any(k in edu_text for k in ["engineering", "civil", "electrical", "mechanical", "eee", "cse"]):
                edu_score = 95
            else:
                edu_score = 20  # Non-engineering graduates cannot be registered engineers in BD
        elif any(b in cat_id for b in ["banking", "accounting", "sales", "finance"]):
            if any(k in edu_text for k in ["business", "bba", "mba", "finance", "accounting", "economics"]):
                edu_score = 95

        # Weighted match percentage
        final_score = int(round((skill_score * 0.6) + (edu_score * 0.25) + 15))
        final_score = max(25, min(95, final_score))

        status = "Strong Fit" if final_score >= 80 else ("Good Fit" if final_score >= 70 else "Fair Match")

        search_query = urllib.parse.quote(cat.get("name", ""))
        bdjobs_url = f"https://bdjobs.com/h/jobs/?txtKeyword={search_query}"
        linkedin_url = f"https://www.linkedin.com/jobs/search/?keywords={search_query}&location=Bangladesh"
        teletalk_url = "http://alljobs.teletalk.com.bd" if "govt" in cat_id or "cadre" in cat_id or "bank" in cat_id else None

        employers = cat.get("typical_employers", [])
        emp1 = employers[0] if employers else "Leading Organization in Bangladesh"
        emp2 = employers[1] if len(employers) > 1 else "Reputed Enterprise in Dhaka"
        salary_min = cat.get("avg_salary_bdt", {}).get("min", 35000)
        salary_max = cat.get("avg_salary_bdt", {}).get("max", 90000)
        is_govt = cat.get("is_government", False) or "cadre" in cat_id or "govt" in cat_id

        active_jobs = [
            {
                "id": f"job-{cat_id}-01",
                "title": f"Officer / Executive — {cat.get('name')}",
                "company": emp1,
                "location": "Dhaka, Bangladesh",
                "type": "Full-time",
                "salary": f"৳{salary_min:,} - ৳{salary_max:,} / month",
                "deadline": "Rolling Applications",
                "description": f"Lead functional initiatives and operations at {emp1}. Requires competencies in {', '.join(req_skills[:3]) if req_skills else 'core domain practices'}.",
                "apply_url": teletalk_url if is_govt and teletalk_url else bdjobs_url
            },
            {
                "id": f"job-{cat_id}-02",
                "title": f"Specialist / Assistant Manager — {cat.get('name')}",
                "company": emp2,
                "location": "Dhaka / Division Headquarters",
                "type": "Full-time",
                "salary": f"৳{int(salary_min * 1.15):,} - ৳{int(salary_max * 1.2):,} / month",
                "deadline": "30 Days from Publication",
                "description": f"Strategic opportunity at {emp2} focusing on industry execution and compliance.",
                "apply_url": bdjobs_url
            }
        ]

        scored.append({
            "category_id": cat_id,
            "category_name": cat.get("name", ""),
            "sector": cat.get("sector", "Government & Public Sector" if is_govt else "Private Sector"),
            "is_government": is_govt,
            "match_percentage": final_score,
            "status": status,
            "matched_skills": all_matched,
            "missing_skills": missing_req + missing_pref,
            "salary_range": cat.get("avg_salary_bdt", {"min": 35000, "max": 120000}),
            "demand_level": cat.get("demand_level", "high"),
            "why_good_fit": f"Your background aligns well with {cat.get('name')}.",
            "learning_roadmap": [
                f"Acquire hands-on proficiency in {missing_req[0]['skill'] if missing_req else 'advanced workflows'}.",
                "Pursue recognized Bangladesh industry certifications."
            ],
            "market_outlook_bd": f"Consistent hiring demand across leading organizations in Bangladesh for {cat.get('name')}.",
            "application_links": {
                "bdjobs": bdjobs_url,
                "linkedin_bd": linkedin_url,
                "govt_portal": teletalk_url
            },
            "active_jobs": active_jobs
        })

    # Sort and rank top N (up to 20)
    scored.sort(key=lambda x: x["match_percentage"], reverse=True)
    top_matches = scored[:top_n]
    for idx, item in enumerate(top_matches):
        item["rank"] = idx + 1

    return top_matches


def match_cv_to_scholarships(profile: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Matches CV profile to top international scholarships for Bangladeshi students."""
    curated_scholarships = [
        {
            "id": "sch-001",
            "name": "Chevening Scholarship (UK)",
            "country": "United Kingdom",
            "degree_level": "Masters",
            "funding_type": "Fully Funded",
            "application_deadline": "2026-11-05",
            "min_exp_years": 2,
            "min_gpa": 3.0,
            "benefits": ["100% Tuition Fees", "£1,400 Monthly Living Allowance", "Return Flights", "Visa Costs"],
            "why_matched": "UK Government flagship scholarship valuing leadership and professional accomplishments.",
            "application_url": "https://www.chevening.org/scholarships/"
        },
        {
            "id": "sch-003",
            "name": "Fulbright Foreign Student Program",
            "country": "United States",
            "degree_level": "Masters / PhD",
            "funding_type": "Fully Funded",
            "application_deadline": "2027-02-15",
            "min_exp_years": 2,
            "min_gpa": 3.2,
            "benefits": ["Full Tuition & Fees", "$2,200 Monthly Stipend", "Health Insurance", "International Travel"],
            "why_matched": "Prestige US graduate fellowship covering tuition, living expenses, and international flights.",
            "application_url": "https://foreign.fulbrightonline.org/"
        },
        {
            "id": "sch-002",
            "name": "DAAD EPOS Scholarship (Germany)",
            "country": "Germany",
            "degree_level": "Masters / PhD",
            "funding_type": "Fully Funded",
            "application_deadline": "2026-10-31",
            "min_exp_years": 2,
            "min_gpa": 3.0,
            "benefits": ["Zero Tuition", "€934 Monthly Allowance", "Flight Allowance", "German Language Training"],
            "why_matched": "Tuition-free STEM, economic, and engineering Master degrees across German public universities.",
            "application_url": "https://www.daad.de/en/study-and-research-in-germany/scholarships/"
        },
        {
            "id": "sch-008",
            "name": "Swedish Institute Scholarships (SISGP)",
            "country": "Sweden",
            "degree_level": "Masters",
            "funding_type": "Fully Funded",
            "application_deadline": "2027-02-15",
            "min_exp_years": 3,
            "min_gpa": 3.0,
            "benefits": ["Full Tuition Covered", "SEK 12,000/Month Stipend", "SEK 15,000 Travel Grant"],
            "why_matched": "Targets professionals with leadership and work history for sustainability leadership in Sweden.",
            "application_url": "https://si.se/en/apply/scholarships/"
        },
        {
            "id": "sch-005",
            "name": "Australia Awards Scholarship",
            "country": "Australia",
            "degree_level": "Masters",
            "funding_type": "Fully Funded",
            "application_deadline": "2027-04-30",
            "min_exp_years": 2,
            "min_gpa": 3.0,
            "benefits": ["Full Tuition", "AUD $35,000/Yr Living Allowance", "Establishment Grant AUD $5,000", "Return Airfare"],
            "why_matched": "DFAT Australia fully-funded scholarship for Bangladeshi emerging development leaders.",
            "application_url": "https://www.dfat.gov.au/people-to-people/australia-awards/"
        }
    ]

    exp_years = profile.get("experience", {}).get("total_years") or 0
    matched = []
    for sch in curated_scholarships:
        score = 65
        if exp_years >= sch["min_exp_years"]:
            score += 20
        else:
            score += 5
        score = min(96, score)
        item = dict(sch)
        item["match_score"] = score
        matched.append(item)

    matched.sort(key=lambda x: x["match_score"], reverse=True)
    return matched


def generate_ai_analysis(profile: Dict[str, Any], top5: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Generates structured Gemini AI career assessment with model fallback."""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or not genai:
        return {"success": False, "error": "Gemini API key not configured"}

    client = genai.Client(api_key=api_key)
    candidate_models = [
        "gemini-3.6-flash",
        "gemini-3.5-flash-lite",
        "gemini-3.8-flash",
        "gemini-flash-latest"
    ]

    prompt = f"""You are CareerLens AI, technical recruiter and career strategist for the Bangladesh job market.
Analyze this candidate against their top 5 matched job categories:
Candidate CV Profile:
{json.dumps(profile, indent=2)}

Top 5 Categories:
{json.dumps(top5, indent=2)}

Return strict JSON:
{{
  "overall_summary": "2-3 sentences on candidate suitability for Bangladesh corporate/tech market",
  "category_insights": [
    {{
      "category": "Category Name",
      "why_good_fit": "Why candidate matches",
      "key_missing_areas": ["Key area 1", "Key area 2"],
      "learning_roadmap": ["Action 1", "Action 2"],
      "market_outlook_bd": "Demand in Bangladesh"
    }}
  ],
  "top_recommendations": ["Recommendation 1", "Recommendation 2"]
}}
"""

    config = types.GenerateContentConfig(temperature=0.2, response_mime_type="application/json")

    for model_name in candidate_models:
        try:
            resp = client.models.generate_content(model=model_name, contents=prompt, config=config)
            if resp.text:
                return {"success": True, "data": json.loads(resp.text)}
        except Exception:
            continue

    return {"success": False, "error": "AI models temporarily unavailable"}


def analyze_cv_complete(pdf_path_or_bytes) -> Dict[str, Any]:
    """Main pipeline combining all steps."""
    extracted = extract_text_from_pdf(pdf_path_or_bytes)
    if not extracted.get("success"):
        return {"error": extracted.get("error", "Failed to parse PDF")}

    cleaned = clean_cv_text(extracted["text"])
    skills = extract_skills(cleaned["cleaned_text"])
    education = extract_education(cleaned["cleaned_text"])
    experience = extract_experience(cleaned["cleaned_text"])

    raw_lines = [l.strip() for l in cleaned["cleaned_text"].split("\n") if l.strip()]
    candidate_name = "Candidate"
    for line in raw_lines[:4]:
        if not any(h in line.lower() for h in ["cv", "resume", "curriculum vitae", "page"]):
            candidate_name = line
            break

    profile = {
        "name": candidate_name,
        "email": cleaned["emails"][0] if cleaned.get("emails") else None,
        "phone": cleaned["phones"][0] if cleaned.get("phones") else None,
        "education": education,
        "experience": experience,
        "skills": skills,
        "total_skills_found": len(skills)
    }

    top_categories = match_cv_to_categories(profile, job_categories, top_n=20)
    matched_scholarships = match_cv_to_scholarships(profile)

    ai_res = generate_ai_analysis(profile, top_categories[:5])
    ai_data = ai_res.get("data", {}) if ai_res.get("success") else {}

    # Merge AI insights if available
    insights_map = {c.get("category", "").lower(): c for c in ai_data.get("category_insights", [])}
    for match in top_categories:
        c_name = match["category_name"].lower()
        if c_name in insights_map:
            info = insights_map[c_name]
            match["why_good_fit"] = info.get("why_good_fit", match["why_good_fit"])
            match["learning_roadmap"] = info.get("learning_roadmap", match["learning_roadmap"])
            match["market_outlook_bd"] = info.get("market_outlook_bd", match["market_outlook_bd"])

    return {
        "cv_summary": {
            "name": profile["name"],
            "email": profile["email"],
            "phone": profile["phone"],
            "education": education.get("highest_level"),
            "universities": education.get("universities", []),
            "experience_years": experience.get("total_years"),
            "total_skills_found": len(skills),
            "extracted_skills": [s["skill"] for s in skills]
        },
        "overall_cv_score": top_categories[0]["match_percentage"] if top_categories else 80,
        "overall_summary": ai_data.get("overall_summary", "Candidate demonstrates relevant capabilities for Bangladesh industry opportunities."),
        "top_recommendations": ai_data.get("top_recommendations", [
            "Tailor project accomplishments to highlight quantifiable business impact.",
            "Complete recognized professional certifications to boost hiring readiness.",
            "Explore matching government civil service cadres and fully-funded higher study scholarships."
        ]),
        "top_categories": top_categories,
        "matched_scholarships": matched_scholarships
    }


def generate_chat_response(message: str, history: List[Dict[str, str]] = None, context: Dict[str, Any] = None) -> str:
    """
    Answers user career, CV, job, and scholarship questions using Gemini AI or context-based fallback.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    cv_info = ""
    if context:
        cv_summary = context.get("cv_summary", {})
        cv_info = f"""
Candidate Name: {cv_summary.get('name', 'User')}
Education: {cv_summary.get('education', 'N/A')}
Extracted Skills: {', '.join(cv_summary.get('extracted_skills', []))}
Overall CV Score: {context.get('overall_cv_score', 'N/A')}%
Top Matched Job Sectors: {', '.join([c.get('category_name', '') for c in context.get('top_categories', [])[:5]])}
"""

    if api_key and genai:
        try:
            client = genai.Client(api_key=api_key)
            system_instruction = f"""You are the CareerLens AI Assistant, a friendly and expert career advisor for the Bangladesh job market and international study opportunities.
Help the user with CV optimization, interview preparation, government jobs (BCS, Bangladesh Bank, Combined 10 Banks), private corporate jobs, and study abroad scholarships (Chevening, DAAD, Fulbright).
Keep responses clear, actionable, polite, and encouraging with bullet points.
{cv_info}"""
            config = types.GenerateContentConfig(
                temperature=0.7,
                system_instruction=system_instruction
            )
            response = client.models.generate_content(
                model="gemini-3.5-flash-lite",
                contents=message,
                config=config
            )
            if response.text:
                return response.text
        except Exception:
            pass

    # Intelligent local fallback engine
    msg_lower = message.lower()
    
    # 1. Government Jobs
    if any(k in msg_lower for k in ["govt", "government", "bcs", "bangladesh bank", "sorkari", "সরকারি"]):
        return """🏛️ **Government Career Options in Bangladesh for Your Profile:**
1. **47th BCS (Administration / Police / General Cadre):** Open to all graduates. Emphasize Bengali/English composition, Bangladesh affairs, and general science.
2. **Bangladesh Bank Assistant Director (AD):** Prestigious central bank role (9th Grade). High demand for candidates with analytical, economic, and finance backgrounds.
3. **Combined 10 State-Owned Commercial Banks (Senior Officer):** Regular recruitment by Bankers Selection Committee (BSCC) for Sonali, Janata, Agrani, and Rupali banks.
4. **Government ICT Division / DoICT:** Assistant Programmer and Assistant Network Engineer positions for STEM/CSE graduates.

💡 *Tip:* Check out the **Job Search** page and filter by **"Government Jobs"** for live circulars!"""

    # 2. Scholarships
    if any(k in msg_lower for k in ["scholarship", "study abroad", "higher study", "ielts", "gre", "masters", "phd"]):
        return """🎓 **Top Matched Scholarships Abroad for Bangladeshi Students:**
- **Chevening Scholarship (UK):** 100% fully-funded Master's in the UK (covers full tuition, £1,400/month stipend, return flights). Requires 2+ years work experience.
- **DAAD EPOS (Germany):** Tuition-free Master's and PhD at top German universities with €934/month living stipend.
- **Fulbright Foreign Student Program (USA):** Full tuition, monthly living allowance ($2,200/mo), and airfare for graduate study in America.
- **Australia Awards (Australia):** Fully covers tuition, health cover (OSHC), and AUD $35,000/year living allowance.
- **MEXT (Japan):** Full tuition exemption + ¥144,000/month stipend. No IELTS mandatory for English-medium graduates.

👉 *Visit the **Scholarships** tab in the navigation bar to filter by destination country and degree level!*"""

    # 3. CV / Resume Improvement & ATS Score
    if any(k in msg_lower for k in ["improve", "cv", "resume", "ats", "score", "format"]):
        return """📄 **How to Boost Your Resume & ATS Readiness Score:**
1. **Quantify Achievements:** Replace generic tasks with metrics (e.g., *"Optimized database queries, reducing API latency by 35%"* or *"Managed $10M+ asset portfolio with 18% annualized return"*).
2. **Align Keywords with Job Descriptions:** Ensure technical keywords appear naturally in your Skills and Experience sections.
3. **Standard Section Headers:** Use clear headings like *Summary, Experience, Education, Technical Competencies, Projects*.
4. **Clean Single-Column Formatting:** Avoid complex tables, multi-column text boxes, or graphics that confuse ATS parsers.
5. **Certifications Matter:** Add recognized local credentials (e.g. JAIBB for banking, AWS/Azure for tech, PMP for management)."""

    # 4. Salary Inquiries
    if any(k in msg_lower for k in ["salary", "pay", "bdt", "income", "compensation", "টাকা", "বেতন"]):
        return """💰 **Current Salary Ranges in the Bangladesh Job Market:**
- **Software Engineering / Tech:**
  - Entry Level: ৳30,000 – ৳60,000 / month
  - Mid Level (2-4 yrs): ৳70,000 – ৳130,000 / month
  - Senior / Lead (5+ yrs): ৳140,000 – ৳250,000+ / month (FinTech unicorns like bKash pay up to ৳300k)
- **Government (9th Grade National Pay Scale):**
  - Starting basic ৳22,000 + House rent (40-60%) + Medical + Allowances = Total gross ৳38,000 – ৳55,000 / month + pension/gratuity.
- **Commercial Banking (MTO / PO):**
  - Private Commercial Banks: ৳45,000 – ৳80,000 / month (Probation) → ৳80,000 – ৳120,000 upon confirmation."""

    # 5. Interview Questions
    if any(k in msg_lower for k in ["interview", "question", "viva", "prepare"]):
        return """❓ **Top 5 High-Probability Interview Questions for Your Profile:**
1. *"Walk me through a complex project where you had to balance risk and strategic timelines."*
2. *"How do you stay updated with current Bangladesh regulatory, economic, and technological trends?"*
3. *"Describe a situation where a client or stakeholder disagreed with your recommendation. How did you resolve it?"*
4. *"What specific value can you bring to our team in the first 90 days?"*
5. *"Why are you interested in this specific sector in Bangladesh over other career paths?"*

💡 *Tip:* Use the **STAR method** (Situation, Task, Action, Result) to structure your answers."""

    # Default general response
    return f"""Hello! I'm your **CareerLens AI Career Navigator**. 🎯

I can answer questions regarding:
- 📄 **Your CV Analysis:** Strengths, missing competencies, and ATS score improvements.
- 💼 **Bangladesh Job Vacancies:** Private tech, telecom, FMCG, banking, and government jobs (BCS, Bangladesh Bank, Combined 10 Banks).
- 🎓 **Study Abroad Scholarships:** Fully-funded Master's & PhD opportunities (Chevening, DAAD, Fulbright, MEXT).
- ❓ **Interview Preparation & Salary Benchmarks:** Realistic compensation data for Dhaka and remote roles.

How can I help advance your career today?"""

