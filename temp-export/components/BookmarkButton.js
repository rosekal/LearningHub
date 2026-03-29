"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkButton = BookmarkButton;
const vector_icons_1 = require("@expo/vector-icons");
const react_native_1 = require("react-native");
const selectors_1 = require("@/features/learning/selectors");
const use_element_accent_1 = require("@/hooks/use-element-accent");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_study_1 = require("@/hooks/use-study");
function BookmarkButton({ unitId, chapterId, compact = false }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const accent = (0, use_element_accent_1.useElementAccent)(unitId);
    const { progress, toggleBookmark } = (0, use_study_1.useStudy)();
    const active = (0, selectors_1.isChapterBookmarked)(progress, unitId, chapterId);
    return (<react_native_1.Pressable accessibilityRole="button" accessibilityLabel={active ? 'Remove bookmark' : 'Add bookmark'} onPress={() => toggleBookmark(unitId, chapterId)} style={({ pressed, hovered }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: compact ? 0 : theme.spacing.xs,
            minHeight: compact ? 36 : 44,
            minWidth: compact ? 36 : 120,
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            borderColor: active ? accent.line : theme.colors.border,
            backgroundColor: active ? accent.panel : theme.colors.surfaceElevated,
            opacity: pressed ? 0.86 : 1,
            transform: [{ translateY: hovered ? -1 : 0 }],
            paddingHorizontal: compact ? 0 : theme.spacing.md,
        })}>
      <vector_icons_1.Ionicons name={active ? 'bookmark' : 'bookmark-outline'} size={18} color={active ? accent.accent : theme.colors.textMuted}/>
      {!compact ? (<react_native_1.View style={{ minWidth: 0, flexShrink: 1 }}>
          <react_native_1.Text style={{
                color: active ? accent.accentStrong : theme.colors.textMuted,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.6,
                flexShrink: 1,
                textTransform: 'uppercase',
            }}>
            {active ? 'Bookmarked' : 'Bookmark'}
          </react_native_1.Text>
          <react_native_1.Text style={{
                color: active ? accent.accent : theme.colors.textSoft,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                flexShrink: 1,
                lineHeight: 16,
            }}>
              {active ? 'Saved locally' : 'Save this chapter'}
          </react_native_1.Text>
        </react_native_1.View>) : null}
    </react_native_1.Pressable>);
}
