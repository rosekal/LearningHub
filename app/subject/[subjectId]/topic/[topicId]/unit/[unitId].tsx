import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { ChapterCard } from '@/components/ChapterCard';
import { ResponsiveLayout } from '@/components/ResponsiveLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { useElementAccent } from '@/hooks/use-element-accent';
import { useAppTheme } from '@/hooks/use-app-theme';
import { getSubjectById, getTopicById, getUnitById } from '@/content/catalog';
import { getNextChapter, getQuizResult, getUnitProgress, isChapterComplete } from '@/features/learning/selectors';
import { useStudy } from '@/hooks/use-study';
import { chapterRoute, homeRoute, subjectRoute, topicRoute } from '@/utils/routes';
import { getUnitStaticParams } from '@/utils/static-params';
import { formatQuizScore } from '@/utils/format';

export function generateStaticParams() {
  return getUnitStaticParams();
}

export default function UnitScreen() {
  const { subjectId, topicId, unitId } = useLocalSearchParams<{
    subjectId: string;
    topicId: string;
    unitId: string;
  }>();
  const subject = getSubjectById(subjectId);
  const topic = getTopicById(subjectId, topicId);
  const unit = getUnitById(subjectId, topicId, unitId);
  const theme = useAppTheme();
  const router = useRouter();
  const { progress } = useStudy();
  const accent = useElementAccent(unit?.id);

  if (!subject || !topic || !unit) {
    return (
      <AppShell>
        <Text style={{ color: theme.colors.text }}>Learning unit not found.</Text>
      </AppShell>
    );
  }

  const unitProgress = getUnitProgress(progress, unit);
  const nextChapter = getNextChapter(unit, progress);

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
          Read book
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 30,
            fontWeight: '700',
          }}>
          Continue with {nextChapter.title}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 26,
          }}>
          This unit is structured as an eight-chapter scientific monograph with glossary support,
          flashcards, quizzes, and locally persisted study state.
        </Text>
        <Button
          label="Continue Reading"
          icon="play-outline"
          onPress={() => router.push(chapterRoute(subject.id, topic.id, unit.id, nextChapter.id))}
          accent={accent}
        />
      </View>

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
          At a glance
        </Text>
        {unit.metadata.map((item) => (
          <View
            key={item.label}
            style={{
              gap: 4,
              paddingBottom: theme.spacing.sm,
              borderBottomWidth: 1,
              borderBottomColor: accent.line,
            }}>
            <Text
              style={{
                color: accent.accent,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}>
              {item.label}
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.reading,
                fontSize: 19,
                lineHeight: 28,
              }}>
              {item.value}
            </Text>
          </View>
        ))}
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
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 26,
            fontWeight: '700',
          }}>
          Glossary
        </Text>
        {unit.glossary.map((term) => (
          <View key={term.term} style={{ gap: 4 }}>
            <Text
              style={{
                color: accent.accent,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.7,
                textTransform: 'uppercase',
              }}>
              {term.term}
            </Text>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: 14,
                lineHeight: 22,
              }}>
              {term.definition}
            </Text>
          </View>
        ))}
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
        padding: theme.spacing.xxl,
      }}>
      <View
        style={{
          position: 'absolute',
          right: -20,
          top: -20,
          width: 240,
          height: 240,
          borderRadius: 120,
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
        {unit.hero.eyebrow}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: theme.spacing.lg,
        }}>
        <View style={{ flex: 1, gap: theme.spacing.md }}>
          <Text
            style={{
              color: accent.accentContrast,
              fontFamily: theme.fonts.display,
              fontSize: 58,
              fontWeight: '700',
            }}>
            {unit.title}
          </Text>
          <Text
            style={{
              maxWidth: 820,
              color: 'rgba(255,255,255,0.84)',
              fontFamily: theme.fonts.body,
              fontSize: theme.typography.bodyLarge,
              lineHeight: 30,
            }}>
            {unit.overview}
          </Text>
        </View>
        <View
          style={{
            minWidth: 92,
            minHeight: 92,
            borderRadius: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.22)',
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}>
          <Text
            style={{
              color: accent.accentContrast,
              fontFamily: theme.fonts.display,
              fontSize: 38,
              fontWeight: '700',
            }}>
            {unit.metadata[0]?.value}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        }}>
        {unit.hero.facts.map((fact) => (
          <View
            key={fact}
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
                color: accent.accentContrast,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.6,
                textTransform: 'uppercase',
              }}>
              {fact}
            </Text>
          </View>
        ))}
      </View>
      <Text
        style={{
          color: 'rgba(255,255,255,0.72)',
          fontFamily: theme.fonts.mono,
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        }}>
        {unitProgress.completed} of {unitProgress.total} chapters completed
      </Text>
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
        { label: unit.title },
      ]}>
      <ResponsiveLayout sidebar={sidebar} sidebarPosition="start" sidebarWidth={336}>
        <View style={{ gap: theme.spacing.lg }}>
          <SectionHeader
            eyebrow="Chapters"
            title="The book"
            description="Read the unit sequentially or move directly to a chapter. Each entry preserves completion, bookmarks, flashcard review state, and quiz scores locally."
            accent={accent}
          />
          {unit.chapters.map((chapter) => {
            const completed = isChapterComplete(progress, unit.id, chapter.id);
            const result = getQuizResult(progress, unit.id, chapter.id);

            return (
              <ChapterCard
                key={chapter.id}
                unitId={unit.id}
                chapter={chapter}
                completed={completed}
                scoreLabel={
                  result ? `Best quiz score ${formatQuizScore(result.bestScore, result.totalQuestions)}` : undefined
                }
                onPress={() => router.push(chapterRoute(subject.id, topic.id, unit.id, chapter.id))}
              />
            );
          })}
        </View>
      </ResponsiveLayout>
    </AppShell>
  );
}
