import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-indigo-400 text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
          AI-Powered Interview Coach
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
          Ace Your Next
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Interview</span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Practice behavioral, case, and situational interview questions with real-time AI feedback.
          Tailored for MBA candidates targeting consulting, finance, and strategy roles.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/setup">
            <Button size="lg" className="w-full sm:w-auto">
              Start Practicing
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
          <a href="#features">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              See How It Works
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16 pt-10 border-t border-slate-800">
          {[
            { label: 'Question Types', value: '3' },
            { label: 'Difficulty Levels', value: '3' },
            { label: 'STAR Framework', value: '✓' },
            { label: 'AI Feedback', value: 'Live' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
