import { Badge } from '@/components/ui/Badge';
import type { InterviewQuestion } from '@/lib/types';

interface QuestionCardProps {
  question: InterviewQuestion;
  questionNumber: number;
}

const TYPE_LABELS = {
  behavioral: 'Behavioral',
  case: 'Case / Open-Ended',
  situational: 'Situational',
};

const DIFFICULTY_COLORS = {
  easy: 'emerald' as const,
  medium: 'amber' as const,
  hard: 'red' as const,
};

export function QuestionCard({ question, questionNumber }: QuestionCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-medium text-slate-500">Question {questionNumber}</span>
        <span className="text-slate-700">•</span>
        <Badge color="indigo">{TYPE_LABELS[question.type]}</Badge>
        <Badge color={DIFFICULTY_COLORS[question.difficulty]}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </Badge>
      </div>
      <p className="text-white text-lg font-medium leading-relaxed">{question.text}</p>
    </div>
  );
}
