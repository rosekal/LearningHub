import type { ReactNode } from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, {
  Defs,
  RadialGradient as SvgRadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { BackButton } from '@/components/BackButton';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs';
import { ResponsiveLayout } from '@/components/ResponsiveLayout';
import { getElementBackdropPalette, type ElementAccentPalette } from '@/theme/element-accents';

interface AppShellProps {
  children: ReactNode;
  hero?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  accent?: ElementAccentPalette;
}

export function AppShell({ children, hero, breadcrumbs, accent }: AppShellProps) {
  const theme = useAppTheme();
  const { gutter, isDesktop, isTablet } = useBreakpoints();
  const backdrop = getElementBackdropPalette(theme, accent);
  const showGradient = isTablet;
  const shellDivider = isTablet ? backdrop.divider : 'transparent';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backdrop.canvas }}>
      <View style={{ flex: 1, backgroundColor: backdrop.canvas }}>
        {showGradient ? (
          <Svg
            style={[StyleSheet.absoluteFillObject, { pointerEvents: 'none' }]}
            viewBox="0 0 100 100"
            preserveAspectRatio="none">
            <Defs>
              <SvgRadialGradient
                id="shell-tonal-gradient"
                cx="26%"
                cy="12%"
                rx="176%"
                ry="136%"
                fx="26%"
                fy="12%">
                <Stop offset="0%" stopColor={backdrop.gradientStart} />
                <Stop offset="28%" stopColor={backdrop.gradientMid} />
                <Stop offset="100%" stopColor={backdrop.gradientEnd} />
              </SvgRadialGradient>
              <SvgRadialGradient
                id="shell-tonal-depth"
                cx="88%"
                cy="88%"
                rx="132%"
                ry="110%"
                fx="88%"
                fy="88%">
                <Stop offset="0%" stopColor={backdrop.overlayEnd} stopOpacity={0.56} />
                <Stop offset="44%" stopColor={backdrop.overlayEnd} stopOpacity={0.22} />
                <Stop offset="100%" stopColor={backdrop.overlayStart} stopOpacity={0} />
              </SvgRadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100" height="100" fill="url(#shell-tonal-gradient)" />
            <Rect x="0" y="0" width="100" height="100" fill="url(#shell-tonal-depth)" />
          </Svg>
        ) : null}

        <View
          style={{
            paddingHorizontal: gutter,
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: shellDivider,
            backgroundColor: 'transparent',
          }}>
          <View
            style={{
              flexDirection: isTablet ? 'row' : 'column',
              alignItems: isTablet ? 'center' : 'flex-start',
              justifyContent: 'space-between',
              gap: theme.spacing.md,
            }}>
            <View style={{ flex: 1, gap: isTablet ? 0 : theme.spacing.sm }}>
              <BackButton accent={accent} />
              <Link href="/" style={{ textDecorationLine: 'none' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: theme.spacing.md,
                  }}>
                  <View
                    style={{
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
                    <Ionicons name="flask-outline" size={20} color={accent?.accent ?? theme.colors.accent} />
                  </View>
                  <View style={{ gap: 2 }}>
                    <Text
                      style={{
                        color: theme.colors.text,
                        fontFamily: theme.fonts.display,
                        fontSize: isTablet ? 28 : 24,
                        fontWeight: '700',
                      }}>
                      LearnHub
                    </Text>
                    <Text
                      style={{
                        color: theme.colors.textMuted,
                        fontFamily: theme.fonts.mono,
                        fontSize: 12,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                      }}>
                      Editorial study atlas
                    </Text>
                  </View>
                </View>
              </Link>
            </View>

            <View
              style={{
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
              <Text
                style={{
                  color: accent?.accent ?? theme.colors.textMuted,
                  fontFamily: theme.fonts.mono,
                  fontSize: 11,
                  fontWeight: '700',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                Local-first
              </Text>
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontFamily: theme.fonts.mono,
                  fontSize: 11,
                  fontWeight: '700',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                {theme.mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1, backgroundColor: 'transparent' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: theme.spacing.xxl,
            gap: theme.spacing.xxl,
          }}>
          <ResponsiveLayout style={{ gap: theme.spacing.xl }}>
            {isDesktop && breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
            {hero}
            <View
              style={{
                gap: theme.spacing.xl,
                backgroundColor: 'transparent',
              }}>
              {children}
            </View>
          </ResponsiveLayout>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
