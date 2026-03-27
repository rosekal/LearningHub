import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { QuizCard } from '@/components/QuizCard';
import { ScoreSummary } from '@/components/ScoreSummary';
import { SectionHeader } from '@/components/SectionHeader';
import { getChapterById, getSubjectById, getTopicById, getUnitById } from '@/content/catalog';
import { getQuizResult } from '@/features/learning/selectors';
import { useElementAccent } from '@/hooks/use-element-accent';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useStudy } from '@/hooks/use-study';
import { chapterRoute, homeRoute, subjectRoute, topicRoute, unitRoute } from '@/utils/routes';
import { getChapterStaticParams } from '@/utils/static-params';
import { formatQuizScore } from '@/utils/format';

export function generateStaticParams() {
  return getChapterStaticParams();
}

export default function QuizScreen() {
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
  const { progress, saveQuizResult, setLastVisited } = useStudy();
  const [index, setIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string>();
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSummary, setShowSummary] = useState(false);
  const questionCount = chapter?.quiz.length ?? 0;
  const score = chapter
    ? chapter.quiz.filter((item) => answers[item.id] === item.correctOptionId).length
    : 0;

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

  useEffect(() => {
    if (!unit || !chapter || !showSummary) {
      return;
    }

    saveQuizResult(unit.id, chapter.id, score, chapter.quiz.length);
  }, [chapter, saveQuizResult, score, showSummary, unit]);

  if (!subject || !topic || !unit || !chapter) {
    return (
      <AppShell>
        <Text style={{ color: theme.colors.text }}>Quiz not found.</Text>
      </AppShell>
    );
  }

  const question = chapter.quiz[index];
  const previousResult = getQuizResult(progress, unit.id, chapter.id);

  function revealAnswer() {
    if (!selectedOptionId) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [question.id]: selectedOptionId,
    }));
    setRevealed(true);
  }

  function goNext() {
    if (index === questionCount - 1) {
      setShowSummary(true);
      return;
    }

    setIndex((current) => current + 1);
    setSelectedOptionId(undefined);
    setRevealed(false);
  }

  function resetQuiz() {
    setIndex(0);
    setSelectedOptionId(undefined);
    setRevealed(false);
    setAnswers({});
    setShowSummary(false);
  }

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
            Quiz
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
            Answer each question, reveal the explanation, and preserve the best local score for
            this chapter.
          </Text>
          {previousResult ? (
            <Text
              style={{
                color: 'rgba(255,255,255,0.72)',
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}>
              Previous best: {formatQuizScore(previousResult.bestScore, previousResult.totalQuestions)}
            </Text>
          ) : null}
        </View>
      }
      breadcrumbs={[
        { label: 'Home', href: homeRoute() },
        { label: subject.title, href: subjectRoute(subject.id) },
        { label: topic.title, href: topicRoute(subject.id, topic.id) },
        { label: unit.title, href: unitRoute(subject.id, topic.id, unit.id) },
        { label: chapter.title, href: chapterRoute(subject.id, topic.id, unit.id, chapter.id) },
        { label: 'Quiz' },
      ]}>
      <View style={{ gap: theme.spacing.md }}>
        <SectionHeader
          eyebrow="Assessment"
          title={showSummary ? 'Final score' : `Question ${index + 1} of ${chapter.quiz.length}`}
          description={
            showSummary
              ? 'Review your result, compare it with the best saved score, and retry if needed.'
              : 'This chapter quiz mixes multiple choice with true/false and reveals an explanation after each answer.'
          }
          accent={accent}
        />

        {showSummary ? (
          <ScoreSummary
            score={score}
            total={questionCount}
            bestScore={Math.max(previousResult?.bestScore ?? 0, score)}
            onRetry={resetQuiz}
            accent={accent}
          />
        ) : (
          <>
            <QuizCard
              question={question}
              selectedOptionId={selectedOptionId}
              revealed={revealed}
              onSelect={setSelectedOptionId}
              accent={accent}
            />
            <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
              <Button
                label={revealed ? (index === questionCount - 1 ? 'Finish Quiz' : 'Next Question') : 'Reveal Answer'}
                icon={revealed ? 'arrow-forward-outline' : 'checkmark-done-outline'}
                onPress={revealed ? goNext : revealAnswer}
                disabled={!selectedOptionId}
                style={{ flex: 1 }}
                accent={accent}
              />
              <Button
                label="Restart"
                variant="ghost"
                icon="refresh-outline"
                onPress={resetQuiz}
                style={{ flex: 1 }}
                accent={accent}
              />
            </View>
          </>
        )}
      </View>
    </AppShell>
  );
}
