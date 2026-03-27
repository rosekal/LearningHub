import { Text, View } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';
import type { ElementAccentPalette } from '@/theme/element-accents';
import { formatPercent } from '@/utils/format';

interface ProgressBadgeProps {
  percentage: number;
  detail?: string;
  accent?: ElementAccentPalette;
}

export function ProgressBadge({ percentage, detail, accent }: ProgressBadgeProps) {
  const theme = useAppTheme();
  const complete = percentage >= 99.9;
  const value = Math.max(0, Math.min(100, percentage));

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        gap: theme.spacing.xs,
        minWidth: 180,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: theme.spacing.md }}>
        <View
          style={{
            alignSelf: 'flex-start',
            borderRadius: theme.radius.pill,
            backgroundColor: complete ? accent?.accentSoft ?? theme.colors.accentSoft : accent?.panel ?? theme.colors.badge,
            borderWidth: 1,
            borderColor: accent?.line ?? theme.colors.border,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 6,
          }}>
          <Text
            style={{
              color: complete ? accent?.accentStrong ?? theme.colors.accent : accent?.accent ?? theme.colors.textMuted,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 0.7,
              textTransform: 'uppercase',
            }}>
            {complete ? 'Completed' : 'Progress'}
          </Text>
        </View>
        <Text
          style={{
            color: accent?.accent ?? theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 0.6,
          }}>
          {formatPercent(value)}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 8,
          borderRadius: theme.radius.pill,
          backgroundColor: accent?.accentMuted ?? theme.colors.surfaceTinted,
          overflow: 'hidden',
        }}>
        <View
          style={{
            width: `${value}%`,
            height: '100%',
            borderRadius: theme.radius.pill,
            backgroundColor: accent?.accent ?? theme.colors.accent,
          }}
        />
      </View>
      {detail ? (
        <Text
          style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.body,
            fontSize: 12,
            lineHeight: 18,
          }}>
          {detail}
        </Text>
      ) : null}
    </View>
  );
}
