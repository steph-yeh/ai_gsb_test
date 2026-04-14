import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'indigo' | 'emerald' | 'amber' | 'slate' | 'red';
  className?: string;
}

export function Badge({ children, color = 'slate', className }: BadgeProps) {
  const colors = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    slate: 'bg-slate-800 text-slate-400 border-slate-700',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <span
      className={twMerge(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        colors[color],
        className
      )}
    >
      {children}
    </span>
  );
}
