import { ProgressBar } from '@/components/ui/ProgressBar';
import type { STARScore } from '@/lib/types';

interface STAREvaluationProps {
  starBreakdown: STARScore;
}

const STAR_COMPONENTS: { key: keyof Omit<STARScore, 'feedback'>; label: string; description: string }[] = [
  { key: 'situation', label: 'Situation', description: 'Did you clearly set the scene?' },
  { key: 'task', label: 'Task', description: 'Was your specific role explained?' },
  { key: 'action', label: 'Action', description: 'Were your steps concrete and specific?' },
  { key: 'result', label: 'Result', description: 'Was the outcome quantified or clear?' },
];

function starColor(score: number): 'emerald' | 'amber' | 'red' {
  if (score >= 2.5) return 'emerald';
  if (score >= 1.5) return 'amber';
  return 'red';
}

export function STAREvaluation({ starBreakdown }: STAREvaluationProps) {
  const totalScore = starBreakdown.situation + starBreakdown.task + starBreakdown.action + starBreakdown.result;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
          STAR Framework Breakdown
        </h3>
        <span className="text-xs font-medium text-slate-400 bg-slate-800 rounded-lg px-2.5 py-1">
          {totalScore}/12 points
        </span>
      </div>

      <div className="space-y-4">
        {STAR_COMPONENTS.map(({ key, label, description }) => {
          const score = starBreakdown[key] as number;
          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <span className="text-sm font-medium text-slate-300">{label}</span>
                  <span className="text-xs text-slate-600 ml-2">{description}</span>
                </div>
                <span className={`text-xs font-bold tabular-nums ${
                  score >= 2.5 ? 'text-emerald-400' : score >= 1.5 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {score}/3
                </span>
              </div>
              <ProgressBar value={score} max={3} color={starColor(score)} />
            </div>
          );
        })}
      </div>

      {starBreakdown.feedback && (
        <div className="mt-5 pt-5 border-t border-slate-800">
          <p className="text-slate-400 text-sm leading-relaxed">{starBreakdown.feedback}</p>
        </div>
      )}
    </div>
  );
}
