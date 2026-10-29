import Button from '../components/Button';
import Card from '../components/Card';

const features = [
  {
    icon: '🏛️',
    title: 'Full Bangladeshi Coverage (Govt & Private)',
    description: 'Maps your profile against 80+ sectors across Bangladesh Civil Service (BCS), Bangladesh Bank, Combined Banks, IT, RMG, FMCG, Pharma, and NGOs.',
  },
  {
    icon: '🎯',
    title: 'Top 20 Ranked Career Matching',
    description: 'Instant overview of your top 5 best matches, with 1-click expansion to explore your complete Top 20 ranked sectors with explainable scores.',
  },
  {
    icon: '🔍',
    title: '2,500+ Skills NLP Taxonomy',
    description: 'Trained on 56 distinct domains covering Bangladesh-specific competencies (BNBC, cGMP, PPR, TallyPrime, BSTI) plus modern tech stacks.',
  },
  {
    icon: '🤖',
    title: 'AI Career Assistant & Chatbot',
    description: 'Floating interactive career mentor that analyzes your CV context, recommends roadmaps, explains exam eligibility, and solves queries.',
  },
  {
    icon: '🎓',
    title: '22+ Verified Global Scholarships',
    description: 'Comprehensive directory of fully-funded Masters & PhD scholarships (Chevening, Fulbright, DAAD, Commonwealth, MEXT) for Bangladeshi students.',
  },
  {
    icon: '🔗',
    title: 'Verified Portals & Direct Links',
    description: 'Accurate direct search links for BDJobs, Teletalk AllJobs (bpsc.teletalk.com.bd, bb.org.bd), and LinkedIn Bangladesh without broken URLs.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Upload Your Resume',
    desc: 'Simply drag and drop your CV in PDF format. Our NLP engine instantly extracts your skills, education credentials, and work history.',
  },
  {
    num: '02',
    title: 'Comprehensive Taxonomy Matching',
    desc: 'Our algorithms match your capabilities across 80+ Bangladesh career sectors and 2,500+ skills, generating ATS readiness scores.',
  },
  {
    num: '03',
    title: 'Explore Roadmap & Direct Apply',
    desc: 'Examine your Top 20 ranked sectors, personalized skill gap roadmaps, live verified circulars, and apply on BDJobs or Teletalk AllJobs.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero Section */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 relative overflow-hidden">
        {/* Soft Ambient Gradient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[460px] bg-gradient-to-b from-indigo-100/60 via-emerald-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="page-container text-center relative z-10">
          {/* Market Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-indigo-100 shadow-2xs text-xs font-semibold text-[var(--color-accent-primary)] mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Complete Bangladesh Job Coverage • 80+ Sectors • Government & Private
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-[1.15] animate-fade-in">
            Smart Career Intelligence for <br />
            <span className="gradient-text">Bangladeshi Students & Graduates</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in font-normal">
            Upload your CV to discover your <strong>Top 20 matched careers</strong> across Bangladesh (Civil Service, Banking, Tech, RMG, FMCG, Pharma), identify your skill gaps, and explore fully-funded study abroad scholarships.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 animate-fade-in">
            <Button size="lg" to="/analyze" className="w-full sm:w-auto shadow-md shadow-indigo-500/15">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload CV & Discover Matches
            </Button>
            <Button variant="secondary" size="lg" to="/dashboard" className="w-full sm:w-auto">
              <span>⚡ View Interactive Demo</span>
            </Button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto text-center">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-indigo-300 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">80+</div>
              <div className="text-xs text-slate-500 font-medium mt-1">BD Job Sectors</div>
              <div className="text-[11px] text-indigo-600 font-semibold mt-0.5">Govt & Private</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-indigo-300 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">2,500+</div>
              <div className="text-xs text-slate-500 font-medium mt-1">NLP Skills Taxonomy</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">56 Industry Domains</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-indigo-300 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">Top 20</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Career Matches</div>
              <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Ranked with Roadmaps</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-indigo-300 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700">22+</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Global Scholarships</div>
              <div className="text-[11px] text-indigo-600 font-semibold mt-0.5">100% Fully Funded</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50/70 border-y border-slate-200/80">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-primary)] mb-2 block">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              How CareerLens AI Works for Students
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Transform your raw CV into realistic Bangladeshi career rankings, skills gap checklists, and application roadmaps in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((st) => (
              <Card
                key={st.num}
                className="p-8 relative group hover:border-[var(--color-accent-primary)]/40 hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl font-extrabold text-indigo-200 mb-4 group-hover:text-[var(--color-accent-primary)] transition-colors">
                  {st.num}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{st.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">{st.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Features Grid */}
      <section className="py-20">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-primary)] mb-2 block">
              Practical & Actionable Tools
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Designed for the Real Bangladesh Job Market
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              No generic advice. Get real BDT salary ranges, authentic 9th-16th grade government pay scales, genuine circulars, and verified scholarship criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <Card
                key={feat.title}
                hover
                className="p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl mb-4 shadow-2xs">
                    {feat.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Pathways (Government Circulars, Scholarships, Global Remote) */}
      <section className="py-16 bg-slate-50/70 border-t border-slate-200/80">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 block">
              Exploration Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Explore Available Opportunities
            </h2>
            <p className="text-sm text-slate-600">
              Direct pathways tailored to every student ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Government Circulars Highlight */}
            <Card className="p-7 border border-emerald-200/80 bg-white hover:shadow-md transition-all">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-4">
                🏛️ Bangladesh Public Sector
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Government Circulars & Cadres</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                47th BCS, Bangladesh Bank AD, Combined 10 Banks, DoICT, PGCB, Railways & primary teacher recruitment with official Teletalk portals.
              </p>
              <Button variant="secondary" size="sm" to="/jobs" className="w-full">
                Browse Government & Private Jobs →
              </Button>
            </Card>

            {/* Scholarships Highlight */}
            <Card className="p-7 border border-blue-200/80 bg-white hover:shadow-md transition-all">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4">
                🎓 Study Abroad (22+ Programs)
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Fully-Funded Scholarships</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Chevening (UK), Fulbright (USA), DAAD (Germany), Commonwealth, MEXT (Japan), Australia Awards, and Sweden SISGP with eligibility criteria.
              </p>
              <Button variant="secondary" size="sm" to="/scholarships" className="w-full">
                Explore Scholarships →
              </Button>
            </Card>

            {/* Remote Jobs Highlight */}
            <Card className="p-7 border border-indigo-200/80 bg-white hover:shadow-md transition-all">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-4">
                🌍 Global Remote Work
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Work from Bangladesh</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Verified international remote positions paying in USD / EUR with flexible hours for engineering, design, and growth roles.
              </p>
              <Button variant="secondary" size="sm" to="/jobs/remote" className="w-full">
                Browse Global Remote Jobs →
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20">
        <div className="page-container">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white text-center shadow-xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 tracking-tight">
                Ready to Find Your Real Career Direction?
              </h2>
              <p className="text-indigo-100 text-sm sm:text-base mb-8 leading-relaxed">
                Upload your CV right now to unlock your personalized Top 20 career roadmap, missing skill checklist, and AI career assistant.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  to="/analyze"
                  className="w-full sm:w-auto bg-white text-indigo-900 hover:bg-indigo-50 hover:text-indigo-950 font-bold border-0 shadow-lg"
                >
                  Upload Your CV Now
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  to="/dashboard"
                  className="w-full sm:w-auto text-white hover:bg-white/10 border border-white/20"
                >
                  Explore Live Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
