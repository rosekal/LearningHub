"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortAnswerQuizCard = ShortAnswerQuizCard;
const react_native_1 = require("react-native");
const use_app_theme_1 = require("@/hooks/use-app-theme");
function verdictLabel(verdict) {
    if (verdict === 'partially-correct') {
        return 'Partially correct';
    }
    return verdict.charAt(0).toUpperCase() + verdict.slice(1);
}
function ShortAnswerQuizCard({ question, answer, onChangeAnswer, evaluation, accent, isSubmitting, }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const verdictTone = evaluation?.verdict === 'correct'
        ? theme.colors.success
        : evaluation?.verdict === 'partially-correct'
            ? theme.colors.warning
            : theme.colors.danger;
    return (<react_native_1.View style={{
            gap: theme.spacing.lg,
            overflow: 'hidden',
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent?.line ?? theme.colors.border,
            backgroundColor: theme.colors.surfaceElevated,
            padding: theme.spacing.xl,
        }}>
      <react_native_1.View style={{ gap: theme.spacing.sm }}>
        <react_native_1.Text style={{
            color: accent?.accent ?? theme.colors.teal,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
          AI Short-Answer
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 32,
            fontWeight: '700',
            lineHeight: 38,
        }}>
          {question.prompt}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 24,
        }}>
          {question.answerGuidance}
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={{
            gap: theme.spacing.sm,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: accent?.line ?? theme.colors.border,
            backgroundColor: theme.colors.surfaceOverlay,
            padding: theme.spacing.lg,
        }}>
        <react_native_1.Text style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
          Your answer
        </react_native_1.Text>
        <react_native_1.TextInput multiline editable={!evaluation && !isSubmitting} value={answer} onChangeText={onChangeAnswer} placeholder="Write a concise answer in your own words, using no more than 3 sentences." placeholderTextColor={theme.colors.textSoft} style={{
            minHeight: 160,
            color: theme.colors.text,
            fontFamily: theme.fonts.reading,
            fontSize: theme.typography.bodyLarge,
            lineHeight: 28,
            textAlignVertical: 'top',
        }}/>
      </react_native_1.View>

      {evaluation ? (<react_native_1.View style={{
                gap: theme.spacing.md,
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: verdictTone,
                backgroundColor: accent?.panel ?? theme.colors.surfaceTinted,
                padding: theme.spacing.lg,
            }}>
          <react_native_1.Text style={{
                color: verdictTone,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
            }}>
            {verdictLabel(evaluation.verdict)}
          </react_native_1.Text>
          <react_native_1.Text style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.reading,
                fontSize: theme.typography.bodyLarge,
                lineHeight: 28,
            }}>
            {evaluation.feedback}
          </react_native_1.Text>

          <react_native_1.View style={{ gap: theme.spacing.xs }}>
            <react_native_1.Text style={{
                color: theme.colors.textSoft,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
            }}>
              Reference answer
            </react_native_1.Text>
            <react_native_1.Text style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.body,
                fontSize: theme.typography.body,
                lineHeight: 24,
            }}>
              {question.referenceAnswer}
            </react_native_1.Text>
          </react_native_1.View>

          {evaluation.keyPointsCovered.length ? (<react_native_1.View style={{ gap: theme.spacing.xs }}>
              <react_native_1.Text style={{
                    color: theme.colors.success,
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                }}>
                Covered well
              </react_native_1.Text>
              {evaluation.keyPointsCovered.map((item) => (<react_native_1.Text key={item} style={{
                        color: theme.colors.text,
                        fontFamily: theme.fonts.body,
                        fontSize: theme.typography.body,
                        lineHeight: 24,
                    }}>
                  • {item}
                </react_native_1.Text>))}
            </react_native_1.View>) : null}

          {evaluation.missingKeyPoints.length ? (<react_native_1.View style={{ gap: theme.spacing.xs }}>
              <react_native_1.Text style={{
                    color: theme.colors.warning,
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                }}>
                Still missing
              </react_native_1.Text>
              {evaluation.missingKeyPoints.map((item) => (<react_native_1.Text key={item} style={{
                        color: theme.colors.text,
                        fontFamily: theme.fonts.body,
                        fontSize: theme.typography.body,
                        lineHeight: 24,
                    }}>
                  • {item}
                </react_native_1.Text>))}
            </react_native_1.View>) : null}
        </react_native_1.View>) : null}
    </react_native_1.View>);
}
