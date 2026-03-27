import { Pressable, Text, View } from 'react-native';

import type { QuizQuestion } from '@/content/schema';
import { useAppTheme } from '@/hooks/use-app-theme';
import type { ElementAccentPalette } from '@/theme/element-accents';

interface QuizCardProps {
  question: QuizQuestion;
  selectedOptionId?: string;
  revealed: boolean;
  onSelect: (optionId: string) => void;
  accent?: ElementAccentPalette;
}

export function QuizCard({ question, selectedOptionId, revealed, onSelect, accent }: QuizCardProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        gap: theme.spacing.lg,
        overflow: 'hidden',
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: accent?.line ?? theme.colors.border,
        backgroundColor: theme.colors.surfaceElevated,
        padding: theme.spacing.xl,
      }}>
      <View style={{ gap: theme.spacing.sm }}>
        <Text
          style={{
            color: accent?.accent ?? theme.colors.teal,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}>
          {question.type === 'true-false' ? 'True / False' : 'Multiple Choice'}
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 32,
            fontWeight: '700',
            lineHeight: 38,
          }}>
          {question.prompt}
        </Text>
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.id === question.correctOptionId;
          const isWrongSelection = revealed && isSelected && !isCorrect;
          const tone = revealed
            ? isCorrect
              ? theme.colors.success
              : isWrongSelection
                ? theme.colors.danger
                : theme.colors.border
            : isSelected
              ? accent?.accent ?? theme.colors.accent
              : theme.colors.border;

          return (
            <Pressable
              key={option.id}
              accessibilityRole="button"
              disabled={revealed}
              onPress={() => onSelect(option.id)}
              style={({ hovered, pressed }) => ({
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: tone,
                backgroundColor:
                  revealed && isCorrect
                    ? accent?.accentSoft ?? theme.colors.accentSoft
                    : isSelected
                      ? accent?.panel ?? theme.colors.surfaceTinted
                      : theme.colors.surfaceElevated,
                padding: theme.spacing.lg,
                opacity: pressed ? 0.9 : 1,
                transform: [{ translateY: hovered ? -2 : 0 }],
              })}>
              <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                <Text
                  style={{
                    color:
                      revealed && isCorrect
                        ? theme.colors.success
                        : isSelected
                          ? accent?.accent ?? theme.colors.accent
                          : theme.colors.textMuted,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 0.7,
                    textTransform: 'uppercase',
                  }}>
                  {option.label}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                  }}>
                  {option.text}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {revealed ? (
        <View
          style={{
              borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: accent?.line ?? theme.colors.border,
            backgroundColor: accent?.panel ?? theme.colors.surfaceTinted,
            padding: theme.spacing.lg,
          }}>
          <Text
            style={{
              color: accent?.accent ?? theme.colors.textMuted,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 0.7,
              textTransform: 'uppercase',
              marginBottom: theme.spacing.xs,
            }}>
            Explanation
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.fonts.reading,
              fontSize: theme.typography.bodyLarge,
              lineHeight: 28,
            }}>
            {question.explanation}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
