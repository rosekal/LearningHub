import { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { BookmarkButton } from '@/components/BookmarkButton';
import { Button } from '@/components/Button';
import { FigureBlock } from '@/components/FigureBlock';
import { ProgressBadge } from '@/components/ProgressBadge';
import { ResponsiveLayout } from '@/components/ResponsiveLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { getChapterById, getSubjectById, getTopicById, getUnitById } from '@/content/catalog';
import {
  getChapterMasteryStatus,
  getQuizResult,
  getQuizReviewState,
  isChapterBookmarked,
  isChapterComplete,
} from '@/features/learning/selectors';
import { useElementAccent } from '@/hooks/use-element-accent';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { useStudy } from '@/hooks/use-study';
import {
  chapterRoute,
  flashcardsRoute,
  homeRoute,
  quizRoute,
  subjectRoute,
  topicRoute,
  unitRoute,
} from '@/utils/routes';
import { getChapterStaticParams } from '@/utils/static-params';
import { formatQuizScore, formatReadingTime } from '@/utils/format';
import { interpolateByWidth } from '@/utils/responsive';

export function generateStaticParams() {
  return getChapterStaticParams();
}

export default function ChapterScreen() {
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
  const { width, isDesktop, isTablet } = useBreakpoints();
  const router = useRouter();
  const { progress, markChapterComplete, setLastVisited } = useStudy();

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
        <Text style={{ color: theme.colors.text }}>Chapter not found.</Text>
      </AppShell>
    );
  }

  const completed = isChapterComplete(progress, unit.id, chapter.id);
  const bookmarked = isChapterBookmarked(progress, unit.id, chapter.id);
  const result = getQuizResult(progress, unit.id, chapter.id);
  const reviewState = getQuizReviewState(progress, unit.id, chapter.id);
  const mastery = getChapterMasteryStatus(progress, unit, chapter);
  const needsReview = (reviewState?.missedQuestions.length ?? 0) > 0;
  const currentChapterIndex = Math.max(
    0,
    unit.chapters.findIndex((candidate) => candidate.id === chapter.id)
  );
  const previousChapter = currentChapterIndex > 0 ? unit.chapters[currentChapterIndex - 1] : undefined;
  const nextChapter =
    currentChapterIndex < unit.chapters.length - 1 ? unit.chapters[currentChapterIndex + 1] : undefined;
  const unitPositionPercent = completed ? 100 : ((currentChapterIndex + 1) / unit.chapters.length) * 100;
  const proseSurface = isTablet ? theme.colors.surfaceElevated : accent.panel;
  const compact = !isTablet;
  const heroPadding = Math.round(
    interpolateByWidth({
      width,
      minValue: theme.spacing.lg,
      maxValue: theme.spacing.xxl,
      minWidth: 320,
      maxWidth: 1100,
    })
  );
  const heroTitleSize = Math.round(
    interpolateByWidth({
      width,
      minValue: 32,
      maxValue: 52,
      minWidth: 320,
      maxWidth: 1100,
    })
  );
  const heroOverviewSize = Math.round(
    interpolateByWidth({
      width,
      minValue: 18,
      maxValue: 22,
      minWidth: 320,
      maxWidth: 1100,
    })
  );
  const chapterStateSummary = needsReview
    ? 'Quiz review is still outstanding for this chapter.'
    : mastery.quizPassed
      ? 'Quiz passed and ready for spaced review later.'
      : completed
        ? 'Reading completed. The quiz still needs a passing result.'
        : mastery.opened
          ? 'In progress and ready to continue.'
          : 'Not started yet.';

  const sidebar = (
    <View style={{ gap: theme.spacing.lg }}>
      <View
        style={{
          gap: theme.spacing.md,
          borderRadius: theme.radius.xl,
          borderWidth: 1,
          borderColor: accent.line,
          backgroundColor: theme.colors.surfaceElevated,
          padding: theme.spacing.xl,
        }}>
        <Text
          style={{
            color: accent.accent,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}>
          Study controls
        </Text>
        <ProgressBadge
          percentage={unitPositionPercent}
          detail={`Chapter ${currentChapterIndex + 1} of ${unit.chapters.length}${completed ? ' • marked complete' : ''}`}
          accent={accent}
        />
        <BookmarkButton unitId={unit.id} chapterId={chapter.id} />
        <Button
          label={completed ? 'Completed' : 'Mark Complete'}
          icon={completed ? 'checkmark-circle-outline' : 'checkmark-outline'}
          onPress={() => markChapterComplete(unit.id, chapter.id)}
          variant={completed ? 'secondary' : 'primary'}
          accent={accent}
        />
        <Button
          label="Open Flashcards"
          icon="albums-outline"
          variant="secondary"
          onPress={() => router.push(flashcardsRoute(subject.id, topic.id, unit.id, chapter.id))}
          accent={accent}
        />
        <Button
          label="Open Quiz"
          icon="help-circle-outline"
          variant="ghost"
          onPress={() => router.push(quizRoute(subject.id, topic.id, unit.id, chapter.id))}
          accent={accent}
        />
        {needsReview ? (
          <Text
            style={{
              color: theme.colors.textSoft,
              fontFamily: theme.fonts.body,
              fontSize: 14,
              lineHeight: 22,
            }}>
            Retry the missed questions or review the wrong answers from the quiz screen to clear the review state.
          </Text>
        ) : null}
      </View>

      <View
        style={{
          gap: theme.spacing.sm,
          borderRadius: theme.radius.xl,
          borderWidth: 1,
          borderColor: accent.line,
          backgroundColor: accent.panel,
          padding: theme.spacing.xl,
        }}>
        <Text
          style={{
            color: accent.accentStrong,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}>
          Chapter state
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.reading,
            fontSize: 18,
            lineHeight: 28,
          }}>
          {chapterStateSummary}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 14,
            lineHeight: 22,
          }}>
          {bookmarked ? 'Bookmarked for quick return.' : 'Bookmark this chapter to return quickly later.'}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 14,
            lineHeight: 22,
          }}>
          {mastery.reviewedFlashcards > 0
            ? `${mastery.reviewedFlashcards} of ${mastery.totalFlashcards} flashcards reviewed locally.`
            : 'Flashcards not reviewed yet.'}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 14,
            lineHeight: 22,
          }}>
          {result
            ? `Best quiz score: ${formatQuizScore(result.bestScore, result.totalQuestions)}${needsReview ? ' • review still pending' : ''}`
            : 'Quiz not taken yet'}
        </Text>
      </View>

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
            fontSize: 24,
            fontWeight: '700',
          }}>
          Table of contents
        </Text>
        {unit.chapters.map((entry, index) => {
          const entryCompleted = isChapterComplete(progress, unit.id, entry.id);
          const active = entry.id === chapter.id;

          return (
            <Pressable
              key={entry.id}
              accessibilityRole="button"
              onPress={() => router.push(chapterRoute(subject.id, topic.id, unit.id, entry.id))}
              style={({ hovered, pressed }) => ({
                gap: 4,
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: active ? accent.line : theme.colors.border,
                backgroundColor: active ? accent.panel : theme.colors.surface,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                opacity: pressed ? 0.92 : 1,
                transform: [{ translateY: hovered ? -1 : 0 }],
              })}>
              <Text
                style={{
                  color: active ? accent.accent : theme.colors.textSoft,
                  fontFamily: theme.fonts.mono,
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 0.7,
                  textTransform: 'uppercase',
                }}>
                Chapter {index + 1}
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: theme.fonts.body,
                  fontSize: 14,
                  fontWeight: active ? '700' : '600',
                  lineHeight: 22,
                }}>
                {entry.title}
              </Text>
              <Text
                style={{
                  color: active ? accent.accentStrong : theme.colors.textSoft,
                  fontFamily: theme.fonts.mono,
                  fontSize: 11,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}>
                {active ? 'Current chapter' : entryCompleted ? 'Completed' : formatReadingTime(entry.estimatedMinutes)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  const hero = (
    <View
      style={{
        overflow: 'hidden',
        gap: theme.spacing.lg,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: accent.line,
        backgroundColor: accent.heroFrom,
        padding: heroPadding,
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
        Chapter {currentChapterIndex + 1}
      </Text>
      <Text
        style={{
          color: accent.accentContrast,
          fontFamily: theme.fonts.display,
          fontSize: heroTitleSize,
          fontWeight: '700',
          lineHeight: Math.round(heroTitleSize * 1.1),
        }}>
        {chapter.title}
      </Text>
      <Text
        style={{
          maxWidth: compact ? '100%' : 860,
          color: 'rgba(255,255,255,0.82)',
          fontFamily: theme.fonts.reading,
          fontSize: heroOverviewSize,
          lineHeight: heroOverviewSize >= 20 ? 34 : 30,
        }}>
        {chapter.overview}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        }}>
        {[formatReadingTime(chapter.estimatedMinutes), `${chapter.flashcards.length} flashcards`, `${chapter.quiz.length} questions`].map(
          (item) => (
            <View
              key={item}
              style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.18)',
                backgroundColor: 'rgba(255,255,255,0.06)',
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
                maxWidth: '100%',
              }}>
              <Text
                style={{
                  color: accent.accentContrast,
                  fontFamily: theme.fonts.mono,
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 0.7,
                  flexShrink: 1,
                  lineHeight: 18,
                  textTransform: 'uppercase',
                }}>
                {item}
              </Text>
            </View>
          )
        )}
      </View>
    </View>
  );

  return (
    <AppShell
      hero={hero}
      accent={accent}
      breadcrumbs={[
        { label: 'Home', href: homeRoute() },
        { label: subject.title, href: subjectRoute(subject.id) },
        { label: topic.title, href: topicRoute(subject.id, topic.id) },
        { label: unit.title, href: unitRoute(subject.id, topic.id, unit.id) },
        { label: chapter.title },
      ]}>
      <ResponsiveLayout
        sidebar={sidebar}
        sidebarPosition="start"
        sidebarWidth={336}
        mobileSidebarPosition="before">
        <View
          style={{
            width: '100%',
            maxWidth: 860,
            alignSelf: 'center',
            gap: theme.spacing.xl,
          }}>
          <SectionHeader
            eyebrow="Reading"
            title="Digital textbook layout"
            description="Structured local blocks render as long-form reading, preserving a comfortable measure, clear hierarchy, and adjacent study actions."
            accent={accent}
          />

          <View
            style={{
              gap: theme.spacing.md,
              borderRadius: theme.radius.xl,
              borderWidth: 1,
              borderColor: accent.line,
              backgroundColor: accent.panel,
              padding: theme.spacing.xl,
            }}>
            <Text
              style={{
                color: accent.accentStrong,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}>
              Chapter abstract
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.reading,
                fontSize: compact ? 20 : 22,
                lineHeight: compact ? 32 : 36,
              }}>
              {chapter.overview}
            </Text>
          </View>

          <View
            style={{
              gap: theme.spacing.xl,
              borderRadius: theme.radius.xl,
              borderWidth: 1,
              borderColor: accent.line,
              backgroundColor: proseSurface,
              padding: isTablet ? theme.spacing.xxl : theme.spacing.xl,
              ...(isTablet ? theme.shadow.light : {}),
            }}>
            {chapter.blocks.map((block) => {
              if (block.type === 'paragraph') {
                return (
                  <Text
                    key={block.id}
                    style={{
                      color: theme.colors.text,
                      fontFamily: theme.fonts.reading,
                      fontSize: isDesktop ? 20 : 19,
                      lineHeight: isDesktop ? 38 : 34,
                    }}>
                    {block.text}
                  </Text>
                );
              }

              if (block.type === 'bullet-list') {
                return (
                  <View
                    key={block.id}
                    style={{
                      gap: theme.spacing.md,
                      borderRadius: theme.radius.xl,
                      borderWidth: 1,
                      borderColor: accent.line,
                      backgroundColor: theme.colors.surfaceElevated,
                      padding: theme.spacing.xl,
                    }}>
                    {block.title ? (
                      <Text
                        style={{
                          color: theme.colors.text,
                          fontFamily: theme.fonts.display,
                          fontSize: 30,
                          fontWeight: '700',
                        }}>
                        {block.title}
                      </Text>
                    ) : null}
                    {block.items.map((item) => (
                      <View key={item} style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                        <Text
                          style={{
                            color: accent.accent,
                            fontFamily: theme.fonts.mono,
                            fontSize: 16,
                            lineHeight: 30,
                          }}>
                          •
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            color: theme.colors.text,
                            fontFamily: theme.fonts.reading,
                            fontSize: 18,
                            lineHeight: 30,
                          }}>
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                );
              }

              if (block.type === 'equation') {
                return (
                  <View
                    key={block.id}
                    style={{
                      gap: theme.spacing.md,
                      borderRadius: theme.radius.xl,
                      borderWidth: 1,
                      borderColor: accent.line,
                      backgroundColor: theme.colors.surfaceElevated,
                      padding: theme.spacing.xl,
                    }}>
                    {block.title ? (
                      <Text
                        style={{
                          color: theme.colors.text,
                          fontFamily: theme.fonts.display,
                          fontSize: 26,
                          fontWeight: '700',
                        }}>
                        {block.title}
                      </Text>
                    ) : null}
                    <Text
                      style={{
                        color: accent.accentStrong,
                        fontFamily: theme.fonts.mono,
                        fontSize: 18,
                        lineHeight: 28,
                      }}>
                      {block.expression}
                    </Text>
                    {block.explanation ? (
                      <Text
                        style={{
                          color: theme.colors.textMuted,
                          fontFamily: theme.fonts.body,
                          fontSize: 16,
                          lineHeight: 26,
                        }}>
                        {block.explanation}
                      </Text>
                    ) : null}
                  </View>
                );
              }

              if (block.type === 'table') {
                return (
                  <View
                    key={block.id}
                    style={{
                      gap: theme.spacing.md,
                      borderRadius: theme.radius.xl,
                      borderWidth: 1,
                      borderColor: accent.line,
                      backgroundColor: theme.colors.surfaceElevated,
                      padding: theme.spacing.xl,
                    }}>
                    {block.title ? (
                      <Text
                        style={{
                          color: theme.colors.text,
                          fontFamily: theme.fonts.display,
                          fontSize: 26,
                          fontWeight: '700',
                        }}>
                        {block.title}
                      </Text>
                    ) : null}
                    <View style={{ gap: theme.spacing.xs }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: theme.spacing.sm,
                          borderBottomWidth: 1,
                          borderBottomColor: accent.line,
                          paddingBottom: theme.spacing.sm,
                        }}>
                        {block.columns.map((column) => (
                          <Text
                            key={column}
                            style={{
                              flex: 1,
                              color: accent.accentStrong,
                              fontFamily: theme.fonts.mono,
                              fontSize: 12,
                              fontWeight: '700',
                              letterSpacing: 0.8,
                              textTransform: 'uppercase',
                            }}>
                            {column}
                          </Text>
                        ))}
                      </View>
                      {block.rows.map((row, rowIndex) => (
                        <View
                          key={`${block.id}-row-${rowIndex}`}
                          style={{
                            flexDirection: 'row',
                            gap: theme.spacing.sm,
                            paddingVertical: theme.spacing.sm,
                            borderBottomWidth: rowIndex === block.rows.length - 1 ? 0 : 1,
                            borderBottomColor: theme.colors.border,
                          }}>
                          {row.map((value, valueIndex) => (
                            <Text
                              key={`${block.id}-cell-${rowIndex}-${valueIndex}`}
                              style={{
                                flex: 1,
                                color: theme.colors.text,
                                fontFamily: theme.fonts.body,
                                fontSize: 15,
                                lineHeight: 24,
                              }}>
                              {value}
                            </Text>
                          ))}
                        </View>
                      ))}
                    </View>
                    {block.note ? (
                      <Text
                        style={{
                          color: theme.colors.textSoft,
                          fontFamily: theme.fonts.body,
                          fontSize: 14,
                          lineHeight: 22,
                        }}>
                        {block.note}
                      </Text>
                    ) : null}
                  </View>
                );
              }

              if (block.type === 'worked-example') {
                return (
                  <View
                    key={block.id}
                    style={{
                      gap: theme.spacing.md,
                      borderRadius: theme.radius.xl,
                      borderWidth: 1,
                      borderColor: accent.line,
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
                      {block.title}
                    </Text>
                    <Text
                      style={{
                        color: theme.colors.text,
                        fontFamily: theme.fonts.reading,
                        fontSize: 18,
                        lineHeight: 30,
                      }}>
                      {block.prompt}
                    </Text>
                    {block.steps.map((step, stepIndex) => (
                      <View key={`${block.id}-step-${stepIndex}`} style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                        <Text
                          style={{
                            color: accent.accent,
                            fontFamily: theme.fonts.mono,
                            fontSize: 12,
                            fontWeight: '700',
                            letterSpacing: 0.8,
                            textTransform: 'uppercase',
                            lineHeight: 24,
                          }}>
                          Step {stepIndex + 1}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            color: theme.colors.textMuted,
                            fontFamily: theme.fonts.body,
                            fontSize: 16,
                            lineHeight: 24,
                          }}>
                          {step}
                        </Text>
                      </View>
                    ))}
                    {block.takeaway ? (
                      <Text
                        style={{
                          color: accent.accentStrong,
                          fontFamily: theme.fonts.body,
                          fontSize: 15,
                          lineHeight: 24,
                        }}>
                        {block.takeaway}
                      </Text>
                    ) : null}
                  </View>
                );
              }

              if (block.type === 'exercise-set') {
                return (
                  <View
                    key={block.id}
                    style={{
                      gap: theme.spacing.md,
                      borderRadius: theme.radius.xl,
                      borderWidth: 1,
                      borderColor: accent.line,
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
                      {block.title}
                    </Text>
                    <Text
                      style={{
                        color: theme.colors.textMuted,
                        fontFamily: theme.fonts.body,
                        fontSize: 16,
                        lineHeight: 24,
                      }}>
                      {block.instructions}
                    </Text>
                    {block.questions.map((item, itemIndex) => (
                      <View key={`${block.id}-question-${itemIndex}`} style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                        <Text
                          style={{
                            color: accent.accent,
                            fontFamily: theme.fonts.mono,
                            fontSize: 12,
                            fontWeight: '700',
                            letterSpacing: 0.8,
                            textTransform: 'uppercase',
                            lineHeight: 24,
                          }}>
                          {itemIndex + 1}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            color: theme.colors.text,
                            fontFamily: theme.fonts.reading,
                            fontSize: 17,
                            lineHeight: 28,
                          }}>
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                );
              }

              return <FigureBlock key={block.id} block={block} accent={accent} />;
            })}
          </View>

          {chapter.references?.length ? (
            <View
              style={{
                gap: theme.spacing.md,
                borderRadius: theme.radius.xl,
                borderWidth: 1,
                borderColor: accent.line,
                backgroundColor: theme.colors.surfaceElevated,
                padding: theme.spacing.xl,
              }}>
              <Text
                style={{
                  color: accent.accent,
                  fontFamily: theme.fonts.mono,
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                References
              </Text>
              {chapter.references.map((reference) => (
                <View key={`${reference.title}-${reference.detail ?? ''}`} style={{ gap: 2 }}>
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontFamily: theme.fonts.body,
                      fontSize: 16,
                      fontWeight: '600',
                      lineHeight: 24,
                    }}>
                    {reference.title}
                  </Text>
                  {reference.detail ? (
                    <Text
                      style={{
                        color: theme.colors.textMuted,
                        fontFamily: theme.fonts.body,
                        fontSize: 14,
                        lineHeight: 22,
                      }}>
                      {reference.detail}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}

          <View
            style={{
              flexDirection: isDesktop ? 'row' : 'column',
              gap: theme.spacing.md,
              paddingTop: theme.spacing.sm,
            }}>
            {previousChapter ? (
              <View style={{ flex: 1 }}>
                <Button
                  label={`Previous: ${previousChapter.title}`}
                  icon="arrow-back-outline"
                  variant="secondary"
                  style={{ width: '100%' }}
                  onPress={() => router.push(chapterRoute(subject.id, topic.id, unit.id, previousChapter.id))}
                  accent={accent}
                />
              </View>
            ) : null}
            {nextChapter ? (
              <View style={{ flex: 1 }}>
                <Button
                  label={`Next: ${nextChapter.title}`}
                  icon="arrow-forward-outline"
                  style={{ width: '100%' }}
                  onPress={() => router.push(chapterRoute(subject.id, topic.id, unit.id, nextChapter.id))}
                  accent={accent}
                />
              </View>
            ) : null}
          </View>
        </View>
      </ResponsiveLayout>
    </AppShell>
  );
}
