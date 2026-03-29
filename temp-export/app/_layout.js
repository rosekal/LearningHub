"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
const native_1 = require("@react-navigation/native");
const expo_router_1 = require("expo-router");
const expo_status_bar_1 = require("expo-status-bar");
require("react-native-reanimated");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const tokens_1 = require("@/theme/tokens");
const study_provider_1 = require("@/store/study-provider");
function RootLayout() {
    const themeMode = (0, use_app_theme_1.useThemeMode)();
    return (<react_native_gesture_handler_1.GestureHandlerRootView style={{ flex: 1 }}>
      <study_provider_1.StudyProvider>
        <native_1.ThemeProvider value={tokens_1.navigationThemes[themeMode]}>
          <expo_router_1.Stack screenOptions={{ headerShown: false, animation: 'fade' }}/>
          <expo_status_bar_1.StatusBar style={themeMode === 'dark' ? 'light' : 'dark'}/>
        </native_1.ThemeProvider>
      </study_provider_1.StudyProvider>
    </react_native_gesture_handler_1.GestureHandlerRootView>);
}
