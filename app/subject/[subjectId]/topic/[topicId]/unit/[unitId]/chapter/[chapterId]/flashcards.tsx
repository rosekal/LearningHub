import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { FlashcardDeck } from '@/components/FlashcardDeck';
import { SectionHeader } from '@/components/SectionHeader';
import { getChapterById, getSubjectById, getTopicById, getUnitById } from '@/content/catalog';
import { chapterKey } from '@/features/learning/selectors';
import { useElementAccent } from '@/hooks/use-element-accent';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useStudy } from '@/hooks/use-study';
import { chapterRoute, homeRoute, subjectRoute, topicRoute, unitRoute } from '@/utils/routes';
import { getChapterStaticParams } from '@/utils/static-params';

export function generateStaticParams() {
  return getChapterStaticParams();
}

export default function FlashcardsScreen() {
  const { subjectId, topicId, unitId, chapterId } = useLocalSearchParams<{
    subjectId: string;
    topicId: string;
    unitId: string;
    chapterId: string;
  }>();
  const subject = getSubjectById(subjectId);
  const topic = getTopicById(subjectId, topicId);
  const unit = getUnitById(subjectId, topicId, unitId);
  const chapter = getChapterById(subjectId, topicId, unitId, chapterId);
  const theme = useAppTheme();
  const accent = useElementAccent(unit?.id);
  const { progress, markFlashcardReviewed, setLastVisited } = useStudy();

  useEffect(() => {
    if (!subject || !topic || !unit || !chapter) {
      return;
    }

    setLastVisited({
      subjectId: subject.id,
      topicId: topic.id,
      unitId: unit.id,
      chapterId: chapter.id,
      updatedAt: new Date().toISOString(),
    });
  }, [chapter, setLastVisited, subject, topic, unit]);

  if (!subject || !topic || !unit || !chapter) {
    return (
      <AppShell>
        <Text style={{ color: theme.colors.text }}>Flashcard deck not found.</Text>
      </AppShell>
    );
  }

  const reviewedCount = progress.reviewedFlashcards[chapterKey(unit.id, chapter.id)]?.length ?? 0;

  return (
    <AppShell
      accent={accent}
      hero={
        <View
          style={{
            overflow: 'hidden',
            gap: theme.spacing.lg,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: accent.heroFrom,
            padding: theme.spacing.xxl,
          }}>
          <View
            style={{
              position: 'absolute',
              right: -30,
              top: -20,
              width: 220,
              height: 220,
              borderRadius: 110,
              backgroundColor: accent.glow,
            }}
          />
          <Text
            style={{
              color: accent.accentContrast,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
            Flashcards
          </Text>
          <Text
            style={{
              color: accent.accentContrast,
              fontFamily: theme.fonts.display,
              fontSize: 48,
              fontWeight: '700',
            }}>
            {chapter.title}
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.82)',
              fontFamily: theme.fonts.body,
              fontSize: theme.typography.bodyLarge,
              lineHeight: 30,
            }}>
            Review the chapter as a study deck. Cards are marked as reviewed when you flip them,
            and the count persists locally for this chapter.
          </Text>
        </View>
      }
      breadcrumbs={[
        { label: 'Home', href: homeRoute() },
        { label: subject.title, href: subjectRoute(subject.id) },
        { label: topic.title, href: topicRoute(subject.id, topic.id) },
        { label: unit.title, href: unitRoute(subject.id, topic.id, unit.id) },
        { label: chapter.title, href: chapterRoute(subject.id, topic.id, unit.id, chapter.id) },
        { label: 'Flashcards' },
      ]}>
      <View style={{ gap: theme.spacing.md }}>
        <SectionHeader
          eyebrow="Deck"
          title="Retrieval practice"
          description="Use the deck as a compact study instrument for definitions, structure, properties, and major applications from the current chapter."
          accent={accent}
        />
        <FlashcardDeck
          cards={chapter.flashcards}
          reviewedCount={reviewedCount}
          onReview={(flashcardId) => markFlashcardReviewed(unit.id, chapter.id, flashcardId)}
          accent={accent}
        />
      </View>
    </AppShell>
  );
}
