'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type {
  SessionState,
  UserProfile,
  SessionConfig,
  InterviewQuestion,
  SessionAnswer,
  FeedbackResult,
} from '@/lib/types';

const initialState: SessionState = {
  profile: null,
  config: null,
  currentQuestion: null,
  answers: [],
  currentFeedback: null,
  isGeneratingQuestion: false,
  isEvaluating: false,
  streamingFeedback: '',
  questionCount: 0,
};

type SessionAction =
  | { type: 'SET_PROFILE'; payload: UserProfile }
  | { type: 'SET_CONFIG'; payload: SessionConfig }
  | { type: 'SET_QUESTION'; payload: InterviewQuestion }
  | { type: 'SUBMIT_ANSWER'; payload: SessionAnswer }
  | { type: 'SET_FEEDBACK'; payload: FeedbackResult }
  | { type: 'START_STREAMING' }
  | { type: 'APPEND_STREAM_TOKEN'; payload: string }
  | { type: 'FINISH_STREAM' }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'RESET_SESSION' };

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET_CONFIG':
      return { ...state, config: action.payload };
    case 'SET_QUESTION':
      return {
        ...state,
        currentQuestion: action.payload,
        currentFeedback: null,
        streamingFeedback: '',
        isGeneratingQuestion: false,
        questionCount: state.questionCount + 1,
      };
    case 'SUBMIT_ANSWER':
      return { ...state, answers: [...state.answers, action.payload] };
    case 'SET_FEEDBACK':
      return { ...state, currentFeedback: action.payload, isEvaluating: false };
    case 'START_STREAMING':
      return { ...state, isEvaluating: true, streamingFeedback: '', currentFeedback: null };
    case 'APPEND_STREAM_TOKEN':
      return { ...state, streamingFeedback: state.streamingFeedback + action.payload };
    case 'FINISH_STREAM':
      return { ...state, isEvaluating: false };
    case 'SET_GENERATING':
      return { ...state, isGeneratingQuestion: action.payload };
    case 'RESET_SESSION':
      return initialState;
    default:
      return state;
  }
}

interface SessionContextValue {
  state: SessionState;
  dispatch: React.Dispatch<SessionAction>;
  setProfile: (profile: UserProfile) => void;
  setConfig: (config: SessionConfig) => void;
  submitAnswer: (answer: SessionAnswer) => void;
  resetSession: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  const setProfile = (profile: UserProfile) => dispatch({ type: 'SET_PROFILE', payload: profile });
  const setConfig = (config: SessionConfig) => dispatch({ type: 'SET_CONFIG', payload: config });
  const submitAnswer = (answer: SessionAnswer) => dispatch({ type: 'SUBMIT_ANSWER', payload: answer });
  const resetSession = () => dispatch({ type: 'RESET_SESSION' });

  return (
    <SessionContext.Provider value={{ state, dispatch, setProfile, setConfig, submitAnswer, resetSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
