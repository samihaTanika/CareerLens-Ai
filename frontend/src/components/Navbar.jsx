import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const studentLinks = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Upload CV' },
  { to: '/dashboard', label: 'Career Matches' },
  { to: '/jobs', label: 'Job Search' },
  { to: '/jobs/remote', label: 'Remote' },
  { to: '/scholarships', label: 'Scholarships' },
];

const companyLinks = [
  { to: '/', label: 'Home' },
  { to: '/company/dashboard', label: 'Dashboard' },
  { to: '/company/jobs/new', label: 'Post Job' },
  { to: '/jobs', label: 'Browse Jobs' },
];

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Upload CV' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/scholarships', label: 'Scholarships' },
];

export default function Navbar() {
  const { user, isAuthenticated, isCompany, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = isAuthenticated
    ? isCompany
      ? companyLinks
      : studentLinks
    : publicLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/90 bg-white/90 backdrop-blur-md shadow-2xs">
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline" id="nav-logo">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center shadow-xs shadow-indigo-500/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <span className="text-base font-bold text-slate-900 tracking-tight">
              CareerLens <span className="gradient-text font-extrabold">AI</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 no-underline ${
                    isActive
                      ? 'text-[var(--color-accent-primary)] bg-indigo-50/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`
                }
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth / CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            {isAuthenticated ? (
              <>
                {/* Profile / Dashboard Link */}
                <Link
                  to={isCompany ? '/company/dashboard' : '/profile'}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors no-underline border border-slate-200/60"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-[var(--color-accent-primary)]">
                    {isCompany
                      ? (user?.profile?.company_name?.charAt(0) || 'C')
                      : (user?.profile?.full_name?.charAt(0) || 'U')}
                  </div>
                  <span className="max-w-[120px] truncate font-semibold">
                    {isCompany ? user?.profile?.company_name : user?.profile?.full_name}
                  </span>
                </Link>

                {/* LinkedIn Profile Link (students only) */}
                {!isCompany && user?.profile?.linkedin_url && (
                  <a
                    href={user.profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-[#0077b5] hover:bg-[#0077b5]/10 transition-colors border border-transparent hover:border-[#0077b5]/20"
                    title="View LinkedIn Profile"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}

                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors no-underline"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-white text-sm font-semibold no-underline transition-all duration-200 hover:opacity-95 hover:shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            id="nav-mobile-toggle"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-[var(--color-accent-primary)] bg-indigo-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-slate-100 mt-3 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={isCompany ? '/company/dashboard' : '/profile'}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {isCompany ? '🏢 ' : '👤 '}
                  {isCompany ? user?.profile?.company_name : user?.profile?.full_name}
                </Link>
                <button
                  type="button"
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="block w-full text-left px-3.5 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-2.5 px-4 rounded-xl gradient-bg text-white text-sm font-semibold shadow-xs"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
