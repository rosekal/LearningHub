"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionHeader = SectionHeader;
const react_native_1 = require("react-native");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
const responsive_1 = require("@/utils/responsive");
function SectionHeader({ eyebrow, title, description, action, accent }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const { width, isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    const titleSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: 28,
        maxValue: theme.typography.display,
        minWidth: 320,
        maxWidth: 768,
    }));
    const descriptionSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: theme.typography.body,
        maxValue: theme.typography.bodyLarge,
        minWidth: 320,
        maxWidth: 768,
    }));
    return (<react_native_1.View style={{
            flexDirection: isTablet ? 'row' : 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: theme.spacing.md,
            paddingBottom: theme.spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.divider,
        }}>
      <react_native_1.View style={{ flex: 1, gap: theme.spacing.sm }}>
        {eyebrow ? (<react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
            <react_native_1.View style={{
                width: 28,
                height: 1,
                backgroundColor: accent?.line ?? theme.colors.borderStrong,
            }}/>
            <react_native_1.Text style={{
                color: accent?.accent ?? theme.colors.teal,
                fontFamily: theme.fonts.mono,
                fontSize: theme.typography.eyebrow,
                fontWeight: '700',
                letterSpacing: 1.4,
                textTransform: 'uppercase',
            }}>
              {eyebrow}
            </react_native_1.Text>
          </react_native_1.View>) : null}
        <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: titleSize,
            fontWeight: '700',
            lineHeight: Math.round(titleSize * 1.12),
        }}>
          {title}
        </react_native_1.Text>
        {description ? (<react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: descriptionSize,
                lineHeight: descriptionSize >= 18 ? 30 : 26,
                maxWidth: isTablet ? 860 : '100%',
            }}>
            {description}
          </react_native_1.Text>) : null}
      </react_native_1.View>
      {action ? <react_native_1.View style={{ paddingTop: theme.spacing.sm }}>{action}</react_native_1.View> : null}
    </react_native_1.View>);
}
