import { getScoreHex } from '../utils/helpers';

/**
 * Horizontal progress bar with label and score.
 *
 * @param {string} label - Category name
 * @param {number} value - Score from 0-100
 */
export default function ProgressBar({ label, value = 0 }) {
  const color = getScoreHex(value);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-text-primary)]">{label}</span>
        <span className="text-sm font-semibold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="w-full h-2 bg-[var(--color-bg-primary)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}
