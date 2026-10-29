# AI Resume Analyzer — Initial Website Master Looping Prompt

You are the lead frontend engineer for my university project, **AI Resume Analyzer**.

## SOURCE OF TRUTH

Use the attached final project plan as the specification. Do not invent a different product.

Final system:
**User → Upload Resume + Job Description → AI Analysis → Dashboard**

Final outputs:
- ATS Score
- Job Match Percentage
- Matching Skills
- Missing Skills
- Important Keywords
- Skill/category analysis
- Resume improvement suggestions
- Recommended skills to learn
- Downloadable analysis report

Planned stack:
- Frontend: React.js + Tailwind CSS
- Backend: Python + FastAPI
- ML/NLP: Python, scikit-learn, NLTK, spaCy, PyMuPDF
- Optional later: sentence-transformers / Sentence-BERT
- Optional later: MongoDB
- Git/GitHub

## CURRENT TASK

Build **ONLY the initial website/frontend**.

Do not pretend that the ML engine, FastAPI backend, authentication, MongoDB, or real analysis pipeline already exists.

The frontend must be polished, responsive, professional, and ready to connect to the real backend later.

---

# INITIAL WEBSITE SCOPE

## 1. Landing Page

Build:
- AI Resume Analyzer hero section
- Clear value proposition
- Primary CTA: **Analyze My Resume**
- Optional secondary CTA: **See How It Works**
- How It Works section
- Key features
- Benefits
- Simple workflow visualization
- Professional footer

Core message:
**Analyze → Match → Improve**

## 2. Upload / Analyze Page

### Resume upload
- Drag-and-drop PDF
- PDF validation
- File name and size
- Remove/replace file
- Clear error states

### Job description
- Large textarea
- Character counter
- Clear placeholder
- Validation

### Analyze button
- Disabled until valid
- Loading state
- Processing state
- Error state
- Success transition

For this first version, Analyze uses **realistic mock analysis data**.

Do NOT call a fake external AI API.

Keep the mock service isolated so it can later be replaced by:

`POST /analyze`

## 3. Analysis Dashboard

Display:
- ATS Score
- Job Match %
- Resume Strength
- Matched skills
- Missing skills
- Important keywords
- Skill/category analysis
- Resume recommendations
- Recommended skills to learn

Use polished score indicators, progress bars/charts where useful, and clear visual hierarchy.

## 4. Analysis History

Frontend-only mock history:
- Date
- Resume name
- Job/category
- ATS score
- Match score
- View analysis

Do not build MongoDB yet.

## 5. Optional Profile Page

Only include it if it improves the structure without adding unnecessary complexity.

Authentication is out of scope for this milestone.

---

# DESIGN DIRECTION

Make it look like a serious modern SaaS/AI product.

Requirements:
- Modern
- Minimal
- Clean
- Professional
- Strong visual hierarchy
- Excellent spacing
- Responsive
- Accessible
- Consistent components
- Good empty/loading/error states
- Subtle animations only when useful

Avoid:
- Excessive gradients
- Neon overload
- Generic student-template appearance
- Unnecessary animation
- Excessive rounded cards
- Visual clutter
- Fake AI gimmicks

The dashboard should be the strongest part of the UI because it will be the main project demonstration.

---

# TECHNICAL REQUIREMENTS

Use:
- React
- Tailwind CSS
- React Router where useful
- Reusable components
- Clean component hierarchy
- Mock/API service abstraction
- Mock data separated from UI
- No unnecessary dependencies

Suggested structure:

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

Keep it compatible with the eventual full structure:

```text
AI-Resume-Analyzer/
├── frontend/
├── backend/
├── ml/
├── data/
├── notebooks/
├── README.md
└── .gitignore
```

---

# FUTURE API CONTRACT

Prepare the frontend around:

```text
POST /upload-resume
POST /analyze
POST /extract-skills
POST /calculate-score
GET  /analysis-history
GET  /analysis/{id}
```

For now, use mock services with the same conceptual response structure.

Do not build FastAPI in this task.

---

# MOCK ANALYSIS DATA

Use realistic controlled mock data such as:

```json
{
  "ats_score": 78,
  "job_match": 84,
  "resume_strength": 78,
  "matched_skills": ["Python", "React", "SQL", "Machine Learning"],
  "missing_skills": ["Docker", "AWS"],
  "keywords": ["Python", "REST API", "React", "SQL"],
  "categories": {
    "Programming": 85,
    "Web": 78,
    "Database": 70,
    "Machine Learning": 82,
    "Cloud": 35
  },
  "recommendations": [
    "Add measurable achievements",
    "Improve the skills section",
    "Add Docker experience"
  ],
  "recommended_skills": [
    "Docker",
    "AWS",
    "PostgreSQL"
  ]
}
```

This is frontend demo data only.

Do not generate arbitrary scores dynamically.

---

# IMPORTANT ARCHITECTURE RULE

The final plan says the ML engine should work before it becomes the real website backend.

Therefore the current architecture is:

**React → Mock Service → Mock Analysis → Dashboard**

Later it becomes:

**React → FastAPI → ML/NLP Engine → Analysis Result → React**

Keep all mock logic isolated.

Never put NLP/ML logic inside React components.

---

# LOOPING DEVELOPMENT PROCESS

Work continuously through this engineering loop.

## STEP 1 — INSPECT
Before changing anything:
- Inspect the existing project structure.
- Identify framework/dependencies.
- Reuse working code.
- Do not overwrite working functionality unnecessarily.

## STEP 2 — PLAN
Choose the smallest useful next milestone.

Examples:
- Initialize/verify frontend
- Configure Tailwind
- Create routing
- Build design system
- Build landing page
- Build upload page
- Build mock service
- Build dashboard
- Build history
- Polish responsiveness

Do not blindly implement everything in one giant change.

## STEP 3 — IMPLEMENT
Complete the selected milestone.

Prefer reusable components and avoid duplicated UI.

## STEP 4 — RUN
Actually run the application.

Check:
- Build errors
- Runtime errors
- Console errors
- Broken imports
- Routing
- Responsive behavior
- Accessibility

## STEP 5 — TEST
Test this actual flow:

**Landing → Analyze My Resume → Upload PDF → Paste Job Description → Analyze → Loading → Dashboard → History**

## STEP 6 — FIX
If anything fails:
- Diagnose the real cause.
- Fix it.
- Run again.
- Never hide errors just to make the page appear working.

## STEP 7 — REVIEW
Review:
- UI consistency
- Component reuse
- Code quality
- Responsiveness
- Accessibility
- Future FastAPI compatibility

## STEP 8 — CONTINUE
Only move to the next milestone after the current one works.

Repeat until the initial website is genuinely complete.

---

# ACCEPTANCE CRITERIA

Do not call the frontend finished until:

- [ ] Landing page works
- [ ] Navigation works
- [ ] Upload page works
- [ ] PDF validation works
- [ ] Job description validation works
- [ ] Analyze button states work
- [ ] Mock analysis executes
- [ ] Dashboard displays results
- [ ] Scores are clear
- [ ] Matched/missing skills are clear
- [ ] Keywords display correctly
- [ ] Category analysis displays
- [ ] Recommendations display
- [ ] Recommended learning skills display
- [ ] History page works
- [ ] Responsive layout works on desktop/tablet/mobile
- [ ] Loading states work
- [ ] Error states work
- [ ] No obvious console errors
- [ ] No broken routes
- [ ] Mock data is separated from UI
- [ ] API integration will be straightforward later
- [ ] README is updated
- [ ] Project is Git-ready

---

# CODE QUALITY RULES

- Keep components small and reusable.
- Avoid giant components.
- Avoid duplicated UI.
- Use meaningful names.
- Separate data from presentation.
- Separate mock/API services from UI.
- Avoid unnecessary dependencies.
- Do not add authentication or database code yet.
- Do not implement ML/NLP in React.
- Do not make unsupported claims that the system is already AI-powered.
- Do not replace controlled mock results with random values.

---

# FINAL RESPONSE AFTER EACH LOOP

After each milestone, report:

1. **Completed**
2. **Files changed**
3. **What was tested**
4. **Issues found**
5. **What remains**
6. **Next recommended step**

Keep this concise.

Most importantly:

**Do not stop at writing code. Build → run → test → inspect → fix → repeat.**

When the initial website is genuinely working, provide:
- final project structure
- completed feature checklist
- remaining ML/backend work
- exact next step for FastAPI integration
