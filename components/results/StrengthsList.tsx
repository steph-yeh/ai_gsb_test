interface StrengthsListProps {
  strengths: string[];
}

export function StrengthsList({ strengths }: StrengthsListProps) {
  if (!strengths.length) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2 mb-4">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        What You Did Well
      </h3>
      <ul className="space-y-3">
        {strengths.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold border border-emerald-500/20 mt-0.5">
              ✓
            </span>
            <p className="text-slate-300 text-sm leading-relaxed">{s}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
