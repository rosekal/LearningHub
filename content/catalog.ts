import { chemistrySubject, chemistryTopic, chemistryUnits } from '@/content/subjects/chemistry/elements';
import type { Chapter } from '@/content/schema';

export const subjects = [chemistrySubject];
export const topics = [chemistryTopic];
export const learningUnits = chemistryUnits;

export const catalogStats = {
  subjects: subjects.length,
  topics: topics.length,
  units: learningUnits.length,
  chapters: learningUnits.reduce((count, unit) => count + unit.chapters.length, 0),
};

export function getSubjectById(subjectId: string) {
  return subjects.find((subject) => subject.id === subjectId);
}

export function getTopicById(subjectId: string, topicId: string) {
  return getSubjectById(subjectId)?.topics.find((topic) => topic.id === topicId);
}

export function getUnitById(subjectId: string, topicId: string, unitId: string) {
  return getTopicById(subjectId, topicId)?.learningUnits.find((unit) => unit.id === unitId);
}

export function getChapterById(
  subjectId: string,
  topicId: string,
  unitId: string,
  chapterId: string
): Chapter | undefined {
  return getUnitById(subjectId, topicId, unitId)?.chapters.find((chapter) => chapter.id === chapterId);
}
