import { useEffect, useState } from 'react';
import { getScoreHex, getScoreLabel } from '../utils/helpers';

/**
 * Circular score gauge with animated fill and clean light-theme styling.
 *
 * @param {number} score - Score from 0-100
 * @param {string} label - Label below the score (e.g., "ATS Score")
 * @param {number} size - SVG size in pixels
 */
export default function ScoreGauge({ score = 0, label = '', size = 150 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const strokeWidth = 9;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  const color = getScoreHex(score);
  const scoreLabel = getScoreLabel(score);
  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          {/* Score arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{score}</span>
          <span className="text-[11px] font-bold uppercase tracking-wider mt-0.5" style={{ color }}>
            {scoreLabel}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-sm font-semibold text-slate-600">{label}</span>
      )}
    </div>
  );
}
