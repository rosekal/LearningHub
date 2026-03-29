"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeMode = useThemeMode;
exports.useAppTheme = useAppTheme;
const use_color_scheme_1 = require("@/hooks/use-color-scheme");
const tokens_1 = require("@/theme/tokens");
function useThemeMode() {
    return (0, use_color_scheme_1.useColorScheme)() === 'dark' ? 'dark' : 'light';
}
function useAppTheme() {
    return (0, tokens_1.getAppTheme)(useThemeMode());
}
