interface FreeTextAnswerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  minLength?: number;
  placeholder?: string;
}

export function FreeTextAnswer({
  value,
  onChange,
  disabled,
  minLength = 50,
  placeholder = 'Type your answer here. For behavioral questions, structure your response using the STAR method: describe the Situation, your Task, the Actions you took, and the Results you achieved...',
}: FreeTextAnswerProps) {
  const charCount = value.length;
  const isReady = charCount >= minLength;

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        rows={8}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 text-sm resize-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed leading-relaxed"
      />
      <div className="flex items-center justify-between">
        <p className={`text-xs transition-colors ${isReady ? 'text-emerald-500' : 'text-slate-500'}`}>
          {isReady ? '✓ Ready to submit' : `${minLength - charCount} more characters to unlock submission`}
        </p>
        <span className="text-xs text-slate-600 tabular-nums">{charCount} chars</span>
      </div>
    </div>
  );
}
