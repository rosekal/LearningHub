import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useReducer, type PropsWithChildren } from 'react';

import { chapterKey } from '@/features/learning/selectors';
import type { ContinueLearningState, QuizResult, StudyProgress } from '@/content/schema';

const STORAGE_KEY = 'learnhub.study-progress.v1';

const initialState: StudyProgress = {
  completedChapterKeys: [],
  bookmarks: [],
  quizResults: {},
  reviewedFlashcards: {},
};

type Action =
  | { type: 'hydrate'; value: StudyProgress }
  | { type: 'complete'; unitId: string; chapterId: string }
  | { type: 'bookmark'; unitId: string; chapterId: string }
  | { type: 'review-card'; unitId: string; chapterId: string; flashcardId: string }
  | { type: 'quiz-result'; result: QuizResult }
  | { type: 'visit'; value: ContinueLearningState };

function reducer(state: StudyProgress, action: Action): StudyProgress {
  switch (action.type) {
    case 'hydrate':
      return action.value;
    case 'complete': {
      const key = chapterKey(action.unitId, action.chapterId);
      if (state.completedChapterKeys.includes(key)) {
        return state;
      }

      return {
        ...state,
        completedChapterKeys: [...state.completedChapterKeys, key],
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
        return state;
      }

      return {
        ...state,
        reviewedFlashcards: {
          ...state.reviewedFlashcards,
          [key]: [...existing, action.flashcardId],
        },
      };
    }
    case 'quiz-result': {
      return {
        ...state,
        quizResults: {
          ...state.quizResults,
          [action.result.chapterKey]: action.result,
        },
      };
    }
    case 'visit':
      return {
        ...state,
        lastVisited: action.value,
      };
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
  saveQuizResult: (unitId: string, chapterId: string, score: number, totalQuestions: number) => void;
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
        if (!raw || !isMounted) {
          return;
        }

        dispatch({ type: 'hydrate', value: JSON.parse(raw) as StudyProgress });
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
