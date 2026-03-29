"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumbs = Breadcrumbs;
const expo_router_1 = require("expo-router");
const vector_icons_1 = require("@expo/vector-icons");
const react_native_1 = require("react-native");
const use_app_theme_1 = require("@/hooks/use-app-theme");
function Breadcrumbs({ items }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    return (<react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: theme.spacing.xs,
            alignSelf: 'flex-start',
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surfaceOverlay,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.xs,
        }}>
      {items.map((item, index) => (<react_native_1.View key={`${item.label}-${index}`} style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: theme.spacing.xs,
            }}>
          {item.href ? (<expo_router_1.Link href={item.href} style={{ textDecorationLine: 'none' }}>
              <react_native_1.Text style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '600',
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                }}>
                {item.label}
              </react_native_1.Text>
            </expo_router_1.Link>) : (<react_native_1.Text style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                }}>
              {item.label}
            </react_native_1.Text>)}
          {index < items.length - 1 ? (<vector_icons_1.Ionicons name="chevron-forward" size={14} color={theme.colors.textSoft}/>) : null}
        </react_native_1.View>))}
    </react_native_1.View>);
}
