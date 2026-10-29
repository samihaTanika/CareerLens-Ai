import { useState, useMemo } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { getRemoteJobs } from '../../data/mockJobs';

export default function RemoteJobsPage() {
  const { user } = useAuth();
  const rawSkills = user?.profile?.skills;
  const userSkills = useMemo(() => rawSkills || [], [rawSkills]);
  const [search, setSearch] = useState('');

  const jobs = useMemo(() => {
    const all = getRemoteJobs(userSkills);
    if (!search) return all;
    const q = search.toLowerCase();
    return all.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company_name.toLowerCase().includes(q) ||
        j.required_skills.some((s) => s.toLowerCase().includes(q))
    );
  }, [userSkills, search]);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[var(--color-bg-primary)]">
      <div className="page-container max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Remote Opportunities — Global Employers Hiring in Bangladesh
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                🌍 Remote Jobs Worldwide
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Work from anywhere in Bangladesh for companies across the US, Europe, and Asia-Pacific.
              </p>
            </div>
            <Button variant="secondary" size="sm" to="/jobs">
              ← All Bangladesh Jobs
            </Button>
          </div>
        </div>

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search remote jobs by title, company, or tech stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors shadow-2xs"
          />
        </div>

        {/* Info Banner */}
        <Card className="p-4 border border-blue-200 bg-blue-50/50 shadow-2xs">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div className="text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900">Remote Advantage:</span> These positions support 100% remote work with international pay in USD/EUR.
              {!user && (
                <span className="block mt-1">
                  <a href="/login" className="text-[var(--color-accent-primary)] font-bold hover:underline">
                    Sign in with your profile
                  </a>{' '}
                  to calculate personalized match scores against your CV competencies.
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* Job Cards */}
        {jobs.length === 0 ? (
          <Card className="p-14 text-center border border-slate-200 bg-white shadow-xs">
            <div className="text-4xl mb-3">🌐</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No remote jobs found</h3>
            <p className="text-sm text-slate-500">Try a different search term</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card
                key={job.id}
                hover
                className="p-6 border border-slate-200 bg-white shadow-xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left: Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        🌍 100% Remote
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 capitalize">
                        {job.job_type}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        📍 HQ: {job.country}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {job.title}
                    </h3>
                    <div className="text-sm font-semibold text-slate-600 mb-2">
                      {job.company_name}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3.5 max-w-2xl leading-relaxed">
                      {job.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5">
                      {job.required_skills.map((skill) => {
                        const matched = job.matched_skills?.some(
                          (s) => s.toLowerCase() === skill.toLowerCase()
                        );
                        return (
                          <span
                            key={skill}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                              matched
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-2xs'
                                : 'bg-slate-50 text-slate-600 border-slate-200'
                            }`}
                          >
                            {matched ? '✓ ' : ''}{skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Match & Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                    {job.match_score > 0 && (
                      <div className={`text-center px-4 py-1.5 rounded-xl border ${
                        job.match_score >= 70
                          ? 'bg-emerald-50 border-emerald-200'
                          : job.match_score >= 40
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-slate-100 border-slate-200'
                      }`}>
                        <div className={`text-lg font-extrabold ${
                          job.match_score >= 70 ? 'text-emerald-800' :
                          job.match_score >= 40 ? 'text-blue-800' : 'text-slate-700'
                        }`}>
                          {job.match_score}%
                        </div>
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Match</div>
                      </div>
                    )}

                    <div className="text-sm font-extrabold text-slate-900">
                      ${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()}
                      <span className="text-xs font-normal text-slate-500"> / year</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const text = `Global Remote opportunity: ${job.title} at ${job.company_name}! Check out the details:`;
                          const shareUrl = job.apply_url || window.location.href;
                          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(text)}`, '_blank');
                        }}
                        className="p-2 rounded-xl hover:bg-blue-50 text-[#0077b5] transition-colors border border-transparent hover:border-blue-100 cursor-pointer"
                        title="Share remote job on LinkedIn"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </button>
                      {job.linkedin_url && (
                        <a
                          href={job.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-slate-500 hover:text-[#0077b5] hover:underline no-underline"
                          title="View on LinkedIn"
                        >
                          LinkedIn ↗
                        </a>
                      )}
                      <a
                        href={job.apply_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl gradient-bg text-white text-xs font-bold hover:opacity-90 transition-all no-underline shadow-2xs"
                      >
                        Apply Now ↗
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
