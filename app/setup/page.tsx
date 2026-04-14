'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileForm } from '@/components/setup/ProfileForm';
import { SessionConfig } from '@/components/setup/SessionConfig';
import { Card } from '@/components/ui/Card';
import { useSession } from '@/context/SessionContext';
import type { UserProfile, SessionConfig as SessionConfigType, GenerateQuestionRequest } from '@/lib/types';
import Link from 'next/link';

export default function SetupPage() {
  const router = useRouter();
  const { state, setProfile, dispatch } = useSession();
  const [step, setStep] = useState<1 | 2>(1);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [error, setError] = useState('');

  const handleProfileSubmit = (profile: UserProfile) => {
    setProfile(profile);
    setStep(2);
  };

  const handleConfigSubmit = async (config: SessionConfigType) => {
    if (!state.profile) return;
    setLoadingQuestion(true);
    setError('');

    try {
      dispatch({ type: 'SET_CONFIG', payload: config });

      const body: GenerateQuestionRequest = {
        profile: state.profile,
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
      setError(err instanceof Error ? err.message : 'Failed to generate question. Please try again.');
      setLoadingQuestion(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 py-12 px-6">
      {/* Back link */}
      <div className="max-w-xl mx-auto mb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Step indicator */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step === s
                    ? 'bg-indigo-600 text-white'
                    : step > s
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {step > s ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s
                )}
              </div>
              <span className={`text-sm font-medium ${step >= s ? 'text-slate-300' : 'text-slate-600'}`}>
                {s === 1 ? 'Your Profile' : 'Interview Setup'}
              </span>
              {s === 1 && <div className="w-8 h-px bg-slate-700 mx-1" />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        <Card padding="lg">
          {step === 1 ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h1>
              <p className="text-slate-400 text-sm mb-6">
                We&apos;ll use this to personalize your questions and feedback.
              </p>
              <ProfileForm onSubmit={handleProfileSubmit} />
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">Configure Your Interview</h1>
                  <p className="text-slate-400 text-sm mt-1">
                    Choose a question type and difficulty to get started.
                  </p>
                </div>
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}
              <SessionConfig onSubmit={handleConfigSubmit} loading={loadingQuestion} />
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
