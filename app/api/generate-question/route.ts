import { NextResponse } from 'next/server';
import { anthropic, MODEL, MAX_TOKENS_QUESTION } from '@/lib/anthropic';
import { buildQuestionGenerationPrompt } from '@/lib/prompts';
import type { GenerateQuestionRequest, InterviewQuestion } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body: GenerateQuestionRequest = await req.json();
    const { profile, config, previousQuestionIds } = body;

    if (!profile || !config) {
      return NextResponse.json({ error: 'Missing profile or config' }, { status: 400 });
    }

    const prompt = buildQuestionGenerationPrompt(profile, config, previousQuestionIds ?? []);

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS_QUESTION,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response type from AI' }, { status: 500 });
    }

    let question: InterviewQuestion;
    try {
      // Strip any accidental markdown code fences
      const raw = content.text.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
      question = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI response as JSON', raw: content.text },
        { status: 500 }
      );
    }

    return NextResponse.json({ question });
  } catch (err) {
    console.error('[generate-question]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
