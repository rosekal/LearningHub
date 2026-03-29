"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogStats = exports.learningUnits = exports.topics = exports.subjects = void 0;
exports.getSubjectById = getSubjectById;
exports.getTopicById = getTopicById;
exports.getUnitById = getUnitById;
exports.getLearningUnitById = getLearningUnitById;
exports.getUnitContextById = getUnitContextById;
exports.getChapterById = getChapterById;
const subjects_1 = require("@/content/subjects");
const loadedSubjects = subjects_1.subjectRegistry.map((entry) => entry.loadSync());
exports.subjects = loadedSubjects.map((entry) => entry.subject);
exports.topics = exports.subjects.flatMap((subject) => subject.topics);
exports.learningUnits = loadedSubjects.flatMap((entry) => entry.units);
exports.catalogStats = {
    subjects: exports.subjects.length,
    topics: exports.topics.length,
    units: exports.learningUnits.length,
    chapters: exports.learningUnits.reduce((count, unit) => count + unit.chapters.length, 0),
};
const subjectMap = new Map(exports.subjects.map((subject) => [subject.id, subject]));
const topicContextMap = new Map();
const unitContextMap = new Map();
const chapterMap = new Map();
exports.subjects.forEach((subject) => {
    subject.topics.forEach((topic) => {
        topicContextMap.set(`${subject.id}:${topic.id}`, { subject, topic });
        topic.learningUnits.forEach((unit) => {
            const context = { subject, topic, unit };
            unitContextMap.set(unit.id, context);
            unitContextMap.set(`${subject.id}:${topic.id}:${unit.id}`, context);
            unit.chapters.forEach((chapter) => {
                chapterMap.set(`${subject.id}:${topic.id}:${unit.id}:${chapter.id}`, chapter);
            });
        });
    });
});
function getSubjectById(subjectId) {
    return subjectMap.get(subjectId);
}
function getTopicById(subjectId, topicId) {
    return topicContextMap.get(`${subjectId}:${topicId}`)?.topic;
}
function getUnitById(subjectId, topicId, unitId) {
    return unitContextMap.get(`${subjectId}:${topicId}:${unitId}`)?.unit;
}
function getLearningUnitById(unitId) {
    return unitContextMap.get(unitId)?.unit;
}
function getUnitContextById(unitId) {
    return unitContextMap.get(unitId);
}
function getChapterById(subjectId, topicId, unitId, chapterId) {
    return chapterMap.get(`${subjectId}:${topicId}:${unitId}:${chapterId}`);
}
