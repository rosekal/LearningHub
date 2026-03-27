import { getElementAccentPalette } from '@/theme/element-accents';
import { useAppTheme } from '@/hooks/use-app-theme';

export function useElementAccent(unitId?: string) {
  const theme = useAppTheme();
  return getElementAccentPalette(unitId, theme);
}
