'use client';

import type { EvaluateAnswerRequest, FeedbackResult } from '@/lib/types';

export async function streamEvaluation(
  body: EvaluateAnswerRequest,
  onToken: (token: string) => void,
  onComplete: (result: FeedbackResult) => void,
  onError: (error: Error) => void
): Promise<void> {
  try {
    const response = await fetch('/api/evaluate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulated = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      accumulated += chunk;
      onToken(chunk);
    }

    const result: FeedbackResult = JSON.parse(accumulated);
    onComplete(result);
  } catch (err) {
    onError(err instanceof Error ? err : new Error(String(err)));
  }
}
