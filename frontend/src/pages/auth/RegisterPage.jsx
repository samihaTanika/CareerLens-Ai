import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';

export default function RegisterPage() {
  const { register, loginWithLinkedIn } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const user = await register({ email, password, role, name, companyName });
      navigate(user.role === 'company' ? '/company/dashboard' : '/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedIn = async () => {
    try {
      await loginWithLinkedIn();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="page-container max-w-md w-full mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-sm shadow-indigo-500/20">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-slate-500">
            Join CareerLens AI to discover careers or hire top talent in Bangladesh
          </p>
        </div>

        <Card className="p-8 border border-slate-200 bg-white shadow-sm animate-fade-in-up">
          {/* Role Selector */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              I want to register as:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${
                  role === 'student'
                    ? 'border-[var(--color-accent-primary)] bg-indigo-50/70 text-[var(--color-accent-primary)] shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-2xl mb-1">👨‍🎓</div>
                <div className="text-sm font-bold">Student</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Find jobs & scholarships</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('company')}
                className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${
                  role === 'company'
                    ? 'border-[var(--color-accent-primary)] bg-indigo-50/70 text-[var(--color-accent-primary)] shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-2xl mb-1">🏢</div>
                <div className="text-sm font-bold">Employer</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Post jobs & hire talent</div>
              </button>
            </div>
          </div>

          {/* LinkedIn Register (Student only) */}
          {role === 'student' && (
            <>
              <button
                type="button"
                onClick={handleLinkedIn}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#0077b5] text-white font-bold text-sm hover:bg-[#006097] transition-all mb-5 shadow-2xs cursor-pointer border-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Sign up with LinkedIn
              </button>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">or with email</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {role === 'student' ? (
              <div>
                <label htmlFor="register-name" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Richard Williams"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="register-company" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Company Name
                </label>
                <input
                  id="register-company"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Brain Station 23"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
                />
              </div>
            )}

            <div>
              <label htmlFor="register-email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="register-password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="register-confirm" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <input
                id="register-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
              />
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-95 transition-all disabled:opacity-50 shadow-2xs cursor-pointer border-0"
            >
              {loading ? 'Creating Account...' : `Register as ${role === 'company' ? 'Employer' : 'Student'}`}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--color-accent-primary)] font-bold hover:underline no-underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
