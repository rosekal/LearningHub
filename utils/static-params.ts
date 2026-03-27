import { subjects } from '@/content/catalog';

export interface SubjectStaticParam {
  subjectId: string;
}

export interface TopicStaticParam extends SubjectStaticParam {
  topicId: string;
}

export interface UnitStaticParam extends TopicStaticParam {
  unitId: string;
}

export interface ChapterStaticParam extends UnitStaticParam {
  chapterId: string;
}

export function getSubjectStaticParams(): SubjectStaticParam[] {
  return subjects.map((subject) => ({
    subjectId: subject.id,
  }));
}

export function getTopicStaticParams(): TopicStaticParam[] {
  return subjects.flatMap((subject) =>
    subject.topics.map((topic) => ({
      subjectId: subject.id,
      topicId: topic.id,
    }))
  );
}

export function getUnitStaticParams(): UnitStaticParam[] {
  return subjects.flatMap((subject) =>
    subject.topics.flatMap((topic) =>
      topic.learningUnits.map((unit) => ({
        subjectId: subject.id,
        topicId: topic.id,
        unitId: unit.id,
      }))
    )
  );
}

export function getChapterStaticParams(): ChapterStaticParam[] {
  return subjects.flatMap((subject) =>
    subject.topics.flatMap((topic) =>
      topic.learningUnits.flatMap((unit) =>
        unit.chapters.map((chapter) => ({
          subjectId: subject.id,
          topicId: topic.id,
          unitId: unit.id,
          chapterId: chapter.id,
        }))
      )
    )
  );
}
