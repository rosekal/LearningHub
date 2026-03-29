"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreSummary = ScoreSummary;
const react_native_1 = require("react-native");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const Button_1 = require("@/components/Button");
const format_1 = require("@/utils/format");
function ScoreSummary({ score, total, bestScore, onRetry, accent, retryLabel = 'Retry Quiz', footer, }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const percentage = total === 0 ? 0 : (score / total) * 100;
    return (<react_native_1.View style={{
            gap: theme.spacing.lg,
            overflow: 'hidden',
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent?.line ?? theme.colors.border,
            backgroundColor: theme.colors.surfaceElevated,
            padding: theme.spacing.xl,
        }}>
      <react_native_1.View style={{ gap: theme.spacing.xs }}>
        <react_native_1.Text style={{
            color: accent?.accent ?? theme.colors.teal,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
          Score Summary
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 40,
            fontWeight: '700',
        }}>
          {(0, format_1.formatQuizScore)(score, total)}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: accent?.accentStrong ?? theme.colors.textMuted,
            fontFamily: theme.fonts.reading,
            fontSize: theme.typography.bodyLarge,
            lineHeight: 28,
        }}>
          {(0, format_1.formatPercent)(percentage)} correct
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={{
            height: 10,
            borderRadius: theme.radius.pill,
            backgroundColor: accent?.accentMuted ?? theme.colors.surfaceTinted,
            overflow: 'hidden',
        }}>
        <react_native_1.View style={{
            width: `${percentage}%`,
            height: '100%',
            borderRadius: theme.radius.pill,
            backgroundColor: accent?.accent ?? theme.colors.accent,
        }}/>
      </react_native_1.View>

      {typeof bestScore === 'number' ? (<react_native_1.Text style={{
                color: theme.colors.textSoft,
                fontFamily: theme.fonts.mono,
                fontSize: 14,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
            }}>
          Best local score: {(0, format_1.formatQuizScore)(bestScore, total)}
        </react_native_1.Text>) : null}

      <Button_1.Button label={retryLabel} icon="refresh-outline" onPress={onRetry} accent={accent}/>
      {footer}
    </react_native_1.View>);
}
