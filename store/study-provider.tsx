import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useReducer, type PropsWithChildren } from 'react';

import { chapterKey } from '@/features/learning/selectors';
import type {
  ContinueLearningState,
  FlashcardConfidence,
  QuizMissedQuestionState,
  QuizResult,
  StudyProgress,
} from '@/content/schema';

const STORAGE_KEY = 'learnhub.study-progress.v1';

const initialState: StudyProgress = {
  completedChapterKeys: [],
  openedChapterKeys: [],
  bookmarks: [],
  quizResults: {},
  quizReviewState: {},
  reviewedFlashcards: {},
  flashcardConfidence: {},
};

type Action =
  | { type: 'hydrate'; value: StudyProgress }
  | { type: 'complete'; unitId: string; chapterId: string }
  | { type: 'bookmark'; unitId: string; chapterId: string }
  | { type: 'review-card'; unitId: string; chapterId: string; flashcardId: string }
  | {
      type: 'flashcard-confidence';
      unitId: string;
      chapterId: string;
      flashcardId: string;
      confidence: FlashcardConfidence;
    }
  | { type: 'quiz-result'; result: QuizResult }
  | {
      type: 'quiz-review-state';
      unitId: string;
      chapterId: string;
      missedQuestions: QuizMissedQuestionState[];
      questionOrder: string[];
    }
  | { type: 'review-missed'; unitId: string; chapterId: string; questionIds?: string[] }
  | { type: 'visit'; value: ContinueLearningState };

function ensureKey(values: string[], key: string) {
  return values.includes(key) ? values : [...values, key];
}

function normalizeStudyProgress(value: Partial<StudyProgress> | undefined): StudyProgress {
  return {
    ...initialState,
    ...value,
    completedChapterKeys: value?.completedChapterKeys ?? [],
    openedChapterKeys: value?.openedChapterKeys ?? [],
    bookmarks: value?.bookmarks ?? [],
    quizResults: value?.quizResults ?? {},
    quizReviewState: value?.quizReviewState ?? {},
    reviewedFlashcards: value?.reviewedFlashcards ?? {},
    flashcardConfidence: value?.flashcardConfidence ?? {},
    lastVisited: value?.lastVisited,
  };
}

function reducer(state: StudyProgress, action: Action): StudyProgress {
  switch (action.type) {
    case 'hydrate':
      return action.value;
    case 'complete': {
      const key = chapterKey(action.unitId, action.chapterId);
      if (state.completedChapterKeys.includes(key) && state.openedChapterKeys.includes(key)) {
        return state;
      }

      return {
        ...state,
        completedChapterKeys: ensureKey(state.completedChapterKeys, key),
        openedChapterKeys: ensureKey(state.openedChapterKeys, key),
      };
    }
    case 'bookmark': {
      const key = chapterKey(action.unitId, action.chapterId);
      const alreadyBookmarked = state.bookmarks.some((bookmark) => bookmark.chapterKey === key);

      return {
        ...state,
        bookmarks: alreadyBookmarked
          ? state.bookmarks.filter((bookmark) => bookmark.chapterKey !== key)
          : [...state.bookmarks, { chapterKey: key, createdAt: new Date().toISOString() }],
      };
    }
    case 'review-card': {
      const key = chapterKey(action.unitId, action.chapterId);
      const existing = state.reviewedFlashcards[key] ?? [];
      if (existing.includes(action.flashcardId)) {
        return {
          ...state,
          openedChapterKeys: ensureKey(state.openedChapterKeys, key),
        };
      }

      return {
        ...state,
        openedChapterKeys: ensureKey(state.openedChapterKeys, key),
        reviewedFlashcards: {
          ...state.reviewedFlashcards,
          [key]: [...existing, action.flashcardId],
        },
      };
    }
    case 'flashcard-confidence': {
      const key = chapterKey(action.unitId, action.chapterId);
      const chapterConfidence = state.flashcardConfidence[key] ?? {};

      return {
        ...state,
        openedChapterKeys: ensureKey(state.openedChapterKeys, key),
        flashcardConfidence: {
          ...state.flashcardConfidence,
          [key]: {
            ...chapterConfidence,
            [action.flashcardId]: action.confidence,
          },
        },
      };
    }
    case 'quiz-result': {
      const openedKeys = ensureKey(state.openedChapterKeys, action.result.chapterKey);

      return {
        ...state,
        openedChapterKeys: openedKeys,
        quizResults: {
          ...state.quizResults,
          [action.result.chapterKey]: action.result,
        },
      };
    }
    case 'quiz-review-state': {
      const key = chapterKey(action.unitId, action.chapterId);

      return {
        ...state,
        openedChapterKeys: ensureKey(state.openedChapterKeys, key),
        quizReviewState: {
          ...state.quizReviewState,
          [key]: {
            missedQuestions: action.missedQuestions,
            reviewedQuestionIds: action.missedQuestions.length
              ? state.quizReviewState[key]?.reviewedQuestionIds?.filter((questionId) =>
                  action.missedQuestions.some((question) => question.questionId === questionId)
                ) ?? []
              : [],
            lastAttemptQuestionIds: action.questionOrder,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    }
    case 'review-missed': {
      const key = chapterKey(action.unitId, action.chapterId);
      const reviewState = state.quizReviewState[key];
      if (!reviewState) {
        return state;
      }

      const questionIds =
        action.questionIds?.length
          ? action.questionIds
          : reviewState.missedQuestions.map((question) => question.questionId);
      const reviewedQuestionIds = Array.from(
        new Set([...reviewState.reviewedQuestionIds, ...questionIds])
      );

      return {
        ...state,
        quizReviewState: {
          ...state.quizReviewState,
          [key]: {
            ...reviewState,
            reviewedQuestionIds,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    }
    case 'visit': {
      const key = chapterKey(action.value.unitId, action.value.chapterId);

      return {
        ...state,
        openedChapterKeys: ensureKey(state.openedChapterKeys, key),
        lastVisited: action.value,
      };
    }
    default:
      return state;
  }
}

interface StudyContextValue {
  progress: StudyProgress;
  isHydrated: boolean;
  markChapterComplete: (unitId: string, chapterId: string) => void;
  toggleBookmark: (unitId: string, chapterId: string) => void;
  markFlashcardReviewed: (unitId: string, chapterId: string, flashcardId: string) => void;
  setFlashcardConfidence: (
    unitId: string,
    chapterId: string,
    flashcardId: string,
    confidence: FlashcardConfidence
  ) => void;
  saveQuizResult: (unitId: string, chapterId: string, score: number, totalQuestions: number) => void;
  saveQuizReviewState: (
    unitId: string,
    chapterId: string,
    missedQuestions: QuizMissedQuestionState[],
    questionOrder: string[]
  ) => void;
  markMissedQuestionsReviewed: (unitId: string, chapterId: string, questionIds?: string[]) => void;
  setLastVisited: (value: ContinueLearningState) => void;
}

const StudyContext = createContext<StudyContextValue | null>(null);

export function StudyProvider({ children }: PropsWithChildren) {
  const [progress, dispatch] = useReducer(reducer, initialState);
  const [isHydrated, setIsHydrated] = useReducer(() => true, false);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!isMounted) {
          return;
        }

        if (raw) {
          dispatch({ type: 'hydrate', value: normalizeStudyProgress(JSON.parse(raw) as StudyProgress) });
        }
      } finally {
        if (isMounted) {
          setIsHydrated();
        }
      }
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress)).catch(() => undefined);
  }, [isHydrated, progress]);

  return (
    <StudyContext.Provider
      value={{
        progress,
        isHydrated,
        markChapterComplete: (unitId, chapterId) => {
          dispatch({ type: 'complete', unitId, chapterId });
        },
        toggleBookmark: (unitId, chapterId) => {
          dispatch({ type: 'bookmark', unitId, chapterId });
        },
        markFlashcardReviewed: (unitId, chapterId, flashcardId) => {
          dispatch({ type: 'review-card', unitId, chapterId, flashcardId });
        },
        setFlashcardConfidence: (unitId, chapterId, flashcardId, confidence) => {
          dispatch({
            type: 'flashcard-confidence',
            unitId,
            chapterId,
            flashcardId,
            confidence,
          });
        },
        saveQuizResult: (unitId, chapterId, score, totalQuestions) => {
          const key = chapterKey(unitId, chapterId);
          const previous = progress.quizResults[key];

          dispatch({
            type: 'quiz-result',
            result: {
              chapterKey: key,
              latestScore: score,
              bestScore: Math.max(previous?.bestScore ?? 0, score),
              totalQuestions,
              lastTakenAt: new Date().toISOString(),
            },
          });
        },
        saveQuizReviewState: (unitId, chapterId, missedQuestions, questionOrder) => {
          dispatch({
            type: 'quiz-review-state',
            unitId,
            chapterId,
            missedQuestions,
            questionOrder,
          });
        },
        markMissedQuestionsReviewed: (unitId, chapterId, questionIds) => {
          dispatch({ type: 'review-missed', unitId, chapterId, questionIds });
        },
        setLastVisited: (value) => {
          dispatch({ type: 'visit', value });
        },
      }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudyContext() {
  const context = useContext(StudyContext);

  if (!context) {
    throw new Error('useStudyContext must be used inside StudyProvider');
  }

  return context;
}
