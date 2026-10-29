/**
 * Get the appropriate color class for a score value in light theme.
 * @param {number} score - Score from 0-100
 * @returns {string} Tailwind color class
 */
export function getScoreColor(score) {
  if (score >= 80) return 'text-emerald-700 font-bold';
  if (score >= 60) return 'text-blue-700 font-bold';
  if (score >= 40) return 'text-amber-700 font-bold';
  return 'text-rose-700 font-bold';
}

/**
 * Get the background variant for a score in light theme.
 */
export function getScoreBgColor(score) {
  if (score >= 80) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (score >= 60) return 'bg-blue-50 text-blue-700 border border-blue-200';
  if (score >= 40) return 'bg-amber-50 text-amber-800 border border-amber-200';
  return 'bg-rose-50 text-rose-700 border border-rose-200';
}

/**
 * Get the hex color for a score (used in SVG/charts/gauges).
 */
export function getScoreHex(score) {
  if (score >= 80) return '#059669';
  if (score >= 60) return '#2563eb';
  if (score >= 40) return '#d97706';
  return '#dc2626';
}

/**
 * Get a score label.
 */
export function getScoreLabel(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good Match';
  if (score >= 40) return 'Moderate Fit';
  return 'Needs Improvement';
}

/**
 * Format a file size in bytes to a human-readable string.
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Format a date string to a readable format.
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Validate a PDF file.
 * @param {File} file
 * @returns {{ valid: boolean, error?: string }}
 */
export function validatePDF(file) {
  if (!file) return { valid: false, error: 'No file selected' };
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'Only PDF files are accepted' };
  }
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be under 10MB' };
  }
  if (file.size === 0) {
    return { valid: false, error: 'File appears to be empty' };
  }
  return { valid: true };
}

/**
 * Get priority badge styles in light theme.
 */
export function getPriorityStyles(priority) {
  switch (priority) {
    case 'high':
      return 'bg-rose-50 text-rose-700 border border-rose-200 font-semibold';
    case 'medium':
      return 'bg-amber-50 text-amber-800 border border-amber-200 font-semibold';
    case 'low':
      return 'bg-slate-100 text-slate-700 border border-slate-200 font-semibold';
    default:
      return 'bg-slate-100 text-slate-700 border border-slate-200 font-semibold';
  }
}
