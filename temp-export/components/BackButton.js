"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackButton = BackButton;
const vector_icons_1 = require("@expo/vector-icons");
const expo_router_1 = require("expo-router");
const react_native_1 = require("react-native");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
function BackButton({ label = 'Back', style, accent }) {
    const router = (0, expo_router_1.useRouter)();
    const pathname = (0, expo_router_1.usePathname)();
    const theme = (0, use_app_theme_1.useAppTheme)();
    const { isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    const shouldShow = !isTablet && pathname !== '/' && router.canGoBack();
    if (!shouldShow) {
        return null;
    }
    return (<react_native_1.Pressable accessibilityRole="button" accessibilityLabel="Go back" hitSlop={8} onPress={() => router.back()} style={({ hovered, pressed }) => [
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
      <vector_icons_1.Ionicons name="chevron-back" size={16} color={accent?.accent ?? theme.colors.text}/>
      <react_native_1.Text style={{
            color: accent?.accentStrong ?? theme.colors.text,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
        {label}
      </react_native_1.Text>
    </react_native_1.Pressable>);
}
