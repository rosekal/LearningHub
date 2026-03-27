import { useColorScheme } from '@/hooks/use-color-scheme';
import { getAppTheme, type ThemeMode } from '@/theme/tokens';

export function useThemeMode(): ThemeMode {
  return useColorScheme() === 'dark' ? 'dark' : 'light';
}

export function useAppTheme() {
  return getAppTheme(useThemeMode());
}
