/**
 * Loading spinner with optional message.
 */
export default function LoadingSpinner({ message = 'Loading...', size = 'md' }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className={`${sizes[size]} animate-spin`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="var(--color-accent-primary)"
            strokeWidth="3"
          />
          <path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="var(--color-accent-primary)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {message && (
        <p className="text-sm text-[var(--color-text-muted)] animate-pulse-soft">{message}</p>
      )}
    </div>
  );
}
