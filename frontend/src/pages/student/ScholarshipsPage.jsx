import { useState, useMemo } from 'react';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { getMatchingScholarships, getScholarshipCountries, getScholarshipDegreeLevels } from '../../data/mockScholarships';

export default function ScholarshipsPage() {
  const { user } = useAuth();
  const rawProfile = user?.profile;
  
  const analysisProfile = useMemo(() => {
    try {
      const stored = localStorage.getItem('careerlens_latest_analysis');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          education: [{ gpa: 3.6 }],
          gpa: 3.6,
          experience_years: parsed.cv_summary?.experience_years || 2,
          skills: parsed.cv_summary?.extracted_skills || [],
          name: parsed.cv_summary?.name,
        };
      }
    } catch {
      // ignore
    }
    return null;
  }, []);

  const profile = useMemo(() => rawProfile || analysisProfile || {}, [rawProfile, analysisProfile]);

  const [enabled, setEnabled] = useState(profile.scholarship_search_enabled ?? true);
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('');

  const countries = getScholarshipCountries();
  const degreeLevels = getScholarshipDegreeLevels();

  const scholarships = useMemo(() => {
    if (!enabled) return [];
    return getMatchingScholarships(profile, {
      search,
      country: countryFilter || undefined,
      degree_level: degreeFilter || undefined,
    });
  }, [enabled, profile, search, countryFilter, degreeFilter]);

  const getFundingBadge = (type) => {
    if (type === 'full') return { label: 'Fully Funded', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
    if (type === 'partial') return { label: 'Partially Funded', cls: 'bg-amber-50 text-amber-800 border-amber-200' };
    return { label: type, cls: 'bg-slate-100 text-slate-700 border-slate-200' };
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[var(--color-bg-primary)]">
      <div className="page-container max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            🎓 Higher Study Scholarships Abroad
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Find fully-funded Masters, PhD, and Fellowship opportunities matched to your academic achievements, IELTS score, and research profile.
          </p>
        </div>

        {/* Toggle Card */}
        <Card className="p-6 border border-indigo-200 bg-indigo-50/40 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
                <span>🎓</span> Global Scholarship Matching
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  enabled ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {enabled ? 'ACTIVATED' : 'PAUSED'}
                </span>
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {enabled
                  ? 'Active: Matching international study grants to your GPA, experience, and degree background.'
                  : 'Turn on this toggle to inspect available scholarships for higher degrees outside Bangladesh.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 shrink-0 cursor-pointer ${
                enabled ? 'bg-[var(--color-accent-primary)]' : 'bg-slate-300'
              }`}
              aria-label="Toggle scholarship matching"
            >
              <div
                className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300"
                style={{ left: enabled ? '1.875rem' : '0.125rem' }}
              />
            </button>
          </div>
        </Card>

        {!enabled ? (
          /* Disabled State */
          <Card className="p-14 text-center border border-slate-200 bg-white shadow-xs">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Scholarship Matching is Paused
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
              Enable the matching switch above to explore verified scholarships across Europe, North America, Australia, and Asia.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 text-xs text-slate-600 font-semibold">
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200">🇬🇧 United Kingdom</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200">🇺🇸 United States</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200">🇩🇪 Germany DAAD</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200">🇦🇺 Australia Awards</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200">🇯🇵 MEXT Japan</span>
            </div>
          </Card>
        ) : (
          <>
            {/* Filters */}
            <Card className="p-5 border border-slate-200 bg-white shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <input
                  type="text"
                  placeholder="Search by scholarship, university, or subject..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
                />
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:border-[var(--color-accent-primary)] transition-colors cursor-pointer"
                >
                  <option value="">All Destination Countries</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select
                  value={degreeFilter}
                  onChange={(e) => setDegreeFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:border-[var(--color-accent-primary)] transition-colors cursor-pointer"
                >
                  <option value="">All Degree Levels (Masters / PhD)</option>
                  {degreeLevels.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </Card>

            {/* Results count */}
            <p className="text-sm text-slate-500 font-medium">
              {scholarships.length} scholarship program{scholarships.length !== 1 ? 's' : ''} available
              {user ? ' • Ranked by your academic & CV profile fit' : ''}
            </p>

            {/* Scholarship Cards */}
            <div className="space-y-4">
              {scholarships.map((sch) => {
                const funding = getFundingBadge(sch.funding_type);
                const daysUntilDeadline = Math.ceil(
                  (new Date(sch.application_deadline) - new Date()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <Card
                    key={sch.id}
                    hover
                    className="p-6 border border-slate-200 bg-white shadow-xs"
                  >
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                      {/* Left: Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${funding.cls}`}>
                            {funding.label}
                          </span>
                          {sch.degree_level.map((d) => (
                            <span key={d} className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-indigo-50 text-[var(--color-accent-primary)] border border-indigo-100">
                              {d}
                            </span>
                          ))}
                          {daysUntilDeadline > 0 && daysUntilDeadline <= 30 && (
                            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              ⏰ {daysUntilDeadline} days left
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2.5 flex-wrap">
                          <span>{sch.name}</span>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {sch.country}
                          </span>
                        </h3>
                        <div className="text-sm font-semibold text-slate-500 mb-2">
                          {sch.university}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-3.5 max-w-2xl leading-relaxed">
                          {sch.description}
                        </p>

                        {/* Benefits */}
                        <div className="flex flex-wrap gap-1.5 mb-3.5">
                          {sch.benefits.slice(0, 4).map((b) => (
                            <span
                              key={b}
                              className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-200"
                            >
                              ✓ {b}
                            </span>
                          ))}
                          {sch.benefits.length > 4 && (
                            <span className="text-[11px] text-slate-400 px-1 font-semibold">
                              +{sch.benefits.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Eligibility Quick View */}
                        <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium">
                          {sch.eligibility.min_gpa > 0 && (
                            <span>📊 Min GPA: <strong className="text-slate-700">{sch.eligibility.min_gpa}</strong></span>
                          )}
                          {sch.eligibility.work_experience_years > 0 && (
                            <span>💼 <strong className="text-slate-700">{sch.eligibility.work_experience_years}+ yrs</strong> experience</span>
                          )}
                          {sch.eligibility.language_requirements.ielts_min > 0 && (
                            <span>📝 IELTS ≥ <strong className="text-slate-700">{sch.eligibility.language_requirements.ielts_min}</strong></span>
                          )}
                          <span>📅 Deadline: {new Date(sch.application_deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>

                      {/* Right: Match Score & Actions */}
                      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                        {sch.match_score > 0 && (
                          <div className={`text-center px-4 py-2 rounded-xl border ${
                            sch.match_score >= 80
                              ? 'bg-emerald-50 border-emerald-200'
                              : sch.match_score >= 60
                              ? 'bg-blue-50 border-blue-200'
                              : 'bg-amber-50 border-amber-200'
                          }`}>
                            <div className={`text-xl font-extrabold ${
                              sch.match_score >= 80 ? 'text-emerald-800' :
                              sch.match_score >= 60 ? 'text-blue-800' : 'text-amber-800'
                            }`}>
                              {sch.match_score}%
                            </div>
                            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Profile Match</div>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <a
                            href={sch.application_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl gradient-bg text-white text-xs font-bold hover:opacity-90 transition-all no-underline shadow-2xs"
                          >
                            Apply Directly ↗
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              const text = `Check out the ${sch.name} scholarship for studying in ${sch.country}! ${sch.application_url}`;
                              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sch.application_url)}&summary=${encodeURIComponent(text)}`, '_blank');
                            }}
                            className="p-2 rounded-xl hover:bg-blue-50 text-[#0077b5] transition-colors border border-transparent hover:border-blue-100 cursor-pointer"
                            title="Share on LinkedIn"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
