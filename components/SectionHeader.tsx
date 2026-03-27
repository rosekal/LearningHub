import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';
import type { ElementAccentPalette } from '@/theme/element-accents';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  accent?: ElementAccentPalette;
}

export function SectionHeader({ eyebrow, title, description, action, accent }: SectionHeaderProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: theme.spacing.md,
        paddingBottom: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.divider,
      }}>
      <View style={{ flex: 1, gap: theme.spacing.sm }}>
        {eyebrow ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
            <View
              style={{
                width: 28,
                height: 1,
                backgroundColor: accent?.line ?? theme.colors.borderStrong,
              }}
            />
            <Text
              style={{
                color: accent?.accent ?? theme.colors.teal,
                fontFamily: theme.fonts.mono,
                fontSize: theme.typography.eyebrow,
                fontWeight: '700',
                letterSpacing: 1.4,
                textTransform: 'uppercase',
              }}>
              {eyebrow}
            </Text>
          </View>
        ) : null}
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: theme.typography.display,
            fontWeight: '700',
            lineHeight: 38,
          }}>
          {title}
        </Text>
        {description ? (
          <Text
            style={{
              color: theme.colors.textMuted,
              fontFamily: theme.fonts.body,
              fontSize: theme.typography.bodyLarge,
              lineHeight: 30,
              maxWidth: 860,
            }}>
            {description}
          </Text>
        ) : null}
      </View>
      {action ? <View style={{ paddingTop: theme.spacing.sm }}>{action}</View> : null}
    </View>
  );
}
