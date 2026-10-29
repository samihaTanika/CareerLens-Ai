import { useCallback, useState } from 'react';
import { validatePDF, formatFileSize } from '../utils/helpers';

/**
 * Drag-and-drop PDF upload component with soothing light-mode aesthetic.
 * Accepts both file/selectedFile and onRemove/onFileRemove for full compatibility.
 */
export default function FileUpload({
  onFileSelect,
  file: propFile,
  selectedFile,
  onRemove: propOnRemove,
  onFileRemove,
  disabled = false,
}) {
  const currentFile = propFile || selectedFile || null;

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleFile = useCallback(
    (newFile) => {
      if (disabled) return;
      setError('');
      const result = validatePDF(newFile);
      if (!result.valid) {
        setError(result.error);
        return;
      }
      if (onFileSelect) onFileSelect(newFile);
    },
    [onFileSelect, disabled]
  );

  const handleDrag = useCallback(
    (e) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    },
    [disabled]
  );

  const handleDrop = useCallback(
    (e) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile, disabled]
  );

  const handleInputChange = useCallback(
    (e) => {
      if (disabled) return;
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile, disabled]
  );

  const handleRemove = useCallback(() => {
    setError('');
    if (propOnRemove) {
      propOnRemove();
    } else if (onFileRemove) {
      onFileRemove();
    }
  }, [propOnRemove, onFileRemove]);

  // File selected state
  if (currentFile) {
    return (
      <div className="border border-emerald-200 rounded-2xl p-6 bg-emerald-50/60 shadow-xs" id="file-upload-selected">
        <div className="flex items-center gap-4">
          {/* PDF icon */}
          <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0 shadow-2xs">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>

          {/* File info */}
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-slate-900 truncate">
              {currentFile.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {formatFileSize(currentFile.size || 102400)} • PDF Document
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs text-emerald-800 font-semibold">Ready for analysis</span>
            </div>
          </div>

          {/* Remove button */}
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-100/60 transition-colors cursor-pointer"
              aria-label="Remove file"
              id="file-upload-remove"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Upload zone
  return (
    <div id="file-upload-zone">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          ${dragActive
            ? 'border-[var(--color-accent-primary)] bg-indigo-50 ring-4 ring-indigo-500/10'
            : error
              ? 'border-rose-300 bg-rose-50/50'
              : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/80 bg-white'
          }
        `}
        onClick={() => !disabled && document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />

        <div className="flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
            dragActive ? 'bg-indigo-100 text-[var(--color-accent-primary)]' : 'bg-indigo-50 text-[var(--color-accent-primary)] shadow-2xs'
          }`}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>

          <div>
            <p className="text-base font-semibold text-slate-900">
              {dragActive ? 'Drop your resume PDF here' : 'Drag & drop your resume PDF here'}
            </p>
            <p className="text-xs text-slate-500 mt-1.5">
              or <span className="text-[var(--color-accent-primary)] font-semibold underline underline-offset-2">browse files from your computer</span> • PDF only, max 10MB
            </p>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2.5 mt-3.5 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <span className="text-xs text-rose-700 font-medium">{error}</span>
        </div>
      )}
    </div>
  );
}
