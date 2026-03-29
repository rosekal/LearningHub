import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { LearningUnitCard } from '@/components/LearningUnitCard';
import { RecommendedActionCard } from '@/components/RecommendedActionCard';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { SubjectCard } from '@/components/SubjectCard';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { useStudy } from '@/hooks/use-study';
import {
  catalogStats,
  getChapterById,
  getSubjectById,
  getTopicById,
  getUnitById,
  learningUnits,
  subjects,
} from '@/content/catalog';
import {
  getContinueLearningState,
  getRecommendedActionForLibrary,
  getSubjectProgress,
  getUnitProgress,
} from '@/features/learning/selectors';
import { rankLearningUnits } from '@/features/learning/unit-search';
import { getElementAccentPalette } from '@/theme/element-accents';
import { formatCount } from '@/utils/format';
import { chapterRoute, subjectRoute, unitRoute } from '@/utils/routes';

export default function HomeScreen() {
  const theme = useAppTheme();
  const { isDesktop, isTablet } = useBreakpoints();
  const router = useRouter();
  const { progress } = useStudy();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 120);

    return () => clearTimeout(timeout);
  }, [query]);

  const featuredSubject = subjects[0];
  const continueState = getContinueLearningState(progress, subjects);
  const libraryRecommendation = getRecommendedActionForLibrary(progress, subjects);
  const continueUnit = continueState
    ? getUnitById(continueState.subjectId, continueState.topicId, continueState.unitId)
    : undefined;
  const continueChapter = continueState
    ? getChapterById(
        continueState.subjectId,
        continueState.topicId,
        continueState.unitId,
        continueState.chapterId
      )
    : undefined;
  const recommendedSubject = libraryRecommendation
    ? getSubjectById(libraryRecommendation.subjectId)
    : undefined;
  const recommendedTopic = libraryRecommendation
    ? getTopicById(libraryRecommendation.subjectId, libraryRecommendation.topicId)
    : undefined;
  const recommendedUnit = libraryRecommendation
    ? getUnitById(libraryRecommendation.subjectId, libraryRecommendation.topicId, libraryRecommendation.unitId)
    : undefined;
  const recommendedChapter = libraryRecommendation
    ? getChapterById(
        libraryRecommendation.subjectId,
        libraryRecommendation.topicId,
        libraryRecommendation.unitId,
        libraryRecommendation.chapterId
      )
    : undefined;
  const recommendedAccent = getElementAccentPalette(recommendedUnit?.id, theme);
  const globalSearchState = useMemo(
    () => rankLearningUnits(learningUnits, debouncedQuery, 8),
    [debouncedQuery]
  );
  const isSearching = debouncedQuery.trim().length > 0;
  const featuredUnits = subjects
    .flatMap((subject) => subject.topics[0]?.learningUnits.slice(0, 1) ?? [])
    .slice(0, 5);
  const subjectEntries = subjects.map((subject) => {
    const subjectProgress = getSubjectProgress(progress, subject);
    const subjectUnits = subject.topics.reduce((count, topic) => count + topic.learningUnits.length, 0);
    const subjectChapters = subject.topics.reduce(
      (count, topic) =>
        count + topic.learningUnits.reduce((unitCount, unit) => unitCount + unit.chapters.length, 0),
      0
    );

    return {
      subject,
      subjectProgress,
      detail: `${subjectProgress.completed} of ${subjectProgress.total} chapters completed`,
      stats: [
        formatCount(subject.topics.length, 'topic'),
        formatCount(subjectUnits, 'unit'),
        formatCount(subjectChapters, 'chapter reading'),
      ],
    };
  });
  const featuredSubjects = subjectEntries.slice(0, isTablet ? 2 : 1);
  const catalogSubjects = subjectEntries.slice(featuredSubjects.length);

  const hero = (
    <View
      style={{
        flexDirection: isDesktop ? 'row' : 'column',
        gap: theme.spacing.lg,
      }}>
      <View
        style={{
          flex: 1.45,
          overflow: 'hidden',
          borderRadius: theme.radius.xl,
          borderWidth: 1,
          borderColor: theme.colors.borderStrong,
          backgroundColor: theme.colors.surfaceContrast,
          padding: theme.spacing.xxl,
          ...theme.shadow.strong,
        }}>
        <View
          style={{
            position: 'absolute',
            top: -40,
            right: -20,
            width: 220,
            height: 220,
            borderRadius: 110,
            backgroundColor: theme.colors.accentGlow,
          }}
        />
        <View style={{ gap: theme.spacing.lg }}>
          <View
            style={{
              alignSelf: 'flex-start',
              borderRadius: theme.radius.pill,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.22)',
              backgroundColor: 'rgba(255,255,255,0.06)',
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: theme.colors.textInverse,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}>
              LearnHub
            </Text>
          </View>

          <View style={{ gap: theme.spacing.md }}>
            <Text
              style={{
                maxWidth: 760,
                color: theme.colors.textInverse,
                fontFamily: theme.fonts.display,
                fontSize: isDesktop ? 64 : 46,
                fontWeight: '700',
                lineHeight: isDesktop ? 70 : 52,
              }}>
              Study like a modern scientific atlas, not a stack of disconnected notes.
            </Text>
            <Text
              style={{
                maxWidth: 720,
                color: 'rgba(248, 247, 243, 0.8)',
                fontFamily: theme.fonts.body,
                fontSize: theme.typography.bodyLarge,
                lineHeight: 30,
              }}>
              LearnHub is a local-first reading and review platform built for serious study. The
              current library now spans multiple scientific and quantitative subjects, while the
              architecture continues to support subjects, topics, units, chapters, flashcards,
              quizzes, and persistent progress.
            </Text>
          </View>

          <View
            style={{
              flexDirection: isTablet ? 'row' : 'column',
              gap: theme.spacing.sm,
            }}>
            <Button
              label={`Open ${featuredSubject.title}`}
              icon="flask-outline"
              onPress={() => router.push(subjectRoute(featuredSubject.id))}
              style={{ flex: isTablet ? 1 : undefined }}
            />
            {continueState && continueUnit && continueChapter ? (
              <Button
                label="Continue Learning"
                variant="secondary"
                icon="play-outline"
                onPress={() =>
                  router.push(
                    chapterRoute(
                      continueState.subjectId,
                      continueState.topicId,
                      continueState.unitId,
                      continueState.chapterId
                    )
                  )
                }
                style={{ flex: isTablet ? 1 : undefined }}
              />
            ) : null}
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.spacing.sm,
            }}>
            {featuredUnits.map((unit) => {
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
        </View>
      </View>

      <View
        style={{
          flex: 1,
          gap: theme.spacing.lg,
        }}>
        <View
          style={{
            gap: theme.spacing.lg,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surfaceElevated,
            padding: theme.spacing.xl,
          }}>
          <View style={{ gap: theme.spacing.xs }}>
            <Text
              style={{
                color: theme.colors.accent,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}>
              Seeded Library
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.display,
                fontSize: 32,
                fontWeight: '700',
              }}>
              Current library state
            </Text>
          </View>
          <Text
            style={{
              color: theme.colors.textMuted,
              fontFamily: theme.fonts.body,
              fontSize: theme.typography.body,
              lineHeight: 26,
            }}>
            {`The current release now spans ${formatCount(catalogStats.subjects, 'subject')}, ${formatCount(catalogStats.topics, 'topic')}, ${formatCount(catalogStats.units, 'learning unit')}, and the same full study loop stored locally on the device.`}
          </Text>
          <View style={{ gap: theme.spacing.sm }}>
            {[
              formatCount(catalogStats.subjects, 'subject'),
              formatCount(catalogStats.topics, 'topic'),
              formatCount(catalogStats.units, 'learning unit'),
              formatCount(catalogStats.chapters, 'chapter'),
            ].map((item) => (
              <View
                key={item}
                style={{
                  borderRadius: theme.radius.lg,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.surfaceOverlay,
                  paddingHorizontal: theme.spacing.md,
                  paddingVertical: theme.spacing.sm,
                }}>
                <Text
                  style={{
                    color: theme.colors.textMuted,
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

        <View
          style={{
            gap: theme.spacing.md,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surfaceElevated,
            padding: theme.spacing.xl,
          }}>
          <Text
            style={{
              color: theme.colors.textSoft,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
            Study Model
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.fonts.reading,
              fontSize: 24,
              lineHeight: 34,
            }}>
            {'Home > Subject > Topic > Learning Unit > Chapter > Flashcards and Quiz'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <AppShell hero={hero}>
      {libraryRecommendation &&
      recommendedSubject &&
      recommendedTopic &&
      recommendedUnit &&
      recommendedChapter ? (
        <View style={{ gap: theme.spacing.md }}>
          <SectionHeader
            eyebrow="Recommended Next"
            title={
              libraryRecommendation.isStartHere
                ? `Start with ${recommendedUnit.title}`
                : `Continue with ${recommendedUnit.title}`
            }
            description={libraryRecommendation.reason}
            accent={recommendedAccent}
          />
          <RecommendedActionCard
            eyebrow={recommendedChapter.title}
            title={`${recommendedSubject.title} • ${recommendedTopic.title}`}
            description={`${recommendedChapter.overview} ${libraryRecommendation.prerequisiteLabel ? `${libraryRecommendation.prerequisiteLabel}.` : ''}`}
            ctaLabel={libraryRecommendation.isStartHere ? 'Start Chapter' : 'Resume Chapter'}
            onPress={() =>
              router.push(
                chapterRoute(
                  libraryRecommendation.subjectId,
                  libraryRecommendation.topicId,
                  libraryRecommendation.unitId,
                  libraryRecommendation.chapterId
                )
              )
            }
            tags={[
              recommendedUnit.shortTitle,
              recommendedTopic.title,
              libraryRecommendation.isStartHere ? 'Start Here' : 'Next Chapter',
            ]}
            accent={recommendedAccent}
          />
        </View>
      ) : null}

      <View style={{ gap: theme.spacing.md }}>
        <SectionHeader
          eyebrow="Search"
          title="Find the next unit quickly"
          description={
            isSearching
              ? globalSearchState.results.length === 0
                ? `No strong local matches found for "${debouncedQuery.trim()}".`
                : globalSearchState.showingFallback
                  ? `Showing the closest local matches for "${debouncedQuery.trim()}".`
                  : `Showing ${formatCount(globalSearchState.results.length, 'ranked result')} across the full library.`
              : 'Search across all seeded subjects, topics, and units without leaving the home screen.'
          }
        />
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search the full library by unit title or keyword"
        />
        {isSearching && globalSearchState.results.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.spacing.md,
            }}>
            {globalSearchState.results.map((result) => {
              const resultSubject = getSubjectById(result.unit.subjectId);
              const resultTopic = getTopicById(result.unit.subjectId, result.unit.topicId);
              const unitProgress = getUnitProgress(progress, result.unit);

              if (!resultSubject || !resultTopic) {
                return null;
              }

              return (
                <View
                  key={result.unit.id}
                  style={{ width: isDesktop ? '31.8%' : isTablet ? '48%' : '100%' }}>
                  <LearningUnitCard
                    unit={result.unit}
                    progressPercentage={unitProgress.percentage}
                    detail={`${resultSubject.title} • ${resultTopic.title}`}
                    searchMatchLabel={result.matchLabel}
                    href={unitRoute(resultSubject.id, resultTopic.id, result.unit.id)}
                    onPress={() =>
                      router.push(unitRoute(resultSubject.id, resultTopic.id, result.unit.id))
                    }
                  />
                </View>
              );
            })}
          </View>
        ) : null}
      </View>

      <View style={{ gap: theme.spacing.md }}>
        <SectionHeader
          eyebrow="Subjects"
          title="Start from the library"
          description="The current interface now exposes multiple live subjects, and each one branches into topic-based study paths while the app model remains general-purpose and multi-subject-ready."
        />
        <View style={{ gap: theme.spacing.lg }}>
          <View
            style={{
              flexDirection: isTablet ? 'row' : 'column',
              gap: theme.spacing.md,
            }}>
            {featuredSubjects.map(({ subject, subjectProgress, detail, stats }, index) => (
              <View key={subject.id} style={{ flex: 1 }}>
                <SubjectCard
                  subject={subject}
                  progressPercentage={subjectProgress.percentage}
                  detail={detail}
                  href={subjectRoute(subject.id)}
                  stats={stats}
                  eyebrow={index === 0 ? 'Featured Subject' : 'Curated Subject'}
                  onPress={() => router.push(subjectRoute(subject.id))}
                />
              </View>
            ))}
          </View>

          {catalogSubjects.length > 0 ? (
            <View
              style={{
                gap: theme.spacing.lg,
                borderRadius: theme.radius.xl,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surfaceOverlay,
                padding: isTablet ? theme.spacing.xl : theme.spacing.lg,
              }}>
              <View
                style={{
                  flexDirection: isTablet ? 'row' : 'column',
                  alignItems: isTablet ? 'center' : 'flex-start',
                  justifyContent: 'space-between',
                  gap: theme.spacing.sm,
                }}>
                <View style={{ gap: theme.spacing.xs }}>
                  <Text
                    style={{
                      color: theme.colors.teal,
                      fontFamily: theme.fonts.mono,
                      fontSize: 12,
                      fontWeight: '700',
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}>
                    Browse All Subjects
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontFamily: theme.fonts.display,
                      fontSize: isTablet ? 28 : 24,
                      fontWeight: '700',
                    }}>
                    Curated study catalog
                  </Text>
                </View>
                <Text
                  style={{
                    color: theme.colors.textSoft,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                  }}>
                  {formatCount(subjects.length, 'subject')}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: theme.spacing.md,
                }}>
                {catalogSubjects.map(({ subject, subjectProgress, detail, stats }) => (
                  <View
                    key={subject.id}
                    style={{ width: isDesktop ? '31.8%' : isTablet ? '48%' : '100%' }}>
                    <SubjectCard
                      subject={subject}
                      progressPercentage={subjectProgress.percentage}
                      detail={detail}
                      href={subjectRoute(subject.id)}
                      stats={stats}
                      variant="compact"
                      onPress={() => router.push(subjectRoute(subject.id))}
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </AppShell>
  );
}
