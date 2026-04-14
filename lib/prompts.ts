import type { UserProfile, SessionConfig, InterviewQuestion, QuestionType } from './types';

export function buildQuestionGenerationPrompt(
  profile: UserProfile,
  config: SessionConfig,
  previousQuestionIds: string[]
): string {
  const personalizationBlock = `User Profile:
- Name: ${profile.name}
- Target Role: ${profile.targetRole}
- Industry: ${profile.industry}
- Years of Experience: ${profile.yearsExperience}
- Career Goals: ${profile.careerGoals || 'Not specified'}`;

  const jdBlock = config.jobDescription
    ? `\nJob Description Context:\n${config.jobDescription.slice(0, 2000)}`
    : '';

  const typeInstructions: Record<QuestionType, string> = {
    behavioral: `Generate a behavioral interview question using the STAR method framework. The question should ask the candidate to describe a past experience with "Tell me about a time when..." or "Describe a situation where..." framing. Also generate 4 plausible multiple-choice answer options (A-D) where option A represents an excellent STAR response with clear situation/task/action/result, option B is acceptable but missing one component, option C misses key elements and is vague, and option D is clearly weak or off-topic. Include 3 brief STAR hint prompts to guide the user (e.g., "What was the situation and your specific role?" for Situation/Task, "What concrete steps did you take?" for Action, "What was the measurable outcome?" for Result).`,
    case: `Generate an open-ended business case or analytical question appropriate for a ${config.difficulty} level ${profile.targetRole} interview in ${profile.industry}. The question should present a business scenario requiring structured analysis. Generate 4 multiple-choice options representing different analytical frameworks or approaches the candidate could take (e.g., MECE framework, market sizing approach, profitability analysis, etc.). Include 3 hints for structuring a strong response.`,
    situational: `Generate a situational judgment question describing a specific hypothetical workplace or professional scenario relevant to ${profile.targetRole} in ${profile.industry}. The question should present a realistic dilemma the candidate might face in their target role. Generate 4 response options representing different courses of action, ranging from excellent professional judgment (A) to poor judgment (D). Include 3 hints for thinking through the scenario.`,
  };

  return `You are an expert interview coach at a top-tier business school designing questions for a mock interview session.

${personalizationBlock}${jdBlock}

Question Type: ${config.questionType}
Difficulty Level: ${config.difficulty}
Previously used question IDs to avoid: ${previousQuestionIds.length > 0 ? previousQuestionIds.join(', ') : 'none'}

${typeInstructions[config.questionType]}

Calibrate the question difficulty appropriately:
- Easy: straightforward, common scenarios, broad questions
- Medium: nuanced situations requiring clear structure and judgment
- Hard: complex, multi-stakeholder, high-stakes scenarios requiring sophisticated responses

Respond with ONLY valid JSON matching this exact schema (no markdown, no explanation):
{
  "id": "<unique-kebab-case-id>",
  "text": "<the full interview question>",
  "type": "${config.questionType}",
  "difficulty": "${config.difficulty}",
  "hints": ["<hint 1>", "<hint 2>", "<hint 3>"],
  "multipleChoiceOptions": [
    { "id": "A", "text": "<option A - strong response>" },
    { "id": "B", "text": "<option B - acceptable response>" },
    { "id": "C", "text": "<option C - weak but plausible response>" },
    { "id": "D", "text": "<option D - poor response>" }
  ]
}`;
}

export function buildEvaluationPrompt(
  profile: UserProfile,
  question: InterviewQuestion,
  answerText: string,
  selectedOptionId?: string
): string {
  const personalizationBlock = `Candidate Profile:
- Name: ${profile.name}
- Target Role: ${profile.targetRole}
- Industry: ${profile.industry}
- Experience Level: ${profile.yearsExperience} years
- Career Goals: ${profile.careerGoals || 'Not specified'}`;

  const selectedOption = selectedOptionId
    ? question.multipleChoiceOptions?.find((o) => o.id === selectedOptionId)
    : null;

  const answerBlock = selectedOption
    ? `The candidate selected multiple-choice option ${selectedOptionId}: "${selectedOption.text}"`
    : `The candidate's free-text answer:\n"${answerText}"`;

  const starSection =
    question.type === 'behavioral'
      ? `\nThis is a behavioral question — evaluate each STAR component separately:
- Situation (0-3): Did they clearly describe the context and background?
- Task (0-3): Did they explain their specific role and responsibility?
- Action (0-3): Did they detail concrete, specific steps they personally took?
- Result (0-3): Did they describe a quantifiable or clearly positive outcome?

Include "starBreakdown" in your response with integer scores (0-3) and one-sentence feedback per component in the "feedback" field.`
      : '';

  const difficultyContext = {
    easy: 'This is an entry-level question. Expectations are for clear communication and basic structure.',
    medium: 'This is a mid-level question. Expectations are for structured thinking, specific examples, and demonstrated impact.',
    hard: 'This is a senior-level question. Expectations are for sophisticated analysis, strategic perspective, quantified results, and handling ambiguity.',
  };

  return `You are a professional interview coach at a top business school evaluating a candidate's interview response. Be constructive, encouraging but honest.

${personalizationBlock}

Interview Question (${question.type}, ${question.difficulty}):
"${question.text}"

${answerBlock}

Difficulty Context: ${difficultyContext[question.difficulty]}
${starSection}

Provide detailed, actionable feedback tailored to the candidate's target role (${profile.targetRole}) and industry (${profile.industry}). Calibrate your expectations to the difficulty level and the candidate's experience (${profile.yearsExperience} years). Focus on specific, actionable improvements rather than generic advice.

Respond with ONLY valid JSON matching this exact schema (no markdown, no explanation):
{
  "overallScore": <integer 0-100>,
  "summary": "<2-3 sentence overall assessment that is encouraging and role-specific>",
  "strengths": ["<specific strength 1>", "<specific strength 2>", "<specific strength 3 if applicable>"],
  "improvements": ["<specific improvement 1>", "<specific improvement 2>", "<specific improvement 3 if applicable>"],
  "starBreakdown": {
    "situation": <0-3>,
    "task": <0-3>,
    "action": <0-3>,
    "result": <0-3>,
    "feedback": "<one paragraph of specific STAR framework feedback>"
  },
  "modelAnswer": "<2-3 sentences describing what a strong answer would include, specific to this role and question>"
}

If the question type is NOT behavioral, omit the "starBreakdown" field entirely.`;
}
