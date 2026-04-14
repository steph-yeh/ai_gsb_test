import type { AnswerMode } from '@/lib/types';

interface AnswerModeToggleProps {
  mode: AnswerMode;
  onChange: (mode: AnswerMode) => void;
  disabled?: boolean;
}

export function AnswerModeToggle({ mode, onChange, disabled }: AnswerModeToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-slate-800 rounded-xl p-1 w-fit">
      {(['free-text', 'multiple-choice'] as AnswerMode[]).map((m) => (
        <button
          key={m}
          type="button"
          disabled={disabled}
          onClick={() => onChange(m)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
            mode === m
              ? 'bg-slate-700 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          {m === 'free-text' ? 'Free Text' : 'Multiple Choice'}
        </button>
      ))}
    </div>
  );
}
