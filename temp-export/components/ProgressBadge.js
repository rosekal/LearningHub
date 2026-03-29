"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBadge = ProgressBadge;
const react_native_1 = require("react-native");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const format_1 = require("@/utils/format");
function ProgressBadge({ percentage, detail, accent }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const complete = percentage >= 99.9;
    const value = Math.max(0, Math.min(100, percentage));
    return (<react_native_1.View style={{
            alignSelf: 'stretch',
            gap: theme.spacing.xs,
            minWidth: 0,
            width: '100%',
        }}>
      <react_native_1.View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: theme.spacing.md,
            minWidth: 0,
        }}>
        <react_native_1.View style={{
            alignSelf: 'flex-start',
            borderRadius: theme.radius.pill,
            backgroundColor: complete ? accent?.accentSoft ?? theme.colors.accentSoft : accent?.panel ?? theme.colors.badge,
            borderWidth: 1,
            borderColor: accent?.line ?? theme.colors.border,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 6,
            maxWidth: '72%',
        }}>
          <react_native_1.Text style={{
            color: complete ? accent?.accentStrong ?? theme.colors.accent : accent?.accent ?? theme.colors.textMuted,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 0.7,
            flexShrink: 1,
            textTransform: 'uppercase',
        }}>
            {complete ? 'Completed' : 'Progress'}
          </react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={{
            color: accent?.accent ?? theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 0.6,
        }}>
          {(0, format_1.formatPercent)(value)}
        </react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={{
            width: '100%',
            height: 8,
            borderRadius: theme.radius.pill,
            backgroundColor: accent?.accentMuted ?? theme.colors.surfaceTinted,
            overflow: 'hidden',
        }}>
        <react_native_1.View style={{
            width: `${value}%`,
            height: '100%',
            borderRadius: theme.radius.pill,
            backgroundColor: accent?.accent ?? theme.colors.accent,
        }}/>
      </react_native_1.View>
      {detail ? (<react_native_1.Text style={{
                color: theme.colors.textSoft,
                fontFamily: theme.fonts.body,
                fontSize: 12,
                lineHeight: 18,
                flexShrink: 1,
            }}>
          {detail}
        </react_native_1.Text>) : null}
    </react_native_1.View>);
}
