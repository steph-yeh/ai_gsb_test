import { anthropic, MODEL, MAX_TOKENS_FEEDBACK } from '@/lib/anthropic';
import { buildEvaluationPrompt } from '@/lib/prompts';
import type { EvaluateAnswerRequest } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body: EvaluateAnswerRequest = await req.json();
    const { profile, question, answerText, selectedOptionId } = body;

    if (!profile || !question) {
      return new Response(JSON.stringify({ error: 'Missing profile or question' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const prompt = buildEvaluationPrompt(profile, question, answerText ?? '', selectedOptionId);

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS_FEEDBACK,
      messages: [{ role: 'user', content: prompt }],
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(new TextEncoder().encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err) {
    console.error('[evaluate-answer]', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
