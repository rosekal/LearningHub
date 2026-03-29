"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBar = SearchBar;
const react_1 = require("react");
const vector_icons_1 = require("@expo/vector-icons");
const react_native_1 = require("react-native");
const use_app_theme_1 = require("@/hooks/use-app-theme");
function SearchBar({ value, onChangeText, placeholder, variant = 'default', style, }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const [isFocused, setIsFocused] = (0, react_1.useState)(false);
    const isInverse = variant === 'inverse';
    const containerBackgroundColor = isInverse
        ? isFocused
            ? 'rgba(243, 247, 251, 0.2)'
            : 'rgba(243, 247, 251, 0.12)'
        : isFocused
            ? theme.colors.surfaceElevated
            : theme.colors.surface;
    const containerBorderColor = isInverse
        ? isFocused
            ? 'rgba(243, 247, 251, 0.58)'
            : 'rgba(243, 247, 251, 0.24)'
        : isFocused
            ? theme.colors.borderStrong
            : theme.colors.border;
    const iconColor = isInverse
        ? 'rgba(243, 247, 251, 0.9)'
        : isFocused
            ? theme.colors.accent
            : theme.colors.textMuted;
    const clearColor = isInverse ? 'rgba(243, 247, 251, 0.92)' : theme.colors.textSoft;
    const inputTextColor = isInverse ? theme.colors.textInverse : theme.colors.text;
    const placeholderColor = isInverse ? 'rgba(243, 247, 251, 0.72)' : theme.colors.textMuted;
    return (<react_native_1.View style={[
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: theme.spacing.sm,
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: containerBorderColor,
                backgroundColor: containerBackgroundColor,
                paddingHorizontal: theme.spacing.lg,
                paddingVertical: theme.spacing.md,
                shadowColor: isInverse ? '#D7E7FA' : theme.colors.accent,
                shadowOpacity: isFocused ? 0.14 : 0,
                shadowRadius: isFocused ? 18 : 0,
                shadowOffset: { width: 0, height: 10 },
                elevation: isFocused ? 5 : 0,
            },
            style,
        ]}>
      <vector_icons_1.Ionicons name="search-outline" size={18} color={iconColor}/>
      <react_native_1.TextInput accessibilityLabel={placeholder} value={value} onChangeText={onChangeText} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={placeholder} placeholderTextColor={placeholderColor} autoCapitalize="none" autoCorrect={false} returnKeyType="search" selectionColor={isInverse ? theme.colors.textInverse : theme.colors.accent} cursorColor={isInverse ? theme.colors.textInverse : theme.colors.accent} style={{
            flex: 1,
            color: inputTextColor,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            paddingVertical: 4,
        }}/>
      {value ? (<react_native_1.Pressable accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={8} onPress={() => onChangeText('')} style={({ pressed }) => ({
                opacity: pressed ? 0.72 : 1,
            })}>
          <vector_icons_1.Ionicons name="close-circle" size={18} color={clearColor}/>
        </react_native_1.Pressable>) : null}
    </react_native_1.View>);
}
