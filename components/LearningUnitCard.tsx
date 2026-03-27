import { Pressable, Text, View } from 'react-native';

import type { LearningUnit } from '@/content/schema';
import { useElementAccent } from '@/hooks/use-element-accent';
import { useAppTheme } from '@/hooks/use-app-theme';
import { ProgressBadge } from '@/components/ProgressBadge';

interface LearningUnitCardProps {
  unit: LearningUnit;
  progressPercentage: number;
  detail: string;
  onPress: () => void;
}

export function LearningUnitCard({
  unit,
  progressPercentage,
  detail,
  onPress,
}: LearningUnitCardProps) {
  const theme = useAppTheme();
  const accent = useElementAccent(unit.id);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ hovered, pressed }) => ({
        gap: theme.spacing.lg,
        overflow: 'hidden',
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: accent.line,
        backgroundColor: theme.colors.surfaceElevated,
        opacity: pressed ? 0.92 : 1,
        transform: [{ translateY: hovered ? -4 : pressed ? 1 : 0 }],
        shadowColor: accent.accent,
        shadowOpacity: hovered ? 0.18 : 0.12,
        shadowRadius: hovered ? 26 : 18,
        shadowOffset: { width: 0, height: hovered ? 16 : 10 },
        elevation: hovered ? 11 : 7,
      })}>
      <View
        style={{
          gap: theme.spacing.lg,
          backgroundColor: accent.heroFrom,
          padding: theme.spacing.xl,
        }}>
        <View
          style={{
            position: 'absolute',
            right: -30,
            top: -10,
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: accent.glow,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: theme.spacing.md,
          }}>
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <Text
              style={{
                color: accent.accentContrast,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.9,
                textTransform: 'uppercase',
              }}>
              {unit.shortTitle}
            </Text>
            <Text
              style={{
                color: accent.accentContrast,
                fontFamily: theme.fonts.display,
                fontSize: 30,
                fontWeight: '700',
              }}>
              {unit.title}
            </Text>
          </View>
          <View
            style={{
              minWidth: 68,
              minHeight: 68,
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.28)',
              backgroundColor: 'rgba(255,255,255,0.08)',
            }}>
            <Text
              style={{
                color: accent.accentContrast,
                fontFamily: theme.fonts.display,
                fontSize: 24,
                fontWeight: '700',
              }}>
              {unit.metadata[0]?.value}
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: 'rgba(248, 247, 243, 0.86)',
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 26,
          }}>
          {unit.summary}
        </Text>
      </View>

      <View style={{ gap: theme.spacing.lg, padding: theme.spacing.xl }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
          }}>
          {unit.hero.facts.slice(0, 3).map((fact) => (
            <View
              key={fact}
              style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: accent.line,
                backgroundColor: accent.panel,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
              }}>
              <Text
                style={{
                  color: accent.accentStrong,
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

        <ProgressBadge percentage={progressPercentage} detail={detail} accent={accent} />
      </View>
    </Pressable>
  );
}
