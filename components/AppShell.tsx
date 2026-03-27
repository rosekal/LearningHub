import type { ReactNode } from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';

import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
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
  const { gutter, isDesktop } = useBreakpoints();
  const backdrop = getElementBackdropPalette(theme, accent);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backdrop.canvas }}>
      <View style={{ flex: 1, backgroundColor: backdrop.canvas }}>
        <Svg
          pointerEvents="none"
          style={StyleSheet.absoluteFillObject}
          viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <Defs>
            <SvgLinearGradient id="shell-base-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={backdrop.gradientStart} />
              <Stop offset="48%" stopColor={backdrop.gradientMid} />
              <Stop offset="100%" stopColor={backdrop.gradientEnd} />
            </SvgLinearGradient>
            <SvgLinearGradient id="shell-wash-gradient" x1="100%" y1="0%" x2="12%" y2="82%">
              <Stop offset="0%" stopColor={backdrop.washStart} />
              <Stop offset="100%" stopColor={backdrop.washEnd} />
            </SvgLinearGradient>
            <SvgLinearGradient id="shell-depth-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={theme.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.24)'} />
              <Stop offset="30%" stopColor="rgba(255,255,255,0)" />
              <Stop offset="100%" stopColor={theme.mode === 'dark' ? 'rgba(4,11,19,0.12)' : 'rgba(16,34,56,0.04)'} />
            </SvgLinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100" height="100" fill="url(#shell-base-gradient)" />
          <Rect x="0" y="0" width="100" height="100" fill="url(#shell-wash-gradient)" />
          <Rect x="0" y="0" width="100" height="100" fill="url(#shell-depth-gradient)" />
        </Svg>
        <View
          style={{
            position: 'absolute',
            top: 110,
            left: gutter,
            right: gutter,
            height: 1,
            backgroundColor: backdrop.divider,
            opacity: 0.45,
          }}
        />

        <View
          style={{
            paddingHorizontal: gutter,
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: backdrop.divider,
            backgroundColor: 'transparent',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: theme.spacing.md,
            }}>
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
                      fontSize: 28,
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

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: theme.spacing.md,
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: theme.spacing.xxl,
            gap: theme.spacing.xxl,
          }}>
          <ResponsiveLayout style={{ gap: theme.spacing.xl }}>
            {isDesktop && breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
            {hero}
            {children}
          </ResponsiveLayout>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
