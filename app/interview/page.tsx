'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionCard } from '@/components/interview/QuestionCard';
import { AnswerModeToggle } from '@/components/interview/AnswerModeToggle';
import { FreeTextAnswer } from '@/components/interview/FreeTextAnswer';
import { MultipleChoiceAnswer } from '@/components/interview/MultipleChoiceAnswer';
import { STARHint } from '@/components/interview/STARHint';
import { SubmitBar } from '@/components/interview/SubmitBar';
import { useSession } from '@/context/SessionContext';
import { streamEvaluation } from '@/hooks/useStreamingResponse';
import { useSessionTimer } from '@/hooks/useSessionTimer';
import type { AnswerMode, EvaluateAnswerRequest } from '@/lib/types';
import Link from 'next/link';

const MIN_TEXT_LENGTH = 50;

export default function InterviewPage() {
  const router = useRouter();
  const { state, dispatch, submitAnswer } = useSession();
  const timer = useSessionTimer();

  const [answerText, setAnswerText] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answerMode, setAnswerMode] = useState<AnswerMode>(
    state.config?.answerMode ?? 'free-text'
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!state.currentQuestion) {
      router.replace('/setup');
    } else {
      timer.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const question = state.currentQuestion;
  if (!question || !state.profile) return null;

  const canSubmit =
    answerMode === 'free-text'
      ? answerText.length >= MIN_TEXT_LENGTH
      : selectedOptionId !== null;

  const handleSubmit = async () => {
    if (!canSubmit || !state.profile || submitting) return;
    timer.stop();
    setSubmitting(true);

    const answer = {
      questionId: question.id,
      answerText: answerMode === 'free-text' ? answerText : '',
      selectedOptionId: answerMode === 'multiple-choice' ? (selectedOptionId ?? undefined) : undefined,
      submittedAt: Date.now(),
    };
    submitAnswer(answer);
    dispatch({ type: 'START_STREAMING' });

    // Navigate immediately — results page shows live stream
    router.push('/results');

    const body: EvaluateAnswerRequest = {
      profile: state.profile,
      question,
      answerText: answerMode === 'free-text' ? answerText : '',
      selectedOptionId: answerMode === 'multiple-choice' ? (selectedOptionId ?? undefined) : undefined,
    };

    await streamEvaluation(
      body,
      (token) => dispatch({ type: 'APPEND_STREAM_TOKEN', payload: token }),
      (result) => {
        dispatch({ type: 'FINISH_STREAM' });
        dispatch({ type: 'SET_FEEDBACK', payload: result });
      },
      (err) => {
        console.error('Stream error:', err);
        dispatch({ type: 'FINISH_STREAM' });
      }
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 py-10 px-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
        <Link href="/setup" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          New Session
        </Link>
        <span className="text-sm text-slate-500">
          Hi, <span className="text-slate-300">{state.profile?.name}</span>
        </span>
      </div>

      <div className="max-w-2xl mx-auto space-y-5">
        {/* Question */}
        <QuestionCard question={question} questionNumber={state.questionCount} />

        {/* STAR Hints */}
        {question.hints && question.hints.length > 0 && (
          <STARHint hints={question.hints} questionType={question.type} />
        )}

        {/* Answer Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-400">Your Answer</h2>
            <AnswerModeToggle
              mode={answerMode}
              onChange={(m) => {
                setAnswerMode(m);
                setAnswerText('');
                setSelectedOptionId(null);
              }}
              disabled={submitting}
            />
          </div>

          {answerMode === 'free-text' ? (
            <FreeTextAnswer
              value={answerText}
              onChange={setAnswerText}
              disabled={submitting}
              minLength={MIN_TEXT_LENGTH}
            />
          ) : question.multipleChoiceOptions ? (
            <MultipleChoiceAnswer
              options={question.multipleChoiceOptions}
              selectedId={selectedOptionId}
              onChange={setSelectedOptionId}
              disabled={submitting}
            />
          ) : (
            <p className="text-slate-500 text-sm">No options available — switch to free text.</p>
          )}

          <SubmitBar
            onSubmit={handleSubmit}
            disabled={!canSubmit || submitting}
            loading={submitting}
            elapsed={timer.formatted}
          />
        </div>
      </div>
    </main>
  );
}
