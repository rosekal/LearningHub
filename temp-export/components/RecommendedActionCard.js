"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendedActionCard = RecommendedActionCard;
const react_native_1 = require("react-native");
const Button_1 = require("@/components/Button");
const use_app_theme_1 = require("@/hooks/use-app-theme");
function RecommendedActionCard({ eyebrow, title, description, ctaLabel, onPress, accent, tags = [], }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    return (<react_native_1.View style={{
            gap: theme.spacing.lg,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent?.line ?? theme.colors.border,
            backgroundColor: theme.colors.surfaceElevated,
            padding: theme.spacing.xl,
        }}>
      <react_native_1.View style={{ gap: theme.spacing.sm }}>
        <react_native_1.Text style={{
            color: accent?.accent ?? theme.colors.accent,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
          {eyebrow}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 30,
            fontWeight: '700',
            lineHeight: 36,
        }}>
          {title}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 24,
        }}>
          {description}
        </react_native_1.Text>
      </react_native_1.View>

      {tags.length ? (<react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
          {tags.map((tag) => (<react_native_1.View key={tag} style={{
                    borderRadius: theme.radius.pill,
                    borderWidth: 1,
                    borderColor: accent?.line ?? theme.colors.border,
                    backgroundColor: accent?.panel ?? theme.colors.surfaceOverlay,
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: 8,
                }}>
              <react_native_1.Text style={{
                    color: accent?.accentStrong ?? theme.colors.textMuted,
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.7,
                    textTransform: 'uppercase',
                }}>
                {tag}
              </react_native_1.Text>
            </react_native_1.View>))}
        </react_native_1.View>) : null}

      <Button_1.Button label={ctaLabel} icon="arrow-forward-outline" onPress={onPress} accent={accent}/>
    </react_native_1.View>);
}
