import { Text, TextInput, View } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';
import type { ElementAccentPalette } from '@/theme/element-accents';
import type {
  ShortAnswerEvaluation,
  ShortAnswerQuestion,
} from '@/features/learning/ai-short-answer';

interface ShortAnswerQuizCardProps {
  question: ShortAnswerQuestion;
  answer: string;
  onChangeAnswer: (value: string) => void;
  evaluation?: ShortAnswerEvaluation;
  accent?: ElementAccentPalette;
  isSubmitting?: boolean;
}

function verdictLabel(verdict: ShortAnswerEvaluation['verdict']) {
  if (verdict === 'partially-correct') {
    return 'Partially correct';
  }

  return verdict.charAt(0).toUpperCase() + verdict.slice(1);
}

export function ShortAnswerQuizCard({
  question,
  answer,
  onChangeAnswer,
  evaluation,
  accent,
  isSubmitting,
}: ShortAnswerQuizCardProps) {
  const theme = useAppTheme();
  const verdictTone =
    evaluation?.verdict === 'correct'
      ? theme.colors.success
      : evaluation?.verdict === 'partially-correct'
        ? theme.colors.warning
        : theme.colors.danger;

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
          AI Short-Answer
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
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 24,
          }}>
          {question.answerGuidance}
        </Text>
      </View>

      <View
        style={{
          gap: theme.spacing.sm,
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: accent?.line ?? theme.colors.border,
          backgroundColor: theme.colors.surfaceOverlay,
          padding: theme.spacing.lg,
        }}>
        <Text
          style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
          }}>
          Your answer
        </Text>
        <TextInput
          multiline
          editable={!evaluation && !isSubmitting}
          value={answer}
          onChangeText={onChangeAnswer}
          placeholder="Write a concise answer in your own words, using no more than 3 sentences."
          placeholderTextColor={theme.colors.textSoft}
          style={{
            minHeight: 160,
            color: theme.colors.text,
            fontFamily: theme.fonts.reading,
            fontSize: theme.typography.bodyLarge,
            lineHeight: 28,
            textAlignVertical: 'top',
          }}
        />
      </View>

      {evaluation ? (
        <View
          style={{
            gap: theme.spacing.md,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: verdictTone,
            backgroundColor: accent?.panel ?? theme.colors.surfaceTinted,
            padding: theme.spacing.lg,
          }}>
          <Text
            style={{
              color: verdictTone,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 0.8,
              textTransform: 'uppercase',
            }}>
            {verdictLabel(evaluation.verdict)}
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.fonts.reading,
              fontSize: theme.typography.bodyLarge,
              lineHeight: 28,
            }}>
            {evaluation.feedback}
          </Text>

          <View style={{ gap: theme.spacing.xs }}>
            <Text
              style={{
                color: theme.colors.textSoft,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}>
              Reference answer
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.body,
                fontSize: theme.typography.body,
                lineHeight: 24,
              }}>
              {question.referenceAnswer}
            </Text>
          </View>

          {evaluation.keyPointsCovered.length ? (
            <View style={{ gap: theme.spacing.xs }}>
              <Text
                style={{
                  color: theme.colors.success,
                  fontFamily: theme.fonts.mono,
                  fontSize: 11,
                  fontWeight: '700',
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                }}>
                Covered well
              </Text>
              {evaluation.keyPointsCovered.map((item) => (
                <Text
                  key={item}
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                  }}>
                  • {item}
                </Text>
              ))}
            </View>
          ) : null}

          {evaluation.missingKeyPoints.length ? (
            <View style={{ gap: theme.spacing.xs }}>
              <Text
                style={{
                  color: theme.colors.warning,
                  fontFamily: theme.fonts.mono,
                  fontSize: 11,
                  fontWeight: '700',
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                }}>
                Still missing
              </Text>
              {evaluation.missingKeyPoints.map((item) => (
                <Text
                  key={item}
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                  }}>
                  • {item}
                </Text>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
