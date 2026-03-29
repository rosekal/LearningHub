import { type Href, Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { Topic } from '@/content/schema';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { ProgressBadge } from '@/components/ProgressBadge';
import { interpolateByWidth } from '@/utils/responsive';

interface TopicCardProps {
  topic: Topic;
  progressPercentage: number;
  detail: string;
  onPress: () => void;
  href?: Href;
}

export function TopicCard({ topic, progressPercentage, detail, onPress, href }: TopicCardProps) {
  const theme = useAppTheme();
  const { width, isTablet } = useBreakpoints();
  const compact = !isTablet;
  const titleSize = Math.round(
    interpolateByWidth({
      width,
      minValue: 24,
      maxValue: 30,
      minWidth: 320,
      maxWidth: 768,
    })
  );

  const card = (
    <Pressable
      accessibilityRole={href ? 'link' : 'button'}
      accessibilityLabel={`Open topic ${topic.title}`}
      onPress={onPress}
      style={({ hovered, pressed }) => ({
        overflow: 'hidden',
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.borderStrong,
        backgroundColor: theme.colors.surfaceElevated,
        opacity: pressed ? 0.92 : 1,
        transform: [{ translateY: hovered ? -3 : pressed ? 1 : 0 }],
        shadowColor: theme.shadow.medium.shadowColor,
        shadowOpacity: hovered ? 0.16 : 0.11,
        shadowRadius: hovered ? 24 : 16,
        shadowOffset: { width: 0, height: hovered ? 14 : 10 },
        elevation: hovered ? 10 : 6,
      })}>
      <View
        style={{
          gap: theme.spacing.sm,
          backgroundColor: theme.colors.surfaceElevated,
          padding: compact ? theme.spacing.lg : theme.spacing.xl,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
          <Text
            style={{
              color: theme.colors.teal,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
            Topic
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.divider }} />
        </View>
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: titleSize,
            fontWeight: '700',
            lineHeight: Math.round(titleSize * 1.15),
          }}>
          {topic.title}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 24,
          }}>
          {topic.description}
        </Text>
      </View>

      <View
        style={{
          gap: theme.spacing.lg,
          borderTopWidth: 1,
          borderTopColor: theme.colors.borderStrong,
          backgroundColor: theme.colors.surfaceTinted,
          padding: compact ? theme.spacing.lg : theme.spacing.xl,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
          }}>
          {[
            topic.sectionLabel,
            `${topic.learningUnits.length} units`,
            `${topic.learningUnits.reduce((count, unit) => count + unit.chapters.length, 0)} chapters`,
          ].map((item) => (
            <View
              key={item}
              style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surfaceElevated,
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
                {item}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            gap: theme.spacing.sm,
            paddingTop: theme.spacing.md,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: theme.spacing.sm,
              minWidth: 0,
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
              Topic progress
            </Text>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: 13,
                lineHeight: 18,
                flexShrink: 1,
                textAlign: 'right',
              }}>
              {detail}
            </Text>
          </View>
          <ProgressBadge percentage={progressPercentage} />
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
