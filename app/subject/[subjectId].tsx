import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { RecommendedActionCard } from '@/components/RecommendedActionCard';
import { SectionHeader } from '@/components/SectionHeader';
import { TopicCard } from '@/components/TopicCard';
import { useAppTheme } from '@/hooks/use-app-theme';
import { getChapterById, getSubjectById, getTopicById, getUnitById } from '@/content/catalog';
import { getRecommendedActionForSubject, getTopicProgress } from '@/features/learning/selectors';
import { useStudy } from '@/hooks/use-study';
import { chapterRoute, homeRoute, topicRoute } from '@/utils/routes';
import { getSubjectStaticParams } from '@/utils/static-params';
import { formatCount } from '@/utils/format';
import { getElementAccentPalette } from '@/theme/element-accents';

export function generateStaticParams() {
  return getSubjectStaticParams();
}

export default function SubjectScreen() {
  const { subjectId } = useLocalSearchParams<{ subjectId: string }>();
  const subject = getSubjectById(subjectId);
  const theme = useAppTheme();
  const router = useRouter();
  const { progress } = useStudy();

  if (!subject) {
    return (
      <AppShell>
        <Text style={{ color: theme.colors.text }}>Subject not found.</Text>
      </AppShell>
    );
  }

  const totalUnits = subject.topics.reduce((count, topic) => count + topic.learningUnits.length, 0);
  const totalChapters = subject.topics.reduce(
    (count, topic) =>
      count + topic.learningUnits.reduce((unitCount, unit) => unitCount + unit.chapters.length, 0),
    0
  );
  const subjectRecommendation = getRecommendedActionForSubject(progress, subject);
  const recommendedTopic = getTopicById(subject.id, subjectRecommendation.topicId);
  const recommendedUnit = getUnitById(subject.id, subjectRecommendation.topicId, subjectRecommendation.unitId);
  const recommendedChapter = getChapterById(
    subject.id,
    subjectRecommendation.topicId,
    subjectRecommendation.unitId,
    subjectRecommendation.chapterId
  );
  const recommendedAccent = getElementAccentPalette(recommendedUnit?.id, theme);

  const hero = (
    <View
      style={{
        overflow: 'hidden',
        gap: theme.spacing.lg,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.borderStrong,
        backgroundColor: theme.colors.surfaceContrast,
        padding: theme.spacing.xxl,
      }}>
      <View
        style={{
          position: 'absolute',
          top: -30,
          right: -10,
          width: 210,
          height: 210,
          borderRadius: 105,
          backgroundColor: theme.colors.accentGlow,
        }}
      />
      <Text
        style={{
          color: theme.colors.textInverse,
          fontFamily: theme.fonts.mono,
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 1.1,
          textTransform: 'uppercase',
        }}>
        Subject
      </Text>
      <Text
        style={{
          color: theme.colors.textInverse,
          fontFamily: theme.fonts.display,
          fontSize: 54,
          fontWeight: '700',
        }}>
        {subject.title}
      </Text>
      <Text
        style={{
          maxWidth: 860,
          color: 'rgba(248, 247, 243, 0.82)',
          fontFamily: theme.fonts.body,
          fontSize: theme.typography.bodyLarge,
          lineHeight: 30,
        }}>
        {subject.description}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        }}>
        {[
          formatCount(subject.topics.length, 'topic'),
          formatCount(totalUnits, 'unit'),
          formatCount(totalChapters, 'chapter'),
        ].map((item) => (
          <View
            key={item}
            style={{
              borderRadius: theme.radius.pill,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.18)',
              backgroundColor: 'rgba(255,255,255,0.06)',
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                color: theme.colors.textInverse,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.7,
                textTransform: 'uppercase',
              }}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <AppShell
      hero={hero}
      breadcrumbs={[
        { label: 'Home', href: homeRoute() },
        { label: subject.title },
      ]}>
      <View style={{ gap: theme.spacing.md }}>
        {recommendedTopic && recommendedUnit && recommendedChapter ? (
          <RecommendedActionCard
            eyebrow={subjectRecommendation.isStartHere ? 'Start Here' : 'Recommended Next'}
            title={`${recommendedTopic.title} • ${recommendedUnit.title}`}
            description={`${subjectRecommendation.reason} ${recommendedChapter.overview}`}
            ctaLabel={subjectRecommendation.isStartHere ? 'Start Chapter' : 'Continue Chapter'}
            onPress={() =>
              router.push(
                chapterRoute(
                  subject.id,
                  subjectRecommendation.topicId,
                  subjectRecommendation.unitId,
                  subjectRecommendation.chapterId
                )
              )
            }
            tags={[
              recommendedUnit.shortTitle,
              recommendedChapter.title,
              subjectRecommendation.prerequisiteLabel ?? 'Subject sequence',
            ]}
            accent={recommendedAccent}
          />
        ) : null}

        <SectionHeader
          eyebrow="Topics"
          title="Study paths"
          description={`Each topic becomes a distinct branch of subject content. ${subject.title} currently spans ${formatCount(subject.topics.length, 'topic')} and ${formatCount(totalUnits, 'seeded learning unit')} across the same reading, flashcard, and quiz workflow.`}
          action={<Button label="Back Home" variant="ghost" icon="arrow-back-outline" onPress={() => router.push(homeRoute())} />}
        />
        {subject.topics.map((topic) => {
          const topicProgress = getTopicProgress(progress, topic);

          return (
            <TopicCard
              key={topic.id}
              topic={topic}
              progressPercentage={topicProgress.percentage}
              detail={`${topicProgress.completed} of ${topicProgress.total} chapter readings completed`}
              href={topicRoute(subject.id, topic.id)}
              onPress={() => router.push(topicRoute(subject.id, topic.id))}
            />
          );
        })}
      </View>
    </AppShell>
  );
}
