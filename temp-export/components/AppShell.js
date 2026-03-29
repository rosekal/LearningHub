"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppShell = AppShell;
const expo_router_1 = require("expo-router");
const vector_icons_1 = require("@expo/vector-icons");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
const BackButton_1 = require("@/components/BackButton");
const Breadcrumbs_1 = require("@/components/Breadcrumbs");
const ResponsiveLayout_1 = require("@/components/ResponsiveLayout");
const element_accents_1 = require("@/theme/element-accents");
function AppShell({ children, hero, breadcrumbs, accent }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const { gutter, isDesktop, isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    const backdrop = (0, element_accents_1.getElementBackdropPalette)(theme, accent);
    const showGradient = isTablet;
    const shellDivider = isTablet ? backdrop.divider : 'transparent';
    return (<react_native_safe_area_context_1.SafeAreaView style={{ flex: 1, backgroundColor: backdrop.canvas }}>
      <react_native_1.View style={{ flex: 1, backgroundColor: backdrop.canvas }}>
        {showGradient ? (<react_native_svg_1.default style={[react_native_1.StyleSheet.absoluteFillObject, { pointerEvents: 'none' }]} viewBox="0 0 100 100" preserveAspectRatio="none">
            <react_native_svg_1.Defs>
              <react_native_svg_1.RadialGradient id="shell-tonal-gradient" cx="26%" cy="12%" rx="176%" ry="136%" fx="26%" fy="12%">
                <react_native_svg_1.Stop offset="0%" stopColor={backdrop.gradientStart}/>
                <react_native_svg_1.Stop offset="28%" stopColor={backdrop.gradientMid}/>
                <react_native_svg_1.Stop offset="100%" stopColor={backdrop.gradientEnd}/>
              </react_native_svg_1.RadialGradient>
              <react_native_svg_1.RadialGradient id="shell-tonal-depth" cx="88%" cy="88%" rx="132%" ry="110%" fx="88%" fy="88%">
                <react_native_svg_1.Stop offset="0%" stopColor={backdrop.overlayEnd} stopOpacity={0.56}/>
                <react_native_svg_1.Stop offset="44%" stopColor={backdrop.overlayEnd} stopOpacity={0.22}/>
                <react_native_svg_1.Stop offset="100%" stopColor={backdrop.overlayStart} stopOpacity={0}/>
              </react_native_svg_1.RadialGradient>
            </react_native_svg_1.Defs>
            <react_native_svg_1.Rect x="0" y="0" width="100" height="100" fill="url(#shell-tonal-gradient)"/>
            <react_native_svg_1.Rect x="0" y="0" width="100" height="100" fill="url(#shell-tonal-depth)"/>
          </react_native_svg_1.default>) : null}

        <react_native_1.View style={{
            paddingHorizontal: gutter,
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: shellDivider,
            backgroundColor: 'transparent',
        }}>
          <react_native_1.View style={{
            flexDirection: isTablet ? 'row' : 'column',
            alignItems: isTablet ? 'center' : 'flex-start',
            justifyContent: 'space-between',
            gap: theme.spacing.md,
        }}>
            <react_native_1.View style={{ flex: 1, gap: isTablet ? 0 : theme.spacing.sm }}>
              <BackButton_1.BackButton accent={accent}/>
              <expo_router_1.Link href="/" style={{ textDecorationLine: 'none' }}>
                <react_native_1.View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.md,
        }}>
                  <react_native_1.View style={{
            width: 48,
            height: 48,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: accent?.line ?? theme.colors.borderStrong,
            backgroundColor: accent?.panel ?? theme.colors.surfaceElevated,
            shadowColor: accent?.accent ?? theme.shadow.light.shadowColor,
            shadowOpacity: 0.12,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 8 },
            elevation: 4,
        }}>
                    <vector_icons_1.Ionicons name="flask-outline" size={20} color={accent?.accent ?? theme.colors.accent}/>
                  </react_native_1.View>
                  <react_native_1.View style={{ gap: 2 }}>
                    <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: isTablet ? 28 : 24,
            fontWeight: '700',
        }}>
                      LearnHub
                    </react_native_1.Text>
                    <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
                      Editorial study atlas
                    </react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.View>
              </expo_router_1.Link>
            </react_native_1.View>

            <react_native_1.View style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: theme.spacing.md,
            alignSelf: isTablet ? 'center' : 'flex-start',
            borderRadius: theme.radius.pill,
            backgroundColor: theme.colors.surfaceOverlay,
            borderWidth: 1,
            borderColor: theme.colors.border,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.xs,
        }}>
              <react_native_1.Text style={{
            color: accent?.accent ?? theme.colors.textMuted,
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
                Local-first
              </react_native_1.Text>
              <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
                {theme.mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>

        <react_native_1.ScrollView style={{ flex: 1, backgroundColor: 'transparent' }} showsVerticalScrollIndicator={false} contentContainerStyle={{
            paddingVertical: theme.spacing.xxl,
            gap: theme.spacing.xxl,
        }}>
          <ResponsiveLayout_1.ResponsiveLayout style={{ gap: theme.spacing.xl }}>
            {isDesktop && breadcrumbs?.length ? <Breadcrumbs_1.Breadcrumbs items={breadcrumbs}/> : null}
            {hero}
            <react_native_1.View style={{
            gap: theme.spacing.xl,
            backgroundColor: 'transparent',
        }}>
              {children}
            </react_native_1.View>
          </ResponsiveLayout_1.ResponsiveLayout>
        </react_native_1.ScrollView>
      </react_native_1.View>
    </react_native_safe_area_context_1.SafeAreaView>);
}
