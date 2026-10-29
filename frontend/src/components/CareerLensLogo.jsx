import { useId } from 'react';

/**
 * CareerLens AI — Official Brand Logo Mark
 * Designed with optical lens aperture, dual ascending career chevrons, and AI neural spark.
 *
 * @param {Object} props
 * @param {string} [props.className='w-10 h-10'] - Tailwind classes for sizing
 * @param {boolean} [props.simplified=false] - Strips inner calibration lines for small sizes (favicons/badges)
 */
export default function CareerLensLogo({
  className = 'w-10 h-10',
  simplified = false,
  ...props
}) {
  const uid = useId().replace(/:/g, '');
  const lensGradId = `cl-lens-${uid}`;
  const chevronGradId = `cl-chevron-${uid}`;
  const sparkGradId = `cl-spark-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="CareerLens AI Logo"
      className={`shrink-0 select-none ${className}`}
      {...props}
    >
      <defs>
        {/* Optical Lens Aperture Gradient: Indigo -> Cyan -> Emerald */}
        <linearGradient id={lensGradId} x1="12" y1="88" x2="88" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="55%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        {/* Ascending Trajectory Chevron Gradient: Emerald -> Cyan -> Indigo */}
        <linearGradient id={chevronGradId} x1="50" y1="35" x2="50" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* AI Neural Spark Gradient: High-Luminance Cyan -> Emerald */}
        <linearGradient id={sparkGradId} x1="65" y1="35" x2="88" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>

      {/* 1. Inner NLP Data Calibration Ring (Subtle Optical Layer) */}
      {!simplified && (
        <circle
          cx="50"
          cy="50"
          r="28"
          stroke={`url(#${lensGradId})`}
          strokeWidth="1.75"
          strokeDasharray="5 5"
          strokeLinecap="round"
          opacity="0.35"
        />
      )}

      {/* 2. Outer Optical Lens Aperture (300-Degree Precision Arc) */}
      <path
        d="M 86.7 40.2 A 38 38 0 1 1 59.8 13.3"
        stroke={`url(#${lensGradId})`}
        strokeWidth={simplified ? 10 : 8}
        strokeLinecap="round"
      />

      {/* 3. Ascending Career Trajectory: Secondary Ranking Base Chevron */}
      {!simplified && (
        <path
          d="M 38.5 68.5 L 50 57 L 61.5 68.5"
          stroke={`url(#${chevronGradId})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.65"
        />
      )}

      {/* 4. Ascending Career Trajectory: Primary Growth Vector */}
      <path
        d={simplified ? 'M 30 58 L 50 38 L 70 58' : 'M 30.5 56.5 L 50 37 L 69.5 56.5'}
        stroke={`url(#${chevronGradId})`}
        strokeWidth={simplified ? 10 : 8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 5. AI Neural Spark (Focal Apex at 45-Degree Northeast Axis) */}
      <path
        d="M 76.5 11.5 Q 76.5 23.5 88.5 23.5 Q 76.5 23.5 76.5 35.5 Q 76.5 23.5 64.5 23.5 Q 76.5 23.5 76.5 11.5 Z"
        fill={`url(#${sparkGradId})`}
      />

      {/* 6. Focal Node (NLP Core Point) */}
      {!simplified && <circle cx="50" cy="24" r="2.25" fill="#22D3EE" />}
    </svg>
  );
}
