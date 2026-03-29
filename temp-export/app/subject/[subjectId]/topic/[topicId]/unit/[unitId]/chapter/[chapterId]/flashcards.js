"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaticParams = generateStaticParams;
exports.default = FlashcardsScreen;
const react_1 = require("react");
const expo_router_1 = require("expo-router");
const react_native_1 = require("react-native");
const AppShell_1 = require("@/components/AppShell");
const FlashcardDeck_1 = require("@/components/FlashcardDeck");
const SectionHeader_1 = require("@/components/SectionHeader");
const catalog_1 = require("@/content/catalog");
const selectors_1 = require("@/features/learning/selectors");
const use_element_accent_1 = require("@/hooks/use-element-accent");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_study_1 = require("@/hooks/use-study");
const routes_1 = require("@/utils/routes");
const static_params_1 = require("@/utils/static-params");
function generateStaticParams() {
    return (0, static_params_1.getChapterStaticParams)();
}
function FlashcardsScreen() {
    const { subjectId, topicId, unitId, chapterId } = (0, expo_router_1.useLocalSearchParams)();
    const subject = (0, catalog_1.getSubjectById)(subjectId);
    const topic = (0, catalog_1.getTopicById)(subjectId, topicId);
    const unit = (0, catalog_1.getUnitById)(subjectId, topicId, unitId);
    const chapter = (0, catalog_1.getChapterById)(subjectId, topicId, unitId, chapterId);
    const theme = (0, use_app_theme_1.useAppTheme)();
    const accent = (0, use_element_accent_1.useElementAccent)(unit?.id);
    const { progress, markFlashcardReviewed, setFlashcardConfidence, setLastVisited } = (0, use_study_1.useStudy)();
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
        <react_native_1.Text style={{ color: theme.colors.text }}>Flashcard deck not found.</react_native_1.Text>
      </AppShell_1.AppShell>);
    }
    const reviewedCount = progress.reviewedFlashcards[(0, selectors_1.chapterKey)(unit.id, chapter.id)]?.length ?? 0;
    const confidenceSummary = (0, selectors_1.getFlashcardConfidenceSummary)(progress, unit.id, chapter.id);
    return (<AppShell_1.AppShell accent={accent} hero={<react_native_1.View style={{
                overflow: 'hidden',
                gap: theme.spacing.lg,
                borderRadius: theme.radius.xl,
                borderWidth: 1,
                borderColor: accent.line,
                backgroundColor: accent.heroFrom,
                padding: theme.spacing.xxl,
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
            Flashcards
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
            Review the chapter as a study deck. Cards are marked as reviewed when you flip them,
            and you can rate each one as easy, unsure, or hard to build a future review signal.
          </react_native_1.Text>
          <react_native_1.Text style={{
                color: 'rgba(255,255,255,0.72)',
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
            }}>
            {confidenceSummary.easy} easy • {confidenceSummary.unsure} unsure • {confidenceSummary.hard} hard
          </react_native_1.Text>
        </react_native_1.View>} breadcrumbs={[
            { label: 'Home', href: (0, routes_1.homeRoute)() },
            { label: subject.title, href: (0, routes_1.subjectRoute)(subject.id) },
            { label: topic.title, href: (0, routes_1.topicRoute)(subject.id, topic.id) },
            { label: unit.title, href: (0, routes_1.unitRoute)(subject.id, topic.id, unit.id) },
            { label: chapter.title, href: (0, routes_1.chapterRoute)(subject.id, topic.id, unit.id, chapter.id) },
            { label: 'Flashcards' },
        ]}>
      <react_native_1.View style={{ gap: theme.spacing.md }}>
        <SectionHeader_1.SectionHeader eyebrow="Deck" title="Retrieval practice" description="Use the deck as a compact study instrument for definitions, structure, properties, and major applications from the current chapter." accent={accent}/>
        <FlashcardDeck_1.FlashcardDeck cards={chapter.flashcards} reviewedCount={reviewedCount} onReview={(flashcardId) => markFlashcardReviewed(unit.id, chapter.id, flashcardId)} getConfidence={(flashcardId) => progress.flashcardConfidence[(0, selectors_1.chapterKey)(unit.id, chapter.id)]?.[flashcardId]} onRateConfidence={(flashcardId, confidence) => setFlashcardConfidence(unit.id, chapter.id, flashcardId, confidence)} accent={accent}/>
      </react_native_1.View>
    </AppShell_1.AppShell>);
}
