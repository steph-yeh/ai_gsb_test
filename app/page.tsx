import { Hero } from '@/components/landing/Hero';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Hero />
      <FeatureGrid />

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-800/30 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Prepare?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Start a personalized mock interview session in under a minute. No sign-up required.
          </p>
          <Link href="/setup">
            <Button size="lg">
              Begin Interview Practice
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <p className="text-center text-slate-600 text-sm">
          Powered by Claude AI &mdash; Built for MBA Interview Prep
        </p>
      </footer>
    </main>
  );
}
