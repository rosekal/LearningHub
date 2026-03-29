import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { QuizCard } from '@/components/QuizCard';
import { ScoreSummary } from '@/components/ScoreSummary';
import { SectionHeader } from '@/components/SectionHeader';
import { ShortAnswerQuizCard } from '@/components/ShortAnswerQuizCard';
import type { QuizMissedQuestionState, QuizQuestion } from '@/content/schema';
import { getChapterById, getSubjectById, getTopicById, getUnitById } from '@/content/catalog';
import {
  buildChapterRawText,
  evaluateShortAnswer,
  generateShortAnswerQuestions,
  type ShortAnswerEvaluation,
  type ShortAnswerQuestion,
} from '@/features/learning/ai-short-answer';
import { getQuizResult, getQuizReviewState } from '@/features/learning/selectors';
import { useElementAccent } from '@/hooks/use-element-accent';
import { useOpenAISettings } from '@/hooks/use-openai-settings';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useStudy } from '@/hooks/use-study';
import { chapterRoute, homeRoute, subjectRoute, topicRoute, unitRoute } from '@/utils/routes';
import { getChapterStaticParams } from '@/utils/static-params';
import { formatQuizScore } from '@/utils/format';

export function generateStaticParams() {
  return getChapterStaticParams();
}

type QuizMode = 'ai' | 'standard';
type StandardQuizMode = 'full' | 'retry-missed' | 'review-missed';

type ShortAnswerResponseMap = Record<
  string,
  {
    answer: string;
    evaluation: ShortAnswerEvaluation;
  }
>;

function buildMissedQuestions(
  questions: QuizQuestion[],
  answers: Record<string, string>
): QuizMissedQuestionState[] {
  return questions
    .filter((question) => answers[question.id] !== question.correctOptionId)
    .map((question) => ({
      questionId: question.id,
      selectedOptionId: answers[question.id],
      correctOptionId: question.correctOptionId,
    }));
}

function optionText(question: QuizQuestion, optionId?: string) {
  return question.options.find((option) => option.id === optionId)?.text ?? 'No answer recorded';
}

export default function QuizScreen() {
  const { subjectId, topicId, unitId, chapterId } = useLocalSearchParams<{
    subjectId: string;
    topicId: string;
    unitId: string;
    chapterId: string;
  }>();
  const subject = getSubjectById(subjectId);
  const topic = getTopicById(subjectId, topicId);
  const unit = getUnitById(subjectId, topicId, unitId);
  const chapter = getChapterById(subjectId, topicId, unitId, chapterId);
  const theme = useAppTheme();
  const accent = useElementAccent(unit?.id);
  const {
    progress,
    saveQuizResult,
    saveQuizReviewState,
    markMissedQuestionsReviewed,
    setLastVisited,
  } = useStudy();
  const {
    isReady: isOpenAISettingsReady,
    storedApiKey,
    envApiKey,
    activeApiKey,
    model,
    saveApiKey,
    clearApiKey,
  } = useOpenAISettings();

  const [mode, setMode] = useState<QuizMode>(activeApiKey ? 'ai' : 'standard');
  const [apiKeyDraft, setApiKeyDraft] = useState('');

  const [standardMode, setStandardMode] = useState<StandardQuizMode>('full');
  const [index, setIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string>();
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [sessionMissedQuestions, setSessionMissedQuestions] = useState<QuizMissedQuestionState[]>([]);
  const [retrySourceQuestions, setRetrySourceQuestions] = useState<QuizMissedQuestionState[]>([]);

  const [aiQuestions, setAiQuestions] = useState<ShortAnswerQuestion[]>([]);
  const [aiIndex, setAiIndex] = useState(0);
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiResponses, setAiResponses] = useState<ShortAnswerResponseMap>({});
  const [aiShowSummary, setAiShowSummary] = useState(false);
  const [isGeneratingAiQuiz, setIsGeneratingAiQuiz] = useState(false);
  const [isEvaluatingAiAnswer, setIsEvaluatingAiAnswer] = useState(false);
  const [aiError, setAiError] = useState<string>();
  const [isSavingApiKey, setIsSavingApiKey] = useState(false);

  const chapterContext = useMemo(() => {
    if (!chapter) {
      return '';
    }

    return buildChapterRawText(chapter);
  }, [chapter]);

  const persistedReviewState = chapter && unit ? getQuizReviewState(progress, unit.id, chapter.id) : undefined;
  const persistedMissedQuestions = persistedReviewState?.missedQuestions ?? [];
  const actionableMissedQuestions =
    sessionMissedQuestions.length > 0
      ? sessionMissedQuestions
      : showSummary
        ? sessionMissedQuestions
        : persistedMissedQuestions;
  const retryQuestionSource = retrySourceQuestions.length > 0 ? retrySourceQuestions : persistedMissedQuestions;
  const standardQuestions = useMemo(() => {
    if (!chapter) {
      return [] as QuizQuestion[];
    }

    if (standardMode !== 'retry-missed') {
      return chapter.quiz;
    }

    const retryIds = new Set(retryQuestionSource.map((question) => question.questionId));
    const filtered = chapter.quiz.filter((question) => retryIds.has(question.id));
    return filtered.length ? filtered : chapter.quiz;
  }, [chapter, retryQuestionSource, standardMode]);
  const questionCount = standardMode === 'review-missed' ? actionableMissedQuestions.length : standardQuestions.length;
  const question =
    standardMode === 'review-missed'
      ? undefined
      : standardQuestions[Math.min(index, Math.max(standardQuestions.length - 1, 0))];
  const score = standardQuestions.filter((item) => answers[item.id] === item.correctOptionId).length;
  const correctedRetryScore =
    standardMode === 'retry-missed'
      ? Math.max(chapter?.quiz.length ?? 0 - retryQuestionSource.length, 0) + score
      : score;

  const providedApiKey = apiKeyDraft.trim() || activeApiKey;
  const aiScore = aiQuestions.filter((quizQuestion) => aiResponses[quizQuestion.id]?.evaluation.isCorrect).length;
  const currentAiQuestion = aiQuestions[aiIndex];
  const currentAiResponse = currentAiQuestion ? aiResponses[currentAiQuestion.id] : undefined;
  const previousResult = chapter && unit ? getQuizResult(progress, unit.id, chapter.id) : undefined;

  useEffect(() => {
    if (!subject || !topic || !unit || !chapter) {
      return;
    }

    setLastVisited({
      subjectId: subject.id,
      topicId: topic.id,
      unitId: unit.id,
      chapterId: chapter.id,
      updatedAt: new Date().toISOString(),
    });
  }, [chapter, setLastVisited, subject, topic, unit]);

  useEffect(() => {
    if (!unit || !chapter || !showSummary || mode !== 'standard' || standardMode === 'review-missed') {
      return;
    }

    saveQuizReviewState(
      unit.id,
      chapter.id,
      sessionMissedQuestions,
      standardQuestions.map((quizQuestion) => quizQuestion.id)
    );

    saveQuizResult(
      unit.id,
      chapter.id,
      standardMode === 'retry-missed' ? correctedRetryScore : score,
      chapter.quiz.length
    );
  }, [
    chapter,
    correctedRetryScore,
    mode,
    saveQuizResult,
    saveQuizReviewState,
    score,
    sessionMissedQuestions,
    showSummary,
    standardMode,
    standardQuestions,
    unit,
  ]);

  useEffect(() => {
    if (!unit || !chapter || !aiShowSummary || mode !== 'ai' || !aiQuestions.length) {
      return;
    }

    saveQuizResult(unit.id, chapter.id, aiScore, aiQuestions.length);
  }, [aiQuestions.length, aiScore, aiShowSummary, chapter, mode, saveQuizResult, unit]);

  if (!subject || !topic || !unit || !chapter) {
    return (
      <AppShell>
        <Text style={{ color: theme.colors.text }}>Quiz not found.</Text>
      </AppShell>
    );
  }

  const resolvedSubject = subject;
  const resolvedTopic = topic;
  const resolvedUnit = unit;
  const resolvedChapter = chapter;
  const summaryMissedQuestions = showSummary ? sessionMissedQuestions : actionableMissedQuestions;
  const reviewQuestions = summaryMissedQuestions
    .map((missedQuestion) => ({
      missedQuestion,
      question: resolvedChapter.quiz.find((entry) => entry.id === missedQuestion.questionId),
    }))
    .filter(
      (
        entry
      ): entry is { missedQuestion: QuizMissedQuestionState; question: QuizQuestion } =>
        Boolean(entry.question)
    );

  function resetStandardSession(nextMode: StandardQuizMode = 'full') {
    setStandardMode(nextMode);
    setIndex(0);
    setSelectedOptionId(undefined);
    setRevealed(false);
    setAnswers({});
    setShowSummary(false);
  }

  function revealAnswer() {
    if (!question || !selectedOptionId) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [question.id]: selectedOptionId,
    }));
    setRevealed(true);
  }

  function finishStandardSession() {
    const missedQuestions = buildMissedQuestions(standardQuestions, answers);
    setSessionMissedQuestions(missedQuestions);
    setShowSummary(true);
  }

  function goNext() {
    if (!question) {
      return;
    }

    if (index === questionCount - 1) {
      finishStandardSession();
      return;
    }

    setIndex((current) => current + 1);
    setSelectedOptionId(undefined);
    setRevealed(false);
  }

  function restartFullQuiz() {
    setSessionMissedQuestions([]);
    setRetrySourceQuestions([]);
    resetStandardSession('full');
  }

  function retryMissedQuestions() {
    const sourceQuestions = summaryMissedQuestions.length ? summaryMissedQuestions : persistedMissedQuestions;
    if (!sourceQuestions.length) {
      return;
    }

    setRetrySourceQuestions(sourceQuestions);
    setSessionMissedQuestions([]);
    resetStandardSession('retry-missed');
  }

  function reviewWrongAnswers() {
    const sourceQuestions = summaryMissedQuestions.length ? summaryMissedQuestions : persistedMissedQuestions;
    if (!sourceQuestions.length) {
      return;
    }

    setSessionMissedQuestions(sourceQuestions);
    setShowSummary(false);
    setStandardMode('review-missed');
    markMissedQuestionsReviewed(
      resolvedUnit.id,
      resolvedChapter.id,
      sourceQuestions.map((entry) => entry.questionId)
    );
  }

  function resetAiSession() {
    setAiQuestions([]);
    setAiIndex(0);
    setAiAnswer('');
    setAiResponses({});
    setAiShowSummary(false);
    setAiError(undefined);
  }

  function retryAiQuiz() {
    setAiIndex(0);
    setAiAnswer('');
    setAiResponses({});
    setAiShowSummary(false);
    setAiError(undefined);
  }

  async function handleSaveApiKey() {
    if (!apiKeyDraft.trim()) {
      setAiError('Enter an OpenAI API key before saving it locally.');
      return;
    }

    setIsSavingApiKey(true);
    setAiError(undefined);

    try {
      await saveApiKey(apiKeyDraft);
      setApiKeyDraft('');
    } catch {
      setAiError('Unable to save the OpenAI API key locally on this device.');
    } finally {
      setIsSavingApiKey(false);
    }
  }

  async function handleClearApiKey() {
    setAiError(undefined);

    try {
      await clearApiKey();
    } catch {
      setAiError('Unable to clear the saved OpenAI API key.');
    }
  }

  async function handleGenerateAiQuiz() {
    if (!providedApiKey) {
      setAiError('Enter an OpenAI API key to generate the short-answer quiz.');
      return;
    }

    setIsGeneratingAiQuiz(true);
    setAiError(undefined);

    try {
      const questions = await generateShortAnswerQuestions({
        apiKey: providedApiKey,
        model,
        chapter: resolvedChapter,
      });

      setAiQuestions(questions);
      setAiIndex(0);
      setAiAnswer('');
      setAiResponses({});
      setAiShowSummary(false);
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : 'OpenAI could not generate the short-answer quiz for this chapter.'
      );
    } finally {
      setIsGeneratingAiQuiz(false);
    }
  }

  async function handleEvaluateAiAnswer() {
    if (!currentAiQuestion || !aiAnswer.trim()) {
      return;
    }

    if (!providedApiKey) {
      setAiError('Enter an OpenAI API key before evaluating your answer.');
      return;
    }

    setIsEvaluatingAiAnswer(true);
    setAiError(undefined);

    try {
      const evaluation = await evaluateShortAnswer({
        apiKey: providedApiKey,
        model,
        chapterContext,
        question: currentAiQuestion,
        userAnswer: aiAnswer.trim(),
      });

      setAiResponses((current) => ({
        ...current,
        [currentAiQuestion.id]: {
          answer: aiAnswer.trim(),
          evaluation,
        },
      }));
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : 'OpenAI could not evaluate this short-answer response.'
      );
    } finally {
      setIsEvaluatingAiAnswer(false);
    }
  }

  function handleNextAiQuestion() {
    if (!currentAiQuestion || !currentAiResponse) {
      return;
    }

    if (aiIndex === aiQuestions.length - 1) {
      setAiShowSummary(true);
      return;
    }

    const nextIndex = aiIndex + 1;
    const nextQuestion = aiQuestions[nextIndex];

    setAiIndex(nextIndex);
    setAiAnswer(aiResponses[nextQuestion.id]?.answer ?? '');
    setAiError(undefined);
  }

  const heroDescription =
    mode === 'ai'
      ? 'Generate five short-answer questions from the current chapter text, answer each in no more than three sentences, and use the same model to evaluate each response in the same session.'
      : 'Answer each question, reveal the explanation, then retry only the misses or review the wrong answers before leaving the chapter.';

  const standardSectionTitle =
    standardMode === 'review-missed'
      ? 'Review wrong answers'
      : showSummary
        ? standardMode === 'retry-missed'
          ? 'Retry summary'
          : 'Final score'
        : standardMode === 'retry-missed'
          ? `Retry question ${Math.min(index + 1, Math.max(questionCount, 1))} of ${questionCount}`
          : `Question ${Math.min(index + 1, Math.max(questionCount, 1))} of ${resolvedChapter.quiz.length}`;

  const sectionDescription =
    mode === 'ai'
      ? aiShowSummary
        ? 'Review the score from five model-curated short-answer prompts and retry the session if you want a fresh set.'
        : aiQuestions.length
          ? 'Answer in your own words using no more than three sentences. Each response is checked against the chapter text and a short-answer rubric.'
          : 'Create an AI short-answer session from the current chapter text, or switch back to the standard local quiz below.'
      : standardMode === 'review-missed'
        ? 'Compare each missed question with the stored wrong answer, the correct answer, and the chapter explanation. This review state is saved locally.'
        : showSummary
          ? summaryMissedQuestions.length
            ? `You missed ${summaryMissedQuestions.length} question${summaryMissedQuestions.length === 1 ? '' : 's'}. Retry that subset or review the wrong answers before moving on.`
            : 'All questions were answered correctly in this session.'
          : standardMode === 'retry-missed'
            ? 'This retry session focuses only on questions that were previously missed for this chapter.'
            : 'This chapter quiz mixes multiple choice with true/false, then stores a missed-question review state locally after the attempt.';

  const standardSummaryFooter = (
    <View style={{ gap: theme.spacing.md }}>
      {summaryMissedQuestions.length ? (
        <>
          <Text
            style={{
              color: theme.colors.textMuted,
              fontFamily: theme.fonts.body,
              fontSize: 15,
              lineHeight: 24,
            }}>
            {summaryMissedQuestions.length} question{summaryMissedQuestions.length === 1 ? '' : 's'} still need review.
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            <Button
              label="Retry Missed Questions"
              variant="secondary"
              icon="refresh-outline"
              onPress={retryMissedQuestions}
              accent={accent}
            />
            <Button
              label="Review Wrong Answers"
              variant="ghost"
              icon="document-text-outline"
              onPress={reviewWrongAnswers}
              accent={accent}
            />
          </View>
        </>
      ) : (
        <Text
          style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.body,
            fontSize: 14,
            lineHeight: 22,
          }}>
          No outstanding missed-question review remains for this chapter.
        </Text>
      )}
    </View>
  );

  return (
    <AppShell
      accent={accent}
      hero={
        <View
          style={{
            overflow: 'hidden',
            gap: theme.spacing.lg,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: accent.heroFrom,
            padding: theme.spacing.xxl,
          }}>
          <Text
            style={{
              color: accent.accentContrast,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
            Quiz
          </Text>
          <Text
            style={{
              color: accent.accentContrast,
              fontFamily: theme.fonts.display,
              fontSize: 48,
              fontWeight: '700',
            }}>
            {chapter.title}
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.82)',
              fontFamily: theme.fonts.body,
              fontSize: theme.typography.bodyLarge,
              lineHeight: 30,
            }}>
            {heroDescription}
          </Text>
          {previousResult ? (
            <Text
              style={{
                color: 'rgba(255,255,255,0.72)',
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}>
              Previous best: {formatQuizScore(previousResult.bestScore, previousResult.totalQuestions)}
            </Text>
          ) : null}
        </View>
      }
      breadcrumbs={[
        { label: 'Home', href: homeRoute() },
        { label: resolvedSubject.title, href: subjectRoute(resolvedSubject.id) },
        { label: resolvedTopic.title, href: topicRoute(resolvedSubject.id, resolvedTopic.id) },
        { label: resolvedUnit.title, href: unitRoute(resolvedSubject.id, resolvedTopic.id, resolvedUnit.id) },
        {
          label: resolvedChapter.title,
          href: chapterRoute(resolvedSubject.id, resolvedTopic.id, resolvedUnit.id, resolvedChapter.id),
        },
        { label: 'Quiz' },
      ]}>
      <View style={{ gap: theme.spacing.md }}>
        <SectionHeader
          eyebrow="Assessment"
          title={
            mode === 'ai'
              ? aiShowSummary
                ? 'AI short-answer summary'
                : aiQuestions.length
                  ? `AI question ${aiIndex + 1} of ${aiQuestions.length}`
                  : 'AI short-answer quiz'
              : standardSectionTitle
          }
          description={sectionDescription}
          accent={accent}
        />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
          }}>
          <Button
            label="AI Short-Answer"
            variant={mode === 'ai' ? 'primary' : 'secondary'}
            icon="sparkles-outline"
            onPress={() => setMode('ai')}
            accent={accent}
          />
          <Button
            label="Standard Quiz"
            variant={mode === 'standard' ? 'primary' : 'secondary'}
            icon="list-outline"
            onPress={() => setMode('standard')}
            accent={accent}
          />
        </View>

        {mode === 'ai' ? (
          <>
            <View
              style={{
                gap: theme.spacing.md,
                borderRadius: theme.radius.xl,
                borderWidth: 1,
                borderColor: accent.line,
                backgroundColor: theme.colors.surfaceElevated,
                padding: theme.spacing.xl,
              }}>
              <View style={{ gap: theme.spacing.xs }}>
                <Text
                  style={{
                    color: accent.accent ?? theme.colors.teal,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}>
                  OpenAI setup
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.display,
                    fontSize: 30,
                    fontWeight: '700',
                    lineHeight: 36,
                  }}>
                  Enable model-curated short-answer questions
                </Text>
                <Text
                  style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                  }}>
                  Enter an OpenAI API key to generate five short-answer prompts from this chapter
                  and grade each response. Answers are designed to stay within three sentences.
                  The current app sends the request directly from the client, so use this only
                  for personal testing.
                </Text>
              </View>

              <View
                style={{
                  gap: theme.spacing.sm,
                  borderRadius: theme.radius.lg,
                  borderWidth: 1,
                  borderColor: accent.line,
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
                  OpenAI API key
                </Text>
                <TextInput
                  value={apiKeyDraft}
                  onChangeText={setApiKeyDraft}
                  placeholder="Enter your OpenAI API key"
                  placeholderTextColor={theme.colors.textSoft}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    paddingVertical: 4,
                  }}
                />
              </View>

              <Text
                style={{
                  color: theme.colors.textSoft,
                  fontFamily: theme.fonts.body,
                  fontSize: 14,
                  lineHeight: 22,
                }}>
                {storedApiKey
                  ? 'Using a key saved locally on this device.'
                  : envApiKey
                    ? 'Using EXPO_PUBLIC_OPENAI_API_KEY from the current build.'
                    : isOpenAISettingsReady
                      ? 'No local OpenAI key is currently saved.'
                      : 'Loading local OpenAI settings.'}
              </Text>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
                <Button
                  label={isSavingApiKey ? 'Saving Key' : 'Save Key Locally'}
                  variant="secondary"
                  icon="key-outline"
                  onPress={handleSaveApiKey}
                  disabled={!apiKeyDraft.trim() || isSavingApiKey}
                  accent={accent}
                />
                <Button
                  label={
                    isGeneratingAiQuiz
                      ? 'Generating Quiz'
                      : aiQuestions.length
                        ? 'Regenerate 5 Questions'
                        : 'Generate 5 Questions'
                  }
                  icon="sparkles-outline"
                  onPress={handleGenerateAiQuiz}
                  disabled={!providedApiKey || isGeneratingAiQuiz}
                  accent={accent}
                />
                {storedApiKey ? (
                  <Button
                    label="Clear Saved Key"
                    variant="ghost"
                    icon="trash-outline"
                    onPress={handleClearApiKey}
                    accent={accent}
                  />
                ) : null}
              </View>
            </View>

            {aiError ? (
              <View
                style={{
                  borderRadius: theme.radius.lg,
                  borderWidth: 1,
                  borderColor: theme.colors.danger,
                  backgroundColor: theme.colors.surfaceElevated,
                  padding: theme.spacing.lg,
                }}>
                <Text
                  style={{
                    color: theme.colors.danger,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                  }}>
                  {aiError}
                </Text>
              </View>
            ) : null}

            {isGeneratingAiQuiz ? (
              <View
                style={{
                  alignItems: 'center',
                  gap: theme.spacing.md,
                  borderRadius: theme.radius.xl,
                  borderWidth: 1,
                  borderColor: accent.line,
                  backgroundColor: theme.colors.surfaceElevated,
                  padding: theme.spacing.xxl,
                }}>
                <ActivityIndicator size="small" color={accent.accent} />
                <Text
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                    textAlign: 'center',
                  }}>
                  Building five short-answer prompts from this chapter text.
                </Text>
              </View>
            ) : aiShowSummary ? (
              <ScoreSummary
                score={aiScore}
                total={aiQuestions.length}
                bestScore={Math.max(previousResult?.bestScore ?? 0, aiScore)}
                onRetry={retryAiQuiz}
                accent={accent}
              />
            ) : aiQuestions.length ? (
              <>
                <ShortAnswerQuizCard
                  question={currentAiQuestion}
                  answer={currentAiResponse?.answer ?? aiAnswer}
                  onChangeAnswer={setAiAnswer}
                  evaluation={currentAiResponse?.evaluation}
                  isSubmitting={isEvaluatingAiAnswer}
                  accent={accent}
                />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
                  <Button
                    label={
                      currentAiResponse
                        ? aiIndex === aiQuestions.length - 1
                          ? 'Finish Quiz'
                          : 'Next Question'
                        : isEvaluatingAiAnswer
                          ? 'Evaluating Answer'
                          : 'Evaluate Answer'
                    }
                    icon={currentAiResponse ? 'arrow-forward-outline' : 'sparkles-outline'}
                    onPress={currentAiResponse ? handleNextAiQuestion : handleEvaluateAiAnswer}
                    disabled={currentAiResponse ? false : !aiAnswer.trim() || isEvaluatingAiAnswer}
                    style={{ flex: 1 }}
                    accent={accent}
                  />
                  <Button
                    label="New AI Session"
                    variant="ghost"
                    icon="refresh-outline"
                    onPress={resetAiSession}
                    style={{ flex: 1 }}
                    accent={accent}
                  />
                </View>
              </>
            ) : (
              <View
                style={{
                  gap: theme.spacing.sm,
                  borderRadius: theme.radius.xl,
                  borderWidth: 1,
                  borderColor: accent.line,
                  backgroundColor: theme.colors.surfaceElevated,
                  padding: theme.spacing.xl,
                }}>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.display,
                    fontSize: 30,
                    fontWeight: '700',
                  }}>
                  No AI quiz session yet
                </Text>
                <Text
                  style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                  }}>
                  Generate five short-answer questions from this chapter to start the AI-guided
                  assessment. Each answer is intended to stay within three sentences. The
                  standard chapter quiz remains available below if you want the local offline
                  flow instead.
                </Text>
              </View>
            )}
          </>
        ) : standardMode === 'review-missed' ? (
          <View style={{ gap: theme.spacing.md }}>
            {reviewQuestions.map(({ missedQuestion, question: reviewQuestion }, reviewIndex) => (
              <View
                key={reviewQuestion.id}
                style={{
                  gap: theme.spacing.md,
                  borderRadius: theme.radius.xl,
                  borderWidth: 1,
                  borderColor: accent.line,
                  backgroundColor: theme.colors.surfaceElevated,
                  padding: theme.spacing.xl,
                }}>
                <Text
                  style={{
                    color: accent.accent,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}>
                  Review {reviewIndex + 1}
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.display,
                    fontSize: 30,
                    fontWeight: '700',
                    lineHeight: 36,
                  }}>
                  {reviewQuestion.prompt}
                </Text>
                <View
                  style={{
                    gap: theme.spacing.xs,
                    borderRadius: theme.radius.lg,
                    borderWidth: 1,
                    borderColor: theme.colors.danger,
                    backgroundColor: theme.colors.surfaceOverlay,
                    padding: theme.spacing.lg,
                  }}>
                  <Text
                    style={{
                      color: theme.colors.danger,
                      fontFamily: theme.fonts.mono,
                      fontSize: 11,
                      fontWeight: '700',
                      letterSpacing: 0.8,
                      textTransform: 'uppercase',
                    }}>
                    Your answer
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontFamily: theme.fonts.body,
                      fontSize: theme.typography.body,
                      lineHeight: 24,
                    }}>
                    {optionText(reviewQuestion, missedQuestion.selectedOptionId)}
                  </Text>
                </View>
                <View
                  style={{
                    gap: theme.spacing.xs,
                    borderRadius: theme.radius.lg,
                    borderWidth: 1,
                    borderColor: accent.line,
                    backgroundColor: accent.panel,
                    padding: theme.spacing.lg,
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
                    Correct answer
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontFamily: theme.fonts.body,
                      fontSize: theme.typography.body,
                      lineHeight: 24,
                    }}>
                    {optionText(reviewQuestion, missedQuestion.correctOptionId)}
                  </Text>
                </View>
                <View
                  style={{
                    gap: theme.spacing.xs,
                    borderRadius: theme.radius.lg,
                    borderWidth: 1,
                    borderColor: accent.line,
                    backgroundColor: theme.colors.surfaceOverlay,
                    padding: theme.spacing.lg,
                  }}>
                  <Text
                    style={{
                      color: accent.accentStrong,
                      fontFamily: theme.fonts.mono,
                      fontSize: 11,
                      fontWeight: '700',
                      letterSpacing: 0.8,
                      textTransform: 'uppercase',
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
                    {reviewQuestion.explanation}
                  </Text>
                </View>
              </View>
            ))}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
              {summaryMissedQuestions.length ? (
                <Button
                  label="Retry Missed Questions"
                  icon="refresh-outline"
                  onPress={retryMissedQuestions}
                  accent={accent}
                />
              ) : null}
              <Button
                label="Restart Full Quiz"
                variant="secondary"
                icon="list-outline"
                onPress={restartFullQuiz}
                accent={accent}
              />
            </View>
          </View>
        ) : showSummary ? (
          <ScoreSummary
            score={standardMode === 'retry-missed' ? correctedRetryScore : score}
            total={resolvedChapter.quiz.length}
            bestScore={Math.max(
              previousResult?.bestScore ?? 0,
              standardMode === 'retry-missed' ? correctedRetryScore : score
            )}
            onRetry={restartFullQuiz}
            retryLabel="Retry Full Quiz"
            footer={standardSummaryFooter}
            accent={accent}
          />
        ) : standardQuestions.length === 0 ? (
          <View
            style={{
              gap: theme.spacing.sm,
              borderRadius: theme.radius.xl,
              borderWidth: 1,
              borderColor: accent.line,
              backgroundColor: theme.colors.surfaceElevated,
              padding: theme.spacing.xl,
            }}>
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.display,
                fontSize: 30,
                fontWeight: '700',
              }}>
              No retry set is available
            </Text>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: theme.typography.body,
                lineHeight: 24,
              }}>
              This chapter does not currently have missed questions saved for retry. Start the full
              quiz to create a fresh review set.
            </Text>
            <Button
              label="Start Full Quiz"
              icon="list-outline"
              onPress={restartFullQuiz}
              accent={accent}
            />
          </View>
        ) : (
          <>
            {persistedMissedQuestions.length > 0 &&
            standardMode === 'full' &&
            index === 0 &&
            !revealed &&
            !Object.keys(answers).length ? (
              <View
                style={{
                  gap: theme.spacing.md,
                  borderRadius: theme.radius.xl,
                  borderWidth: 1,
                  borderColor: accent.line,
                  backgroundColor: theme.colors.surfaceElevated,
                  padding: theme.spacing.xl,
                }}>
                <Text
                  style={{
                    color: accent.accent,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}>
                  Pending review
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.display,
                    fontSize: 28,
                    fontWeight: '700',
                    lineHeight: 34,
                  }}>
                  {persistedMissedQuestions.length} missed question{persistedMissedQuestions.length === 1 ? '' : 's'} saved locally
                </Text>
                <Text
                  style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                  }}>
                  You can jump straight into the missed-question retry set or review the wrong
                  answers before starting the full quiz again.
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
                  <Button
                    label="Retry Missed Questions"
                    variant="secondary"
                    icon="refresh-outline"
                    onPress={retryMissedQuestions}
                    accent={accent}
                  />
                  <Button
                    label="Review Wrong Answers"
                    variant="ghost"
                    icon="document-text-outline"
                    onPress={reviewWrongAnswers}
                    accent={accent}
                  />
                </View>
              </View>
            ) : null}

            {question ? (
              <QuizCard
                question={question}
                selectedOptionId={selectedOptionId}
                revealed={revealed}
                onSelect={setSelectedOptionId}
                accent={accent}
              />
            ) : null}
            <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
              <Button
                label={
                  revealed
                    ? index === questionCount - 1
                      ? 'Finish Quiz'
                      : 'Next Question'
                    : 'Reveal Answer'
                }
                icon={revealed ? 'arrow-forward-outline' : 'checkmark-done-outline'}
                onPress={revealed ? goNext : revealAnswer}
                disabled={!selectedOptionId}
                style={{ flex: 1 }}
                accent={accent}
              />
              <Button
                label={standardMode === 'retry-missed' ? 'Restart Retry' : 'Restart'}
                variant="ghost"
                icon="refresh-outline"
                onPress={() =>
                  standardMode === 'retry-missed' ? retryMissedQuestions() : restartFullQuiz()
                }
                style={{ flex: 1 }}
                accent={accent}
              />
            </View>
          </>
        )}
      </View>
    </AppShell>
  );
}
