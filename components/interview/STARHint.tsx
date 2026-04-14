'use client';

import { useState } from 'react';
import type { QuestionType } from '@/lib/types';

interface STARHintProps {
  hints: string[];
  questionType: QuestionType;
}

const STAR_LABELS = ['Situation / Task', 'Action', 'Result'];

export function STARHint({ hints, questionType }: STARHintProps) {
  const [open, setOpen] = useState(false);

  const isBehavioral = questionType === 'behavioral';
  const title = isBehavioral ? 'STAR Framework Hints' : 'Structuring Your Answer';

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 hover:bg-slate-800 transition-colors text-sm"
      >
        <span className="flex items-center gap-2 text-slate-400 font-medium">
          <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          {title}
        </span>
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-3 bg-slate-800/20 space-y-3">
          {hints.map((hint, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5 text-xs font-bold text-amber-400 bg-amber-500/10 rounded-md px-2 py-0.5 border border-amber-500/20">
                {isBehavioral ? STAR_LABELS[i] ?? `Step ${i + 1}` : `Step ${i + 1}`}
              </span>
              <p className="text-sm text-slate-400 leading-relaxed">{hint}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
