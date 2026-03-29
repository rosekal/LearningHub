import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useBreakpoints } from '@/hooks/use-breakpoints';

interface ResponsiveLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  style?: StyleProp<ViewStyle>;
  sidebarStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  sidebarPosition?: 'start' | 'end';
  sidebarWidth?: number;
  mobileSidebarPosition?: 'before' | 'after';
}

export function ResponsiveLayout({
  children,
  sidebar,
  style,
  sidebarStyle,
  contentStyle,
  sidebarPosition = 'end',
  sidebarWidth = 320,
  mobileSidebarPosition = 'after',
}: ResponsiveLayoutProps) {
  const { contentMaxWidth, gutter, isDesktop } = useBreakpoints();
  const showSidebarFirstOnMobile = !isDesktop && mobileSidebarPosition === 'before';

  return (
    <View
      style={[
        {
          width: '100%',
          alignSelf: 'center',
          maxWidth: contentMaxWidth,
          paddingHorizontal: gutter,
        },
        style,
      ]}>
      {sidebar ? (
        <View
          style={{
            flexDirection: isDesktop ? 'row' : 'column',
            alignItems: 'flex-start',
            gap: gutter,
          }}>
          {(sidebarPosition === 'start' && isDesktop) || showSidebarFirstOnMobile ? (
            <View style={[{ width: sidebarWidth }, sidebarStyle]}>{sidebar}</View>
          ) : null}
          <View style={[{ flex: 1, width: '100%' }, contentStyle]}>{children}</View>
          {(sidebarPosition === 'end' && isDesktop) || (!isDesktop && !showSidebarFirstOnMobile) ? (
            <View style={[{ width: isDesktop ? sidebarWidth : '100%' }, sidebarStyle]}>{sidebar}</View>
          ) : null}
        </View>
      ) : (
        children
      )}
    </View>
  );
}
