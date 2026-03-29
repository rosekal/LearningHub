import type {
  Chapter,
  ContinueLearningState,
  FlashcardConfidence,
  LearningUnit,
  QuizResult,
  StudyProgress,
  Subject,
  Topic,
} from '@/content/schema';

export const QUIZ_PASS_PERCENTAGE = 0.7;

export type UnitStudyStatus =
  | 'completed'
  | 'needs-review'
  | 'in-progress'
  | 'not-started';

export interface ChapterMasteryStatus {
  opened: boolean;
  completed: boolean;
  quizPassed: boolean;
  needsReview: boolean;
  reviewedFlashcards: number;
  totalFlashcards: number;
  hardFlashcards: number;
}

export interface RecommendedLearningAction {
  subjectId: string;
  topicId: string;
  unitId: string;
  chapterId: string;
  reason: string;
  scope: 'library' | 'subject' | 'topic';
  isStartHere?: boolean;
  prerequisiteLabel?: string;
}

export function chapterKey(unitId: string, chapterId: string) {
  return `${unitId}:${chapterId}`;
}

export function isChapterOpened(progress: StudyProgress, unitId: string, chapterId: string) {
  return progress.openedChapterKeys.includes(chapterKey(unitId, chapterId));
}

export function isChapterComplete(progress: StudyProgress, unitId: string, chapterId: string) {
  return progress.completedChapterKeys.includes(chapterKey(unitId, chapterId));
}

export function isChapterBookmarked(progress: StudyProgress, unitId: string, chapterId: string) {
  return progress.bookmarks.some((bookmark) => bookmark.chapterKey === chapterKey(unitId, chapterId));
}

export function getReviewedFlashcardCount(
  progress: StudyProgress,
  unitId: string,
  chapterId: string
) {
  return progress.reviewedFlashcards[chapterKey(unitId, chapterId)]?.length ?? 0;
}

export function getFlashcardConfidence(
  progress: StudyProgress,
  unitId: string,
  chapterId: string,
  flashcardId: string
): FlashcardConfidence | undefined {
  return progress.flashcardConfidence[chapterKey(unitId, chapterId)]?.[flashcardId];
}

export function getFlashcardConfidenceSummary(
  progress: StudyProgress,
  unitId: string,
  chapterId: string
) {
  const confidence = progress.flashcardConfidence[chapterKey(unitId, chapterId)] ?? {};
  const values = Object.values(confidence);

  return {
    easy: values.filter((value) => value === 'easy').length,
    unsure: values.filter((value) => value === 'unsure').length,
    hard: values.filter((value) => value === 'hard').length,
  };
}

export function getQuizResult(progress: StudyProgress, unitId: string, chapterId: string) {
  return progress.quizResults[chapterKey(unitId, chapterId)];
}

export function getQuizReviewState(progress: StudyProgress, unitId: string, chapterId: string) {
  return progress.quizReviewState[chapterKey(unitId, chapterId)];
}

export function didPassQuiz(result?: QuizResult) {
  if (!result || result.totalQuestions === 0) {
    return false;
  }

  return result.bestScore / result.totalQuestions >= QUIZ_PASS_PERCENTAGE;
}

export function hasChapterNeedsReview(progress: StudyProgress, unitId: string, chapterId: string) {
  const reviewState = getQuizReviewState(progress, unitId, chapterId);
  if (!reviewState) {
    return false;
  }

  return reviewState.missedQuestions.some(
    (question) => !reviewState.reviewedQuestionIds.includes(question.questionId)
  );
}

export function getChapterMasteryStatus(
  progress: StudyProgress,
  unit: LearningUnit,
  chapter: Chapter
): ChapterMasteryStatus {
  const quizResult = getQuizResult(progress, unit.id, chapter.id);
  const confidenceSummary = getFlashcardConfidenceSummary(progress, unit.id, chapter.id);

  return {
    opened: isChapterOpened(progress, unit.id, chapter.id),
    completed: isChapterComplete(progress, unit.id, chapter.id),
    quizPassed: didPassQuiz(quizResult),
    needsReview: hasChapterNeedsReview(progress, unit.id, chapter.id),
    reviewedFlashcards: getReviewedFlashcardCount(progress, unit.id, chapter.id),
    totalFlashcards: chapter.flashcards.length,
    hardFlashcards: confidenceSummary.hard,
  };
}

export function getUnitProgress(progress: StudyProgress, unit: LearningUnit) {
  const total = unit.chapters.length;
  const completed = unit.chapters.filter((chapter) =>
    isChapterComplete(progress, unit.id, chapter.id)
  ).length;

  return {
    completed,
    total,
    percentage: total === 0 ? 0 : (completed / total) * 100,
  };
}

export function getUnitMastery(progress: StudyProgress, unit: LearningUnit) {
  const chapterStates = unit.chapters.map((chapter) => getChapterMasteryStatus(progress, unit, chapter));

  return {
    opened: chapterStates.filter((state) => state.opened).length,
    completed: chapterStates.filter((state) => state.completed).length,
    quizPassed: chapterStates.filter((state) => state.quizPassed).length,
    needsReview: chapterStates.filter((state) => state.needsReview).length,
    total: unit.chapters.length,
  };
}

export function getUnitStudyStatus(progress: StudyProgress, unit: LearningUnit): UnitStudyStatus {
  const mastery = getUnitMastery(progress, unit);

  if (mastery.completed === mastery.total && mastery.quizPassed === mastery.total && mastery.needsReview === 0) {
    return 'completed';
  }

  if (mastery.needsReview > 0) {
    return 'needs-review';
  }

  if (mastery.opened > 0 || mastery.completed > 0 || mastery.quizPassed > 0) {
    return 'in-progress';
  }

  return 'not-started';
}

export function isUnitBookmarked(progress: StudyProgress, unit: LearningUnit) {
  return unit.chapters.some((chapter) => isChapterBookmarked(progress, unit.id, chapter.id));
}

export function getTopicProgress(progress: StudyProgress, topic: Topic) {
  const chapters = topic.learningUnits.flatMap((unit) => unit.chapters.map((chapter) => ({ unit, chapter })));
  const completed = chapters.filter(({ unit, chapter }) =>
    isChapterComplete(progress, unit.id, chapter.id)
  ).length;

  return {
    completed,
    total: chapters.length,
    percentage: chapters.length === 0 ? 0 : (completed / chapters.length) * 100,
  };
}

export function getTopicMastery(progress: StudyProgress, topic: Topic) {
  const mastery = topic.learningUnits.map((unit) => getUnitMastery(progress, unit));

  return {
    opened: mastery.reduce((sum, entry) => sum + entry.opened, 0),
    completed: mastery.reduce((sum, entry) => sum + entry.completed, 0),
    quizPassed: mastery.reduce((sum, entry) => sum + entry.quizPassed, 0),
    needsReview: mastery.reduce((sum, entry) => sum + entry.needsReview, 0),
    total: mastery.reduce((sum, entry) => sum + entry.total, 0),
  };
}

export function getSubjectProgress(progress: StudyProgress, subject: Subject) {
  const allUnits = subject.topics.flatMap((topic) => topic.learningUnits);
  const chapters = allUnits.flatMap((unit) => unit.chapters.map((chapter) => ({ unit, chapter })));
  const completed = chapters.filter(({ unit, chapter }) =>
    isChapterComplete(progress, unit.id, chapter.id)
  ).length;

  return {
    completed,
    total: chapters.length,
    percentage: chapters.length === 0 ? 0 : (completed / chapters.length) * 100,
  };
}

export function getSubjectMastery(progress: StudyProgress, subject: Subject) {
  const mastery = subject.topics.map((topic) => getTopicMastery(progress, topic));

  return {
    opened: mastery.reduce((sum, entry) => sum + entry.opened, 0),
    completed: mastery.reduce((sum, entry) => sum + entry.completed, 0),
    quizPassed: mastery.reduce((sum, entry) => sum + entry.quizPassed, 0),
    needsReview: mastery.reduce((sum, entry) => sum + entry.needsReview, 0),
    total: mastery.reduce((sum, entry) => sum + entry.total, 0),
  };
}

export function getNextChapter(unit: LearningUnit, progress: StudyProgress): Chapter {
  return (
    unit.chapters.find((chapter) => !isChapterComplete(progress, unit.id, chapter.id)) ?? unit.chapters[0]
  );
}

function getFirstRecommendedTopic(subject: Subject) {
  return (
    subject.topics.find((topic) => topic.id === subject.recommendedFirstTopicId) ??
    subject.topics[0]
  );
}

function getFirstRecommendedUnit(topic: Topic) {
  return (
    topic.learningUnits.find((unit) => unit.id === topic.recommendedFirstUnitId) ??
    topic.learningUnits[0]
  );
}

function buildPrerequisiteLabel(unit: LearningUnit, topic: Topic) {
  const prerequisiteId = unit.prerequisiteUnitIds?.[0];
  if (!prerequisiteId) {
    return topic.prerequisiteTopicIds?.length ? `Recommended after ${topic.prerequisiteTopicIds.length} earlier topic${topic.prerequisiteTopicIds.length === 1 ? '' : 's'}` : undefined;
  }

  const prerequisite = topic.learningUnits.find((candidate) => candidate.id === prerequisiteId);
  return prerequisite ? `Recommended after ${prerequisite.title}` : undefined;
}

export function getRecommendedActionForTopic(
  progress: StudyProgress,
  subject: Subject,
  topic: Topic
): RecommendedLearningAction {
  const inProgressUnit = topic.learningUnits.find((unit) => {
    const status = getUnitStudyStatus(progress, unit);
    return status === 'needs-review' || status === 'in-progress';
  });

  if (inProgressUnit) {
    const chapter = getNextChapter(inProgressUnit, progress);
    return {
      subjectId: subject.id,
      topicId: topic.id,
      unitId: inProgressUnit.id,
      chapterId: chapter.id,
      reason:
        getUnitStudyStatus(progress, inProgressUnit) === 'needs-review'
          ? 'Needs review before the topic is truly secure.'
          : 'Continue where progress has already started.',
      scope: 'topic',
      prerequisiteLabel: buildPrerequisiteLabel(inProgressUnit, topic),
    };
  }

  const startUnit = getFirstRecommendedUnit(topic);
  const chapter = getNextChapter(startUnit, progress);

  return {
    subjectId: subject.id,
    topicId: topic.id,
    unitId: startUnit.id,
    chapterId: chapter.id,
    reason: 'Start here to follow the intended sequence for this topic.',
    scope: 'topic',
    isStartHere: true,
    prerequisiteLabel: buildPrerequisiteLabel(startUnit, topic),
  };
}

export function getRecommendedActionForSubject(
  progress: StudyProgress,
  subject: Subject
): RecommendedLearningAction {
  const topicWithProgress = subject.topics.find((topic) =>
    topic.learningUnits.some((unit) => getUnitStudyStatus(progress, unit) !== 'not-started')
  );

  if (topicWithProgress) {
    const action = getRecommendedActionForTopic(progress, subject, topicWithProgress);
    return {
      ...action,
      scope: 'subject',
    };
  }

  const startTopic = getFirstRecommendedTopic(subject);
  const startUnit = getFirstRecommendedUnit(startTopic);
  const chapter = getNextChapter(startUnit, progress);

  return {
    subjectId: subject.id,
    topicId: startTopic.id,
    unitId: startUnit.id,
    chapterId: chapter.id,
    reason: 'Start here for the cleanest introduction to this subject.',
    scope: 'subject',
    isStartHere: true,
    prerequisiteLabel: buildPrerequisiteLabel(startUnit, startTopic),
  };
}

export function getContinueLearningState(
  progress: StudyProgress,
  subjects: Subject[]
): ContinueLearningState | undefined {
  if (progress.lastVisited) {
    return progress.lastVisited;
  }

  const unitWithProgress = subjects
    .flatMap((subject) =>
      subject.topics.flatMap((topic) =>
        topic.learningUnits.map((unit) => ({
          subjectId: subject.id,
          topicId: topic.id,
          unit,
        }))
      )
    )
    .find(({ unit }) => getUnitStudyStatus(progress, unit) !== 'not-started');

  if (!unitWithProgress) {
    return undefined;
  }

  const next = getNextChapter(unitWithProgress.unit, progress);

  return {
    subjectId: unitWithProgress.subjectId,
    topicId: unitWithProgress.topicId,
    unitId: unitWithProgress.unit.id,
    chapterId: next.id,
    updatedAt: new Date().toISOString(),
  };
}

export function getRecommendedActionForLibrary(
  progress: StudyProgress,
  subjects: Subject[]
): RecommendedLearningAction | undefined {
  const continueState = getContinueLearningState(progress, subjects);

  if (continueState) {
    return {
      ...continueState,
      reason: 'Resume the next chapter from your local study trail.',
      scope: 'library',
    };
  }

  const firstSubject = subjects[0];
  if (!firstSubject) {
    return undefined;
  }

  const action = getRecommendedActionForSubject(progress, firstSubject);
  return {
    ...action,
    scope: 'library',
  };
}
