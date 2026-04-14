import type { FeedbackResult, QuestionType } from '@/lib/types';

interface FeedbackCardProps {
  feedback: FeedbackResult;
  questionType: QuestionType;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : score >= 40 ? '#f97316' : '#ef4444';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="104" height="104" viewBox="0 0 104 104">
        <circle cx="52" cy="52" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle
          cx="52"
          cy="52"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 52 52)"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold text-white">{score}</div>
        <div className="text-xs text-slate-500">/100</div>
      </div>
    </div>
  );
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  const label =
    feedback.overallScore >= 80
      ? 'Excellent'
      : feedback.overallScore >= 65
      ? 'Good'
      : feedback.overallScore >= 50
      ? 'Developing'
      : 'Needs Work';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-start gap-6">
        <div className="flex flex-col items-center gap-1">
          <ScoreRing score={feedback.overallScore} />
          <span className="text-xs font-semibold text-slate-400">{label}</span>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white mb-2">Overall Assessment</h2>
          <p className="text-slate-300 text-sm leading-relaxed">{feedback.summary}</p>
        </div>
      </div>
    </div>
  );
}
