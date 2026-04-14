'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { JobDescriptionInput } from './JobDescriptionInput';
import type { SessionConfig, QuestionType, Difficulty, AnswerMode } from '@/lib/types';

interface SessionConfigProps {
  onSubmit: (config: SessionConfig) => void;
  loading?: boolean;
}

const QUESTION_TYPES: { value: QuestionType; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'behavioral',
    label: 'Behavioral',
    description: 'STAR method — past experiences',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    value: 'case',
    label: 'Case / Open-Ended',
    description: 'Business problem solving',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    value: 'situational',
    label: 'Situational',
    description: 'Hypothetical workplace scenarios',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
];

const DIFFICULTIES: { value: Difficulty; label: string; description: string }[] = [
  { value: 'easy', label: 'Easy', description: 'Common scenarios, broad prompts' },
  { value: 'medium', label: 'Medium', description: 'Nuanced, requires structure' },
  { value: 'hard', label: 'Hard', description: 'Senior-level, high-stakes' },
];

const ANSWER_MODES: { value: AnswerMode; label: string; description: string }[] = [
  { value: 'free-text', label: 'Free Text', description: 'Type your full answer' },
  { value: 'multiple-choice', label: 'Multiple Choice', description: 'Pick from options' },
];

export function SessionConfig({ onSubmit, loading }: SessionConfigProps) {
  const [questionType, setQuestionType] = useState<QuestionType>('behavioral');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [jobDescription, setJobDescription] = useState('');
  const [answerMode, setAnswerMode] = useState<AnswerMode>('free-text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ questionType, difficulty, jobDescription, answerMode });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Question Type */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">Question Type</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {QUESTION_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setQuestionType(type.value)}
              className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-150 ${
                questionType === type.value
                  ? 'bg-indigo-600/10 border-indigo-500 text-indigo-300'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <span className={questionType === type.value ? 'text-indigo-400' : 'text-slate-500'}>
                {type.icon}
              </span>
              <span className="font-medium text-sm mt-2">{type.label}</span>
              <span className="text-xs mt-0.5 opacity-75">{type.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">Difficulty Level</label>
        <div className="grid grid-cols-3 gap-3">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setDifficulty(d.value)}
              className={`p-3 rounded-xl border text-center transition-all duration-150 ${
                difficulty === d.value
                  ? 'bg-indigo-600/10 border-indigo-500'
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className={`text-sm font-semibold ${difficulty === d.value ? 'text-indigo-300' : 'text-slate-300'}`}>
                {d.label}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{d.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Answer Mode */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">Answer Mode</label>
        <div className="grid grid-cols-2 gap-3">
          {ANSWER_MODES.map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => setAnswerMode(mode.value)}
              className={`p-3 rounded-xl border text-center transition-all duration-150 ${
                answerMode === mode.value
                  ? 'bg-indigo-600/10 border-indigo-500'
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className={`text-sm font-semibold ${answerMode === mode.value ? 'text-indigo-300' : 'text-slate-300'}`}>
                {mode.label}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{mode.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Job Description */}
      <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />

      <Button type="submit" size="lg" className="w-full" loading={loading}>
        {loading ? 'Generating Your Question...' : 'Start Interview'}
        {!loading && (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        )}
      </Button>
    </form>
  );
}
