"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterCard = ChapterCard;
const react_native_1 = require("react-native");
const use_element_accent_1 = require("@/hooks/use-element-accent");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
const Button_1 = require("@/components/Button");
const BookmarkButton_1 = require("@/components/BookmarkButton");
const ProgressBadge_1 = require("@/components/ProgressBadge");
const format_1 = require("@/utils/format");
const responsive_1 = require("@/utils/responsive");
function ChapterCard({ unitId, chapter, completed, scoreLabel, onPress, }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const accent = (0, use_element_accent_1.useElementAccent)(unitId);
    const { width, isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    const compact = !isTablet;
    const titleSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: 22,
        maxValue: 28,
        minWidth: 320,
        maxWidth: 768,
    }));
    return (<react_native_1.View style={{
            gap: theme.spacing.lg,
            overflow: 'hidden',
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: theme.colors.surfaceElevated,
            padding: compact ? theme.spacing.lg : theme.spacing.xl,
        }}>
      <react_native_1.View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: accent.accent,
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
            color: accent.accent,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 0.9,
            textTransform: 'uppercase',
        }}>
            Chapter
          </react_native_1.Text>
          <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: titleSize,
            fontWeight: '700',
            lineHeight: Math.round(titleSize * 1.15),
            flexShrink: 1,
        }}>
            {chapter.title}
          </react_native_1.Text>
          <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 24,
        }}>
            {chapter.overview}
          </react_native_1.Text>
        </react_native_1.View>
        <BookmarkButton_1.BookmarkButton unitId={unitId} chapterId={chapter.id} compact/>
      </react_native_1.View>

      <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
        <react_native_1.View style={{
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: accent.panel,
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
            {(0, format_1.formatReadingTime)(chapter.estimatedMinutes)}
          </react_native_1.Text>
        </react_native_1.View>
        {scoreLabel ? (<react_native_1.View style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: accent.line,
                backgroundColor: theme.colors.surfaceOverlay,
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
              {scoreLabel}
            </react_native_1.Text>
          </react_native_1.View>) : null}
      </react_native_1.View>

      <ProgressBadge_1.ProgressBadge percentage={completed ? 100 : 0} detail={completed ? 'Marked complete' : 'Not completed yet'} accent={accent}/>

      <Button_1.Button label="Open Chapter" icon="book-outline" onPress={onPress} accent={accent}/>
    </react_native_1.View>);
}
