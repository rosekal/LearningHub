import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useThemeMode } from '@/hooks/use-app-theme';
import { navigationThemes } from '@/theme/tokens';
import { StudyProvider } from '@/store/study-provider';

export default function RootLayout() {
  const themeMode = useThemeMode();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StudyProvider>
        <ThemeProvider value={navigationThemes[themeMode]}>
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
          <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </StudyProvider>
    </GestureHandlerRootView>
  );
}
