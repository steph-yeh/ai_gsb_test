import { Button } from '@/components/ui/Button';

interface SubmitBarProps {
  onSubmit: () => void;
  disabled?: boolean;
  loading?: boolean;
  elapsed?: string;
}

export function SubmitBar({ onSubmit, disabled, loading, elapsed }: SubmitBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-t border-slate-800">
      {elapsed && (
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="tabular-nums font-mono">{elapsed}</span>
        </div>
      )}
      <div className="ml-auto">
        <Button
          onClick={onSubmit}
          disabled={disabled}
          loading={loading}
          size="md"
        >
          {loading ? 'Getting Feedback...' : 'Submit for Feedback'}
          {!loading && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
}
