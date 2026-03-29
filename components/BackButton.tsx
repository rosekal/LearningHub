import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import type { ElementAccentPalette } from '@/theme/element-accents';

interface BackButtonProps {
  label?: string;
  style?: StyleProp<ViewStyle>;
  accent?: ElementAccentPalette;
}

export function BackButton({ label = 'Back', style, accent }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useAppTheme();
  const { isTablet } = useBreakpoints();

  const shouldShow = !isTablet && pathname !== '/' && router.canGoBack();

  if (!shouldShow) {
    return null;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      hitSlop={8}
      onPress={() => router.back()}
      style={({ hovered, pressed }) => [
        {
          minHeight: 44,
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.xs,
          borderRadius: theme.radius.pill,
          borderWidth: 1,
          borderColor: accent?.line ?? theme.colors.border,
          backgroundColor: accent?.panel ?? theme.colors.surfaceElevated,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          opacity: pressed ? 0.88 : 1,
          transform: [{ translateY: hovered ? -1 : 0 }],
        },
        style,
      ]}>
      <Ionicons name="chevron-back" size={16} color={accent?.accent ?? theme.colors.text} />
      <Text
        style={{
          color: accent?.accentStrong ?? theme.colors.text,
          fontFamily: theme.fonts.mono,
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        }}>
        {label}
      </Text>
    </Pressable>
  );
}
