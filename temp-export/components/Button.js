"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
const react_native_1 = require("react-native");
const vector_icons_1 = require("@expo/vector-icons");
const use_app_theme_1 = require("@/hooks/use-app-theme");
function Button({ label, variant = 'primary', icon, style, accent, ...props }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const palette = accent;
    const backgroundColor = variant === 'primary'
        ? palette?.accent ?? theme.colors.accent
        : variant === 'secondary'
            ? palette?.panel ?? theme.colors.surfaceTinted
            : 'transparent';
    const textColor = variant === 'primary'
        ? palette?.accentContrast ?? theme.colors.textInverse
        : variant === 'secondary'
            ? palette?.accentStrong ?? theme.colors.text
            : palette?.accent ?? theme.colors.text;
    const borderColor = variant === 'ghost'
        ? palette?.line ?? theme.colors.border
        : variant === 'secondary'
            ? palette?.line ?? theme.colors.border
            : 'transparent';
    return (<react_native_1.Pressable accessibilityRole="button" style={({ hovered, pressed }) => [
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
        ]} {...props}>
      <react_native_1.View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.xs,
            minWidth: 0,
        }}>
        {icon ? <vector_icons_1.Ionicons name={icon} size={16} color={textColor}/> : null}
        <react_native_1.Text style={{
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
        </react_native_1.Text>
      </react_native_1.View>
    </react_native_1.Pressable>);
}
