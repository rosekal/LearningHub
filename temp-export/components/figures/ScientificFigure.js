"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScientificFigure = ScientificFigure;
const vector_icons_1 = require("@expo/vector-icons");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
function hexToRgb(hex) {
    const normalized = hex.replace('#', '');
    const value = normalized.length === 3
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
function withAlpha(hex, alpha) {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function accentColor(theme, accent) {
    return accent?.accent ?? theme.colors.accent;
}
function accentLine(theme, accent) {
    return accent?.line ?? theme.colors.borderStrong;
}
function accentPanel(theme, accent) {
    return accent?.panel ?? theme.colors.figure;
}
function toneColor(tone, theme, accent) {
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
function severityStyle(severity, theme, accent) {
    switch (severity) {
        case 'high':
            return {
                color: theme.colors.danger,
                background: withAlpha(theme.colors.danger, 0.12),
                border: withAlpha(theme.colors.danger, 0.28),
                icon: 'warning-outline',
            };
        case 'moderate':
            return {
                color: theme.colors.warning,
                background: withAlpha(theme.colors.warning, 0.12),
                border: withAlpha(theme.colors.warning, 0.28),
                icon: 'flask-outline',
            };
        case 'low':
        default:
            return {
                color: accentColor(theme, accent),
                background: withAlpha(accentColor(theme, accent), 0.1),
                border: withAlpha(accentColor(theme, accent), 0.24),
                icon: 'shield-checkmark-outline',
            };
    }
}
function parseGroupNumber(group) {
    const match = group.match(/(\d{1,2})/);
    return match ? Number.parseInt(match[1], 10) : 1;
}
function FigureSurface({ children, theme, accent, padded = true }) {
    return (<react_native_1.View style={{
            overflow: 'hidden',
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: accentLine(theme, accent),
            backgroundColor: accentPanel(theme, accent),
            padding: padded ? theme.spacing.lg : 0,
            gap: theme.spacing.md,
        }}>
      {children}
    </react_native_1.View>);
}
function FigureKicker({ label, value, theme, accent, }) {
    return (<react_native_1.View style={{
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
      <react_native_1.Text style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
        {label}
      </react_native_1.Text>
      <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.body,
            fontSize: 14,
            lineHeight: 20,
            fontWeight: '600',
            flexShrink: 1,
        }}>
        {value}
      </react_native_1.Text>
    </react_native_1.View>);
}
function FigureNote({ text, theme, accent, }) {
    return (<react_native_1.View style={{
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: accentLine(theme, accent),
            backgroundColor: withAlpha(accentColor(theme, accent), 0.08),
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
        }}>
      <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.body,
            fontSize: 13,
            lineHeight: 20,
            fontWeight: '600',
        }}>
        {text}
      </react_native_1.Text>
    </react_native_1.View>);
}
function PeriodicGrid({ group, period, theme, accent, }) {
    const activeGroup = Math.max(1, Math.min(18, parseGroupNumber(group)));
    const activePeriod = Math.max(1, Math.min(7, Number.parseInt(period, 10) || 1));
    const accentFill = accentColor(theme, accent);
    return (<react_native_1.View style={{
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: accentLine(theme, accent),
            backgroundColor: theme.colors.surfaceElevated,
            padding: theme.spacing.sm,
        }}>
      <react_native_svg_1.default width="100%" height={88} viewBox="0 0 360 88">
        {Array.from({ length: 7 }).map((_, row) => Array.from({ length: 18 }).map((__, column) => {
            const x = column * 20;
            const y = row * 12;
            const active = column + 1 === activeGroup && row + 1 === activePeriod;
            return (<react_native_svg_1.Rect key={`${row}-${column}`} x={x + 1} y={y + 1} width={18} height={10} rx={2} fill={active ? withAlpha(accentFill, 0.22) : withAlpha(theme.colors.text, 0.035)} stroke={active ? accentFill : withAlpha(theme.colors.text, 0.1)} strokeWidth={active ? 1.2 : 0.8}/>);
        }))}
      </react_native_svg_1.default>
      <react_native_1.Text style={{
            marginTop: theme.spacing.xs,
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
        Group {group} • Period {period}
      </react_native_1.Text>
    </react_native_1.View>);
}
function AtomicOrbitalDiagram({ figure, theme, accent, }) {
    const accentFill = accentColor(theme, accent);
    const line = accentLine(theme, accent);
    const radii = [34, 58, 82, 104, 126];
    return (<react_native_1.View style={{
            width: '100%',
            aspectRatio: 1,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: line,
            backgroundColor: theme.colors.surfaceElevated,
            overflow: 'hidden',
        }}>
      <react_native_svg_1.default width="100%" height="100%" viewBox="0 0 280 280">
        <react_native_svg_1.Defs>
          <react_native_svg_1.LinearGradient id="orbitalGlow" x1="0" y1="0" x2="1" y2="1">
            <react_native_svg_1.Stop offset="0%" stopColor={withAlpha(accentFill, 0.24)}/>
            <react_native_svg_1.Stop offset="100%" stopColor={withAlpha(accentFill, 0.05)}/>
          </react_native_svg_1.LinearGradient>
        </react_native_svg_1.Defs>

        {figure.shells.map((count, shellIndex) => (<react_native_svg_1.Circle key={`ring-${count}-${shellIndex}`} cx={140} cy={140} r={radii[shellIndex]} fill="none" stroke={withAlpha(accentFill, shellIndex === figure.shells.length - 1 ? 0.36 : 0.18)} strokeWidth={shellIndex === figure.shells.length - 1 ? 2.2 : 1.1} strokeDasharray={shellIndex === figure.shells.length - 1 ? '0' : '5 7'}/>))}

        {figure.shells.map((count, shellIndex) => Array.from({ length: count }).map((_, electronIndex) => {
            const angle = (Math.PI * 2 * electronIndex) / count - Math.PI / 2;
            const radius = radii[shellIndex];
            const isValence = shellIndex === figure.shells.length - 1;
            return (<react_native_svg_1.Circle key={`electron-${shellIndex}-${electronIndex}`} cx={140 + Math.cos(angle) * radius} cy={140 + Math.sin(angle) * radius} r={isValence ? 5.4 : 4.2} fill={isValence ? accentFill : withAlpha(theme.colors.textMuted, 0.7)}/>);
        }))}

        <react_native_svg_1.Circle cx={140} cy={140} r={28} fill="url(#orbitalGlow)" stroke={line} strokeWidth={1.4}/>
      </react_native_svg_1.default>
      <react_native_1.View pointerEvents="none" style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 28,
            fontWeight: '700',
        }}>
          {figure.symbol}
        </react_native_1.Text>
        <react_native_1.Text style={{
            marginTop: 4,
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.8,
        }}>
          Z {figure.atomicNumber}
        </react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
}
function MetricCard({ label, value, detail, theme, accent, width, }) {
    return (<react_native_1.View style={{
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
      <react_native_1.Text style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
        {label}
      </react_native_1.Text>
      <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 22,
            lineHeight: 28,
            fontWeight: '700',
        }}>
        {value}
      </react_native_1.Text>
      {detail ? (<react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: 13,
                lineHeight: 20,
                flexShrink: 1,
            }}>
          {detail}
        </react_native_1.Text>) : null}
      <react_native_1.View style={{
            marginTop: 'auto',
            height: 4,
            borderRadius: theme.radius.pill,
            backgroundColor: withAlpha(accentColor(theme, accent), 0.14),
        }}>
        <react_native_1.View style={{
            width: '64%',
            height: 4,
            borderRadius: theme.radius.pill,
            backgroundColor: accentColor(theme, accent),
        }}/>
      </react_native_1.View>
    </react_native_1.View>);
}
function MatrixCard({ title, children, theme, accent, width, }) {
    return (<react_native_1.View style={{
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
      <react_native_1.Text style={{
            color: accentColor(theme, accent),
            fontFamily: theme.fonts.mono,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
        {title}
      </react_native_1.Text>
      {children}
    </react_native_1.View>);
}
function MatrixRow({ label, value, tone, theme, accent, }) {
    const dotColor = toneColor(tone, theme, accent);
    return (<react_native_1.View style={{ flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'flex-start' }}>
      <react_native_1.View style={{
            marginTop: 4,
            width: 14,
            height: 14,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(dotColor, 0.22),
        }}>
        <react_native_1.View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dotColor }}/>
      </react_native_1.View>
      <react_native_1.View style={{ flex: 1, gap: 2 }}>
        <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.body,
            fontSize: 13,
            lineHeight: 20,
            fontWeight: '700',
        }}>
          {label}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 12,
            lineHeight: 18,
            flexShrink: 1,
        }}>
          {value}
        </react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
}
function PeriodicTileFigure({ figure, theme, accent, isTablet, }) {
    return (<FigureSurface theme={theme} accent={accent}>
      <react_native_1.View style={{
            flexDirection: isTablet ? 'row' : 'column',
            gap: theme.spacing.md,
        }}>
        <react_native_1.View style={{
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
          <react_native_svg_1.default style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} width="100%" height="100%" viewBox="0 0 320 220" preserveAspectRatio="none">
            <react_native_svg_1.Defs>
              <react_native_svg_1.LinearGradient id="periodicCardBg" x1="0" y1="0" x2="1" y2="1">
                <react_native_svg_1.Stop offset="0%" stopColor={withAlpha(accentColor(theme, accent), 0.28)}/>
                <react_native_svg_1.Stop offset="100%" stopColor={withAlpha(accentColor(theme, accent), 0.06)}/>
              </react_native_svg_1.LinearGradient>
            </react_native_svg_1.Defs>
            <react_native_svg_1.Rect x={0} y={0} width={320} height={220} fill="url(#periodicCardBg)"/>
          </react_native_svg_1.default>

          <react_native_1.Text style={{
            color: accentColor(theme, accent),
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
        }}>
            {figure.atomicNumber}
          </react_native_1.Text>
          <react_native_1.View style={{ alignItems: isTablet ? 'flex-start' : 'center', gap: theme.spacing.xs }}>
            <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 56,
            fontWeight: '700',
        }}>
              {figure.symbol}
            </react_native_1.Text>
            <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 16,
            lineHeight: 22,
            fontWeight: '600',
            textAlign: isTablet ? 'left' : 'center',
        }}>
              {figure.name}
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.Text style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 0.8,
        }}>
            ATOMIC MASS {figure.atomicMass}
          </react_native_1.Text>
        </react_native_1.View>

        <react_native_1.View style={{ flex: 1.1, gap: theme.spacing.md }}>
          <PeriodicGrid group={figure.group} period={figure.period} theme={theme} accent={accent}/>
          <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            <FigureKicker label="Group" value={figure.group} theme={theme} accent={accent}/>
            <FigureKicker label="Period" value={figure.period} theme={theme} accent={accent}/>
            <FigureKicker label="Block" value={figure.block} theme={theme} accent={accent}/>
            <FigureKicker label="State" value={figure.state} theme={theme} accent={accent}/>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>

      <FigureNote text={`Category: ${figure.category}. Oxidation states: ${figure.oxidationStates}.`} theme={theme} accent={accent}/>
    </FigureSurface>);
}
function AtomicStructureFigure({ figure, theme, accent, isTablet, }) {
    return (<FigureSurface theme={theme} accent={accent}>
      <react_native_1.View style={{
            flexDirection: isTablet ? 'row' : 'column',
            gap: theme.spacing.md,
            alignItems: isTablet ? 'stretch' : 'center',
        }}>
        <react_native_1.View style={{ width: isTablet ? 248 : '100%', maxWidth: 280 }}>
          <AtomicOrbitalDiagram figure={figure} theme={theme} accent={accent}/>
        </react_native_1.View>

        <react_native_1.View style={{ flex: 1, width: '100%', gap: theme.spacing.sm }}>
          <FigureKicker label="Configuration" value={figure.electronConfiguration} theme={theme} accent={accent}/>
          <FigureKicker label="Valence shell" value={figure.valenceShell} theme={theme} accent={accent}/>
          <FigureKicker label="Oxidation states" value={figure.oxidationStates} theme={theme} accent={accent}/>
          <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.xs,
        }}>
            {figure.shells.map((count, index) => (<react_native_1.View key={`shell-${index + 1}`} style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: accentLine(theme, accent),
                backgroundColor: index === figure.shells.length - 1
                    ? withAlpha(accentColor(theme, accent), 0.12)
                    : theme.colors.surfaceElevated,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 6,
            }}>
                <react_native_1.Text style={{
                color: index === figure.shells.length - 1
                    ? accentColor(theme, accent)
                    : theme.colors.textSoft,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                fontWeight: '700',
            }}>
                  n={index + 1}: {count} e-
                </react_native_1.Text>
              </react_native_1.View>))}
          </react_native_1.View>
          <FigureNote text={figure.bondingNote} theme={theme} accent={accent}/>
        </react_native_1.View>
      </react_native_1.View>
    </FigureSurface>);
}
function PropertyComparisonFigure({ figure, theme, accent, isTablet, }) {
    const cardWidth = isTablet ? '48%' : '100%';
    return (<FigureSurface theme={theme} accent={accent}>
      <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {figure.metrics.map((metric) => (<MetricCard key={metric.label} label={metric.label} value={metric.value} detail={metric.detail} theme={theme} accent={accent} width={cardWidth}/>))}
      </react_native_1.View>
    </FigureSurface>);
}
function SafetyPanelFigure({ figure, theme, accent, isTablet, }) {
    const cardWidth = isTablet ? '31%' : '100%';
    return (<FigureSurface theme={theme} accent={accent}>
      <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {figure.items.map((item) => {
            const severity = severityStyle(item.severity, theme, accent);
            return (<react_native_1.View key={item.title} style={{
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
              <react_native_1.View style={{ flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'center' }}>
                <vector_icons_1.Ionicons name={severity.icon} size={16} color={severity.color}/>
                <react_native_1.Text style={{
                    flex: 1,
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: 13,
                    lineHeight: 18,
                    fontWeight: '700',
                }}>
                  {item.title}
                </react_native_1.Text>
              </react_native_1.View>
              <react_native_1.Text style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                    fontSize: 12,
                    lineHeight: 18,
                    flexShrink: 1,
                }}>
                {item.detail}
              </react_native_1.Text>
            </react_native_1.View>);
        })}
      </react_native_1.View>

      {figure.footer ? <FigureNote text={figure.footer} theme={theme} accent={accent}/> : null}
    </FigureSurface>);
}
function SpectrumBarFigure({ figure, theme, accent, isTablet, }) {
    const legendWidth = isTablet ? '48%' : '100%';
    return (<FigureSurface theme={theme} accent={accent}>
      <react_native_1.View style={{ gap: theme.spacing.xs }}>
        <react_native_1.Text style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
          Distribution Model
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 22,
            lineHeight: 28,
            fontWeight: '700',
        }}>
          {figure.title}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 13,
            lineHeight: 20,
        }}>
          {figure.subtitle}
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={{ gap: theme.spacing.sm }}>
        <react_native_1.View style={{
            flexDirection: 'row',
            gap: theme.spacing.xs,
            alignItems: 'stretch',
        }}>
          {figure.segments.map((segment) => {
            const fill = toneColor(segment.tone, theme, accent);
            return (<react_native_1.View key={segment.label} style={{
                    flex: Math.max(segment.weight, 1),
                    minHeight: 22,
                    borderRadius: theme.radius.pill,
                    backgroundColor: withAlpha(fill, 0.2),
                    borderWidth: 1,
                    borderColor: withAlpha(fill, 0.34),
                }}/>);
        })}
        </react_native_1.View>

        <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
          {figure.segments.map((segment) => {
            const fill = toneColor(segment.tone, theme, accent);
            return (<react_native_1.View key={`${segment.label}-legend`} style={{
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
                <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
                  <react_native_1.View style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: fill,
                }}/>
                  <react_native_1.Text style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: 13,
                    lineHeight: 18,
                    fontWeight: '700',
                    flexShrink: 1,
                }}>
                    {segment.label}
                  </react_native_1.Text>
                </react_native_1.View>
                <react_native_1.Text style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                    fontSize: 12,
                    lineHeight: 18,
                    flexShrink: 1,
                }}>
                  {segment.detail}
                </react_native_1.Text>
              </react_native_1.View>);
        })}
        </react_native_1.View>
      </react_native_1.View>

      <FigureNote text={figure.note} theme={theme} accent={accent}/>
    </FigureSurface>);
}
function GlossaryCalloutFigure({ figure, theme, accent, }) {
    return (<FigureSurface theme={theme} accent={accent}>
      <react_native_1.View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
        <react_native_1.View style={{
            width: 52,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: accentLine(theme, accent),
            backgroundColor: withAlpha(accentColor(theme, accent), 0.12),
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: theme.spacing.lg,
        }}>
          <react_native_1.Text style={{
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
          </react_native_1.Text>
        </react_native_1.View>

        <react_native_1.View style={{ flex: 1, gap: theme.spacing.sm }}>
          {figure.terms.map((term) => (<react_native_1.View key={term.term} style={{
                gap: theme.spacing.xs,
                borderRadius: theme.radius.md,
                borderWidth: 1,
                borderColor: accentLine(theme, accent),
                backgroundColor: theme.colors.surfaceElevated,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
            }}>
              <react_native_1.Text style={{
                color: accentColor(theme, accent),
                fontFamily: theme.fonts.mono,
                fontSize: 10,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
            }}>
                {term.term}
              </react_native_1.Text>
              <react_native_1.Text style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.body,
                fontSize: 12,
                lineHeight: 18,
            }}>
                {term.definition}
              </react_native_1.Text>
            </react_native_1.View>))}
        </react_native_1.View>
      </react_native_1.View>
    </FigureSurface>);
}
function ReactionFlowFigure({ figure, theme, accent, isTablet, }) {
    return (<FigureSurface theme={theme} accent={accent}>
      <react_native_1.View style={{
            flexDirection: isTablet ? 'row' : 'column',
            gap: theme.spacing.sm,
            alignItems: 'stretch',
        }}>
        {figure.steps.map((step, index) => (<react_native_1.View key={step.title} style={{
                flex: isTablet ? 1 : undefined,
                gap: theme.spacing.sm,
                flexDirection: isTablet ? 'row' : 'column',
                alignItems: isTablet ? 'center' : 'stretch',
            }}>
            <react_native_1.View style={{
                flex: 1,
                gap: theme.spacing.sm,
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: accentLine(theme, accent),
                backgroundColor: theme.colors.surfaceElevated,
                padding: theme.spacing.md,
            }}>
              <react_native_1.Text style={{
                color: accentColor(theme, accent),
                fontFamily: theme.fonts.mono,
                fontSize: 10,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
            }}>
                {step.tag ?? `Step ${index + 1}`}
              </react_native_1.Text>
              <react_native_1.Text style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.body,
                fontSize: 13,
                lineHeight: 20,
                fontWeight: '700',
            }}>
                {step.title}
              </react_native_1.Text>
              <react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: 12,
                lineHeight: 18,
            }}>
                {step.detail}
              </react_native_1.Text>
            </react_native_1.View>

            {index < figure.steps.length - 1 ? (<react_native_1.View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: isTablet ? 2 : 0,
                    paddingVertical: isTablet ? 0 : 2,
                }}>
                <vector_icons_1.Ionicons name={isTablet ? 'arrow-forward-outline' : 'arrow-down-outline'} size={18} color={accentColor(theme, accent)}/>
              </react_native_1.View>) : null}
          </react_native_1.View>))}
      </react_native_1.View>

      {figure.footer ? <FigureNote text={figure.footer} theme={theme} accent={accent}/> : null}
    </FigureSurface>);
}
function ApplicationMatrixFigure({ figure, theme, accent, isTablet, }) {
    const cardWidth = isTablet ? '31%' : '100%';
    return (<FigureSurface theme={theme} accent={accent}>
      <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {figure.columns.map((column) => (<MatrixCard key={column.title} title={column.title} theme={theme} accent={accent} width={cardWidth}>
            <react_native_1.View style={{ gap: theme.spacing.md }}>
              {column.items.map((item) => (<MatrixRow key={`${column.title}-${item.label}`} label={item.label} value={item.value} tone={item.tone} theme={theme} accent={accent}/>))}
            </react_native_1.View>
          </MatrixCard>))}
      </react_native_1.View>

      {figure.footer ? <FigureNote text={figure.footer} theme={theme} accent={accent}/> : null}
    </FigureSurface>);
}
function renderFigureVariant(figure, props) {
    switch (figure.variant) {
        case 'periodicTile':
            return <PeriodicTileFigure figure={figure} {...props}/>;
        case 'atomicStructure':
            return <AtomicStructureFigure figure={figure} {...props}/>;
        case 'propertyComparison':
            return <PropertyComparisonFigure figure={figure} {...props}/>;
        case 'safetyPanel':
            return <SafetyPanelFigure figure={figure} {...props}/>;
        case 'spectrumBar':
            return <SpectrumBarFigure figure={figure} {...props}/>;
        case 'glossaryCallout':
            return <GlossaryCalloutFigure figure={figure} {...props}/>;
        case 'reactionFlow':
            return <ReactionFlowFigure figure={figure} {...props}/>;
        case 'applicationMatrix':
            return <ApplicationMatrixFigure figure={figure} {...props}/>;
    }
}
function ScientificFigure({ figure, accent, theme }) {
    const { isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    return renderFigureVariant(figure, {
        theme,
        accent,
        isTablet,
    });
}
