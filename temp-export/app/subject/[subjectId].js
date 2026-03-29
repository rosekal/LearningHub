"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaticParams = generateStaticParams;
exports.default = SubjectScreen;
const expo_router_1 = require("expo-router");
const react_native_1 = require("react-native");
const AppShell_1 = require("@/components/AppShell");
const Button_1 = require("@/components/Button");
const RecommendedActionCard_1 = require("@/components/RecommendedActionCard");
const SectionHeader_1 = require("@/components/SectionHeader");
const TopicCard_1 = require("@/components/TopicCard");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const catalog_1 = require("@/content/catalog");
const selectors_1 = require("@/features/learning/selectors");
const use_study_1 = require("@/hooks/use-study");
const routes_1 = require("@/utils/routes");
const static_params_1 = require("@/utils/static-params");
const format_1 = require("@/utils/format");
const element_accents_1 = require("@/theme/element-accents");
function generateStaticParams() {
    return (0, static_params_1.getSubjectStaticParams)();
}
function SubjectScreen() {
    const { subjectId } = (0, expo_router_1.useLocalSearchParams)();
    const subject = (0, catalog_1.getSubjectById)(subjectId);
    const theme = (0, use_app_theme_1.useAppTheme)();
    const router = (0, expo_router_1.useRouter)();
    const { progress } = (0, use_study_1.useStudy)();
    if (!subject) {
        return (<AppShell_1.AppShell>
        <react_native_1.Text style={{ color: theme.colors.text }}>Subject not found.</react_native_1.Text>
      </AppShell_1.AppShell>);
    }
    const totalUnits = subject.topics.reduce((count, topic) => count + topic.learningUnits.length, 0);
    const totalChapters = subject.topics.reduce((count, topic) => count + topic.learningUnits.reduce((unitCount, unit) => unitCount + unit.chapters.length, 0), 0);
    const subjectRecommendation = (0, selectors_1.getRecommendedActionForSubject)(progress, subject);
    const recommendedTopic = (0, catalog_1.getTopicById)(subject.id, subjectRecommendation.topicId);
    const recommendedUnit = (0, catalog_1.getUnitById)(subject.id, subjectRecommendation.topicId, subjectRecommendation.unitId);
    const recommendedChapter = (0, catalog_1.getChapterById)(subject.id, subjectRecommendation.topicId, subjectRecommendation.unitId, subjectRecommendation.chapterId);
    const recommendedAccent = (0, element_accents_1.getElementAccentPalette)(recommendedUnit?.id, theme);
    const hero = (<react_native_1.View style={{
            overflow: 'hidden',
            gap: theme.spacing.lg,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: theme.colors.borderStrong,
            backgroundColor: theme.colors.surfaceContrast,
            padding: theme.spacing.xxl,
        }}>
      <react_native_1.View style={{
            position: 'absolute',
            top: -30,
            right: -10,
            width: 210,
            height: 210,
            borderRadius: 105,
            backgroundColor: theme.colors.accentGlow,
        }}/>
      <react_native_1.Text style={{
            color: theme.colors.textInverse,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1.1,
            textTransform: 'uppercase',
        }}>
        Subject
      </react_native_1.Text>
      <react_native_1.Text style={{
            color: theme.colors.textInverse,
            fontFamily: theme.fonts.display,
            fontSize: 54,
            fontWeight: '700',
        }}>
        {subject.title}
      </react_native_1.Text>
      <react_native_1.Text style={{
            maxWidth: 860,
            color: 'rgba(248, 247, 243, 0.82)',
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.bodyLarge,
            lineHeight: 30,
        }}>
        {subject.description}
      </react_native_1.Text>
      <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
        {[
            (0, format_1.formatCount)(subject.topics.length, 'topic'),
            (0, format_1.formatCount)(totalUnits, 'unit'),
            (0, format_1.formatCount)(totalChapters, 'chapter'),
        ].map((item) => (<react_native_1.View key={item} style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.18)',
                backgroundColor: 'rgba(255,255,255,0.06)',
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
            }}>
            <react_native_1.Text style={{
                color: theme.colors.textInverse,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.7,
                textTransform: 'uppercase',
            }}>
              {item}
            </react_native_1.Text>
          </react_native_1.View>))}
      </react_native_1.View>
    </react_native_1.View>);
    return (<AppShell_1.AppShell hero={hero} breadcrumbs={[
            { label: 'Home', href: (0, routes_1.homeRoute)() },
            { label: subject.title },
        ]}>
      <react_native_1.View style={{ gap: theme.spacing.md }}>
        {recommendedTopic && recommendedUnit && recommendedChapter ? (<RecommendedActionCard_1.RecommendedActionCard eyebrow={subjectRecommendation.isStartHere ? 'Start Here' : 'Recommended Next'} title={`${recommendedTopic.title} • ${recommendedUnit.title}`} description={`${subjectRecommendation.reason} ${recommendedChapter.overview}`} ctaLabel={subjectRecommendation.isStartHere ? 'Start Chapter' : 'Continue Chapter'} onPress={() => router.push((0, routes_1.chapterRoute)(subject.id, subjectRecommendation.topicId, subjectRecommendation.unitId, subjectRecommendation.chapterId))} tags={[
                recommendedUnit.shortTitle,
                recommendedChapter.title,
                subjectRecommendation.prerequisiteLabel ?? 'Subject sequence',
            ]} accent={recommendedAccent}/>) : null}

        <SectionHeader_1.SectionHeader eyebrow="Topics" title="Study paths" description={`Each topic becomes a distinct branch of subject content. ${subject.title} currently spans ${(0, format_1.formatCount)(subject.topics.length, 'topic')} and ${(0, format_1.formatCount)(totalUnits, 'seeded learning unit')} across the same reading, flashcard, and quiz workflow.`} action={<Button_1.Button label="Back Home" variant="ghost" icon="arrow-back-outline" onPress={() => router.push((0, routes_1.homeRoute)())}/>}/>
        {subject.topics.map((topic) => {
            const topicProgress = (0, selectors_1.getTopicProgress)(progress, topic);
            return (<TopicCard_1.TopicCard key={topic.id} topic={topic} progressPercentage={topicProgress.percentage} detail={`${topicProgress.completed} of ${topicProgress.total} chapter readings completed`} href={(0, routes_1.topicRoute)(subject.id, topic.id)} onPress={() => router.push((0, routes_1.topicRoute)(subject.id, topic.id))}/>);
        })}
      </react_native_1.View>
    </AppShell_1.AppShell>);
}
