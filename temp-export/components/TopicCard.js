"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicCard = TopicCard;
const expo_router_1 = require("expo-router");
const react_native_1 = require("react-native");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
const ProgressBadge_1 = require("@/components/ProgressBadge");
const responsive_1 = require("@/utils/responsive");
function TopicCard({ topic, progressPercentage, detail, onPress, href }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const { width, isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    const compact = !isTablet;
    const titleSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: 24,
        maxValue: 30,
        minWidth: 320,
        maxWidth: 768,
    }));
    const card = (<react_native_1.Pressable accessibilityRole={href ? 'link' : 'button'} accessibilityLabel={`Open topic ${topic.title}`} onPress={onPress} style={({ hovered, pressed }) => ({
            overflow: 'hidden',
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: theme.colors.borderStrong,
            backgroundColor: theme.colors.surfaceElevated,
            opacity: pressed ? 0.92 : 1,
            transform: [{ translateY: hovered ? -3 : pressed ? 1 : 0 }],
            shadowColor: theme.shadow.medium.shadowColor,
            shadowOpacity: hovered ? 0.16 : 0.11,
            shadowRadius: hovered ? 24 : 16,
            shadowOffset: { width: 0, height: hovered ? 14 : 10 },
            elevation: hovered ? 10 : 6,
        })}>
      <react_native_1.View style={{
            gap: theme.spacing.sm,
            backgroundColor: theme.colors.surfaceElevated,
            padding: compact ? theme.spacing.lg : theme.spacing.xl,
        }}>
        <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
          <react_native_1.Text style={{
            color: theme.colors.teal,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
            Topic
          </react_native_1.Text>
          <react_native_1.View style={{ flex: 1, height: 1, backgroundColor: theme.colors.divider }}/>
        </react_native_1.View>
        <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: titleSize,
            fontWeight: '700',
            lineHeight: Math.round(titleSize * 1.15),
        }}>
          {topic.title}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 24,
        }}>
          {topic.description}
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={{
            gap: theme.spacing.lg,
            borderTopWidth: 1,
            borderTopColor: theme.colors.borderStrong,
            backgroundColor: theme.colors.surfaceTinted,
            padding: compact ? theme.spacing.lg : theme.spacing.xl,
        }}>
        <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
          {[
            topic.sectionLabel,
            `${topic.learningUnits.length} units`,
            `${topic.learningUnits.reduce((count, unit) => count + unit.chapters.length, 0)} chapters`,
        ].map((item) => (<react_native_1.View key={item} style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surfaceElevated,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
                maxWidth: '100%',
            }}>
              <react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.6,
                flexShrink: 1,
                lineHeight: 18,
                textTransform: 'uppercase',
            }}>
                {item}
              </react_native_1.Text>
            </react_native_1.View>))}
        </react_native_1.View>
        <react_native_1.View style={{
            gap: theme.spacing.sm,
            paddingTop: theme.spacing.md,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
        }}>
          <react_native_1.View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: theme.spacing.sm,
            minWidth: 0,
        }}>
            <react_native_1.Text style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
              Topic progress
            </react_native_1.Text>
            <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 13,
            lineHeight: 18,
            flexShrink: 1,
            textAlign: 'right',
        }}>
              {detail}
            </react_native_1.Text>
          </react_native_1.View>
          <ProgressBadge_1.ProgressBadge percentage={progressPercentage}/>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Pressable>);
    return href ? (<expo_router_1.Link href={href} asChild>
      {card}
    </expo_router_1.Link>) : (card);
}
