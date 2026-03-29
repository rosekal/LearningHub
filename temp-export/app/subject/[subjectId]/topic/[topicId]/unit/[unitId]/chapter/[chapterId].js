"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaticParams = generateStaticParams;
exports.default = ChapterScreen;
const react_1 = require("react");
const expo_router_1 = require("expo-router");
const react_native_1 = require("react-native");
const AppShell_1 = require("@/components/AppShell");
const BookmarkButton_1 = require("@/components/BookmarkButton");
const Button_1 = require("@/components/Button");
const FigureBlock_1 = require("@/components/FigureBlock");
const ProgressBadge_1 = require("@/components/ProgressBadge");
const ResponsiveLayout_1 = require("@/components/ResponsiveLayout");
const SectionHeader_1 = require("@/components/SectionHeader");
const catalog_1 = require("@/content/catalog");
const selectors_1 = require("@/features/learning/selectors");
const use_element_accent_1 = require("@/hooks/use-element-accent");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
const use_study_1 = require("@/hooks/use-study");
const routes_1 = require("@/utils/routes");
const static_params_1 = require("@/utils/static-params");
const format_1 = require("@/utils/format");
const responsive_1 = require("@/utils/responsive");
function generateStaticParams() {
    return (0, static_params_1.getChapterStaticParams)();
}
function ChapterScreen() {
    const { subjectId, topicId, unitId, chapterId } = (0, expo_router_1.useLocalSearchParams)();
    const subject = (0, catalog_1.getSubjectById)(subjectId);
    const topic = (0, catalog_1.getTopicById)(subjectId, topicId);
    const unit = (0, catalog_1.getUnitById)(subjectId, topicId, unitId);
    const chapter = (0, catalog_1.getChapterById)(subjectId, topicId, unitId, chapterId);
    const theme = (0, use_app_theme_1.useAppTheme)();
    const accent = (0, use_element_accent_1.useElementAccent)(unit?.id);
    const { width, isDesktop, isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    const router = (0, expo_router_1.useRouter)();
    const { progress, markChapterComplete, setLastVisited } = (0, use_study_1.useStudy)();
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
    if (!subject || !topic || !unit || !chapter) {
        return (<AppShell_1.AppShell>
        <react_native_1.Text style={{ color: theme.colors.text }}>Chapter not found.</react_native_1.Text>
      </AppShell_1.AppShell>);
    }
    const completed = (0, selectors_1.isChapterComplete)(progress, unit.id, chapter.id);
    const bookmarked = (0, selectors_1.isChapterBookmarked)(progress, unit.id, chapter.id);
    const result = (0, selectors_1.getQuizResult)(progress, unit.id, chapter.id);
    const reviewState = (0, selectors_1.getQuizReviewState)(progress, unit.id, chapter.id);
    const mastery = (0, selectors_1.getChapterMasteryStatus)(progress, unit, chapter);
    const needsReview = (reviewState?.missedQuestions.length ?? 0) > 0;
    const currentChapterIndex = Math.max(0, unit.chapters.findIndex((candidate) => candidate.id === chapter.id));
    const previousChapter = currentChapterIndex > 0 ? unit.chapters[currentChapterIndex - 1] : undefined;
    const nextChapter = currentChapterIndex < unit.chapters.length - 1 ? unit.chapters[currentChapterIndex + 1] : undefined;
    const unitPositionPercent = completed ? 100 : ((currentChapterIndex + 1) / unit.chapters.length) * 100;
    const proseSurface = isTablet ? theme.colors.surfaceElevated : accent.panel;
    const compact = !isTablet;
    const heroPadding = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: theme.spacing.lg,
        maxValue: theme.spacing.xxl,
        minWidth: 320,
        maxWidth: 1100,
    }));
    const heroTitleSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: 32,
        maxValue: 52,
        minWidth: 320,
        maxWidth: 1100,
    }));
    const heroOverviewSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: 18,
        maxValue: 22,
        minWidth: 320,
        maxWidth: 1100,
    }));
    const chapterStateSummary = needsReview
        ? 'Quiz review is still outstanding for this chapter.'
        : mastery.quizPassed
            ? 'Quiz passed and ready for spaced review later.'
            : completed
                ? 'Reading completed. The quiz still needs a passing result.'
                : mastery.opened
                    ? 'In progress and ready to continue.'
                    : 'Not started yet.';
    const sidebar = (<react_native_1.View style={{ gap: theme.spacing.lg }}>
      <react_native_1.View style={{
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
          Study controls
        </react_native_1.Text>
        <ProgressBadge_1.ProgressBadge percentage={unitPositionPercent} detail={`Chapter ${currentChapterIndex + 1} of ${unit.chapters.length}${completed ? ' • marked complete' : ''}`} accent={accent}/>
        <BookmarkButton_1.BookmarkButton unitId={unit.id} chapterId={chapter.id}/>
        <Button_1.Button label={completed ? 'Completed' : 'Mark Complete'} icon={completed ? 'checkmark-circle-outline' : 'checkmark-outline'} onPress={() => markChapterComplete(unit.id, chapter.id)} variant={completed ? 'secondary' : 'primary'} accent={accent}/>
        <Button_1.Button label="Open Flashcards" icon="albums-outline" variant="secondary" onPress={() => router.push((0, routes_1.flashcardsRoute)(subject.id, topic.id, unit.id, chapter.id))} accent={accent}/>
        <Button_1.Button label="Open Quiz" icon="help-circle-outline" variant="ghost" onPress={() => router.push((0, routes_1.quizRoute)(subject.id, topic.id, unit.id, chapter.id))} accent={accent}/>
        {needsReview ? (<react_native_1.Text style={{
                color: theme.colors.textSoft,
                fontFamily: theme.fonts.body,
                fontSize: 14,
                lineHeight: 22,
            }}>
            Retry the missed questions or review the wrong answers from the quiz screen to clear the review state.
          </react_native_1.Text>) : null}
      </react_native_1.View>

      <react_native_1.View style={{
            gap: theme.spacing.sm,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: accent.panel,
            padding: theme.spacing.xl,
        }}>
        <react_native_1.Text style={{
            color: accent.accentStrong,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
          Chapter state
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.reading,
            fontSize: 18,
            lineHeight: 28,
        }}>
          {chapterStateSummary}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 14,
            lineHeight: 22,
        }}>
          {bookmarked ? 'Bookmarked for quick return.' : 'Bookmark this chapter to return quickly later.'}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 14,
            lineHeight: 22,
        }}>
          {mastery.reviewedFlashcards > 0
            ? `${mastery.reviewedFlashcards} of ${mastery.totalFlashcards} flashcards reviewed locally.`
            : 'Flashcards not reviewed yet.'}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: 14,
            lineHeight: 22,
        }}>
          {result
            ? `Best quiz score: ${(0, format_1.formatQuizScore)(result.bestScore, result.totalQuestions)}${needsReview ? ' • review still pending' : ''}`
            : 'Quiz not taken yet'}
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={{
            gap: theme.spacing.sm,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surfaceElevated,
            padding: theme.spacing.xl,
        }}>
        <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 24,
            fontWeight: '700',
        }}>
          Table of contents
        </react_native_1.Text>
        {unit.chapters.map((entry, index) => {
            const entryCompleted = (0, selectors_1.isChapterComplete)(progress, unit.id, entry.id);
            const active = entry.id === chapter.id;
            return (<react_native_1.Pressable key={entry.id} accessibilityRole="button" onPress={() => router.push((0, routes_1.chapterRoute)(subject.id, topic.id, unit.id, entry.id))} style={({ hovered, pressed }) => ({
                    gap: 4,
                    borderRadius: theme.radius.lg,
                    borderWidth: 1,
                    borderColor: active ? accent.line : theme.colors.border,
                    backgroundColor: active ? accent.panel : theme.colors.surface,
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: theme.spacing.sm,
                    opacity: pressed ? 0.92 : 1,
                    transform: [{ translateY: hovered ? -1 : 0 }],
                })}>
              <react_native_1.Text style={{
                    color: active ? accent.accent : theme.colors.textSoft,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 0.7,
                    textTransform: 'uppercase',
                }}>
                Chapter {index + 1}
              </react_native_1.Text>
              <react_native_1.Text style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: 14,
                    fontWeight: active ? '700' : '600',
                    lineHeight: 22,
                }}>
                {entry.title}
              </react_native_1.Text>
              <react_native_1.Text style={{
                    color: active ? accent.accentStrong : theme.colors.textSoft,
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                }}>
                {active ? 'Current chapter' : entryCompleted ? 'Completed' : (0, format_1.formatReadingTime)(entry.estimatedMinutes)}
              </react_native_1.Text>
            </react_native_1.Pressable>);
        })}
      </react_native_1.View>
    </react_native_1.View>);
    const hero = (<react_native_1.View style={{
            overflow: 'hidden',
            gap: theme.spacing.lg,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: accent.heroFrom,
            padding: heroPadding,
        }}>
      <react_native_1.View style={{
            position: 'absolute',
            right: -30,
            top: -20,
            width: 220,
            height: 220,
            borderRadius: 110,
            backgroundColor: accent.glow,
        }}/>
      <react_native_1.Text style={{
            color: accent.accentContrast,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
        Chapter {currentChapterIndex + 1}
      </react_native_1.Text>
      <react_native_1.Text style={{
            color: accent.accentContrast,
            fontFamily: theme.fonts.display,
            fontSize: heroTitleSize,
            fontWeight: '700',
            lineHeight: Math.round(heroTitleSize * 1.1),
        }}>
        {chapter.title}
      </react_native_1.Text>
      <react_native_1.Text style={{
            maxWidth: compact ? '100%' : 860,
            color: 'rgba(255,255,255,0.82)',
            fontFamily: theme.fonts.reading,
            fontSize: heroOverviewSize,
            lineHeight: heroOverviewSize >= 20 ? 34 : 30,
        }}>
        {chapter.overview}
      </react_native_1.Text>
      <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
        {[(0, format_1.formatReadingTime)(chapter.estimatedMinutes), `${chapter.flashcards.length} flashcards`, `${chapter.quiz.length} questions`].map((item) => (<react_native_1.View key={item} style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.18)',
                backgroundColor: 'rgba(255,255,255,0.06)',
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
                maxWidth: '100%',
            }}>
              <react_native_1.Text style={{
                color: accent.accentContrast,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.7,
                flexShrink: 1,
                lineHeight: 18,
                textTransform: 'uppercase',
            }}>
                {item}
              </react_native_1.Text>
            </react_native_1.View>))}
      </react_native_1.View>
    </react_native_1.View>);
    return (<AppShell_1.AppShell hero={hero} accent={accent} breadcrumbs={[
            { label: 'Home', href: (0, routes_1.homeRoute)() },
            { label: subject.title, href: (0, routes_1.subjectRoute)(subject.id) },
            { label: topic.title, href: (0, routes_1.topicRoute)(subject.id, topic.id) },
            { label: unit.title, href: (0, routes_1.unitRoute)(subject.id, topic.id, unit.id) },
            { label: chapter.title },
        ]}>
      <ResponsiveLayout_1.ResponsiveLayout sidebar={sidebar} sidebarPosition="start" sidebarWidth={336} mobileSidebarPosition="before">
        <react_native_1.View style={{
            width: '100%',
            maxWidth: 860,
            alignSelf: 'center',
            gap: theme.spacing.xl,
        }}>
          <SectionHeader_1.SectionHeader eyebrow="Reading" title="Digital textbook layout" description="Structured local blocks render as long-form reading, preserving a comfortable measure, clear hierarchy, and adjacent study actions." accent={accent}/>

          <react_native_1.View style={{
            gap: theme.spacing.md,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: accent.panel,
            padding: theme.spacing.xl,
        }}>
            <react_native_1.Text style={{
            color: accent.accentStrong,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
              Chapter abstract
            </react_native_1.Text>
            <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.reading,
            fontSize: compact ? 20 : 22,
            lineHeight: compact ? 32 : 36,
        }}>
              {chapter.overview}
            </react_native_1.Text>
          </react_native_1.View>

          <react_native_1.View style={{
            gap: theme.spacing.xl,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: proseSurface,
            padding: isTablet ? theme.spacing.xxl : theme.spacing.xl,
            ...(isTablet ? theme.shadow.light : {}),
        }}>
            {chapter.blocks.map((block) => {
            if (block.type === 'paragraph') {
                return (<react_native_1.Text key={block.id} style={{
                        color: theme.colors.text,
                        fontFamily: theme.fonts.reading,
                        fontSize: isDesktop ? 20 : 19,
                        lineHeight: isDesktop ? 38 : 34,
                    }}>
                    {block.text}
                  </react_native_1.Text>);
            }
            if (block.type === 'bullet-list') {
                return (<react_native_1.View key={block.id} style={{
                        gap: theme.spacing.md,
                        borderRadius: theme.radius.xl,
                        borderWidth: 1,
                        borderColor: accent.line,
                        backgroundColor: theme.colors.surfaceElevated,
                        padding: theme.spacing.xl,
                    }}>
                    {block.title ? (<react_native_1.Text style={{
                            color: theme.colors.text,
                            fontFamily: theme.fonts.display,
                            fontSize: 30,
                            fontWeight: '700',
                        }}>
                        {block.title}
                      </react_native_1.Text>) : null}
                    {block.items.map((item) => (<react_native_1.View key={item} style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                        <react_native_1.Text style={{
                            color: accent.accent,
                            fontFamily: theme.fonts.mono,
                            fontSize: 16,
                            lineHeight: 30,
                        }}>
                          •
                        </react_native_1.Text>
                        <react_native_1.Text style={{
                            flex: 1,
                            color: theme.colors.text,
                            fontFamily: theme.fonts.reading,
                            fontSize: 18,
                            lineHeight: 30,
                        }}>
                          {item}
                        </react_native_1.Text>
                      </react_native_1.View>))}
                  </react_native_1.View>);
            }
            if (block.type === 'equation') {
                return (<react_native_1.View key={block.id} style={{
                        gap: theme.spacing.md,
                        borderRadius: theme.radius.xl,
                        borderWidth: 1,
                        borderColor: accent.line,
                        backgroundColor: theme.colors.surfaceElevated,
                        padding: theme.spacing.xl,
                    }}>
                    {block.title ? (<react_native_1.Text style={{
                            color: theme.colors.text,
                            fontFamily: theme.fonts.display,
                            fontSize: 26,
                            fontWeight: '700',
                        }}>
                        {block.title}
                      </react_native_1.Text>) : null}
                    <react_native_1.Text style={{
                        color: accent.accentStrong,
                        fontFamily: theme.fonts.mono,
                        fontSize: 18,
                        lineHeight: 28,
                    }}>
                      {block.expression}
                    </react_native_1.Text>
                    {block.explanation ? (<react_native_1.Text style={{
                            color: theme.colors.textMuted,
                            fontFamily: theme.fonts.body,
                            fontSize: 16,
                            lineHeight: 26,
                        }}>
                        {block.explanation}
                      </react_native_1.Text>) : null}
                  </react_native_1.View>);
            }
            if (block.type === 'table') {
                return (<react_native_1.View key={block.id} style={{
                        gap: theme.spacing.md,
                        borderRadius: theme.radius.xl,
                        borderWidth: 1,
                        borderColor: accent.line,
                        backgroundColor: theme.colors.surfaceElevated,
                        padding: theme.spacing.xl,
                    }}>
                    {block.title ? (<react_native_1.Text style={{
                            color: theme.colors.text,
                            fontFamily: theme.fonts.display,
                            fontSize: 26,
                            fontWeight: '700',
                        }}>
                        {block.title}
                      </react_native_1.Text>) : null}
                    <react_native_1.View style={{ gap: theme.spacing.xs }}>
                      <react_native_1.View style={{
                        flexDirection: 'row',
                        gap: theme.spacing.sm,
                        borderBottomWidth: 1,
                        borderBottomColor: accent.line,
                        paddingBottom: theme.spacing.sm,
                    }}>
                        {block.columns.map((column) => (<react_native_1.Text key={column} style={{
                            flex: 1,
                            color: accent.accentStrong,
                            fontFamily: theme.fonts.mono,
                            fontSize: 12,
                            fontWeight: '700',
                            letterSpacing: 0.8,
                            textTransform: 'uppercase',
                        }}>
                            {column}
                          </react_native_1.Text>))}
                      </react_native_1.View>
                      {block.rows.map((row, rowIndex) => (<react_native_1.View key={`${block.id}-row-${rowIndex}`} style={{
                            flexDirection: 'row',
                            gap: theme.spacing.sm,
                            paddingVertical: theme.spacing.sm,
                            borderBottomWidth: rowIndex === block.rows.length - 1 ? 0 : 1,
                            borderBottomColor: theme.colors.border,
                        }}>
                          {row.map((value, valueIndex) => (<react_native_1.Text key={`${block.id}-cell-${rowIndex}-${valueIndex}`} style={{
                                flex: 1,
                                color: theme.colors.text,
                                fontFamily: theme.fonts.body,
                                fontSize: 15,
                                lineHeight: 24,
                            }}>
                              {value}
                            </react_native_1.Text>))}
                        </react_native_1.View>))}
                    </react_native_1.View>
                    {block.note ? (<react_native_1.Text style={{
                            color: theme.colors.textSoft,
                            fontFamily: theme.fonts.body,
                            fontSize: 14,
                            lineHeight: 22,
                        }}>
                        {block.note}
                      </react_native_1.Text>) : null}
                  </react_native_1.View>);
            }
            if (block.type === 'worked-example') {
                return (<react_native_1.View key={block.id} style={{
                        gap: theme.spacing.md,
                        borderRadius: theme.radius.xl,
                        borderWidth: 1,
                        borderColor: accent.line,
                        backgroundColor: theme.colors.surfaceElevated,
                        padding: theme.spacing.xl,
                    }}>
                    <react_native_1.Text style={{
                        color: theme.colors.text,
                        fontFamily: theme.fonts.display,
                        fontSize: 28,
                        fontWeight: '700',
                    }}>
                      {block.title}
                    </react_native_1.Text>
                    <react_native_1.Text style={{
                        color: theme.colors.text,
                        fontFamily: theme.fonts.reading,
                        fontSize: 18,
                        lineHeight: 30,
                    }}>
                      {block.prompt}
                    </react_native_1.Text>
                    {block.steps.map((step, stepIndex) => (<react_native_1.View key={`${block.id}-step-${stepIndex}`} style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                        <react_native_1.Text style={{
                            color: accent.accent,
                            fontFamily: theme.fonts.mono,
                            fontSize: 12,
                            fontWeight: '700',
                            letterSpacing: 0.8,
                            textTransform: 'uppercase',
                            lineHeight: 24,
                        }}>
                          Step {stepIndex + 1}
                        </react_native_1.Text>
                        <react_native_1.Text style={{
                            flex: 1,
                            color: theme.colors.textMuted,
                            fontFamily: theme.fonts.body,
                            fontSize: 16,
                            lineHeight: 24,
                        }}>
                          {step}
                        </react_native_1.Text>
                      </react_native_1.View>))}
                    {block.takeaway ? (<react_native_1.Text style={{
                            color: accent.accentStrong,
                            fontFamily: theme.fonts.body,
                            fontSize: 15,
                            lineHeight: 24,
                        }}>
                        {block.takeaway}
                      </react_native_1.Text>) : null}
                  </react_native_1.View>);
            }
            if (block.type === 'exercise-set') {
                return (<react_native_1.View key={block.id} style={{
                        gap: theme.spacing.md,
                        borderRadius: theme.radius.xl,
                        borderWidth: 1,
                        borderColor: accent.line,
                        backgroundColor: theme.colors.surfaceElevated,
                        padding: theme.spacing.xl,
                    }}>
                    <react_native_1.Text style={{
                        color: theme.colors.text,
                        fontFamily: theme.fonts.display,
                        fontSize: 28,
                        fontWeight: '700',
                    }}>
                      {block.title}
                    </react_native_1.Text>
                    <react_native_1.Text style={{
                        color: theme.colors.textMuted,
                        fontFamily: theme.fonts.body,
                        fontSize: 16,
                        lineHeight: 24,
                    }}>
                      {block.instructions}
                    </react_native_1.Text>
                    {block.questions.map((item, itemIndex) => (<react_native_1.View key={`${block.id}-question-${itemIndex}`} style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                        <react_native_1.Text style={{
                            color: accent.accent,
                            fontFamily: theme.fonts.mono,
                            fontSize: 12,
                            fontWeight: '700',
                            letterSpacing: 0.8,
                            textTransform: 'uppercase',
                            lineHeight: 24,
                        }}>
                          {itemIndex + 1}
                        </react_native_1.Text>
                        <react_native_1.Text style={{
                            flex: 1,
                            color: theme.colors.text,
                            fontFamily: theme.fonts.reading,
                            fontSize: 17,
                            lineHeight: 28,
                        }}>
                          {item}
                        </react_native_1.Text>
                      </react_native_1.View>))}
                  </react_native_1.View>);
            }
            return <FigureBlock_1.FigureBlock key={block.id} block={block} accent={accent}/>;
        })}
          </react_native_1.View>

          {chapter.references?.length ? (<react_native_1.View style={{
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
                References
              </react_native_1.Text>
              {chapter.references.map((reference) => (<react_native_1.View key={`${reference.title}-${reference.detail ?? ''}`} style={{ gap: 2 }}>
                  <react_native_1.Text style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                    fontSize: 16,
                    fontWeight: '600',
                    lineHeight: 24,
                }}>
                    {reference.title}
                  </react_native_1.Text>
                  {reference.detail ? (<react_native_1.Text style={{
                        color: theme.colors.textMuted,
                        fontFamily: theme.fonts.body,
                        fontSize: 14,
                        lineHeight: 22,
                    }}>
                      {reference.detail}
                    </react_native_1.Text>) : null}
                </react_native_1.View>))}
            </react_native_1.View>) : null}

          <react_native_1.View style={{
            flexDirection: isDesktop ? 'row' : 'column',
            gap: theme.spacing.md,
            paddingTop: theme.spacing.sm,
        }}>
            {previousChapter ? (<react_native_1.View style={{ flex: 1 }}>
                <Button_1.Button label={`Previous: ${previousChapter.title}`} icon="arrow-back-outline" variant="secondary" style={{ width: '100%' }} onPress={() => router.push((0, routes_1.chapterRoute)(subject.id, topic.id, unit.id, previousChapter.id))} accent={accent}/>
              </react_native_1.View>) : null}
            {nextChapter ? (<react_native_1.View style={{ flex: 1 }}>
                <Button_1.Button label={`Next: ${nextChapter.title}`} icon="arrow-forward-outline" style={{ width: '100%' }} onPress={() => router.push((0, routes_1.chapterRoute)(subject.id, topic.id, unit.id, nextChapter.id))} accent={accent}/>
              </react_native_1.View>) : null}
          </react_native_1.View>
        </react_native_1.View>
      </ResponsiveLayout_1.ResponsiveLayout>
    </AppShell_1.AppShell>);
}
