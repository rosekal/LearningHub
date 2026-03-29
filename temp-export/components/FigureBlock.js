"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigureBlock = FigureBlock;
const vector_icons_1 = require("@expo/vector-icons");
const react_native_1 = require("react-native");
const ScientificFigure_1 = require("@/components/figures/ScientificFigure");
const use_app_theme_1 = require("@/hooks/use-app-theme");
function FigureBlock({ block, accent }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    return (<react_native_1.View style={{
            gap: theme.spacing.sm,
            overflow: 'hidden',
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent?.line ?? theme.colors.border,
            backgroundColor: theme.colors.surfaceElevated,
            padding: theme.spacing.lg,
        }}>
      <react_native_1.View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
        }}>
        <react_native_1.Text style={{
            color: accent?.accent ?? theme.colors.teal,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
          {block.label}
        </react_native_1.Text>
        <react_native_1.View style={{ flex: 1, height: 1, backgroundColor: accent?.line ?? theme.colors.divider }}/>
      </react_native_1.View>
      {block.figure ? (<react_native_1.View accessible accessibilityRole="image" accessibilityLabel={block.altText ?? `${block.title}. ${block.caption}`}>
          <ScientificFigure_1.ScientificFigure figure={block.figure} accent={accent} theme={theme}/>
        </react_native_1.View>) : (<react_native_1.View style={{
                minHeight: 208,
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: accent?.line ?? theme.colors.border,
                backgroundColor: accent?.panel ?? theme.colors.figure,
                alignItems: 'center',
                justifyContent: 'center',
                gap: theme.spacing.sm,
                padding: theme.spacing.xl,
            }}>
          <react_native_1.View style={{
                width: 56,
                height: 56,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: accent?.line ?? theme.colors.border,
                backgroundColor: theme.colors.surfaceOverlay,
            }}>
            <vector_icons_1.Ionicons name="aperture-outline" size={26} color={accent?.accent ?? theme.colors.accent}/>
          </react_native_1.View>
          <react_native_1.Text style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.display,
                fontSize: 28,
                fontWeight: '700',
                textAlign: 'center',
            }}>
            {block.title}
          </react_native_1.Text>
          <react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: 15,
                lineHeight: 24,
                textAlign: 'center',
            }}>
            {block.placeholder}
          </react_native_1.Text>
        </react_native_1.View>)}
      <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.reading,
            fontSize: 14,
            lineHeight: 24,
        }}>
        {block.caption}
      </react_native_1.Text>
    </react_native_1.View>);
}
