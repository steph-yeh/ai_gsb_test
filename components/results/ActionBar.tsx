import { Button } from '@/components/ui/Button';

interface ActionBarProps {
  onNextQuestion: () => void;
  onStartOver: () => void;
  loadingNext?: boolean;
  questionCount: number;
}

export function ActionBar({ onNextQuestion, onStartOver, loadingNext, questionCount }: ActionBarProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-300">
            {questionCount} {questionCount === 1 ? 'question' : 'questions'} completed this session
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Keep practicing to build confidence and fluency</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="ghost" size="sm" onClick={onStartOver} className="flex-1 sm:flex-none">
            Start Over
          </Button>
          <Button size="md" onClick={onNextQuestion} loading={loadingNext} className="flex-1 sm:flex-none">
            {loadingNext ? 'Generating...' : 'Next Question'}
            {!loadingNext && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
