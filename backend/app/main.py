"""
CareerLens AI — FastAPI Backend Server
Provides REST endpoints for CV upload, NLP skill extraction,
top 20 Bangladesh job matching, study abroad scholarships, and AI career chatbot.
Includes automated keep-alive heartbeat to prevent cloud dormancy.
"""

import os
import json
import time
import asyncio
import urllib.request
from fastapi import FastAPI, File, UploadFile, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from .nlp_engine import analyze_cv_complete, generate_chat_response, job_categories, skills_taxonomy

START_TIME = time.time()
PUBLIC_BACKEND_URL = os.environ.get("RENDER_EXTERNAL_URL", "https://careerlens-backend-gy5k.onrender.com")

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


async def keep_alive_background_loop():
    """
    Self-ping background worker that sends a keep-alive HTTP GET request
    to the public Render service URL every 10 seconds.
    This keeps the Render edge routing active and prevents the free tier service from sleeping.
    """
    await asyncio.sleep(5)  # Initial delay for server startup
    loop = asyncio.get_event_loop()

    while True:
        try:
            target_url = f"{PUBLIC_BACKEND_URL}/api/health"
            req = urllib.request.Request(
                target_url,
                headers={"User-Agent": "CareerLens-Heartbeat-Pinger/1.0"}
            )
            # Run blocking request in threadpool executor so asyncio loop is never blocked
            await loop.run_in_executor(None, lambda: urllib.request.urlopen(req, timeout=8))
        except Exception:
            pass  # Resilient to transient network glitches
        await asyncio.sleep(10)  # Ping every 10 seconds as requested


@app.on_event("startup")
async def on_startup():
    """Start automated self-ping heartbeat upon server startup."""
    asyncio.create_task(keep_alive_background_loop())


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = None
    context: Optional[Dict[str, Any]] = None


@app.get("/")
def root():
    return {
        "status": "online",
        "service": "CareerLens AI Backend",
        "uptime_seconds": int(time.time() - START_TIME),
        "categories_loaded": len(job_categories),
        "skills_taxonomy_categories": len(skills_taxonomy),
        "endpoints": [
            "/api/health",
            "/api/ping",
            "/api/analyze",
            "/api/categories",
            "/api/scholarships",
            "/api/chat",
            "/api/demo-analysis"
        ]
    }


@app.get("/api/health")
@app.get("/api/ping")
def health():
    """Heartbeat endpoint for keep-alive pings."""
    return {
        "status": "healthy",
        "service": "CareerLens AI Cloud Engine",
        "uptime_seconds": int(time.time() - START_TIME),
        "categories_count": len(job_categories),
        "skills_taxonomy_count": len(skills_taxonomy),
        "timestamp": time.time()
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
    """Returns all 80+ Bangladesh job market taxonomy categories (Government + Private)."""
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
    Returns: Top 20 matched categories with roadmaps, BDJobs application links, active jobs, and matched scholarships.
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
