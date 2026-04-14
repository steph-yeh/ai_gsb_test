import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const MODEL = 'claude-sonnet-4-6';
export const MAX_TOKENS_QUESTION = 1024;
export const MAX_TOKENS_FEEDBACK = 2048;
