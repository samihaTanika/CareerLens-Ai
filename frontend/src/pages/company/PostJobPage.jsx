import { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship'];
const LOCATION_TYPES = ['onsite', 'remote', 'hybrid'];
const EXP_LEVELS = ['entry', 'mid', 'senior', 'lead'];

export default function PostJobPage() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: '',
    department: '',
    job_type: 'full-time',
    location_type: 'onsite',
    location: 'Dhaka, Bangladesh',
    salary_min: '60000',
    salary_max: '120000',
    salary_currency: 'BDT',
    experience_level: 'mid',
    description: '',
    required_skills: '',
    preferred_skills: '',
    education_requirement: "Bachelor's in Computer Science or related",
    application_deadline: '2026-11-30',
    apply_method: 'platform',
    apply_url: '',
    linkedin_url: '',
  });

  const [error, setError] = useState('');

  const updateField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location) {
      setError('Please fill in all required fields (Job Title, Location, and Description)');
      return;
    }
    // Mock submission success
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-[var(--color-bg-primary)]">
        <Card className="p-10 max-w-lg text-center border border-emerald-200 bg-white shadow-md animate-scale-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-3xl border border-emerald-100">
            ✓
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            Job Opening Published!
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Your job posting for &quot;<strong className="text-slate-900">{form.title}</strong>&quot; is now active. Candidates in Bangladesh can view and apply for it immediately.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="secondary" size="md" to="/company/dashboard">
              ← Go to Dashboard
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setSubmitted(false);
                setForm({ ...form, title: '', description: '', required_skills: '' });
              }}
            >
              Post Another Vacancy
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[var(--color-bg-primary)]">
      <div className="page-container max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <Button variant="ghost" size="sm" to="/company/dashboard" className="mb-3 text-slate-600 hover:text-slate-900">
            ← Back to Dashboard
          </Button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            📝 Post a New Job Opening
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Specify the role criteria, compensation, and required competencies to match suitable applicants.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card className="p-6 sm:p-7 border border-slate-200 bg-white shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">Job Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Job Title <span className="text-rose-600">*</span>
                </label>
                <input
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g., Senior Full Stack Engineer"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Department</label>
                  <input
                    value={form.department}
                    onChange={(e) => updateField('department', e.target.value)}
                    placeholder="e.g., Software Engineering"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Job Type</label>
                  <select
                    value={form.job_type}
                    onChange={(e) => updateField('job_type', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:border-[var(--color-accent-primary)] transition-colors cursor-pointer"
                  >
                    {JOB_TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Work Mode</label>
                  <select
                    value={form.location_type}
                    onChange={(e) => updateField('location_type', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:border-[var(--color-accent-primary)] transition-colors cursor-pointer"
                  >
                    {LOCATION_TYPES.map((t) => <option key={t} value={t}>{t === 'onsite' ? 'On-site' : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Location <span className="text-rose-600">*</span>
                  </label>
                  <input
                    value={form.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="e.g., Gulshan, Dhaka, Bangladesh"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Experience Level</label>
                <select
                  value={form.experience_level}
                  onChange={(e) => updateField('experience_level', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:border-[var(--color-accent-primary)] transition-colors cursor-pointer"
                >
                  {EXP_LEVELS.map((e) => <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)} Level</option>)}
                </select>
              </div>
            </div>
          </Card>

          {/* Salary */}
          <Card className="p-6 sm:p-7 border border-slate-200 bg-white shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">💰 Compensation & Salary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Minimum</label>
                <input
                  type="number"
                  value={form.salary_min}
                  onChange={(e) => updateField('salary_min', e.target.value)}
                  placeholder="60000"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[var(--color-accent-primary)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Maximum</label>
                <input
                  type="number"
                  value={form.salary_max}
                  onChange={(e) => updateField('salary_max', e.target.value)}
                  placeholder="120000"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[var(--color-accent-primary)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Currency</label>
                <select
                  value={form.salary_currency}
                  onChange={(e) => updateField('salary_currency', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:border-[var(--color-accent-primary)] transition-colors cursor-pointer"
                >
                  <option value="BDT">BDT (৳ / month)</option>
                  <option value="USD">USD ($ / year)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Description & Skills */}
          <Card className="p-6 sm:p-7 border border-slate-200 bg-white shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">📄 Description & Required Skills</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Job Description <span className="text-rose-600">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={5}
                  placeholder="Outline the responsibilities, daily work, and project scope..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] transition-colors resize-y leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Required Competencies (comma-separated)
                </label>
                <input
                  value={form.required_skills}
                  onChange={(e) => updateField('required_skills', e.target.value)}
                  placeholder="e.g., React, Node.js, PostgreSQL, Docker"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Preferred / Nice-to-have Skills (comma-separated)
                </label>
                <input
                  value={form.preferred_skills}
                  onChange={(e) => updateField('preferred_skills', e.target.value)}
                  placeholder="e.g., TypeScript, AWS, Next.js, Redis"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Education Requirement</label>
                <input
                  value={form.education_requirement}
                  onChange={(e) => updateField('education_requirement', e.target.value)}
                  placeholder="e.g., Bachelor's in CSE, EEE or related STEM degree"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] transition-colors"
                />
              </div>
            </div>
          </Card>

          {/* Application */}
          <Card className="p-6 sm:p-7 border border-slate-200 bg-white shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">🔗 Application Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Application Deadline</label>
                <input
                  type="date"
                  value={form.application_deadline}
                  onChange={(e) => updateField('application_deadline', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[var(--color-accent-primary)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Company Career Portal URL (optional)</label>
                <input
                  value={form.apply_url}
                  onChange={(e) => updateField('apply_url', e.target.value)}
                  placeholder="https://yourcompany.com/careers/apply"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#0077b5" className="inline mr-1 align-text-bottom">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn Job Posting URL (optional)
                </label>
                <input
                  value={form.linkedin_url}
                  onChange={(e) => updateField('linkedin_url', e.target.value)}
                  placeholder="https://linkedin.com/jobs/view/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] transition-colors"
                />
              </div>
            </div>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="secondary" size="md" to="/company/dashboard">
              Cancel
            </Button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-95 transition-all shadow-xs cursor-pointer border-0"
            >
              Publish Job Opening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
