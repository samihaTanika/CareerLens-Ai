# AI Resume Analyzer

A university project for building a web-based **AI Resume Analyzer** that compares a candidate's resume with a job description and produces ATS-style scoring, job matching, skill analysis, keywords, recommendations, and learning suggestions.

> **Status:** The final project plan is complete. The current implementation target is the initial frontend/website. The real ML/NLP engine, FastAPI backend, database, authentication, and deployment are not yet complete.

## Final Project Vision

**User → Upload Resume + Job Description → AI Analysis → Dashboard**

Final planned outputs:
- ATS Score
- Job Match Percentage
- Matching skills
- Missing skills
- Important keywords
- Skill/category analysis
- Resume improvement suggestions
- Recommended skills to learn
- Downloadable analysis report

The ATS score will be an explainable project-owned scoring system, not a reproduction of a proprietary ATS.

## Planned Stack

### Frontend
- React.js
- Tailwind CSS
- JavaScript

### Backend
- Python
- FastAPI

### ML/NLP
- pandas
- NumPy
- scikit-learn
- NLTK
- spaCy
- PyMuPDF
- Optional later: sentence-transformers / Sentence-BERT

### Later
- MongoDB
- Authentication
- Deployment

### Tools
- VS Code
- Google Colab
- Git
- GitHub

---

# What Has Already Been Done

## Planning
- [x] Project idea finalized
- [x] Overall system flow finalized
- [x] Main outputs/features defined
- [x] Technology stack planned
- [x] Initial ML approach defined
- [x] Skill database concept defined
- [x] ATS-style scoring concept defined
- [x] Dashboard requirements defined
- [x] Planned pages defined
- [x] API endpoint plan defined
- [x] Target folder structure defined
- [x] Advanced feature roadmap defined
- [x] Evaluation requirements defined
- [x] 30-day development roadmap defined
- [x] Final architecture defined

## Not yet completed
- [ ] Real ML engine
- [ ] Real PDF text extraction pipeline
- [ ] Real skill extraction
- [ ] Real TF-IDF similarity
- [ ] Real ATS scoring engine
- [ ] FastAPI backend
- [ ] MongoDB
- [ ] Authentication
- [ ] Real analysis history
- [ ] Semantic similarity
- [ ] Deployment

Do not mark these complete until they actually work.

---

# Current Phase — Initial Website

## Pages
- [x] Landing Page
- [x] Upload / Analyze Page
- [x] Analysis Dashboard
- [x] Analysis History
- [ ] Optional Profile Page

## Upload flow
- [x] PDF drag-and-drop
- [x] PDF validation
- [x] File name/size display
- [x] Remove/replace file
- [x] Job description textarea
- [x] Character counter
- [x] Validation
- [x] Analyze button states
- [x] Loading state
- [x] Error state
- [x] Mock analysis result

## Dashboard
- [x] ATS Score
- [x] Job Match %
- [x] Resume Strength
- [x] Matched Skills
- [x] Missing Skills
- [x] Important Keywords
- [x] Skill/category analysis
- [x] Recommendations
- [x] Recommended skills to learn

## History
- [x] Mock analysis records
- [x] Date
- [x] Resume name
- [x] Job/category
- [x] ATS score
- [x] Match score
- [x] View analysis

---

# Development Roadmap

## Phase 0 — Planning
- [x] Finalize features
- [x] Finalize stack
- [x] Define architecture
- [ ] Finalize/select dataset when ML starts

## Phase 1 — Initial Website
- [x] Initialize/verify React
- [x] Configure Tailwind
- [x] Create routing
- [x] Build reusable UI components
- [x] Build landing page
- [x] Build upload page
- [x] Build mock analysis service
- [x] Build analysis dashboard
- [x] Build history page
- [x] Test responsive behavior
- [x] Fix UI/runtime issues

## Phase 2 — ML Prototype
Planned pipeline:

**Resume → Text Extraction → Preprocessing → TF-IDF → Cosine Similarity → Match Score**

- [ ] PDF extraction
- [ ] Text cleaning
- [ ] Tokenization
- [ ] TF-IDF
- [ ] Cosine similarity
- [ ] Match score
- [ ] Google Colab experiments

## Phase 3 — Skill Extraction
- [ ] Create `skills.json`
- [ ] Resume skill extraction
- [ ] Job required-skill extraction
- [ ] Matched skills
- [ ] Missing skills
- [ ] Skill extraction evaluation

## Phase 4 — FastAPI
- [ ] Create backend
- [ ] `/upload-resume`
- [ ] `/analyze`
- [ ] `/extract-skills`
- [ ] `/calculate-score`
- [ ] Connect frontend to backend
- [ ] Replace mock service

## Phase 5 — Database
- [ ] MongoDB
- [ ] User model
- [ ] Analysis model
- [ ] Save history
- [ ] Retrieve history

## Phase 6 — Improvements
- [ ] Better ATS scoring
- [ ] Semantic similarity
- [ ] Sentence-BERT
- [ ] Resume section detection
- [ ] Resume improvement suggestions
- [ ] Job recommendations
- [ ] Skill learning recommendations
- [ ] Charts
- [ ] Downloadable report

## Phase 7 — Testing & Documentation
- [ ] Functional testing
- [ ] ML evaluation
- [ ] Screenshots
- [ ] System architecture diagram
- [ ] Use-case diagram
- [ ] Flowchart
- [ ] ER diagram
- [ ] Data-flow diagram
- [ ] Proposal
- [ ] SRS
- [ ] Final report
- [ ] Presentation
- [ ] Final GitHub README
- [ ] Deployment

---

# Architecture Rule

Initial frontend:

**React → Mock Service → Mock Analysis → Dashboard**

Final architecture:

**React → FastAPI → ML/NLP Engine → Analysis Result → React**

The ML/NLP logic must not be placed inside React components.

---

# Planned Frontend Structure

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

Eventual full project:

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

# Planned ML Pipeline

```text
Resume PDF
    ↓
Text Extraction
    ↓
Text Cleaning
    ↓
Tokenization
    ↓
Skill Extraction
    ↓
TF-IDF
    ↓
Cosine Similarity
    ↓
Job Match Score
    ↓
ATS-style Score
    ↓
Dashboard
```

Later, semantic matching can use Sentence-BERT.

---

# Initial ATS-style Score

| Component | Weight |
|---|---:|
| Job similarity | 40% |
| Required skills | 30% |
| Keywords | 15% |
| Resume sections | 10% |
| Formatting/basic checks | 5% |

Do not put invented performance results in the final report.

---

# Evaluation

Where applicable, evaluate using:
- Accuracy
- Precision
- Recall
- F1-score
- Similarity score
- Skill extraction precision
- Correct vs incorrect matches

Only report numbers obtained from actual experiments.

---

# Development Loop

```text
INSPECT
   ↓
PLAN
   ↓
IMPLEMENT
   ↓
RUN
   ↓
TEST
   ↓
FIX
   ↓
REVIEW
   ↓
CONTINUE
```

After every milestone:
1. Run the application.
2. Check the browser.
3. Check console errors.
4. Check responsive behavior.
5. Review component quality.
6. Update this README.
7. Commit the working state to Git.

---

# Immediate Next Step

**Build the initial React website only.**

Target flow:

**Landing → Upload/Analyze → Mock Analysis → Dashboard → History**

Do not start MongoDB, authentication, or real FastAPI/ML integration during this frontend milestone.

Once the website is stable, move to the ML prototype in Google Colab.

## Core Principle

The goal is not only a pretty website.

The final project needs a real, explainable ML/NLP system underneath it.

**Frontend = presentation layer**

**ML/NLP = academic core**

**FastAPI = connection layer**

Keep those responsibilities separate throughout development.
