import { useDeferredValue, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { LearningUnitCard } from '@/components/LearningUnitCard';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { getSubjectById, getTopicById } from '@/content/catalog';
import { getUnitProgress } from '@/features/learning/selectors';
import { useStudy } from '@/hooks/use-study';
import { getElementAccentPalette } from '@/theme/element-accents';
import { homeRoute, subjectRoute, unitRoute } from '@/utils/routes';
import { getTopicStaticParams } from '@/utils/static-params';

export function generateStaticParams() {
  return getTopicStaticParams();
}

export default function TopicScreen() {
  const { subjectId, topicId } = useLocalSearchParams<{ subjectId: string; topicId: string }>();
  const subject = getSubjectById(subjectId);
  const topic = getTopicById(subjectId, topicId);
  const theme = useAppTheme();
  const { isDesktop, isTablet } = useBreakpoints();
  const router = useRouter();
  const { progress } = useStudy();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  if (!subject || !topic) {
    return (
      <AppShell>
        <Text style={{ color: theme.colors.text }}>Topic not found.</Text>
      </AppShell>
    );
  }

  const filteredUnits = topic.learningUnits.filter((unit) => {
    if (!deferredQuery) {
      return true;
    }

    return unit.searchTerms.some((term) => term.toLowerCase().includes(deferredQuery));
  });

  const cardWidth = isDesktop ? '31.8%' : isTablet ? '48%' : '100%';

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
          right: -30,
          top: -20,
          width: 220,
          height: 220,
          borderRadius: 110,
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
        Topic
      </Text>
      <Text
        style={{
          color: theme.colors.textInverse,
          fontFamily: theme.fonts.display,
          fontSize: 54,
          fontWeight: '700',
        }}>
        {topic.title}
      </Text>
      <Text
        style={{
          maxWidth: 860,
          color: 'rgba(248, 247, 243, 0.82)',
          fontFamily: theme.fonts.body,
          fontSize: theme.typography.bodyLarge,
          lineHeight: 30,
        }}>
        {topic.description}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        }}>
        {topic.learningUnits.slice(0, 10).map((unit) => {
          const palette = getElementAccentPalette(unit.id, theme);

          return (
            <View
              key={unit.id}
              style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: palette.line,
                backgroundColor: palette.panel,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
              }}>
              <Text
                style={{
                  color: palette.accentStrong,
                  fontFamily: theme.fonts.mono,
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 0.7,
                  textTransform: 'uppercase',
                }}>
                {unit.shortTitle}
              </Text>
            </View>
          );
        })}
      </View>

      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search by element name, symbol, or keyword"
      />
    </View>
  );

  return (
    <AppShell
      hero={hero}
      breadcrumbs={[
        { label: 'Home', href: homeRoute() },
        { label: subject.title, href: subjectRoute(subject.id) },
        { label: topic.title },
      ]}>
      <View style={{ gap: theme.spacing.md }}>
        <SectionHeader
          eyebrow="Collection"
          title="Curated elemental library"
          description="Each entry opens as a small scientific book with chapter reading, glossary context, flashcards, quizzes, bookmarks, and local progress."
        />

        {filteredUnits.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.spacing.md,
            }}>
            {filteredUnits.map((unit) => {
              const unitProgress = getUnitProgress(progress, unit);

              return (
                <View key={unit.id} style={{ width: cardWidth }}>
                  <LearningUnitCard
                    unit={unit}
                    progressPercentage={unitProgress.percentage}
                    detail={`${unitProgress.completed} of ${unitProgress.total} chapters complete`}
                    onPress={() => router.push(unitRoute(subject.id, topic.id, unit.id))}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              gap: theme.spacing.sm,
              borderRadius: theme.radius.xl,
              borderWidth: 1,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surfaceElevated,
              padding: theme.spacing.xl,
            }}>
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.display,
                fontSize: 28,
                fontWeight: '700',
              }}>
              No elements match that search.
            </Text>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: theme.typography.body,
                lineHeight: 24,
              }}>
              Try a full name such as Oxygen, a symbol such as O, or a keyword such as noble gas.
            </Text>
          </View>
        )}
      </View>
    </AppShell>
  );
}
