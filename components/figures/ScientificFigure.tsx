import type { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';
import type { DimensionValue } from 'react-native';
import { Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import type {
  ApplicationMatrixFigureData,
  AtomicStructureFigureData,
  FigureData,
  FigureTone,
  GlossaryCalloutFigureData,
  PeriodicTileFigureData,
  PropertyComparisonFigureData,
  ReactionFlowFigureData,
  SafetyPanelFigureData,
  SpectrumBarFigureData,
} from '@/content/schema';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import type { ElementAccentPalette } from '@/theme/element-accents';
import type { AppTheme } from '@/theme/tokens';

interface ScientificFigureProps {
  figure: FigureData;
  accent?: ElementAccentPalette;
  theme: AppTheme;
}

interface FigureVariantProps {
  theme: AppTheme;
  accent?: ElementAccentPalette;
  isTablet: boolean;
}

interface FigureSurfaceProps {
  theme: AppTheme;
  accent?: ElementAccentPalette;
  children: ReactNode;
  padded?: boolean;
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((part) => `${part}${part}`)
          .join('')
      : normalized;

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function withAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function accentColor(theme: AppTheme, accent?: ElementAccentPalette) {
  return accent?.accent ?? theme.colors.accent;
}

function accentLine(theme: AppTheme, accent?: ElementAccentPalette) {
  return accent?.line ?? theme.colors.borderStrong;
}

function accentPanel(theme: AppTheme, accent?: ElementAccentPalette) {
  return accent?.panel ?? theme.colors.figure;
}

function toneColor(tone: FigureTone | undefined, theme: AppTheme, accent?: ElementAccentPalette) {
  switch (tone) {
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'danger':
      return theme.colors.danger;
    case 'neutral':
      return theme.colors.textSoft;
    case 'accent':
    default:
      return accentColor(theme, accent);
  }
}

function severityStyle(
  severity: SafetyPanelFigureData['items'][number]['severity'],
  theme: AppTheme,
  accent?: ElementAccentPalette
) {
  switch (severity) {
    case 'high':
      return {
        color: theme.colors.danger,
        background: withAlpha(theme.colors.danger, 0.12),
        border: withAlpha(theme.colors.danger, 0.28),
        icon: 'warning-outline' as const,
      };
    case 'moderate':
      return {
        color: theme.colors.warning,
        background: withAlpha(theme.colors.warning, 0.12),
        border: withAlpha(theme.colors.warning, 0.28),
        icon: 'flask-outline' as const,
      };
    case 'low':
    default:
      return {
        color: accentColor(theme, accent),
        background: withAlpha(accentColor(theme, accent), 0.1),
        border: withAlpha(accentColor(theme, accent), 0.24),
        icon: 'shield-checkmark-outline' as const,
      };
  }
}

function parseGroupNumber(group: string) {
  const match = group.match(/(\d{1,2})/);
  return match ? Number.parseInt(match[1], 10) : 1;
}

function FigureSurface({ children, theme, accent, padded = true }: FigureSurfaceProps) {
  return (
    <View
      style={{
        overflow: 'hidden',
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: accentLine(theme, accent),
        backgroundColor: accentPanel(theme, accent),
        padding: padded ? theme.spacing.lg : 0,
        gap: theme.spacing.md,
      }}>
      {children}
    </View>
  );
}

function FigureKicker({
  label,
  value,
  theme,
  accent,
}: {
  label: string;
  value: string;
  theme: AppTheme;
  accent?: ElementAccentPalette;
}) {
  return (
    <View
      style={{
        minWidth: 120,
        flexGrow: 1,
        flexShrink: 1,
        gap: 6,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: accentLine(theme, accent),
        backgroundColor: theme.colors.surfaceElevated,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      }}>
      <Text
        style={{
          color: theme.colors.textSoft,
          fontFamily: theme.fonts.mono,
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        }}>
        {label}
      </Text>
      <Text
        style={{
          color: theme.colors.text,
          fontFamily: theme.fonts.body,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: '600',
          flexShrink: 1,
        }}>
        {value}
      </Text>
    </View>
  );
}

function FigureNote({
  text,
  theme,
  accent,
}: {
  text: string;
  theme: AppTheme;
  accent?: ElementAccentPalette;
}) {
  return (
    <View
      style={{
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: accentLine(theme, accent),
        backgroundColor: withAlpha(accentColor(theme, accent), 0.08),
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      }}>
      <Text
        style={{
          color: theme.colors.text,
          fontFamily: theme.fonts.body,
          fontSize: 13,
          lineHeight: 20,
          fontWeight: '600',
        }}>
        {text}
      </Text>
    </View>
  );
}

function PeriodicGrid({
  group,
  period,
  theme,
  accent,
}: {
  group: string;
  period: string;
  theme: AppTheme;
  accent?: ElementAccentPalette;
}) {
  const activeGroup = Math.max(1, Math.min(18, parseGroupNumber(group)));
  const activePeriod = Math.max(1, Math.min(7, Number.parseInt(period, 10) || 1));
  const accentFill = accentColor(theme, accent);

  return (
    <View
      style={{
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: accentLine(theme, accent),
        backgroundColor: theme.colors.surfaceElevated,
        padding: theme.spacing.sm,
      }}>
      <Svg width="100%" height={88} viewBox="0 0 360 88">
        {Array.from({ length: 7 }).map((_, row) =>
          Array.from({ length: 18 }).map((__, column) => {
            const x = column * 20;
            const y = row * 12;
            const active = column + 1 === activeGroup && row + 1 === activePeriod;

            return (
              <Rect
                key={`${row}-${column}`}
                x={x + 1}
                y={y + 1}
                width={18}
                height={10}
                rx={2}
                fill={active ? withAlpha(accentFill, 0.22) : withAlpha(theme.colors.text, 0.035)}
                stroke={active ? accentFill : withAlpha(theme.colors.text, 0.1)}
                strokeWidth={active ? 1.2 : 0.8}
              />
            );
          })
        )}
      </Svg>
      <Text
        style={{
          marginTop: theme.spacing.xs,
          color: theme.colors.textSoft,
          fontFamily: theme.fonts.mono,
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        }}>
        Group {group} • Period {period}
      </Text>
    </View>
  );
}

function AtomicOrbitalDiagram({
  figure,
  theme,
  accent,
}: {
  figure: AtomicStructureFigureData;
  theme: AppTheme;
  accent?: ElementAccentPalette;
}) {
  const accentFill = accentColor(theme, accent);
  const line = accentLine(theme, accent);
  const radii = [34, 58, 82, 104, 126];

  return (
    <View
      style={{
        width: '100%',
        aspectRatio: 1,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: line,
        backgroundColor: theme.colors.surfaceElevated,
        overflow: 'hidden',
      }}>
      <Svg width="100%" height="100%" viewBox="0 0 280 280">
        <Defs>
          <LinearGradient id="orbitalGlow" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={withAlpha(accentFill, 0.24)} />
            <Stop offset="100%" stopColor={withAlpha(accentFill, 0.05)} />
          </LinearGradient>
        </Defs>

        {figure.shells.map((count, shellIndex) => (
          <Circle
            key={`ring-${count}-${shellIndex}`}
            cx={140}
            cy={140}
            r={radii[shellIndex]}
            fill="none"
            stroke={withAlpha(accentFill, shellIndex === figure.shells.length - 1 ? 0.36 : 0.18)}
            strokeWidth={shellIndex === figure.shells.length - 1 ? 2.2 : 1.1}
            strokeDasharray={shellIndex === figure.shells.length - 1 ? '0' : '5 7'}
          />
        ))}

        {figure.shells.map((count, shellIndex) =>
          Array.from({ length: count }).map((_, electronIndex) => {
            const angle = (Math.PI * 2 * electronIndex) / count - Math.PI / 2;
            const radius = radii[shellIndex];
            const isValence = shellIndex === figure.shells.length - 1;

            return (
              <Circle
                key={`electron-${shellIndex}-${electronIndex}`}
                cx={140 + Math.cos(angle) * radius}
                cy={140 + Math.sin(angle) * radius}
                r={isValence ? 5.4 : 4.2}
                fill={isValence ? accentFill : withAlpha(theme.colors.textMuted, 0.7)}
              />
            );
          })
        )}

        <Circle cx={140} cy={140} r={28} fill="url(#orbitalGlow)" stroke={line} strokeWidth={1.4} />
      </Svg>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 28,
            fontWeight: '700',
          }}>
          {figure.symbol}
        </Text>
        <Text
          style={{
            marginTop: 4,
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.8,
          }}>
          Z {figure.atomicNumber}
        </Text>
      </View>
    </View>
  );
}

function MetricCard({
  label,
  value,
  detail,
  theme,
  accent,
  width,
}: {
  label: string;
  value: string;
  detail?: string;
  theme: AppTheme;
  accent?: ElementAccentPalette;
  width: DimensionValue;
}) {
  return (
    <View
      style={{
        width,
        minWidth: 144,
        flexGrow: 1,
        gap: theme.spacing.sm,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: accentLine(theme, accent),
        backgroundColor: theme.colors.surfaceElevated,
        padding: theme.spacing.md,
      }}>
      <Text
        style={{
          color: theme.colors.textSoft,
          fontFamily: theme.fonts.mono,
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        }}>
        {label}
      </Text>
      <Text
        style={{
          color: theme.colors.text,
          fontFamily: theme.fonts.display,
          fontSize: 22,
          lineHeight: 28,
          fontWeight: '700',
        }}>
        {value}
      </Text>
      {detail ? (
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 13,
            lineHeight: 20,
            flexShrink: 1,
          }}>
          {detail}
        </Text>
      ) : null}
      <View
        style={{
          marginTop: 'auto',
          height: 4,
          borderRadius: theme.radius.pill,
          backgroundColor: withAlpha(accentColor(theme, accent), 0.14),
        }}>
        <View
          style={{
            width: '64%',
            height: 4,
            borderRadius: theme.radius.pill,
            backgroundColor: accentColor(theme, accent),
          }}
        />
      </View>
    </View>
  );
}

function MatrixCard({
  title,
  children,
  theme,
  accent,
  width,
}: {
  title: string;
  children: ReactNode;
  theme: AppTheme;
  accent?: ElementAccentPalette;
  width: DimensionValue;
}) {
  return (
    <View
      style={{
        width,
        minWidth: 180,
        flexGrow: 1,
        gap: theme.spacing.sm,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: accentLine(theme, accent),
        backgroundColor: theme.colors.surfaceElevated,
        padding: theme.spacing.md,
      }}>
      <Text
        style={{
          color: accentColor(theme, accent),
          fontFamily: theme.fonts.mono,
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        }}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function MatrixRow({
  label,
  value,
  tone,
  theme,
  accent,
}: {
  label: string;
  value: string;
  tone?: FigureTone;
  theme: AppTheme;
  accent?: ElementAccentPalette;
}) {
  const dotColor = toneColor(tone, theme, accent);

  return (
    <View style={{ flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'flex-start' }}>
      <View
        style={{
          marginTop: 4,
          width: 14,
          height: 14,
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(dotColor, 0.22),
        }}>
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dotColor }} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.body,
            fontSize: 13,
            lineHeight: 20,
            fontWeight: '700',
          }}>
          {label}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 12,
            lineHeight: 18,
            flexShrink: 1,
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
}

function PeriodicTileFigure({
  figure,
  theme,
  accent,
  isTablet,
}: FigureVariantProps & { figure: PeriodicTileFigureData }) {
  return (
    <FigureSurface theme={theme} accent={accent}>
      <View
        style={{
          flexDirection: isTablet ? 'row' : 'column',
          gap: theme.spacing.md,
        }}>
        <View
          style={{
            flex: isTablet ? 0.95 : undefined,
            minHeight: isTablet ? 220 : 208,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: accentLine(theme, accent),
            backgroundColor: withAlpha(accentColor(theme, accent), 0.12),
            overflow: 'hidden',
            padding: theme.spacing.lg,
            justifyContent: 'space-between',
          }}>
          <Svg
            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
            width="100%"
            height="100%"
            viewBox="0 0 320 220"
            preserveAspectRatio="none">
            <Defs>
              <LinearGradient id="periodicCardBg" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor={withAlpha(accentColor(theme, accent), 0.28)} />
                <Stop offset="100%" stopColor={withAlpha(accentColor(theme, accent), 0.06)} />
              </LinearGradient>
            </Defs>
            <Rect x={0} y={0} width={320} height={220} fill="url(#periodicCardBg)" />
          </Svg>

          <Text
            style={{
              color: accentColor(theme, accent),
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 1,
            }}>
            {figure.atomicNumber}
          </Text>
          <View style={{ alignItems: isTablet ? 'flex-start' : 'center', gap: theme.spacing.xs }}>
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.display,
                fontSize: 56,
                fontWeight: '700',
              }}>
              {figure.symbol}
            </Text>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: 16,
                lineHeight: 22,
                fontWeight: '600',
                textAlign: isTablet ? 'left' : 'center',
              }}>
              {figure.name}
            </Text>
          </View>
          <Text
            style={{
              color: theme.colors.textSoft,
              fontFamily: theme.fonts.mono,
              fontSize: 11,
              fontWeight: '700',
              letterSpacing: 0.8,
            }}>
            ATOMIC MASS {figure.atomicMass}
          </Text>
        </View>

        <View style={{ flex: 1.1, gap: theme.spacing.md }}>
          <PeriodicGrid group={figure.group} period={figure.period} theme={theme} accent={accent} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            <FigureKicker label="Group" value={figure.group} theme={theme} accent={accent} />
            <FigureKicker label="Period" value={figure.period} theme={theme} accent={accent} />
            <FigureKicker label="Block" value={figure.block} theme={theme} accent={accent} />
            <FigureKicker label="State" value={figure.state} theme={theme} accent={accent} />
          </View>
        </View>
      </View>

      <FigureNote
        text={`Category: ${figure.category}. Oxidation states: ${figure.oxidationStates}.`}
        theme={theme}
        accent={accent}
      />
    </FigureSurface>
  );
}

function AtomicStructureFigure({
  figure,
  theme,
  accent,
  isTablet,
}: FigureVariantProps & { figure: AtomicStructureFigureData }) {
  return (
    <FigureSurface theme={theme} accent={accent}>
      <View
        style={{
          flexDirection: isTablet ? 'row' : 'column',
          gap: theme.spacing.md,
          alignItems: isTablet ? 'stretch' : 'center',
        }}>
        <View style={{ width: isTablet ? 248 : '100%', maxWidth: 280 }}>
          <AtomicOrbitalDiagram figure={figure} theme={theme} accent={accent} />
        </View>

        <View style={{ flex: 1, width: '100%', gap: theme.spacing.sm }}>
          <FigureKicker
            label="Configuration"
            value={figure.electronConfiguration}
            theme={theme}
            accent={accent}
          />
          <FigureKicker label="Valence shell" value={figure.valenceShell} theme={theme} accent={accent} />
          <FigureKicker
            label="Oxidation states"
            value={figure.oxidationStates}
            theme={theme}
            accent={accent}
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.spacing.xs,
            }}>
            {figure.shells.map((count, index) => (
              <View
                key={`shell-${index + 1}`}
                style={{
                  borderRadius: theme.radius.pill,
                  borderWidth: 1,
                  borderColor: accentLine(theme, accent),
                  backgroundColor:
                    index === figure.shells.length - 1
                      ? withAlpha(accentColor(theme, accent), 0.12)
                      : theme.colors.surfaceElevated,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: 6,
                }}>
                <Text
                  style={{
                    color:
                      index === figure.shells.length - 1
                        ? accentColor(theme, accent)
                        : theme.colors.textSoft,
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    fontWeight: '700',
                  }}>
                  n={index + 1}: {count} e-
                </Text>
              </View>
            ))}
          </View>
          <FigureNote text={figure.bondingNote} theme={theme} accent={accent} />
        </View>
      </View>
    </FigureSurface>
  );
}

function PropertyComparisonFigure({
  figure,
  theme,
  accent,
  isTablet,
}: FigureVariantProps & { figure: PropertyComparisonFigureData }) {
  const cardWidth = isTablet ? '48%' : '100%';

  return (
    <FigureSurface theme={theme} accent={accent}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {figure.metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            detail={metric.detail}
            theme={theme}
            accent={accent}
            width={cardWidth}
          />
        ))}
      </View>
    </FigureSurface>
  );
}

function SafetyPanelFigure({
  figure,
  theme,
  accent,
  isTablet,
}: FigureVariantProps & { figure: SafetyPanelFigureData }) {
  const cardWidth = isTablet ? '31%' : '100%';

  return (
    <FigureSurface theme={theme} accent={accent}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {figure.items.map((item) => {
          const severity = severityStyle(item.severity, theme, accent);
          return (
            <View
              key={item.title}
              style={{
                width: cardWidth,
                minWidth: 160,
                flexGrow: 1,
                gap: theme.spacing.sm,
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: severity.border,
                backgroundColor: severity.background,
                padding: theme.spacing.md,
              }}>
              <View style={{ flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'center' }}>
                <Ionicons name={severity.icon} size={16} color={severity.color} />
                <Text
                  style={{
                    flex: 1,
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: 13,
                    lineHeight: 18,
                    fontWeight: '700',
                  }}>
                  {item.title}
                </Text>
              </View>
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontFamily: theme.fonts.body,
                  fontSize: 12,
                  lineHeight: 18,
                  flexShrink: 1,
                }}>
                {item.detail}
              </Text>
            </View>
          );
        })}
      </View>

      {figure.footer ? <FigureNote text={figure.footer} theme={theme} accent={accent} /> : null}
    </FigureSurface>
  );
}

function SpectrumBarFigure({
  figure,
  theme,
  accent,
  isTablet,
}: FigureVariantProps & { figure: SpectrumBarFigureData }) {
  const legendWidth = isTablet ? '48%' : '100%';

  return (
    <FigureSurface theme={theme} accent={accent}>
      <View style={{ gap: theme.spacing.xs }}>
        <Text
          style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
          }}>
          Distribution Model
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 22,
            lineHeight: 28,
            fontWeight: '700',
          }}>
          {figure.title}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 13,
            lineHeight: 20,
          }}>
          {figure.subtitle}
        </Text>
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        <View
          style={{
            flexDirection: 'row',
            gap: theme.spacing.xs,
            alignItems: 'stretch',
          }}>
          {figure.segments.map((segment) => {
            const fill = toneColor(segment.tone, theme, accent);
            return (
              <View
                key={segment.label}
                style={{
                  flex: Math.max(segment.weight, 1),
                  minHeight: 22,
                  borderRadius: theme.radius.pill,
                  backgroundColor: withAlpha(fill, 0.2),
                  borderWidth: 1,
                  borderColor: withAlpha(fill, 0.34),
                }}
              />
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
          {figure.segments.map((segment) => {
            const fill = toneColor(segment.tone, theme, accent);
            return (
              <View
                key={`${segment.label}-legend`}
                style={{
                  width: legendWidth,
                  minWidth: 148,
                  flexGrow: 1,
                  gap: theme.spacing.xs,
                  borderRadius: theme.radius.md,
                  borderWidth: 1,
                  borderColor: accentLine(theme, accent),
                  backgroundColor: theme.colors.surfaceElevated,
                  padding: theme.spacing.md,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: fill,
                    }}
                  />
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontFamily: theme.fonts.body,
                      fontSize: 13,
                      lineHeight: 18,
                      fontWeight: '700',
                      flexShrink: 1,
                    }}>
                    {segment.label}
                  </Text>
                </View>
                <Text
                  style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                    fontSize: 12,
                    lineHeight: 18,
                    flexShrink: 1,
                  }}>
                  {segment.detail}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <FigureNote text={figure.note} theme={theme} accent={accent} />
    </FigureSurface>
  );
}

function GlossaryCalloutFigure({
  figure,
  theme,
  accent,
}: FigureVariantProps & { figure: GlossaryCalloutFigureData }) {
  return (
    <FigureSurface theme={theme} accent={accent}>
      <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
        <View
          style={{
            width: 52,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: accentLine(theme, accent),
            backgroundColor: withAlpha(accentColor(theme, accent), 0.12),
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: theme.spacing.lg,
          }}>
          <Text
            style={{
              color: accentColor(theme, accent),
              fontFamily: theme.fonts.mono,
              fontSize: 9,
              fontWeight: '700',
              lineHeight: 12,
              letterSpacing: 0.8,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}>
            Key Terms
          </Text>
        </View>

        <View style={{ flex: 1, gap: theme.spacing.sm }}>
          {figure.terms.map((term) => (
            <View
              key={term.term}
              style={{
                gap: theme.spacing.xs,
                borderRadius: theme.radius.md,
                borderWidth: 1,
                borderColor: accentLine(theme, accent),
                backgroundColor: theme.colors.surfaceElevated,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
              }}>
              <Text
                style={{
                  color: accentColor(theme, accent),
                  fontFamily: theme.fonts.mono,
                  fontSize: 10,
                  fontWeight: '700',
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                }}>
                {term.term}
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: theme.fonts.body,
                  fontSize: 12,
                  lineHeight: 18,
                }}>
                {term.definition}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </FigureSurface>
  );
}

function ReactionFlowFigure({
  figure,
  theme,
  accent,
  isTablet,
}: FigureVariantProps & { figure: ReactionFlowFigureData }) {
  return (
    <FigureSurface theme={theme} accent={accent}>
      <View
        style={{
          flexDirection: isTablet ? 'row' : 'column',
          gap: theme.spacing.sm,
          alignItems: 'stretch',
        }}>
        {figure.steps.map((step, index) => (
          <View
            key={step.title}
            style={{
              flex: isTablet ? 1 : undefined,
              gap: theme.spacing.sm,
              flexDirection: isTablet ? 'row' : 'column',
              alignItems: isTablet ? 'center' : 'stretch',
            }}>
            <View
              style={{
                flex: 1,
                gap: theme.spacing.sm,
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: accentLine(theme, accent),
                backgroundColor: theme.colors.surfaceElevated,
                padding: theme.spacing.md,
              }}>
              <Text
                style={{
                  color: accentColor(theme, accent),
                  fontFamily: theme.fonts.mono,
                  fontSize: 10,
                  fontWeight: '700',
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                }}>
                {step.tag ?? `Step ${index + 1}`}
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: theme.fonts.body,
                  fontSize: 13,
                  lineHeight: 20,
                  fontWeight: '700',
                }}>
                {step.title}
              </Text>
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontFamily: theme.fonts.body,
                  fontSize: 12,
                  lineHeight: 18,
                }}>
                {step.detail}
              </Text>
            </View>

            {index < figure.steps.length - 1 ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: isTablet ? 2 : 0,
                  paddingVertical: isTablet ? 0 : 2,
                }}>
                <Ionicons
                  name={isTablet ? 'arrow-forward-outline' : 'arrow-down-outline'}
                  size={18}
                  color={accentColor(theme, accent)}
                />
              </View>
            ) : null}
          </View>
        ))}
      </View>

      {figure.footer ? <FigureNote text={figure.footer} theme={theme} accent={accent} /> : null}
    </FigureSurface>
  );
}

function ApplicationMatrixFigure({
  figure,
  theme,
  accent,
  isTablet,
}: FigureVariantProps & { figure: ApplicationMatrixFigureData }) {
  const cardWidth = isTablet ? '31%' : '100%';

  return (
    <FigureSurface theme={theme} accent={accent}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {figure.columns.map((column) => (
          <MatrixCard
            key={column.title}
            title={column.title}
            theme={theme}
            accent={accent}
            width={cardWidth}>
            <View style={{ gap: theme.spacing.md }}>
              {column.items.map((item) => (
                <MatrixRow
                  key={`${column.title}-${item.label}`}
                  label={item.label}
                  value={item.value}
                  tone={item.tone}
                  theme={theme}
                  accent={accent}
                />
              ))}
            </View>
          </MatrixCard>
        ))}
      </View>

      {figure.footer ? <FigureNote text={figure.footer} theme={theme} accent={accent} /> : null}
    </FigureSurface>
  );
}

function renderFigureVariant(figure: FigureData, props: FigureVariantProps) {
  switch (figure.variant) {
    case 'periodicTile':
      return <PeriodicTileFigure figure={figure} {...props} />;
    case 'atomicStructure':
      return <AtomicStructureFigure figure={figure} {...props} />;
    case 'propertyComparison':
      return <PropertyComparisonFigure figure={figure} {...props} />;
    case 'safetyPanel':
      return <SafetyPanelFigure figure={figure} {...props} />;
    case 'spectrumBar':
      return <SpectrumBarFigure figure={figure} {...props} />;
    case 'glossaryCallout':
      return <GlossaryCalloutFigure figure={figure} {...props} />;
    case 'reactionFlow':
      return <ReactionFlowFigure figure={figure} {...props} />;
    case 'applicationMatrix':
      return <ApplicationMatrixFigure figure={figure} {...props} />;
  }
}

export function ScientificFigure({ figure, accent, theme }: ScientificFigureProps) {
  const { isTablet } = useBreakpoints();

  return renderFigureVariant(figure, {
    theme,
    accent,
    isTablet,
  });
}
