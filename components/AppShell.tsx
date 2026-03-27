import type { ReactNode } from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, View } from 'react-native';

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
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: backdrop.overlay,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 24,
            right: -70,
            width: 260,
            height: 260,
            borderRadius: 130,
            backgroundColor: backdrop.orbPrimary,
            opacity: theme.mode === 'dark' ? 0.9 : 1,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 180,
            left: -52,
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: backdrop.orbSecondary,
          }}
        />
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
