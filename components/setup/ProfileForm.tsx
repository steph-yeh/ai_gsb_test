'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import type { UserProfile } from '@/lib/types';

interface ProfileFormProps {
  initialProfile?: Partial<UserProfile>;
  onSubmit: (profile: UserProfile) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  targetRole: 'MBA Candidate / Associate',
  industry: 'Consulting / Strategy',
  yearsExperience: '3-5',
  careerGoals: '',
};

const EXPERIENCE_OPTIONS = ['0-2', '3-5', '6-10', '10+'];
const INDUSTRY_OPTIONS = [
  'Consulting / Strategy',
  'Investment Banking / Finance',
  'Private Equity / Venture Capital',
  'Technology / Product',
  'Consumer Goods / Retail',
  'Healthcare / Life Sciences',
  'Real Estate / Infrastructure',
  'General Management',
  'Other',
];

export function ProfileForm({ initialProfile, onSubmit }: ProfileFormProps) {
  const [form, setForm] = useState<UserProfile>({ ...DEFAULT_PROFILE, ...initialProfile });

  const update = (field: keyof UserProfile, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="e.g. Alex Johnson"
          required
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Target Role</label>
        <input
          type="text"
          value={form.targetRole}
          onChange={(e) => update('targetRole', e.target.value)}
          placeholder="e.g. Strategy Consultant, Investment Banking Analyst"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Industry</label>
        <select
          value={form.industry}
          onChange={(e) => update('industry', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors appearance-none"
        >
          {INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Years of Experience</label>
        <div className="grid grid-cols-4 gap-2">
          {EXPERIENCE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => update('yearsExperience', opt)}
              className={`py-2.5 rounded-xl text-sm font-medium border transition-all duration-150 ${
                form.yearsExperience === opt
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <Textarea
        label="Career Goals (Optional)"
        hint="Brief context to help personalize your questions and feedback"
        value={form.careerGoals}
        onChange={(e) => update('careerGoals', e.target.value)}
        placeholder="e.g. Transitioning into strategy consulting post-MBA, targeting MBB firms"
        rows={3}
        maxChars={200}
        charCount={form.careerGoals.length}
      />

      <Button type="submit" size="lg" className="w-full" disabled={!form.name.trim()}>
        Continue to Interview Setup
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Button>

      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'Candidate',
            targetRole: 'MBA Candidate',
            industry: 'Consulting / Strategy',
            yearsExperience: '3-5',
            careerGoals: '',
          })
        }
        className="w-full text-sm text-slate-500 hover:text-slate-400 transition-colors py-1"
      >
        Skip personalization →
      </button>
    </form>
  );
}
