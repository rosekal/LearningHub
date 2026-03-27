import type {
  Chapter,
  ContinueLearningState,
  LearningUnit,
  Subject,
  StudyProgress,
  Topic,
} from '@/content/schema';

export function chapterKey(unitId: string, chapterId: string) {
  return `${unitId}:${chapterId}`;
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

export function getQuizResult(progress: StudyProgress, unitId: string, chapterId: string) {
  return progress.quizResults[chapterKey(unitId, chapterId)];
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

export function getNextChapter(unit: LearningUnit, progress: StudyProgress): Chapter {
  return (
    unit.chapters.find((chapter) => !isChapterComplete(progress, unit.id, chapter.id)) ?? unit.chapters[0]
  );
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
    .find(({ unit }) => unit.chapters.some((chapter) => isChapterComplete(progress, unit.id, chapter.id)));

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
