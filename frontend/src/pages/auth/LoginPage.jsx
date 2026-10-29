import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import CareerLensLogo from '../../components/CareerLensLogo';

export default function LoginPage() {
  const { login, loginWithLinkedIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkedinLoading, setLinkedinLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      navigate(user.role === 'company' ? '/company/dashboard' : '/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedIn = async () => {
    setLinkedinLoading(true);
    setError('');
    try {
      await loginWithLinkedIn();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLinkedinLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="page-container max-w-md w-full mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <CareerLensLogo className="w-14 h-14 mx-auto mb-4 drop-shadow-md" />
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500">
            Sign in to access your CareerLens AI dashboard
          </p>
        </div>

        <Card className="p-8 border border-slate-200 bg-white shadow-sm animate-fade-in-up">
          {/* LinkedIn Login */}
          <button
            type="button"
            onClick={handleLinkedIn}
            disabled={linkedinLoading || loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#0077b5] text-white font-bold text-sm hover:bg-[#006097] transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6 shadow-2xs cursor-pointer border-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            {linkedinLoading ? 'Connecting with LinkedIn...' : 'Continue with LinkedIn'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">or email sign in</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-colors"
              />
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || linkedinLoading}
              className="w-full py-3 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs cursor-pointer border-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <span>⚡</span> 1-Click Demo Accounts:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => { setEmail('student@test.com'); setPassword('test123'); }}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors text-left cursor-pointer"
              >
                <div className="font-bold">👨‍🎓 Student Demo</div>
                <div className="text-[10px] text-slate-400 truncate">student@test.com</div>
              </button>
              <button
                type="button"
                onClick={() => { setEmail('company@test.com'); setPassword('test123'); }}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors text-left cursor-pointer"
              >
                <div className="font-bold">🏢 Company Demo</div>
                <div className="text-[10px] text-slate-400 truncate">company@test.com</div>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-[var(--color-accent-primary)] font-bold hover:underline no-underline">
              Create Free Account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
