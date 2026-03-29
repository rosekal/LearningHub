"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useElementAccent = useElementAccent;
const element_accents_1 = require("@/theme/element-accents");
const use_app_theme_1 = require("@/hooks/use-app-theme");
function useElementAccent(unitId) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    return (0, element_accents_1.getElementAccentPalette)(unitId, theme);
}
