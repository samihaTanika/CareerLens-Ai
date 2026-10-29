"""
CareerLens AI — FastAPI Backend Server
Provides REST endpoints for CV upload, NLP skill extraction,
top 20 Bangladesh job matching, study abroad scholarships, and AI career chatbot.
"""

import os
from fastapi import FastAPI, File, UploadFile, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from .nlp_engine import analyze_cv_complete, generate_chat_response, job_categories, skills_taxonomy

app = FastAPI(
    title="CareerLens AI API",
    description="Intelligent Resume Analyzer, Job Matcher & Career Chatbot for Bangladesh",
    version="2.1.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = None
    context: Optional[Dict[str, Any]] = None


@app.get("/")
def root():
    return {
        "status": "online",
        "service": "CareerLens AI Backend",
        "categories_loaded": len(job_categories),
        "skills_taxonomy_categories": len(skills_taxonomy),
        "endpoints": [
            "/api/health",
            "/api/analyze",
            "/api/categories",
            "/api/scholarships",
            "/api/chat",
            "/api/demo-analysis"
        ]
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "categories_count": len(job_categories),
        "skills_taxonomy_count": len(skills_taxonomy)
    }


@app.get("/api/demo-analysis")
def get_demo_analysis():
    """Returns sample precomputed analysis result for instant demonstration."""
    sample_path = os.path.join(os.path.dirname(__file__), "..", "..", "nlp_export", "sample_analysis_result.json")
    if os.path.exists(sample_path):
        with open(sample_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"message": "Demo data available in mockAnalysis"}


@app.get("/api/categories")
def get_categories():
    """Returns all 40+ Bangladesh job market taxonomy categories (Government + Private)."""
    return {"total": len(job_categories), "categories": job_categories}


@app.get("/api/scholarships")
def get_scholarships():
    """Returns curated international higher study scholarships for Bangladeshi students."""
    from .nlp_engine import match_cv_to_scholarships
    return {"scholarships": match_cv_to_scholarships({})}


@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Intelligent Career Assistant Chatbot.
    Answers queries on candidate CV, BD government and private jobs, and international scholarships.
    """
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    reply = generate_chat_response(
        message=request.message,
        history=request.history,
        context=request.context
    )
    return {"reply": reply}


@app.post("/api/analyze")
async def analyze_cv(file: UploadFile = File(...)):
    """
    Accepts a CV in PDF format and runs the complete 7-stage NLP & AI pipeline.
    Returns: Top 20 matched categories with roadmaps, BDJobs application links, and matched scholarships.
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    try:
        pdf_bytes = await file.read()
        if len(pdf_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        result = analyze_cv_complete(pdf_bytes)
        if "error" in result:
            raise HTTPException(status_code=422, detail=result["error"])

        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis pipeline error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)
