import { Text, View } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';
import { Button } from '@/components/Button';
import type { ElementAccentPalette } from '@/theme/element-accents';
import { formatPercent, formatQuizScore } from '@/utils/format';

interface ScoreSummaryProps {
  score: number;
  total: number;
  bestScore?: number;
  onRetry: () => void;
  accent?: ElementAccentPalette;
}

export function ScoreSummary({ score, total, bestScore, onRetry, accent }: ScoreSummaryProps) {
  const theme = useAppTheme();
  const percentage = total === 0 ? 0 : (score / total) * 100;

  return (
    <View
      style={{
        gap: theme.spacing.lg,
        overflow: 'hidden',
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: accent?.line ?? theme.colors.border,
        backgroundColor: theme.colors.surfaceElevated,
        padding: theme.spacing.xl,
      }}>
      <View style={{ gap: theme.spacing.xs }}>
        <Text
          style={{
            color: accent?.accent ?? theme.colors.teal,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}>
          Score Summary
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 40,
            fontWeight: '700',
          }}>
          {formatQuizScore(score, total)}
        </Text>
        <Text
          style={{
            color: accent?.accentStrong ?? theme.colors.textMuted,
            fontFamily: theme.fonts.reading,
            fontSize: theme.typography.bodyLarge,
            lineHeight: 28,
          }}>
          {formatPercent(percentage)} correct
        </Text>
      </View>

      <View
        style={{
          height: 10,
          borderRadius: theme.radius.pill,
          backgroundColor: accent?.accentMuted ?? theme.colors.surfaceTinted,
          overflow: 'hidden',
        }}>
        <View
          style={{
            width: `${percentage}%`,
            height: '100%',
            borderRadius: theme.radius.pill,
            backgroundColor: accent?.accent ?? theme.colors.accent,
          }}
        />
      </View>

      {typeof bestScore === 'number' ? (
        <Text
          style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 14,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}>
          Best local score: {formatQuizScore(bestScore, total)}
        </Text>
      ) : null}

      <Button label="Retry Quiz" icon="refresh-outline" onPress={onRetry} accent={accent} />
    </View>
  );
}
