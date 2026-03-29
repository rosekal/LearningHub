"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectCard = SubjectCard;
const expo_router_1 = require("expo-router");
const react_native_1 = require("react-native");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
const ProgressBadge_1 = require("@/components/ProgressBadge");
const element_accents_1 = require("@/theme/element-accents");
const responsive_1 = require("@/utils/responsive");
function SubjectCard({ subject, progressPercentage, detail, stats, onPress, href, variant = 'featured', eyebrow = 'Subject', }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const { width, isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    const palette = (0, element_accents_1.getElementAccentPalette)(subject.accent, theme);
    const compact = variant === 'compact';
    const useCondensedSpacing = compact || !isTablet;
    const titleSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: compact ? 24 : 30,
        maxValue: compact ? theme.typography.display : theme.typography.hero,
        minWidth: 320,
        maxWidth: 768,
    }));
    const headerTextColor = compact ? palette.accentStrong : theme.colors.textInverse;
    const headerMetaColor = compact ? theme.colors.textMuted : 'rgba(248, 247, 243, 0.84)';
    const headerBorderColor = compact ? palette.line : theme.colors.textInverse;
    const cardBorderColor = compact ? palette.line : theme.colors.border;
    const headerBackgroundColor = compact ? palette.panel : theme.colors.surfaceContrast;
    const card = (<react_native_1.Pressable accessibilityRole={href ? 'link' : 'button'} accessibilityLabel={`Open ${subject.title}`} onPress={onPress} style={({ hovered, pressed }) => ({
            overflow: 'hidden',
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: cardBorderColor,
            backgroundColor: theme.colors.surfaceElevated,
            opacity: pressed ? 0.92 : 1,
            transform: [{ translateY: hovered ? -3 : pressed ? 1 : 0 }],
            shadowColor: theme.shadow.medium.shadowColor,
            shadowOpacity: hovered ? 0.16 : 0.1,
            shadowRadius: 26,
            shadowOffset: { width: 0, height: 14 },
            elevation: hovered ? 10 : 6,
        })}>
      <react_native_1.View style={{
            gap: useCondensedSpacing ? theme.spacing.md : theme.spacing.lg,
            backgroundColor: headerBackgroundColor,
            padding: useCondensedSpacing ? theme.spacing.lg : theme.spacing.xl,
        }}>
        <react_native_1.View style={{
            alignSelf: 'flex-start',
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            borderColor: headerBorderColor,
            backgroundColor: compact ? palette.accentMuted : theme.colors.overlay,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 6,
        }}>
          <react_native_1.Text style={{
            color: compact ? palette.accentStrong : theme.colors.textInverse,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
            {eyebrow}
          </react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={{
            color: headerTextColor,
            fontFamily: theme.fonts.display,
            fontSize: titleSize,
            fontWeight: '700',
            lineHeight: Math.round(titleSize * 1.12),
        }} numberOfLines={compact ? 2 : 3}>
          {subject.title}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: headerMetaColor,
            fontFamily: theme.fonts.body,
            fontSize: compact ? theme.typography.body : theme.typography.bodyLarge,
            lineHeight: compact ? 26 : 30,
        }} numberOfLines={compact ? 3 : 4}>
          {subject.tagline}
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={{
            gap: useCondensedSpacing ? theme.spacing.md : theme.spacing.lg,
            borderTopWidth: 1,
            borderTopColor: compact ? palette.line : theme.colors.border,
            backgroundColor: compact ? theme.colors.surfaceElevated : theme.colors.surfaceOverlay,
            padding: useCondensedSpacing ? theme.spacing.lg : theme.spacing.xl,
        }}>
        <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 26,
        }} numberOfLines={compact ? 3 : 4}>
          {subject.description}
        </react_native_1.Text>
        <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
          {stats.map((stat) => (<react_native_1.View key={stat} style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: compact ? palette.line : theme.colors.border,
                backgroundColor: compact ? palette.panel : theme.colors.surface,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
                maxWidth: '100%',
            }}>
              <react_native_1.Text style={{
                color: compact ? palette.accentStrong : theme.colors.textMuted,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.6,
                flexShrink: 1,
                lineHeight: 18,
                textTransform: 'uppercase',
            }}>
                {stat}
              </react_native_1.Text>
            </react_native_1.View>))}
        </react_native_1.View>

        <react_native_1.View style={{
            gap: theme.spacing.sm,
            paddingTop: theme.spacing.sm,
            borderTopWidth: 1,
            borderTopColor: compact ? palette.line : theme.colors.border,
        }}>
          <react_native_1.Text style={{
            color: compact ? palette.accent : theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
            Subject progress
          </react_native_1.Text>
          <ProgressBadge_1.ProgressBadge percentage={progressPercentage} detail={detail} accent={palette}/>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Pressable>);
    return href ? (<expo_router_1.Link href={href} asChild>
      {card}
    </expo_router_1.Link>) : (card);
}
