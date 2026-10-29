import { Link } from 'react-router-dom';

/**
 * Reusable Button component with light, soothing variants.
 *
 * @param {'primary'|'secondary'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} loading
 * @param {boolean} disabled
 * @param {string} to - If provided, renders as a Link
 * @param {string} href - If provided, renders as an anchor
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  to,
  href,
  className = '',
  id,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 no-underline cursor-pointer select-none';

  const variantStyles = {
    primary:
      'gradient-bg text-white shadow-sm hover:opacity-95 hover:shadow-md hover:shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border-0',
    secondary:
      'bg-white text-[var(--color-text-primary)] border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:
      'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-slate-100/80 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border-0',
    danger:
      'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} id={id} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} id={id} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} id={id} {...props}>
      {content}
    </button>
  );
}
