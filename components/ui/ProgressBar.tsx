import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'indigo' | 'emerald' | 'amber' | 'red';
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color = 'indigo',
  label,
  showValue = false,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  const trackColors = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };

  return (
    <div className={twMerge('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-slate-400 font-medium">{label}</span>}
          {showValue && (
            <span className="text-xs text-slate-400 font-medium tabular-nums">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={twMerge('h-full rounded-full transition-all duration-500', trackColors[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
