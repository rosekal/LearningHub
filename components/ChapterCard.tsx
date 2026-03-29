import { Text, View } from 'react-native';

import type { Chapter } from '@/content/schema';
import { useElementAccent } from '@/hooks/use-element-accent';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { Button } from '@/components/Button';
import { BookmarkButton } from '@/components/BookmarkButton';
import { ProgressBadge } from '@/components/ProgressBadge';
import { formatReadingTime } from '@/utils/format';
import { interpolateByWidth } from '@/utils/responsive';

interface ChapterCardProps {
  unitId: string;
  chapter: Chapter;
  completed: boolean;
  scoreLabel?: string;
  onPress: () => void;
}

export function ChapterCard({
  unitId,
  chapter,
  completed,
  scoreLabel,
  onPress,
}: ChapterCardProps) {
  const theme = useAppTheme();
  const accent = useElementAccent(unitId);
  const { width, isTablet } = useBreakpoints();
  const compact = !isTablet;
  const titleSize = Math.round(
    interpolateByWidth({
      width,
      minValue: 22,
      maxValue: 28,
      minWidth: 320,
      maxWidth: 768,
    })
  );

  return (
    <View
      style={{
        gap: theme.spacing.lg,
        overflow: 'hidden',
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: accent.line,
        backgroundColor: theme.colors.surfaceElevated,
        padding: compact ? theme.spacing.lg : theme.spacing.xl,
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: accent.accent,
        }}
      />
      <View
        style={{
          flexDirection: compact ? 'column' : 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: theme.spacing.md,
          minWidth: 0,
        }}>
        <View style={{ flex: 1, gap: theme.spacing.xs }}>
          <Text
            style={{
              color: accent.accent,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 0.9,
              textTransform: 'uppercase',
            }}>
            Chapter
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.fonts.display,
              fontSize: titleSize,
              fontWeight: '700',
              lineHeight: Math.round(titleSize * 1.15),
              flexShrink: 1,
            }}>
            {chapter.title}
          </Text>
          <Text
            style={{
              color: theme.colors.textMuted,
              fontFamily: theme.fonts.body,
              fontSize: theme.typography.body,
              lineHeight: 24,
            }}>
            {chapter.overview}
          </Text>
        </View>
        <BookmarkButton unitId={unitId} chapterId={chapter.id} compact />
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        }}>
        <View
          style={{
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: accent.panel,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 8,
            maxWidth: '100%',
          }}>
          <Text
            style={{
              color: accent.accentStrong,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 0.6,
              flexShrink: 1,
              lineHeight: 18,
              textTransform: 'uppercase',
            }}>
            {formatReadingTime(chapter.estimatedMinutes)}
          </Text>
        </View>
        {scoreLabel ? (
          <View
            style={{
              borderRadius: theme.radius.pill,
              borderWidth: 1,
              borderColor: accent.line,
              backgroundColor: theme.colors.surfaceOverlay,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: 8,
              maxWidth: '100%',
            }}>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.6,
                flexShrink: 1,
                lineHeight: 18,
                textTransform: 'uppercase',
              }}>
              {scoreLabel}
            </Text>
          </View>
        ) : null}
      </View>

      <ProgressBadge
        percentage={completed ? 100 : 0}
        detail={completed ? 'Marked complete' : 'Not completed yet'}
        accent={accent}
      />

      <Button label="Open Chapter" icon="book-outline" onPress={onPress} accent={accent} />
    </View>
  );
}
