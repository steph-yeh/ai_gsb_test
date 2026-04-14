'use client';

import { twMerge } from 'tailwind-merge';

interface StreamingTextProps {
  text: string;
  isStreaming: boolean;
  className?: string;
}

export function StreamingText({ text, isStreaming, className }: StreamingTextProps) {
  return (
    <div className={twMerge('text-slate-300 text-sm leading-relaxed font-mono whitespace-pre-wrap break-words', className)}>
      {text}
      {isStreaming && (
        <span className="inline-block w-2 h-4 bg-indigo-400 ml-0.5 animate-pulse rounded-sm" />
      )}
    </div>
  );
}
