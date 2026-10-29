/**
 * Reusable Card component with soft soothing border and modern elevation.
 */
export default function Card({ children, className = '', hover = false, id, ...props }) {
  return (
    <div
      className={`
        bg-white border border-slate-200/75 rounded-2xl shadow-xs transition-all duration-200
        ${hover ? 'hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5' : ''}
        ${className}
      `}
      id={id}
      {...props}
    >
      {children}
    </div>
  );
}
