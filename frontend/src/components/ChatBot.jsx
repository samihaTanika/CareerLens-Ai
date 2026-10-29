import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockAnalysisResult } from '../data/mockAnalysis';
import { mockJobs } from '../data/mockJobs';
import { mockScholarships } from '../data/mockScholarships';

export default function ChatBot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load current analysis context
  const getContext = () => {
    try {
      const stored = localStorage.getItem('careerlens_latest_analysis');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return mockAnalysisResult;
  };

  const initialGreeting = {
    role: 'assistant',
    text: `Hello! 👋 I'm **CareerLens AI Assistant**, your personal career strategist for Bangladesh.

I have full context of your profile, top matched career sectors, available **Government & Private jobs**, and **Higher Study Scholarships abroad**.

How can I help you today? You can choose a quick question below or ask anything!`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState(() => [initialGreeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickPrompts = [
    '🏛️ What government jobs match my profile?',
    '📄 How can I increase my ATS score?',
    '🎓 Which scholarships abroad am I eligible for?',
    '⚡ What skills am I missing for my top match?',
    '💰 What is the expected salary in Dhaka?',
    '❓ Give me 5 mock interview questions',
  ];

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg = {
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const context = getContext();

    try {
      // Attempt backend API first
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4),
          context: {
            cv_summary: context.cv_summary,
            overall_cv_score: context.overall_cv_score,
            top_categories: context.top_categories?.slice(0, 5),
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setLoading(false);
        return;
      }
    } catch {
      // Backend not running, smoothly transition to local intelligent engine
    }

    // Local Intelligent Career Response Engine
    setTimeout(() => {
      const reply = generateLocalAnswer(query, context, user);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setLoading(false);
    }, 600);
  };

  const generateLocalAnswer = (query, context, currentUser) => {
    const q = query.toLowerCase();
    const candidateName = context?.cv_summary?.name || currentUser?.profile?.full_name || 'Candidate';
    const topRole = context?.top_categories?.[0]?.category_name || 'Banking & Financial Services';
    const topScore = context?.overall_cv_score || 88;
    const extractedSkills = context?.cv_summary?.extracted_skills || [];
    const missingSkills = context?.top_categories?.[0]?.missing_skills || [];
    const degree = context?.cv_summary?.education || "Bachelor's / Master's";

    // 1. Government Jobs
    if (q.includes('govt') || q.includes('government') || q.includes('bcs') || q.includes('bank') || q.includes('সরকারি') || q.includes('চাকরি')) {
      const govtJobs = mockJobs.filter((j) => j.is_government);
      return `🏛️ **Available Government Job Opportunities for You (${candidateName}):**

Based on your academic degree (${degree}), you are eligible for prime 9th & 10th grade statutory positions in Bangladesh:

1. **47th BCS Examination (General Cadre: Administration & Police):**
   - **Grade:** 9th Grade National Pay Scale (৳38,000 - ৳95,000/mo + housing & transport)
   - **Positions:** Assistant Commissioner & Executive Magistrate, ASP.
   - **Apply Portal:** [BPSC Teletalk](http://bpsc.teletalk.com.bd)

2. **Bangladesh Bank Assistant Director (General & Financial Inspection):**
   - **Grade:** 9th Grade + Central Bank Special Allowance (৳42,000 - ৳110,000/mo)
   - **Key Focus:** Monetary policy, private bank inspection, foreign exchange.
   - **Apply Portal:** [BB eRecruitment](https://erecruitment.bb.org.bd)

3. **Combined 10 State-Owned Commercial Banks (Senior Officer):**
   - **Banks:** Sonali, Janata, Agrani, Rupali, BKB.
   - **Openings:** Thousands of annual vacancies for general branch leadership.

4. **DoICT & BCC (ICT Division):**
   - Assistant Programmer and Assistant Network Engineer roles.

👉 *You can filter directly by **"Government Jobs"** on our Job Search page!*`;
    }

    // 2. Scholarships
    if (q.includes('scholarship') || q.includes('study abroad') || q.includes('higher study') || q.includes('masters') || q.includes('phd') || q.includes('ielts') || q.includes('gre')) {
      return `🎓 **Study Abroad Scholarships Matched to Your CV Profile:**

Your academic credentials and experience qualify you for these fully-funded programs:

1. **Chevening Scholarship (United Kingdom):**
   - **Funding:** 100% Tuition Fees + £1,400 Monthly Living Stipend + Flight Tickets
   - **Eligibility:** 2+ years work experience (You have ${context?.cv_summary?.experience_years || '7'} years!).
   - **Deadline:** November 5, 2026

2. **Fulbright Foreign Student Program (USA):**
   - **Funding:** Full Tuition + $2,200 Monthly Stipend + Health Insurance
   - **Best for:** Master's and PhD in STEM, Business, and Social Sciences.

3. **DAAD EPOS (Germany):**
   - **Funding:** Tuition-Free at top German public universities + €934/month.

4. **Australia Awards (Australia):**
   - **Funding:** Full Tuition + AUD $35,000/year living allowance.

5. **MEXT (Japan) & KGSP (South Korea):**
   - **Funding:** Generous monthly stipends, zero tuition, no mandatory IELTS if English-medium graduate.

👉 *Check out our **Scholarships** tab to view all 22 verified programs!*`;
    }

    // 3. ATS Score & Resume Improvement
    if (q.includes('ats') || q.includes('score') || q.includes('improve') || q.includes('resume') || q.includes('cv')) {
      return `📄 **Action Plan to Boost Your Resume & ATS Score (Current: ${topScore}%):**

1. **Add Metrics & Impact Numbers:**
   - Instead of *"Managed investment portfolios"*, write: *"Managed $190M+ AUM portfolio, achieving a 50% year-over-year asset growth."*
2. **Close Missing Skill Gaps:**
   - For your #1 match (**${topRole}**), employers are looking for: ${missingSkills.slice(0, 2).map((s) => `**${typeof s === 'string' ? s : s.skill}**`).join(', ')}.
3. **Format for ATS Robots:**
   - Use clean standard headings (*Summary, Professional Experience, Education, Skills, Projects*).
   - Avoid two-column tables or text boxes which get dropped by legacy parsers.
4. **Certifications:**
   - Add local credentials like **JAIBB/AIBB** (Banking), **PMP/Scrum** (Management), or **AWS/Azure** (Tech).`;
    }

    // 4. Missing Skills & Roadmap
    if (q.includes('skill') || q.includes('missing') || q.includes('learn') || q.includes('gap') || q.includes('roadmap')) {
      const missingList = missingSkills.map((s) => `• ${typeof s === 'string' ? s : s.skill}`).join('\n') || '• Advanced Regulatory Reporting\n• Core Enterprise ERP Workflows';
      return `⚡ **Skills Breakdown for Your Top Match (${topRole}):**

**Skills You Possess:**
${extractedSkills.slice(0, 6).map((s) => `✓ ${s}`).join(', ')}

**High-Priority Skills to Acquire:**
${missingList}

**Recommended 3-Step Learning Roadmap:**
1. Complete a certified online course on the missing critical tools.
2. Build a documented portfolio project or case study demonstrating practical application.
3. Add the verified certification badge to your LinkedIn and CV.`;
    }

    // 5. Salary Benchmarks
    if (q.includes('salary') || q.includes('pay') || q.includes('bdt') || q.includes('money') || q.includes('বেতন') || q.includes('টাকা')) {
      return `💰 **Salary Benchmarks for Your Target Roles in Bangladesh:**

- **${topRole}:**
  - **Expected Range:** ৳45,000 – ৳150,000 / month (Mid to Senior level in Dhaka)
  - **Tier-1 Banks (BRAC, EBL, City Bank):** Senior RM roles reach ৳120,000 – ৳160,000/mo + annual bonuses.
- **Government Civil Service (9th Grade):**
  - Basic ৳22,000 + 40-50% House Rent + Medical Allowance = Total ৳38,000 – ৳55,000 / month + government quarters.
- **Top Tech & FinTech (bKash, Pathao, Samsung R&D):**
  - Senior Engineers & Product Managers: ৳130,000 – ৳250,000 / month.
- **Global Remote Roles:**
  - $60,000 – $140,000 / year (Paid in USD).`;
    }

    // 6. Interview Questions
    if (q.includes('interview') || q.includes('question') || q.includes('viva') || q.includes('prep')) {
      return `❓ **Top 5 Mock Interview Questions for ${topRole}:**

1. *"Can you walk us through a time you handled a high-stakes portfolio or project decision under uncertain market conditions?"*
2. *"How do you tailor financial or technical proposals when communicating with non-technical stakeholders?"*
3. *"What strategies do you use to stay compliant with Bangladesh Bank and regulatory framework updates?"*
4. *"Describe a scenario where a client or executive pushed back against your recommendation. How did you negotiate?"*
5. *"Why are you looking to advance your career with our organization specifically in the current Bangladesh economic landscape?"*

💡 *Framework Tip:* Answer using **STAR** (Situation → Task → Action → Result with numbers).`;
    }

    // Default Fallback
    return `I understand you're asking about **"${query}"**!

Here is what CareerLens AI recommends for **${candidateName}**:
- Your profile is currently matched **${topScore}%** with **${topRole}**.
- You have **${extractedSkills.length} verified competencies** on record.
- You qualify for **Government 9th Grade examinations** and **22+ verified study abroad scholarships**.

Feel free to ask me specifically about:
- *"What government jobs can I apply for right now?"*
- *"How do I prepare for a bank or tech interview?"*
- *"What are the best scholarships in UK, Germany, or USA?"*
- *"How do I fix missing skills on my CV?"*`;
  };

  const renderFormattedText = (text) => {
    // Simple markdown-style bold and bullet formatter
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold replacer
      let formatted = line;
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const elements = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={pIdx} className="italic text-slate-700">{part.slice(1, -1)}</em>;
        }
        return part;
      });

      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm text-slate-700 leading-relaxed my-1">
            {elements}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={idx} className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed my-1 pl-1">
            {elements}
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-0.5">
          {elements}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-fade-in">
          <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full shadow-lg border border-indigo-100 text-xs font-bold text-slate-700 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Chat with Career AI</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full gradient-bg text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/80"
            aria-label="Open CareerLens AI Assistant"
            id="chatbot-launcher"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}

      {/* Expanded Chat Drawer / Window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[380px] sm:w-[440px] max-w-[95vw] h-[600px] max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="gradient-bg p-4 flex items-center justify-between text-white shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg font-extrabold border border-white/20 shadow-2xs">
                🤖
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base leading-snug">CareerLens AI</h3>
                <div className="flex items-center gap-1.5 text-[11px] text-indigo-100 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Context Synced</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages([initialGreeting])}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs font-semibold"
                title="Clear conversation"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Minimize chat"
                aria-label="Close chat"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Context Pill */}
          <div className="bg-indigo-50/70 border-b border-indigo-100/80 px-4 py-2 flex items-center justify-between text-[11px] text-slate-600 font-medium shrink-0">
            <span>CV Context: <strong className="text-slate-800">{getContext()?.cv_summary?.name || 'Verified Profile'}</strong></span>
            <span className="text-[var(--color-accent-primary)] font-bold">{getContext()?.overall_cv_score || 88}% Match</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-[var(--color-accent-primary)] font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs mt-1">
                      AI
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm shadow-2xs ${
                      isUser
                        ? 'gradient-bg text-white rounded-tr-xs font-medium'
                        : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs'
                    }`}
                  >
                    {isUser ? (
                      <p className="leading-relaxed">{msg.text}</p>
                    ) : (
                      <div>{renderFormattedText(msg.text)}</div>
                    )}
                    <div className={`text-[10px] mt-1.5 font-medium ${isUser ? 'text-indigo-200 text-right' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2.5 justify-start animate-fade-in">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-[var(--color-accent-primary)] font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                  AI
                </div>
                <div className="bg-white border border-slate-200/90 p-3.5 rounded-2xl rounded-tl-xs flex items-center gap-2 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-ping" />
                  <span className="text-xs text-slate-500 font-semibold">Consulting career intelligence...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-1.5 shrink-0 scrollbar-none">
            {quickPrompts.map((prompt, pi) => (
              <button
                key={pi}
                type="button"
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-[var(--color-accent-primary)] text-slate-600 text-[11px] font-semibold whitespace-nowrap transition-colors border border-slate-200/60 cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your CV, jobs, scholarships..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:border-[var(--color-accent-primary)] focus:bg-white focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl gradient-bg text-white shadow-xs hover:opacity-95 disabled:opacity-40 transition-all cursor-pointer border-0"
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

