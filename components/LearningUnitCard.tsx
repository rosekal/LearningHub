import { type Href, Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { LearningUnit } from '@/content/schema';
import { useElementAccent } from '@/hooks/use-element-accent';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { ProgressBadge } from '@/components/ProgressBadge';
import { interpolateByWidth } from '@/utils/responsive';

interface LearningUnitCardProps {
  unit: LearningUnit;
  progressPercentage: number;
  detail: string;
  searchMatchLabel?: string;
  onPress: () => void;
  href?: Href;
}

export function LearningUnitCard({
  unit,
  progressPercentage,
  detail,
  searchMatchLabel,
  onPress,
  href,
}: LearningUnitCardProps) {
  const theme = useAppTheme();
  const accent = useElementAccent(unit.id);
  const { width, isTablet } = useBreakpoints();
  const compact = !isTablet;
  const titleSize = Math.round(
    interpolateByWidth({
      width,
      minValue: 24,
      maxValue: 30,
      minWidth: 320,
      maxWidth: 768,
    })
  );

  const card = (
    <Pressable
      accessibilityRole={href ? 'link' : 'button'}
      accessibilityLabel={`Open ${unit.title}`}
      onPress={onPress}
      style={({ hovered, pressed }) => ({
        overflow: 'hidden',
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: accent.line,
        backgroundColor: accent.panel,
        opacity: pressed ? 0.92 : 1,
        transform: [{ translateY: hovered ? -4 : pressed ? 1 : 0 }],
        shadowColor: accent.accent,
        shadowOpacity: hovered ? 0.18 : 0.12,
        shadowRadius: hovered ? 26 : 18,
        shadowOffset: { width: 0, height: hovered ? 16 : 10 },
        elevation: hovered ? 11 : 7,
      })}>
      <View
        style={{
          gap: theme.spacing.lg,
          backgroundColor: accent.heroFrom,
          padding: compact ? theme.spacing.lg : theme.spacing.xl,
        }}>
        <View
          style={{
            position: 'absolute',
            right: -30,
            top: -10,
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: accent.glow,
          }}
        />
        <View
          style={{
            flexDirection: compact ? 'column' : 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: theme.spacing.md,
            minWidth: 0,
          }}>
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <Text
              style={{
                color: accent.accentContrast,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.9,
                textTransform: 'uppercase',
              }}>
              {unit.shortTitle}
            </Text>
            <Text
              style={{
                color: accent.accentContrast,
                fontFamily: theme.fonts.display,
                fontSize: titleSize,
                fontWeight: '700',
                lineHeight: Math.round(titleSize * 1.15),
                flexShrink: 1,
              }}>
              {unit.title}
            </Text>
          </View>
          <View
            style={{
              minWidth: compact ? 60 : 68,
              minHeight: compact ? 60 : 68,
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.28)',
              backgroundColor: 'rgba(255,255,255,0.08)',
              alignSelf: compact ? 'flex-start' : 'auto',
              paddingHorizontal: compact ? theme.spacing.md : theme.spacing.sm,
            }}>
            <Text
              style={{
                color: accent.accentContrast,
                fontFamily: theme.fonts.display,
                fontSize: compact ? 22 : 24,
                fontWeight: '700',
              }}>
              {unit.metadata[0]?.value}
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: 'rgba(248, 247, 243, 0.86)',
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: compact ? 24 : 26,
          }}>
          {unit.summary}
        </Text>
      </View>

      <View
        style={{
          gap: theme.spacing.lg,
          borderTopWidth: 1,
          borderTopColor: accent.line,
          backgroundColor: accent.panel,
          padding: compact ? theme.spacing.lg : theme.spacing.xl,
        }}>
        <View
          style={{
            gap: theme.spacing.md,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.spacing.sm,
            }}>
            {searchMatchLabel ? (
              <View
                style={{
                  borderRadius: theme.radius.pill,
                  borderWidth: 1,
                  borderColor: accent.line,
                  backgroundColor: theme.colors.surfaceOverlay,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: 8,
                  maxWidth: '100%',
                }}>
                <Text
                  style={{
                    color: accent.accent,
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.7,
                    flexShrink: 1,
                    lineHeight: 16,
                    textTransform: 'uppercase',
                  }}>
                  {searchMatchLabel}
                </Text>
              </View>
            ) : null}
            <View
              style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: accent.line,
                backgroundColor: theme.colors.surfaceOverlay,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
                maxWidth: '100%',
              }}>
              <Text
                style={{
                  color: theme.colors.textSoft,
                  fontFamily: theme.fonts.mono,
                  fontSize: 11,
                  fontWeight: '700',
                  letterSpacing: 0.7,
                  flexShrink: 1,
                  lineHeight: 16,
                  textTransform: 'uppercase',
                }}>
                {unit.chapters.length} chapters
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.spacing.sm,
            }}>
            {unit.hero.facts.slice(0, 3).map((fact) => (
              <View
                key={fact}
                style={{
                  borderRadius: theme.radius.pill,
                  borderWidth: 1,
                  borderColor: accent.line,
                  backgroundColor: theme.colors.surfaceOverlay,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: 8,
                  maxWidth: '100%',
                }}>
                <Text
                  style={{
                    color: accent.accentStrong,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 0.6,
                    flexShrink: 1,
                    lineHeight: 18,
                    textTransform: 'uppercase',
                  }}>
                  {fact}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            gap: theme.spacing.md,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: 'rgba(255,255,255,0.38)',
            padding: theme.spacing.md,
          }}>
          <Text
            style={{
              color: accent.accent,
              fontFamily: theme.fonts.mono,
              fontSize: 11,
              fontWeight: '700',
              letterSpacing: 0.8,
              textTransform: 'uppercase',
            }}>
            Study progress
          </Text>
          <ProgressBadge percentage={progressPercentage} detail={detail} accent={accent} />
        </View>
      </View>
    </Pressable>
  );

  return href ? (
    <Link href={href} asChild>
      {card}
    </Link>
  ) : (
    card
  );
}
