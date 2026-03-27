import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import type { FigureContentBlock } from '@/content/schema';
import { ScientificFigure } from '@/components/figures/ScientificFigure';
import { useAppTheme } from '@/hooks/use-app-theme';
import type { ElementAccentPalette } from '@/theme/element-accents';

interface FigureBlockProps {
  block: FigureContentBlock;
  accent?: ElementAccentPalette;
}

export function FigureBlock({ block, accent }: FigureBlockProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        gap: theme.spacing.sm,
        overflow: 'hidden',
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: accent?.line ?? theme.colors.border,
        backgroundColor: theme.colors.surfaceElevated,
        padding: theme.spacing.lg,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.sm,
        }}>
        <Text
          style={{
            color: accent?.accent ?? theme.colors.teal,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}>
          {block.label}
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: accent?.line ?? theme.colors.divider }} />
      </View>
      {block.figure ? (
        <View
          accessible
          accessibilityRole="image"
          accessibilityLabel={block.altText ?? `${block.title}. ${block.caption}`}>
          <ScientificFigure figure={block.figure} accent={accent} theme={theme} />
        </View>
      ) : (
        <View
          style={{
            minHeight: 208,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: accent?.line ?? theme.colors.border,
            backgroundColor: accent?.panel ?? theme.colors.figure,
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.sm,
            padding: theme.spacing.xl,
          }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: accent?.line ?? theme.colors.border,
              backgroundColor: theme.colors.surfaceOverlay,
            }}>
            <Ionicons name="aperture-outline" size={26} color={accent?.accent ?? theme.colors.accent} />
          </View>
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.fonts.display,
              fontSize: 28,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            {block.title}
          </Text>
          <Text
            style={{
              color: theme.colors.textMuted,
              fontFamily: theme.fonts.body,
              fontSize: 15,
              lineHeight: 24,
              textAlign: 'center',
            }}>
            {block.placeholder}
          </Text>
        </View>
      )}
      <Text
        style={{
          color: theme.colors.textMuted,
          fontFamily: theme.fonts.reading,
          fontSize: 14,
          lineHeight: 24,
        }}>
        {block.caption}
      </Text>
    </View>
  );
}
