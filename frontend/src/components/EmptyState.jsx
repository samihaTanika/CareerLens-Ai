import Button from './Button';

/**
 * Empty state placeholder with soothing light aesthetic.
 *
 * @param {string} title
 * @param {string} description
 * @param {string} actionLabel - Optional CTA label
 * @param {string} actionTo - Optional CTA route
 */
export default function EmptyState({ title, description, actionLabel, actionTo, icon }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-center mb-5 text-[var(--color-accent-primary)] shadow-2xs">
        {icon || (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">{description}</p>
      {actionLabel && actionTo && (
        <Button to={actionTo} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
