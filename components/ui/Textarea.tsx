import { twMerge } from 'tailwind-merge';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  charCount?: number;
  maxChars?: number;
}

export function Textarea({ label, hint, error, charCount, maxChars, className, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      )}
      {hint && <p className="text-xs text-slate-500 mb-2">{hint}</p>}
      <textarea
        className={twMerge(
          'w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 text-sm resize-none transition-colors duration-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      <div className="flex justify-between items-center mt-1.5">
        {error && <p className="text-xs text-red-400">{error}</p>}
        {maxChars && charCount !== undefined && (
          <p className={twMerge('text-xs ml-auto tabular-nums', charCount > maxChars ? 'text-red-400' : 'text-slate-500')}>
            {charCount}/{maxChars}
          </p>
        )}
      </div>
    </div>
  );
}
