import Card from '../../components/Card';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { mockJobs } from '../../data/mockJobs';

export default function CompanyDashboard() {
  const { user, logout } = useAuth();
  const profile = user?.profile || {};

  // Simulate company's own jobs
  const companyJobs = mockJobs.filter((j) => j.company_id === 'comp-001').concat([
    {
      id: 'my-job-001',
      title: 'Junior Frontend Developer',
      job_type: 'full-time',
      location_type: 'onsite',
      location: 'Dhaka, Bangladesh',
      status: 'active',
      posted_at: '2026-09-28',
      application_deadline: '2026-11-01',
      views_count: 145,
      applications_count: 23,
    },
    {
      id: 'my-job-002',
      title: 'QA Automation Engineer',
      job_type: 'full-time',
      location_type: 'hybrid',
      location: 'Dhaka, Bangladesh',
      status: 'closed',
      posted_at: '2026-08-15',
      application_deadline: '2026-09-15',
      views_count: 289,
      applications_count: 67,
    },
  ]);

  const activeJobs = companyJobs.filter((j) => j.status === 'active');
  const closedJobs = companyJobs.filter((j) => j.status === 'closed');
  const totalViews = companyJobs.reduce((s, j) => s + (j.views_count || 0), 0);
  const totalApps = companyJobs.reduce((s, j) => s + (j.applications_count || 0), 0);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[var(--color-bg-primary)]">
      <div className="page-container max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[var(--color-accent-primary)] text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-pulse" />
              Verified Employer Portal
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {profile.company_name || 'Brain Station 23'} Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your published vacancies, review applicants, and track recruitment reach across Bangladesh.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Button variant="primary" size="sm" to="/company/jobs/new">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Post New Job
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
          <Card className="p-6 border border-slate-200 bg-white shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Active Jobs</div>
            <div className="text-3xl font-extrabold text-indigo-700">{activeJobs.length}</div>
          </Card>
          <Card className="p-6 border border-slate-200 bg-white shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Total Impressions</div>
            <div className="text-3xl font-extrabold text-slate-900">{totalViews}</div>
          </Card>
          <Card className="p-6 border border-slate-200 bg-white shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Applications Received</div>
            <div className="text-3xl font-extrabold text-emerald-700">{totalApps}</div>
          </Card>
          <Card className="p-6 border border-slate-200 bg-white shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Archived Postings</div>
            <div className="text-3xl font-extrabold text-slate-400">{closedJobs.length}</div>
          </Card>
        </div>

        {/* Company Profile Summary */}
        <Card className="p-6 sm:p-7 border border-slate-200 bg-white shadow-xs">
          <div className="flex items-start justify-between gap-4 mb-4 border-b border-slate-100 pb-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>🏢</span> Employer Profile
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Verified Enterprise
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Industry</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{profile.industry || 'Software & Information Technology'}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company Size</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5 capitalize">{profile.company_size || '250-500 Employees'}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Headquarters</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{profile.location || 'Dhaka, Bangladesh'}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Website</div>
              {profile.website ? (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--color-accent-primary)] hover:underline block mt-0.5">{profile.website}</a>
              ) : <div className="text-sm font-semibold text-[var(--color-accent-primary)] mt-0.5">https://brainstation-23.com</div>}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">LinkedIn Presence</div>
              <a href="https://linkedin.com/company/brainstation-23" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#0077b5] hover:underline flex items-center gap-1.5 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                Company Page ↗
              </a>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Established</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{profile.founded_year || '2006'}</div>
            </div>
          </div>
        </Card>

        {/* Job Listings Table */}
        <Card className="border border-slate-200 bg-white shadow-xs overflow-hidden !p-0">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">📋 Published Job Openings</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage statuses and monitor application metrics</p>
            </div>
            <Button variant="primary" size="sm" to="/company/jobs/new">
              + Post Job
            </Button>
          </div>

          {companyJobs.length === 0 ? (
            <div className="p-14 text-center">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No jobs posted yet</h3>
              <p className="text-sm text-slate-500 mb-4">Start by posting your first job opening to reach matched candidates</p>
              <Button variant="primary" size="sm" to="/company/jobs/new">Post Your First Job</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">Job Title</th>
                    <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">Type & Mode</th>
                    <th className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">Views</th>
                    <th className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">Applications</th>
                    <th className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {companyJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-slate-900">{job.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{job.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {job.job_type} • {job.location_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-slate-700">{job.views_count || 0}</td>
                      <td className="px-6 py-4 text-center text-sm font-bold text-indigo-700">{job.applications_count || 0}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          job.status === 'active' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          job.status === 'draft' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-xs text-slate-500 font-medium">
                        {job.application_deadline ? new Date(job.application_deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Logout */}
        <div className="text-center pt-2">
          <button type="button" onClick={logout} className="text-sm font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer">
            Sign Out of Company Portal
          </button>
        </div>
      </div>
    </div>
  );
}
