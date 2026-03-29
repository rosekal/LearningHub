import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { useAppTheme } from '@/hooks/use-app-theme';
import type { ElementAccentPalette } from '@/theme/element-accents';

interface RecommendedActionCardProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  onPress: () => void;
  accent?: ElementAccentPalette;
  tags?: string[];
}

export function RecommendedActionCard({
  eyebrow,
  title,
  description,
  ctaLabel,
  onPress,
  accent,
  tags = [],
}: RecommendedActionCardProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        gap: theme.spacing.lg,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: accent?.line ?? theme.colors.border,
        backgroundColor: theme.colors.surfaceElevated,
        padding: theme.spacing.xl,
      }}>
      <View style={{ gap: theme.spacing.sm }}>
        <Text
          style={{
            color: accent?.accent ?? theme.colors.accent,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}>
          {eyebrow}
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 30,
            fontWeight: '700',
            lineHeight: 36,
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 24,
          }}>
          {description}
        </Text>
      </View>

      {tags.length ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
          {tags.map((tag) => (
            <View
              key={tag}
              style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: accent?.line ?? theme.colors.border,
                backgroundColor: accent?.panel ?? theme.colors.surfaceOverlay,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
              }}>
              <Text
                style={{
                  color: accent?.accentStrong ?? theme.colors.textMuted,
                  fontFamily: theme.fonts.mono,
                  fontSize: 11,
                  fontWeight: '700',
                  letterSpacing: 0.7,
                  textTransform: 'uppercase',
                }}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      <Button label={ctaLabel} icon="arrow-forward-outline" onPress={onPress} accent={accent} />
    </View>
  );
}
