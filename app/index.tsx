import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { SectionHeader } from '@/components/SectionHeader';
import { SubjectCard } from '@/components/SubjectCard';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { useStudy } from '@/hooks/use-study';
import { catalogStats, getChapterById, getSubjectById, getTopicById, getUnitById, subjects } from '@/content/catalog';
import { getContinueLearningState, getSubjectProgress } from '@/features/learning/selectors';
import { getElementAccentPalette } from '@/theme/element-accents';
import { chapterRoute, subjectRoute } from '@/utils/routes';

export default function HomeScreen() {
  const theme = useAppTheme();
  const { isDesktop, isTablet } = useBreakpoints();
  const router = useRouter();
  const { progress } = useStudy();

  const chemistry = subjects[0];
  const subjectProgress = getSubjectProgress(progress, chemistry);
  const continueState = getContinueLearningState(progress, subjects);
  const continueSubject = continueState ? getSubjectById(continueState.subjectId) : undefined;
  const continueTopic = continueState ? getTopicById(continueState.subjectId, continueState.topicId) : undefined;
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
  const continueAccent = getElementAccentPalette(continueUnit?.id, theme);
  const featuredUnits = chemistry.topics[0]?.learningUnits.slice(0, 5) ?? [];

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
              live library currently opens through chemistry, but the architecture already supports
              subjects, topics, units, chapters, flashcards, quizzes, and persistent progress.
            </Text>
          </View>

          <View
            style={{
              flexDirection: isTablet ? 'row' : 'column',
              gap: theme.spacing.sm,
            }}>
            <Button
              label="Open Chemistry"
              icon="flask-outline"
              onPress={() => router.push(subjectRoute('chemistry'))}
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
              Current publication state
            </Text>
          </View>
          <Text
            style={{
              color: theme.colors.textMuted,
              fontFamily: theme.fonts.body,
              fontSize: theme.typography.body,
              lineHeight: 26,
            }}>
            {'The current release focuses on Chemistry -> Elements, with long-form textbooks for the first thirty elements and the full study loop wired locally on device.'}
          </Text>
          <View style={{ gap: theme.spacing.sm }}>
            {[
              `${catalogStats.subjects} subject`,
              `${catalogStats.topics} topic`,
              `${catalogStats.units} learning units`,
              `${catalogStats.chapters} chapters`,
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
            {'Home -> Subject -> Topic -> Learning Unit -> Chapter -> Flashcards / Quiz'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <AppShell hero={hero}>
      {continueState && continueSubject && continueTopic && continueUnit && continueChapter ? (
        <View style={{ gap: theme.spacing.md }}>
          <SectionHeader
            eyebrow="Continue Learning"
            title={`Resume ${continueUnit.title}`}
            description={`Return to ${continueChapter.title} in ${continueTopic.title} and continue from the last local checkpoint.`}
            accent={continueAccent}
          />
          <View
            style={{
              gap: theme.spacing.lg,
              borderRadius: theme.radius.xl,
              borderWidth: 1,
              borderColor: continueAccent.line,
              backgroundColor: theme.colors.surfaceElevated,
              padding: theme.spacing.xl,
            }}>
            <View style={{ gap: theme.spacing.sm }}>
              <Text
                style={{
                  color: continueAccent.accent,
                  fontFamily: theme.fonts.mono,
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                Last visited chapter
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: theme.fonts.display,
                  fontSize: 34,
                  fontWeight: '700',
                }}>
                {continueChapter.title}
              </Text>
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontFamily: theme.fonts.body,
                  fontSize: theme.typography.body,
                  lineHeight: 26,
                }}>
                {continueChapter.overview}
              </Text>
            </View>

            <View
              style={{
                flexDirection: isTablet ? 'row' : 'column',
                gap: theme.spacing.sm,
              }}>
              <Button
                label="Resume Chapter"
                icon="book-outline"
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
                accent={continueAccent}
              />
              <Button
                label="Open Subject"
                variant="secondary"
                icon="library-outline"
                onPress={() => router.push(subjectRoute(continueState.subjectId))}
                accent={continueAccent}
              />
            </View>
          </View>
        </View>
      ) : null}

      <View style={{ gap: theme.spacing.md }}>
        <SectionHeader
          eyebrow="Subjects"
          title="Start from the library"
          description="The current interface exposes one live subject, but the app model is already general-purpose and multi-subject ready."
        />
        <SubjectCard
          subject={chemistry}
          progressPercentage={subjectProgress.percentage}
          detail={`${subjectProgress.completed} of ${subjectProgress.total} chapters completed`}
          stats={[
            `${chemistry.topics.length} topic`,
            `${chemistry.topics[0].learningUnits.length} units`,
            `${catalogStats.chapters} chapter readings`,
          ]}
          onPress={() => router.push(subjectRoute(chemistry.id))}
        />
      </View>
    </AppShell>
  );
}
