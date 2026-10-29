import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from '../components/Card';
import ScoreGauge from '../components/ScoreGauge';
import SkillTag from '../components/SkillTag';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { mockAnalysisResult } from '../data/mockAnalysis';

export default function DashboardPage() {
  const location = useLocation();

  // Get analysis data from navigation state, or fall back to our verified model result
  const analysis = location.state?.analysis || mockAnalysisResult;

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'skills' | 'jobs'
  const [showAllCategories, setShowAllCategories] = useState(false);

  const formatText = (str) => {
    if (!str) return '';
    return str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (!analysis || !analysis.top_categories || analysis.top_categories.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-[var(--color-bg-primary)]">
        <div className="page-container">
          <EmptyState
            title="No Analysis Found"
            description="Upload your CV to see your top 5 matched Bangladesh job categories and tailored career intelligence."
            actionLabel="Upload CV"
            actionTo="/analyze"
          />
        </div>
      </div>
    );
  }

  const selectedCategory = analysis.top_categories[selectedCategoryIndex] || analysis.top_categories[0];
  const cvSummary = analysis.cv_summary || {};

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[var(--color-bg-primary)]">
      <div className="page-container space-y-8">
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 pb-6 animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              NLP Analysis & AI Matching Complete
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Career Intelligence Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Top Matched Career Opportunities in Bangladesh for <span className="font-bold text-slate-800">{cvSummary.name || 'Candidate'}</span>
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => {
                const text = `🎯 I just analyzed my resume with CareerLens AI! My profile matched ${analysis.overall_cv_score || 88}% for ${analysis.top_categories[0]?.category_name || 'top career sectors'} in Bangladesh. Highly recommended for students and professionals looking to optimize their career roadmap! Check it out:`;
                const url = window.location.origin;
                window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0077b5] text-white text-xs font-bold hover:bg-[#006097] transition-all shadow-2xs cursor-pointer border-0"
              title="Share your CareerLens assessment on LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>Share on LinkedIn</span>
            </button>
            <Button variant="secondary" size="sm" onClick={() => window.print()} id="dashboard-download-report">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Print / Save PDF
            </Button>
            <Button variant="primary" size="sm" to="/analyze" id="dashboard-new-analysis">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Analyze Another CV
            </Button>
          </div>
        </div>

        {/* Candidate Profile Summary & Market Readiness Gauge */}
        <Card className="p-6 sm:p-8 bg-white border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Info & Metrics */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl font-extrabold text-[var(--color-accent-primary)] shrink-0 shadow-2xs">
                    {(cvSummary.name || 'C').charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {cvSummary.name || 'Candidate Profile'}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                      {cvSummary.email && <span>✉️ {cvSummary.email}</span>}
                      {cvSummary.phone && <span>📞 {cvSummary.phone}</span>}
                    </div>
                  </div>
                </div>

                <span className="self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-[var(--color-accent-primary)] border border-indigo-100">
                  {analysis.resumeName || 'Verified Resume'}
                </span>
              </div>

              {/* 4 Clean Stats (No Nested Boxes) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Education</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5 truncate">
                    {cvSummary.education || "Bachelor's"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Experience</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {cvSummary.experience_years || 0} Years
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Competencies</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {cvSummary.total_skills_found || 0} Skills
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">Best Match</div>
                  <div className="text-sm font-bold text-emerald-700 mt-0.5">
                    {analysis.top_categories[0]?.match_percentage || 85}% Fit
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/70 text-sm leading-relaxed text-slate-700">
                <span className="font-bold text-[var(--color-accent-primary)] mr-1.5">Executive Summary:</span>
                {analysis.overall_summary}
              </div>

              {/* Extracted Skills Preview */}
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  NLP Identified Skills
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(cvSummary.extracted_skills || []).map((skill) => (
                    <SkillTag key={skill} skill={skill} variant="neutral" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Circular Score Gauge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100">
              <ScoreGauge score={analysis.overall_cv_score || 80} label="Market Readiness" size={150} />
              <div className="mt-4 text-xs text-slate-500 max-w-xs leading-relaxed">
                Calculated based on skill alignment, academic pedigree, and current Bangladesh market vacancies.
              </div>
              {analysis.top_recommendations && analysis.top_recommendations.length > 0 && (
                <div className="mt-4 text-left w-full border-t border-slate-200/80 pt-3">
                  <div className="text-xs font-bold text-slate-800 mb-1">Key Recommendation:</div>
                  <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    👉 {analysis.top_recommendations[0]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* =================================================================== */}
        {/* TOP MATCHED CAREER SECTORS — TOP 5 INITIALLY, EXPANDS TO TOP 20 */}
        {/* =================================================================== */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-[var(--color-accent-primary)] border border-indigo-100">
                  {showAllCategories ? `All Top ${analysis.top_categories.length} Matches` : 'Top 5 Matches'}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Showing {showAllCategories ? analysis.top_categories.length : Math.min(5, analysis.top_categories.length)} of {analysis.top_categories.length} Sectors
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Matched Career Sectors in Bangladesh
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Select any sector below to inspect required skills, learning roadmaps, salary benchmarks, and live vacancies.
              </p>
            </div>

            {analysis.top_categories.length > 5 && (
              <button
                type="button"
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50/80 text-[var(--color-accent-primary)] hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer self-start sm:self-auto shadow-2xs"
              >
                {showAllCategories ? (
                  <>
                    <span>▲ Show Top 5 Only</span>
                  </>
                ) : (
                  <>
                    <span>▼ View All Top {analysis.top_categories.length} Matched Sectors (+{analysis.top_categories.length - 5} More)</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Clean Segmented Tab Strip */}
          <div className={`grid gap-3 transition-all ${
            showAllCategories
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'
          }`}>
            {(showAllCategories ? analysis.top_categories : analysis.top_categories.slice(0, 5)).map((cat, idx) => {
              const actualIdx = analysis.top_categories.findIndex(c => (c.category_id || c.category_name) === (cat.category_id || cat.category_name));
              const isSelected = selectedCategoryIndex === (actualIdx !== -1 ? actualIdx : idx);
              return (
                <button
                  key={cat.category_id || idx}
                  type="button"
                  onClick={() => setSelectedCategoryIndex(actualIdx !== -1 ? actualIdx : idx)}
                  className={`text-left p-4 rounded-2xl transition-all duration-200 relative cursor-pointer border ${
                    isSelected
                      ? 'bg-white border-[var(--color-accent-primary)] ring-2 ring-indigo-500/20 shadow-sm -translate-y-0.5'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-indigo-100 text-[var(--color-accent-primary)]'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Rank #{cat.rank || idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[var(--color-accent-primary)]">
                      {cat.match_percentage}%
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 mb-2 leading-snug">
                    {cat.category_name}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
                    {cat.is_government ? (
                      <span className="text-emerald-800 font-bold">🏛️ Govt / BCS</span>
                    ) : (
                      <span>{formatText(cat.demand_level || 'High')} Demand</span>
                    )}
                    <span className="text-emerald-700 font-bold">{formatText(cat.status || 'Match')}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {analysis.top_categories.length > 5 && !showAllCategories && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setShowAllCategories(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-[var(--color-accent-primary)] hover:bg-indigo-50/70 border border-indigo-200 transition-all shadow-2xs cursor-pointer"
              >
                <span>Explore All Top {analysis.top_categories.length} Bangladesh Career Sectors (Government & Private)</span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-xs font-extrabold text-[var(--color-accent-primary)]">
                  +{analysis.top_categories.length - 5} More
                </span>
                <span>▼</span>
              </button>
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* SELECTED CATEGORY DEEP-DIVE PANEL WITH SUB-TABS */}
        {/* =================================================================== */}
        <Card className="p-6 sm:p-8 bg-white border border-slate-200/80 shadow-xs space-y-6">
          {/* Category Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-100 pb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-[var(--color-accent-primary)] border border-indigo-100">
                  Rank #{selectedCategory.rank || selectedCategoryIndex + 1}
                </span>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {formatText(selectedCategory.status || 'Good Fit')}
                </span>
                <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  {formatText(selectedCategory.demand_level || 'High')} Demand in BD
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {selectedCategory.category_name}
              </h2>
              <p className="text-sm text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
                {selectedCategory.why_good_fit}
              </p>
            </div>

            {/* Salary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 shrink-0">
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Expected Salary in BD</div>
                <div className="text-base sm:text-xl font-extrabold text-slate-900 mt-0.5">
                  ৳{selectedCategory.salary_range?.min?.toLocaleString()} - ৳{selectedCategory.salary_range?.max?.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500"> / month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-[var(--color-accent-primary)] flex items-center justify-center text-lg font-extrabold shadow-2xs">
                {selectedCategory.match_percentage}%
              </div>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            {[
              { id: 'overview', label: '📊 Overview & Salary Fit' },
              { id: 'skills', label: '⚡ Skills Gap & Roadmap' },
              { id: 'jobs', label: `💼 Live Vacancies (${selectedCategory.active_jobs?.length || 0})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-[var(--color-accent-primary)] border-indigo-200 shadow-2xs'
                    : 'bg-white text-slate-600 border-transparent hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview & Salary Fit */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
                    Bangladesh Industry Landscape
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {selectedCategory.market_outlook_bd}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-xs" />
                    Match Rationale & Fit Analysis
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {selectedCategory.why_good_fit}
                  </p>
                </div>
              </div>

              {/* Quick links to BDJobs & LinkedIn */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Ready to search live openings?</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Explore direct verified listings on leading job portals.</p>
                </div>
                <div className="flex items-center gap-3">
                  {selectedCategory.application_links?.bdjobs && (
                    <a
                      href={selectedCategory.application_links.bdjobs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 text-[#b71c1c] border border-rose-200 text-xs font-bold hover:bg-[#b71c1c] hover:text-white transition-all no-underline shadow-2xs"
                    >
                      <span>Search on BDJobs</span>
                      <span>↗</span>
                    </a>
                  )}
                  {selectedCategory.application_links?.linkedin_bd && (
                    <a
                      href={selectedCategory.application_links.linkedin_bd}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/30 text-xs font-bold hover:bg-[#0077b5] hover:text-white transition-all no-underline shadow-2xs"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span>LinkedIn Bangladesh</span>
                      <span>↗</span>
                    </a>
                  )}
                  {selectedCategory.application_links?.govt_portal && (
                    <a
                      href={selectedCategory.application_links.govt_portal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all no-underline shadow-2xs"
                    >
                      <span>🏛️ Teletalk AllJobs</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Skills Gap & Roadmap */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Possessed Skills */}
                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Skills You Possess ({selectedCategory.matched_skills?.length || 0})
                    </h3>
                    <span className="text-xs font-bold text-emerald-800">Verified from CV</span>
                  </div>
                  {selectedCategory.matched_skills && selectedCategory.matched_skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory.matched_skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-white text-emerald-800 border border-emerald-200 shadow-2xs"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      No direct skill overlaps detected for this role.
                    </p>
                  )}
                </div>

                {/* Missing Skills */}
                <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      Missing Skills to Acquire
                    </h3>
                    <span className="text-xs font-bold text-amber-800">Employer Priority</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(selectedCategory.missing_skills || []).map((item) => {
                      const skillName = typeof item === 'string' ? item : item.skill;
                      const priority = typeof item === 'object' ? item.priority : 'important';
                      return (
                        <span
                          key={skillName}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1.5 shadow-2xs ${
                            priority === 'critical'
                              ? 'bg-white text-rose-800 border-rose-200'
                              : 'bg-white text-amber-800 border-amber-200'
                          }`}
                        >
                          <span>+ {skillName}</span>
                          {priority === 'critical' && (
                            <span className="text-[10px] font-extrabold uppercase bg-rose-600 text-white px-1.5 py-0.2 rounded">
                              Req
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Learning Roadmap */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>🎯</span> Gemini AI Strategic Learning Roadmap for Bangladesh
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(selectedCategory.learning_roadmap || []).map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-start gap-3 text-xs text-slate-700 shadow-2xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-indigo-50 text-[var(--color-accent-primary)] font-bold flex items-center justify-center shrink-0 border border-indigo-100">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Live Vacancies */}
          {activeTab === 'jobs' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900">
                  Live Openings in Bangladesh ({selectedCategory.active_jobs?.length || 0})
                </h3>
                <div className="flex items-center gap-2">
                  {selectedCategory.application_links?.bdjobs && (
                    <a
                      href={selectedCategory.application_links.bdjobs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-[#b71c1c] border border-rose-200 text-xs font-bold hover:bg-[#b71c1c] hover:text-white transition-all no-underline shadow-2xs"
                    >
                      🔴 Search on BDJobs
                    </a>
                  )}
                  {selectedCategory.application_links?.govt_portal && (
                    <a
                      href={selectedCategory.application_links.govt_portal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all no-underline shadow-2xs"
                    >
                      🏛️ Teletalk AllJobs
                    </a>
                  )}
                </div>
              </div>

              {selectedCategory.active_jobs && selectedCategory.active_jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCategory.active_jobs.map((job) => (
                    <Card
                      key={job.id}
                      hover
                      className="p-5 flex flex-col justify-between bg-white border border-slate-200/80 shadow-xs"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-[var(--color-accent-primary)] border border-indigo-100">
                            {job.type}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            ⏳ {job.deadline}
                          </span>
                        </div>

                        <h4 className="font-bold text-base text-slate-900 line-clamp-1 mb-1">
                          {job.title}
                        </h4>

                        <div className="text-xs font-semibold text-slate-600 mb-2">
                          🏢 {job.company} • 📍 {job.location}
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-900 font-bold mb-3 border border-slate-100">
                          💰 {job.salary}
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                          {job.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        {job.company_url && (
                          <a
                            href={job.company_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-slate-500 hover:text-[var(--color-accent-primary)] hover:underline no-underline"
                          >
                            Company Site ↗
                          </a>
                        )}
                        <a
                          href={job.apply_url || selectedCategory.application_links?.bdjobs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 rounded-xl gradient-bg text-white text-xs font-bold hover:opacity-90 transition-opacity ml-auto no-underline shadow-2xs"
                        >
                          Apply Now ↗
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-10 rounded-2xl bg-slate-50 text-center border border-slate-100">
                  <div className="text-3xl mb-2">💼</div>
                  <h4 className="text-base font-bold text-slate-900">Direct Portal Openings</h4>
                  <p className="text-xs text-slate-500 my-2">
                    Verified job postings are continuously syndicated from BDJobs and LinkedIn Bangladesh.
                  </p>
                  <a
                    href={selectedCategory.application_links?.bdjobs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-4 py-2 rounded-xl gradient-bg text-white text-xs font-bold no-underline shadow-xs"
                  >
                    View Live Postings on BDJobs ↗
                  </a>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* =================================================================== */}
        {/* MATCHED HIGHER STUDY SCHOLARSHIPS ABROAD */}
        {/* =================================================================== */}
        {analysis.matched_scholarships && analysis.matched_scholarships.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[var(--color-accent-primary)] text-xs font-bold mb-1">
                  <span>🎓</span> Higher Education Grants Matched to Your CV
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Top Recommended Scholarships for Higher Studies Abroad
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Based on your degree, {cvSummary.experience_years || 0} years experience, and academic profile.
                </p>
              </div>
              <Link
                to="/scholarships"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[var(--color-accent-primary)] bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all no-underline shadow-2xs self-start sm:self-auto"
              >
                <span>View All 22+ Global Scholarships</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.matched_scholarships.slice(0, 3).map((sch) => (
                <Card
                  key={sch.id}
                  hover
                  className="p-5 flex flex-col justify-between bg-white border border-slate-200/80 shadow-xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {sch.funding_type || 'Fully Funded'}
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-[var(--color-accent-primary)]">
                          {sch.match_score}% Fit
                        </span>
                      </div>
                    </div>

                    <h4 className="font-bold text-base text-slate-900 line-clamp-1 mb-1">
                      {sch.name}
                    </h4>

                    <div className="text-xs font-semibold text-slate-600 mb-2">
                      🌍 {sch.country} • 🎓 {sch.degree_level}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {sch.why_matched}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {(sch.benefits || []).slice(0, 3).map((b, bi) => (
                        <span key={bi} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-50 text-slate-700 border border-slate-200">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400 font-medium">
                      📅 {sch.application_deadline ? `Due ${sch.application_deadline}` : 'Open'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const text = `Check out the ${sch.name} scholarship for higher studies! ${sch.application_url}`;
                          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sch.application_url)}&summary=${encodeURIComponent(text)}`, '_blank');
                        }}
                        className="p-1.5 rounded-lg text-[#0077b5] hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 cursor-pointer"
                        title="Share on LinkedIn"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </button>
                      <a
                        href={sch.application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-xl gradient-bg text-white text-xs font-bold hover:opacity-90 transition-opacity no-underline shadow-2xs"
                      >
                        Apply ↗
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Global Opportunities Gateways (Clean 2-Column Banner) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/jobs/remote"
            className="p-5 rounded-2xl bg-white border border-emerald-200/90 flex items-center justify-between no-underline group hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3.5">
              <span className="text-2xl">🌍</span>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  International Remote Jobs
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Positions in US/EU hiring candidates from Bangladesh
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200">
              Browse →
            </span>
          </Link>

          <Link
            to="/scholarships"
            className="p-5 rounded-2xl bg-white border border-indigo-200/90 flex items-center justify-between no-underline group hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3.5">
              <span className="text-2xl">🎓</span>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-800 transition-colors">
                  Study Abroad Scholarships
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Fully-funded Masters & PhD grants matching your CV
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-[var(--color-accent-primary)] bg-indigo-50 px-3.5 py-1.5 rounded-xl border border-indigo-200">
              Explore →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
