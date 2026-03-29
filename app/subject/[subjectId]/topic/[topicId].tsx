import { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { LearningUnitCard } from '@/components/LearningUnitCard';
import { RecommendedActionCard } from '@/components/RecommendedActionCard';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { getChapterById, getSubjectById, getTopicById, getUnitById } from '@/content/catalog';
import {
  getRecommendedActionForTopic,
  getUnitProgress,
  getUnitStudyStatus,
  isUnitBookmarked,
} from '@/features/learning/selectors';
import { rankLearningUnits } from '@/features/learning/unit-search';
import { useStudy } from '@/hooks/use-study';
import { getElementAccentPalette } from '@/theme/element-accents';
import { chapterRoute, homeRoute, subjectRoute, unitRoute } from '@/utils/routes';
import { getTopicStaticParams } from '@/utils/static-params';
import { formatCount } from '@/utils/format';

type TopicFilter = 'all' | 'in-progress' | 'completed' | 'not-started' | 'needs-review' | 'bookmarked';

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
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TopicFilter>('all');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 120);

    return () => clearTimeout(timeout);
  }, [query]);

  const searchState = useMemo(
    () => rankLearningUnits(topic?.learningUnits ?? [], debouncedQuery, 8),
    [debouncedQuery, topic?.learningUnits]
  );

  if (!subject || !topic) {
    return (
      <AppShell>
        <Text style={{ color: theme.colors.text }}>Topic not found.</Text>
      </AppShell>
    );
  }
  const isSearching = debouncedQuery.trim().length > 0;
  const topicRecommendation = getRecommendedActionForTopic(progress, subject, topic);
  const recommendedUnit = getUnitById(subject.id, topic.id, topicRecommendation.unitId);
  const recommendedChapter = getChapterById(
    subject.id,
    topic.id,
    topicRecommendation.unitId,
    topicRecommendation.chapterId
  );
  const recommendedAccent = getElementAccentPalette(recommendedUnit?.id, theme);
  const matchMap = new Map(searchState.results.map((result) => [result.unit.id, result]));
  const queryUnits = isSearching
    ? searchState.results.map((result) => result.unit)
    : topic.learningUnits;
  const filteredUnits = queryUnits.filter((unit) => {
    switch (statusFilter) {
      case 'completed':
        return getUnitStudyStatus(progress, unit) === 'completed';
      case 'in-progress':
        return getUnitStudyStatus(progress, unit) === 'in-progress';
      case 'not-started':
        return getUnitStudyStatus(progress, unit) === 'not-started';
      case 'needs-review':
        return getUnitStudyStatus(progress, unit) === 'needs-review';
      case 'bookmarked':
        return isUnitBookmarked(progress, unit);
      default:
        return true;
    }
  });
  const unitSearchPlaceholder =
    topic.id === 'elements'
      ? 'Search by element name, symbol, or keyword'
      : 'Search by unit title or keyword';
  const emptyStateTitle = isSearching
    ? topic.id === 'elements'
      ? 'No elements match that search.'
      : 'No units match that search.'
    : statusFilter === 'all'
      ? 'No units are available.'
      : `No ${statusFilter.replace('-', ' ')} units right now.`;
  const emptyStateDescription = isSearching
    ? topic.id === 'elements'
      ? 'Try a full name such as Oxygen, a symbol such as O, or a keyword such as noble gas.'
      : `Try a full unit title such as ${topic.learningUnits[0]?.title ?? topic.title} or a keyword tied to the topic.`
    : statusFilter === 'all'
      ? 'This topic does not currently contain seeded units.'
      : 'Try a different progress filter or continue studying this topic to change the results.';
  const sectionDescription = isSearching
    ? searchState.results.length === 0
      ? `No matches found for "${debouncedQuery.trim()}". Try a full title, a symbol, or a concise keyword.`
      : searchState.showingFallback
        ? `No strong matches found for "${debouncedQuery.trim()}". Showing the closest ${formatCount(searchState.results.length, 'result')}.`
        : `Showing ${formatCount(searchState.results.length, 'ranked result')}${searchState.limited ? ' from the strongest matches' : ''} for "${debouncedQuery.trim()}".`
      : statusFilter === 'all'
        ? 'Each unit opens as a small scientific book with chapter reading, glossary context, flashcards, quizzes, bookmarks, and local progress.'
        : `Showing ${statusFilter.replace('-', ' ')} units within this topic.`;

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
        placeholder={unitSearchPlaceholder}
        variant="inverse"
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
          title={`${topic.title} library`}
          description={sectionDescription}
        />

        {recommendedUnit && recommendedChapter ? (
          <RecommendedActionCard
            eyebrow={topicRecommendation.isStartHere ? 'Start Here' : 'Recommended Next'}
            title={`${recommendedUnit.shortTitle} • ${recommendedUnit.title}`}
            description={`${topicRecommendation.reason} ${recommendedChapter.overview}`}
            ctaLabel={topicRecommendation.isStartHere ? 'Start Chapter' : 'Continue Chapter'}
            onPress={() =>
              router.push(
                chapterRoute(subject.id, topic.id, topicRecommendation.unitId, topicRecommendation.chapterId)
              )
            }
            tags={[
              recommendedChapter.title,
              topicRecommendation.prerequisiteLabel ?? 'Topic sequence',
            ]}
            accent={recommendedAccent}
          />
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
          }}>
          {([
            { id: 'all', label: 'All' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'needs-review', label: 'Needs Review' },
            { id: 'completed', label: 'Completed' },
            { id: 'not-started', label: 'Not Started' },
            { id: 'bookmarked', label: 'Bookmarked' },
          ] as const).map((filter) => {
            const active = statusFilter === filter.id;

            return (
              <Pressable
                key={filter.id}
                accessibilityRole="button"
                onPress={() => setStatusFilter(filter.id)}
                style={({ pressed }) => ({
                  borderRadius: theme.radius.pill,
                  borderWidth: 1,
                  borderColor: active ? theme.colors.borderStrong : theme.colors.border,
                  backgroundColor: active ? theme.colors.surfaceElevated : theme.colors.surfaceOverlay,
                  paddingHorizontal: theme.spacing.md,
                  paddingVertical: theme.spacing.sm,
                  opacity: pressed ? 0.88 : 1,
                })}>
                <Text
                  style={{
                    color: active ? theme.colors.text : theme.colors.textMuted,
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                  }}>
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {isSearching && searchState.results.length > 0 ? (
          <View
            style={{
              gap: theme.spacing.xs,
              borderRadius: theme.radius.lg,
              borderWidth: 1,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surfaceElevated,
              paddingHorizontal: theme.spacing.lg,
              paddingVertical: theme.spacing.md,
            }}>
            <Text
              style={{
                color: theme.colors.textSoft,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}>
              Search results
            </Text>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: 14,
                lineHeight: 22,
              }}>
              {searchState.showingFallback
                ? 'These are the closest local matches from the current topic.'
                : searchState.limited
                  ? `Showing the top ${searchState.results.length} results to keep the list focused.`
                  : `Results are ranked by exact name and symbol matches first, then direct title matches, then contextual keyword matches.`}
            </Text>
          </View>
        ) : null}

        {filteredUnits.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'stretch',
              gap: theme.spacing.md,
            }}>
            {filteredUnits.map((unit) => {
              const unitProgress = getUnitProgress(progress, unit);

              return (
                <View
                  key={unit.id}
                  style={{
                    width: cardWidth,
                    alignSelf: 'stretch',
                    minWidth: 0,
                  }}>
                  <LearningUnitCard
                    unit={unit}
                    progressPercentage={unitProgress.percentage}
                    detail={`${unitProgress.completed} of ${unitProgress.total} chapters complete`}
                    searchMatchLabel={isSearching ? matchMap.get(unit.id)?.matchLabel : undefined}
                    href={unitRoute(subject.id, topic.id, unit.id)}
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
              {emptyStateTitle}
            </Text>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: theme.typography.body,
                lineHeight: 24,
              }}>
              {emptyStateDescription}
            </Text>
          </View>
        )}
      </View>
    </AppShell>
  );
}
