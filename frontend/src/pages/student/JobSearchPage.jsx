import { useState, useMemo } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { getMatchingJobs, mockJobs } from '../../data/mockJobs';

const JOB_TYPES = ['all', 'full-time', 'part-time', 'contract', 'internship'];
const EXP_LEVELS = ['all', 'entry', 'mid', 'senior', 'lead'];
const LOCATION_TYPES = ['all', 'onsite', 'remote', 'hybrid'];

export default function JobSearchPage() {
  const { user } = useAuth();
  const rawSkills = user?.profile?.skills;
  const userSkills = useMemo(() => rawSkills || [], [rawSkills]);

  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all'); // 'all' | 'government' | 'private' | 'remote'
  const [typeFilter, setTypeFilter] = useState('all');
  const [expFilter, setExpFilter] = useState('all');
  const [locFilter, setLocFilter] = useState('all');

  const counts = useMemo(() => {
    return {
      all: mockJobs.length,
      government: mockJobs.filter((j) => j.is_government).length,
      private: mockJobs.filter((j) => !j.is_government && j.location_type !== 'remote').length,
      remote: mockJobs.filter((j) => j.location_type === 'remote').length,
    };
  }, []);

  const jobs = useMemo(() => {
    const filters = { search };
    if (sectorFilter !== 'all') filters.sector = sectorFilter;
    if (typeFilter !== 'all') filters.type = typeFilter;
    if (expFilter !== 'all') filters.experience_level = expFilter;
    if (locFilter !== 'all') filters.location_type = locFilter;
    return getMatchingJobs(userSkills, filters);
  }, [userSkills, search, sectorFilter, typeFilter, expFilter, locFilter]);

  const formatSalary = (job) => {
    const symbol = job.salary_currency === 'USD' ? '$' : '৳';
    const min = job.salary_min?.toLocaleString();
    const max = job.salary_max?.toLocaleString();
    const period = job.salary_currency === 'USD' ? '/yr' : '/mo';
    return `${symbol}${min} - ${symbol}${max}${period}`;
  };

  const getLocationBadge = (type) => {
    const styles = {
      remote: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
      hybrid: 'bg-blue-50 text-blue-800 border-blue-200 font-semibold',
      onsite: 'bg-amber-50 text-amber-900 border-amber-200 font-semibold',
    };
    return styles[type] || styles.onsite;
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[var(--color-bg-primary)]">
      <div className="page-container max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[var(--color-accent-primary)] text-xs font-bold mb-1.5">
                <span>💼</span> Bangladesh Job Portal (Government & Private)
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Bangladesh & Remote Job Opportunities
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {jobs.length} verified positions available{userSkills.length > 0 ? ' • Ranked by your CV match score' : ''}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <Button variant="secondary" size="sm" to="/jobs/remote" className="text-xs sm:text-sm">
                🌍 Remote Worldwide
              </Button>
              <Button variant="secondary" size="sm" to="/scholarships" className="text-xs sm:text-sm">
                🎓 Higher Study Scholarships
              </Button>
            </div>
          </div>
        </div>

        {/* Sector Quick Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: `All Opportunities (${counts.all})` },
            { id: 'government', label: `🏛️ Government Jobs (${counts.government})`, highlight: true },
            { id: 'private', label: `💼 Private Corporate (${counts.private})` },
            { id: 'remote', label: `🌍 Remote Worldwide (${counts.remote})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSectorFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                sectorFilter === tab.id
                  ? 'bg-white text-[var(--color-accent-primary)] border-[var(--color-accent-primary)] ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-5 border border-slate-200 bg-white shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Search */}
            <div className="sm:col-span-2 lg:col-span-1">
              <input
                type="text"
                placeholder="Search by job title, company, or skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
              />
            </div>

            {/* Job Type */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:border-[var(--color-accent-primary)] transition-colors cursor-pointer"
            >
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All Job Types' : t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>

            {/* Experience */}
            <select
              value={expFilter}
              onChange={(e) => setExpFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:border-[var(--color-accent-primary)] transition-colors cursor-pointer"
            >
              {EXP_LEVELS.map((e) => (
                <option key={e} value={e}>
                  {e === 'all' ? 'All Experience Levels' : e.charAt(0).toUpperCase() + e.slice(1)}
                </option>
              ))}
            </select>

            {/* Location Type */}
            <select
              value={locFilter}
              onChange={(e) => setLocFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:border-[var(--color-accent-primary)] transition-colors cursor-pointer"
            >
              {LOCATION_TYPES.map((l) => (
                <option key={l} value={l}>
                  {l === 'all' ? 'All Work Modes' : l.charAt(0).toUpperCase() + l.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Job Listings */}
        {jobs.length === 0 ? (
          <Card className="p-14 text-center border border-slate-200 bg-white shadow-xs">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No jobs match your filters</h3>
            <p className="text-sm text-slate-500">Try adjusting your filters or search terms</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {jobs.map((job) => (
              <Card
                key={job.id}
                hover
                className={`p-6 border bg-white shadow-xs flex flex-col justify-between group ${
                  job.is_government ? 'border-emerald-200/90' : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 shadow-2xs ${
                        job.is_government
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : 'bg-indigo-50 border border-indigo-100 text-[var(--color-accent-primary)]'
                      }`}>
                        {job.is_government ? '🏛️' : job.company_name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900 line-clamp-1 group-hover:text-[var(--color-accent-primary)] transition-colors">
                          {job.title}
                        </h3>
                        <div className="text-xs text-slate-500 font-medium">
                          {job.company_name} • {job.location}
                        </div>
                      </div>
                    </div>
                    {job.match_score > 0 && (
                      <div className={`px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 border ${
                        job.match_score >= 70 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        job.match_score >= 40 ? 'bg-blue-50 text-blue-800 border-blue-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {job.match_score}% Match
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3.5">
                    {job.is_government && (
                      <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                        🏛️ Government
                      </span>
                    )}
                    {job.govt_grade && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {job.govt_grade}
                      </span>
                    )}
                    <span className={`px-2.5 py-0.5 rounded-lg text-[11px] border ${getLocationBadge(job.location_type)}`}>
                      {job.location_type === 'remote' ? '🌍 Remote' : job.location_type === 'hybrid' ? '🔀 Hybrid' : '📍 On-site'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 capitalize">
                      {job.job_type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 capitalize">
                      {job.experience_level}
                    </span>
                    <span className="text-xs font-bold text-slate-900 ml-auto">
                      💰 {formatSalary(job)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed font-normal">
                    {job.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.required_skills.slice(0, 5).map((skill) => {
                      const isMatched = job.matched_skills?.some((s) => s.toLowerCase() === skill.toLowerCase());
                      return (
                        <span
                          key={skill}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                            isMatched
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-2xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {isMatched ? '✓ ' : ''}{skill}
                        </span>
                      );
                    })}
                    {job.required_skills.length > 5 && (
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-50 text-slate-500 border border-slate-200">
                        +{job.required_skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 mt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <span>📅 Deadline: {new Date(job.application_deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Share on LinkedIn button */}
                    <button
                      type="button"
                      onClick={() => {
                        const text = `Exciting career opportunity: ${job.title} at ${job.company_name} in ${job.location}! Check details & apply:`;
                        const shareUrl = job.apply_url || window.location.href;
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(text)}`, '_blank');
                      }}
                      className="p-1.5 rounded-xl hover:bg-blue-50 text-[#0077b5] transition-colors border border-transparent hover:border-blue-100 cursor-pointer"
                      title="Share job opening on LinkedIn"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>

                    {job.linkedin_url && (
                      <a
                        href={job.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-slate-500 hover:text-[#0077b5] hover:underline no-underline"
                        title="View Company on LinkedIn"
                      >
                        Company ↗
                      </a>
                    )}

                    <a
                      href={job.apply_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-xl gradient-bg text-white text-xs font-bold hover:opacity-90 transition-all no-underline shadow-2xs"
                    >
                      Apply Now ↗
                    </a>
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
