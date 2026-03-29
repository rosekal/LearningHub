"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaticParams = generateStaticParams;
exports.default = QuizScreen;
const react_1 = require("react");
const react_native_1 = require("react-native");
const expo_router_1 = require("expo-router");
const AppShell_1 = require("@/components/AppShell");
const Button_1 = require("@/components/Button");
const QuizCard_1 = require("@/components/QuizCard");
const ScoreSummary_1 = require("@/components/ScoreSummary");
const SectionHeader_1 = require("@/components/SectionHeader");
const ShortAnswerQuizCard_1 = require("@/components/ShortAnswerQuizCard");
const catalog_1 = require("@/content/catalog");
const ai_short_answer_1 = require("@/features/learning/ai-short-answer");
const selectors_1 = require("@/features/learning/selectors");
const use_element_accent_1 = require("@/hooks/use-element-accent");
const use_openai_settings_1 = require("@/hooks/use-openai-settings");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_study_1 = require("@/hooks/use-study");
const routes_1 = require("@/utils/routes");
const static_params_1 = require("@/utils/static-params");
const format_1 = require("@/utils/format");
function generateStaticParams() {
    return (0, static_params_1.getChapterStaticParams)();
}
function buildMissedQuestions(questions, answers) {
    return questions
        .filter((question) => answers[question.id] !== question.correctOptionId)
        .map((question) => ({
        questionId: question.id,
        selectedOptionId: answers[question.id],
        correctOptionId: question.correctOptionId,
    }));
}
function optionText(question, optionId) {
    return question.options.find((option) => option.id === optionId)?.text ?? 'No answer recorded';
}
function QuizScreen() {
    const { subjectId, topicId, unitId, chapterId } = (0, expo_router_1.useLocalSearchParams)();
    const subject = (0, catalog_1.getSubjectById)(subjectId);
    const topic = (0, catalog_1.getTopicById)(subjectId, topicId);
    const unit = (0, catalog_1.getUnitById)(subjectId, topicId, unitId);
    const chapter = (0, catalog_1.getChapterById)(subjectId, topicId, unitId, chapterId);
    const theme = (0, use_app_theme_1.useAppTheme)();
    const accent = (0, use_element_accent_1.useElementAccent)(unit?.id);
    const { progress, saveQuizResult, saveQuizReviewState, markMissedQuestionsReviewed, setLastVisited, } = (0, use_study_1.useStudy)();
    const { isReady: isOpenAISettingsReady, storedApiKey, envApiKey, activeApiKey, model, saveApiKey, clearApiKey, } = (0, use_openai_settings_1.useOpenAISettings)();
    const [mode, setMode] = (0, react_1.useState)(activeApiKey ? 'ai' : 'standard');
    const [apiKeyDraft, setApiKeyDraft] = (0, react_1.useState)('');
    const [standardMode, setStandardMode] = (0, react_1.useState)('full');
    const [index, setIndex] = (0, react_1.useState)(0);
    const [selectedOptionId, setSelectedOptionId] = (0, react_1.useState)();
    const [revealed, setRevealed] = (0, react_1.useState)(false);
    const [answers, setAnswers] = (0, react_1.useState)({});
    const [showSummary, setShowSummary] = (0, react_1.useState)(false);
    const [sessionMissedQuestions, setSessionMissedQuestions] = (0, react_1.useState)([]);
    const [retrySourceQuestions, setRetrySourceQuestions] = (0, react_1.useState)([]);
    const [aiQuestions, setAiQuestions] = (0, react_1.useState)([]);
    const [aiIndex, setAiIndex] = (0, react_1.useState)(0);
    const [aiAnswer, setAiAnswer] = (0, react_1.useState)('');
    const [aiResponses, setAiResponses] = (0, react_1.useState)({});
    const [aiShowSummary, setAiShowSummary] = (0, react_1.useState)(false);
    const [isGeneratingAiQuiz, setIsGeneratingAiQuiz] = (0, react_1.useState)(false);
    const [isEvaluatingAiAnswer, setIsEvaluatingAiAnswer] = (0, react_1.useState)(false);
    const [aiError, setAiError] = (0, react_1.useState)();
    const [isSavingApiKey, setIsSavingApiKey] = (0, react_1.useState)(false);
    const chapterContext = (0, react_1.useMemo)(() => {
        if (!chapter) {
            return '';
        }
        return (0, ai_short_answer_1.buildChapterRawText)(chapter);
    }, [chapter]);
    const persistedReviewState = chapter && unit ? (0, selectors_1.getQuizReviewState)(progress, unit.id, chapter.id) : undefined;
    const persistedMissedQuestions = persistedReviewState?.missedQuestions ?? [];
    const actionableMissedQuestions = sessionMissedQuestions.length > 0
        ? sessionMissedQuestions
        : showSummary
            ? sessionMissedQuestions
            : persistedMissedQuestions;
    const retryQuestionSource = retrySourceQuestions.length > 0 ? retrySourceQuestions : persistedMissedQuestions;
    const standardQuestions = (0, react_1.useMemo)(() => {
        if (!chapter) {
            return [];
        }
        if (standardMode !== 'retry-missed') {
            return chapter.quiz;
        }
        const retryIds = new Set(retryQuestionSource.map((question) => question.questionId));
        const filtered = chapter.quiz.filter((question) => retryIds.has(question.id));
        return filtered.length ? filtered : chapter.quiz;
    }, [chapter, retryQuestionSource, standardMode]);
    const questionCount = standardMode === 'review-missed' ? actionableMissedQuestions.length : standardQuestions.length;
    const question = standardMode === 'review-missed'
        ? undefined
        : standardQuestions[Math.min(index, Math.max(standardQuestions.length - 1, 0))];
    const score = standardQuestions.filter((item) => answers[item.id] === item.correctOptionId).length;
    const correctedRetryScore = standardMode === 'retry-missed'
        ? Math.max(chapter?.quiz.length ?? 0 - retryQuestionSource.length, 0) + score
        : score;
    const providedApiKey = apiKeyDraft.trim() || activeApiKey;
    const aiScore = aiQuestions.filter((quizQuestion) => aiResponses[quizQuestion.id]?.evaluation.isCorrect).length;
    const currentAiQuestion = aiQuestions[aiIndex];
    const currentAiResponse = currentAiQuestion ? aiResponses[currentAiQuestion.id] : undefined;
    const previousResult = chapter && unit ? (0, selectors_1.getQuizResult)(progress, unit.id, chapter.id) : undefined;
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        if (!unit || !chapter || !showSummary || mode !== 'standard' || standardMode === 'review-missed') {
            return;
        }
        saveQuizReviewState(unit.id, chapter.id, sessionMissedQuestions, standardQuestions.map((quizQuestion) => quizQuestion.id));
        saveQuizResult(unit.id, chapter.id, standardMode === 'retry-missed' ? correctedRetryScore : score, chapter.quiz.length);
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
    (0, react_1.useEffect)(() => {
        if (!unit || !chapter || !aiShowSummary || mode !== 'ai' || !aiQuestions.length) {
            return;
        }
        saveQuizResult(unit.id, chapter.id, aiScore, aiQuestions.length);
    }, [aiQuestions.length, aiScore, aiShowSummary, chapter, mode, saveQuizResult, unit]);
    if (!subject || !topic || !unit || !chapter) {
        return (<AppShell_1.AppShell>
        <react_native_1.Text style={{ color: theme.colors.text }}>Quiz not found.</react_native_1.Text>
      </AppShell_1.AppShell>);
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
        .filter((entry) => Boolean(entry.question));
    function resetStandardSession(nextMode = 'full') {
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
        markMissedQuestionsReviewed(resolvedUnit.id, resolvedChapter.id, sourceQuestions.map((entry) => entry.questionId));
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
        }
        catch {
            setAiError('Unable to save the OpenAI API key locally on this device.');
        }
        finally {
            setIsSavingApiKey(false);
        }
    }
    async function handleClearApiKey() {
        setAiError(undefined);
        try {
            await clearApiKey();
        }
        catch {
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
            const questions = await (0, ai_short_answer_1.generateShortAnswerQuestions)({
                apiKey: providedApiKey,
                model,
                chapter: resolvedChapter,
            });
            setAiQuestions(questions);
            setAiIndex(0);
            setAiAnswer('');
            setAiResponses({});
            setAiShowSummary(false);
        }
        catch (error) {
            setAiError(error instanceof Error
                ? error.message
                : 'OpenAI could not generate the short-answer quiz for this chapter.');
        }
        finally {
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
            const evaluation = await (0, ai_short_answer_1.evaluateShortAnswer)({
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
        }
        catch (error) {
            setAiError(error instanceof Error
                ? error.message
                : 'OpenAI could not evaluate this short-answer response.');
        }
        finally {
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
    const heroDescription = mode === 'ai'
        ? 'Generate five short-answer questions from the current chapter text, answer each in no more than three sentences, and use the same model to evaluate each response in the same session.'
        : 'Answer each question, reveal the explanation, then retry only the misses or review the wrong answers before leaving the chapter.';
    const standardSectionTitle = standardMode === 'review-missed'
        ? 'Review wrong answers'
        : showSummary
            ? standardMode === 'retry-missed'
                ? 'Retry summary'
                : 'Final score'
            : standardMode === 'retry-missed'
                ? `Retry question ${Math.min(index + 1, Math.max(questionCount, 1))} of ${questionCount}`
                : `Question ${Math.min(index + 1, Math.max(questionCount, 1))} of ${resolvedChapter.quiz.length}`;
    const sectionDescription = mode === 'ai'
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
    const standardSummaryFooter = (<react_native_1.View style={{ gap: theme.spacing.md }}>
      {summaryMissedQuestions.length ? (<>
          <react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: 15,
                lineHeight: 24,
            }}>
            {summaryMissedQuestions.length} question{summaryMissedQuestions.length === 1 ? '' : 's'} still need review.
          </react_native_1.Text>
          <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            <Button_1.Button label="Retry Missed Questions" variant="secondary" icon="refresh-outline" onPress={retryMissedQuestions} accent={accent}/>
            <Button_1.Button label="Review Wrong Answers" variant="ghost" icon="document-text-outline" onPress={reviewWrongAnswers} accent={accent}/>
          </react_native_1.View>
        </>) : (<react_native_1.Text style={{
                color: theme.colors.textSoft,
                fontFamily: theme.fonts.body,
                fontSize: 14,
                lineHeight: 22,
            }}>
          No outstanding missed-question review remains for this chapter.
        </react_native_1.Text>)}
    </react_native_1.View>);
    return (<AppShell_1.AppShell accent={accent} hero={<react_native_1.View style={{
                overflow: 'hidden',
                gap: theme.spacing.lg,
                borderRadius: theme.radius.xl,
                borderWidth: 1,
                borderColor: accent.line,
                backgroundColor: accent.heroFrom,
                padding: theme.spacing.xxl,
            }}>
          <react_native_1.Text style={{
                color: accent.accentContrast,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 1,
                textTransform: 'uppercase',
            }}>
            Quiz
          </react_native_1.Text>
          <react_native_1.Text style={{
                color: accent.accentContrast,
                fontFamily: theme.fonts.display,
                fontSize: 48,
                fontWeight: '700',
            }}>
            {chapter.title}
          </react_native_1.Text>
          <react_native_1.Text style={{
                color: 'rgba(255,255,255,0.82)',
                fontFamily: theme.fonts.body,
                fontSize: theme.typography.bodyLarge,
                lineHeight: 30,
            }}>
            {heroDescription}
          </react_native_1.Text>
          {previousResult ? (<react_native_1.Text style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                }}>
              Previous best: {(0, format_1.formatQuizScore)(previousResult.bestScore, previousResult.totalQuestions)}
            </react_native_1.Text>) : null}
        </react_native_1.View>} breadcrumbs={[
            { label: 'Home', href: (0, routes_1.homeRoute)() },
            { label: resolvedSubject.title, href: (0, routes_1.subjectRoute)(resolvedSubject.id) },
            { label: resolvedTopic.title, href: (0, routes_1.topicRoute)(resolvedSubject.id, resolvedTopic.id) },
            { label: resolvedUnit.title, href: (0, routes_1.unitRoute)(resolvedSubject.id, resolvedTopic.id, resolvedUnit.id) },
            {
                label: resolvedChapter.title,
                href: (0, routes_1.chapterRoute)(resolvedSubject.id, resolvedTopic.id, resolvedUnit.id, resolvedChapter.id),
            },
            { label: 'Quiz' },
        ]}>
      <react_native_1.View style={{ gap: theme.spacing.md }}>
        <SectionHeader_1.SectionHeader eyebrow="Assessment" title={mode === 'ai'
            ? aiShowSummary
                ? 'AI short-answer summary'
                : aiQuestions.length
                    ? `AI question ${aiIndex + 1} of ${aiQuestions.length}`
                    : 'AI short-answer quiz'
            : standardSectionTitle} description={sectionDescription} accent={accent}/>

        <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
          <Button_1.Button label="AI Short-Answer" variant={mode === 'ai' ? 'primary' : 'secondary'} icon="sparkles-outline" onPress={() => setMode('ai')} accent={accent}/>
          <Button_1.Button label="Standard Quiz" variant={mode === 'standard' ? 'primary' : 'secondary'} icon="list-outline" onPress={() => setMode('standard')} accent={accent}/>
        </react_native_1.View>

        {mode === 'ai' ? (<>
            <react_native_1.View style={{
                gap: theme.spacing.md,
                borderRadius: theme.radius.xl,
                borderWidth: 1,
                borderColor: accent.line,
                backgroundColor: theme.colors.surfaceElevated,
                padding: theme.spacing.xl,
            }}>
              <react_native_1.View style={{ gap: theme.spacing.xs }}>
                <react_native_1.Text style={{
                color: accent.accent ?? theme.colors.teal,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 1,
                textTransform: 'uppercase',
            }}>
                  OpenAI setup
                </react_native_1.Text>
                <react_native_1.Text style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.display,
                fontSize: 30,
                fontWeight: '700',
                lineHeight: 36,
            }}>
                  Enable model-curated short-answer questions
                </react_native_1.Text>
                <react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: theme.typography.body,
                lineHeight: 24,
            }}>
                  Enter an OpenAI API key to generate five short-answer prompts from this chapter
                  and grade each response. Answers are designed to stay within three sentences.
                  The current app sends the request directly from the client, so use this only
                  for personal testing.
                </react_native_1.Text>
              </react_native_1.View>

              <react_native_1.View style={{
                gap: theme.spacing.sm,
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: accent.line,
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
                  OpenAI API key
                </react_native_1.Text>
                <react_native_1.TextInput value={apiKeyDraft} onChangeText={setApiKeyDraft} placeholder="Enter your OpenAI API key" placeholderTextColor={theme.colors.textSoft} autoCapitalize="none" autoCorrect={false} secureTextEntry style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.body,
                fontSize: theme.typography.body,
                paddingVertical: 4,
            }}/>
              </react_native_1.View>

              <react_native_1.Text style={{
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
              </react_native_1.Text>

              <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
                <Button_1.Button label={isSavingApiKey ? 'Saving Key' : 'Save Key Locally'} variant="secondary" icon="key-outline" onPress={handleSaveApiKey} disabled={!apiKeyDraft.trim() || isSavingApiKey} accent={accent}/>
                <Button_1.Button label={isGeneratingAiQuiz
                ? 'Generating Quiz'
                : aiQuestions.length
                    ? 'Regenerate 5 Questions'
                    : 'Generate 5 Questions'} icon="sparkles-outline" onPress={handleGenerateAiQuiz} disabled={!providedApiKey || isGeneratingAiQuiz} accent={accent}/>
                {storedApiKey ? (<Button_1.Button label="Clear Saved Key" variant="ghost" icon="trash-outline" onPress={handleClearApiKey} accent={accent}/>) : null}
              </react_native_1.View>
            </react_native_1.View>

            {aiError ? (<react_native_1.View style={{
                    borderRadius: theme.radius.lg,
                    borderWidth: 1,
                    borderColor: theme.colors.danger,
                    backgroundColor: theme.colors.surfaceElevated,
                    padding: theme.spacing.lg,
                }}>
                <react_native_1.Text style={{
                    color: theme.colors.danger,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                }}>
                  {aiError}
                </react_native_1.Text>
              </react_native_1.View>) : null}

            {isGeneratingAiQuiz ? (<react_native_1.View style={{
                    alignItems: 'center',
                    gap: theme.spacing.md,
                    borderRadius: theme.radius.xl,
                    borderWidth: 1,
                    borderColor: accent.line,
                    backgroundColor: theme.colors.surfaceElevated,
                    padding: theme.spacing.xxl,
                }}>
                <react_native_1.ActivityIndicator size="small" color={accent.accent}/>
                <react_native_1.Text style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                    textAlign: 'center',
                }}>
                  Building five short-answer prompts from this chapter text.
                </react_native_1.Text>
              </react_native_1.View>) : aiShowSummary ? (<ScoreSummary_1.ScoreSummary score={aiScore} total={aiQuestions.length} bestScore={Math.max(previousResult?.bestScore ?? 0, aiScore)} onRetry={retryAiQuiz} accent={accent}/>) : aiQuestions.length ? (<>
                <ShortAnswerQuizCard_1.ShortAnswerQuizCard question={currentAiQuestion} answer={currentAiResponse?.answer ?? aiAnswer} onChangeAnswer={setAiAnswer} evaluation={currentAiResponse?.evaluation} isSubmitting={isEvaluatingAiAnswer} accent={accent}/>
                <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
                  <Button_1.Button label={currentAiResponse
                    ? aiIndex === aiQuestions.length - 1
                        ? 'Finish Quiz'
                        : 'Next Question'
                    : isEvaluatingAiAnswer
                        ? 'Evaluating Answer'
                        : 'Evaluate Answer'} icon={currentAiResponse ? 'arrow-forward-outline' : 'sparkles-outline'} onPress={currentAiResponse ? handleNextAiQuestion : handleEvaluateAiAnswer} disabled={currentAiResponse ? false : !aiAnswer.trim() || isEvaluatingAiAnswer} style={{ flex: 1 }} accent={accent}/>
                  <Button_1.Button label="New AI Session" variant="ghost" icon="refresh-outline" onPress={resetAiSession} style={{ flex: 1 }} accent={accent}/>
                </react_native_1.View>
              </>) : (<react_native_1.View style={{
                    gap: theme.spacing.sm,
                    borderRadius: theme.radius.xl,
                    borderWidth: 1,
                    borderColor: accent.line,
                    backgroundColor: theme.colors.surfaceElevated,
                    padding: theme.spacing.xl,
                }}>
                <react_native_1.Text style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.display,
                    fontSize: 30,
                    fontWeight: '700',
                }}>
                  No AI quiz session yet
                </react_native_1.Text>
                <react_native_1.Text style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                }}>
                  Generate five short-answer questions from this chapter to start the AI-guided
                  assessment. Each answer is intended to stay within three sentences. The
                  standard chapter quiz remains available below if you want the local offline
                  flow instead.
                </react_native_1.Text>
              </react_native_1.View>)}
          </>) : standardMode === 'review-missed' ? (<react_native_1.View style={{ gap: theme.spacing.md }}>
            {reviewQuestions.map(({ missedQuestion, question: reviewQuestion }, reviewIndex) => (<react_native_1.View key={reviewQuestion.id} style={{
                    gap: theme.spacing.md,
                    borderRadius: theme.radius.xl,
                    borderWidth: 1,
                    borderColor: accent.line,
                    backgroundColor: theme.colors.surfaceElevated,
                    padding: theme.spacing.xl,
                }}>
                <react_native_1.Text style={{
                    color: accent.accent,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                }}>
                  Review {reviewIndex + 1}
                </react_native_1.Text>
                <react_native_1.Text style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.display,
                    fontSize: 30,
                    fontWeight: '700',
                    lineHeight: 36,
                }}>
                  {reviewQuestion.prompt}
                </react_native_1.Text>
                <react_native_1.View style={{
                    gap: theme.spacing.xs,
                    borderRadius: theme.radius.lg,
                    borderWidth: 1,
                    borderColor: theme.colors.danger,
                    backgroundColor: theme.colors.surfaceOverlay,
                    padding: theme.spacing.lg,
                }}>
                  <react_native_1.Text style={{
                    color: theme.colors.danger,
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                }}>
                    Your answer
                  </react_native_1.Text>
                  <react_native_1.Text style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                }}>
                    {optionText(reviewQuestion, missedQuestion.selectedOptionId)}
                  </react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{
                    gap: theme.spacing.xs,
                    borderRadius: theme.radius.lg,
                    borderWidth: 1,
                    borderColor: accent.line,
                    backgroundColor: accent.panel,
                    padding: theme.spacing.lg,
                }}>
                  <react_native_1.Text style={{
                    color: accent.accent,
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                }}>
                    Correct answer
                  </react_native_1.Text>
                  <react_native_1.Text style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                }}>
                    {optionText(reviewQuestion, missedQuestion.correctOptionId)}
                  </react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{
                    gap: theme.spacing.xs,
                    borderRadius: theme.radius.lg,
                    borderWidth: 1,
                    borderColor: accent.line,
                    backgroundColor: theme.colors.surfaceOverlay,
                    padding: theme.spacing.lg,
                }}>
                  <react_native_1.Text style={{
                    color: accent.accentStrong,
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                }}>
                    Explanation
                  </react_native_1.Text>
                  <react_native_1.Text style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.reading,
                    fontSize: theme.typography.bodyLarge,
                    lineHeight: 28,
                }}>
                    {reviewQuestion.explanation}
                  </react_native_1.Text>
                </react_native_1.View>
              </react_native_1.View>))}
            <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
              {summaryMissedQuestions.length ? (<Button_1.Button label="Retry Missed Questions" icon="refresh-outline" onPress={retryMissedQuestions} accent={accent}/>) : null}
              <Button_1.Button label="Restart Full Quiz" variant="secondary" icon="list-outline" onPress={restartFullQuiz} accent={accent}/>
            </react_native_1.View>
          </react_native_1.View>) : showSummary ? (<ScoreSummary_1.ScoreSummary score={standardMode === 'retry-missed' ? correctedRetryScore : score} total={resolvedChapter.quiz.length} bestScore={Math.max(previousResult?.bestScore ?? 0, standardMode === 'retry-missed' ? correctedRetryScore : score)} onRetry={restartFullQuiz} retryLabel="Retry Full Quiz" footer={standardSummaryFooter} accent={accent}/>) : standardQuestions.length === 0 ? (<react_native_1.View style={{
                gap: theme.spacing.sm,
                borderRadius: theme.radius.xl,
                borderWidth: 1,
                borderColor: accent.line,
                backgroundColor: theme.colors.surfaceElevated,
                padding: theme.spacing.xl,
            }}>
            <react_native_1.Text style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.display,
                fontSize: 30,
                fontWeight: '700',
            }}>
              No retry set is available
            </react_native_1.Text>
            <react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: theme.typography.body,
                lineHeight: 24,
            }}>
              This chapter does not currently have missed questions saved for retry. Start the full
              quiz to create a fresh review set.
            </react_native_1.Text>
            <Button_1.Button label="Start Full Quiz" icon="list-outline" onPress={restartFullQuiz} accent={accent}/>
          </react_native_1.View>) : (<>
            {persistedMissedQuestions.length > 0 &&
                standardMode === 'full' &&
                index === 0 &&
                !revealed &&
                !Object.keys(answers).length ? (<react_native_1.View style={{
                    gap: theme.spacing.md,
                    borderRadius: theme.radius.xl,
                    borderWidth: 1,
                    borderColor: accent.line,
                    backgroundColor: theme.colors.surfaceElevated,
                    padding: theme.spacing.xl,
                }}>
                <react_native_1.Text style={{
                    color: accent.accent,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                }}>
                  Pending review
                </react_native_1.Text>
                <react_native_1.Text style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.display,
                    fontSize: 28,
                    fontWeight: '700',
                    lineHeight: 34,
                }}>
                  {persistedMissedQuestions.length} missed question{persistedMissedQuestions.length === 1 ? '' : 's'} saved locally
                </react_native_1.Text>
                <react_native_1.Text style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                    fontSize: theme.typography.body,
                    lineHeight: 24,
                }}>
                  You can jump straight into the missed-question retry set or review the wrong
                  answers before starting the full quiz again.
                </react_native_1.Text>
                <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
                  <Button_1.Button label="Retry Missed Questions" variant="secondary" icon="refresh-outline" onPress={retryMissedQuestions} accent={accent}/>
                  <Button_1.Button label="Review Wrong Answers" variant="ghost" icon="document-text-outline" onPress={reviewWrongAnswers} accent={accent}/>
                </react_native_1.View>
              </react_native_1.View>) : null}

            {question ? (<QuizCard_1.QuizCard question={question} selectedOptionId={selectedOptionId} revealed={revealed} onSelect={setSelectedOptionId} accent={accent}/>) : null}
            <react_native_1.View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
              <Button_1.Button label={revealed
                ? index === questionCount - 1
                    ? 'Finish Quiz'
                    : 'Next Question'
                : 'Reveal Answer'} icon={revealed ? 'arrow-forward-outline' : 'checkmark-done-outline'} onPress={revealed ? goNext : revealAnswer} disabled={!selectedOptionId} style={{ flex: 1 }} accent={accent}/>
              <Button_1.Button label={standardMode === 'retry-missed' ? 'Restart Retry' : 'Restart'} variant="ghost" icon="refresh-outline" onPress={() => standardMode === 'retry-missed' ? retryMissedQuestions() : restartFullQuiz()} style={{ flex: 1 }} accent={accent}/>
            </react_native_1.View>
          </>)}
      </react_native_1.View>
    </AppShell_1.AppShell>);
}
