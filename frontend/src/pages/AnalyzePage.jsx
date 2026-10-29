import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import Button from '../components/Button';
import Card from '../components/Card';
import { analyzeResume } from '../services/analysisService';

export default function AnalyzePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phaseMsg, setPhaseMsg] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'PDF Extraction', desc: 'PyMuPDF text extraction & cleanup' },
    { title: 'NLP Extraction', desc: 'spaCy entity & skills matching' },
    { title: 'Academic & Exp Fit', desc: 'BD university & experience scoring' },
    { title: 'Job Matching', desc: 'Scoring across 80+ BD job sectors' },
    { title: 'AI Roadmap & Vacancies', desc: 'Gemini career roadmap & BDJobs links' },
  ];

  const handleFileSelect = useCallback((selectedFile) => {
    setFile(selectedFile);
    setError('');
  }, []);

  const handleFileRemove = useCallback(() => {
    setFile(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!file || loading) return;

    setLoading(true);
    setError('');
    setCurrentStep(0);

    try {
      const result = await analyzeResume(file, (stageKey, message) => {
        setPhaseMsg(message);
        if (stageKey === 'extracting') setCurrentStep(1);
        else if (stageKey === 'nlp_skills') setCurrentStep(2);
        else if (stageKey === 'education_exp') setCurrentStep(3);
        else if (stageKey === 'matching') setCurrentStep(4);
        else if (stageKey === 'ai_roadmap') setCurrentStep(5);
      });

      // Save to localStorage so Scholarships, Jobs, and Chatbot have full access
      try {
        localStorage.setItem('careerlens_latest_analysis', JSON.stringify(result));
      } catch (e) {
        // Storage quota guard
      }

      // Navigate to dashboard with analysis data
      navigate('/dashboard', { state: { analysis: result } });
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
      setLoading(false);
    }
  }, [file, loading, navigate]);

  const handleQuickDemo = () => {
    // Create a mock File object for demo
    const mockFile = new File(['mock content'], 'Richard_Williams_CV.pdf', {
      type: 'application/pdf',
    });
    setFile(mockFile);
    setError('');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[var(--color-bg-primary)]">
      <div className="page-container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-2xs text-xs font-semibold text-[var(--color-accent-primary)] mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-pulse" />
            AI Resume Analyzer • Bangladesh & Global Careers
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Discover Your <span className="gradient-text">Top Career Sectors</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Upload your CV in PDF format. Our NLP engine extracts your competencies, evaluates your academic background, and ranks your top 20 best-fit job categories across Bangladesh government & private sectors, plus higher study scholarships abroad.
          </p>
        </div>

        {/* Upload Card */}
        <Card className="p-8 sm:p-10 mb-8 border border-slate-200/90 shadow-sm relative overflow-hidden bg-white">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Upload Your Resume (PDF)</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Maximum file size: 10MB • Standard single or multi-page PDF
              </p>
            </div>
            {!file && !loading && (
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-xs font-semibold text-[var(--color-accent-primary)] hover:text-indigo-800 flex items-center gap-1.5 self-start sm:self-auto py-1.5 px-3 rounded-xl bg-indigo-50 border border-indigo-100 transition-colors cursor-pointer"
              >
                ⚡ Use Sample CV (Richard Williams)
              </button>
            )}
          </div>

          {!loading ? (
            <div>
              <FileUpload
                onFileSelect={handleFileSelect}
                file={file}
                onRemove={handleFileRemove}
                disabled={loading}
              />

              {error && (
                <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700 flex items-center gap-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={!file || loading}
                  className="w-full sm:w-auto min-w-[260px] shadow-md shadow-indigo-500/20"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Analyze CV & Find Top Jobs
                </Button>
              </div>
            </div>
          ) : (
            /* Live Pipeline Progress Display */
            <div className="py-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-[var(--color-accent-primary)] flex items-center justify-center mx-auto mb-4 animate-bounce shadow-2xs">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  Processing Your Curriculum Vitae
                </h3>
                <p className="text-sm font-semibold text-[var(--color-accent-primary)] animate-pulse">
                  {phaseMsg || 'Initializing NLP analysis engine...'}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 max-w-lg mx-auto">
                {steps.map((st, idx) => {
                  const isDone = currentStep > idx;
                  const isCurrent = currentStep === idx;
                  return (
                    <div
                      key={st.title}
                      className={`flex items-center gap-3.5 p-3.5 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : isCurrent
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-xs'
                          : 'bg-slate-50 border-slate-100 text-slate-400 opacity-70'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isDone ? 'bg-emerald-200 text-emerald-900' : isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold">{st.title}</div>
                        <div className="text-xs opacity-80 truncate">{st.desc}</div>
                      </div>
                      {isCurrent && (
                        <div className="w-4 h-4 border-2 border-[var(--color-accent-primary)] border-t-transparent rounded-full animate-spin shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>

        {/* Feature Highlights Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
          <Card className="p-5">
            <div className="text-2xl mb-1.5">🎯</div>
            <div className="font-bold text-slate-900 text-sm">Top 20 Sector Matching</div>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">
              Automated ranking across 80+ Bangladesh industry categories (Govt & Private)
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-2xl mb-1.5">📊</div>
            <div className="font-bold text-slate-900 text-sm">Skills Gap Roadmap</div>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">
              Personalized action steps powered by Gemini AI and local certs
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-2xl mb-1.5">🇧🇩</div>
            <div className="font-bold text-slate-900 text-sm">Direct BDJobs Apply</div>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">
              1-click search & application links for BD verified postings
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
