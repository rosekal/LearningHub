import { Pressable, Text, View } from 'react-native';

import type { Subject } from '@/content/schema';
import { useAppTheme } from '@/hooks/use-app-theme';
import { ProgressBadge } from '@/components/ProgressBadge';

interface SubjectCardProps {
  subject: Subject;
  progressPercentage: number;
  detail: string;
  stats: string[];
  onPress: () => void;
}

export function SubjectCard({ subject, progressPercentage, detail, stats, onPress }: SubjectCardProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ hovered, pressed }) => ({
        gap: theme.spacing.lg,
        overflow: 'hidden',
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
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
          gap: theme.spacing.lg,
          backgroundColor: theme.colors.surfaceContrast,
          padding: theme.spacing.xl,
        }}>
        <View
          style={{
            alignSelf: 'flex-start',
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            borderColor: theme.colors.textInverse,
            backgroundColor: theme.colors.overlay,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 6,
          }}>
          <Text
            style={{
              color: theme.colors.textInverse,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 0.8,
              textTransform: 'uppercase',
            }}>
            Subject
          </Text>
        </View>
        <Text
          style={{
            color: theme.colors.textInverse,
            fontFamily: theme.fonts.display,
            fontSize: theme.typography.hero,
            fontWeight: '700',
            lineHeight: 48,
          }}>
          {subject.title}
        </Text>
        <Text
          style={{
            color: 'rgba(248, 247, 243, 0.84)',
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.bodyLarge,
            lineHeight: 30,
          }}>
          {subject.tagline}
        </Text>
      </View>

      <View style={{ gap: theme.spacing.lg, padding: theme.spacing.xl }}>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 26,
          }}>
          {subject.description}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
          paddingHorizontal: theme.spacing.xl,
        }}>
        {stats.map((stat) => (
          <View
            key={stat}
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
                {stat}
              </Text>
            </View>
          ))}
      </View>

      <View style={{ paddingHorizontal: theme.spacing.xl, paddingBottom: theme.spacing.xl }}>
        <ProgressBadge percentage={progressPercentage} detail={detail} />
      </View>
    </Pressable>
  );
}
