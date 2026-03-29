"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectStaticParams = getSubjectStaticParams;
exports.getTopicStaticParams = getTopicStaticParams;
exports.getUnitStaticParams = getUnitStaticParams;
exports.getChapterStaticParams = getChapterStaticParams;
const catalog_1 = require("@/content/catalog");
function getSubjectStaticParams() {
    return catalog_1.subjects.map((subject) => ({
        subjectId: subject.id,
    }));
}
function getTopicStaticParams() {
    return catalog_1.subjects.flatMap((subject) => subject.topics.map((topic) => ({
        subjectId: subject.id,
        topicId: topic.id,
    })));
}
function getUnitStaticParams() {
    return catalog_1.subjects.flatMap((subject) => subject.topics.flatMap((topic) => topic.learningUnits.map((unit) => ({
        subjectId: subject.id,
        topicId: topic.id,
        unitId: unit.id,
    }))));
}
function getChapterStaticParams() {
    return catalog_1.subjects.flatMap((subject) => subject.topics.flatMap((topic) => topic.learningUnits.flatMap((unit) => unit.chapters.map((chapter) => ({
        subjectId: subject.id,
        topicId: topic.id,
        unitId: unit.id,
        chapterId: chapter.id,
    })))));
}
