"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBreakpoints = useBreakpoints;
const react_native_1 = require("react-native");
function useBreakpoints() {
    const { width } = (0, react_native_1.useWindowDimensions)();
    const isTablet = width >= 768;
    const isDesktop = width >= 1100;
    const isWide = width >= 1440;
    return {
        width,
        isTablet,
        isDesktop,
        isWide,
        contentMaxWidth: isWide ? 1320 : isDesktop ? 1180 : 880,
        gutter: isDesktop ? 28 : isTablet ? 24 : 16,
        columns: isDesktop ? 3 : isTablet ? 2 : 1,
    };
}
