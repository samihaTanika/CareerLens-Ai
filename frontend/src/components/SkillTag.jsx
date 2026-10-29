/**
 * Skill tag pill/badge with high contrast light-theme styling.
 *
 * @param {'matched'|'missing'|'keyword'|'learn'|'neutral'} variant
 * @param {string} skill - Optional skill text fallback if children is omitted
 */
export default function SkillTag({ children, skill, variant = 'keyword' }) {
  const content = children || skill;

  const styles = {
    matched: 'bg-emerald-50 text-emerald-800 border-emerald-200/90 font-medium',
    missing: 'bg-rose-50 text-rose-800 border-rose-200/90 font-medium',
    keyword: 'bg-indigo-50 text-indigo-800 border-indigo-200/90 font-medium',
    learn: 'bg-violet-50 text-violet-800 border-violet-200/90 font-medium',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
  };

  const icons = {
    matched: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    missing: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    keyword: null,
    learn: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    neutral: null,
  };

  const appliedStyle = styles[variant] || styles.neutral;
  const appliedIcon = icons[variant] || null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs border transition-colors shadow-2xs ${appliedStyle}`}
    >
      {appliedIcon}
      {content}
    </span>
  );
}
