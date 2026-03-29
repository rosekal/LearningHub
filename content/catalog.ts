import type { Chapter, LearningUnit, Subject, Topic } from '@/content/schema';
import { subjectRegistry } from '@/content/subjects';

interface TopicContext {
  subject: Subject;
  topic: Topic;
}

interface UnitContext extends TopicContext {
  unit: LearningUnit;
}

const loadedSubjects = subjectRegistry.map((entry) => entry.loadSync());

export const subjects = loadedSubjects.map((entry) => entry.subject);
export const topics = subjects.flatMap((subject) => subject.topics);
export const learningUnits = loadedSubjects.flatMap((entry) => entry.units);

export const catalogStats = {
  subjects: subjects.length,
  topics: topics.length,
  units: learningUnits.length,
  chapters: learningUnits.reduce((count, unit) => count + unit.chapters.length, 0),
};

const subjectMap = new Map(subjects.map((subject) => [subject.id, subject]));
const topicContextMap = new Map<string, TopicContext>();
const unitContextMap = new Map<string, UnitContext>();
const chapterMap = new Map<string, Chapter>();

subjects.forEach((subject) => {
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

export function getSubjectById(subjectId: string) {
  return subjectMap.get(subjectId);
}

export function getTopicById(subjectId: string, topicId: string) {
  return topicContextMap.get(`${subjectId}:${topicId}`)?.topic;
}

export function getUnitById(subjectId: string, topicId: string, unitId: string) {
  return unitContextMap.get(`${subjectId}:${topicId}:${unitId}`)?.unit;
}

export function getLearningUnitById(unitId: string) {
  return unitContextMap.get(unitId)?.unit;
}

export function getUnitContextById(unitId: string) {
  return unitContextMap.get(unitId);
}

export function getChapterById(
  subjectId: string,
  topicId: string,
  unitId: string,
  chapterId: string
): Chapter | undefined {
  return chapterMap.get(`${subjectId}:${topicId}:${unitId}:${chapterId}`);
}
