"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUIZ_PASS_PERCENTAGE = void 0;
exports.chapterKey = chapterKey;
exports.isChapterOpened = isChapterOpened;
exports.isChapterComplete = isChapterComplete;
exports.isChapterBookmarked = isChapterBookmarked;
exports.getReviewedFlashcardCount = getReviewedFlashcardCount;
exports.getFlashcardConfidence = getFlashcardConfidence;
exports.getFlashcardConfidenceSummary = getFlashcardConfidenceSummary;
exports.getQuizResult = getQuizResult;
exports.getQuizReviewState = getQuizReviewState;
exports.didPassQuiz = didPassQuiz;
exports.hasChapterNeedsReview = hasChapterNeedsReview;
exports.getChapterMasteryStatus = getChapterMasteryStatus;
exports.getUnitProgress = getUnitProgress;
exports.getUnitMastery = getUnitMastery;
exports.getUnitStudyStatus = getUnitStudyStatus;
exports.isUnitBookmarked = isUnitBookmarked;
exports.getTopicProgress = getTopicProgress;
exports.getTopicMastery = getTopicMastery;
exports.getSubjectProgress = getSubjectProgress;
exports.getSubjectMastery = getSubjectMastery;
exports.getNextChapter = getNextChapter;
exports.getRecommendedActionForTopic = getRecommendedActionForTopic;
exports.getRecommendedActionForSubject = getRecommendedActionForSubject;
exports.getContinueLearningState = getContinueLearningState;
exports.getRecommendedActionForLibrary = getRecommendedActionForLibrary;
exports.QUIZ_PASS_PERCENTAGE = 0.7;
function chapterKey(unitId, chapterId) {
    return `${unitId}:${chapterId}`;
}
function isChapterOpened(progress, unitId, chapterId) {
    return progress.openedChapterKeys.includes(chapterKey(unitId, chapterId));
}
function isChapterComplete(progress, unitId, chapterId) {
    return progress.completedChapterKeys.includes(chapterKey(unitId, chapterId));
}
function isChapterBookmarked(progress, unitId, chapterId) {
    return progress.bookmarks.some((bookmark) => bookmark.chapterKey === chapterKey(unitId, chapterId));
}
function getReviewedFlashcardCount(progress, unitId, chapterId) {
    return progress.reviewedFlashcards[chapterKey(unitId, chapterId)]?.length ?? 0;
}
function getFlashcardConfidence(progress, unitId, chapterId, flashcardId) {
    return progress.flashcardConfidence[chapterKey(unitId, chapterId)]?.[flashcardId];
}
function getFlashcardConfidenceSummary(progress, unitId, chapterId) {
    const confidence = progress.flashcardConfidence[chapterKey(unitId, chapterId)] ?? {};
    const values = Object.values(confidence);
    return {
        easy: values.filter((value) => value === 'easy').length,
        unsure: values.filter((value) => value === 'unsure').length,
        hard: values.filter((value) => value === 'hard').length,
    };
}
function getQuizResult(progress, unitId, chapterId) {
    return progress.quizResults[chapterKey(unitId, chapterId)];
}
function getQuizReviewState(progress, unitId, chapterId) {
    return progress.quizReviewState[chapterKey(unitId, chapterId)];
}
function didPassQuiz(result) {
    if (!result || result.totalQuestions === 0) {
        return false;
    }
    return result.bestScore / result.totalQuestions >= exports.QUIZ_PASS_PERCENTAGE;
}
function hasChapterNeedsReview(progress, unitId, chapterId) {
    const reviewState = getQuizReviewState(progress, unitId, chapterId);
    if (!reviewState) {
        return false;
    }
    return reviewState.missedQuestions.some((question) => !reviewState.reviewedQuestionIds.includes(question.questionId));
}
function getChapterMasteryStatus(progress, unit, chapter) {
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
function getUnitProgress(progress, unit) {
    const total = unit.chapters.length;
    const completed = unit.chapters.filter((chapter) => isChapterComplete(progress, unit.id, chapter.id)).length;
    return {
        completed,
        total,
        percentage: total === 0 ? 0 : (completed / total) * 100,
    };
}
function getUnitMastery(progress, unit) {
    const chapterStates = unit.chapters.map((chapter) => getChapterMasteryStatus(progress, unit, chapter));
    return {
        opened: chapterStates.filter((state) => state.opened).length,
        completed: chapterStates.filter((state) => state.completed).length,
        quizPassed: chapterStates.filter((state) => state.quizPassed).length,
        needsReview: chapterStates.filter((state) => state.needsReview).length,
        total: unit.chapters.length,
    };
}
function getUnitStudyStatus(progress, unit) {
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
function isUnitBookmarked(progress, unit) {
    return unit.chapters.some((chapter) => isChapterBookmarked(progress, unit.id, chapter.id));
}
function getTopicProgress(progress, topic) {
    const chapters = topic.learningUnits.flatMap((unit) => unit.chapters.map((chapter) => ({ unit, chapter })));
    const completed = chapters.filter(({ unit, chapter }) => isChapterComplete(progress, unit.id, chapter.id)).length;
    return {
        completed,
        total: chapters.length,
        percentage: chapters.length === 0 ? 0 : (completed / chapters.length) * 100,
    };
}
function getTopicMastery(progress, topic) {
    const mastery = topic.learningUnits.map((unit) => getUnitMastery(progress, unit));
    return {
        opened: mastery.reduce((sum, entry) => sum + entry.opened, 0),
        completed: mastery.reduce((sum, entry) => sum + entry.completed, 0),
        quizPassed: mastery.reduce((sum, entry) => sum + entry.quizPassed, 0),
        needsReview: mastery.reduce((sum, entry) => sum + entry.needsReview, 0),
        total: mastery.reduce((sum, entry) => sum + entry.total, 0),
    };
}
function getSubjectProgress(progress, subject) {
    const allUnits = subject.topics.flatMap((topic) => topic.learningUnits);
    const chapters = allUnits.flatMap((unit) => unit.chapters.map((chapter) => ({ unit, chapter })));
    const completed = chapters.filter(({ unit, chapter }) => isChapterComplete(progress, unit.id, chapter.id)).length;
    return {
        completed,
        total: chapters.length,
        percentage: chapters.length === 0 ? 0 : (completed / chapters.length) * 100,
    };
}
function getSubjectMastery(progress, subject) {
    const mastery = subject.topics.map((topic) => getTopicMastery(progress, topic));
    return {
        opened: mastery.reduce((sum, entry) => sum + entry.opened, 0),
        completed: mastery.reduce((sum, entry) => sum + entry.completed, 0),
        quizPassed: mastery.reduce((sum, entry) => sum + entry.quizPassed, 0),
        needsReview: mastery.reduce((sum, entry) => sum + entry.needsReview, 0),
        total: mastery.reduce((sum, entry) => sum + entry.total, 0),
    };
}
function getNextChapter(unit, progress) {
    return (unit.chapters.find((chapter) => !isChapterComplete(progress, unit.id, chapter.id)) ?? unit.chapters[0]);
}
function getFirstRecommendedTopic(subject) {
    return (subject.topics.find((topic) => topic.id === subject.recommendedFirstTopicId) ??
        subject.topics[0]);
}
function getFirstRecommendedUnit(topic) {
    return (topic.learningUnits.find((unit) => unit.id === topic.recommendedFirstUnitId) ??
        topic.learningUnits[0]);
}
function buildPrerequisiteLabel(unit, topic) {
    const prerequisiteId = unit.prerequisiteUnitIds?.[0];
    if (!prerequisiteId) {
        return topic.prerequisiteTopicIds?.length ? `Recommended after ${topic.prerequisiteTopicIds.length} earlier topic${topic.prerequisiteTopicIds.length === 1 ? '' : 's'}` : undefined;
    }
    const prerequisite = topic.learningUnits.find((candidate) => candidate.id === prerequisiteId);
    return prerequisite ? `Recommended after ${prerequisite.title}` : undefined;
}
function getRecommendedActionForTopic(progress, subject, topic) {
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
            reason: getUnitStudyStatus(progress, inProgressUnit) === 'needs-review'
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
function getRecommendedActionForSubject(progress, subject) {
    const topicWithProgress = subject.topics.find((topic) => topic.learningUnits.some((unit) => getUnitStudyStatus(progress, unit) !== 'not-started'));
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
function getContinueLearningState(progress, subjects) {
    if (progress.lastVisited) {
        return progress.lastVisited;
    }
    const unitWithProgress = subjects
        .flatMap((subject) => subject.topics.flatMap((topic) => topic.learningUnits.map((unit) => ({
        subjectId: subject.id,
        topicId: topic.id,
        unit,
    }))))
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
function getRecommendedActionForLibrary(progress, subjects) {
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
