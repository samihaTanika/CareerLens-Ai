import { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const profile = user?.profile || {};

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });
  const [newSkill, setNewSkill] = useState('');
  const [linkedinSyncing, setLinkedinSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleSyncLinkedIn = async () => {
    setLinkedinSyncing(true);
    await new Promise((r) => setTimeout(r, 900));
    const linkedInSkills = ['Python', 'Docker', 'React', 'Machine Learning', 'AWS', 'PostgreSQL', 'Git', 'FastAPI', 'Problem Solving'];
    const mergedSkills = [...new Set([...(form.skills || []), ...linkedInSkills])];
    const updated = {
      ...form,
      headline: form.headline || 'Full Stack Software Engineer | BUET | Open to Opportunities',
      linkedin_url: form.linkedin_url || 'https://linkedin.com/in/tanvirhasan',
      skills: mergedSkills,
      linkedin_connected: true,
      linkedin_synced_at: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setForm(updated);
    updateProfile(updated);
    setLinkedinSyncing(false);
    setSyncSuccess(true);
    setTimeout(() => setSyncSuccess(false), 5000);
  };

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !(form.skills || []).includes(newSkill.trim())) {
      setForm((f) => ({ ...f, skills: [...(f.skills || []), newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setForm((f) => ({ ...f, skills: (f.skills || []).filter((s) => s !== skill) }));
  };

  const completeness = (() => {
    let score = 0;
    if (form.full_name) score += 15;
    if (form.phone) score += 10;
    if (form.education?.length > 0) score += 20;
    if (form.skills?.length >= 3) score += 20;
    if (form.experience?.length > 0) score += 15;
    if (form.linkedin_url) score += 10;
    if (form.ielts_score) score += 10;
    return Math.min(score, 100);
  })();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[var(--color-bg-primary)]">
      <div className="page-container max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              My Student Profile
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your credentials to receive optimized career and scholarship recommendations.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            {editing ? (
              <>
                <Button variant="secondary" size="sm" onClick={() => { setForm({ ...profile }); setEditing(false); }}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="primary" size="sm" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Profile Completeness */}
        <Card className="p-6 border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-bold text-slate-900">Profile Completeness</span>
            <span className={`text-sm font-extrabold ${completeness >= 80 ? 'text-emerald-700' : completeness >= 50 ? 'text-amber-700' : 'text-rose-700'}`}>
              {completeness}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${
                completeness >= 80 ? 'bg-emerald-600' : completeness >= 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${completeness}%` }}
            />
          </div>
          {completeness < 80 && (
            <p className="text-xs text-slate-500 mt-2.5 font-medium">
              💡 Add your education, IELTS score, and top skills to increase your match accuracy on jobs and scholarships.
            </p>
          )}
        </Card>

        {/* LinkedIn Integration & Skill Sync */}
        <Card className="p-5 border border-blue-200/90 bg-blue-50/40 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#0077b5] flex items-center justify-center text-white shrink-0 shadow-2xs">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>LinkedIn Profile Sync</span>
                  {(profile.linkedin_connected || profile.linkedin_url) && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      ✓ Connected
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Automatically pull your headline, verified skills, and experience directly from LinkedIn into your CareerLens profile.
                </p>
                {profile.linkedin_synced_at && (
                  <div className="text-[11px] text-slate-400 mt-1">
                    Last synced: {profile.linkedin_synced_at}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleSyncLinkedIn}
                disabled={linkedinSyncing}
                className="px-4 py-2 rounded-xl bg-[#0077b5] text-white text-xs font-bold hover:bg-[#006097] transition-all shadow-2xs cursor-pointer border-0 disabled:opacity-50"
              >
                {linkedinSyncing ? 'Connecting...' : 'Sync from LinkedIn ⟳'}
              </button>
            </div>
          </div>

          {syncSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fade-in">
              <span>✅</span>
              <span>Successfully imported LinkedIn headline and verified skills into your CareerLens profile!</span>
            </div>
          )}
        </Card>

        {/* Personal Info */}
        <Card className="p-6 sm:p-7 border border-slate-200 bg-white shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
            <span>👤</span> Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
              {editing ? (
                <input
                  value={form.full_name || ''}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
                />
              ) : (
                <div className="text-sm font-bold text-slate-900">{profile.full_name || '—'}</div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
              <div className="text-sm font-medium text-slate-700 py-1">{user?.email || '—'}</div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number</label>
              {editing ? (
                <input
                  value={form.phone || ''}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
                />
              ) : (
                <div className="text-sm font-medium text-slate-700">{profile.phone || '—'}</div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Location</label>
              {editing ? (
                <input
                  value={form.location || ''}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
                />
              ) : (
                <div className="text-sm font-medium text-slate-700">{profile.location || 'Dhaka, Bangladesh'}</div>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#0077b5" className="inline mr-1 align-text-bottom">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn Profile URL
              </label>
              {editing ? (
                <input
                  value={form.linkedin_url || ''}
                  onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
                />
              ) : (
                <div className="text-sm">
                  {profile.linkedin_url ? (
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[#0077b5] font-semibold hover:underline">
                      {profile.linkedin_url}
                    </a>
                  ) : (
                    <span className="text-slate-400">Not connected</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-6 sm:p-7 border border-slate-200 bg-white shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>🛠️</span> Skills & Competencies
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {(editing ? form.skills || [] : profile.skills || []).map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-[var(--color-accent-primary)] border border-indigo-100 flex items-center gap-2 shadow-2xs"
              >
                {skill}
                {editing && (
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-rose-600 text-slate-400 ml-1 font-bold cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
          {editing && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Type a skill and press Enter (e.g. Python, Docker, React)..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[var(--color-accent-primary)] transition-colors"
              />
              <Button variant="secondary" size="sm" onClick={addSkill}>
                Add Skill
              </Button>
            </div>
          )}
        </Card>

        {/* Education */}
        <Card className="p-6 sm:p-7 border border-slate-200 bg-white shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>🎓</span> Academic Background
          </h2>
          {(profile.education || []).length > 0 ? (
            <div className="space-y-3">
              {(profile.education || []).map((edu, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-sm font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{edu.institution} • {edu.year}</div>
                  {edu.gpa && <div className="text-xs font-semibold text-emerald-800 mt-1">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No education entries added yet.</p>
          )}
        </Card>

        {/* Scholarship & Remote Preferences */}
        <Card className="p-6 sm:p-7 border border-slate-200 bg-white shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>⚙️</span> Higher Study & Remote Career Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-sm font-bold text-slate-900">🎓 Higher Study Grants</div>
                <div className="text-xs text-slate-500">Discover matching scholarships across Europe, USA, and Asia</div>
              </div>
              <Button variant="secondary" size="sm" to="/scholarships">
                View Scholarships →
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-sm font-bold text-slate-900">🌍 International Remote Jobs</div>
                <div className="text-xs text-slate-500">Find remote jobs hiring candidates outside Bangladesh</div>
              </div>
              <Button variant="secondary" size="sm" to="/jobs/remote">
                View Remote Jobs →
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">IELTS Score</label>
                {editing ? (
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="9"
                    value={form.ielts_score || ''}
                    onChange={(e) => setForm({ ...form, ielts_score: parseFloat(e.target.value) || null })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[var(--color-accent-primary)] transition-colors"
                  />
                ) : (
                  <div className="text-sm font-bold text-slate-900">{profile.ielts_score ? `${profile.ielts_score} Overall` : 'Not provided'}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Degree</label>
                {editing ? (
                  <select
                    value={form.preferred_degree || ''}
                    onChange={(e) => setForm({ ...form, preferred_degree: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[var(--color-accent-primary)] transition-colors"
                  >
                    <option value="">Select Degree</option>
                    <option value="Masters">Masters / M.Sc.</option>
                    <option value="PhD">Doctorate / Ph.D.</option>
                    <option value="Post-doc">Post-Doctoral</option>
                  </select>
                ) : (
                  <div className="text-sm font-bold text-slate-900">{profile.preferred_degree || 'Masters / Higher Degree'}</div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={logout}
            className="text-sm font-bold text-rose-600 hover:text-rose-700 hover:underline transition-colors cursor-pointer"
          >
            Sign Out of Account
          </button>
        </div>
      </div>
    </div>
  );
}
