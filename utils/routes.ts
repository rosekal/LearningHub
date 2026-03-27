import type { Href } from 'expo-router';

export function homeRoute(): Href {
  return '/';
}

export function subjectRoute(subjectId: string): Href {
  return {
    pathname: '/subject/[subjectId]',
    params: { subjectId },
  };
}

export function topicRoute(subjectId: string, topicId: string): Href {
  return {
    pathname: '/subject/[subjectId]/topic/[topicId]',
    params: { subjectId, topicId },
  };
}

export function unitRoute(subjectId: string, topicId: string, unitId: string): Href {
  return {
    pathname: '/subject/[subjectId]/topic/[topicId]/unit/[unitId]',
    params: { subjectId, topicId, unitId },
  };
}

export function chapterRoute(
  subjectId: string,
  topicId: string,
  unitId: string,
  chapterId: string
): Href {
  return {
    pathname: '/subject/[subjectId]/topic/[topicId]/unit/[unitId]/chapter/[chapterId]',
    params: { subjectId, topicId, unitId, chapterId },
  };
}

export function flashcardsRoute(
  subjectId: string,
  topicId: string,
  unitId: string,
  chapterId: string
): Href {
  return {
    pathname: '/subject/[subjectId]/topic/[topicId]/unit/[unitId]/chapter/[chapterId]/flashcards',
    params: { subjectId, topicId, unitId, chapterId },
  };
}

export function quizRoute(
  subjectId: string,
  topicId: string,
  unitId: string,
  chapterId: string
): Href {
  return {
    pathname: '/subject/[subjectId]/topic/[topicId]/unit/[unitId]/chapter/[chapterId]/quiz',
    params: { subjectId, topicId, unitId, chapterId },
  };
}
