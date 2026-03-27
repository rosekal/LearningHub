import { Link, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';

export interface BreadcrumbItem {
  label: string;
  href?: Href;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: theme.spacing.xs,
        alignSelf: 'flex-start',
        borderRadius: theme.radius.pill,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surfaceOverlay,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
      }}>
      {items.map((item, index) => (
        <View
          key={`${item.label}-${index}`}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.xs,
          }}>
          {item.href ? (
            <Link href={item.href} style={{ textDecorationLine: 'none' }}>
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontFamily: theme.fonts.mono,
                  fontSize: 12,
                  fontWeight: '600',
                  letterSpacing: 0.4,
                  textTransform: 'uppercase',
                }}>
                {item.label}
              </Text>
            </Link>
          ) : (
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.4,
                textTransform: 'uppercase',
              }}>
              {item.label}
            </Text>
          )}
          {index < items.length - 1 ? (
            <Ionicons name="chevron-forward" size={14} color={theme.colors.textSoft} />
          ) : null}
        </View>
      ))}
    </View>
  );
}
