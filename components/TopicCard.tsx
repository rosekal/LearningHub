import { Pressable, Text, View } from 'react-native';

import type { Topic } from '@/content/schema';
import { useAppTheme } from '@/hooks/use-app-theme';
import { ProgressBadge } from '@/components/ProgressBadge';

interface TopicCardProps {
  topic: Topic;
  progressPercentage: number;
  detail: string;
  onPress: () => void;
}

export function TopicCard({ topic, progressPercentage, detail, onPress }: TopicCardProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ hovered, pressed }) => ({
        gap: theme.spacing.lg,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surfaceElevated,
        padding: theme.spacing.xl,
        opacity: pressed ? 0.92 : 1,
        transform: [{ translateY: hovered ? -3 : pressed ? 1 : 0 }],
      })}>
      <View style={{ gap: theme.spacing.sm }}>
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
            fontSize: 30,
            fontWeight: '700',
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
              backgroundColor: theme.colors.surfaceOverlay,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.6,
                textTransform: 'uppercase',
              }}>
              {item}
            </Text>
          </View>
        ))}
      </View>
      <ProgressBadge percentage={progressPercentage} detail={detail} />
    </Pressable>
  );
}
