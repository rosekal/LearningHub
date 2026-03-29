"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRoute = homeRoute;
exports.subjectRoute = subjectRoute;
exports.topicRoute = topicRoute;
exports.unitRoute = unitRoute;
exports.chapterRoute = chapterRoute;
exports.flashcardsRoute = flashcardsRoute;
exports.quizRoute = quizRoute;
function homeRoute() {
    return '/';
}
function subjectRoute(subjectId) {
    return {
        pathname: '/subject/[subjectId]',
        params: { subjectId },
    };
}
function topicRoute(subjectId, topicId) {
    return {
        pathname: '/subject/[subjectId]/topic/[topicId]',
        params: { subjectId, topicId },
    };
}
function unitRoute(subjectId, topicId, unitId) {
    return {
        pathname: '/subject/[subjectId]/topic/[topicId]/unit/[unitId]',
        params: { subjectId, topicId, unitId },
    };
}
function chapterRoute(subjectId, topicId, unitId, chapterId) {
    return {
        pathname: '/subject/[subjectId]/topic/[topicId]/unit/[unitId]/chapter/[chapterId]',
        params: { subjectId, topicId, unitId, chapterId },
    };
}
function flashcardsRoute(subjectId, topicId, unitId, chapterId) {
    return {
        pathname: '/subject/[subjectId]/topic/[topicId]/unit/[unitId]/chapter/[chapterId]/flashcards',
        params: { subjectId, topicId, unitId, chapterId },
    };
}
function quizRoute(subjectId, topicId, unitId, chapterId) {
    return {
        pathname: '/subject/[subjectId]/topic/[topicId]/unit/[unitId]/chapter/[chapterId]/quiz',
        params: { subjectId, topicId, unitId, chapterId },
    };
}
