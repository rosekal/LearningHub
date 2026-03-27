import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}

export function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surfaceOverlay,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
      }}>
      <Ionicons name="search-outline" size={18} color={theme.colors.textSoft} />
      <TextInput
        accessibilityLabel={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSoft}
        style={{
          flex: 1,
          color: theme.colors.text,
          fontFamily: theme.fonts.body,
          fontSize: theme.typography.body,
          paddingVertical: 4,
        }}
      />
    </View>
  );
}
