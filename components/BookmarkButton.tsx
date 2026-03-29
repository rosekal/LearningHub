import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { isChapterBookmarked } from '@/features/learning/selectors';
import { useElementAccent } from '@/hooks/use-element-accent';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useStudy } from '@/hooks/use-study';

interface BookmarkButtonProps {
  unitId: string;
  chapterId: string;
  compact?: boolean;
}

export function BookmarkButton({ unitId, chapterId, compact = false }: BookmarkButtonProps) {
  const theme = useAppTheme();
  const accent = useElementAccent(unitId);
  const { progress, toggleBookmark } = useStudy();
  const active = isChapterBookmarked(progress, unitId, chapterId);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={active ? 'Remove bookmark' : 'Add bookmark'}
      onPress={() => toggleBookmark(unitId, chapterId)}
      style={({ pressed, hovered }) => ({
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
      <Ionicons
        name={active ? 'bookmark' : 'bookmark-outline'}
        size={18}
        color={active ? accent.accent : theme.colors.textMuted}
      />
      {!compact ? (
        <View style={{ minWidth: 0, flexShrink: 1 }}>
          <Text
            style={{
              color: active ? accent.accentStrong : theme.colors.textMuted,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 0.6,
              flexShrink: 1,
              textTransform: 'uppercase',
            }}>
            {active ? 'Bookmarked' : 'Bookmark'}
          </Text>
          <Text
            style={{
              color: active ? accent.accent : theme.colors.textSoft,
              fontFamily: theme.fonts.mono,
              fontSize: 11,
              flexShrink: 1,
              lineHeight: 16,
            }}>
              {active ? 'Saved locally' : 'Save this chapter'}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}
