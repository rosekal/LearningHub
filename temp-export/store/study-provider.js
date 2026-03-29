"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyProvider = StudyProvider;
exports.useStudyContext = useStudyContext;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const react_1 = require("react");
const selectors_1 = require("@/features/learning/selectors");
const STORAGE_KEY = 'learnhub.study-progress.v1';
const initialState = {
    completedChapterKeys: [],
    openedChapterKeys: [],
    bookmarks: [],
    quizResults: {},
    quizReviewState: {},
    reviewedFlashcards: {},
    flashcardConfidence: {},
};
function ensureKey(values, key) {
    return values.includes(key) ? values : [...values, key];
}
function normalizeStudyProgress(value) {
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
function reducer(state, action) {
    switch (action.type) {
        case 'hydrate':
            return action.value;
        case 'complete': {
            const key = (0, selectors_1.chapterKey)(action.unitId, action.chapterId);
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
            const key = (0, selectors_1.chapterKey)(action.unitId, action.chapterId);
            const alreadyBookmarked = state.bookmarks.some((bookmark) => bookmark.chapterKey === key);
            return {
                ...state,
                bookmarks: alreadyBookmarked
                    ? state.bookmarks.filter((bookmark) => bookmark.chapterKey !== key)
                    : [...state.bookmarks, { chapterKey: key, createdAt: new Date().toISOString() }],
            };
        }
        case 'review-card': {
            const key = (0, selectors_1.chapterKey)(action.unitId, action.chapterId);
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
            const key = (0, selectors_1.chapterKey)(action.unitId, action.chapterId);
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
            const key = (0, selectors_1.chapterKey)(action.unitId, action.chapterId);
            return {
                ...state,
                openedChapterKeys: ensureKey(state.openedChapterKeys, key),
                quizReviewState: {
                    ...state.quizReviewState,
                    [key]: {
                        missedQuestions: action.missedQuestions,
                        reviewedQuestionIds: action.missedQuestions.length
                            ? state.quizReviewState[key]?.reviewedQuestionIds?.filter((questionId) => action.missedQuestions.some((question) => question.questionId === questionId)) ?? []
                            : [],
                        lastAttemptQuestionIds: action.questionOrder,
                        updatedAt: new Date().toISOString(),
                    },
                },
            };
        }
        case 'review-missed': {
            const key = (0, selectors_1.chapterKey)(action.unitId, action.chapterId);
            const reviewState = state.quizReviewState[key];
            if (!reviewState) {
                return state;
            }
            const questionIds = action.questionIds?.length
                ? action.questionIds
                : reviewState.missedQuestions.map((question) => question.questionId);
            const reviewedQuestionIds = Array.from(new Set([...reviewState.reviewedQuestionIds, ...questionIds]));
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
            const key = (0, selectors_1.chapterKey)(action.value.unitId, action.value.chapterId);
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
const StudyContext = (0, react_1.createContext)(null);
function StudyProvider({ children }) {
    const [progress, dispatch] = (0, react_1.useReducer)(reducer, initialState);
    const [isHydrated, setIsHydrated] = (0, react_1.useReducer)(() => true, false);
    (0, react_1.useEffect)(() => {
        let isMounted = true;
        async function hydrate() {
            try {
                const raw = await async_storage_1.default.getItem(STORAGE_KEY);
                if (!isMounted) {
                    return;
                }
                if (raw) {
                    dispatch({ type: 'hydrate', value: normalizeStudyProgress(JSON.parse(raw)) });
                }
            }
            finally {
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
    (0, react_1.useEffect)(() => {
        if (!isHydrated) {
            return;
        }
        async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify(progress)).catch(() => undefined);
    }, [isHydrated, progress]);
    return (<StudyContext.Provider value={{
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
                const key = (0, selectors_1.chapterKey)(unitId, chapterId);
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
    </StudyContext.Provider>);
}
function useStudyContext() {
    const context = (0, react_1.useContext)(StudyContext);
    if (!context) {
        throw new Error('useStudyContext must be used inside StudyProvider');
    }
    return context;
}
