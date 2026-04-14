interface ImprovementsListProps {
  improvements: string[];
  modelAnswer?: string;
}

export function ImprovementsList({ improvements, modelAnswer }: ImprovementsListProps) {
  if (!improvements.length) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2 mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          Key Points to Strengthen
        </h3>
        <ul className="space-y-3">
          {improvements.map((imp, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold border border-amber-500/20 mt-0.5">
                {i + 1}
              </span>
              <p className="text-slate-300 text-sm leading-relaxed">{imp}</p>
            </li>
          ))}
        </ul>
      </div>

      {modelAnswer && (
        <div className="pt-4 border-t border-slate-800">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            What a Strong Answer Includes
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed italic">{modelAnswer}</p>
        </div>
      )}
    </div>
  );
}
