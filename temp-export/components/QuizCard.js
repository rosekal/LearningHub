"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizCard = QuizCard;
const react_native_1 = require("react-native");
const use_app_theme_1 = require("@/hooks/use-app-theme");
function QuizCard({ question, selectedOptionId, revealed, onSelect, accent }) {
    const theme = (0, use_app_theme_1.useAppTheme)();
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
          {question.type === 'true-false' ? 'True / False' : 'Multiple Choice'}
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
      </react_native_1.View>

      <react_native_1.View style={{ gap: theme.spacing.sm }}>
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
            return (<react_native_1.Pressable key={option.id} accessibilityRole="button" disabled={revealed} onPress={() => onSelect(option.id)} style={({ hovered, pressed }) => ({
                    borderRadius: theme.radius.lg,
                    borderWidth: 1,
                    borderColor: tone,
                    backgroundColor: revealed && isCorrect
                        ? accent?.accentSoft ?? theme.colors.accentSoft
                        : isSelected
                            ? accent?.panel ?? theme.colors.surfaceTinted
                            : theme.colors.surfaceElevated,
                    padding: theme.spacing.lg,
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ translateY: hovered ? -2 : 0 }],
                })}>
              <react_native_1.View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                <react_native_1.Text style={{
                    color: revealed && isCorrect
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
                </react_native_1.Text>
                <react_native_1.Text style={{
                    flex: 1,
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                }}>
                  {option.text}
                </react_native_1.Text>
              </react_native_1.View>
            </react_native_1.Pressable>);
        })}
      </react_native_1.View>

      {revealed ? (<react_native_1.View style={{
                borderRadius: theme.radius.md,
                borderWidth: 1,
                borderColor: accent?.line ?? theme.colors.border,
                backgroundColor: accent?.panel ?? theme.colors.surfaceTinted,
                padding: theme.spacing.lg,
            }}>
          <react_native_1.Text style={{
                color: accent?.accent ?? theme.colors.textMuted,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.7,
                textTransform: 'uppercase',
                marginBottom: theme.spacing.xs,
            }}>
            Explanation
          </react_native_1.Text>
          <react_native_1.Text style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.reading,
                fontSize: theme.typography.bodyLarge,
                lineHeight: 28,
            }}>
            {question.explanation}
          </react_native_1.Text>
        </react_native_1.View>) : null}
    </react_native_1.View>);
}
