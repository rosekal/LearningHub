import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { FlashcardConfidence, Flashcard } from '@/content/schema';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Button } from '@/components/Button';
import type { ElementAccentPalette } from '@/theme/element-accents';

interface FlashcardDeckProps {
  cards: Flashcard[];
  reviewedCount: number;
  onReview: (flashcardId: string) => void;
  getConfidence?: (flashcardId: string) => FlashcardConfidence | undefined;
  onRateConfidence?: (flashcardId: string, confidence: FlashcardConfidence) => void;
  accent?: ElementAccentPalette;
}

export function FlashcardDeck({
  cards,
  reviewedCount,
  onReview,
  getConfidence,
  onRateConfidence,
  accent,
}: FlashcardDeckProps) {
  const theme = useAppTheme();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const rotation = useSharedValue(0);
  const prefersReducedMotion = useReducedMotion();
  const card = cards[index];
  const currentConfidence = getConfidence?.(card.id);

  useEffect(() => {
    rotation.value = withTiming(0, { duration: prefersReducedMotion ? 0 : 220 });
    setFlipped(false);
  }, [index, prefersReducedMotion, rotation]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1200 }, { rotateY: `${rotation.value}deg` }],
    backfaceVisibility: 'hidden' as never,
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1200 }, { rotateY: `${rotation.value + 180}deg` }],
    backfaceVisibility: 'hidden' as never,
    position: 'absolute',
    inset: 0 as never,
  }));

  function handleFlip() {
    const next = !flipped;
    setFlipped(next);
    rotation.value = withTiming(next ? 180 : 0, { duration: prefersReducedMotion ? 0 : 320 });
    if (next) {
      onReview(card.id);
    }
  }

  return (
    <View style={{ gap: theme.spacing.lg }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: theme.spacing.sm,
        }}>
        <Text
          style={{
            color: accent?.accent ?? theme.colors.textMuted,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
          }}>
          Card {index + 1} of {cards.length}
        </Text>
        <Text
          style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
          }}>
          {reviewedCount} reviewed locally
        </Text>
      </View>

      {currentConfidence ? (
        <Text
          style={{
            color: accent?.accentStrong ?? theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
          }}>
          Current confidence: {currentConfidence}
        </Text>
      ) : null}

      <Pressable accessibilityRole="button" onPress={handleFlip}>
        <View style={{ minHeight: 320 }}>
          <Animated.View
            style={[
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
            <View style={{ gap: theme.spacing.md }}>
              <Text
                style={{
                  color: accent?.accentContrast ?? theme.colors.textMuted,
                  fontFamily: theme.fonts.mono,
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                Front
              </Text>
              <Text
                style={{
                  color: accent?.accentContrast ?? theme.colors.text,
                  fontFamily: theme.fonts.display,
                  fontSize: 34,
                  fontWeight: '700',
                  lineHeight: 40,
                }}>
                {card.front}
              </Text>
            </View>
            <Text
              style={{
                color: 'rgba(255,255,255,0.72)',
                fontFamily: theme.fonts.mono,
                fontSize: 14,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
              }}>
              Tap to reveal the answer
            </Text>
          </Animated.View>

          <Animated.View
            style={[
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
            <View style={{ gap: theme.spacing.md }}>
              <Text
                style={{
                  color: accent?.accent ?? theme.colors.gold,
                  fontFamily: theme.fonts.mono,
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                Back
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: theme.fonts.reading,
                  fontSize: 28,
                  lineHeight: 38,
                }}>
                {card.back}
              </Text>
            </View>
            <Text
              style={{
                color: theme.colors.textSoft,
                fontFamily: theme.fonts.mono,
                fontSize: 14,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
              }}>
              Tap again to revisit the prompt
            </Text>
          </Animated.View>
        </View>
      </Pressable>

      <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
        <Button
          label="Previous"
          variant="secondary"
          icon="chevron-back-outline"
          disabled={index === 0}
          onPress={() => setIndex((current) => Math.max(current - 1, 0))}
          style={{ flex: 1 }}
          accent={accent}
        />
        <Button
          label={index === cards.length - 1 ? 'Start Over' : 'Next'}
          icon={index === cards.length - 1 ? 'refresh-outline' : 'chevron-forward-outline'}
          onPress={() => setIndex((current) => (current === cards.length - 1 ? 0 : current + 1))}
          style={{ flex: 1 }}
          accent={accent}
        />
      </View>

      {flipped && onRateConfidence ? (
        <View style={{ gap: theme.spacing.sm }}>
          <Text
            style={{
              color: theme.colors.textSoft,
              fontFamily: theme.fonts.mono,
              fontSize: 11,
              fontWeight: '700',
              letterSpacing: 0.8,
              textTransform: 'uppercase',
            }}>
            Rate recall confidence
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            {([
              { label: 'Hard', value: 'hard' },
              { label: 'Unsure', value: 'unsure' },
              { label: 'Easy', value: 'easy' },
            ] as const).map((item) => (
              <Button
                key={item.value}
                label={item.label}
                variant={currentConfidence === item.value ? 'primary' : 'secondary'}
                onPress={() => onRateConfidence(card.id, item.value)}
                accent={accent}
                style={{ flex: 1 }}
              />
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
}
