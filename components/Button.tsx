import { Pressable, Text, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '@/hooks/use-app-theme';
import type { ElementAccentPalette } from '@/theme/element-accents';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
  accent?: ElementAccentPalette;
}

export function Button({ label, variant = 'primary', icon, style, accent, ...props }: ButtonProps) {
  const theme = useAppTheme();
  const palette = accent;

  const backgroundColor =
    variant === 'primary'
      ? palette?.accent ?? theme.colors.accent
      : variant === 'secondary'
        ? palette?.panel ?? theme.colors.surfaceTinted
        : 'transparent';

  const textColor =
    variant === 'primary'
      ? palette?.accentContrast ?? theme.colors.textInverse
      : variant === 'secondary'
        ? palette?.accentStrong ?? theme.colors.text
        : palette?.accent ?? theme.colors.text;

  const borderColor =
    variant === 'ghost'
      ? palette?.line ?? theme.colors.border
      : variant === 'secondary'
        ? palette?.line ?? theme.colors.border
        : 'transparent';

  return (
    <Pressable
      accessibilityRole="button"
      style={({ hovered, pressed }) => [
        {
          minHeight: 48,
          borderRadius: theme.radius.pill,
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.sm,
          backgroundColor,
          borderWidth: borderColor === 'transparent' ? 0 : 1,
          borderColor,
          opacity: props.disabled ? 0.45 : pressed ? 0.9 : 1,
          transform: [{ translateY: pressed ? 1 : hovered ? -1 : 0 }],
          shadowColor: palette?.accent ?? theme.shadow.light.shadowColor,
          shadowOpacity: variant === 'primary' ? 0.16 : 0,
          shadowRadius: variant === 'primary' ? 16 : 0,
          shadowOffset: { width: 0, height: 10 },
          elevation: variant === 'primary' ? 6 : 0,
        },
        style,
      ]}
      {...props}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.spacing.xs,
          minWidth: 0,
        }}>
        {icon ? <Ionicons name={icon} size={16} color={textColor} /> : null}
        <Text
          style={{
            flexShrink: 1,
            color: textColor,
            fontFamily: theme.fonts.mono,
            fontSize: 13,
            fontWeight: '700',
            letterSpacing: 0.8,
            lineHeight: 18,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
