import { useState } from 'react';
import { type Href, Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { Topic } from '@/content/schema';
import { ProgressBadge } from '@/components/ProgressBadge';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { getElementAccentPalette } from '@/theme/element-accents';
import { interpolateByWidth } from '@/utils/responsive';

interface TopicCardProps {
  topic: Topic;
  progressPercentage: number;
  detail: string;
  onPress: () => void;
  href?: Href;
  accentId?: string;
}

export function TopicCard({
  topic,
  progressPercentage,
  detail,
  onPress,
  href,
  accentId,
}: TopicCardProps) {
  const theme = useAppTheme();
  const { width } = useBreakpoints();
  const [isFocused, setIsFocused] = useState(false);
  const palette = getElementAccentPalette(accentId ?? topic.learningUnits[0]?.id, theme);
  const chapterCount = topic.learningUnits.reduce((count, unit) => count + unit.chapters.length, 0);
  const titleSize = Math.round(
    interpolateByWidth({
      width,
      minValue: 24,
      maxValue: theme.typography.display,
      minWidth: 320,
      maxWidth: 768,
    })
  );

  const card = (
    <Pressable
      accessibilityRole={href ? 'link' : 'button'}
      accessibilityLabel={`Open topic ${topic.title}`}
      accessibilityHint={`Open ${topic.learningUnits.length} units and ${chapterCount} chapter readings`}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onPress={onPress}
      style={({ hovered, pressed }) => ({
        overflow: 'hidden',
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: isFocused ? palette.accent : palette.line,
        backgroundColor: theme.colors.surfaceElevated,
        opacity: pressed ? 0.92 : 1,
        transform: [{ translateY: hovered ? -3 : pressed ? 1 : 0 }],
        shadowColor: theme.shadow.medium.shadowColor,
        shadowOpacity: hovered ? 0.16 : 0.1,
        shadowRadius: 26,
        shadowOffset: { width: 0, height: 14 },
        elevation: hovered ? 10 : 6,
      })}>
      <View
        style={{
          gap: theme.spacing.md,
          backgroundColor: palette.panel,
          padding: theme.spacing.lg,
        }}>
        <View
          style={{
            alignSelf: 'flex-start',
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            borderColor: palette.line,
            backgroundColor: palette.accentMuted,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 6,
          }}>
          <Text
            style={{
              color: palette.accentStrong,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 0.8,
              textTransform: 'uppercase',
            }}>
            Topic
          </Text>
        </View>
        <Text
          style={{
            color: palette.accentStrong,
            fontFamily: theme.fonts.display,
            fontSize: titleSize,
            fontWeight: '700',
            lineHeight: Math.round(titleSize * 1.12),
          }}>
          {topic.title}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 26,
          }}
          numberOfLines={4}>
          {topic.description}
        </Text>
      </View>

      <View
        style={{
          gap: theme.spacing.md,
          borderTopWidth: 1,
          borderTopColor: palette.line,
          backgroundColor: theme.colors.surfaceElevated,
          padding: theme.spacing.lg,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
          }}>
          {[
            `${topic.learningUnits.length} units`,
            `${chapterCount} chapters`,
          ].map((item) => (
            <View
              key={item}
              style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: palette.line,
                backgroundColor: palette.panel,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
                maxWidth: '100%',
              }}>
              <Text
                style={{
                  color: palette.accentStrong,
                  fontFamily: theme.fonts.mono,
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 0.6,
                  flexShrink: 1,
                  lineHeight: 18,
                  textTransform: 'uppercase',
                }}>
                {item}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            gap: theme.spacing.sm,
            paddingTop: theme.spacing.sm,
            borderTopWidth: 1,
            borderTopColor: palette.line,
          }}>
          <Text
            style={{
              color: palette.accent,
              fontFamily: theme.fonts.mono,
              fontSize: 11,
              fontWeight: '700',
              letterSpacing: 0.8,
              textTransform: 'uppercase',
            }}>
            Topic progress
          </Text>
          <ProgressBadge percentage={progressPercentage} detail={detail} accent={palette} />
        </View>
      </View>
    </Pressable>
  );

  return href ? (
    <Link href={href} asChild>
      {card}
    </Link>
  ) : (
    card
  );
}
