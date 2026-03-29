"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningUnitCard = LearningUnitCard;
const expo_router_1 = require("expo-router");
const react_native_1 = require("react-native");
const use_element_accent_1 = require("@/hooks/use-element-accent");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
const ProgressBadge_1 = require("@/components/ProgressBadge");
const responsive_1 = require("@/utils/responsive");
function LearningUnitCard({ unit, progressPercentage, detail, searchMatchLabel, onPress, href, }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const accent = (0, use_element_accent_1.useElementAccent)(unit.id);
    const { width, isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    const compact = !isTablet;
    const titleSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: 24,
        maxValue: 30,
        minWidth: 320,
        maxWidth: 768,
    }));
    const card = (<react_native_1.Pressable accessibilityRole={href ? 'link' : 'button'} accessibilityLabel={`Open ${unit.title}`} onPress={onPress} style={({ hovered, pressed }) => ({
            overflow: 'hidden',
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: accent.panel,
            opacity: pressed ? 0.92 : 1,
            transform: [{ translateY: hovered ? -4 : pressed ? 1 : 0 }],
            shadowColor: accent.accent,
            shadowOpacity: hovered ? 0.18 : 0.12,
            shadowRadius: hovered ? 26 : 18,
            shadowOffset: { width: 0, height: hovered ? 16 : 10 },
            elevation: hovered ? 11 : 7,
        })}>
      <react_native_1.View style={{
            gap: theme.spacing.lg,
            backgroundColor: accent.heroFrom,
            padding: compact ? theme.spacing.lg : theme.spacing.xl,
        }}>
        <react_native_1.View style={{
            position: 'absolute',
            right: -30,
            top: -10,
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: accent.glow,
        }}/>
        <react_native_1.View style={{
            flexDirection: compact ? 'column' : 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: theme.spacing.md,
            minWidth: 0,
        }}>
          <react_native_1.View style={{ flex: 1, gap: theme.spacing.xs }}>
            <react_native_1.Text style={{
            color: accent.accentContrast,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 0.9,
            textTransform: 'uppercase',
        }}>
              {unit.shortTitle}
            </react_native_1.Text>
            <react_native_1.Text style={{
            color: accent.accentContrast,
            fontFamily: theme.fonts.display,
            fontSize: titleSize,
            fontWeight: '700',
            lineHeight: Math.round(titleSize * 1.15),
            flexShrink: 1,
        }}>
              {unit.title}
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={{
            minWidth: compact ? 60 : 68,
            minHeight: compact ? 60 : 68,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.28)',
            backgroundColor: 'rgba(255,255,255,0.08)',
            alignSelf: compact ? 'flex-start' : 'auto',
            paddingHorizontal: compact ? theme.spacing.md : theme.spacing.sm,
        }}>
            <react_native_1.Text style={{
            color: accent.accentContrast,
            fontFamily: theme.fonts.display,
            fontSize: compact ? 22 : 24,
            fontWeight: '700',
        }}>
              {unit.metadata[0]?.value}
            </react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>

        <react_native_1.Text style={{
            color: 'rgba(248, 247, 243, 0.86)',
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: compact ? 24 : 26,
        }}>
          {unit.summary}
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={{
            gap: theme.spacing.lg,
            borderTopWidth: 1,
            borderTopColor: accent.line,
            backgroundColor: accent.panel,
            padding: compact ? theme.spacing.lg : theme.spacing.xl,
        }}>
        <react_native_1.View style={{
            gap: theme.spacing.md,
        }}>
          <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
            {searchMatchLabel ? (<react_native_1.View style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: accent.line,
                backgroundColor: theme.colors.surfaceOverlay,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
                maxWidth: '100%',
            }}>
                <react_native_1.Text style={{
                color: accent.accent,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.7,
                flexShrink: 1,
                lineHeight: 16,
                textTransform: 'uppercase',
            }}>
                  {searchMatchLabel}
                </react_native_1.Text>
              </react_native_1.View>) : null}
            <react_native_1.View style={{
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: theme.colors.surfaceOverlay,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 8,
            maxWidth: '100%',
        }}>
              <react_native_1.Text style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 0.7,
            flexShrink: 1,
            lineHeight: 16,
            textTransform: 'uppercase',
        }}>
                {unit.chapters.length} chapters
              </react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>

          <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
            {unit.hero.facts.slice(0, 3).map((fact) => (<react_native_1.View key={fact} style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: accent.line,
                backgroundColor: theme.colors.surfaceOverlay,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
                maxWidth: '100%',
            }}>
                <react_native_1.Text style={{
                color: accent.accentStrong,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.6,
                flexShrink: 1,
                lineHeight: 18,
                textTransform: 'uppercase',
            }}>
                  {fact}
                </react_native_1.Text>
              </react_native_1.View>))}
          </react_native_1.View>
        </react_native_1.View>

        <react_native_1.View style={{
            gap: theme.spacing.md,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: 'rgba(255,255,255,0.38)',
            padding: theme.spacing.md,
        }}>
          <react_native_1.Text style={{
            color: accent.accent,
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
            Study progress
          </react_native_1.Text>
          <ProgressBadge_1.ProgressBadge percentage={progressPercentage} detail={detail} accent={accent}/>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Pressable>);
    return href ? (<expo_router_1.Link href={href} asChild>
      {card}
    </expo_router_1.Link>) : (card);
}
