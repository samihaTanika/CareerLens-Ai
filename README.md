# CareerLens-Ai — Intelligent CV Matching & Career Platform

[![React](https://img.shields.io/badge/Frontend-React%2019-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://python.org/)
[![Taxonomy](https://img.shields.io/badge/Skills%20Taxonomy-2%2C526-success.svg)](#)
[![Job Categories](https://img.shields.io/badge/BD%20Job%20Sectors-83-indigo.svg)](#)

**CareerLens-Ai** is an advanced career intelligence platform designed specifically for Bangladeshi university students, job seekers, and graduates. It leverages natural language processing (NLP) and AI to parse resumes, rank matching career sectors across both government civil service and private enterprise, identify missing skills, generate personalized learning roadmaps, and match fully-funded study abroad scholarships.

---

## ✨ Key Highlights

- **83 Comprehensive Bangladeshi Job Categories**: Full coverage spanning Government Civil Service (47th BCS General & Technical Cadres, Judiciary BJS, Bangladesh Bank AD, Combined 10 Banks, Railways, Primary Teachers, Nursing, Public Power & Water Engineering) to Private Sectors (Software, FinTech, RMG Merchandising, Textile Engineering, FMCG, Pharmaceuticals, Corporate Tax/VAT, and Microfinance).
- **2,526 Skills NLP Taxonomy across 56 Domains**: Includes Bangladesh-specific competencies (BNBC building codes, cGMP pharma standards, Public Procurement Rules PPR 2008, TallyPrime, BSTI food safety regulations) alongside modern tech stacks.
- **Top 20 Sector Matching**: View your initial Top 5 career matches with a 1-click toggle to inspect your complete Top 20 ranked sectors with explainable match percentages.
- **AI Career Assistant Chatbot**: Global floating mentor answering queries on CV optimization, civil service eligibility, BCS vs corporate trade-offs, and study abroad requirements.
- **22+ Verified Global Scholarships**: Curated directory of fully-funded Masters & PhD opportunities (Chevening, Fulbright, DAAD, Commonwealth, MEXT, Australia Awards, Sweden SISGP) with verified GPA and work experience criteria.
- **Direct Verified Job Portals**: Working, clean application links to modern **BDJobs** (`https://bdjobs.com/jobsearch?keyword={query}`), **Teletalk AllJobs** (`http://alljobs.teletalk.com.bd`), and **LinkedIn Bangladesh**.
- **Interactive Student Tools**: ATS CV score analyzer, skill gap visualization, salary benchmarks (BDT & USD), and LinkedIn profile synchronization.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (Soothing, modern SaaS aesthetic with light color palette and responsive cards)
- **Routing**: React Router v7
- **UI Components**: Interactive Cards, Score Gauges, ChatBot Drawer, Progress Bars, and Filters

### Backend
- **Framework**: FastAPI (Python 3.12)
- **PDF Extraction**: PyMuPDF (`fitz`) for robust binary and text parsing
- **NLP Engine**: spaCy phrase matcher + regex entity extractors
- **AI Roadmap & Chat**: Google Gemini AI with resilient context-based local fallback

---

## 🚀 Running Locally

### 1. Backend (FastAPI)
```bash
# Navigate to backend and install requirements
cd backend
pip install -r requirements.txt
pip install PyMuPDF

# Run the API server
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
* API Documentation: `http://127.0.0.1:8000/docs`
* Health Check: `http://127.0.0.1:8000/api/health`

### 2. Frontend (React + Vite)
```bash
# Navigate to frontend and install dependencies
cd frontend
npm install

# Start development server
npm run dev
```
* Web Application: `http://127.0.0.1:5173`

---

## 📂 Project Directory Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI routes (/api/analyze, /api/chat, /api/scholarships, /api/categories)
│   │   └── nlp_engine.py    # Text extraction, NLP skills matching, Gemini AI integration
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # ChatBot, Navbar, Footer, Button, Card, ScoreGauge, FileUpload
│   │   ├── data/            # mockJobs (45 BD & remote jobs), mockScholarships (22 programs)
│   │   ├── pages/           # LandingPage, AnalyzePage, DashboardPage, JobSearchPage, ScholarshipsPage
│   │   └── services/        # analysisService.js, authContext.jsx
│   ├── package.json
│   └── vite.config.js
├── nlp_export/
│   ├── job_categories.json  # 83 Bangladesh job categories (Govt & Private)
│   ├── skills_taxonomy.json # 2,526 skills across 56 industry domains
│   └── sample_analysis_result.json
└── README.md
```

---

## 📜 License & Acknowledgments

Created for academic research and practical deployment for Bangladeshi students and graduates.
All verified circulars and scholarship information sourced from official public authorities.
