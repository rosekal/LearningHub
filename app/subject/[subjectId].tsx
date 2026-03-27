import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { SectionHeader } from '@/components/SectionHeader';
import { TopicCard } from '@/components/TopicCard';
import { useAppTheme } from '@/hooks/use-app-theme';
import { getSubjectById } from '@/content/catalog';
import { getTopicProgress } from '@/features/learning/selectors';
import { useStudy } from '@/hooks/use-study';
import { homeRoute, topicRoute } from '@/utils/routes';
import { getSubjectStaticParams } from '@/utils/static-params';

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
        {[`${subject.topics.length} topic`, `${totalUnits} units`, `${totalChapters} chapters`].map((item) => (
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
        <SectionHeader
          eyebrow="Topics"
          title="Study paths"
          description="Each topic becomes a distinct branch of subject content. The current chemistry release centers on the first thirty elements as a curated scientific collection."
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
              onPress={() => router.push(topicRoute(subject.id, topic.id))}
            />
          );
        })}
      </View>
    </AppShell>
  );
}
