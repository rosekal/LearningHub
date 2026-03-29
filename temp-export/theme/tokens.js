"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigationThemes = exports.appThemes = exports.darkTheme = exports.lightTheme = void 0;
exports.getAppTheme = getAppTheme;
const native_1 = require("@react-navigation/native");
const react_native_1 = require("react-native");
const fonts = react_native_1.Platform.select({
    ios: {
        display: 'Iowan Old Style',
        body: 'Avenir Next',
        reading: 'Charter',
        mono: 'Menlo',
    },
    android: {
        display: 'serif',
        body: 'sans-serif',
        reading: 'serif',
        mono: 'monospace',
    },
    web: {
        display: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif",
        body: "'Avenir Next', 'Segoe UI', 'Helvetica Neue', Inter, sans-serif",
        reading: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif",
        mono: "'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace",
    },
    default: {
        display: 'serif',
        body: 'sans-serif',
        reading: 'serif',
        mono: 'monospace',
    },
});
const spacing = {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 48,
};
const radius = {
    sm: 12,
    md: 18,
    lg: 24,
    xl: 32,
    pill: 999,
};
const typography = {
    eyebrow: 12,
    label: 13,
    meta: 14,
    body: 16,
    bodyLarge: 18,
    subtitle: 20,
    title: 28,
    display: 34,
    hero: 42,
};
const shadow = {
    light: {
        shadowColor: '#091522',
        shadowOpacity: 0.08,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 14 },
        elevation: 8,
    },
    medium: {
        shadowColor: '#091522',
        shadowOpacity: 0.14,
        shadowRadius: 32,
        shadowOffset: { width: 0, height: 18 },
        elevation: 12,
    },
    strong: {
        shadowColor: '#091522',
        shadowOpacity: 0.22,
        shadowRadius: 42,
        shadowOffset: { width: 0, height: 24 },
        elevation: 18,
    },
};
exports.lightTheme = {
    mode: 'light',
    fonts,
    spacing,
    radius,
    typography,
    shadow,
    colors: {
        canvas: '#EDF3F9',
        canvasMuted: '#E3EBF4',
        canvasDeep: '#D4DFEB',
        surface: '#F4F8FC',
        surfaceElevated: '#F8FBFE',
        surfaceTinted: '#EAF1F8',
        surfaceOverlay: 'rgba(16, 34, 56, 0.045)',
        surfaceContrast: '#101927',
        border: '#C8D5E3',
        borderStrong: '#8EA4BD',
        divider: 'rgba(18, 40, 64, 0.15)',
        text: '#102132',
        textMuted: '#4C6177',
        textSoft: '#73869C',
        textInverse: '#F3F7FB',
        accent: '#17395C',
        accentStrong: '#0E2540',
        accentSoft: '#DCEAF6',
        accentMuted: 'rgba(23, 57, 92, 0.12)',
        accentGlow: 'rgba(58, 111, 168, 0.17)',
        teal: '#2C7A78',
        gold: '#A9823A',
        success: '#246B56',
        warning: '#9A6B1A',
        danger: '#8D3B3B',
        overlay: 'rgba(10, 22, 34, 0.06)',
        badge: '#E4EDF7',
        figure: '#D8E5F1',
    },
};
exports.darkTheme = {
    mode: 'dark',
    fonts,
    spacing,
    radius,
    typography,
    shadow,
    colors: {
        canvas: '#06111C',
        canvasMuted: '#091726',
        canvasDeep: '#102234',
        surface: '#0C1826',
        surfaceElevated: '#112131',
        surfaceTinted: '#16293D',
        surfaceOverlay: 'rgba(192, 214, 236, 0.045)',
        surfaceContrast: '#050B14',
        border: '#253F5A',
        borderStrong: '#607D9A',
        divider: 'rgba(194, 214, 234, 0.16)',
        text: '#EFF5FB',
        textMuted: '#BCC9D7',
        textSoft: '#8EA2B6',
        textInverse: '#F6F8FB',
        accent: '#A2C2DF',
        accentStrong: '#D3E4F2',
        accentSoft: '#173554',
        accentMuted: 'rgba(162, 194, 223, 0.16)',
        accentGlow: 'rgba(115, 177, 236, 0.18)',
        teal: '#5DB8AD',
        gold: '#D7B06A',
        success: '#64C0A0',
        warning: '#E0B455',
        danger: '#D17D7D',
        overlay: 'rgba(255, 255, 255, 0.05)',
        badge: '#15314A',
        figure: '#1A3147',
    },
};
exports.appThemes = {
    light: exports.lightTheme,
    dark: exports.darkTheme,
};
function getAppTheme(mode) {
    return exports.appThemes[mode];
}
exports.navigationThemes = {
    light: {
        ...native_1.DefaultTheme,
        colors: {
            ...native_1.DefaultTheme.colors,
            primary: exports.lightTheme.colors.accent,
            background: exports.lightTheme.colors.canvas,
            card: exports.lightTheme.colors.surfaceElevated,
            text: exports.lightTheme.colors.text,
            border: exports.lightTheme.colors.border,
            notification: exports.lightTheme.colors.gold,
        },
    },
    dark: {
        ...native_1.DarkTheme,
        colors: {
            ...native_1.DarkTheme.colors,
            primary: exports.darkTheme.colors.accent,
            background: exports.darkTheme.colors.canvas,
            card: exports.darkTheme.colors.surfaceElevated,
            text: exports.darkTheme.colors.text,
            border: exports.darkTheme.colors.border,
            notification: exports.darkTheme.colors.gold,
        },
    },
};
