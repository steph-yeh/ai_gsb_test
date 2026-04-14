export type QuestionType = 'behavioral' | 'case' | 'situational';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type AnswerMode = 'free-text' | 'multiple-choice';

export interface UserProfile {
  name: string;
  targetRole: string;
  industry: string;
  yearsExperience: string;
  careerGoals: string;
}

export interface SessionConfig {
  questionType: QuestionType;
  difficulty: Difficulty;
  jobDescription: string;
  answerMode: AnswerMode;
}

export interface MultipleChoiceOption {
  id: string;
  text: string;
}

export interface InterviewQuestion {
  id: string;
  text: string;
  type: QuestionType;
  difficulty: Difficulty;
  hints?: string[];
  multipleChoiceOptions?: MultipleChoiceOption[];
}

export interface STARScore {
  situation: number;
  task: number;
  action: number;
  result: number;
  feedback: string;
}

export interface FeedbackResult {
  overallScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  starBreakdown?: STARScore;
  modelAnswer?: string;
}

export interface SessionAnswer {
  questionId: string;
  answerText: string;
  selectedOptionId?: string;
  submittedAt: number;
}

export interface SessionState {
  profile: UserProfile | null;
  config: SessionConfig | null;
  currentQuestion: InterviewQuestion | null;
  answers: SessionAnswer[];
  currentFeedback: FeedbackResult | null;
  isGeneratingQuestion: boolean;
  isEvaluating: boolean;
  streamingFeedback: string;
  questionCount: number;
}

export interface GenerateQuestionRequest {
  profile: UserProfile;
  config: SessionConfig;
  previousQuestionIds: string[];
}

export interface GenerateQuestionResponse {
  question: InterviewQuestion;
}

export interface EvaluateAnswerRequest {
  profile: UserProfile;
  question: InterviewQuestion;
  answerText: string;
  selectedOptionId?: string;
}
