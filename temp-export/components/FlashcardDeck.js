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
exports.FlashcardDeck = FlashcardDeck;
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_reduced_motion_1 = require("@/hooks/use-reduced-motion");
const Button_1 = require("@/components/Button");
function FlashcardDeck({ cards, reviewedCount, onReview, getConfidence, onRateConfidence, accent, }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const [index, setIndex] = (0, react_1.useState)(0);
    const [flipped, setFlipped] = (0, react_1.useState)(false);
    const rotation = (0, react_native_reanimated_1.useSharedValue)(0);
    const prefersReducedMotion = (0, use_reduced_motion_1.useReducedMotion)();
    const card = cards[index];
    const currentConfidence = getConfidence?.(card.id);
    (0, react_1.useEffect)(() => {
        rotation.value = (0, react_native_reanimated_1.withTiming)(0, { duration: prefersReducedMotion ? 0 : 220 });
        setFlipped(false);
    }, [index, prefersReducedMotion, rotation]);
    const frontStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ perspective: 1200 }, { rotateY: `${rotation.value}deg` }],
        backfaceVisibility: 'hidden',
    }));
    const backStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ perspective: 1200 }, { rotateY: `${rotation.value + 180}deg` }],
        backfaceVisibility: 'hidden',
        position: 'absolute',
        inset: 0,
    }));
    function handleFlip() {
        const next = !flipped;
        setFlipped(next);
        rotation.value = (0, react_native_reanimated_1.withTiming)(next ? 180 : 0, { duration: prefersReducedMotion ? 0 : 320 });
        if (next) {
            onReview(card.id);
        }
    }
    return (<react_native_1.View style={{ gap: theme.spacing.lg }}>
      <react_native_1.View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: theme.spacing.sm,
        }}>
        <react_native_1.Text style={{
            color: accent?.accent ?? theme.colors.textMuted,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
          Card {index + 1} of {cards.length}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
        }}>
          {reviewedCount} reviewed locally
        </react_native_1.Text>
      </react_native_1.View>

      {currentConfidence ? (<react_native_1.Text style={{
                color: accent?.accentStrong ?? theme.colors.textSoft,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
            }}>
          Current confidence: {currentConfidence}
        </react_native_1.Text>) : null}

      <react_native_1.Pressable accessibilityRole="button" onPress={handleFlip}>
        <react_native_1.View style={{ minHeight: 320 }}>
          <react_native_reanimated_1.default.View style={[
            {
                minHeight: 320,
                borderRadius: theme.radius.xl,
                borderWidth: 1,
                borderColor: accent?.line ?? theme.colors.border,
                backgroundColor: accent?.heroFrom ?? theme.colors.surfaceElevated,
                padding: theme.spacing.xxl,
                justifyContent: 'space-between',
                ...theme.shadow.medium,
                shadowColor: accent?.accent ?? theme.shadow.medium.shadowColor,
            },
            frontStyle,
        ]}>
            <react_native_1.View style={{ gap: theme.spacing.md }}>
              <react_native_1.Text style={{
            color: accent?.accentContrast ?? theme.colors.textMuted,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
                Front
              </react_native_1.Text>
              <react_native_1.Text style={{
            color: accent?.accentContrast ?? theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 34,
            fontWeight: '700',
            lineHeight: 40,
        }}>
                {card.front}
              </react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Text style={{
            color: 'rgba(255,255,255,0.72)',
            fontFamily: theme.fonts.mono,
            fontSize: 14,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
        }}>
              Tap to reveal the answer
            </react_native_1.Text>
          </react_native_reanimated_1.default.View>

          <react_native_reanimated_1.default.View style={[
            {
                minHeight: 320,
                borderRadius: theme.radius.xl,
                borderWidth: 1,
                borderColor: accent?.line ?? theme.colors.border,
                backgroundColor: accent?.panel ?? theme.colors.surfaceTinted,
                padding: theme.spacing.xxl,
                justifyContent: 'space-between',
                ...theme.shadow.medium,
                shadowColor: accent?.accent ?? theme.shadow.medium.shadowColor,
            },
            backStyle,
        ]}>
            <react_native_1.View style={{ gap: theme.spacing.md }}>
              <react_native_1.Text style={{
            color: accent?.accent ?? theme.colors.gold,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
                Back
              </react_native_1.Text>
              <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.reading,
            fontSize: 28,
            lineHeight: 38,
        }}>
                {card.back}
              </react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Text style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 14,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
        }}>
              Tap again to revisit the prompt
            </react_native_1.Text>
          </react_native_reanimated_1.default.View>
        </react_native_1.View>
      </react_native_1.Pressable>

      <react_native_1.View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
        <Button_1.Button label="Previous" variant="secondary" icon="chevron-back-outline" disabled={index === 0} onPress={() => setIndex((current) => Math.max(current - 1, 0))} style={{ flex: 1 }} accent={accent}/>
        <Button_1.Button label={index === cards.length - 1 ? 'Start Over' : 'Next'} icon={index === cards.length - 1 ? 'refresh-outline' : 'chevron-forward-outline'} onPress={() => setIndex((current) => (current === cards.length - 1 ? 0 : current + 1))} style={{ flex: 1 }} accent={accent}/>
      </react_native_1.View>

      {flipped && onRateConfidence ? (<react_native_1.View style={{ gap: theme.spacing.sm }}>
          <react_native_1.Text style={{
                color: theme.colors.textSoft,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
            }}>
            Rate recall confidence
          </react_native_1.Text>
          <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            {[
                { label: 'Hard', value: 'hard' },
                { label: 'Unsure', value: 'unsure' },
                { label: 'Easy', value: 'easy' },
            ].map((item) => (<Button_1.Button key={item.value} label={item.label} variant={currentConfidence === item.value ? 'primary' : 'secondary'} onPress={() => onRateConfidence(card.id, item.value)} accent={accent} style={{ flex: 1 }}/>))}
          </react_native_1.View>
        </react_native_1.View>) : null}
    </react_native_1.View>);
}
