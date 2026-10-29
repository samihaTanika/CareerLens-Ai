import { Link } from 'react-router-dom';
import CareerLensLogo from './CareerLensLogo';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="page-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 no-underline group">
              <CareerLensLogo className="w-8 h-8 transition-transform duration-200 group-hover:scale-105 drop-shadow-xs" />
              <span className="text-base font-bold text-slate-900 tracking-tight">
                CareerLens <span className="gradient-text font-extrabold">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              AI-powered career platform for Bangladesh. Resume analysis, job matching, scholarships, and employer discovery.
            </p>
            {/* Social / LinkedIn */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-blue-50 text-[#0077b5] hover:bg-blue-100 transition-colors border border-blue-100"
                title="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors border border-slate-200"
                title="GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* For Students */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 tracking-tight">For Students</h4>
            <ul className="space-y-3 list-none">
              {[
                { to: '/analyze', label: 'Upload CV' },
                { to: '/dashboard', label: 'Career Dashboard' },
                { to: '/jobs', label: 'Job Search' },
                { to: '/jobs/remote', label: 'Remote Jobs' },
                { to: '/scholarships', label: 'Scholarships' },
                { to: '/history', label: 'Analysis History' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-500 hover:text-[var(--color-accent-primary)] transition-colors no-underline font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Companies */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 tracking-tight">For Companies</h4>
            <ul className="space-y-3 list-none">
              {[
                { to: '/company/dashboard', label: 'Company Dashboard' },
                { to: '/company/jobs/new', label: 'Post a Job' },
                { to: '/register', label: 'Register Company' },
                { to: '/jobs', label: 'View All Jobs' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-500 hover:text-[var(--color-accent-primary)] transition-colors no-underline font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 tracking-tight">System Info</h4>
            <ul className="space-y-2.5 list-none">
              <li className="text-sm text-slate-500">React 19 + Tailwind CSS</li>
              <li className="text-sm text-slate-500">FastAPI & Python NLP Core</li>
              <li className="text-sm text-slate-500">MongoDB Database Ready</li>
              <li className="text-sm text-slate-500">LinkedIn OAuth Integrated</li>
              <li className="text-sm text-slate-500">80+ BD Industry Taxonomy (Govt & Private)</li>
              <li className="text-sm text-slate-500">2,500+ Skills NLP Taxonomy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} CareerLens AI. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Designed for University Project & Deployable Cloud Ready
          </p>
        </div>
      </div>
    </footer>
  );
}
