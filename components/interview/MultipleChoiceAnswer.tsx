import type { MultipleChoiceOption } from '@/lib/types';

interface MultipleChoiceAnswerProps {
  options: MultipleChoiceOption[];
  selectedId: string | null;
  onChange: (id: string) => void;
  disabled?: boolean;
}

export function MultipleChoiceAnswer({ options, selectedId, onChange, disabled }: MultipleChoiceAnswerProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const selected = selectedId === option.id;
        return (
          <button
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option.id)}
            className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-150 disabled:cursor-not-allowed ${
              selected
                ? 'bg-indigo-600/10 border-indigo-500 text-indigo-100'
                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <span
              className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                selected ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-600 text-slate-500'
              }`}
            >
              {option.id}
            </span>
            <span className="text-sm leading-relaxed">{option.text}</span>
          </button>
        );
      })}
    </div>
  );
}
