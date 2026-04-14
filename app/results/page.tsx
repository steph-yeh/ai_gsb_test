'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/context/SessionContext';
import { FeedbackCard } from '@/components/results/FeedbackCard';
import { StrengthsList } from '@/components/results/StrengthsList';
import { ImprovementsList } from '@/components/results/ImprovementsList';
import { STAREvaluation } from '@/components/results/STAREvaluation';
import { StreamingText } from '@/components/results/StreamingText';
import { ActionBar } from '@/components/results/ActionBar';
import { Spinner } from '@/components/ui/Spinner';
import type { GenerateQuestionRequest } from '@/lib/types';

export default function ResultsPage() {
  const router = useRouter();
  const { state, dispatch, resetSession } = useSession();
  const [loadingNext, setLoadingNext] = useState(false);
  const [nextError, setNextError] = useState('');

  const { currentFeedback, isEvaluating, streamingFeedback, currentQuestion, profile, config } = state;

  useEffect(() => {
    if (!isEvaluating && !currentFeedback && !streamingFeedback) {
      router.replace('/interview');
    }
  }, [isEvaluating, currentFeedback, streamingFeedback, router]);

  const handleNextQuestion = async () => {
    if (!profile || !config) return;
    setLoadingNext(true);
    setNextError('');

    try {
      const body: GenerateQuestionRequest = {
        profile,
        config,
        previousQuestionIds: state.answers.map((a) => a.questionId),
      };

      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error ${res.status}`);
      }

      const data = await res.json();
      dispatch({ type: 'SET_QUESTION', payload: data.question });
      router.push('/interview');
    } catch (err) {
      setNextError(err instanceof Error ? err.message : 'Failed to generate question.');
      setLoadingNext(false);
    }
  };

  const handleStartOver = () => {
    resetSession();
    router.push('/');
  };

  if (!isEvaluating && !currentFeedback && !streamingFeedback) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 py-10 px-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-white">Interview Feedback</h1>
        {profile && (
          <span className="text-sm text-slate-500">
            <span className="text-slate-300">{profile.name}</span> · {profile.targetRole}
          </span>
        )}
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Question recap */}
        {currentQuestion && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Question</p>
            <p className="text-slate-300 text-sm leading-relaxed">{currentQuestion.text}</p>
          </div>
        )}

        {/* Live streaming state */}
        {isEvaluating && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Spinner size="sm" />
              <span className="text-sm text-slate-400">Analyzing your response...</span>
            </div>
            {streamingFeedback && (
              <StreamingText text={streamingFeedback} isStreaming={isEvaluating} />
            )}
          </div>
        )}

        {/* Structured feedback */}
        {currentFeedback && !isEvaluating && (
          <>
            <FeedbackCard feedback={currentFeedback} questionType={currentQuestion?.type ?? 'behavioral'} />
            <StrengthsList strengths={currentFeedback.strengths} />
            <ImprovementsList
              improvements={currentFeedback.improvements}
              modelAnswer={currentFeedback.modelAnswer}
            />
            {currentFeedback.starBreakdown && currentQuestion?.type === 'behavioral' && (
              <STAREvaluation starBreakdown={currentFeedback.starBreakdown} />
            )}
          </>
        )}

        {/* Error */}
        {nextError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {nextError}
          </div>
        )}

        {/* Action bar — only when not streaming */}
        {!isEvaluating && currentFeedback && (
          <ActionBar
            onNextQuestion={handleNextQuestion}
            onStartOver={handleStartOver}
            loadingNext={loadingNext}
            questionCount={state.questionCount}
          />
        )}
      </div>
    </main>
  );
}
